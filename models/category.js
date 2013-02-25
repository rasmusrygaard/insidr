var orm = require('../lib/model');
var Seq = orm.Seq();

module.exports = {
    model: {
	id: Seq.INTEGER,
	name: Seq.STRING,
    },
    relations: {
	hasMany: 'guide'
    }
}
