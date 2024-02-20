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

const getListeDepenseControlleur = async (req, res) => {
    try {
        const result = await depenseService.getListeDepense();
        if (result.status) {
            res.send({ status: true, message: result.message, depenses: result.depenses });
        } else {
            res.send({ status: false, message: result.message });
        }
    } catch (error) {
        console.error(error);
      res.send({ status: false, message: "Erreur lors de la récupération de la liste des depenses" });
    }
};

module.exports = {creerDepenseControlleurFn,getListeDepenseControlleur};