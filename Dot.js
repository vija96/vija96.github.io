function Point(x, y) {
    this.x = x;
    this.y = y;
}

class Dot {
    constructor(x, y, r, speed, color) {
        this.x = x
        this.y = y
        this.r = r
        this.color = color;
        this.vec = createVector(0, speed);
        this.trace = [];
    }

    _move(){
        // Update trace
        this.trace.push(new Point(this.x, this.y))
        if (this.trace.length > 50) this.trace.shift();

        // Update x
        this.x += this.vec.x; 
        if (this.x > width)  this.x = 0;
        else if (this.x < 0) this.x = width;
        
        // Update y
        this.y += this.vec.y; 
        if (this.y > height) this.y = 0;
        else if (this.y < 0) this.y = height;
    }

    turn(angle){
        this.vec.setHeading(this.vec.heading() + angle);
    }

    speed(speed){
        let mag = this.vec.mag();
        if ( mag+speed < 0 ) {
            this.vec.setMag(0.000000001);
        }
        else {
            this.vec.setMag(mag + speed);
        }
    }

    _draw(){
        push();
        strokeWeight(2);
        for (let i = 0; i<this.trace.length-1; i++) {
            let x1 = this.trace[i].x;
            let x2 = this.trace[i+1].x;
            let y1 = this.trace[i].y;
            let y2 = this.trace[i+1].y;

            if ( x1 != 0      && x2 != 0     &&
                 x1 != width  && x2 != width &&
                 y1 != 0      && y2 != 0     &&
                 y1 != height && y2 != height ) {
                stroke(255, 0, 0, i/this.trace.length * 255);
                line(x1, y1, x2, y2);
            }
        }
        pop();

        push()
        translate(this.x, this.y)
        rotate(this.vec.heading()+HALF_PI)
        noStroke();
        fill(this.color);
        triangle(-this.r*0.8, this.r, 
                 0,          -this.r, 
                 this.r*0.8,  this.r);
        pop();

        this.speed(-0.05);
    }

    draw(){
        this._draw();
        this._move();
    }
}