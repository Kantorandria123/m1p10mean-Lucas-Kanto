var depenseModel = require('./DepenseModel');

const createDepense = async (depenses, req) => {
    return new Promise ((resolve, reject) => {
        const depenseData = new depenseModel();
        depenseData.description = depenses.description;
        depenseData.montant = depenses.montant;
        depenseData.date = depenses.date;
        depenseData.type = depenses.type;

        depenseData.save()
            .then(result => {
                console.log('Save successful');
                const insertedId = result._id;
                console.log('insertId :' + insertedId);
                resolve({success: true, id: insertedId});
            })
            .catch(error => {
                console.error('Save failed', error);
                reject({ success: false, error: error });
            });
    });
}

const getListeDepense = async () => {
    try {
        const depenses = await depenseModel.find({});
        return {status: true, message: "Liste des dépenses récupérée avec succès", depenses };
    } catch (error) {
        console.error(error);
        return {status: false, message: "Erreur lors de la récupération de la liste des dépenses"};
    }
};
const depensesParMois = async () => {
    try {
      const depenseList = await depenseModel.aggregate([
        {
            $project: {
              monthOfYear: {
                $let: {
                  vars: {
                    parts: { $split: ["$date", "-"] },
                    year: { $toInt: { $arrayElemAt: [{ $split: ["$date", "-"] }, 0] } },
                    month: { $toInt: { $arrayElemAt: [{ $split: ["$date", "-"] }, 1] } },
                    day: { $toInt: { $arrayElemAt: [{ $split: ["$date", "-"] }, 2] } }
                  },
                  in: { $month: { $dateFromParts: { year: "$$year", month: "$$month", day: "$$day" } } }
                }
              },
              montant: 1
            }
          },
          {
            $group: {
              _id: "$monthOfYear",
              totalMontant: { $sum: "$montant" }
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
      return {status: true, message: "Liste des depenseList récupérée avec succès", depenseList};
    } catch (error) {
      console.error(error);
      return {status: false, message: "Erreur lors de la récupération de la liste des chiffreList par tempsmoyen"};
    }
  };
module.exports = {createDepense,getListeDepense,depensesParMois};