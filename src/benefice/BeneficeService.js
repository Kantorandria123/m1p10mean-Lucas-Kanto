var beneficeModel = require('./BeneficeModel');

const BeneficeParmois = async () => {
  try {
    const beneficeList = await beneficeModel.aggregate([
      {
        $lookup: {
            from: "depense_par_mois",
            localField: "moisint",
            foreignField: "moisint",
            as: "depenses"
        }
    },
    {
        $addFields: {
            "reste": {
                $subtract: ["$totalMontant", { $arrayElemAt: ["$depenses.totalMontant", 0] }]
            }
        }
    },
    {
        $project: {
            moisint: 1,
            mois: 1,
            benefice: { $cond: { if: { $gt: ["$reste", 0] }, then: "$reste", else: 0 } },
            perte: { $cond: { if: { $lt: ["$reste", 0] }, then: { $multiply: ["$reste", -1] }, else: 0 } }
        }
    }
    ]);
    return {status: true, message: "Liste des beneficeList récupérée avec succès", beneficeList};
  } catch (error) {
    console.error(error);
    return {status: false, message: "Erreur lors de la récupération de la liste des beneficeList"};
  }
};
  module.exports = {
    BeneficeParmois
  };