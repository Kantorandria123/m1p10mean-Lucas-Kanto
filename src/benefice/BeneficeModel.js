const mongoose = require('mongoose');

const beneficeSchema = new mongoose.Schema({
  moisint: {
    type: Number,
    required: false,
  },
  totalMontant: {
    type: Number,
    required: false,
  },
  mois: {
    type: String,
    required: false,
  },
  benefice: {
    type: Number, 
    required: false,
  },
  perte: {
    type: Number, 
    required: false,
  },
});

const beneficeModel = mongoose.model('chiffre_affaires_par_mois', beneficeSchema);

module.exports = beneficeModel;
