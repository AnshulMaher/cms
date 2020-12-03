const mongoose = require('mongoose');

const startDatabaseConnection = (uri) => {
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log('DB connection established');
    });
};

module.exports = startDatabaseConnection;
