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

const createService = async (services) => {
  return new Promise((resolve, reject) =>{
  var serviceData = new serviceModel();
  serviceData.nom = services.nom;
  serviceData.description = services.description;
  serviceData.image = services.image;
  serviceData.prix = services.prix;
  serviceData.duree = services.duree;
  serviceData.commission = services.commission;

  serviceData.save()
    .then(result => {
      console.log('Save successfull');

      const insertedId = result._id;
      console.log('insertId :' +insertedId);
      resolve({success: true, id: insertedId});
    })
    .catch(error => {
      console.error('Save failed', error);
      reject({success: false, error: error});
    });
  });
}

const updateServiceById = async (serviceId, updateData) => {
  try {
    const updateService = await serviceModel.findByIdAndUpdate(serviceId, updateData, { new: true});
    if (!updateService) {
      return { status: false, message: "Aucun service trouvé avec cet identifiant pour la mise à jour"}
    }
    return { status: true, message: "Service mis à jour avec succès",updateService};
  } catch (error) {
    console.error(error);
    return {status: false, message: "Erreur lors de la mise à jour du service"};
  }
};

const  deleteServiceById = async (serviceId) => {
  try {
    const deletedService = await serviceModel.findByIdAndDelete(serviceId);
    if(!deletedService) {
      return { status: false, message: "Aucun service trouvé avec cet identifiant pour la suppression" };
    }
    return {status: true, message: "Employé supprimé avec succès",deletedService};

  } catch (error) {
    console.error(error);
    return { status: false, message: "Erreur lors de la suppression du service" };
  }
}
  
  module.exports = { getListService,createService,updateServiceById,deleteServiceById};
  


