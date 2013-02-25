var model = require('../lib/model');

var getCategories = function (req, res) {
    model.model('category').findAll()
	.success(function (categories) {
	    res.send(categories);
	})
	.error(function (e) {
	    res.json(400, { error: 'An error occurred: ' + e });
	});
};

/* Get the category that matches req.params.id. */
var getCategory = function (req, res, next) {
    model.model('category').find(parseInt(req.params.id))
	.success(function (category) {
	    res.category = category;
	    next();
	})
	.error(function (e) {
	    res.json(400, { error: 'An error occurred: ' + e });
	});
};

/* Load guides for a given category
   Assumes that res.category contains a category object . */
var getGuides = function (req, res) {
    res.category.getGuides()
	.success(function (guides) {
	    res.send(guides);
	})
	.error(function (e) {
	    res.json(400, { error: 'An error occurred: ' + e});
	});
};

var setup = function (app) {
    app.get(app.get('rootUrl') + '/categories', getCategories);
    app.get(app.get('rootUrl') + '/categories/:id/guides', getCategory, getGuides);
    app.get(app.get('rootUrl') + '/categories/:id', getCategory, 
	    function (req, res) { res.send(res.category) });
};

module.exports = setup;
