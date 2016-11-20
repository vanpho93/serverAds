var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
server.listen(process.env.PORT);

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

function Ad(name, image, link) {
    this.name = name;
    this.image = image;
    this.link = link;
}

var mang = [new Ad('Facebook', '1.jpg', 'facebook.com'),
    new Ad('Twitter', '2.png', 'twitter.com'),
    new Ad('Instagram', '3.jpg', 'instagram.com')
]
