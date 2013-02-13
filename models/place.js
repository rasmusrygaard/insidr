// place.js
var orm = require('../lib/model');
var Seq = orm.Seq();

module.exports = {
    model: {
	id:  { 
	    type: Seq.INTEGER, 
	    autoIncrement: true,
	    primaryKey: true,
	    defaultValue: 0
	},
	name: Seq.STRING,
	latitude: Seq.FLOAT,
	longitude: Seq.FLOAT
    }
}
