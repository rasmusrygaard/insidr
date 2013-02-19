var model = require('../lib/model');

var getLocations = function (req, res) {
    model.model('location').all().success(function (locations) {
	res.send(200, locations);
    }).error(function (error) {
	console.log('Error while fetching locations: ' + error);
	res.send(204, {error: 'An error occurred: ' + error});
    });
};

var createLocation = function (req, res) {
    model.model('location').create(req.body).success(function (location) {
	console.log('Created location: ' + location);
	res.send(201, location);
    }).error(function (error) {
	console.log('Error while creating location: ' + error);	
	res.json(400, { error: 'An error occurred: ' + error });
    });
};

var getLocation = function (req, res, next) {
    model.model('location').find(parseInt(req.params.id)).success(function (location) {
	res.location = location;
	next();
    });
};

var setup = function (app) {
    app.get('/locations', getLocations);
    app.post('/locations', createLocation);
    app.get('/locations/:id', getLocation, function (req, res) { 
	res.send(res.location);
    });
};

module.exports = setup;
