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
  
  module.exports = { getListServiceControlleur };
  