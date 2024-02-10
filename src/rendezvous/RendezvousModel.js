const mongoose = require('mongoose');

const rendezvousSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  daty: {
    type: String,
    required: true,
  },
  horaire: {
    type: String, 
    required: true,
  },
  employee_id: {
    type: String,
    required: true,
  },
  service_id: {
    type: String,
    required: true,
  },
  client_id: {
    type: String,
    required: true,
  },
});

const RendezvousModel = mongoose.model('Rendezvous', rendezvousSchema);

module.exports = RendezvousModel;
