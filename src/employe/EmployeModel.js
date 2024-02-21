const mongoose = require('mongoose');

const employeSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  mdp: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  horaireTravail: {
    type: String, 
    required: false,
  },
  token: {
    type: String,
  },
  heuredebut: {
    type: Number, 
    required: false,
  },
  heureFin: {
    type: Number, 
    required: false,
  },
  nbJourTravailSemaine: {
    type: Number, 
    required: false,
  },
  nbJourTravailMois: {
    type: Number, 
    required: false,
  }
});

const EmployeModel = mongoose.model('Employe', employeSchema);

module.exports = EmployeModel;
