const mongoose = require('mongoose');

const tacheSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  daty: {
    type: String,
    required: true,
  },
  horairedebut: {
    type: String, 
    required: true,
  },
  horairefin: {
    type: String, 
    required: false,
  },
  employee_id: {
    type: String,
    required: true,
  },
  service_id: {
    type: String,
    required: true,
  },
  etat: {
    type: Number,
    required: true,
  },
});

const tacheModel = mongoose.model('tache', tacheSchema);

module.exports = tacheModel;
