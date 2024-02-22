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


module.exports = {creerDepotControllerFn,getlistedepotControllerFn};