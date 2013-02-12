var express = require("express");
var app = express();
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

app.get('/', function(request, response) {
    response.send('Hello World!');
});

app.get('/guides', function(request, response) {
    response.send([{city: "San Francisco"}, {city: "Copenhagen"}]);
});

app.get('/create', function(request, response) {
    console.log('Saving');
    var project = model.model('guide').create({
	name: 'Test guide!',
	city: 'Copenhagen'
    }).success(function (project) {
	console.log('SUCCES!');
	response.send(project.values);
	console.log(project.values);
    }).error(function (error) {
	console.log('error');
	response.send(error);
	console.log(error);
    });
});

app.get('/guides/:id', function(request, response) {
    response.send({id:request.params.id, city: "Copenhagen"});
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log('Listening on ' + port);
});
