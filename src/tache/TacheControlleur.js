const tacheService = require('./TacheService');

const getlistetacheControllerFn = async (req, res) => {
  try {
    const result = await tacheService.getListtache();
    if (result.status) {
      res.send({ status: true, message: result.message, tacheList: result.tacheList });
    } else {
      res.send({ status: false, message: result.message });
    }
  } catch (error) {
    console.error(error);
    res.send({ status: false, message: "Erreur lors de la récupération de la liste des tache" });
  }
};

const creerTacheControlleur = async (req, res) => {
  try {
    console.log(req.body);
    var result = await tacheService.creertache(req.body);
    console.log(result);
    if (result) {
      res.send({ "status": true, "message": "tache created successfully", "id": result._id });
    } else {
      res.send({ "status": false, "message": "Error creating tache" });
    }
  } catch (err) {
    console.log(err);
    res.send({ "status": false, "message": "Error creating tache" });
  }
};

const listetacheControllerFn = async (req, res) => {
  try {
    const employeid = req.params.employeid;
    const etat = req.params.etat;
    
    if (!employeid) {
      return res.status(400).send({ status: false, message: "Paramètre employeid manquant dans la requête." });
    }

    const result = await tacheService.listetaches(employeid,etat);

    if (result.status) {
      res.send({ status: true, message: result.message, tacheList: result.tacheList });
    } else {
      res.send({ status: false, message: result.message });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: false, message: "Erreur lors de la récupération de la liste des tache par client" });
  }
};


module.exports = {
  getlistetacheControllerFn,
  creerTacheControlleur,
  listetacheControllerFn
};
