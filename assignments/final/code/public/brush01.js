let brushImg;
// let brushHue;

// let xpos, ypos;

let brushes = [];

function preload(){
   brushImg = loadImage('assets/brush-0.png');
}

function setup(){
    createCanvas(windowWidth, windowHeight);
    noStroke();
    imageMode(CENTER);
    colorMode(HSB, 360, 100, 100, 100);

    // brushHue = int(random(360));
    // xpos = width / 2;
    // ypos = height / 2;

    for(let i = 0; i < 5; i++){
        brushes.push(new Brush());
    }
}

function draw(){
    // push();
    // translate(xpos, ypos);
    // rotate((noise(frameCount * 0.01) - 0.5) * PI * 2);
    // tint(brushHue + random(-5, 5), 80, 80, 20);
    // image(brushImg, 0, 0, 50 + random(-5, 5), 50 + random(-5, 5));
    // pop();
    //
    // xpos += (noise(frameCount * 0.01) - 0.5) * 5;
    // ypos += (noise(frameCount * 0.02) - 0.5) * 5;

    for(let i = 0; i < brushes.length; i++){
        brushes[i].update();
        brushes[i].display();
    }
}

class Brush{
    constructor(){
        this.brushHue = int(random(360));
        this.x = random(width);
        this.y = random(height);

        this.xspeed = random(-3, 3);
        this.yspeed = random(-3, 3);
    }

    update(){
        this.x += (noise(frameCount * 0.01) - 0.5 + noise(this.y / height) - 0.5) * this.xspeed;
        this.y += (noise(frameCount * 0.02) - 0.5 + noise(this.x / width) - 0.5) * this.yspeed;

        if(this.x < 0 || this.x > width){
            this.xspeed *= -1;
        }

        if(this.y < 0 || this.y > height){
            this.yspeed *= -1;
        }
    }

    display(){
        if(random() > 0.7){
            push();
            translate(this.x, this.y);
            rotate((noise(frameCount * 0.01) - 0.5) * PI * 2);
            tint(this.brushHue + random(-5, 5), 80, 80, 20);
            image(brushImg, 0, 0, 50 + random(-5, 5), 50 + random(-5, 5));
            pop();
        }


        // xpos += (noise(frameCount * 0.01) - 0.5) * 5;
        // ypos += (noise(frameCount * 0.02) - 0.5) * 5;
    }
}