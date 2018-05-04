$(function () {
   var wrapper = $(".wrapper");
   var animationed = false;
   var index = 1;
   var bt = $(".num_bt span");
   var bt_div = $(".num_bt div");
   var h = parseInt($(window).height());
   wrapper.css("height",h+"px");
   $(window).resize(function () {
       h = parseInt($(window).height());
       wrapper.css({"top": -h*(index-1),"height": h})
   });
   $("body").mousewheel(function (event) {
       console.log(event.deltaX,event.deltaY,event.deltaFactor);
       if (event.deltaY > 0 && animationed == false && index > 1){
          index --;
          showButtom(index - 1);
          animation(h);
          return;
       }
       if(event.deltaY < 0 && animationed == false && index < 4){
           index++;
           showButtom(index - 1)
           animation(-h);
           return;
       }
   });
   for(var i = 0; i < bt.length; i++){
      $(bt[i]).click(function () {
          var n = i;
          return function () {
              var of = (index - (n+1))*h;
              showButtom(n);
              animation(of);
              index = n+1;
          }
      }());
   }
   function showButtom(n) {
      bt_div.attr("class","");
       $(bt_div[n]).attr("class", "show");
   }
    function animation(offset) {
        animationed = true;
        wrapper.animate({top: "+="+offset+"px"});
        setTimeout(function () {
            animationed = false;
        },1200);
    }
    //文件下载
    var down = $(".download_bt");
   down.click(function () {
       // dataLoad("http://120.77.170.124:8080/schedule/version/latest.do", null, downLoad);
       // function downLoad(data){
       //     if(data.code == 0){
       //         console.log(data.url);
               down.append("<form method='post' action='http://120.77.170.124:8080/schedule/version/latest.do'></form>");
               var form = $(".download_bt form");
               form.submit();
               form.remove();
       //     }else{
       //         window.alert(data.message);
       //     }
       // }
   });
    function dataLoad(url, data, callback) {
        $.ajax({
            url: url,
            type: "get",
            dataType: "json",
            data: data,
            async: true,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: callback
        });
    }
});