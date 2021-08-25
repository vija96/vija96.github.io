/// < reference path="./libraries/p5.global-mode.d.ts" / >
var dot;
var keyLeftPressed = false;
var keyRightPressed = false;
var keyUpPressed = false;
var keyDownPressed = false;

function setup() {
    createCanvas(400, 400);
    dot = new Dot(200, 200, 7, 3, color(0,0,0));
}


function draw() {
    background(255);
    
    dot.draw();

    if ( keyLeftPressed ){
        dot.turn(-0.1)
    } 
    if ( keyRightPressed ){
        dot.turn(0.1)
    }
    if ( keyUpPressed ){
        dot.speed(.1);
    }
    if ( keyDownPressed ){
        dot.speed(-.1);
    }
    
}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
      keyLeftPressed = true;
    }
    if (keyCode === RIGHT_ARROW) {
        keyRightPressed = true;
    }
    if (keyCode === SHIFT) {
        keyUpPressed = true;
    }
    if (keyCode === CONTROL) {
        keyDownPressed = true;
    }
  }

  function keyReleased() {
    if (keyCode === LEFT_ARROW) {
        keyLeftPressed = false;
    }
    if (keyCode === RIGHT_ARROW) {
        keyRightPressed = false;
    }
    if (keyCode === SHIFT) {
        keyUpPressed = false;
    }
    if (keyCode === CONTROL) {
        keyDownPressed = false;
    }
}