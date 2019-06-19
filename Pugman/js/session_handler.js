const cookieParser = require('cookie-parser');
const session = require('express-session');
var MSSQLStore = require('connect-mssql') (session);
var mssql = require('mssql');

module.exports = {
	createStore: function() {
		var config = {
			user:'test',
			password:'123',
			server:'localhost',
			database: 'testdb',
			port:1433,
			pool: {
				max:10,
				min:0,
				idleTimeoutMillis: 30000
			}
		}
		return new MSSQLStore(config);
	}
}