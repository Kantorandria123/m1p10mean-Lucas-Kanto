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

const chiffresAffairesParjour = async () => {
  try {
    const chiffreList = await factureModel.aggregate([
      {
        $project: {
            dayOfWeek: {
                $let: {
                    vars: {
                        parts: { $split: ["$daty", "-"] },
                        year: { $toInt: { $arrayElemAt: [{ $split: ["$daty", "-"] }, 0] } },
                        month: { $toInt: { $arrayElemAt: [{ $split: ["$daty", "-"] }, 1] } },
                        day: { $toInt: { $arrayElemAt: [{ $split: ["$daty", "-"] }, 2] } }
                    },
                    in: { $dayOfWeek: { $dateFromParts: { year: "$$year", month: "$$month", day: "$$day" } } }
                }
            },
            montanttotal: 1
        }
    },
    {
        $group: {
            _id: "$dayOfWeek",
            totalMontant: { $sum: "$montanttotal" }
        }
    },
    	 {
	    $sort: {_id: 1 } // Tri par moisint croissant
	 },
    {
        $project: {
             dayint:"$_id",
            _id: 0,
            jourSemaine: {
                $switch: {
                    branches: [
                        { case: { $eq: ["$_id", 1] }, then: "Dimanche" },
                        { case: { $eq: ["$_id", 2] }, then: "Lundi" },
                        { case: { $eq: ["$_id", 3] }, then: "Mardi" },
                        { case: { $eq: ["$_id", 4] }, then: "Mercredi" },
                        { case: { $eq: ["$_id", 5] }, then: "Jeudi" },
                        { case: { $eq: ["$_id", 6] }, then: "Vendredi" },
                        { case: { $eq: ["$_id", 7] }, then: "Samedi" }
                    ],
                    default: "Jour invalide"
                }
            },
            totalMontant: 1
        }
    }
    ]);
    return {status: true, message: "Liste des chiffreList récupérée avec succès", chiffreList};
  } catch (error) {
    console.error(error);
    return {status: false, message: "Erreur lors de la récupération de la liste des chiffreList par tempsmoyen"};
  }
};
const chiffresAffairesParmois = async () => {
  try {
    const chiffreList = await factureModel.aggregate([
      {
        $project: {
          monthOfYear: {
            $let: {
              vars: {
                parts: { $split: ["$daty", "-"] },
                year: { $toInt: { $arrayElemAt: [{ $split: ["$daty", "-"] }, 0] } },
                month: { $toInt: { $arrayElemAt: [{ $split: ["$daty", "-"] }, 1] } },
                day: { $toInt: { $arrayElemAt: [{ $split: ["$daty", "-"] }, 2] } }
              },
              in: { $month: { $dateFromParts: { year: "$$year", month: "$$month", day: "$$day" } } }
            }
          },
          montanttotal: 1
        }
      },
      {
        $group: {
          _id: "$monthOfYear",
          totalMontant: { $sum: "$montanttotal" }
        }
      },
      {
        $sort: {_id: 1 } // Tri par moisint croissant
      },
      {
        $project: {
           moisint:"$_id",
          _id: 0,
          mois: {
            $switch: {
              branches: [
                { case: { $eq: ["$_id", 1] }, then: "Janvier" },
                { case: { $eq: ["$_id", 2] }, then: "Février" },
                { case: { $eq: ["$_id", 3] }, then: "Mars" },
                { case: { $eq: ["$_id", 4] }, then: "Avril" },
                { case: { $eq: ["$_id", 5] }, then: "Mai" },
                { case: { $eq: ["$_id", 6] }, then: "Juin" },
                { case: { $eq: ["$_id", 7] }, then: "Juillet" },
                { case: { $eq: ["$_id", 8] }, then: "Août" },
                { case: { $eq: ["$_id", 9] }, then: "Septembre" },
                { case: { $eq: ["$_id", 10] }, then: "Octobre" },
                { case: { $eq: ["$_id", 11] }, then: "Novembre" },
                { case: { $eq: ["$_id", 12] }, then: "Décembre" }
              ],
              default: "Mois invalide"
            }
          },
          totalMontant: 1
        }
      }
    ]);
    return {status: true, message: "Liste des chiffreList récupérée avec succès", chiffreList};
  } catch (error) {
    console.error(error);
    return {status: false, message: "Erreur lors de la récupération de la liste des chiffreList par tempsmoyen"};
  }
};
  module.exports = {
    createfactureService,getListefacture,chiffresAffairesParjour,chiffresAffairesParmois
  };