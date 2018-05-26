/* Javascript for InfoSecureXBlock. */
function InfoSecureXBlock(runtime, element) {
    var rect1HandlerUrl = runtime.handlerUrl(element, 'rect1');
    var checkHandler = runtime.handlerUrl(element, 'check');
    var choiseLab;

    function successCheck(result) {
        //console.log(result);
        if (result.result != "fail") {
            $('.attempts', element).text(result.attempts);
            if (result.max_attempts && result.max_attempts <= result.attempts) {
                document.getElementsByClassName('.submit').style.opacity="0.65"; 
                document.getElementsByClassName('.submit').style.cursor="not-allowed"; 
            }
            $(".success", element).text(result.points);
        }
        else { 
            $('.attempts', element).text(result.attempts);
            document.getElementsByClassName('.submit').style.opacity="0.65"; 
            document.getElementsByClassName('.submit').style.cursor="not-allowed"; 
            }
    }

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
                if(this.connectionLab1(rect1HandlerUrl,1)&&this.connectionLab1(rect1HandlerUrl,2)){
                    this.connectionLab1(rect1HandlerUrl,1);
                    this.connectionLab1(rect1HandlerUrl,2);
                    document.getElementById("widget").addEventListener('click',Start.on);
                }
                else if(this.connectionLab2(rect1HandlerUrl,1)&& this.connectionLab2(rect1HandlerUrl,2)){
                    this.connectionLab2(rect1HandlerUrl,1);
                    this.connectionLab2(rect1HandlerUrl,2);
                    document.getElementById("widget").addEventListener('mousedown',Start.dragMouseDown);
                }
                this.createElementSVG('svg');
                this.appendNodeSVG(this.constract('rect'));
            }
        }

        constract(name) {
            return this.createElementSVG(name, this.defaultSet);
        }

        connectionLab1(handler, labId) {
            var self = this;

            function success(handler) {
                console.log(handler);
                console.log(labId);
                if (handler.Rect1) {
                    handler.amount = Object.keys(handler.Rect1).length;
                    //console.log(this.amount,this.jsonObj.Rect1);
                    self.addElementSVG(handler.amount, handler.Rect1);
                }
                if (handler.Rect2) {
                    handler.amount = Object.keys(handler.Rect2).length;
                    self.addElement(handler.amount, handler.Rect2);
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
        connectionLab2(handler,labId){
            var self = this;

            function success(handler) {
                console.log(handler);
                console.log(labId);
                if (handler.Rect3) {
                    handler.amount = Object.keys(handler.Rect3).length;
                    //console.log(this.amount,this.jsonObj.Rect1);
                    self.addElementSVG(handler.amount, handler.Rect3);
                }
                if (handler.Rect4) {
                    handler.amount = Object.keys(handler.Rect4).length;
                    self.addElement(handler.amount, handler.Rect4);
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

       
        connectionLab3(handler, labId) {
            var self = this;

            function success(handler) {
                console.log(handler);
                console.log(labId);
                if (handler.Rect5) {
                    handler.amount = Object.keys(handler.Rect5).length;
                    //console.log(this.amount,this.jsonObj.Rect5);
                    self.addElementSVG(handler.amount, handler.Rect5);
                }
                if (handler.Rect6) {
                    handler.amount = Object.keys(handler.Rect6).length;
                    self.addElement(handler.amount, handler.Rect6);
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
        static on() {
            //console.log("ON funcction:",this);
            var evt = event.target;
            var elem;
            var student_answer = {};

            function active(idNum) {
                elem = document.getElementById(idNum);
                elem.style.display = 'block';
            }

            function deactive(idNum) {
                elem = document.getElementById(idNum);
                elem.style.display = 'none';
            }
            var remember = "";
            if (evt.id == 'comp1') {
                document.getElementById("comp1").style.opacity = "0.5";
                if (remember != null) {

                    document.getElementById("comp2").style.opacity = "1";
                    document.getElementById("comp3").style.opacity = "1";
                }
                remember = evt.id;
            }
            if (evt.id == 'comp2') {
                document.getElementById("comp2").style.opacity = "0.5";

                if (remember != null) {
                    //    alert(remember);
                    document.getElementById("comp1").style.opacity = "1";
                    document.getElementById("comp3").style.opacity = "1";
                }
                remember = evt.id;
            }
            if (evt.id == 'comp3') {
                document.getElementById("comp3").style.opacity = "0.5";

                if (remember != null) {
                    document.getElementById("comp2").style.opacity = "1";
                    document.getElementById("comp1").style.opacity = "1";
                }
                remember = evt.id;
            }
            if (evt.id == 'task') {
                active('arrowid');
                active('taskId');
                active('taskTextID');
                document.getElementById('taskTextID').innerHTML = $('.task_text', element).text();
            }
            if (evt.id == 'taskId') {
                deactive('arrowid');
                deactive('taskId');
                deactive('taskTextID');
            }
            if (evt.id == 'File1') {
                active('File1Id');
                active('File1TextID');
                active('File1TextID2');
                document.getElementById("File1TextID").innerHTML = "Сообщение:406 9915660 05464616061 - 9915660";
                document.getElementById("File1TextID2").innerHTML = "Ключ: 2,10";
            }
            if (evt.id != "File1") {
                deactive('File1Id');
                deactive('File1TextID');
                deactive('File1TextID2');

            }
            if ((evt.id == "comp1") || (evt.id == 'ip1')) {
                document.getElementById('ip').value = '192.168.0.3';
                //document.getElementById('class').fill = 'black';
                document.getElementById('line_wifi').style.stroke = "green";
                document.getElementById('line_comp1').style.stroke = "green";
                document.getElementById('line_comp2').style.stroke = "lightgrey";
                document.getElementById('line_comp3').style.stroke = "lightgrey";
                active('File1Id');
                active('File1TextID');
                active('File1TextID2');
            }
            if ((evt.id == "comp2") || (evt.id == 'ip2')) {
                document.getElementById('ip').value = '192.168.0.4';
                document.getElementById('line_comp1').style.stroke = "lightgrey";
                document.getElementById('line_comp2').style.stroke = "green";
                document.getElementById('line_comp3').style.stroke = "lightgrey";
                active('File1Id');
                active('File1TextID');
                active('File1TextID2');
            }
            if ((evt.id == "comp3") || (evt.id == 'ip3')) {
                document.getElementById('ip').value = '192.168.0.5';
                document.getElementById('line_comp1').style.stroke = "lightgrey";
                document.getElementById('line_comp2').style.stroke = "lightgrey";
                document.getElementById('line_comp3').style.stroke = "green";
                active('File1Id');
                active('File1TextID');
                active('File1TextID2');
            }
            if (evt.id == "Link"){
                document.getElementById('Link').style.display = "block";
            }
            if (evt.id == "checkid2"){
                Random();
            }
            if ((evt.id == 'checkid') && (document.getElementById(evt.id).value != undefined)) {
                var k = document.getElementById('ip').value;
                var d = document.getElementById('d').value;
                var N = document.getElementById('N').value;
                var e = document.getElementById('e').value;
                var empty = false;
                var che = 0;
                var b = checkIsIPV4(k);
                if (k.length == 0 || d.length == 0 || N.length == 0 || e.length == 0) {
                    alert("Пустые поля ввода.");
                    che++;
                    empty = true;
                }
                if (b == false && empty != true) {
                    document.getElementById("ip").innerHTML = "Некорректный IP адрес.";
                    alert("Некорректный IP адрес.");
                }
                if (isNumeric(d) == false && empty != true) {
                    alert('Некорректный закрытый ключ (d).');
                    che++;
                }
                if (isNumeric(N) == false && empty != true) {
                    alert('Некорректный закрытый ключ (N).');
                    che++;
                }
                if (isNumeric(e) == false && empty != true) {
                    alert('Некорректное сообщение! Введите сообещние в численном виде.');
                    che++;
                }

                if (che == 0 && b == true && empty != true) {

                    var student_answer =
                        {
                            'ip': document.getElementById('ip').value,
                            'd': document.getElementById('d').value,
                            'N': document.getElementById('N').value,
                            'e': document.getElementById('e').value
                        }

                    function checkAnswer(checkHandler, student_answer) {
                        console.log("student_answer :", student_answer);
                        console.log("checkHandler :", checkHandler);
                        (function () {
                            $.ajax({
                                type: "POST",
                                url: checkHandler,
                                data: JSON.stringify(student_answer),
                                success: successCheck
                            });

                        })()
                    }

                    checkAnswer(checkHandler, student_answer);
                }

                /*                 if(student_answer!={}){
                                    getQuest();
                                } */
            }
            else if (evt.id == 'checkid') {
                console.log('Error:не все поля заполненны.')
            }
            console.log(student_answer);
        }

    
        static dragMouseDown(e) {
            var dragObject = {};
            var self = this;
            if (e.which != 1) return;
    
            var elem = e.target.closest('.draggable');
            if (!elem) return;
        
            dragObject.elem = elem;

            dragObject.downX = e.pageX;
            dragObject.downY = e.pageY;
            
            document.onmousemove = function(e){
                onMouseMove(e)
            };
            document.onmouseup = onMouseUp;
          
            this.onDragEnd = function(dragObject, dropElem) {};
            this.onDragCancel = function(dragObject) {dragObject.avatar.rollback();};
            document.body.onselectstart = function() { return false }
    
            return false;
        
          function onMouseMove(e) {
            if (!dragObject.elem) return; 
        
            if (!dragObject.avatar) { 
              var moveX = e.pageX - dragObject.downX;
              var moveY = e.pageY - dragObject.downY;
        
              if (Math.abs(moveX) < 3 && Math.abs(moveY) < 3) {
                return;
              }
        
              dragObject.avatar = createAvatar(e); 
              if (!dragObject.avatar) { 
                dragObject = {};
                return;
              }
              var coords = getCoords(dragObject.avatar);
              dragObject.shiftX = dragObject.downX - coords.left;
              dragObject.shiftY = dragObject.downY - coords.top;
        
              startDrag(e); 
            }
        
            dragObject.avatar.style.left = e.pageX - dragObject.shiftX + 'px';
            dragObject.avatar.style.top = e.pageY - dragObject.shiftY + 'px';
        
            return false;
          }
        
          function onMouseUp(e) {
            if (dragObject.avatar) { 
                finishDrag(e);
            }
        
            dragObject = {};
          }
        
          function finishDrag(e) {
            var dropElem = findDroppable(e);
        
            if (!dropElem) {
              self.onDragCancel(dragObject);
            } else {
              self.onDragEnd(dragObject, dropElem);
            }
          }
        
          function createAvatar(e) {
        
            var avatar = dragObject.elem;
            var old = {
              parent: avatar.parentNode,
              nextSibling: avatar.nextSibling,
              position: avatar.position || '',
              left: avatar.left || '',
              top: avatar.top || '',
              zIndex: avatar.zIndex || ''
            };
        
            avatar.rollback = function() {
              old.parent.insertBefore(avatar, old.nextSibling);
              avatar.style.position = old.position;
              avatar.style.left = old.left;
              avatar.style.top = old.top;
              avatar.style.zIndex = old.zIndex
            };
        
            return avatar;
          }
        
          function startDrag(e) {
            var avatar = dragObject.avatar;
        
            document.body.appendChild(avatar);
            avatar.style.zIndex = 9999;
            avatar.style.position = 'absolute';
          }
        
          function findDroppable(event) {
            dragObject.avatar.hidden = true;
            var elem = document.elementFromPoint(event.clientX, event.clientY);
            if((elem.id == "userRect" || elem.id == "comp1"|| elem.id == "comp4") && dragObject.avatar.id == "readid"){
                elem.farthestViewportElement.children[2].style.stroke = "green";
                elem.farthestViewportElement.children[2].style.fill = "#f2fff4";
                dragObject.avatar.hidden = true;
                elem.farthestViewportElement.children[0].style.stroke = "none";
            }
            else if((elem.id == "redacRect" || elem.id == "comp2"|| elem.id == "comp3") && dragObject.avatar.id == "rw"){
                elem.farthestViewportElement.children[1].style.stroke = "green";
                elem.farthestViewportElement.children[1].style.fill = "#f2fff4";
                dragObject.avatar.hidden = true;
                elem.farthestViewportElement.children[0].style.stroke = "none";
            }
            else if((elem.id == "admRect" || elem.id == "compadm") && dragObject.avatar.id == "rwx"){
                elem.farthestViewportElement.children[3].style.stroke = "green";
                elem.farthestViewportElement.children[3].style.fill = "#f2fff4";
                dragObject.avatar.hidden = true;
                elem.farthestViewportElement.children[0].style.stroke = "none";
            }
            else {
                elem.farthestViewportElement.children[0].style.stroke = "red";
                dragObject.avatar.hidden = false;
                dragObject.avatar.rollback();
            }
            
            if (elem == null) {
              return null;
            }
        
            return elem.closest('.droppable');
          }
            function getCoords(elem) { 
            var box = elem.getBoundingClientRect();
            
            return {
                top: box.top + pageYOffset,
                left: box.left + pageXOffset
            };
            }
        } 
        createElementSVG(name, attributes) {
            this.NS = "http://www.w3.org/2000/svg";
            this.NS1 = "http://www.w3.org/1999/xlink";
            this.element = document.createElementNS(this.NS, name);
            if (name == "svg") {
                document.getElementById("widget").appendChild(this.element);
                //document.querySelector('svg').appendChild(document.createElement('g'));
            }
            for (var k in attributes) {
                if ((name == "text") && (attributes[k] == "ip1")) {
                    this.element.innerHTML = '192.168.0.3'
                }
                if ((name == "text") && (attributes[k] == "ip2")) {
                    this.element.innerHTML = '192.168.0.4'
                }
                if ((name == "text") && (attributes[k] == "ip3")) {
                    this.element.innerHTML = '192.168.0.5'
                }
                if((name=="text")&&(attributes[k]=="ip4")){
                    this.element.innerHTML = '192.168.0.2'
                }
                if((name=="text")&&(attributes[k]=="ip5")){
                    this.element.innerHTML = '192.168.0.6'
                }
                if((name=="text")&&(attributes[k]=="redact")){
                    this.element.innerHTML = 'Редакторы'
                }
                if((name=="text")&&(attributes[k]=="users")){
                    this.element.innerHTML = 'Пользователи'
                }
                if((name=="text")&&(attributes[k]=="admin")){
                    this.element.innerHTML = 'Администратор'
                }
                if((name=="text")&&(attributes[k]=="article")){
                    this.element.innerHTML = 'Статья'
                }
                if (attributes[k] == "image") {
                    this.element.setAttributeNS(this.NS1, [k], attributes[k]);
                }
                else if (attributes[k] != "image") {
                    this.element.setAttributeNS(null, [k], attributes[k]);
                }
            }

            if (attributes) {
                return this.element;
            }
        }

        appendNodeSVG(element) {
            var svg = document.querySelector('svg');
            return svg.appendChild(element);
        }

        addElementSVG(amount, jsonObj) {
            console.log(amount,jsonObj);
            for (amount in jsonObj) {
                //console.log(jsonObj[amount].type,jsonObj[amount]);
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
                    this.element.setAttribute([k], attributes[k]);
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
    
    function checkIsIPV4(entry) {
        var blocks = entry.split(".");
        if (blocks.length === 4) {
            return blocks.every(function (block) {
                return parseInt(block, 10) >= 0 && parseInt(block, 10) <= 255;
            });
        }
        return false;
    }

    function isNumeric(n) {

        return !isNaN(parseFloat(n)) && isFinite(n);

    }
    
    function Random(){
        
        Math.random(id_num);
    }
    class Rect1 extends Start {
        constructor() {
            super()
            this.connectionLab1(rect1HandlerUrl, 1);
            document.getElementById("widget").addEventListener('click',Start.on);
        }
    }

    class Rect2 extends Start {
        constructor() {
            super();
            this.connectionLab1(rect1HandlerUrl, 2);
        }
    }

    class Rect3 extends Start {
        constructor() {
            super()
            this.connectionLab2(rect1HandlerUrl, 1);
            document.getElementById("widget").addEventListener('mousedown',Start.dragMouseDown);
        }
    }
    class Rect4 extends Start {
        constructor() {
            super();
            this.connectionLab2(rect1HandlerUrl, 2);
        }
    }
    
    class Rect5 extends Start {
        constructor() {
            super()
            this.connectionLab3(rect1HandlerUrl, 1);
            document.getElementById('widget').addEventListener('click',Start.on);
        }
    }
    class Rect6 extends Start {
        constructor() {
            super();
            this.connectionLab3(rect1HandlerUrl, 2);
        }
    }


//автоматически вызываемая функция создаёт пространство
//рабочей области + формирует создание области настроек
//и кнопки отправки на проверку.
    

    (function () {
        /* Here's where you'd do things on page load. */
        var test = new Start();
        test.star();
    })();

}

