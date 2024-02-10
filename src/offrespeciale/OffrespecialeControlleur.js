const OffrespecialeService = require('./OffrespecialeService');

const listeOffrespecialControlleur = async (req, res) => {
    try {
        const result = await OffrespecialeService.getListOffrespecial();
        if (result.status) {
            res.send({status: true, message: result.message, offrespecialList: result.offrespecialList});

        } else {
            res.send({status: false, message: result.message});
        }
    } catch (error) {
        console.error(error);
        res.send({status: false, message:"Erreur lors de la récupération de la liste des offres spécial"} );
    }
};

const creerOffrespecialControlleur = async (req, res) => {
    try{
        console.log(req.body);
        var result = await OffrespecialeService.creerOffrespecial(req.body);
        console.log(result);
        if(result) {
            res.send({ "status": true, "message": "Offre spécial created successfully", "id": result._id});
        } else {
            res.send({ "status": false, "message": "Error creating offre spécial"});
        }
    } catch (err) {
        console.log(err);
        res.send({ "status": false, "message": "Error creating offre spécial"});
    }
};

module.exports = {
    listeOffrespecialControlleur,creerOffrespecialControlleur
}