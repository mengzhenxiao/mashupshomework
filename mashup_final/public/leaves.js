function Leaf() {
  // this.pos = createVector(random(width), random(height-100));
  this.x = random(width);
  this.y = random(350);

  this.d = dist(this.x, this.y, width/2, 350);
  if (this.d < 250){
    this.xx = this.x;
    this.yy = this.y;
    }
  this.pos = createVector(this.xx, this.yy);
  this.reached = false;

  this.show = function() {
    noFill();
    noStroke();
    ellipse(this.xx, this.yy, 4, 4);


  }

}
