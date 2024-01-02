const mongoose = require("mongoose");
require("dotenv").config();

class MongoConnection {
	constructor() {
		this._connect();
	}

	_connect() {
		mongoose
			.connect(process.env.DB_STRING)
			.then(() => console.log("Database connection successfull!"))
			.catch(() => console.log("Database connection failed!"));
	}
}

module.exports = new MongoConnection();
