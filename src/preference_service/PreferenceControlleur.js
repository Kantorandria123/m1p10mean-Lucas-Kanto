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




module.exports = { createPreferenceControllerFn };