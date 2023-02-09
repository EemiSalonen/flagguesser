const mongoose = require('mongoose');

class MongoConnection {
  constructor() {
    this._connect();
  }

  _connect() {
    mongoose
      .connect(`mongodb://root:password@localhost:27017/?authMechanism=DEFAULT`)
      .then(() => console.log('Database connection successfull!'))
      .catch(() => console.log('Database connection failed!'));
  }
}

module.exports = new MongoConnection();
