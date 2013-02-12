module.exports = function () {
    // Get database settings depending on environment.
    var dbOptions = { omitNull: true };
    switch(process.env.NODE_ENV) {
    case 'production':
	var dbUrl = url.parse(process.env.HEROKU_POSTGRESQL_PURPLE_URL),
	authArr = dbUrl.auth.split(':');

	dbOptions.name          = dbUrl.path.substring(1);
	dbOptions.user          = authArr[0];
	dbOptions.pass          = authArr[1];
	dbOptions.host          = dbUrl.host.split(':')[0];
	dbOptions.port          = 5432;
	dbOptions.omitNull      = true;
	dbOptions.dialect       = 'postgres';
	dbOptions.protocol      = 'postgres';
	break;

    case 'development':
	dbOptions.name          = process.env.DATABASE_NAME;
	dbOptions.user          = process.env.DATABASE_USER;
	dbOptions.pass          = null;
	dbOptions.host          = process.env.DATABASE_HOST;
	dbOptions.port          = process.env.DATABASE_PORT;
	dbOptions.omitNull      = true;
	dbOptions.dialect       = process.env.DATABASE_DIALECT;
	break;

    default:
	throw new Error('Invalid environment: ' + process.env.NODE_ENV);
    }

    return { db: dbOptions };
};
