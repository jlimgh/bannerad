//IIFE TO EXTRACT DIMENSION DATA
var dimensions = (function(){
        var str = document.querySelectorAll("[name='ad.size']")[0].getAttributeNode("content").value;
        var widthMatch = /width\=(\d+)/.exec(str);
        var heightMatch = /height\=(\d+)/.exec(str);
        return {
            width: parseInt(widthMatch[1]),
            height: parseInt(heightMatch[1])
        }
})();

var tl;
var stopWatch;
var legalBubbleHeight;
var legalTextHeight;

//INITIALIZE
function init(){
    IDsToVars();

    container.style.width = dimensions.width + 'px';
    container.style.height = dimensions.height + 'px';
    
    //set timeline
    tl = new TimelineLite();

    addListeners();
    
    animate();
}

function addListeners(){
    showLegalButton.addEventListener('click',function(){
         showLegal();  
    })
    legalBubbleClose.addEventListener('click',function(){
         hideLegal();  
    })
    //replay functionality
    /*
    replay_button.addEventListener('mouseover',function(){
        TweenLite.fromTo(replay_button, .5, {rotation:'-360'}, {overwrite:false, rotation:'0'});
    })
    replay_button.addEventListener('click',function(){
            tl.restart();
    })
    */
    up_arrow.addEventListener('mouseover',function(e){
       scrolldown();
    });
    
    down_arrow.addEventListener('mouseover',function(e){
        scrollup();
    });
    
    up_arrow.addEventListener('mouseout',function(e){
        TweenLite.killTweensOf(scrolldown);
    });

    down_arrow.addEventListener('mouseout',function(e){
        TweenLite.killTweensOf(scrollup);
    });
}
var yValue = 0;

function scrolldown(){
     //console.log(legalText.style.backgroundPosition.y)
     if (yValue < 0){
         yValue += 1;
     }

     legalinner.style.top =  yValue + 'px'; 
     
     TweenLite.delayedCall(.01,scrolldown);
    //  TweenLite.set(legalText,{backgroundPosition:"0px +=10px"});
    //  TweenLite.delayedCall(.01,scrolldown);
}

function scrollup(){
    //  TweenLite.set(legalText,{backgroundPosition:"0px -=10px"});
    //  TweenLite.delayedCall(.01,scrollup);
    legalBubbleHeight = legalBubble.offsetHeight;
    legalTextHeight = legalinner.offsetHeight;
     if(yValue > (legalTextHeight - legalBubbleHeight)*(-1) ){
         yValue -= 1;
     }
     legalinner.style.top = yValue + 'px'; 
     
     TweenLite.delayedCall(.01,scrollup);
}
function showLegal(){
    up_arrow.style.display="block";
    down_arrow.style.display="block";
    legalBubble.style.display="block";
    legalOverlay.style.display="block";
    TweenLite.to("#legalBubble", 0.5, {alpha:1});
    TweenLite.to("#legalOverlay", 0.5, {alpha:0.85});
    document.getElementById("legalOverlay").style.display = "block";
    document.getElementById("legalBubble").style.display = "flex";
    document.getElementById("legalBubbleClose").style.display = "block";
    
    //document.getElementById("legalButton2").style.display = "block";
}

 function hideLegal(){
    TweenLite.to("#legalBubble", 0.5, {alpha:0});
    TweenLite.to("#legalOverlay", 0.5, {alpha:0,onComplete:nolegal});
    //document.getElementById("legalOverlay").style.display = "none";
    //document.getElementById("legalBubble").style.display = "none";
    document.getElementById("legalBubbleClose").style.display = "none";
    //document.getElementById("legalButton2").style.display = "none"; 
}
function nolegal(){
    up_arrow.style.display="none";
    down_arrow.style.display="none";
    legalBubble.style.display="none";
    legalOverlay.style.display="none";
}
//ANIMATE
function animate(){
    stopWatch=new Date().getTime(); 

    //timeline animation here
    // Frame 1:  headline fades in and slides out
    // Frame 2:  second headline slides in
    // Frame 3: end frame elements fade in.

    // *** Place  the rest of the animation code here ***
    tl
      .call(changeZindex, [1], this)
      .from(c1, 2, {opacity: 0})
      .to(c1, 1.5, {x: 170, ease: Power3.easeOut})
      .from(c2, 1.2, {y: -200, ease: Circ.easeOut}, "-=.9")
      .to(bg, 1.7, {opacity: 0, delay: 1})
      .to(c2, 1.5, {autoAlpha: 0}, "-=1")
      .to(logo, 2, {autoAlpha: 0, ease: Power1.easeOut}, "-=1")
      .call(changeZindex, [0], this)
      .from(efcopy, 1.6, {opacity: 0, ease: Power0.easeOut, delay: .1}, "-=2")
      .from(efcopy2, 1.6, {opacity: 0, ease: Power0.easeOut, delay: .1}, "-=2")
      .from(cta, 1.6, {opacity: 0, ease: Power0.easeOut, delay: .1}, "-=2")
      .from(logo2, 1, {opacity: 0, ease: Power0.easeOut}, "-=2.5");

    function changeZindex(number) {
        var zIndexBG = document.getElementById("bg").style.zIndex = number;
        var zIndexC1 = document.getElementById("c1").style.zIndex = number;
        var zIndexC1 = document.getElementById("c2").style.zIndex = number;
        var zIndexLogo = document.getElementById("logo").style.zIndex = number;
    }


    //.call(returnTimer)
}

function returnTimer(){
    stopWatch=((new Date().getTime())-stopWatch)*.001;
    console.log(stopWatch+" seconds");
}

function clickThrough(){
    window.open(clicktag);
}

//SET IDs IN DOM TO GLOBAL VARIABLES
function IDsToVars(){
    var allElements = document.getElementsByTagName("*");
    
    for (var q = 0; q<allElements.length; q++){
         var el = allElements[q];
         if (el.id){
            window[el.id]=document.getElementById(el.id);
        }
    }
};