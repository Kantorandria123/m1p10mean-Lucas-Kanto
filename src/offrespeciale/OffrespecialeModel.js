const mongoose = require('mongoose');

const offrespecialeSchema = new mongoose.Schema({
    titre: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    datedebut: {
        type: String,
        required: true,
    },
    datefin: {
        type: String,
        required: true,
    },
    service_id: {
        type: String,
        required: true,
    },
});

const OffrespecialeModel = mongoose.model('Offrespeciale', offrespecialeSchema);

module.exports = OffrespecialeModel;