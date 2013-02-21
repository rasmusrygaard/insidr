var model = require('../lib/model');

var getPlaces = function (req, res) {
    model.model('place').all().success(function (places) {
	res.send(200, places);
    }).error(function (error) {
	console.log('Error while fetching places: ' + error);
	res.send(204, {error: 'An error occurred: ' + error});
    });
};

var createPlace = function (req, res) {
    console.log(req.body);
    model.model('place').create(req.body).success(function (place) {
	console.log('Created place: ' + place);
	res.send(201, place);
    }).error(function (error) {
	console.log('Error while creating place: ' + error);	
	res.json(400, { error: 'An error occurred: ' + error });
    });
};

var getPlace = function (req, res, next) {
    model.model('place').find(parseInt(req.params.id)).success(function (place) {
	res.place = place;
	next();
    });
};

var setup = function (app) {
    app.get(app.get('rootUrl') + '/places', getPlaces);
    app.post(app.get('rootUrl') + '/places', createPlace);
    app.get(app.get('rootUrl') + '/places/:id', getPlace, function (req, res) { 
	res.send(res.place);
    });
};

module.exports = setup;
