class FractalTree {
    #wind;
    #factor;
    #minBranchLen
    #prevLogVarName
    #leafColor
    #branchColor

    constructor(x, y, trunkA, branchA, trunkLen) {
        /* public  */
        this.x = x;
        this.y = y;
        this.trunkLen = trunkLen;
        this.trunkA = trunkA;
        this.branchA = branchA;

        /* private */
        this.#minBranchLen = 5;
        this.#factor = 0.7;
        this.#wind = 0;
        this.#prevLogVarName = '';
        this.#leafColor = color(46, 125, 50);
        this.#branchColor = color(255);
    }

    setMinBranchLen(minBranchLen) {
        if (minBranchLen > 0) {
            this.#minBranchLen = minBranchLen;
        } else {
            this.#logOutsideRange("minBranchLen");
        }
    }

    setFactor(factor) {
        if (factor < 1) {
            this.#factor = factor;
        } else {
            this.#logOutsideRange("factor");
        }
    }

    setWind(wind) {
        if (-1 <= wind && wind <= 1) {
            this.#wind = wind * PI/15;
        } else {
            this.#logOutsideRange("wind");
        }
    }

    setColor(branchColor, leafColor) {
        this.#branchColor = branchColor;
        this.#leafColor = leafColor;
    }

    draw() {
        this.#drawTree(this.x, this.y, this.trunkA, this.trunkLen);
    }

    #drawTree(x, y, a1, l) {  
        const isLeaf = l * this.#factor < this.#minBranchLen;        
        
        stroke(isLeaf ? this.#leafColor : this.#branchColor);
        const x2 = x + cos(a1) * l;
        const y2 = y + sin(a1) * l; 
        line(x, y, x2, y2);

        if (isLeaf) { return; }
        
        const aShift = this.branchA;
        this.#drawTree(x2, y2, a1 + aShift + this.#wind, l * this.#factor);
        this.#drawTree(x2, y2, a1 - aShift + this.#wind, l * this.#factor);

    }

    #logOutsideRange(varName) {
        if (varName !== this.#prevLogVarName) {
            console.warn('Tried to set "' + varName + '" outside range!');
            this.#prevLogVarName = varName;
        } 
    }
}