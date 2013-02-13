var model = require('../lib/model');

var getCategories = function (req, res) {
    res.send(200, [{ name: "Coffee", id: 1 }, { name: "Food", id: 2 }, { name: "Drinks", id: 3 },
		  { name: "Nightclubs", id: 4 }, { name: "Shopping", id: 5 }]);
};

var setup = function (app) {
    app.get('/categories', getCategories);
};

module.exports = setup;
