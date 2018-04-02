var express = require('express')
var app = express()
var fs = require('fs');


var instagram = require('instagram-node').instagram();

instagram.use({
	client_id: 'ce3d806fd831427ba893c68f172e48de',
	client_secret: 'cb84118676d442f9a1fdb6600f2bd640'
});

var redirectUri = 'http://mx536.itp.io:3000/handleauth';



exports.authorize_user = function(req, res) {
  res.redirect(instagram.get_authorization_url(redirectUri, { scope: ['public_content'], state: 'a state' }));
};

exports.handleauth = function(req, res) {
  instagram.authorize_user(req.query.code, redirectUri, function(err, result) {

    if (err) {
      console.log("Failed to get the access token");
      res.send(err);

    } else {
      at = result.access_token;
      console.log("successfully got the access token");
      // app.get('/tag', function(req, res, next) {
      //     instagram.use({
      //       client_id: 'ce3d806fd831427ba893c68f172e48de',
      //       client_secret: 'cb84118676d442f9a1fdb6600f2bd640',
      //       access_token: at
      //     });
      //
      //       instagram.tag_media_recent('everydayoutfit', function(err, medias, pagination, remaining, limit) {
      //         if(err) {
      //          console.log("Failed to load API");
      //          console.log(err);
      //          } else {
      //          console.log(medias);
      //       }
      //     });
      //   }, function(err) {
      //     // handle err here
      //     return res.send('OK');
      //   });

      // console.log('Access token: ' + at);
      // console.log('User id: ' + result.user.id);
      // console.log('User name: ' + result.user.username);
      // console.log('Profile Picture: ' + result.user.profile_picture);

      instagram.use({
        client_id: 'ce3d806fd831427ba893c68f172e48de',
        client_secret: 'cb84118676d442f9a1fdb6600f2bd640',
        access_token: at
      });

      instagram.tag_media_recent('everydayoutfit', function(err, medias, pagination, remaining, limit) {
        if(err) {
         console.log("Failed to load API");
         console.log(err);
         } else {
         console.log(medias);
         res.send(medias);
         var str_json = JSON.stringify(medias);
         console.log(str_json);
         fs.writeFile('public/ins.json', str_json, 'utf8', function(){
         console.log("finished save");
   });
      }
    });
    }

  });

};





// This is where you would initially send users to authorize
app.get('/refresh', exports.authorize_user);

// This is your redirect URI
app.get('/handleauth', exports.handleauth);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

app.use('/dressme',express.static('public'));

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
