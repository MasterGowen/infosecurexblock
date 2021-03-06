
/* Javascript for InfoSecureXBlock. */
function InfoSecureXBlock(runtime, element) {
    var rect1HandlerUrl = runtime.handlerUrl(element, 'rect1');
    var checkHandler = runtime.handlerUrl(element, 'check');
    var checkHandlerLab = runtime.handlerUrl(element, 'checkLab');
    var param = getRandomInt(1,11).toString();
    var global_N = getRandomInt(2,1000);
    var global_d = getRandomInt(2,7);
    while (global_d >= global_N || !prime(global_d)){
        var global_d = getRandomInt(1,7);
    }
    global_d.toString();global_N.toString();
    function prime(global_d){
        if (global_d < 2){
            return false;
        }
        else if (global_d == 2){
            return true; 
        }
        var i = 2;
        limit = Math.sqrt(global_d);
        while (i <= limit){
            if (global_d % i == 0)
                return false
            i += 1
        }
        return true;
    } 
    var mes ="mes_id" + param; //tets
    var keys = "";//"key_id" +param;
    var param2 = "mas"+getRandomInt(1,11);
    var alfa = getRandomInt(3,34);
    var mas1 = ["б", "е", "з", "о", "п", "а", "с", "н", "о", "с", "т", "ь"];
    var mas2 = ["и", "н", "ф", "о", "р", "м", "а", "т", "и", "к", "а"];
    var mas3 = ["ш", "и", "ф", "р", "о", "в", "а", "н", "и", "е"];
    var mas4 = ["к", "и", "б", "е", "р", "б", "е", "з", "о", "п", "а", "с", "н", "о", "с", "т", "ь"];
    var mas5 = ["и", "н", "ф", "о", "р", "м", "а", "ц", "и", "я"];
    var mas6 = ["м", "у", "л", "ь", "т", "и", "м", "е", "д", "и", "а"];
    var mas7 = ["п", "р", "о", "г", "р", "а", "м", "м", "а"];
    var mas8 = ["и", "н", "т", "е", "р", "н", "е", "т"];
    var mas9 = ["м", "е", "д", "и", "а", "к", "о", "м", "м", "у", "н", "и", "к", "а", "ц", "и", "я"];
    var mas10 = ["а", "л", "г", "о", "р", "и", "т", "м"];
    var alphabet = ["а", "б", "в", "г", "д", "е", "ё", "ж", "з", "и", "й", "к", "л", "м", "н",
    "о", "п", "р", "с", "т", "у", "ф", "х", "ц", "ч", "ш", "щ", "ъ", "ы", "ь", "э", "ю", "я"]
    console.log(param);
    
    function successCheck(result) {
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
                document.getElementById('widget').addEventListener('click', Start.onLab1);
                document.getElementById('taskTextID').innerHTML = $('.task_text', element).text();
                document.getElementById('widget').addEventListener('click',Start.taskBlock);
                break;
            }
            case 2:{
                document.getElementById('widget').addEventListener('mousedown', Start.dragMouseDown);
                document.getElementById('taskTextID').innerHTML = $('.task_text', element).text();
                document.getElementById('widget').addEventListener('click', Start.taskBlock);
                break;
            }
            case 3:{
                document.getElementById('widget').addEventListener('click', Start.onLab3);
                document.getElementById('taskTextID').innerHTML = $('.task_text', element).text();
                document.getElementById('widget').addEventListener('click',Start.taskBlock);
                break;
            }
            case 4:{
                document.getElementById('taskTextID').innerHTML = $('.task_text', element).text();
                document.getElementById('widget').addEventListener('click', Start.taskBlock);
                document.getElementById('widget').addEventListener('click', Start.onLab4);
                document.getElementById("widget").addEventListener('mouseover',Start.onLab4styleActive);
                document.getElementById("widget").addEventListener('mouseout',Start.onLab4styleDeactive);
                break;
            }
            case 5:{
                 document.getElementById('widget').addEventListener('click', Start.onLab5);
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
          // console.log("zachlo v taskblock");
            var evt = event.target;
            if(evt.id == 'task'){
                Start.active(["taskId","taskTextID","arrowid"]);
                Start.deactive(['ip1','ip2','ip3','ip4','ip5','redact','admin','users',mes, keys]);
            }
            if(evt.id == 'taskId'){
                Start.deactive(["taskId","taskTextID","arrowid"]);
                Start.active(['ip1','ip2','ip3','ip4','ip5','redact','admin','users', mes, keys]);
            }
            if(evt.id == 'arrowid'){
                Start.deactive(["taskId","taskTextID","arrowid"]);
                Start.active(['ip1','ip2','ip3','ip4','ip5','redact','admin','users', mes, keys]);
            }
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
        static active(idNum) {
            for(var k in idNum){
                if(document.getElementById(idNum[k])!=null){
                    document.getElementById(idNum[k]).classList.remove("taskClose");
                    document.getElementById(idNum[k]).classList.add("taskOpen");                    
                }
            };
        }
        static value2(idNum) {
            for(var k in idNum){
                document.getElementById(idNum[k]);
                console.log(
                    document.getElementById(idNum[k]));
            };
        }
        static deactive(idNum) {
            for(var k in idNum){
                if(document.getElementById(idNum[k])!=null){
                    document.getElementById(idNum[k]).classList.remove("taskOpen");
                    document.getElementById(idNum[k]).classList.add("taskClose");
                }
            };
        }
        static deactive2(idNum) {
            for(var k in idNum){
               // document.querySelector("."+idNum[k]).style.display = "none";
                document.getElementById(idNum[k]).style.display = "none";
            };
        }
        //Lab 1
        static onLab1(event) {
            var evt = event.target;
            var student_answer = {};
            evt.id == "comp1" && connect(['comp1','comp2','comp3','activeComp','192.168.0.3']);
            evt.id == "comp2" && connect(['comp2','comp1','comp3','activeComp','192.168.0.4']);
            evt.id == "comp3" && connect(['comp3','comp2','comp1','activeComp','192.168.0.5']);
            evt.id == 'File1' && fileShow();
            evt.id != 'File1' && Start.deactive(['File1Id','File1TextID','File1TextID2',keys,mes]);
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
           
            function fileShow(){
                console.log("keys :" ,keys, mes); 
                var keys2 = "Ключ: "+ global_d + "," + global_N;
                Start.active(['File1Id','File1TextID','File1TextID2',keys, mes]);
                document.getElementById("File1TextID2").innerHTML = keys2;
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
                    alert("Некорректный IP адрес.");
                }
                if (isNumeric(d) == false && empty != true|| d.toString()!=global_d) {
                    alert('Некорректный закрытый ключ (d).');
                    che++;
                }
                if (isNumeric(N) == false && empty != true || N.toString()!=global_N ) {
                    alert('Некорректный закрытый ключ (N).');
                    che++;
                }
                if (isNumeric(e) == false && empty != true) {
                    alert('Некорректное сообщение! Введите сообещние в численном виде.');
                    che++;
                }
               // var key = "mes_id" + param;

                console.log("key ---", mes.toString());
                if (che == 0 && b == true && empty != true) {

                    var student_answer =
                        {
                            'ip': document.getElementById('ip').value,
                            'd': document.getElementById('d').value,
                            'N': document.getElementById('N').value,
                            'e': document.getElementById('e').value,
                            'key': mes
                        }
                    Start.checkAnswer(checkHandler, student_answer);
                }
            }
            else if (evt.id == 'checkid') {
                console.log('Error:не все поля заполненны.')
            }

        }

        static checkAnswer(checkHandler, student_answer) {
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

        //Lab 3
        static onLab3(event) {
            //link заменить на links
            var evt = event.target;
            var student_answer = {};
            var mas_count = 0;
            function Time3Lab(time,NumLink){
                var k = 1;
                var timeDeactive = 6000; //3000
                console.log("v time3lab", k, NumLink);
                    for(k=1; k<= NumLink; k++){
                        console.log("v cikle");
                        (function (k)
                    {var k2 = k.toString();
                        console.log('test: ',time,' ',NumLink,' ',k,'  link'+k,' Link'+k);
                       var kk = 'link'+k2;
                       var KK = "Link" +k2;
                        setTimeout(()=>{
                            Start.active([kk, KK]); 
                         }, time);time+=4000;
                        setTimeout(()=>{
                            console.log(kk, KK);
                             Start.deactive2([kk, KK]); 
                         }, timeDeactive);timeDeactive+=4000;
                    })(k);
                    }
                 }
            evt.id == 'taskId'&& Time3Lab(3000,16);
            console.log("vishlo iz dichi");
            var push3 =[]; var mas = [];
            (evt.id == "Link1" || evt.id == "link1") && linkFixate(["link1","Link1"],student_answer3);
            (evt.id == "Link2" || evt.id == "link2") && linkFixate(["link2","Link2"],student_answer3);
            (evt.id == "Link3" || evt.id == "link3") && linkFixate(["link3","Link3"],student_answer3);
            (evt.id == "Link4" || evt.id == "link4") && linkFixate(["link4","Link4"],student_answer3);
            (evt.id == "Link5" || evt.id == "link5") && linkFixate(["link5","Link5"],student_answer3);
            (evt.id == "Link6" || evt.id == "link6") && linkFixate(["link6","Link6"],student_answer3);
            (evt.id == "Link7" || evt.id == "link7") && linkFixate(["link7","Link7"],student_answer3);
            (evt.id == "Link8" || evt.id == "link8") && linkFixate(["link8","Link8"],student_answer3);
            (evt.id == "Link9" || evt.id == "link9") && linkFixate(["link9","Link9"],student_answer3);
            (evt.id == "Link10" || evt.id == "link10") && linkFixate(["link10","Link10"],student_answer3);
            (evt.id == "Link11" || evt.id == "link11") && linkFixate(["link11","Link11"],student_answer3);
            (evt.id == "Link12" || evt.id == "link12") && linkFixate(["link12","Link12"],student_answer3);
            (evt.id == "Link13" || evt.id == "link13") && linkFixate(["link13","Link13"],student_answer3);
            (evt.id == "Link14" || evt.id == "link14") && linkFixate(["link14","Link14"],student_answer3);
            (evt.id == "Link15" || evt.id == "link15") && linkFixate(["link15","Link15"],student_answer3);
            (evt.id == "Link16" || evt.id == "link16") && linkFixate(["link16","Link16"],student_answer3);
          //document.getElementById("lab3_links").value = mas;
            function linkFixate(idNum,student_answer3){
                //document.querySelector("."+idNum[0]).style.display = "none";
                document.getElementById(idNum[0]).style.display = "none";
                document.getElementById(idNum[1]).style.display = "none";
             ///  mas.push(document.getElementById(idNum[0]).value);
             //   console.log("push mas ---",idNum[0], document.getElementById(idNum[0]).value);
                var res = [];
                for (var i in student_answer3) {
                    res.push(i);
                 
                }
                //console.log("linkiiiii ", (idNum[0]));
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
                }
                else if (idNum[0]=="link2" || idNum[0]=="link6" || idNum[0]=="link10"
                || idNum[0]=="link12" || idNum[0]=="linkd3" ||
               idNum[0]=="link7")
               {
                   student_answer3[idNum[0]] = false;
               }
                Start.checkAnswer(checkHandler, student_answer3);
                push3.push(document.getElementById(idNum[0].value));
                push3.push(document.getElementById(idNum[1].value));              
            }
            
        }
        //Lab 5
        static onLab5(event) {
            var evt = event.target;
            var student_answer = {};;
            if (param2 =="mas1")
            var old_alphabet = mas1;//split("");//["э", "к", "р", "а", "н"]
            if (param2 =="mas2")
            var old_alphabet = mas2;
            if (param2 =="mas3")
            var old_alphabet = mas3;
            if (param2 =="mas4")
            var old_alphabet = mas4;
            if (param2 =="mas5")
            var old_alphabet = mas5;
            if (param2 =="mas6")
            var old_alphabet = mas6;
            if (param2 =="mas7")
            var old_alphabet = mas7;
            if (param2 =="mas8")
            var old_alphabet = mas8;
            if (param2 =="mas9")
            var old_alphabet = mas9;
            if (param2 =="mas10")
            var old_alphabet = mas10;
       
        var len = old_alphabet.length; //document.getElementById(mes).len;
        var bukva = alphabet[alfa-1];
        var keys = bukva;//"key_id"+param; 
        var new_alphabet = []; var new_i = [];
        for (var j=0; j<alphabet.length; j++){
        for (var i =0; i < len; i++){
        
            if (alphabet[j]==old_alphabet[i])
            
            new_i[i] = j+alfa+1;
            if (new_i[i]>33){
                new_i[i] = new_i[i]-33;
                console.log("itog i", new_i[i]);
            }
            new_alphabet[i] = alphabet[new_i[i]-1];
            }
      
            } 
            var mes = new_alphabet.join("");//"mes_id"+param;
            console.log()
            console.log(new_i);
            console.log("alphabet ---", mes);
            evt.id == "comp1" && connect(['comp1','comp2','comp3','activeComp','192.168.0.3']);
            evt.id == "comp2" && connect(['comp2','comp1','comp3','activeComp','192.168.0.4']);
            evt.id == "comp3" && connect(['comp3','comp2','comp1','activeComp','192.168.0.5']);
            evt.id == 'File1' && fileShow();
            evt.id != 'File1' && Start.deactive(['File1Id','File1TextID','File1TextID2', mes,keys]);
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

            function fileShow(){
                //console.log("keys :" ,keys, mes); 
                Start.active(['File1Id','File1TextID','File1TextID2',keys, mes]);

            //  document.getElementById("File1Id").innerHTML = keys;
            }
            if (evt.id =="File1"){
                keys= "Ключ: " +keys;
                mes="Сообщение: "+mes;
                document.getElementById("File1TextID2").innerHTML = keys;
                document.getElementById("File1TextID").innerHTML = mes;
            }
            if (evt.id == "Link"){
                document.getElementById('Link').style.display = "block";
            } if ((evt.id == 'checkid') && (document.getElementById(evt.id).value != undefined)) {
                
                var e = document.getElementById('e').value;
                var empty = false;
                var che = 0;
                
                if ( e.length == 0) {
                    alert("Пустые поля ввода.");
                    che++;
                    empty = true;
                }
                
                if (isNumeric(e) == true && empty != true) {
                    alert('Некорректное сообщение! Введите сообещние в письменном виде.');
                    che++;
                }

                if (che == 0 &&  empty != true) {
                   
                    e = window.btoa(unescape(encodeURIComponent(e)));
                    console.log(e);
                    var student_answer =
                        {
                            'e': e,
                            'key': param2
                        }
                    Start.checkAnswer(checkHandler, student_answer);
                }
            }
            else if (evt.id == 'checkid') {
                console.log('Error:не все поля заполненны.')
            }

        }
        //Lab 4
        
        static ipInfo(k,NumLink,statusBlock,evt){
            if(statusBlock=='active'){
                for(; k <= NumLink; k++){
                    //console.log('test: ',' ',NumLink,' ',k,'  link'+k,' Link'+k);
                    var infoUser = 'infoUser' +k.toString();
                    var infoUserRect = "infoUserRect" +k.toString();
                    var textinfoUserRect = 'textinfoUserRect'+k.toString();
                    var textInfo = "textInfo" +k.toString();
                    ((evt.id == infoUser) || (evt.id == infoUserRect) || (evt.id == textinfoUserRect)||(evt.id == textInfo)) &&Start.active(
                        [infoUserRect,textinfoUserRect,textInfo]
                    );
                }
            }
            else if(statusBlock=='deactive'){
                for(; k <= NumLink; k++){
                    //console.log('test: ',' ',NumLink,' ',k,'  link'+k,' Link'+k);
                    var infoUser = 'infoUser'+k.toString();
                    var infoUserRect = "infoUserRect" +k.toString();
                    var textinfoUserRect = 'textinfoUserRect'+k.toString();
                    var textInfo = "textInfo" +k.toString();
                    ((evt.id != infoUser) && (evt.id != infoUserRect) && (evt.id != textinfoUserRect) && (evt.id != textInfo)) &&Start.deactive(
                        [infoUserRect,textinfoUserRect,textInfo]
                    );
                }
            }
        }
        static getRandomIntMas(min, max, num) {
            var i, arr = [], res = [];
            for (i = min; i <= max; i++ ) arr.push(i);
            for (i = 0; i < num; i++) res.push(arr.splice(Math.floor(Math.random() * (arr.length)), 1)[0])
            return res;
        }
        static moveEventRect(idNum, x1offset, y1offset, x2offset, y2offset){
            for(var k = 0; k < idNum.length; k++){
                var elem = document.getElementById(idNum[k]);
    
                if(document.getElementsByTagName('rect')){
                    var x = elem.getAttribute('x');
                    var y = elem.getAttribute('y');  
                    elem.setAttribute('x',parseInt(x)+x1offset);
                    elem.setAttribute('y',parseInt(y)+y1offset);
                }
                if(document.getElementsByTagName('line')){
                    var x1 = elem.getAttribute('x1');
                    var y1 = elem.getAttribute('y1');
                    var x2 = elem.getAttribute('x2');
                    var y2 = elem.getAttribute('y2');
                    elem.setAttribute('x1',parseInt(x1)+x1offset);
                    elem.setAttribute('y1',parseInt(y1)+y1offset);
                    elem.setAttribute('x2',parseInt(x2)+x2offset);
                    elem.setAttribute('y2',parseInt(y2)+y2offset);
                }
    
            }
    
        }
        static onLab4(event){
            var evt = event.target;
            if(evt.id=='arrowid' || evt.id=='taskId'){
                var randArr = Start.getRandomIntMas(1,5,5);
                var i=0;
                function myLoop(){
                    setTimeout(function () {
                        var choise = randArr[i];
                        showNextEvent(choise);
                        i++; 
                        if (i < randArr.length) {
                           myLoop(); 
                        }
                     }, 10000)
                }
                myLoop();
            }
            if(evt.id == 'rectEventtapId1'|| evt.id == 'lineCloseId1' || evt.id == 'lineCloseId2'){
                var student_answer = {
                    "event": 0,
                    "eventId": checkText()
                }
                Start.checkAnswer(checkHandler,student_answer);
                console.log("student_answer",student_answer);
            }
            if(evt.id == 'rectEventtapId2'|| evt.id == 'lineCheckMarkId1' || evt.id == 'lineCheckMarkId2'){
                var student_answer = {
                    "event": 1,
                    "eventId": checkText()
                }
                Start.checkAnswer(checkHandler,student_answer);
                console.log("student_answer",student_answer);
            }
            //Start.RectInfo(4,12,"deactive",evt);
            function checkText() {//вроде робит
                var arr = [];
                for(var k = 1; k < 7; k++){
                    var textRectEventId = "textRectEventId"+k.toString();
                    arr.push(textRectEventId);
                }
                for(var k = 0; k < arr.length ;k++ ){
                        if(document.getElementById(arr[k]).classList.contains('taskOpen')){
                            console.log(arr[k]);
                            return arr[k]
                        }
                    console.log(document.getElementById(arr[k]).classList.contains('taskOpen'));
                }   
            }
            function showNextEvent(choise){
                var idTabs = ['rectEventId1','rectEventtapId1','rectEventtapId2','lineCloseId1','lineCloseId2','lineCheckMarkId1','lineCheckMarkId2'];
                switch(choise){
                    case 1:{
                        Start.moveEventRect(idTabs,0,0,0,0);
                        idTabs.push('textRectEventId1');
                        Start.active(idTabs);
                        setTimeout(()=> {
                            Start.deactive(idTabs);
                            idTabs.pop();
                        }, 6500);
                        break;
                    }
                    case 2:{
                        Start.moveEventRect(idTabs,225,0,225,0);
                        idTabs.push('textRectEventId2');
                        Start.active(idTabs);  
                        setTimeout(()=> {
                            Start.deactive(idTabs);
                            idTabs.pop();
                        }, 6500);
                        setTimeout(()=>{
                            Start.moveEventRect(idTabs,-225,0,-225,0);
                        },7600)
                        break;
                    }
                    case 3:{
                        Start.moveEventRect(idTabs,-50,300,-50,300);
                        idTabs.push('textRectEventId3');
                        Start.active(idTabs); 
                        setTimeout(()=> {
                            Start.deactive(idTabs);
                            idTabs.pop();
                        }, 6500);
                        setTimeout(()=>{
                            Start.moveEventRect(idTabs,50,-300,50,-300);
                        },7600)
                        break;
                    }
                    case 4:{
                        Start.moveEventRect(idTabs,100,350,100,350);
                        idTabs.push('textRectEventId4');
                        Start.active(idTabs);
                        setTimeout(()=> {
                            Start.deactive(idTabs);
                            idTabs.pop();
                        }, 6500);
                        setTimeout(()=>{
                            Start.moveEventRect(idTabs,-100,-350,-100,-350);
                        },7600)
                        break;
                    }
                    case 5:{
                        Start.moveEventRect(idTabs,340,300,340,300);
                        idTabs.push('textRectEventId5');
                        Start.active(idTabs);
                        setTimeout(()=> {
                            Start.deactive(idTabs);
                            idTabs.pop();
                        }, 6500);
                        setTimeout(()=>{
                            Start.moveEventRect(idTabs,-340,-300,-340,-300);
                        },7600)
                        break;
                    }
                    case 6:{
                        Start.moveEventRect(idTabs,100,-200,100,-200);
                        idTabs.push('textRectEventId6');
                        Start.active(idTabs);
                        setTimeout(()=> {
                            Start.deactive(idTabs);
                            idTabs.pop();
                        }, 6500);
                        setTimeout(()=>{
                            Start.moveEventRect(idTabs,-100,200,-100,200);
                        },6700)
                        break;
                    }
                    case 7:{
                        Start.moveEventRect(idTabs,225,0,225,0);
                        idTabs.push('textRectEventId7');
                        Start.active(idTabs);  
                        setTimeout(()=> {
                            Start.deactive(idTabs);
                            idTabs.pop();
                        }, 2000);
                        setTimeout(()=>{
                            Start.moveEventRect(idTabs,-225,0,-225,0);
                        },2700)
                        break;
                    }
                    case 8:{
                        Start.moveEventRect(idTabs,-50,300,-50,300);
                        idTabs.push('textRectEventId8');
                        Start.active(idTabs); 
                        setTimeout(()=> {
                            Start.deactive(idTabs);
                            idTabs.pop();
                        }, 2000);
                        setTimeout(()=>{
                            Start.moveEventRect(idTabs,50,-300,50,-300);
                        },2700)
                        break;
                    }
                    case 9:{
                        Start.moveEventRect(idTabs,100,350,100,350);
                        idTabs.push('textRectEventId9');
                        Start.active(idTabs);
                        setTimeout(()=> {
                            Start.deactive(idTabs);
                            idTabs.pop();
                        }, 2000);
                        setTimeout(()=>{
                            Start.moveEventRect(idTabs,-100,-350,-100,-350);
                        },2700)
                        break;
                    }
                    case 10:{
                        Start.moveEventRect(idTabs,340,300,340,300);
                        idTabs.push('textRectEventId10');
                        Start.active(idTabs);
                        setTimeout(()=> {
                            Start.deactive(idTabs);
                            idTabs.pop();
                        }, 2000);
                        setTimeout(()=>{
                            Start.moveEventRect(idTabs,-340,-300,-340,-300);
                        },2700)
                        break;
                    }
                }
            }
        }
        static onLab4styleActive(event) {
            var evt = event.target;
            (evt.id == "butStart" || evt.id == 'butStartText' || evt.id == 'butText') && Start.mouseActive(['butStart','butStartText','butText']);
    
            //information ip
            Start.ipInfo(1,7,"active",evt);
                for(var k=1; k <= 12; k++){
                    if(k % 2 ==0){
                        var lineCloseId2 = 'lineCloseId'+k.toString();   
                    }
                    else if(k % 2 == 1){
                        var rectEventtapId1 = 'rectEventtapId'+k.toString(); 
                        var lineCloseId1 = 'lineCloseId'+k.toString();
                    }
                    if((evt.id == rectEventtapId1)||(evt.id == lineCloseId1)||(evt.id == lineCloseId2)){
                    Start.mouseActive([rectEventtapId1,lineCloseId1,lineCloseId2]);
                    }        
                }
                for(var k=1; k <= 12; k++){
                    if(k % 2 == 0){
                        var rectEventtapId2 = 'rectEventtapId'+k.toString();     
                        var lineCheckMarkId2 = 'lineCheckMarkId'+k.toString();
                    }
                    else if(k % 2 == 1){
                        var lineCheckMarkId1 = 'lineCheckMarkId'+k.toString();
                    }
                    if((evt.id == rectEventtapId2)||(evt.id == lineCheckMarkId1)||(evt.id == lineCheckMarkId2)){
                        Start.mouseActive([rectEventtapId2,lineCheckMarkId1,lineCheckMarkId2]);
                    }
                    
                }
        }
        static onLab4styleDeactive(event){
            var evt = event.target;
            (evt.id != "butStart" || evt.id != 'butStartText' && evt.id != 'butText') && Start.mouseDeactive(['butStart','butStartText','butText']);
    
            //information ip
            Start.ipInfo(1,7,"deactive",evt); 
                for(var j=1; j <= 12; j++){
                    var rectEventtapId1 = 'rectEventtapId'+j.toString();
                    var rectEventtapId2 = 'rectEventtapId'+(j-1).toString();
                    var lineCloseId1 = 'lineCloseId'+j.toString();
                    var lineCheckMarkId1 = 'lineCheckMarkId'+j.toString();
                    var lineCloseId2 = 'lineCloseId'+(j-1).toString();
                    var lineCheckMarkId2 = 'lineCheckMarkId'+(j-1).toString();
                    if((evt.id != rectEventtapId1)||(evt.id != rectEventtapId2)||(evt.id != lineCloseId1)||(evt.id != lineCloseId2)||(evt.id != lineCheckMarkId1)||(evt.id != lineCheckMarkId2)){
                    Start.mouseDeactive([rectEventtapId1,lineCloseId1,lineCheckMarkId1]);
                }   
            }
        }
    
        static mouseActive(idNum){
            for(var k in idNum){
                if(idNum[k] == "butText"){
                    document.getElementById(idNum[k]).classList.remove("mouseNoneText");
                    document.getElementById(idNum[k]).classList.add("mouseOverText");
                }
                else if(document.getElementById(idNum[k])!=null){
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
                else if(document.getElementById(idNum[k])!=null){
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
            if(elem.classList.contains('draggable')||(elem.id == "action")||(elem.classList.contains('infosecurexblock_block'))||(elem.classList.contains('container'))){
                dragObject.avatar.hidden = false;
                dragObject.avatar.rollback();
            }
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
                //console.log("zashlo v addelementtextsvg", document.getElementById(jsonObj[amount].idnum));
               // console.log(jsonObj[amount].value);
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
    function getRandomInt(min, max) {///между максимумом(невключительно) и минимумом(включ)
        return Math.floor(Math.random() * (max - min)) + min;
      }
    function isNumeric(n) {

        return !isNaN(parseFloat(n)) && isFinite(
            n);

    }
    class Labs extends Start {
        constructor() {
            super()
            this.connectionLabs(rect1HandlerUrl,1);
            this.connectionLabs(rect1HandlerUrl,2);
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

