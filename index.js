
var autoScroll = false;
var fractalTrees = [];
var scrollTo = 74;
var scrollTimer;

function setup() {
    /* creakte canvas */
    createCanvas(windowWidth, windowHeight);
    
    /* start auto scroll after 1 second */
    setTimeout(startAutoScroll, 1000); 

    /* create trees */
    createTrees();
}

function startAutoScroll() {
    scrollTimer = setInterval( function() {
        if ( document.documentElement.scrollTop >= scrollTo ) {
            clearInterval(scrollTimer); // stop
        }
        document.documentElement.scrollTop += 1.5;
    })

}

function draw() {   
    clear();
    drawWelcome();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    createTrees();
}

function mouseWheel(event) {
    clearInterval(scrollTimer); // stop
}

function createTrees() {
    fractalTrees = [];

    const a = -PI/2;
    const y = height/2;
    fractalTrees.push(new FractalTree(-1, y, a, 0, 200))
    fractalTrees.push(new FractalTree(width, y, a, 0, 200))
    fractalTrees.push(new FractalTree(width/4, y, a, 0, 50))
}

function drawWelcome() {
    const scrollPer = document.documentElement.scrollTop/scrollTo;

    /* write text */
    fill(255, 255, 255, 255*scrollPer);
    textSize(64);
    textAlign(CENTER, CENTER);
    if (windowWidth < 1000) {
        text("Hi", width/2, height/4);
    } else if (windowWidth < 1500) {
        text("Hello", width/2, height/4);
    } else {
        text("Hi, I'm Viktor", width/2, height/4);
    }
    
    noStroke();
    textSize(16);
    text("Scroll down to see more", width/2, height/4+50);

    /* draw trees */
    stroke(255);
    strokeWeight(1);
    fractalTrees.forEach((tree) => tree.draw((PI/3)*scrollPer));

    /* draw ground */
    strokeWeight(2);
    line(-1, height/2, width, height/2);
}