const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
    name: { type: String, require: [true, 'client name is required'] }
});

module.exports = mongoose.model('Client', ClientSchema);
