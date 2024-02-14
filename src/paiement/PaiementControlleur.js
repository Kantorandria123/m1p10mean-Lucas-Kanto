var paiementService = require('./PaiementService');

var createPaiementControllerFn = async (req, res) => 
{
    try
    {
    console.log(req.body);
    var status = await paiementService.createPaiementService(req.body);
    console.log(status);

    if (status) {
        res.send({ "status": true, "message": "paiement created successfully" });
    } else {
        res.send({ "status": false, "message": "Error creating paiement" });
    }
}
catch(err)
{
    console.log(err);
}
}
const getlistePaiementControlleur = async (req, res) => {
    const clientId = req.params.clientId;
    const etat = req.params.etat;
    try {
      const result = await paiementService.getListePaiement(clientId,etat);
      if (result.status) {
        res.send({ status: true, message: result.message, paiements: result.paiements,totalPrix:result.totalPrix });
      } else {
        res.send({ status: false, message: result.message });
      }
    } catch (error) {
      console.error(error);
      res.send({ status: false, message: "Erreur lors de la récupération de la liste des paiements" });
    }
  };
  const updateEtatPaiementontrollerFn = async (req, res) => {
    try {
      const paiementId = req.params.id;
      const newEtat = req.params.etat;
      console.log("paiementId : "+paiementId);
      console.log("newEtat : "+newEtat);
      if (!paiementId || !newEtat) {
        return res.status(400).send({ status: false, message: "Paramètres manquants dans la requête." });
      }
  
      const result = await paiementService.updateEtatPaiementId(paiementId, newEtat);
  
      if (result.status) {
        res.send({ status: true, message: result.message, updatePaiement: result.updatePaiement });
      } else {
        res.send({ status: false, message: result.message });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ status: false, message: "Erreur lors de la mise à jour de l'état du rendez-vous" });
    }
  };


module.exports = { createPaiementControllerFn,getlistePaiementControlleur,updateEtatPaiementontrollerFn };