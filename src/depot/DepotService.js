const clientModel = require('../client/ClientModel');
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

const updateEtatDepotById = async (id,newEtat) => {
    try {
        const newEtatInt=parseInt(newEtat);
        const updatedDepot = await depotModel.findByIdAndUpdate (
            id,
            { $set: { etat: newEtatInt } },
            { new: true }
        );

        if(!updatedDepot) {
            return { status: false, message: "Dépôt introuvable" };
        }
        return { status: true, message: "État du dépôt mis à jour avec succès", updatedDepot };
    } catch (error) {
        console.error(error);
        return { status: false, message: "Erreur lors de la mise à jour de l'état du dépôt" };
    }
}

const updateDepotArgentByClientId = async (clientDetails) => {
    try {
        const id = clientDetails._id;
        const newArgent = Number(clientDetails.argent);
      
        
        const updateArgent = await clientModel.findByIdAndUpdate(
            id,
            { $inc: { argent: +newArgent } },
            { new: true }
        );

        if(!updateArgent) {
            return { status: false, message: "Dépot ARGENT introuvable" };
        }
        return { status: true, message: "État du dépôt ARGENT mis à jour avec succès", updateArgent };
    } catch (error) {
        console.error(error);
        return { status: false, message: "Erreur lors de la mise à jour de l'état du dépot ARGENT" };
      }
}

module.exports = {creerDepot,getListedepot,updateEtatDepotById,updateDepotArgentByClientId};