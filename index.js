
var autoScroll = false;
var fractalTrees = [];
var scrollTo = 74;
var scrollTimer;

function setup() {
    /* creakte canvas */
    createCanvas(windowWidth, windowHeight);
    
    /* start auto scroll after 0.5 second */
    setTimeout(startAutoScroll, 500); 

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
    fractalTrees.push(new FractalTree(-1, y, a, 0, 150))
    fractalTrees.push(new FractalTree(width, y, a, 0, 150))
    fractalTrees.push(new FractalTree(width/4, y, a, 0, 30))
    fractalTrees.push(new FractalTree(3*width/4, y, a, 0, 30))
}

function drawWelcome() {
    const scrolPos = document.documentElement.scrollTop;

    /* write text */
    fill(255, 255, 255, map(scrolPos, 0, scrollTo, 0, 255));
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
    strokeWeight(1);
    fractalTrees.forEach((tree) => {
        if (mouseX != 0 && mouseY != 0) {
            tree.setWind(map(mouseX, 0, width, -1, 1));
        }
        tree.branchA = map(scrolPos, 0, scrollTo, PI/50, PI/6);
        tree.draw();
    })
    
    /* draw ground */
    stroke(255);
    strokeWeight(2);
    line(-1, height/2, width, height/2);
}