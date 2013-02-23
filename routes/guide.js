var model = require('../lib/model');
var _ = require('underscore');

var getGuides = function (req, res) {
    model.model('guide').all().success(function (guides) {
	res.send(200, guides);
    }).error(function (error) {
	console.log('Error while fetching guides: ' + error);
	res.send(204, {error: 'An error occurrec: ' + error});
    });
};

var createGuide = function (req, res) {
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

var checkPlacesQuery = function (req, res, next) {
    var toReturn = _.sortBy(res.places, function (p) { return p.placeId });
    if (req.query.locations == 'true') {
	var locationIDs = _.map(res.places, function (p) { return p.locationId; });

	/* Sort DESC to pop() easily from returned array. */
	model.model('location').findAll({where: { id: locationIDs }, order: 'placeId DESC' })
	    .success(function (locations) {
		toReturn = _.map(toReturn, function (place) {
		    place.attributes.push('location');
		    place.location = locations.pop().toJSON();
		    return place;
		});
	    })
	    .done(function () {
		res.places = toReturn;
		next();
	    });
    } else {
	next();
    }
};

var getGuidePlaces = function (req, res, next) {
    res.guide.getPlaces()
	.success(function(places) {
	    res.places = places;
	    next();
	})
	.error(function() {
	    res.json(400, { error: 'An error occurred: ' + error });
	});
};

var setup = function (app) {
    app.get(app.get('rootUrl') + '/guides', getGuides);
    app.post(app.get('rootUrl') + '/guides', createGuide);
    app.get(app.get('rootUrl') + '/guides/:id/places', getGuide, getGuidePlaces, 
	    checkPlacesQuery, function (req, res) { res.send(res.places) });
    app.get(app.get('rootUrl') + '/guides/:id', getGuide, function (req, res) { 
	res.send(res.guide);
    });
};

module.exports = setup;
