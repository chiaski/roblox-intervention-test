var loop;

let centerL = (screen.width/2) - 150;
let centerT = (screen.height / 2) - 100;

function chance(prob) { return !!prob && Math.random() <= prob; }

function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1) + min) }

function pick(arr) { return arr[(Math.random() * arr.length) | 0]; }


function write(text, style){
  
  if(!style) style = "";
  
  $("#words").html("");
  
  if(style == "repeat"){
    for(let i = 0; i < 45; i++){
      $(`<span>${text}</span>`)
      .addClass("scriptMed")
      .appendTo("#words");
       $("#words").addClass("repeat");
    }
    return;
  }
  
  $(`<span>${text}</span>`)
    .addClass(style)
    .appendTo("#words");
}

function textCycle(text, duration, style){
  // must pass an array
  
  if(!Array.isArray(text)) return;
  if(!duration) duration  = 800; 
  
  $("#words").html("");
  let curr = 0;
  
  let t = $(`<span>${text[0]}</span>`)
      .appendTo("#words");
  
  if(style) t.addClass(style)
  
  loop = setInterval(function(){

    if(curr >= text.length) curr = -1;

    
    curr++;
    $(t).html(text[curr]);
    
  }, duration);
}


function textFade(text, duration, style){
  // must pass an array
  
  if(!Array.isArray(text)) return;
  if(!duration) duration  = 800; 
  
  $("#words")
    .html("")
    .css("flex-wrap", "wrap");
  let curr = 0;
  
//  let t = $(`<span>${text[0]}</span>`)
//      .appendTo("#words");
  
  
  text.forEach(function(t, i) {
    
    let span = $(`<span>${text[i]}</span>`)
      .css("padding", ".5rem")
      .hide()
      .delay(i*duration)
      .appendTo("#words")
      .fadeIn("slow");
    
    if(style) span.addClass(style)
    
  });

}

function img(what){
  
  if(/:\/\//.test(what)) {
     $("#img").html(`<img src="${what}">`);
  
   } else{
     $("#img").html(`<img src="a/${what}.gif">`);
   }
}


function bg(what){
  
  if(!what){
    $("#img").css("background-image", "none"); return;
  }
  
  if(/:\/\//.test(what)) {
     $("#img").css("background-image", `url(${what})`);
  
   } else{
     $("#img").css("background-image", `url(a/${what}.gif)`);
   }
}

function view(what){
  
  if(!what){
  $("#view").css("background-image", "none");
  }
  
  if(/:\/\//.test(what)) {   $("#view").css("background-image", `url(${what})`);
  
   } else{
     $("#view").css("background-image", `url(a/view/${what}.gif)`);
   }
  
}


// Open Window
function win(link, title, w,h,l,t, evalCode){
  
  if(DEBUG) return; // remove when done debugging
  
  if(!link) link = "god.html";
  if(!title) title = "";
  if(!w) w = 150; if(!h) h = 150; 
  if(!l) l = randInt(0,(screen.width - w) * .95);
  if(!t) t = randInt(0,(screen.height - h) * .95);

  let _window = window.open(link, title, `popup,width=${w},height=${h},left=${l},top=${t}`);  
_window.onload = function() {
  if(_window && evalCode !== undefined){
    _window.eval(evalCode);
  }
  };
  
    return _window;   
}



function word(text){

  let w;

  if(!Array.isArray(text)){
    w = win(`word.html?text=${text}`, "", 200, 150);
    return;
  } else{
    w = win(`word.html`, "", 200, 150);
    setTimeout(function(){ w.loopText(text); }, 100);
  }


  
}

