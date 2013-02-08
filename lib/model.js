var filesystem = require('fs');
var models = {};
var relationships = {};

var singleton = function singleton() {
    var Sequelize = require('sequelize');
    var sequelize = null;
    var modelsPath = "";

    this.setup = function (path, database, username, password, obj) {
	modelsPath = path;
	console.log('path: ' + path);
	console.log('database: ' + database);
	console.log('username: ' + username);
	console.log('password: ' + password);
	console.log(obj);
	switch (arguments.length) {
	case 3:
	    sequelize = new Sequelize(database, username);
	    break;
	case 4:
	    sequelize = new Sequelize(database, username, password);
	    break;
	case 5:
	    sequelize = new Sequelize(database, username, password, obj);
	    break;
	default:
	    throw new Error('Invalid number of Sequelize arguments');
	}

	init();
    }

    // Pull model with NAME out of models object.
    this.model = function (name) {
	return models[name];
    }

    // Return Sequelize constructor.
    // Useful for getting properties like Sequelize.INTEGER
    this.Seq = function () {
	return Sequelize;
    }
    
    this.seq = function () {
	return sequelize;
    }

    function init() {
	console.log(modelsPath);
	filesystem.readdirSync(modelsPath).forEach(function (name) {
	    var obj = require("." + modelsPath + "/" + name);
	    var options = obj.options || {};
	    var modelName = name.replace(/\.js$/i, "");
	    console.log('Creating ' + modelName + ' module');
	    models[modelName] = sequelize.define(modelName, obj.model, options);
	    if ('relations' in obj) {
		relationships[modelName] = obj.relations;
	    }
	});
	console.log(models);
	for (var name in relationships) {
	    var relation = relationships[name];
	    for (var relName in relation) {
		var related = relation[relName];
		console.log(related);
		models[name][relName](models[related]);
	    }
	}
    }
    
    if (singleton.caller != singleton.getInstance) {
	throw new Error("This object cannot be instanciated");
    }
}

singleton.instance = null;

singleton.getInstance = function () {
    if (this.instance == null) {
	this.instance = new singleton();
    }
    return this.instance;
}

module.exports = singleton.getInstance();
