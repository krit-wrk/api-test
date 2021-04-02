const mongoose = require('mongoose');
require('dotenv').config();

const db = {
  connect: async () => {
    return new Promise((s) => {
      if (!process.env.DB) {
        console.error('empty file .env DB=mongodb://.....');
      }
      mongoose.connect(process.env.DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      const db = mongoose.connection;
      db.on('error', console.error.bind(console, 'connection error:'));
      db.once('open', s);
    });
  },
  close: async () => {
    return await mongoose.connection.close();
  },
};

module.exports = db;
