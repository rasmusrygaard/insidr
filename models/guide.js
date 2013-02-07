var orm = require('models/model.js');
// Get the Sequelize constructor
var Seq = orm.Seq();

module.exports = {
    model: {
	id: Seq.INTEGER,
	name: Seq.STRING,
	city: Seq.STRING
    }
}
