/* Javascript for InfoSecureXBlock. */
function InfoSecureXBlock(runtime, element) {


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

    var handlerUrl = runtime.handlerUrl(element, 'increment_count');

    // $('p', element).click(function (eventObject) {
    //     $.ajax({
    //         type: "POST",
    //         url: handlerUrl,
    //         data: JSON.stringify({"hello": "world"}),
    //         success: updateCount
    //     });
    // });


}
