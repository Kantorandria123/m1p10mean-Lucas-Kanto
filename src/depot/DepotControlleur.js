const depotService = require('./DepotService');

const creerDepotControllerFn = async (req, res) => {
    try {
        console.log(req.body);
        var result = await depotService.creerDepot(req.body);
        console.log(result);
        if(result) {
            res.send({ "status": true, "message": "dépôt created successfully", "id": result._id });
        } else {
            res.send({ "status": false, "message": "Error creating dépôt" });
        }
    } catch (err) {
        console.log(err);
        res.send({ "status": false, "message": "Error creating dépôt" });
    }
};

const getlistedepotControllerFn = async (req, res) => {
    try {
       
        const result = await depotService.getListedepot();

        if(result.status) {
            res.send({ status: true, message: result.message, depotList: result.depotList });
        } else {
            res.send({ status: false, message: result.message });
        }
    } catch (error) {
        console.error(error);
    res.send({ status: false, message: "Erreur lors de la récupération de la liste des dépôt" });
    }
};


const updatedDepotControllerFn = async (req, res) => {
    try {
        const depotId = req.params.id;
        const newEtat = req.params.etat;
        console.log("depotid :"+depotId);
        console.log("newEtat :"+newEtat);
        if(!depotId || !newEtat) {
            return res.status(400).send({ status: false, message: "Paramètres manquants dans la requête." });
        }

        const result = await depotService.updateEtatDepotById(depotId, newEtat);

        if(result.status) {
            res.send({ status: true, message: result.message, updatedDepot: result.updatedDepot });

        } else {
            res.send({ status: false, message: result.message });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: false, message: "Erreur lors de la mise à jour de l'état du dépôt" });
    }
}


module.exports = {creerDepotControllerFn,getlistedepotControllerFn,updatedDepotControllerFn};