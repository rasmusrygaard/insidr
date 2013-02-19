var express = require("express");
var app = express();
var path = require('path');
var lessMiddlware = require('less-middleware');
app.use(express.bodyParser());

var model = require('./lib/model');
var url = require('url');
var Conf = require('./config'),
    config = new Conf();

// TMP
require('./routes/guide')(app);
require('./routes/place')(app);
require('./routes/category')(app);
require('./routes/location')(app);

var dbOptions = config.db;

// Initialize the models.
// model.js is in lib/ and models should be in models/
model.setup('./models', dbOptions.name, dbOptions.user, dbOptions.pass, dbOptions);

model.seq().sync().success(function () {
    console.log('Database synced!');
}).error(function (error) {
    console.log('Sync failed: ' + error);
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


app.use(express.logger('dev'));
app.use(lessMiddlware({
    src: __dirname + '/public',
    compress: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('port', process.env.PORT || 5000);



app.listen(app.get('port'), function() {
    console.log('Listening on ' + app.get('port'));
});
