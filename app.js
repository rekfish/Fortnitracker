////TRN-Api-Key: 0dc4ffbf-efa9-4742-b294-edcba4054483
//GET https://api.fortnitetracker.com/v1/profile/{platform}/{epic-nickname}
//Platforms--pc, xbl, psn
var express = require('express');
var app = express();
var path = require('path');
var request = require('request');
var bodyParser = require('body-parser');
const {google} = require('googleapis');
//var keys = require(JSON.parse('keys'));

//var routes = require('stats')
var MongoClient = require('mongodb').MongoClient, assert = require('assert');
var url = 'mongodb://localhost:27017/fnst';
MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/public', express.static(path.join(__dirname, 'static')));

// Use connect method to connect to the Server

var insertDocuments = function(db,data, callback) {
  // Get the documents collection
  var collection = db.collection('fnst');
  // Insert some documents
  collection.insert( data, function(err, result) {
    console.log("Inserted user platform into collection");
    callback(result);
  });
}



app.get('/',function(req,res){
    res.sendFile(path.join(__dirname + '/static/index.html'));
});

var uri = 'https://api.fortnitetracker.com/v1/profile/';

// TRN-Api-Key: a768e120-a23b-4880-a2a3-fdbdda42c52a
app.post('/',function(req,res){
  var responsejson=req.body
    console.log(req.body);
    request.get(uri + req.body.dropDownValue + '/' + req.body.epicNickName,{
        headers : {
            'TRN-Api-Key': 'a768e120-a23b-4880-a2a3-fdbdda42c52a'
        }},function(error,response,body){
        console.log(body);
        res.json(body);

        var data=req.body

        

        insertDocuments(db, data, function() {
        db.close();
  });
});

    });
});
var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Live Twitch Fortnitracker at http://%s:%s', host, port);
});


// begin OUATH Process here!

var OAuth2 = google.auth.OAuth2;
//i was unable to obfuscate my key  and ran out of time trying to fix the routing. I even created an app.use case and a json.parse method and still failed....
var oauth2Client = new OAuth2("1070820662989-enup0g8c4i905irhj1ss707am40a9i78.apps.googleusercontent.com", "MLp7aZ5aARrPioss9vK4", "http://localhost:3000/oauthcallback");

// generate a url that asks permissions for Google+ and Google Calendar scopes
var scopes = [
  'https://www.googleapis.com/auth/gmail.modify'
];

var url = oauth2Client.generateAuthUrl({
  access_type: 'offline', // 'online' (default) or 'offline' (gets refresh_token)
  scope: scopes // If you only need one scope you can pass it as string
});

app.get("/url", function(req, res) {
  res.send(url);
});

app.get("/tokens", function(req, res) {

  var code = req.query.code;

  console.log(code);

  oauth2Client.getToken(code, function(err, tokens) {
    if (err) {
      console.log(err);
      res.send(err);
      return;
    }

    console.log("allright!!!!");

    console.log(err);
    console.log(tokens);
    oauth2Client.setCredentials(tokens);

    res.redirect('tokens');
  });
});
app.get('/:var1',function (req,res){
  
    var embed= `<iframe class='stream' src="https://player.twitch.tv/?channel=`+req.params.var1+`" frameborder="0" allowfullscreen="true" scrolling="no" height="378" width="620"></iframe>`+`<iframe src="https://www.twitch.tv/embed/`+req.params.var1+`/chat" frameborder="0" scrolling="no" height="378" width="350"></iframe><a href="http://localhost:3000" class="button">Close Stream</a>`


        res.send(embed)
    });