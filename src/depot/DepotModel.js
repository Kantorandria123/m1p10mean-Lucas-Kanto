const mongoose = require('mongoose');

const depotSchema = new mongoose.Schema({
    montant: {
        type: Number,
        required: true,
    },
    client_id: {
        type: String,
        required: true,
    },
    etat: {
        type: String,
        required: true,
    },
});

const DepotModel = mongoose.model('Depot', depotSchema);

module.exports = DepotModel;