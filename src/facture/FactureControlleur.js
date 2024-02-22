var factureService = require('./FactureService');

var createfactureControllerFn = async (req, res) => 
{
    try
    {
    console.log(req.body);
    var status = await factureService.createfactureService(req.body);
    console.log(status);

    if (status) {
        res.send({ "status": true, "message": "facture created successfully" });
    } else {
        res.send({ "status": false, "message": "Error creating facture" });
    }
}
catch(err)
{
    console.log(err);
}
}
const getlistefactureControlleur = async (req, res) => {
    const clientId = req.params.clientId;
    const etat = req.params.etat;
    try {
      const result = await factureService.getListefacture(clientId,etat);
      if (result.status) {
        res.send({ status: true, message: result.message, factures: result.factures,totalPrix:result.totalPrix });
      } else {
        res.send({ status: false, message: result.message });
      }
    } catch (error) {
      console.error(error);
      res.send({ status: false, message: "Erreur lors de la récupération de la liste des factures" });
    }
  };
  const geChiffresAffairesParjourControllerFn = async (req, res) => {
    try {
      const result = await factureService.chiffresAffairesParjour();
      if (result.status) {
        res.send({ status: true, message: result.message, chiffreList: result.chiffreList });
      } else {
        res.send({ status: false, message: result.message });
      }
    } catch (error) {
      console.error(error);
      res.send({ status: false, message: "Erreur lors de la récupération de la liste des chiffreList" });
    }
  };
  const geChiffresAffairesParmoisControllerFn = async (req, res) => {
    try {
      const result = await factureService.chiffresAffairesParmois();
      if (result.status) {
        res.send({ status: true, message: result.message, chiffreList: result.chiffreList });
      } else {
        res.send({ status: false, message: result.message });
      }
    } catch (error) {
      console.error(error);
      res.send({ status: false, message: "Erreur lors de la récupération de la liste des chiffreList" });
    }
  };


module.exports = { createfactureControllerFn,getlistefactureControlleur,geChiffresAffairesParjourControllerFn,geChiffresAffairesParmoisControllerFn };