var model = require('../lib/model');

var getPlaces = function (req, res) {
    model.model('place').all().success(function (places) {
        res.send(200, places);
    }).error(function (error) {
        console.log('Error while fetching places: ' + error);
        res.send(204, {error: 'An error occurred: ' + error});
    });
};

/* Build a Place object in the db with properties from req.newPlace. */
var buildPlace = function (req, res) {
    console.log(req.newPlace);
    model.model('place').create(req.newPlace)
    .success(function (place) {
        console.log('Created place: ' + place);
        model.model('location').find(place.locationId).success(function (l) {
            /* For reasons unknown, this updates the locations relation. */
            place.setLocation(l);
        });
        res.send(201, place);
    })
    .error(function (error) {
        console.log('Error while creating place: ' + error);    
        res.json(400, { error: 'An error occurred: ' + error });
    });
};

var createPlace = function (req, res) {
    var newPlace = {};
    newPlace.fsId = req.body.fsId;
    newPlace.name = req.body.name.replace("\'", ""); // Get rid of quotes
    newPlace.guideId = req.body.guideId;
    newPlace.locationId = req.body.locationId;
    model.model('place').find({ where: { fsId: newPlace.fsId }})
    .success(function(place) {
        if (place) {
            console.log('Place already exists: ' + place);
            res.send(201, place);
        } else {
            req.newPlace = newPlace;
            buildPlace(req, res);
        }
    });
};

var getPlace = function (req, res, next) {
    model.model('place').find(parseInt(req.params.id)).success(function (place) {
        res.place = place;
        if (req.query.locations === 'true') {
            res.place.getLocation()
            .success(function (location) {
                res.place.attributes.push('location');
                res.place.location = location.toJSON();
            })
            .done(function () {
                next();
            });
        } else {
            next();
        }
    });
};

var getPlaceLocation = function (req, res) {
    res.place.getLocation()
    .success(function (location) {
        res.send(location);
    })
    .error(function (error) {
        res.json(400, { error: 'An error occurred: ' + error });        
    });
};

var setup = function (app) {
    app.get(app.get('rootUrl') + '/places', getPlaces);
    app.post(app.get('rootUrl') + '/places', createPlace);
    app.get(app.get('rootUrl') + '/places/:id/locations', getPlace, getPlaceLocation);
    app.get(app.get('rootUrl') + '/places/:id', getPlace, function (req, res) { 
        res.send(res.place);
    });
};

module.exports = setup;
