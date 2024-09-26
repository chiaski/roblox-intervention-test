
const LILT = {
  
  poly: null,
  delay: null,
  reverb: null,
  notes: ["C","D","E","G","A"],
  octave: 4,
  direction: 0.5,
  
  init: function(){


    $(document).keydown(function(e) {
      LILT.playSound();
    });

  },
  
  playSound: function(){
    
      userStartAudio()

      let randNote = floor(random(LILT.notes.length))

      if(random(1)<0.1){
        LILT.octave += LILT.direction
      }
      if(LILT.octave >= 6){
        LILT.direction = -1
      }
      if(LILT.octave <= 4){
        LILT.direction = 1
      }

      (LILT.poly).play(LILT.notes[randNote] + LILT.octave , .15, 0, 0.25);

  } 
  
}

$( document ).ready(function() {

});


// let notes = ["C","D","E","G","A"]
//
//let octave = 4
//let direction = .5


function setup() {

  LILT.poly = new p5.PolySynth();

  LILT.delay = new p5.Delay();
  LILT.reverb = new p5.Reverb();


  LILT.reverb.process(LILT.poly, 3, 2); //to only add reverb, toggle the others off.
  LILT.delay.process(LILT.poly, 0.50, 0.5, 2300);
  LILT.reverb.process(LILT.delay, 4, 2);
}

function mousePressed(){
  userStartAudio()
}
