class SevSeg {
    constructor(val, x, y) {
        this.val = val;
        this.x = x;
        this.y = y;
    }

    updateVal(v) {
        this.val = v;
    }

    draw() {
        function getColor(cv, shift) {
            let r = 255;
            let g = 0;
            let b = 0;
            let a = 40 + 255 * ((cv >> shift) & 1);
            return color(r, g, b, a);
        }

        push();
        translate(this.x, this.y);
        noStroke();
        noFill();
        // A
        fill(getColor(this.val, 6))
        rect(60, 20, 78, 18, 10, 10);
        // B
        fill(getColor(this.val, 5))
        rect(140, 40, 18, 98, 10, 10);
        // C
        fill(getColor(this.val, 4))
        rect(140, 160, 18, 98, 10, 10);
        // D
        fill(getColor(this.val, 3));
        rect(60, 260, 78, 18, 10, 10);
        // E
        fill(getColor(this.val, 2));
        rect(40, 160, 18, 98, 10, 10);
        // F
        fill(getColor(this.val, 1));
        rect(40, 40, 18, 98, 10, 10);
        // A
        fill(getColor(this.val, 0));
        rect(60, 140, 78, 18, 10, 10);
        pop();

    }
}