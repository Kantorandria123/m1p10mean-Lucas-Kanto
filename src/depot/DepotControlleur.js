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

module.exports = {creerDepotControllerFn};