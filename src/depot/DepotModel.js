const mongoose = require('mongoose');

const depotSchema = new mongoose.Schema({
    montant: {
        type: String,
        required: true,
    },
    client_id: {
        type: String,
        required: true,
    },
    etat: {
        type: Number,
        required: true,
    },
});

const DepotModel = mongoose.model('Depot', depotSchema);

module.exports = DepotModel;