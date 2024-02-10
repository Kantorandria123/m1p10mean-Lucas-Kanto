const rendezvousService = require('./RendezvousService');

const listeRendezvousControllerFn = async (req, res) => {
  try {
    const result = await rendezvousService.getListRendezvous();
    if (result.status) {
      res.send({ status: true, message: result.message, rendezvousList: result.rendezvousList });
    } else {
      res.send({ status: false, message: result.message });
    }
  } catch (error) {
    console.error(error);
    res.send({ status: false, message: "Erreur lors de la récupération de la liste des rendez-vous" });
  }
};

const creerRendevousControlleur = async (req, res) => {
  try {
    console.log(req.body);
    var result = await rendezvousService.creerRendezVous(req.body);
    console.log(result);
    if (result) {
      res.send({ "status": true, "message": "Rendezvous created successfully", "id": result._id });
    } else {
      res.send({ "status": false, "message": "Error creating rendezvous" });
    }
  } catch (err) {
    console.log(err);
    res.send({ "status": false, "message": "Error creating rendezvous" });
  }
};

const listeRendezvousByClientControllerFn = async (req, res) => {
  try {
    const clientId = req.params.clientId;
    
    if (!clientId) {
      return res.status(400).send({ status: false, message: "Paramètre clientId manquant dans la requête." });
    }

    const result = await rendezvousService.listeRendezvousByClient(clientId);

    if (result.status) {
      res.send({ status: true, message: result.message, rendezvousList: result.rendezvousList });
    } else {
      res.send({ status: false, message: result.message });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: false, message: "Erreur lors de la récupération de la liste des rendez-vous par client" });
  }
};


const listeRendezvousNotifierControlleurFn = async (req, res) => {
  try {
    const clientId = req.params.clientId;
    
    if (!clientId) {
      return res.status(400).send({ status: false, message: "Paramètre clientId manquant dans la requête." });
    }

    const result = await rendezvousService.listeRendezvousNotifier(clientId);

    if (result.status) {
      res.send({ status: true, message: result.message, rendezvousList: result.rendezvousList });
    } else {
      res.send({ status: false, message: result.message });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: false, message: "Erreur lors de la récupération de la liste des rendez-vous par client" });
  }
};

module.exports = {
  listeRendezvousControllerFn,
  creerRendevousControlleur,
  listeRendezvousByClientControllerFn,
  listeRendezvousNotifierControlleurFn
};
