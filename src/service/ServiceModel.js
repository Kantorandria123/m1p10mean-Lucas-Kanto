const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  prix: {
    type: Number,
    required: false,
  },
  duree: {
    type: Number,
    required: false,
  },
  commission: {
    type: Number,
    required: false,
  },
});

const ServiceModel = mongoose.model('Service', serviceSchema);

module.exports = ServiceModel;
