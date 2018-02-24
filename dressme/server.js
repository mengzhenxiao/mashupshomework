// server.js
// load the things we need
var express = require('express');
var app = express();

// var config = require('./config.js');
//console.log(config);

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true }); // for parsing form data
app.use(urlencodedParser);

var mongojs = require('mongojs');

// set the view engine to ejs
app.set('view engine', 'ejs');

// app.get('/', function (req, res) {
// 	res.sendFile("moodpalette.html", {root: './public'}); // Files inside "public" folder
// });

app.use(express.static('public'));


// index page
var db = mongojs("subuser:177607040421@ds021989.mlab.com:21989/dwdtesting", ["thesubmissions"]);

app.get('/templatetest', function(req, res) {
	var data = {person: {name: req.query.inputEmail, other: req.query.inputPassword}};
    res.render('pages/index', data);

		db.thesubmissions.save({"user":data}, function(err, saved) {
		  if( err || !saved ) console.log("Not saved");
		  else console.log("Saved");
		});
});


// app.post('/templatetest', function(req, res) {
// 	var data = {person: {name: req.query.inputEmail, other: req.query.inputPassword}};
//     res.render('pages/index', data);
//
// 		db.thesubmissions.save({"user":data}, function(err, saved) {
// 		  if( err || !saved ) console.log("Not saved");
// 		  else console.log("Saved");
// 		});
// });


// about page
app.get('/about', function(req, res) {
    res.render('pages/about');
});

app.listen(3000);
console.log('3000 is the magic port');
