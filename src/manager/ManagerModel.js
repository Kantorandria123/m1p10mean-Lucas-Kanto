const mongoose = require('mongoose');

const employeSchema = new mongoose.Schema({
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

const ManagerModel = mongoose.model('Manager', employeSchema);

module.exports = ManagerModel;
