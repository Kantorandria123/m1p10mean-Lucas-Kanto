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
    try {
      console.log(req.body);
      var result = await serviceService.createService(req.body, req); // Pass req as a parameter
      if (result) {
        res.send({ "status": true, "message": "Service créé avec succès", "id": result._id });
      } else {
        res.send({ "status": false, "message": "Erreur lors de la création du service" });
      }
    } catch (err) {
      console.log(err);
      res.send({ "status": false, "message": "Erreur lors de la création du service" });
    }
  }
  

const updateServiceControllerFn = async (req, res) => {
  try {
    const serviceId = req.params.serviceId;
    const newData = req.body;

    const result = await serviceService.updateServiceById(serviceId, newData);
    if (result.status) {
      res.send({status: true, message: result.message,updateService: result.updateService});
    } else {
      res.send({ status: false, message: result.message });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({status: false, message: "Erreur lors de la mise à jour du service par ID"})
  }
}

const deleteServiceByIdControllerFn = async (req, res) => {
  try {
    const serviceId = req.params.id;
    const result = await serviceService.deleteServiceById(serviceId);

    if(result.status) {
      res.send({ status: true, message: result.message, deletedService: result.deletedService});
    } else {
      res.send({ status: false, message: result.message });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: false, message: "Erreur lors de la suppression du service par ID" });
  }
}

const serviceByIdControllerFn = async (req, res) => {
  try {
    const serviceId = req.params.serviceId;
    console.log("serviceId:" +serviceId);
    const result = await serviceService.getServiceById(serviceId);

    if(result.status) {
      res.send({ status: true, message: result.message, services: result.services});
    } else {
      res.send({ status: false, message: result.message });
    }
  } catch(error) {
    console.error(error);
    res.status(500).send({ status: false, message: "Erreur lors de la récupération de la liste des services par id" });
  }
}
  module.exports = { getListServiceControlleur,creerServiceController,updateServiceControllerFn,deleteServiceByIdControllerFn,serviceByIdControllerFn };
  