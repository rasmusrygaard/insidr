var express = require("express");
var app = express();
var path = require('path');
var lessMiddlware = require('less-middleware');
var http = require('http');

var model = require('./lib/model');
var url = require('url');
var Conf = require('./config'),
    config = new Conf();

var dbOptions = config.db;

// Initialize the models.
// model.js is in lib/ and models should be in models/
model.setup('./models', dbOptions.name, dbOptions.user, dbOptions.pass, dbOptions);

model.seq().sync().success(function () {
    console.log('Database synced!');
}).error(function (error) {
    console.log('Sync failed: ' + error);
});

app.configure(function () {
    app.set('port', process.env.PORT || 5000);
    app.set('rootUrl', '/api');
    app.use(express.bodyParser());
    app.use(express.logger('dev'));    
    app.use(lessMiddlware({
	src: __dirname + '/public',
	compress: true
    }));
    app.use(express.static(path.join(__dirname, '/public')));
});

/* Load routes from ./routes/ subdirectory. */
['guide', 'place', 'category', 'location'].forEach(function (element) {
    require('./routes/' + element)(app);
});

/* Default to serving index.html and let Backbone handle route. */
app.use(function(req, res) {
    res.sendfile('./public/index.html');
});

http.createServer(app).listen(app.get('port'), function() {
    console.log('Listening on ' + app.get('port'));
});
