var express = require('express')
var app = express()
var fs = require('fs');


app.listen(3000, function() {
  console.log('Example app listening on port 3000!')
})

//get data from google trends api
const googleTrends = require('google-trends-api');
googleTrends.interestOverTime({
  keyword: 'sakura',
  startTime: new Date(Date.now() - (600 * 60 * 60 * 1000)),
  geo: 'JP'
}, function(err, results) {
  if (err) console.log('oh no error!', err);
  else {
    console.log(results);
    fs.writeFile('public/trends.json', results, 'utf8', function() {
      console.log("finished save");
    });
  }
});

app.use('/sakura', express.static('public'));
