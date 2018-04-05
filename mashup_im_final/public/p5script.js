let particles = [];
let imgs = [];
let img1;
let data;
let value;
let d;

function preload() {
  // for (var i = 0; i < 3; i++) {
  //   imgs[i] = loadImage("s" + (i + 1) + ".png");
  //   console.log(i);
  // }
  // console.log("finished");
  img1 = loadImage("s1.png");
  data = loadJSON("trends.json");
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight*2);
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight*3);
  canvas.position(0, 0);
  canvas.style('z-index', -10);
}

function draw() {
  background(175);
  clear();
  push();
  frameRate(10);
  value = data.default.timelineData[28].value[0];
  d = map(value,0, 100, 10, 40);
  console.log(d);

  // draw emission animation
  for (let j = 0; j < 1; j++) {
    let p = new Particle(d);
    particles.push(p);
    console.log(particles.length);
  }
  for (let j = 0; j < particles.length && j < 3; j++) {
    particles[j].update();
    particles[j].show();
    if (particles.length > 3) {
      particles.splice(j, 1);
    }
  }
  pop();
}

class Particle {
  constructor(d) {
    this.x = mouseX;
    this.y = mouseY;
    this.vx = random(-1, 15);
    this.vy = random(-1, 15);
    this.d = d;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
  }

  show() {
    image(img1, this.x, this.y, this.d, this.d);
  }
}
