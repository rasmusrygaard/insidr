// place.js
var orm = require('../lib/model');
var Seq = orm.Seq();

module.exports = {
    model: {
        id:  { 
            type: Seq.INTEGER, 
            primaryKey: true,
            autoIncrement: true,
            defaultValue: 0
        },
        fsId: {
            type: Seq.STRING,
            unique: true
        },
        name: Seq.STRING
    },
    relations: {
        hasOne: 'location',
        hasMany: 'guide'
    }
};
