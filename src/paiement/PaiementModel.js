const mongoose = require('mongoose');

const paiementSchema = new mongoose.Schema({
  daty: {
    type: String,
    required: true,
  },
  service: {
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
  client_id: {
    type: String, 
    required: true,
  },
  
});

const paiementModel = mongoose.model('Paiement', paiementSchema);

module.exports = paiementModel;
