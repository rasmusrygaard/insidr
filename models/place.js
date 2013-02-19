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
    },
    relations: {
	hasOne: 'location',
	hasMany: 'guide'
    }
}
