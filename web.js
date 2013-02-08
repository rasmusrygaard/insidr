var express = require("express");

var app = express();

var model = require('./lib/model');

var dbOptions = {};

switch(process.env.NODE_ENV) {
case 'production':
    // Get the Heroku DB url, split it and set up properties.
    var url     = require('url'),
    dbUrl   = url.parse(process.env.HEROKU_POSTGRESQL_PURPLE_URL),
    authArr = dbUrl.auth.split(':');

    dbOptions.name          = dbUrl.path.substring(1);
    dbOptions.user          = authArr[0];
    dbOptions.pass          = authArr[1];
    dbOptions.host          = dbUrl.host.split(':')[0];
    dbOptions.port          = 5432;
    dbOptions.omitNull      = true;
    dbOptions.dialect       = 'postgres';
    dbOptions.protocol      = 'postgres';
    break;
default:
    throw new Error('Not production environment');
}    

// Initialize the models.
// model.js is in lib/ and models should be in models/
model.setup('./models', dbOptions.name, dbOptions.user, dbOptions.pass, {
    host: dbOptions.host,
    port: dbOptions.port,
    omitNull: true,
    dialect: dbOptions.dialect,
    production: dbOptions.protocol
});

console.log(model.seq());

model.seq().sync().success(function () {
    console.log('Synced!');
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
	title: 'Test guide!',
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
