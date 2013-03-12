var model = require('../lib/model');

var getLocations = function (req, res) {
    model.model('location').all().success(function (locations) {
       res.send(200, locations);
   }).error(function (error) {
       console.log('Error while fetching locations: ' + error);
       res.send(204, {error: 'An error occurred: ' + error});
   });
};

var extractProperties = function (req, properties) {
    var result = {};
    var len = properties.length;
    for (var i = 0; i < len; i++) {
        result[properties[i]] = req.body[properties[i]];
    }
    console.log(result);
    return result;
};

var createLocation = function (req, res) {
    var newLocation = extractProperties(req, 
        ['address', 'city', 'country', 'lat', 'lng', 'postalCode', 'state']);

    model.model('location').create(newLocation).success(function (location) {
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
    app.get(app.get('rootUrl') + '/locations', getLocations);
    app.post(app.get('rootUrl') + '/locations', createLocation);
    app.get(app.get('rootUrl') + '/locations/:id', getLocation, function (req, res) { 
       res.send(res.location);
   });
};

module.exports = setup;
