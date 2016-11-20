var pg = require('pg');
var uri = 'postgres://qfevzvzqamispj:NYoqaErLCLr84qEkf1v6MWDVAw@ec2-54-243-207-190.compute-1.amazonaws.com:5432/d16s2mb3c9o60u'
var pool = new pg.Pool();
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
server.listen(process.env.PORT || 3000);

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

var currentAd;

io.on('connection', function(socket) {
    console.log('New user connect!');

    socket.emit('SERVER_CHANGE_AD', currentAd);

    socket.on('ADMIN_SEND_NEW_AD', function(data){
      currentAd = mang.find(function(element){
        return data == element.image
      });
      io.emit('SERVER_CHANGE_AD', currentAd);
    });
});

app.get('/admin', function(req, res) {
  res.render('admin', {ads: mang});
});

app.get('/', function(req, res) {
  res.render('homepage', {ads: mang});
});

var queryDB = require('./db.js');

app.get('/db', function(req, res){
  pg.connect(uri, function(err, client, done) {
     client.query('SELECT * FROM Admin', function(err, result) {
        done();
        if(err) return console.error(err);
        console.log(result.rows);
     });
  });
});

function Ad(name, image, link) {
    this.name = name;
    this.image = image;
    this.link = link;
}

var mang = [new Ad('Facebook', '1.jpg', 'facebook.com'),
    new Ad('Twitter', '2.png', 'twitter.com'),
    new Ad('Instagram', '3.jpg', 'instagram.com')
]
