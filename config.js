if (process.env.NODE_ENV != 'production') require('dotenv').load();

module.exports = {
	APPNAME: process.env.APPNAME || 'Hills',
    PORT: process.env.PORT || 8080,
    DEVMODE: (process.env.NODE_ENV != 'production'),
    KEYS: process.env.NODE_ENV === 'production' ? require('./.devKeys').mongoURI : "mongodb://localhost:27017/skiresorts"
};