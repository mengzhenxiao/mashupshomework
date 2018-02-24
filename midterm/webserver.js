var express = require('express')
var app = express()


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

app.use('/dressme',express.static('public'));

// app.get('/page', function (req, res) {
// 	var fileToSend = "index.html";
// 	res.sendfile(fileToSend, {root: './public'}); // Files inside "public" folder
// });



app.get('/display', function(req, res) {
  db.thesubmissions.find({}, function(err, saved) {
    if (err || !saved) {
    	console.log("No results");
    }
    else {
      console.log(saved);
      res.send(saved);
  	}
  });
});
