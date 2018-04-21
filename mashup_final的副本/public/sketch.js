//tree
let tree;
let max_dist = 100;
let min_dist = 10;
let url = 'https://api.mlab.com/api/1/databases/mashups_final/collections/userData?apiKey=RTZEqTz_6AQcWHs_C-Y19nghbsZbVW9L';
let mongoData;
let dataLength;
let img;
let img2;


function preload() {
  //tree
  mongoData = loadJSON(url);
  img = loadImage('pink-sakura-md.png');
  img2 = loadImage('  pink-sakura-md2.png');

}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight*2);
}

function setup() {
  let canvas = createCanvas(windowWidth, 600);
  canvas.position(0, 0);
  canvas.style('z-index', -1);
  tree = new Tree();

  dataLength = Object.keys(mongoData).length;

  button = createButton('LOVE');
  button.position(windowWidth / 2 - 130, 550);
  button.mousePressed(saveData);



  for (var i = 0; i < dataLength; i++) {
    var x = random(width / 2 - 250, width / 2 + 250);
    var y = random(100, 350);
    tint(255, 126);
    image(img, x, y, 25, 25);
  }


}

function draw() {
  tree.show();
  tree.grow();
}




function saveData() {
  let now = new Date();
  let dateToSend = new Date(now.setDate(now.getDate()));
  let sendData = {
    "timeToSend": dateToSend
  };

  httpPost(url, 'json', sendData, function(data) {
    console.log(data);
  });

  var x = random(width / 2 - 250, width / 2 + 250);
  var y = random(100, 350);
  tint(255, 255);
  image(img2, x, y, 40, 40);

  var p = select('#question');
  p.hide();
  button.hide();
  var t = select('#thankyou');
  t.html('Thank You! You are No.   ' + (dataLength + 1));
  button2 = createA('#page2','Where to enjoy Sakura?');
  button2.position(windowWidth / 2 - 160, 550);
  // button2.createA('#page2');

}

function showDataPage(){
  // var p2 = select('#page2');
  // p2.show();
}
