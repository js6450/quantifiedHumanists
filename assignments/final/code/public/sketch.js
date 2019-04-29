let brushImages = [];
let colNum, rowNum;
let boxWidth, boxHeight;
let brushes = [];

let imageLayer, paintLayer;

function preload(){
    for(let i = 0; i < 5; i++){
        brushImages.push(loadImage('assets/brush-' + i + '.png'));
    }
}

function setup(){
    let cvs = createCanvas(windowWidth, windowHeight);
    cvs.id("painting");
    noStroke();
   colorMode(RGB, 255, 255, 255, 100);

    imageLayer = createGraphics(width, height);
    imageLayer.imageMode(CORNER);
    paintLayer = createGraphics(width, height);
    paintLayer.imageMode(CENTER);

    fetch('/api').then(result =>{
        return result.json();
    }).then(result => {
        inputs = result;

        colNum = round(sqrt(inputs.length));
        rowNum = ceil(inputs.length / colNum);

        boxWidth = width / colNum;
        boxHeight = height / rowNum;

        for(let i = 0; i < inputs.length; i++){
           // brushes.push(new Brush(int(random(brushImages.length))));
            let cIndex = i % colNum;
            let rIndex = int(i / colNum);

            let divElement = document.createElement('div');
            divElement.id = "div-" + i;
            divElement.classList.add('input');
            divElement.style.width = boxWidth + "px";
            divElement.style.height = boxHeight + "px";
            divElement.style.left = cIndex * boxWidth + "px";
            divElement.style.top = rIndex * boxHeight + "px";
            document.getElementById('grid').append(divElement);

            let colorsText = "<br>";

            console.log(i + ": " + cIndex + ", " + rIndex);

            if(inputs[i].imageURL) {

                let imgElement = document.createElement('img');
                imgElement.id = i;
                imgElement.src = inputs[i].imageURL;

                document.getElementById('div-' + i).append(imgElement);
            }

            if(inputs[i].colors){
                let imageColors = JSON.parse(inputs[i].colors);

                let maxBrush = imageColors.length;
                if(maxBrush > 3){
                    maxBrush = 3;
                }

                for(let j = 0; j < maxBrush; j++) {

                    colorsText += "<span style='color:" + imageColors[j] + "'>"+ imageColors[j] + "</span><br>";
                    let redVal = parseInt(imageColors[j].slice(1, 3), 16);
                    let greenVal = parseInt(imageColors[j].slice(3, 5), 16);
                    let blueVal = parseInt(imageColors[j].slice(5, 7), 16);

                    console.log(redVal + ", " + greenVal + ", " + blueVal);

                    let bIndex = 2;
                    if(inputs[i].wordScore < 0){
                        bIndex = int(random(0, 2));
                    }

                    if(inputs[i].wordScore > 0){
                        bIndex = int(random(3, 5));
                    }

                    let x = random(boxWidth * cIndex + boxWidth / 4, boxWidth * (cIndex + 1) - boxWidth / 4);
                    let y = random(boxHeight * rIndex + boxHeight / 4, boxHeight * (rIndex + 1) - boxHeight / 4);
                    brushes.push(new Brush(bIndex, abs(inputs[i].wordScore), redVal, greenVal, blueVal, x, y));
                }
            }

            let textElement = document.createElement('p');
            textElement.innerHTML = "<span class='keyword'>" + inputs[i].word + "</span><br>Text sentiment score: " + inputs[i].wordScore + colorsText;
            textElement.style.width = boxWidth + "px";
            document.getElementById('div-' + i).append(textElement);
        }
    });
}

function draw(){

    for(let i = 0; i < brushes.length; i++){
        brushes[i].update();
        brushes[i].display();
    }

    tint(255, 10);
    image(paintLayer, 0, 0);
}

class Brush{
    constructor(i, j, rVal, gVal, bVal, x, y){
        this.redVal = rVal;
        this.greenVal = gVal;
        this.blueVal = bVal;
        this.pos = createVector(x, y);
        this.vel = createVector(random(-2, 2), random(-2, 2));
        this.brushSize = random(10 * j + 10, j * 20 + 10);
        this.noiseVal = random(0.01, 0.05);
        this.index = i % 5;
    }

    update(){

        if(this.pos.x < 0 || this.pos.x > width){
            this.vel.x *= -1;
        }

        if(this.pos.y < 0 || this.pos.y > height){
            this.vel.y *= -1;
        }

        this.pos.x += this.vel.x + (noise(frameCount * this.noiseVal) - 0.5) * 5;
        this.pos.y += this.vel.y + (noise(frameCount * (this.noiseVal + 0.01)) - 0.5) * 5;
    }

    display(){
        paintLayer.push();
        paintLayer.translate(this.pos.x, this.pos.y);
        paintLayer.rotate((noise(frameCount * 0.01) - 0.5) * PI * 2);
        paintLayer.tint(this.redVal, this.greenVal, this.blueVal, 50);

        paintLayer.image(brushImages[this.index], 0, 0, this.brushSize + random(-5, 5), this.brushSize + random(-5 ,5));
        paintLayer.pop();
    }
}