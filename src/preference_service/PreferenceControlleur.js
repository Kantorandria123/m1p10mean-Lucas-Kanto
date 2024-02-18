var preferenceService = require('./PreferenceService');

var createPreferenceControllerFn = async (req, res) => {
    try {
        var status = await preferenceService.createPreference(req.body);
        console.log("**********************************status : " + status);

        if (status) {
            res.send({ "status": true, "message": "Preference service created successfully" });
        } else {
            res.send({ "status": false, "message": "Error creating preference" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ "status": false, "message": "Erreur de creation preference" });
    }
}


const listePreferenceControllerFn = async (req, res) => {
    try {
      const clientId = req.params.client_id;
      if(!clientId) {
        return res.status(400).send({status: false, message: "Paramètre clientId manquant dans la requête."});
      }
      const result = await preferenceService.getMesPreferencesServices(clientId);
      if (result.status) {
        res.send({ status: true, message: result.message, preferenceslist: result.preferenceslist });
      } else {
        res.send({ status: false, message: result.message });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ status: false, message: "Erreur lors de la récupération de la liste des services par service" });
    }
  };

module.exports = { createPreferenceControllerFn,listePreferenceControllerFn };