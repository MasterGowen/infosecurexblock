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