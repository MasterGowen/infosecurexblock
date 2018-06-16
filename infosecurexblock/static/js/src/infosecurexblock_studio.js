function StudioEditableXBlockMixin(runtime, element) {
    "use strict";
    var rect1HandlerUrl = runtime.handlerUrl(element, 'rect1');


    //monkeypatching

    var tabList = '<li class="action-tabs is-active-tabs" id="settings-tab">Основные</li><li class="action-tabs" id="advanced-settings-tab">Расширенные</li>';
    document.getElementsByClassName("editor-modes action-list action-modes")[0].innerHTML = tabList;

    document.querySelector('#settings-tab').onclick = function(){
	  document.querySelector('#settings-tab').classList.add('is-active-tabs');
	  document.querySelector('#main-settings').classList.add('is-active');
	  document.querySelector('#advanced-settings-tab').classList.remove('is-active-tabs');
	  document.querySelector('#advanced-settings').classList.remove('is-active');

	  document.querySelector('#main-settings').removeAttribute('hidden');
      document.querySelector('#advanced-settings').setAttribute('hidden', 'true');
	};

	document.querySelector('#advanced-settings-tab').onclick = function(){
	  document.querySelector('#settings-tab').classList.remove('is-active-tabs');
	  document.querySelector('#main-settings').classList.remove('is-active');
	  document.querySelector('#advanced-settings-tab').classList.add('is-active-tabs');
	  document.querySelector('#advanced-settings').classList.add('is-active');

	  document.querySelector('#main-settings').setAttribute('hidden', 'true');
      document.querySelector('#advanced-settings').removeAttribute('hidden');
};



    var fields = [];
    var tinyMceAvailable = (typeof $.fn.tinymce !== 'undefined'); // Studio includes a copy of tinyMCE and its jQuery plugin
    var datepickerAvailable = (typeof $.fn.datepicker !== 'undefined'); // Studio includes datepicker jQuery plugin

    $(element).find('.field-data-control').each(function() {
        var $field = $(this);
        var $wrapper = $field.closest('li');
        var $resetButton = $wrapper.find('button.setting-clear');
        var type = $wrapper.data('cast');
        fields.push({
            name: $wrapper.data('field-name'),
            isSet: function() { return $wrapper.hasClass('is-set'); },
            hasEditor: function() { return tinyMceAvailable && $field.tinymce(); },
            val: function() {
                var val = $field.val();
                // Cast values to the appropriate type so that we send nice clean JSON over the wire:
                if (type == 'boolean')
                    return (val == 'true' || val == '1');
                if (type == "integer")
                    return parseInt(val, 10);
                if (type == "float")
                    return parseFloat(val);
                if (type == "generic" || type == "list" || type == "set") {
                    val = val.trim();
                    if (val === "")
                        val = null;
                    else
                        val = JSON.parse(val); // TODO: handle parse errors
                }
                return val;
            },
            removeEditor: function() {
                $field.tinymce().remove();
            }
        });
        var fieldChanged = function() {
            // Field value has been modified:
            $wrapper.addClass('is-set');
            $resetButton.removeClass('inactive').addClass('active');
        };
        $field.bind("change input paste", fieldChanged);
        $resetButton.click(function() {
            $field.val($wrapper.attr('data-default')); // Use attr instead of data to force treating the default value as a string
            $wrapper.removeClass('is-set');
            $resetButton.removeClass('active').addClass('inactive');
        });
        if (type == 'html' && tinyMceAvailable) {
            tinyMCE.baseURL = baseUrl + "/js/vendor/tinymce/js/tinymce";
            $field.tinymce({
                theme: 'modern',
                skin: 'studio-tmce4',
                height: '200px',
                formats: { code: { inline: 'code' } },
                codemirror: { path: "" + baseUrl + "/js/vendor" },
                convert_urls: false,
                plugins: "link codemirror",
                menubar: false,
                statusbar: false,
                toolbar_items_size: 'small',
                toolbar: "formatselect | styleselect | bold italic underline forecolor wrapAsCode | bullist numlist outdent indent blockquote | link unlink | code",
                resize: "both",
                setup : function(ed) {
                    ed.on('change', fieldChanged);
                }
            });
        }

        if (type == 'datepicker' && datepickerAvailable) {
            $field.datepicker('destroy');
            $field.datepicker({dateFormat: "m/d/yy"});
        }
    });

    $(element).find('.wrapper-list-settings .list-set').each(function() {
        var $optionList = $(this);
        var $checkboxes = $(this).find('input');
        var $wrapper = $optionList.closest('li');
        var $resetButton = $wrapper.find('button.setting-clear');

        fields.push({
            name: $wrapper.data('field-name'),
            isSet: function() { return $wrapper.hasClass('is-set'); },
            hasEditor: function() { return false; },
            val: function() {
                var val = [];
                $checkboxes.each(function() {
                    if ($(this).is(':checked')) {
                        val.push(JSON.parse($(this).val()));
                    }
                });
                return val;
            }
        });
        var fieldChanged = function() {
            // Field value has been modified:
            $wrapper.addClass('is-set');
            $resetButton.removeClass('inactive').addClass('active');
        };
        $checkboxes.bind("change input", fieldChanged);

        $resetButton.click(function() {
            var defaults = JSON.parse($wrapper.attr('data-default'));
            $checkboxes.each(function() {
                var val = JSON.parse($(this).val());
                $(this).prop('checked', defaults.indexOf(val) > -1);
            });
            $wrapper.removeClass('is-set');
            $resetButton.removeClass('active').addClass('inactive');
        });
    });

    var studio_submit = function(data) {
        var handlerUrl = runtime.handlerUrl(element, 'submit_studio_edits');
        runtime.notify('save', {state: 'start', message: gettext("Saving")});
        $.ajax({
            type: "POST",
            url: handlerUrl,
            data: JSON.stringify(data),
            dataType: "json",
            global: false,  // Disable Studio's error handling that conflicts with studio's notify('save') and notify('cancel') :-/
            success: function(response) { runtime.notify('save', {state: 'end'}); }
        }).fail(function(jqXHR) {
            var message = gettext("This may be happening because of an error with our server or your internet connection. Try refreshing the page or making sure you are online.");
            if (jqXHR.responseText) { // Is there a more specific error message we can show?
                try {
                    message = JSON.parse(jqXHR.responseText).error;
                    if (typeof message === "object" && message.messages) {
                        // e.g. {"error": {"messages": [{"text": "Unknown user 'bob'!", "type": "error"}, ...]}} etc.
                        message = $.map(message.messages, function(msg) { return msg.text; }).join(", ");
                    }
                } catch (error) { message = jqXHR.responseText.substr(0, 300); }
            }
            runtime.notify('error', {title: gettext("Unable to update settings"), message: message});
        });
    };

    $('.save-button', element).bind('click', function(e) {
        e.preventDefault();
        var values = {};
        var notSet = []; // List of field names that should be set to default values
        for (var i in fields) {
            var field = fields[i];
            if (field.isSet()) {
                values[field.name] = field.val();
            } else {
                notSet.push(field.name);
            }
            // Remove TinyMCE instances to make sure jQuery does not try to access stale instances
            // when loading editor for another block:
            if (field.hasEditor()) {
                field.removeEditor();
            }
        }
        studio_submit({values: values, defaults: notSet});
    });

    $(element).find('.cancel-button').bind('click', function(e) {
        // Remove TinyMCE instances to make sure jQuery does not try to access stale instances
        // when loading editor for another block:
        for (var i in fields) {
            var field = fields[i];
            if (field.hasEditor()) {
                field.removeEditor();
            }
        }
        e.preventDefault();
        runtime.notify('cancel', {});
    });
    class Start {
        constructor() {
            this.defaultSet = {
                x: 0,
                y: 0,
                width: 850,
                height: 850,
                fill: '#f5f5f5',
                class: 'rect2'
            }
            this.star = () => {
                this.createElementSVG('svg');
                this.appendNodeSVG(this.constract('rect'));
                new Labs();
            }
        }

        constract(name) {
            return this.createElementSVG(name, this.defaultSet);
        }
        connectionLabs(handler, labId) {
            var self = this;

            function success(handler) {
                if (handler.Rect1) {
                    handler.amount = Object.keys(handler.Rect1).length;
                    self.addElementSVG(handler.amount, handler.Rect1);                   
                }
                if (handler.Rect2) {
                    handler.amount = Object.keys(handler.Rect2).length;
                    self.addElement(handler.amount, handler.Rect2);            
                }
                if (handler.Rect3) {
                    handler.amount = Object.keys(handler.Rect3).length;
                    self.addElementTextSVG(handler.amount, handler.Rect3);            
                }
            }

            (function () {
                $.ajax({
                    type: "POST",
                    url: handler,
                    data: {"lab_id": labId},
                    success: success
                });

            })()
    }

        createElementSVG(name, attributes) {
            this.NS = "http://www.w3.org/2000/svg";
            this.element = document.createElementNS(this.NS, name);
            console.log(this.element);
            if (name == "svg") {
                this.element.setAttributeNS(null, 'id', 'star_studio');
                document.getElementById("widget_studio").appendChild(this.element);
            }
            if (attributes) {
                for (var k in attributes) {
                    this.element.setAttributeNS(null, [k], attributes[k]);
                }
            }
            return this.element;
        }
        appendNodeSVG(element) {
            var svg = document.querySelector('svg');
            return svg.appendChild(element);
        }
        addElementTextSVG(amount, jsonObj) {
            for (amount in jsonObj) {
                document.getElementById(jsonObj[amount].idnum).innerHTML += jsonObj[amount].value;
                }
            }

        addElementSVG(amount, jsonObj) {
            for (amount in jsonObj) {
                this.appendNodeSVG(this.createElementSVG(jsonObj[amount].type, jsonObj[amount]));
            }
        }

        createElementSimple(name, attributes) {
            this.element = document.createElement(name);
            if (name === 'button') {
                this.element.innerHTML = "Отправить на проверку";
            }
            if (attributes) {
                for (var k in attributes) {
                    if ((name == "div") && (attributes[k] == "readid")) {
                        this.element.innerHTML = 'Чтение'
                    }
                    if ((name == "div") && (attributes[k] == "writeid")) {
                        this.element.innerHTML = 'Запись'
                    }
                    if ((name == "div") && (attributes[k] == "execid")) {
                        this.element.innerHTML = 'Выполнение'
                    }
                    if ((name == "div") && (attributes[k] == "nothing")) {
                        this.element.innerHTML = 'Отсутствие прав'
                    }
                    if ((name == "div") && (attributes[k] == "wx")) {
                        this.element.innerHTML = 'права на запись и выполнение'
                    }
                    if ((name == "div") && (attributes[k] == "rx")) {
                        this.element.innerHTML = 'права на чтение и выполнение'
                    }
                    if ((name == "div") && (attributes[k] == "rw")) {
                        this.element.innerHTML = 'права на чтение и запись'
                    }
                    if ((name == "div") && (attributes[k] == "rwx")) {
                        this.element.innerHTML = 'полные права'
                    }
                    if ((name == "image") && (attributes[k] == "File1")) {
                        documen.getElementById("File1Id").innerHTML = keys
                    }
                    this.element.setAttribute([k], attributes[k]);
                }
                return this.element;
            }
        }

        addElement(amount, jsonObj) {
            for (amount in jsonObj) {
                this.appendNode(this.createElementSimple(jsonObj[amount].type, jsonObj[amount]));
            }
        }

        appendNode(element) {
            return document.getElementById('widget_studio').appendChild(element);
        }
    }
    class Labs extends Start {
        constructor() {
            super()
            this.connectionLabs(rect1HandlerUrl,1);
            this.connectionLabs(rect1HandlerUrl,2);
        }
    }

    (function () {
        /* Here's where you'd do things on page load. */
        var test = new Start();
        test.star();
})();
}