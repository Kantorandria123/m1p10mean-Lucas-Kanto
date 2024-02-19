const mongoose = require('mongoose');

const managereSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mdp: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
});

const managereModel = mongoose.model('Manager', managereSchema);

module.exports = managereModel;
