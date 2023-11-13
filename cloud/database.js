const mongoose = require('mongoose');

class Database {
  constructor(url) {
    this.url = url;
    this.connected = mongoose.connect(url, { useNewUrlParser: true })
      .then(() => console.log('Connected to MongoDB'))
      .catch(err => console.error('Error connecting to MongoDB', err));
  }

  status() {
    return this.connected.then(
      () => ({ error: null, url: this.url }),
      err => ({ error: err })
    );
  }

  model(name, schema) {
    return mongoose.model(name, schema);
  }
}

module.exports = Database;
