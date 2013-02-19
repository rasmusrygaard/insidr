// location.js
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

	address: Seq.STRING,
	city: Seq.STRING,
	country: Seq.STRING,
	lat: Seq.FLOAT,
	lng: Seq.FLOAT,
	postalCode: Seq.INTEGER,
	state: Seq.STRING
    },
    relations: {
	hasOne: "place"
    }
}