// Effects

  function fx(what, duration){
    
    if(!what){
      $("#decor").html("");
    } 
    
    
    if(!duration) duration = 4; // in s
    duration = duration * 1000;
    
    if(what == "butterfly"){
      
      for(let i = 0; i < randInt(18,30); i++){
        
        let d = $(`<img src="a/butterfly-${randInt(1,10)}.gif" butterfly>`)
          .css("left", `${randInt(0,80)}%`)
          .css("top", `${randInt(0,60)}%`)
          .appendTo("#decor")
        
        
        setTimeout(() => { $(d).fadeOut("slow", () => $(d).remove()) }, duration);
        
      }
      
      
    }
    
    if(what == "dump"){
      
      for(let i = 0; i < randInt(8,15); i++){
        
    let i = $(`<img src='a/border/`+ randInt(1,120) +`.gif'>`)
      .attr("dump", "")
      .css("bottom", randInt(0,90) + "%")
      .css(pick(["left", "right"]),  randInt(0,10) + "%")
      .css("transform", "scale("+ (randInt(8,12) * 0.1) +") rotate(" + randInt(0,8) +"deg)")
      .css("padding", randInt(0,8) + "px")
      .hide()      .fadeIn(randInt(800,3000))
      .appendTo("#decor");

      if(randInt(0,1)){
        $(i).css("transform", "scale("+ (randInt(8,13) * 0.1) +") rotate(-" + randInt(0,8) +"deg)")
      }
      }
        
    
    }
    
    if(what == "dumpbig"){
      
      for(let i = 0; i < randInt(30,65); i++){
        
    let i = $(`<img src='a/border/`+ randInt(1,120) +`.gif'>`)
      .attr("dump", "")
      .css("bottom", randInt(0,90) + "%")
      .css(pick(["left", "right"]),  randInt(0,50) + "%")
      .css("transform", "scale("+ (randInt(8,12) * 0.1) +") rotate(" + randInt(0,8) +"deg)")
      .css("padding", randInt(0,8) + "px")
      .hide()      .fadeIn(randInt(800,3000))
      .appendTo("#decor");

      if(randInt(0,1)){
        $(i).css("transform", "scale("+ (randInt(8,13) * 0.1) +") rotate(-" + randInt(0,8) +"deg)")
      }
      }
        
    
    }
    
    if(what == "angel"){
      
      for(let i = 0; i < randInt(8,15); i++){
        
    let i = $(`<img src="a/angel${pick(["l", "r"])}.gif">`)
      .attr("dump", "")
      .css("bottom", randInt(0,20) + "%")
      .css("left", randInt(0,99) + "%")
      .css("transform", "scale("+ (randInt(8,12) * 0.1) +") rotate(" + randInt(0,8) +"deg)")
      .css("padding", randInt(0,8) + "px")
      .hide()      .fadeIn(randInt(800,3000))
      .appendTo("#decor");

      if(randInt(0,1)){
        $(i).css("transform", "scale("+ (randInt(8,13) * 0.1) +") rotate(-" + randInt(0,8) +"deg)")
      }
      }
        
    
    }
    
    if(what == "fly"){
    
      for(let i = 0; i < randInt(19,32); i++){
        
        let d = $(`<img src="a/dove-${randInt(1,4)}.gif" dove>`)
          .css("left", `${-60 + randInt(0,40)}%`)
          .css("top", `${randInt(0,60)}%`)
          .hide().fadeIn("slow")
          .appendTo("#decor")
        
         $(d).animate({
          left: '120vw'
        }, duration * (randInt(90,120) * 0.01));
        
        setTimeout(() => { $(d).fadeOut("slow", () => $(d).remove()) }, duration * 1.15);
        
      }
      
    }
    
    
  }



// window

function resize(w,h){
  console.log(w,h);
  window.resizeTo(w, h);
  return;
}

function move(l,t){
  window.moveTo(l, t);
}


function embiggen(factor){
 if(!factor) factor = randInt(100,130) * 0.01;  
  
  for (var i = 0; i < 5; i++) {
  setTimeout(function(){

    var currentWidth = window.innerWidth;
    var currentHeight =  window.innerHeight;

    var newWidth = Math.round(currentWidth * factor);
    var newHeight = Math.round( (currentHeight + 60) * factor);

    resize(newWidth, newHeight);

    }, i * 1000);
  } 
}




function titleInterval(words, duration, random){
  
  let len = words.length;
  let n = 0;
  if(!duration) duration = 1500;
    document.title = words[0];
  
  n++;
  
  let cycle = setInterval(function(){
    
    if(random === "random"){
    document.title = pick(words);
      return;
    }

    if(n == len - 1){
      document.title = words[n];
      n = 0;
    } else if(n==0){
    document.title = words[n];
      n++;
    } else{
      document.title = words[n];
      n++;
    }
  }, duration)
}

function imageCycle(images, random){
  STOP = true;
  
  let curr = $("#img").attr("cycle");
  if(!curr){
    $("#img").attr("cycle", "0");
    curr = 0;
  } 
  curr = parseInt(curr);
  img(images[curr]);
  
  $("#img").css("cursor", "pointer");
  
  $(document).click(function(){
    if(random == "random"){
      img(pick(images));
      return;
    }
    
    curr = parseInt($("#img").attr("cycle"));
    if(curr == images.length - 1){
      STOP = false;
      $("#img").css("cursor", "none");
      return;
    }
      
    curr++;
    img(images[curr]);
    $("#img").attr("cycle", curr);
    
  });
  
}

function titleClick(words, random){
  STOP = true;
  let n = 0;
  
  $(document).click(function(){
    if(random == "random"){
      document.title = pick(words);
      return;
    }
    
    if(n > words.length - 1){
      STOP = false;
      document.title = words[words.length - 1];
      return;
      }
    
    document.title = words[n];
    n++;
    
  });
}



function hoverInterval(words, duration, random){
  
  let len = words.length;
  let n = 0;
  if(!duration) duration = 1800;
  $("body").attr("title", words[0]);

  $("body").css("pointer-events", "all");
  
  let cycle = setInterval(function(){
    
      if(random === "random"){
      $("body").attr("title", pick(words));
        return;
      }
  
    if(n == len - 1){
      $("body").attr("title", words[n]);
      n = 0;
    } else if(n==0){
      $("body").attr("title", words[n]);
      n++;
    } else{
      $("body").attr("title", words[n]);
      n++;
    }
  }, duration)
}


