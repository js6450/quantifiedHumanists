let strokes = [];

function setup() {
    createCanvas(windowWidth, windowHeight);

    colorMode(HSB, 360, 100, 100, 100);
    noStroke();

    for(let i = 0; i < 15; i++){
        strokes.push(new Stroke());
    }
}

function draw() {
    background(255, 30);

    for(let i = 0; i < strokes.length; i++){
        strokes[i].display();
    }
}

class Stroke {
    constructor() {
        this.x = random(width);
        this.y = random(height);

        this.w = random(25, 50);
        // this.h = random(5, 50);
        this.hue = int(random(360));

        this.brushNum = random(5, 75);
        this.direction = random(0, PI * 2);
        this.distOffset = random(2, 5);

        this.brushes = [];

        for (let i = 0; i < this.brushNum; i++) {
            this.brushWidth = this.w + random(-10, 10);
            for(let w = 0; w < int(this.brushWidth); w++){
                this.brushes.push(new Brush(this.x + cos(this.direction) * this.distOffset * i + w, this.y + sin(this.direction) * this.distOffset * i, random(2, 5), random(5, 15), this.hue, int(random(0, 60)), this.direction));
            }
        }
    }

    display() {
        for (let i = 0; i < this.brushes.length; i++) {
            this.brushes[i].display();
        }
    }
}

class Brush {
    constructor(x, y, w, h, hue, alpha, dir) {
        this.x = x + (noise(x) - 0.5) * 15;
        this.y = y + (noise(y) - 0.5) * 15;
        this.w = w + random(5);
        this.h = h + random(5);
        this.hue = hue + int(random(-5, 5));
        this.alpha = alpha;
        this.dir = dir;
    }

    display() {
        push();
        translate(this.x, this.y);
        rotate(this.dir + noise(this.x, this.y) * 0.1);
        fill(this.hue, noise(this.x) * 15 + 55, 80, this.alpha);
        ellipse(0, 0, this.w, this.h);
        pop();
    }
}

