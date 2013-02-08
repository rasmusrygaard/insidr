var orm = require('./lib/model');
// Get the Sequelize constructor
var Seq = orm.Seq();

module.exports = {
    model: {
	id: Seq.INTEGER,
	name: Seq.STRING,
	city: Seq.STRING
    }
}
