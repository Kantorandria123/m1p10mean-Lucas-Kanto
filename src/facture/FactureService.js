var factureModel = require('./FactureModel');

var createfactureService = (factureDetail) => {


   return new Promise(function myFn(resolve, reject) {

       var factureModelData = new factureModel();

       factureModelData.daty = factureDetail.daty;
       factureModelData.montanttotal = factureDetail.montanttotal;
       factureModelData.client_id = factureDetail.client_id;
       factureModelData.etat = 1;

       factureModelData.save()
            .then(result => {
                console.log('Save facture success'); 
                const insertedId = result._id;
                console.log('insertedId '+insertedId);
                resolve({ status: true, id: insertedId });
            })
            .catch(error => {
                console.error('Save facture failed', error);
                reject({ status: false, error: error });
            });
     
   });

}
const getListefacture = async (clientId, etat) => {
  try {
    const factures = await factureModel.find({ client_id: clientId, etat: etat });
    let totalPrix = 0;
    factures.forEach(facture => {
      totalPrix += facture.prix; 
    });

    console.log(factures);
    return { status: true, message: "Liste des facture récupérée avec succès", factures, totalPrix };
  } catch (error) {
    return { status: false, message: "Erreur lors de la récupération de la liste des facture" };
  }
};



  module.exports = {
    createfactureService,getListefacture
  };