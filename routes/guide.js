var model = require('../lib/model');

var getGuides = function (req, res) {
    model.model('guide').all().success(function (guides) {
	res.send(200, guides);
    }).error(function (error) {
	console.log('Error while fetching guides: ' + error);
	res.send(204, {error: 'An error occurrec: ' + error});
    });
};

var createGuide = function (req, res) {
    console.log(req.body);
    model.model('guide').create(req.body).success(function (guide) {
	console.log('Created guide: ' + guide);
	res.send(201, guide);
    }).error(function (error) {
	console.log('Error while creating guide: ' + error);	
	res.json(400, { error: 'An error occurred: ' + error });
    });
};

var getGuide = function (req, res, next) {
    model.model('guide').find(parseInt(req.params.id)).success(function (guide) {
	res.guide = guide;
	next();
    });
};

var getGuidePlaces = function (req, res) {
    console.log(res.guide);
    res.guide.getPlaces()
	.success(function(a) {
	    console.log('success');
	    res.send(a);
	})
	.error(function() {
	    console.log('error');
	});
};

var setup = function (app) {
    app.get('/guides', getGuides);
    app.post('/guides', createGuide);
    app.get('/guides/:id/places', getGuide, getGuidePlaces);
    app.get('/guides/:id', getGuide, function (req, res) { 
	res.send(res.guide);
    });
};

module.exports = setup;
