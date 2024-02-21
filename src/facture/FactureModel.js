const mongoose = require('mongoose');

const factureSchema = new mongoose.Schema({
  daty: {
    type: String,
    required: false,
  },
  montanttotal: {
    type: Number,
    required: false,
  },
  etat: {
    type: Number,
    required: false,
  },
  client_id: {
    type: String, 
    required: false,
  },
  
});

const factureModel = mongoose.model('facture', factureSchema);

module.exports = factureModel;
