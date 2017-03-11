/**
 * Created by Administrator on 2016/9/4.
 */
(function () {
    var oUt = document.getElementById('conOut');
    var banner = oUt.getElementsByTagName('div')[0];
    var aDiv = banner.getElementsByTagName('div');
    var aImg = banner.getElementsByTagName('img');
    var oUl = oUt.getElementsByTagName('ul')[0];
     var aLi=oUl.getElementsByTagName('li');
     var left=oUt.getElementsByTagName('a')[0];
    var right=oUt.getElementsByTagName('a')[1];
    var data=null;
    var timer=null;
    var step=0;
    getData();
    function getData(){
        var xml=new XMLHttpRequest();
        xml.open('get','json/data.txt',false)
        xml.onreadystatechange=function(){
            if(xml.readyState==4 && /^2\d{2}$/.test(xml.status)){
                data=utils.jsonParse(xml.responseText);
            }
        };
        xml.send()
    }
    bind();
    function bind(){
        var str1='';
        var str2='';
        for(var i=0;i<data.length;i++){
           str1+='<div><img realImg="'+data[i].imgSrc+'" alt=""/></div>';
            str2+=i===0?'<li class="bg"></li>':'<li></li>'
        }
        str1+='<div><img realImg="'+data[0].imgSrc+'" alt=""/></div>';
        banner.innerHTML=str1;
        oUl.innerHTML=str2;
        banner.style.width=aDiv.length*aDiv[0].offsetWidth+'px';
    }
    setTimeout(lazy,500)
function lazy(){
    for(var i=0;i<aImg.length;i++){
        (function(index){
            var curImg=aImg[index];
            var tmpImg=new Image;
            tmpImg.src=curImg.getAttribute('realImg');
            tmpImg.onload=function(){
                curImg.src=this.src;
                tmpImg=null;
            }
        })(i)
    }
}
  timer=setInterval(autoMove,2000);
   function autoMove(){
       if(step>=aDiv.length-1){
           utils.css(banner,'left',0)
           step=0;
       }
       step++;
       animate(banner,{left:-step*713})
       bannerTip();
   }
  function  bannerTip(){
      var tmpStep=step>=aLi.length?0:step;
      for(var i=0;i<aLi.length;i++){
          aLi[i].className=i==tmpStep?'bg':null;
      }
  }
oUt.onmouseover=function(){
    clearInterval(timer)
};
oUt.onmouseout=function(){
    timer=setInterval(autoMove,2000);
};
    handleChange();
 function   handleChange(){
     for(var i=0;i<aLi.length;i++){
         aLi[i].index=i;
         aLi[i].onclick=function(){
             step=this.index;
             animate(banner,{left:-step*713});
             bannerTip();
         }
     }
 }
    left.onclick=autoMove;
    right.onclick=function(){
        if(step<=0){
            step=aDiv.length-1;
            utils.css(banner,'left',-step*713)
        }
        step--;
        animate(banner,{left:-step*713})
        bannerTip();
    }
})();
(function(){
    var fixed=document.getElementById('fixed'),
        Top=document.getElementById('Top'),
        A=Top.getElementsByTagName('a')[0];
    A.onclick=function(){
        document.documentElement.scrollTop=0;
        document.body.scrollTop=0;
    }
})();

