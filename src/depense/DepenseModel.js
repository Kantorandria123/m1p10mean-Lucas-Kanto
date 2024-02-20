const mongoose = require('mongoose');

const depenseSchema = new mongoose.Schema({
    description: {
        type: String,
        required: false,
    },
    montant: {
        type: String,
        required:false,
    },
    date: {
        type: String,
        required: false,
    },
    type: {
        type: String,
        required: false,
    }
});

const DepenseModel = mongoose.model('Depense', depenseSchema);

module.exports = DepenseModel;