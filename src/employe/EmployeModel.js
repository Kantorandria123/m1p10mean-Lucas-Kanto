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
  image: {
    type: String,
    required: true,
  },
  horaireTravail: {
    type: String, 
    required: true,
  },
  role_id: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
});

const EmployeModel = mongoose.model('Employe', employeSchema);

module.exports = EmployeModel;
