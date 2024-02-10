const mongoose = require('mongoose');

const paiementSchema = new mongoose.Schema({
  daty: {
    type: String,
    required: true,
  },
  prix: {
    type: Number,
    required: true,
  },
  rendezvous_id: {
    type: String, 
    required: true,
  },
  etat: {
    type: Number,
    required: true,
  },
});

const paiementModel = mongoose.model('Paiement', paiementSchema);

module.exports = paiementModel;
