var paiementService = require('./PaiementService');

var createPaiementControllerFn = async (req, res) => 
{
    try
    {
    console.log(req.body);
    var status = await paiementService.createPaiementSercvice(req.body);
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
        res.send({ status: true, message: result.message, paiements: result.paiements });
      } else {
        res.send({ status: false, message: result.message });
      }
    } catch (error) {
      console.error(error);
      res.send({ status: false, message: "Erreur lors de la récupération de la liste des paiements" });
    }
  };



module.exports = { createPaiementControllerFn,getlistePaiementControlleur };