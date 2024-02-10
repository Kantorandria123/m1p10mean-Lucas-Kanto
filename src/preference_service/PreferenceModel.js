const mongoose = require('mongoose');

const preferenceSchema = new mongoose.Schema({
  service_id: {
    type: String,
    required: false,
    unique: true,
  },
  client_id: {
    type: String, 
    required: true,
  },
});

const preferenceModel = mongoose.model('Preference_service', preferenceSchema);

module.exports = preferenceModel;
