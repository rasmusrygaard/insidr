var orm = require('../lib/model');
// Get the Sequelize constructor
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
	city: Seq.STRING
    },
    relations: {
	hasMany: "place"
    }
}
