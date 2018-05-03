


    class Rect2 extends Start {
        constructor() {
            super();
            this.connection('http://localhost:5000/labs1/2');
        }

        createElementSimple(name, attributes) {
            this.element = document.createElement(name);
            if (name === 'button') {
                this.element.innerHTML = "Отправить на проверку";
            }

            if (attributes) {
                for (var k in attributes) {
                    this.element.setAttribute([k], attributes[k]);
                    this.element.onclick = this.on;
                }
                return this.element;
            }
        }

        addElement(amount, jsonObj) {
            for (amount in jsonObj) {
                //console.log(jsonObj[amount].type);
                this.appendNode(this.createElementSimple(jsonObj[amount].type, jsonObj[amount]));
            }
        }

        appendNode(element) {
            return document.getElementById('widget').appendChild(element);
        }
    }

    class Rect3 extends Rect2 {
        constructor() {
            super();
        }
    }

    (function () {
        /* Here's where you'd do things on page load. */
        var test = new Start();
        test.star();
    })();