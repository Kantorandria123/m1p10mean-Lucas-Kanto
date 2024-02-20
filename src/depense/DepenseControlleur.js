var depenseService = require('./DepenseService');

const creerDepenseControlleurFn = async (req, res) => {
    try {
        console.log(req.body);
        var result = await depenseService.createDepense(req.body, req);
        console.log(result);
        if(result) {
            res.send({ "status": true, "message": "Dépense créé avec succès", "id": result._id });
        } else {
            res.send({ "status": false, "message": "Erreur lors de la création du dépense" });
        }
    } catch (error) {
        console.log(error);
        res.send({ "status": false, "message": "Erreur lors de la création du dépense" });
    }
}

module.exports = {creerDepenseControlleurFn};