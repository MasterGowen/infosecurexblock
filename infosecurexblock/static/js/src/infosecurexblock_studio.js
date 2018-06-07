function InfoSecureXBlock(runtime, element) {

    class Start {
        constructor() {
            this.defaultSet = {
                x: 0,
                y: 0,
                width: 850,
                height: 850,
                fill: '#f5f5f5',
                class: 'rect1'
            }
            this.star = () => {
                new Labs();
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
            if (name == "svg") {
                this.element.setAttributeNS(null, 'id', 'star')
                document.getElementById("widget").appendChild(this.element);
            }
            for (var k in attributes) {
                this.element.setAttributeNS(null, [k], attributes[k]);
            }
        }
        appendNodeSVG(element) {
            var svg = document.querySelector('svg');
            return svg.appendChild(element);
        }
    }

    (function () {
        /* Here's where you'd do things on page load. */
        var test = new Start();
        test.star();
    })();
}