/***********************************************************************/
/*                             globals                                 */
/***********************************************************************/
var ctx = document.getElementById("canvas").getContext("2d");
var headerHeight = document.getElementById("header").offsetHeight;
var mouseX = null;
var mouseY = null;
var trees = [];
var scrollTimer = null;


/***********************************************************************/
/*                          event listener                             */
/***********************************************************************/
document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
});

window.addEventListener('resize', (event) => {
    ctx.canvas.width = window.innerWidth;
    createTrees();
});

var scrollY = 0;
window.addEventListener('scroll', (event) => {
    const currentScrollY = document.documentElement.scrollTop;
    const dY = currentScrollY - scrollY;
    if (dY < 0 || currentScrollY >= headerHeight) {
        clearInterval(scrollTimer);
    }
    scrollY = currentScrollY;
});

function startAutoScroll() {
    scrollTimer = setInterval( function() {
        if ( document.documentElement.scrollTop >= headerHeight ) {
            clearInterval(scrollTimer); // stop
        } else {
            window.scrollBy(0, 1);
        }
    }, 10)
}

/***********************************************************************/
/*                            setup/draw                               */
/***********************************************************************/
function setup() {
    setTimeout(startAutoScroll, 1000); 

    ctx.canvas.width = window.innerWidth;

    createTrees()
    setInterval(draw, 5);
}

function draw() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.font = "50px Roboto";
    const alpha = map(scrollY, 0, headerHeight, 0, 1);
    ctx.fillStyle = "rgba(255, 255, 255, " + alpha + ")";
    ctx.textAlign = "center";
    ctx.fillText("Hi", canvas.width/2, canvas.height/2);

    ctx.beginPath();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 5;
    ctx.moveTo(0, ctx.canvas.height);
    ctx.lineTo(ctx.canvas.width, ctx.canvas.height);
    ctx.stroke();
        
    ctx.lineWidth = 1;
    trees.forEach((tree) => {
        if (mouseX != 0 && mouseY != 0) {
            tree.setWind(map(mouseX, 0, ctx.canvas.width, -1, 1));
        }
        tree.branchA = map(scrollY, 0, headerHeight, Math.PI/50, Math.PI/6);
        tree.draw();
    })
}


/***********************************************************************/
/*                         helper functions                            */
/***********************************************************************/
function createTrees() {
    trees = [];

    const a = -Math.PI/2;
    const y = ctx.canvas.height;
    const w = ctx.canvas.width
    trees.push(new FractalTree(-1, y, a, 0, 130, ctx))
    trees.push(new FractalTree(w+1, y, a, 0, 130, ctx))
    trees.push(new FractalTree(w/4, y, a, 0, 30, ctx))
    trees.push(new FractalTree(3*w/4, y, a, 0, 30, ctx))
}

function map(value, start1, stop1, start2, stop2, withinBounds=true) {
    const p = (value-start1)/(stop1-start1);
    
    if (withinBounds) {
        if (p < 0) {
            return start2;
        } else if (p > 1) {
            return stop2;
        }
    }

    return p * (stop2 - start2) + start2;
}


setup();