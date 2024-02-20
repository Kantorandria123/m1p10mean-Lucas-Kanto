var serviceService = require('./ServiceService');

const getListServiceControlleur = async (req, res) => {
    try {
      const result = await serviceService.getListService();
      if (result.status) {
        res.send({ status: true, message: result.message, services: result.services });
      } else {
        res.send({ status: false, message: result.message });
      }
    } catch (error) {
      console.error(error);
      res.send({ status: false, message: "Erreur lors de la récupération de la liste des services" });
    }
  };

const creerServiceController = async (req, res) => {
  try{
    console.log(req.body);
    var result = await serviceService.createService(req.body);
    console.log(result);
    if(result) {
      res.send({ "status": true, "message": "Service créer avec succès", "id": result._id});
    } else {
      res.send({ "status": false, "message": "Error creating service"});
    }
  } catch (err) {
    console.log(err);
    res.send({"status": false, "message": "Error creating service"});
  }
}
  
  module.exports = { getListServiceControlleur,creerServiceController };
  