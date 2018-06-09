function InfoSecureXBlock(runtime, element) {

    document.querySelector("#scenario-settings-tab").onclick = function () {
        document.querySelector("#main-settings-tab").classList.remove("is-active-tabs");
        document.querySelector("#scenario-settings-tab").classList.add("is-active-tabs");
        document.querySelector("#advanced-settings-tab").classList.remove("is-active-tabs");
        document.querySelector("#main-settings").setAttribute("hidden", "true");
        document.querySelector("#scenario-settings").removeAttribute("hidden");
        document.querySelector("#advanced-settings").setAttribute("hidden", "true");
      };
    
      document.querySelector("#advanced-settings-tab").onclick = function () {
        document.querySelector("#main-settings-tab").classList.remove("is-active-tabs");
        document.querySelector("#scenario-settings-tab").classList.remove("is-active-tabs");
        document.querySelector("#advanced-settings-tab").classList.add("is-active-tabs");
        document.querySelector("#main-settings").setAttribute("hidden", "true");
        document.querySelector("#scenario-settings").setAttribute("hidden", "true");
        document.querySelector("#advanced-settings").removeAttribute("hidden");
      };

      $(element).find(".save-button").bind("click", function() {

        var handlerUrl = runtime.handlerUrl(element, "studio_submit"),
            data = {
                "display_name": $(element).find("input[name=display_name]").val(),
                "task_text": $(element).find("textarea[name=question]").val(),
                "weight": $(element).find("input[name=weight]").val(),
                "max_attempts": $(element).find("input[name=max_attempts]").val(),
                "lab_id": $(element).find("select[name=lab_id]").val(),
            };

        $.post(handlerUrl, JSON.stringify(data)).done(function (response) {

            window.location.reload(true);

        });

    });


    $(element).find(".cancel-button").bind("click", function () {

        runtime.notify("cancel", {});

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
                //new Labs();
                this.createElementSVG('svg');
                this.appendNodeSVG(this.constract('rect'));
            }
        }

        constract(name) {
            return this.createElementSVG(name, this.defaultSet);
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
            var svg = document.getElementById('star_studio');
            return svg.appendChild(element);
        }
    }

    (function () {
        /* Here's where you'd do things on page load. */
        var test = new Start();
        test.star();
    })();
}