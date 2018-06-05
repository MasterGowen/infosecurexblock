
/* Javascript for InfoSecureXBlock. */
function InfoSecureXBlock(runtime, element) {
    var rect1HandlerUrl = runtime.handlerUrl(element, 'rect1');
    var checkHandler = runtime.handlerUrl(element, 'check');
    var checkHandlerLab = runtime.handlerUrl(element, 'checkLab');

    function successCheck(result) {
        //console.log("result:", result);
        if (result.result != "fail") {
            $('.attempts', element).text(result.attempts);
            if (result.max_attempts && result.max_attempts <= result.attempts) {
                document.getElementById('checkid').setAttribute("disabled", null); 
                document.getElementById('checkid').style.cursor="not-allowed"; 
            }
            $(".success", element).text(result.points);
        }
        else { 
            $('.attempts', element).text(result.attempts);
            document.getElementById('checkid').setAttribute("disabled", null); 
            document.getElementById('checkid').style.cursor="not-allowed"; 
            }
    }
    var test = {
        'test':'lab1'
    };
    //
    var student_answer = {
        'answerBlockRedac': false,
        'answerBlockAdmin': false,
        'answerBlockUsers': false
    };
    var student_answer3 = {
        'link1': false,
        'link2': false,
        'link3': false,
        'link4': false,
        'link5': false,
        'link6': false,
        'link7': false,
        'link8': false,
        'link9': false,
        'link10': false,
        'link11': false,
        'link12': false,
        'link13': false,
        'link14': false,
        'link15': false,
        'link16': false
    };

    function successCheckLab(result) {
        if (result.result != "fail")
        switch(result.lab_id){
            case 1:{
               // Start.connectionLabs(rect1HandlerUrl, 1);
               // Start.connectionLabs(rect1HandlerUrl, 2);
                document.getElementById('widget').addEventListener('click', Start.onLab1);
                document.getElementById('taskTextID').innerHTML = $('.task_text', element).text();
                document.getElementById('widget').addEventListener('click',Start.taskBlock);
                break;
            }
            case 2:{
               // Start.connectionLabs(rect1HandlerUrl, 1);
               // Start.connectionLabs(rect1HandlerUrl, 2);
                document.getElementById('widget').addEventListener('mousedown', Start.dragMouseDown);
                document.getElementById('taskTextID').innerHTML = $('.task_text', element).text();
                document.getElementById('widget').addEventListener('click', Start.taskBlock);
                break;
            }
            case 3:{
               // setTimeout(Start.connectionLabs3(rect1HandlerUrl, 1),5000);
               // Start.connectionLabs(rect1HandlerUrl, 2);
                document.getElementById('widget').addEventListener('click', Start.onLab3);
                document.getElementById('taskTextID').innerHTML = $('.task_text', element).text();
                document.getElementById('widget').addEventListener('click',Start.taskBlock);
                break;
            }
            case 4:{
               // Start.connectionLabs(rect1HandlerUrl, 1);
               // Start.connectionLabs(rect1HandlerUrl, 2);
                document.getElementById('widget').addEventListener('click', Start.onLab4);
                document.getElementById("widget").addEventListener('mouseover',Start.onLab4styleActive);
                document.getElementById("widget").addEventListener('mouseout',Start.onLab4styleDeactive);
                document.getElementById('taskTextID').innerHTML = $('.task_text', element).text();
                document.getElementById('widget').addEventListener('click',Start.taskBlock);
                break;
            }
           // console.log('succesCheckLAB : ',result.lab_id);
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
                new Labs();
                this.createElementSVG('svg');
                this.appendNodeSVG(this.constract('rect'));
            }
        }

        constract(name) {
            return this.createElementSVG(name, this.defaultSet);
        }

        static taskBlock(event) {
            var evt = event.target;
                evt.id == 'task' && Start.active(['taskId','arrowid','taskTextID']);
                evt.id == 'taskId' && Start.deactive(['taskId','arrowid','taskTextID']);
                evt.id == 'arrowid' && Start.deactive(['taskId','arrowid','taskTextID']);
        }

        checkAnswerLab(checkHandlerLab,test) {
            //console.log("checkHandlerLab :", checkHandlerLab);
            (function () {
                $.ajax({
                    type: "POST",
                    url: checkHandlerLab,
                    data: JSON.stringify(test),
                    success: successCheckLab
                });

            })()
        }

        connectionLabs(handler, labId) {
            var self = this;
            //console.log(lab_id);
         //   console.log(result.lab_id);
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

            (function () {
                $.ajax({
                    type: "POST",
                    url: handler,
                    data: {"lab_id": labId},
                    success: success
                });

            })()

        }
    }
        static active(idNum) {
            for(var k in idNum){
                document.getElementById(idNum[k]).classList.remove("taskClose");
                document.getElementById(idNum[k]).classList.add("taskOpen");
            };
        }
    
        static deactive(idNum) {
            for(var k in idNum){
                document.getElementById(idNum[k]).classList.remove("taskOpen");
                document.getElementById(idNum[k]).classList.add("taskClose");
            };
        }
        static deactive2(idNum) {
            for(var k in idNum){
                document.querySelector("."+idNum[0]).style.display = "none";
                document.getElementById(idNum[1]).style.display = "none";
            };
        }
        //Lab 1
        static onLab1(event) {
            //console.log("ON funcction:",this);
            var evt = event.target;
            var student_answer = {};
            evt.id == "comp1" && connect(['comp1','comp2','comp3','activeComp','192.168.0.3']);
            evt.id == "comp2" && connect(['comp2','comp1','comp3','activeComp','192.168.0.4']);
            evt.id == "comp3" && connect(['comp3','comp2','comp1','activeComp','192.168.0.5']);
            evt.id == 'File1' && fileShow();
            evt.id != 'File1' && Start.deactive(['File1Id','File1TextID','File1TextID2']);
            ((evt.id == 'comp1') || (evt.id == 'ip1')) && connect(['line_comp1','line_comp2','line_comp3','connnectOpen']);
            ((evt.id == 'comp2') || (evt.id == 'ip2')) && connect(['line_comp2','line_comp1','line_comp3','connnectOpen']);
            ((evt.id == 'comp3') || (evt.id == 'ip3')) && connect(['line_comp3','line_comp1','line_comp2','connnectOpen']);

            function connect(idNum) {
                if(idNum[4])document.getElementById('ip').value = idNum[4];
                document.getElementById('line_wifi').classList.add(idNum[3]);
                document.getElementById(idNum[0]).classList.add(idNum[3]);
                document.getElementById(idNum[1]).classList.remove(idNum[3]);
                document.getElementById(idNum[2]).classList.remove(idNum[3]);
                fileShow();
            }
            function fileShow() {
                Start.active(['File1Id','File1TextID','File1TextID2']);
                document.getElementById("File1TextID").innerHTML = "Сообщение:406 9915660 05464616061 - 9915660";
                document.getElementById("File1TextID2").innerHTML = "Ключ: 2,10";
            }
            if (evt.id == "Link"){
                document.getElementById('Link').style.display = "block";
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
                    Start.checkAnswer(checkHandler, student_answer);
                }

                /*                 if(student_answer!={}){
                                    getQuest();
                                } */
            }
            else if (evt.id == 'checkid') {
                console.log('Error:не все поля заполненны.')
            }
        }
        static checkAnswer(checkHandler, student_answer) {
            //console.log("student_answer :", student_answer);
            //console.log("checkHandler :", checkHandler);
            (function () {
                $.ajax({
                    type: "POST",
                    url: checkHandler,
                    data: JSON.stringify(student_answer),
                    success: successCheck
                });
            })()
        }
        static getRandomInt(min, max){
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        static Time3Lab(t,idNum){
           
            setTimeout(()=>{
                Start.active([idNum[0], idNum[1]]);
            }, t);t+=3000;
            setTimeout(()=>{
                Start.deactive2([idNum[0], idNum[1]]);
            }, t);t+=3000;
        }
        //Lab 3
        static onLab3(event) {
            var evt = event.target;
            var student_answer = {};
            var mas_count = 0;
            
            var t= 3000;
          /*  Time3Lab(t, ["link1","Link1"]);t+=3000;
            Time3Lab(t, ["link2","Link2"]);t+=300;
            Time3Lab(t, ["link3","Link2"]);*/
           setTimeout(()=>{
                Start.active(["link1", "Link1"]);
            }, 3000);
            setTimeout(()=>{
                Start.deactive2(["link1", "Link1"]);
            }, 6000);
            setTimeout(()=> {
                Start.active(["link2", "Link2"]);
            }, 8000);
            setTimeout(()=>{
                Start.deactive2(["link2", "Link2"]);
            }, 11000);
            setTimeout(()=>{
                Start.active(["link3", "Link3"]);
            }, 13000);
            setTimeout(()=>{
                Start.deactive2(["link3", "Link3"]);
            }, 16000);
            setTimeout(()=>{
                Start.active(["link4", "Link4"]);
            }, 18000);
            setTimeout(()=>{
                Start.deactive2(["link4", "Link4"]);
            }, 21000);
            setTimeout(()=>{
                Start.active(["link5", "Link5"]);
            }, 23000);
            setTimeout(()=>{
                Start.deactive2(["link5", "Link5"]);
            }, 26000);
            setTimeout(()=>{
                Start.active(["link6", "Link6"]);
            }, 28000);
            setTimeout(()=>{
                Start.deactive2(["link6", "Link6"]);
            }, 31000);
            setTimeout(()=>{
                Start.active(["link7", "Link7"]);
            }, 33000);
            setTimeout(()=>{
                Start.deactive2(["link7", "Link7"]);
            }, 36000);
            setTimeout(()=>{
                Start.active(["link8", "Link8"]);
            }, 38000);
            setTimeout(()=>{
                Start.deactive2(["link8", "Link8"]);
            }, 41000);
            setTimeout(()=>{
                Start.active(["link9", "Link9"]);
            }, 43000);
            setTimeout(()=>{
                Start.deactive2(["link9", "Link9"]);
            }, 46000);
            setTimeout(()=>{
                Start.active(["link10", "Link10"]);
            }, 48000);
            setTimeout(()=>{
                Start.deactive2(["link10", "Link10"]);
            }, 51000);
            setTimeout(()=>{
                Start.active(["link11", "Link11"]);
            }, 53000);
            setTimeout(()=>{
                Start.deactive2(["link11", "Link11"]);
            }, 56000);
            setTimeout(()=>{
                Start.active(["link12", "Link12"]);
            }, 58000);
            setTimeout(()=>{
                Start.deactive2(["link12", "Link12"]);
            }, 61000);
            setTimeout(()=>{
                Start.active(["link13", "Link13"]);
            }, 63000);
            setTimeout(()=>{
                Start.deactive2(["link13", "Link13"]);
            }, 66000);
            setTimeout(()=>{
                Start.active(["link14", "Link14"]);
            }, 68000);
            setTimeout(()=>{
                Start.deactive2(["link14", "Link14"]);
            }, 71000);
            setTimeout(()=>{
                Start.active(["link15", "Link15"]);
            }, 73000);
            setTimeout(()=>{
                Start.deactive2(["link15", "Link15"]);
            }, 77000);
            setTimeout(()=>{
                Start.active(["link16", "Link16"]);
            }, 79000);
            setTimeout(()=>{
                Start.deactive2(["link16", "Link16"]);
            }, 82000);
            
            var push3 =[]; var mas = [];
           // document.getElementById('random').display.style = "block";
            evt.id == "Link1" && linkFixate(["link1","Link1"],student_answer3);
            evt.id == "Link2" && linkFixate(["link2","Link2"],student_answer3);
            evt.id == "Link3" && linkFixate(["link3","Link3"],student_answer3);
            evt.id == "Link4" && linkFixate(["link4","Link4"],student_answer3);
            evt.id == "Link5" && linkFixate(["link5","Link5"],student_answer3);
            evt.id == "Link6" && linkFixate(["link6","Link6"],student_answer3);
            evt.id == "Link7" && linkFixate(["link7","Link7"],student_answer3);
            evt.id == "Link8" && linkFixate(["link8","Link8"],student_answer3);
            evt.id == "Link9" && linkFixate(["link9","Link9"],student_answer3);
            evt.id == "Link10" && linkFixate(["link10","Link10"],student_answer3);
            evt.id == "Link11" && linkFixate(["link11","Link11"],student_answer3);
            evt.id == "Link12" && linkFixate(["link12","Link12"],student_answer3);
            evt.id == "Link13" && linkFixate(["link13","Link13"],student_answer3);
            evt.id == "Link14" && linkFixate(["link14","Link14"],student_answer3);
            evt.id == "Link15" && linkFixate(["link15","Link15"],student_answer3);
            evt.id == "Link16" && linkFixate(["link16","Link16"],student_answer3);
            document.getElementById("lab3_links").value = mas;
            function linkFixate(idNum,student_answer3){
                document.querySelector("."+idNum[0]).style.display = "none";
                document.getElementById(idNum[1]).style.display = "none";
               // document.getElementById("lab3_links").innerHTML = "aa";
                console.log(document.querySelector("."+idNum[0]).innerHTML);
                mas.push(document.querySelector("."+idNum[0]).innerHTML);
                
                console.log(mas);
                // mas.push(document.getElementById(idNum[0]).value);
                var res = [];
                for (var i in student_answer3) {
                    res.push(i);
                 
                }
                
                console.log(res);
                //console.log(student_answer3.res[1]);                          
                console.log(student_answer3[idNum[0]]);
                if (
                    idNum[0]=="link1" ||
                    idNum[0]=="link4" ||
                    idNum[0]=="link5"||
                    idNum[0]=="link8" ||
                    idNum[0]=="link9" ||
                    idNum[0]=="link11" ||
                    idNum[0]=="link13" || 
                    idNum[0]=="link14" ||
                    idNum[0]=="link15" ||
                    idNum[0]=="link16" ){
                            student_answer3[idNum[0]] = true;
                }//
                else if (idNum[0]=="link2" || idNum[0]=="link6" || idNum[0]=="link10"
                || idNum[0]=="link12" || idNum[0]=="link3" ||
               idNum[0]=="link7")
               {
                   student_answer3[idNum[0]] = false;
                   student_answer3[idNum[1]] = true;//test
               }
                //console.log(student_answer3.link1);
                console.log(student_answer3);
                Start.checkAnswer(checkHandler, student_answer3);
                push3.push(document.getElementById(idNum[0].value));
                push3.push(document.getElementById(idNum[1].value));              
            }
            //document.getElementById("lab3_links").value = push3;
            
        }
        //Lab 4
        static onLab4(event){
            var evt = event.target;
            if(evt.id=='butStart' || evt.id=='butStartText'){
                Start.deactive(['butStart','butStartText']);
                setTimeout(()=> {
                    Start.active(['rectEvent1Id','rectEvent1tap1Id','rectEvent1tap2Id','lineClose1Id','lineClose2Id','textRectEventId','lineCheckMark1Id','lineCheckMark2Id']);
                }, 2500);
            }
            if(evt.id == 'task'){
                Start.active(["taskId","taskTextID"]);
                Start.deactive(['ip1','ip2','ip3','ip4','ip5']);
            }
            if(evt.id == 'taskId'){
                Start.deactive(["taskId","taskTextID"]);
                Start.active(['ip1','ip2','ip3','ip4','ip5']);
            }
        }
        static onLab4styleActive(event) {
            var evt = event.target;
            (evt.id == "butStart" || evt.id == 'butStartText' || evt.id == 'butText') && Start.mouseActive(['butStart','butStartText','butText']);
            ((evt.id == "rectEvent1tap1Id") || (evt.id == 'lineClose1Id') || (evt.id == 'lineClose2Id'))&&Start.mouseActive(
                ['rectEvent1tap1Id','lineClose1Id','lineClose2Id']
            );
            ((evt.id == "rectEvent1tap2Id") || (evt.id == 'lineCheckMark1Id') || (evt.id == 'lineCheckMark2Id'))&&Start.mouseActive(
                ['rectEvent1tap2Id','lineCheckMark1Id','lineCheckMark2Id']
            );
            //information ip
            ((evt.id == "infoUser02") || (evt.id == "infoUser02Rect") || (evt.id == "textinfoUser02Rect")||(evt.id == "textInfo02")) && Start.active(
                ['infoUser02Rect','textinfoUser02Rect','textInfo02']
            );
            ((evt.id == "infoUser03") || (evt.id == "infoUser03Rect") || (evt.id == "textinfoUser03Rect")||(evt.id == "textInfo03")) && Start.active(
                ['infoUser03Rect','textinfoUser03Rect','textInfo03']
            );
            ((evt.id == "infoUser04") || (evt.id == "infoUser04Rect") || (evt.id == "textinfoUser04Rect") || (evt.id == "textInfo04"))  && Start.active(
                ['infoUser04Rect','textinfoUser04Rect','textInfo04']
            );
            ((evt.id == "infoUser05") || (evt.id == "infoUser05Rect") || (evt.id == "textinfoUser05Rect") || (evt.id == "textInfo05"))  && Start.active(
                ['infoUser05Rect','textinfoUser05Rect','textInfo05']
            );
            ((evt.id == "infoUser06") || (evt.id == "infoUser06Rect") || (evt.id == "textinfoUser06Rect") || (evt.id == "textInfo06"))  && Start.active(
                ['infoUser06Rect','textinfoUser06Rect','textInfo06']
            );
            ((evt.id == "infoCloud") || (evt.id == "infoCloudRect") || (evt.id == "textinfoCloudRect") || (evt.id == "textinfoCloud"))  && Start.active(
                ['infoCloudRect','textinfoCloudRect','textinfoCloud']
            );
        }
        static onLab4styleDeactive(event){
            var evt = event.target;
            (evt.id != "butStart" || evt.id != 'butStartText' && evt.id != 'butText') && Start.mouseDeactive(['butStart','butStartText','butText']);
            ((evt.id != "rectEvent1tap1Id") || (evt.id != 'lineClose1Id') || (evt.id != 'lineClose2Id')) && Start.mouseDeactive(
                ['rectEvent1tap1Id','lineClose1Id','lineClose2Id']
            );
            ((evt.id != "rectEvent1tap2Id") || (evt.id != 'lineCheckMark1Id') || (evt.id != 'lineCheckMark2Id')) && Start.mouseDeactive(
                ['rectEvent1tap2Id','lineCheckMark1Id','lineCheckMark2Id']
            );
            //information ip 
            ((evt.id != "infoUser02") && (evt.id != "infoUser02Rect") && (evt.id != "textinfoUser02Rect") && (evt.id != "textInfo02"))  && Start.deactive(
                ['infoUser02Rect','textinfoUser02Rect','textInfo02']
            );
            ((evt.id != "infoUser03") && (evt.id != "infoUser03Rect") && (evt.id != "textinfoUser03Rect") && (evt.id != "textInfo03"))  && Start.deactive(
                ['infoUser03Rect','textinfoUser03Rect','textInfo03']
            );
            ((evt.id != "infoUser04") && (evt.id != "infoUser04Rect") && (evt.id != "textinfoUser04Rect") && (evt.id != "textInfo04"))  && Start.deactive(
                ['infoUser04Rect','textinfoUser04Rect','textInfo04']
            );
            ((evt.id != "infoUser05") && (evt.id != "infoUser05Rect") && (evt.id != "textinfoUser05Rect") && (evt.id != "textInfo05"))  && Start.deactive(
                ['infoUser05Rect','textinfoUser05Rect','textInfo05']
            );
            ((evt.id != "infoUser06") && (evt.id != "infoUser06Rect") && (evt.id != "textinfoUser06Rect") && (evt.id != "textInfo06"))  && Start.deactive(
                ['infoUser06Rect','textinfoUser06Rect','textInfo06']
            );
            ((evt.id != "infoCloud") && (evt.id != "infoCloudRect") && (evt.id != "textinfoCloudRect") && (evt.id != "textinfoCloud"))  && Start.deactive(
                ['infoCloudRect','textinfoCloudRect','textinfoCloud']
            );
        }
    
        static mouseActive(idNum){
            for(var k in idNum){
                if(idNum[k] == "butText"){
                    document.getElementById(idNum[k]).classList.remove("mouseNoneText");
                    document.getElementById(idNum[k]).classList.add("mouseOverText");
                }
                else {
                    document.getElementById(idNum[k]).classList.remove("mouseNone");
                    document.getElementById(idNum[k]).classList.add("mouseOver");
                }
            }
        }
    
        static mouseDeactive(idNum){
            for(var k in idNum){
                if(idNum[k] == "butText"){
                    document.getElementById(idNum[k]).classList.remove("mouseOverText");
                    document.getElementById(idNum[k]).classList.add("mouseNoneText");
                }
                else {
                    document.getElementById(idNum[k]).classList.remove("mouseOver");
                    document.getElementById(idNum[k]).classList.add("mouseNone");   
                }
    
            };
        }

        //Lab 2
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
                student_answer.answerBlockUsers = true;
                console.log("user:",student_answer);
            }
            else if((elem.id == "redacRect" || elem.id == "comp2"|| elem.id == "comp3") && dragObject.avatar.id == "rw"){
                elem.farthestViewportElement.children[1].style.stroke = "green";
                elem.farthestViewportElement.children[1].style.fill = "#f2fff4";
                dragObject.avatar.hidden = true;
                elem.farthestViewportElement.children[0].style.stroke = "none";
                student_answer.answerBlockRedac= true;
                console.log("redac:",student_answer);
            }
            else if((elem.id == "admRect" || elem.id == "compadm") && dragObject.avatar.id == "rwx"){
                elem.farthestViewportElement.children[3].style.stroke = "green";
                elem.farthestViewportElement.children[3].style.fill = "#f2fff4";
                dragObject.avatar.hidden = true;
                elem.farthestViewportElement.children[0].style.stroke = "none";
                student_answer.answerBlockAdmin=true;
                console.log("adm:",student_answer);
            }
            else {
                elem.farthestViewportElement.children[0].style.stroke = "red";
                dragObject.avatar.hidden = false;
                dragObject.avatar.rollback();
                student_answer = {
                    'answerBlockRedac': false,
                    'answerBlockAdmin': false,
                    'answerBlockUsers': false,
                }
                console.log('RED',student_answer);
            }
            console.log("result_answer :",student_answer);
            Start.checkAnswer(checkHandler, student_answer);
            
            
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
        addElementTextSVG(amount, jsonObj) {
            //console.log(amount,jsonObj);
            for (amount in jsonObj) {
                //console.log(jsonObj);
                console.log(jsonObj[amount].idnum);
                document.getElementById(jsonObj[amount].idnum).innerHTML += jsonObj[amount].value;
                }
            }
        createElementSVG(name, attributes) {
            this.NS = "http://www.w3.org/2000/svg";
            this.NS1 = "http://www.w3.org/1999/xlink";
            this.element = document.createElementNS(this.NS, name);
            if (name == "svg") {
                this.element.setAttributeNS(null, 'id', 'star')
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
                if ((name=="text")&&(attributes[k]=="link1")){
                    this.element.innerHTML = "http://google.com"
                }
                if ((name=="text")&&(attributes[k]=="link2")){
                    this.element.innerHTML = "https://www.bank.ex.com"
                }
                if ((name=="text")&&(attributes[k]=="link3")){
                    this.element.innerHTML = "http://gogle.com"
                }
                if ((name=="text")&&(attributes[k]=="link4")){
                    this.element.innerHTML = "http://media.ls.urfu.ru"
                }
                if ((name=="text")&&(attributes[k]=="link5")){
                    this.element.innerHTML = "https://ru.wikipedia.org"
                }
                if ((name=="text")&&(attributes[k]=="link6")){
                    this.element.innerHTML = "https://urfu.ru.u"
                }
                if ((name=="text")&&(attributes[k]=="link7")){
                    this.element.innerHTML = "http://trafficconverter.biz"
                }
                if ((name=="text")&&(attributes[k]=="link8")){
                    this.element.innerHTML = "https://vk.com"
                }
                if ((name=="text")&&(attributes[k]=="link9")){
                    this.element.innerHTML = "https://alfabank.ru/"
                }
                if ((name=="text")&&(attributes[k]=="link10")){
                    this.element.innerHTML = "http://vk.my.page.bl"
                }
                if ((name=="text")&&(attributes[k]=="link11")){
                    this.element.innerHTML = "https://intuit.ru"
                }
                if ((name=="text")&&(attributes[k]=="link12")){
                    this.element.innerHTML = "https://facebok.com"
                }
                if ((name=="text")&&(attributes[k]=="link13")){
                    this.element.innerHTML = "https://yandex.ru"
                }
                if ((name=="text")&&(attributes[k]=="link14")){
                    this.element.innerHTML = "https://e1.ru"
                }
                if ((name=="text")&&(attributes[k]=="link15")){
                    this.element.innerHTML = "https://pogoda.ru"
                }
                if ((name=="text")&&(attributes[k]=="link16")){
                    this.element.innerHTML = "https://news.com"
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
            //console.log(amount,jsonObj);
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
    class Labs extends Start {
        constructor() {
            super()
            this.connectionLabs(rect1HandlerUrl,1);
            this.connectionLabs(rect1HandlerUrl,2);
            //console.log("lab1");
            //document.getElementById("widget").addEventListener('click',Start.on);
            this.checkAnswerLab(checkHandlerLab,test);
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

