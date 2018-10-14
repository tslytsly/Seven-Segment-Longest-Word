class SevSeg {
    constructor(val, x, y, ratio) {
        this.val = val;
        this.x = x;
        this.y = y;
        this.ratio = ratio;
    }

    updateVal(v) {
        this.val = v;
    }

    updateRatio(r) {
        this.ratio = r;
    }

    draw() {
        function getColor(cv, shift) {
            let r = 0;
            let g = 0;
            let b = 0;
            let a = 40 + 200 * ((cv >> shift) & 1);
            switch (colRadio.value()) {
                case 'green':
                    g = 255;
                    break;
                case 'blue':
                    b = 255;
                    break;
                default:
                    r = 255;
                    break;
            }
            return color(r, g, b, a);
        }

        push();
        translate(this.x * this.ratio, this.y);
        noStroke();
        noFill();
        let hrzWid = 78 * this.ratio;
        let hrzHgt = 18 * this.ratio;
        let verWid = 18 * this.ratio;
        let verHgt = 98 * this.ratio;
        let rgtX = 140 * this.ratio;
        let lftX = 40 * this.ratio;
        let hrzX = 60 * this.ratio;
        let topY = 20 * this.ratio;
        let uprY = 40 * this.ratio;
        let midY = 140 * this.ratio;
        let lwrY = 160 * this.ratio;
        let btmY = 260 * this.ratio;
        let decWid = 20 * this.ratio;
        let decHgt = 20 * this.ratio;
        let decX = 170 * this.ratio;

        // A
        fill(getColor(this.val, 6))
        rect(hrzX, topY, hrzWid, hrzHgt, 10, 10);
        // B
        fill(getColor(this.val, 5))
        rect(rgtX, uprY, verWid, verHgt, 10, 10);
        // C
        fill(getColor(this.val, 4))
        rect(rgtX, lwrY, verWid, verHgt, 10, 10);
        // D
        fill(getColor(this.val, 3));
        rect(hrzX, btmY, hrzWid, hrzHgt, 10, 10);
        // E
        fill(getColor(this.val, 2));
        rect(lftX, lwrY, verWid, verHgt, 10, 10);
        // F
        fill(getColor(this.val, 1));
        rect(lftX, uprY, verWid, verHgt, 10, 10);
        // G
        fill(getColor(this.val, 0));
        rect(hrzX, midY, hrzWid, hrzHgt, 10, 10);
        // Dec Point
        fill(getColor(this.val, 7))
        rect(decX, btmY, decWid, decHgt, 10, 10);
        pop();
    }
}