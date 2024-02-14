var paiementModel = require('./PaiementModel');

module.exports.createPaiementSercvice = (paiementDetail) => {


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
  const getListePaiement = async (clientId,etat) => {
    try {
      console.log("clientID : "+clientId);
      console.log("etat : "+etat);
      const paiements = await paiementModel.find({client_id:clientId,etat:etat});
      console.log(paiements);
      return { status: true, message: "Liste des Paiement récupérée avec succès", paiements };
    } catch (error) {
      console.error(error);
      return { status: false, message: "Erreur lors de la récupération de la liste des Paiement" };
    }
  };

  module.exports = {
    getListePaiement
  };