var beneficeModel = require('./BeneficeModel');
var factureService = require('./../facture/FactureService');
var depenseService = require('./../depense/DepenseService');

const BeneficeParmois = async () => {
  try {
    const chiffreList = (await factureService.chiffresAffairesParmois()).chiffreList;
    const depenseList = (await depenseService.depensesParMois()).depenseList;
    const beneficeList = [];
    if(chiffreList.length !== depenseList.length) {
      throw new Error("Les listes de chiffres d'affaires et de dépenses n'ont pas la même taille.");
    }
    for(let i = 0; i < chiffreList.length; i++) {
      const benefice = {
        benefice: chiffreList[i].totalMontant - depenseList[i].totalMontant,
        moisint: chiffreList[i].moisint,
        mois: chiffreList[i].mois
      };
      beneficeList.push(benefice);
    }
    
    return {status: true, message: "Liste des bénéfices récupérée avec succès", beneficeList};
  } catch (error) {
    console.error(error);
    return {status: false, message: "Erreur lors de la récupération de la liste des bénéfices"};
  }
};

  module.exports = {
    BeneficeParmois
  };