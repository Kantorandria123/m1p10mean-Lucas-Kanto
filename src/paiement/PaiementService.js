var paiementModel = require('./PaiementModel');

var createPaiementService = (paiementDetail) => {


   return new Promise(function myFn(resolve, reject) {

       var paeiementModelData = new paiementModel();

       paeiementModelData.daty = paiementDetail.daty;
       paeiementModelData.prix = paiementDetail.prix;
       paeiementModelData.service = paiementDetail.service;
       paeiementModelData.rendezvous_id = paiementDetail.rendezvous_id;
       paeiementModelData.client_id = paiementDetail.client_id;
       paeiementModelData.etat = 1;

       paeiementModelData.save()
            .then(result => {
                console.log('Save paiement success'); 
                const insertedId = result._id;
                console.log('insertedId '+insertedId);
                resolve({ status: true, id: insertedId });
            })
            .catch(error => {
                console.error('Save paiement failed', error);
                reject({ status: false, error: error });
            });
     
   });

}
const getListePaiement = async (clientId, etat) => {
  try {
    const paiements = await paiementModel.find({ client_id: clientId, etat: etat });
    let totalPrix = 0;
    paiements.forEach(paiement => {
      totalPrix += paiement.prix; 
    });

    console.log(paiements);
    return { status: true, message: "Liste des Paiement récupérée avec succès", paiements, totalPrix };
  } catch (error) {
    return { status: false, message: "Erreur lors de la récupération de la liste des Paiement" };
  }
};

  const updateEtatPaiementId = async (id, newEtat) => {
    try {
      const newEtatInt=parseInt(newEtat);
      const updatePaiement = await paiementModel.findByIdAndUpdate(
        id,
        { $set: { etat: newEtatInt } },
        { new: true }
      );
  
      if (!updatePaiement) {
        return { status: false, message: "PAIEMENT introuvable" };
      }
  
      return { status: true, message: "État du PAIEMENT mis à jour avec succès", updatePaiement };
    } catch (error) {
      console.error(error);
      return { status: false, message: "Erreur lors de la mise à jour de l'état du PAIEMENT" };
    }
  };

  module.exports = {
    createPaiementService,getListePaiement,updateEtatPaiementId
  };