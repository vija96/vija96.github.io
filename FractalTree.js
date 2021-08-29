class FractalTree {
    constructor(x, y, trunkA, branchA, trunkLen, minBranchLen=5, factor=0.5) {
        this.x = x;
        this.y = y;
        this.trunkLen = trunkLen;
        this.trunkA = trunkA;
        this.branchA = branchA;
        this.minBranchLen = minBranchLen;
        this.factor = factor;
    }

    draw(branchA=0) {
        this.branchA = branchA;
        this.__drawTree(this.x, this.y, this.trunkA, this.branchA, this.trunkLen, this.minBranchLen, this.factor);
    }

    __drawTree(x, y, a1, a2, l, minL, fac) {
        if ( l < minL ) { return; } // done
        if ( x < -1 || x > width) { return; } // outside canvas
    
        const x2 = x + cos(a1) * l;
        const y2 = y + sin(a1) * l; 
    
        line(x, y, x2, y2);
        
        this.__drawTree(x2, y2, a1, a2, l*fac, minL, fac);
        this.__drawTree(x2, y2, a1+a2, a2, l*fac, minL, fac);
        this.__drawTree(x2, y2, a1-a2, a2, l*fac, minL, fac);
        this.__drawTree(x2, y2, a1+a2/2, a2, l*fac, minL, fac);
        this.__drawTree(x2, y2, a1-a2/2, a2, l*fac, minL, fac);
    }
}