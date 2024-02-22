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
    var result = await rendezvousService.creerRendezVous(req.body);
    if (result) {
      res.send({ "status": true, "message": "Rendezvous created successfully", "id": result.id });
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
    const etat = req.params.etat;
    
    if (!clientId) {
      return res.status(400).send({ status: false, message: "Paramètre clientId manquant dans la requête." });
    }

    const result = await rendezvousService.listeRendezvousByClient(clientId,etat);

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

const historiqueRendezvousByClientControllerFn = async (req, res) => {
  try {
    const clientId = req.params.clientId;
    if (!clientId) {
      return res.status(400).send({ status: false, message: "Paramètre clientId manquant dans la requête." });
    }

    const result = await rendezvousService.historiqueRendezvousByClient(clientId);

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

const listeRendezvousByEmployeeControllerFn = async (req, res) => {
  try {
    const employeeId = req.params.employeeId;

    if(!employeeId) {
      return res.status(400).send({status: false, message: "Paramètre employeeId manquant dans la requête."});
    }

    const result = await rendezvousService.listeRendezvousByEmployee(employeeId);

    if (result.status) {
      res.send({ status: true, message: result.message, rendezvousList: result.rendezvousList });
    } else {
      res.send({ status: false, message: result.message });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: false, message: "Erreur lors de la récupération de la liste des rendez-vous par employee" });
  }
};
const updateEtatRendezVousControllerFn = async (req, res) => {
  try {
    const rendezvousId = req.params.id;
    const newEtat = req.params.etat;
    console.log("rendezvousid : "+rendezvousId);
    console.log("newEtat : "+newEtat);
    if (!rendezvousId || !newEtat) {
      return res.status(400).send({ status: false, message: "Paramètres manquants dans la requête." });
    }

    const result = await rendezvousService.updateEtatRendezVousById(rendezvousId, newEtat);

    if (result.status) {
      res.send({ status: true, message: result.message, updatedRendezvous: result.updatedRendezvous });
    } else {
      res.send({ status: false, message: result.message });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: false, message: "Erreur lors de la mise à jour de l'état du rendez-vous" });
  }
};
const nombreReservationParjourControllerFn = async (req, res) => {
  try {
    const result = await rendezvousService.nombreResevationParjour();
    if (result.status) {
      res.send({ status: true, message: result.message, rendezvousList: result.rendezvousList });
    } else {
      res.send({ status: false, message: result.message });
    }
  } catch (error) {
    console.error(error);
    res.send({ status: false, message: "Erreur lors de la récupération de la liste des chiffreList" });
  }
};
const nombreReservationParmoisControllerFn = async (req, res) => {
  try {
    const result = await rendezvousService.nombreResevationParmois();
    if (result.status) {
      res.send({ status: true, message: result.message, rendezvousList: result.rendezvousList });
    } else {
      res.send({ status: false, message: result.message });
    }
  } catch (error) {
    console.error(error);
    res.send({ status: false, message: "Erreur lors de la récupération de la liste des chiffreList" });
  }
};
module.exports = {
  listeRendezvousControllerFn,
  creerRendevousControlleur,
  listeRendezvousByClientControllerFn,
  listeRendezvousNotifierControlleurFn,
  listeRendezvousByEmployeeControllerFn,
  updateEtatRendezVousControllerFn,
  historiqueRendezvousByClientControllerFn,
  nombreReservationParjourControllerFn,
  nombreReservationParmoisControllerFn
};
