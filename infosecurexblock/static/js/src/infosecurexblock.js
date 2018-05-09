/* Javascript for InfoSecureXBlock. */
function InfoSecureXBlock(runtime, element) {
    var rect1HandlerUrl = runtime.handlerUrl(element, 'rect1');
    console.log(rect1HandlerUrl)

    class Start {
        constructor() {
            this.star = () => {
                var rect1 = new Rect1();
                var rect2 = new Rect2();
                rect1.createElementSVG('svg');
                rect1.appendNodeSVG(rect1.constract('rect'));
            }
        }

/*         connection(nameFetch, labId) {
            var fetchResult = fetch(nameFetch + "?lab_id=" + labId, {mode: 'cors', method: 'get', dataType: 'json'});

            async function fetchAsync() {
                var response = await fetchResult;
                var data = await response.json();
                return data;
            }

            fetchAsync().then(data => {
                this.jsonObj = data;
                if (this.jsonObj.Rect1) {
                    this.amount = Object.keys(this.jsonObj.Rect1).length;
                    //console.log(this.amount,this.jsonObj.Rect1);
                    this.addElementSVG(this.amount, this.jsonObj.Rect1);
                }
                if (this.jsonObj.Rect2) {
                    this.amount = Object.keys(this.jsonObj.Rect2).length;
                    this.addElement(this.amount, this.jsonObj.Rect2);
                }
            })
        } */

         connection(handler, labId) {
             var self = this;
             function success(handler) {
                 console.log(handler);
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
        on(){
            //console.log(this);
            var elem;
            var answer = {};
            function active(idNum) {
                elem = document.getElementById(idNum)
                elem.style.display = 'block';
            }
            function deactive(idNum){
                elem = document.getElementById(idNum)
                elem.style.display = 'none';
            }
            function getQuest(){
                var fetchResult = fetch("http://localhost:5000/labs1/check/", {mode: 'cors',method: 'get',dataType: 'json'});
                async function fetchAsync () {
                    var response = await fetchResult;
                    var data = await response.json();
                    return data;
                }
                fetchAsync().then(data => {
                    if(data.answer=='true'){
                        alert('Правльно');
                    }
                    else{
                        alert('Не правильно!');
                    }
                })
            }
             var remember = "";
            if(this.id=='comp1'){
                document.getElementById("comp1").style.opacity ="0.5";
             if (remember!=""){
                 //  alert(remember);

                 document.getElementById(remember).style.opacity = "1";
                }
                remember = this.id;
            }
            if(this.id=='comp2'){
                document.getElementById("comp2").style.opacity = "0.5";
                
                if (remember!= null){
                //    alert(remember);
                    document.getElementById(remember).style.opacity = "1";
                }
                remember = this.id;
            }
            if(this.id=='comp3'){
                document.getElementById("comp3").style.opacity = "0.5";
               
                if (remember!=null){
                    document.getElementById(remember).style.opacity = "1";
                }
                remember = this.id;
            }
            if(this.id=='task'){
                active('taskId');
                active('taskTextID');
                document.getElementById('taskTextID').innerHTML= $('.task_text', element).text();
            }
            if(this.id=='taskId'){
                deactive('taskId');
                deactive('taskTextID');
            }
            if(this.id == 'File1')
            {
                active('File1Id');
                active('File1TextID');
                active('File1TextID2');
                document.getElementById("File1TextID").innerHTML= "Сообщение:406 9915660 05464616061 - 9915660";
                document.getElementById("File1TextID2").innerHTML = "Ключ: 2,10";
            }
            if(this.id != "File1")
            {
                deactive('File1Id');
                deactive('File1TextID');
                deactive('File1TextID2');
        
            }
            if((this.id=="comp1")||(this.id=='ip1'))
            {
                document.getElementById('ip').value = '192.168.0.3';
                //document.getElementById('class').fill = 'black';
                active('File1Id');
                active('File1TextID');
                active('File1TextID2');
            }
            if((this.id=="comp2")||(this.id=='ip2'))
            {
                document.getElementById('ip').value = '192.168.0.4';
                active('File1Id');
                active('File1TextID');
                active('File1TextID2');
            }
            if((this.id=="comp3")||(this.id=='ip3'))
            {
                document.getElementById('ip').value = '192.168.0.5';
                active('File1Id');
                active('File1TextID');
                active('File1TextID2');
            }
            if((this.id=='checkid')&&(document.getElementById(this.id).value!=undefined))
            { var count=0;
                var l=0; var count_num = 0;
                var k = document.getElementById('ip').value;
                var d = document.getElementById('d').value;
                var N = document.getElementById('N').value;
                var e = document.getElementById('e').value;
                var k2 = k.length;
                var empty = false;
                  var k4 = "";
                  var che = 0;
                  var b = checkIsIPV4(k); 
                  if (k2 == 0 || d.length == 0 || N.length == 0 || e.length == 0){
                      alert("Пустые поля ввода."); 
                      che++;  empty = true;
                     }
                 if (b == false && empty!=true)
                 {
                     alert("Некорректный IP адрес.");
                 }
                if(isNumeric(d) == false && empty!=true){
                    alert('Некорректный закрытый ключ (d).');
                    che++;
                  }
                if(isNumeric(N)==false && empty!=true){
                    alert('Некорректный закрытый ключ (N).');
                    che++;
                  }
                if(isNumeric(e)==false && empty!=true){
                    alert('Некорректное сообщение! Введите сообещние в численном виде.');
                    che++;
                  }
               
                if(che == 0 && b == true && empty!=true){
                

                answer['ip'] = document.getElementById('ip').value;
                answer['d'] = document.getElementById('d').value;
                answer['N'] = document.getElementById('N').value;
                answer['e'] = document.getElementById('e').value;

                function checkAnswer(){
                    fetch("http://localhost:5000/labs1/check/", {
                        method: "POST",
                        headers: {
                        'Content-Type': 'application/json'
                        },
                    
                        //make sure to serialize your JSON body
                        body: JSON.stringify(answer)
                    })
                }}
                checkAnswer();
                if(answer!={}){
                    getQuest();
                }
            }
            else if(this.id=='checkid') {
                console.log('Error:не все поля заполненны.')
            }
            console.log(answer); 
        } 
}
function MakeTransparent(evt) {
     evt.target.setAttributeNS(null,"opacity","0.5");
    }
    function MakeOpaque(evt) {
     evt.target.setAttributeNS(null,"opacity","1");
        }
    
function checkIsIPV4(entry) {
    var blocks = entry.split(".");
    if(blocks.length === 4) {
      return blocks.every(function(block) {
        return parseInt(block,10) >=0 && parseInt(block,10) <= 255;
      });
    }
    return false;
  }
function isNumeric(n) {
    
    return !isNaN(parseFloat(n)) && isFinite(n);
    
 }

    class Rect1 extends Start{
        constructor(){
            super()
            this.defaultSet ={
                x:0,
                y:0,
                width:850,
                height:850,
                fill:'#f5f5f5',
                class:'rect1'
            }
            //this.constract();
            this.connection(rect1HandlerUrl,1);
            //this.on =() => {
                    //console.log(this);
                /* if(this.jsonObj.Rect1=='task'){
                    this.active('taskId');
                    this.active('taskTextID');
                    document.getElementById('taskTextID').innerHTML ="hi";
                    console.log(this);
                }
                if(this.id=='taskId'){
                    this.deactive('taskId');
                    this.deactive('taskTextID');
                } */
            //}  
        }
        constract(name){
            return this.createElementSVG(name,this.defaultSet);
        }
        createElementSVG(name, attributes){
            this.NS = "http://www.w3.org/2000/svg";
            this.NS1 = "http://www.w3.org/1999/xlink";
            this.element = document.createElementNS(this.NS, name);
            if(name=="svg")
            {
                document.getElementById("widget").appendChild(this.element);
                //document.querySelector('svg').appendChild(document.createElement('g'));
            }
            if (attributes){
                for (var k in attributes){
                    if((name=="text")&&(attributes[k]=="ip1")){
                        this.element.innerHTML = '192.168.0.3'
                    }
                    if((name=="text")&&(attributes[k]=="ip2")){
                        this.element.innerHTML = '192.168.0.4'
                    }
                    if((name=="text")&&(attributes[k]=="ip3")){
                        this.element.innerHTML = '192.168.0.5'
                    }
                    if(attributes[k]=="image"){
                        this.element.setAttributeNS(this.NS1,[k],attributes[k]);
                        this.element.onclick = this.on;
                    }
                    else if (attributes[k]!="image"){
                        this.element.setAttributeNS(null,[k],attributes[k]);
                        this.element.onclick = this.on;
                    }
                }
            return this.element;
            }
        }
        appendNodeSVG(element){
            //var test =  document.querySelector('g');
        // var test1= document.createElement('g');
        // test.setAttribute("class","test1");
            var svg = document.querySelector('svg');
            //svg.setAttribute("xmlns","http://www.w3.org/2000/svg");
    /*         if(this.element.classList=="rect1"){
                document.querySelector('svg').appendChild(element);
            } */
            //test.appendChild(test1);
            return svg.appendChild(element);
        }
        addElementSVG(amount,jsonObj){
            // console.log(amount,jsonObj);
            for(amount in jsonObj)
                {
                    //console.log(jsonObj[amount].type,jsonObj[amount]);
                    this.appendNodeSVG(this.createElementSVG(jsonObj[amount].type,jsonObj[amount]));
                }
        }
    } 

    class Rect2 extends Start{
        constructor(){
            super();
            this.connection(rect1HandlerUrl,2);
        }
        createElementSimple(name,attributes){
            this.element = document.createElement(name);
            if(name==='button')
                {
                    this.element.innerHTML = "Отправить на проверку";
                }
            
            if (attributes){
                for (var k in attributes){
                    this.element.setAttribute([k],attributes[k]);
                    this.element.onclick = this.on;
                }
            return this.element;
            }
        }
        addElement(amount,jsonObj){
            for(amount in jsonObj)
                {
                    //console.log(jsonObj[amount].type);
                    this.appendNode(this.createElementSimple(jsonObj[amount].type,jsonObj[amount]));
                }
        }
        appendNode(element){
            return document.getElementById('widget').appendChild(element);
        }
    }
    class Rect3 extends Rect2{
        constructor(){
            super();
        }
    }


//автоматически вызываемая функция создаёт пространство
//рабочей области + формирует создание области настроек
//и кнопки отправки на проверку.

    /* function File12(){
        alert('Посмотреть сообщение');
        var message = document.createAttribute('div');
        message
       // this.element.width= 60;
        // var img1 = document.getElementById("12");
        // this.element.height = 60;
     }*/


    // $('p', element).click(function (eventObject) {
    //     $.ajax({
    //         type: "POST",
    //         url: handlerUrl,
    //         data: JSON.stringify({"hello": "world"}),
    //         success: updateCount
    //     });
    // });

    (function () {
        /* Here's where you'd do things on page load. */
        var test = new Start();
        test.star();
    })();

}

