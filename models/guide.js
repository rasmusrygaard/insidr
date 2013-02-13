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
	name: {
	    type: Seq.STRING,
	    allowNull: false
	},
	city: {
	    type: Seq.STRING,
	    allowNull: false
	}
    },
    relations: {
	hasMany: "place",
	hasOne: "category"
    }
}
