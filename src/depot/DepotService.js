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

const getListedepot = async () => {
    try {
        const depotList = await depotModel.find({etat: 1});
        if (!depotList) {
            return { status: false, message: "Aucun dépôt actif trouvé" };
        }
        return {
            status: true,
            message: "Liste des dépôts actifs récupérée avec succès",
            depotList,
        };
    } catch (error) {
        console.error(error);
        return { status: false, message: "Erreur lors de la récupération de la liste des dépôts" };
    }
}

module.exports = {creerDepot,getListedepot};