var tree;
var max_dist = 100;
var min_dist = 10;

var url='https://api.mlab.com/api/1/databases/mashups_final/collections/userData?apiKey=RTZEqTz_6AQcWHs_C-Y19nghbsZbVW9L';

var mongoData;
var dataLength;

var img;
var img2;

function preload() {
  mongoData = loadJSON(url);
  img = loadImage('pink-sakura-md.png');
   img2 = loadImage('  pink-sakura-md2.png');

}

function setup() {
  let canvas = createCanvas(windowWidth, 600);
  canvas.position(0, 0);
  canvas.style('z-index', -1);
  tree = new Tree();

  dataLength = Object.keys(mongoData).length;

  button = createButton('click me');
  button.position(windowWidth/2-100, 500);
  button.mousePressed(saveData);



   for(var i=0; i< dataLength; i++){
     var x = random(width);
     var y =random(350);
     var d = dist(x, y, width/2, 350);
  if (d < 300){
    var a = x;
    var b = y;
         tint(255, 126);
    image(img, a, b,25,25);
    }
   }


}

function draw() {
    tree.show();
  tree.grow();

}

function saveData(){
    let now = new Date();
    let dateToSend = new Date(now.setDate(now.getDate()));
    let sendData= { "timeToSend": dateToSend	}	;

httpPost(url,'json',sendData,function(data){
  console.log(data);
});

 var x = random(width);
     var y =random(350);
     var d = dist(x, y, width/2, 350);
  if (d < 300){
    var a = x;
    var b = y;
    tint(255, 255);
    image(img2, a, b,40,40);
    }

  createDiv('<h1>Thank You!</h1><br><p>You are the No.'+dataLength+'love this page.');

}
