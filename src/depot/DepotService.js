const depotModel = require('./DepotModel');

const creerDepot = (depot) => {
    return new Promise((resolve, reject) => {
        var depotData = new depotModel();
        depotData.montant = this.montant;
        depotData.client_id = this.client_id;
        depotData.etat = 1;

        depotData.save()
            .then(result => {
                console.log('Save successful');
                const insertedId = result._id;
                resolve({ success: true, id: insertedId });
            })
            .catch(error => {
                console.error('Save failed', error);
                reject({ success: false, error: error });
            });
    });
}

module.exports = {creerDepot};