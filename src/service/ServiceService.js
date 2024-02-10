var serviceModel = require('./ServiceModel');

const getListService = async () => {
    try {
      const services = await serviceModel.find({});
      return { status: true, message: "Liste des services récupérée avec succès", services };
    } catch (error) {
      console.error(error);
      return { status: false, message: "Erreur lors de la récupération de la liste des services" };
    }
  };
  
  module.exports = { getListService};
  


