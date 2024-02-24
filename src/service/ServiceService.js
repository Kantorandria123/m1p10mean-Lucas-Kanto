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

  const createService = async (services, req) => {
    return new Promise((resolve, reject) => {
      const serviceData = new serviceModel();
      serviceData.nom = services.nom;
      serviceData.description = services.description;
      serviceData.prix = services.prix;
      serviceData.duree = services.duree;
      serviceData.commission = services.commission;
  
      if (req.file) {
        serviceData.image = req.protocol + '://' + req.get('host') + '/uploads/images/' + req.file.filename; 
    }
  
      serviceData.save()
        .then(result => {
          console.log('Save successful');
          const insertedId = result._id;
          console.log('insertId :' + insertedId);
          resolve({ success: true, id: insertedId });
        })
        .catch(error => {
          console.error('Save failed', error);
          reject({ success: false, error: error });
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

const getServiceById = async(serviceId) => {
  try {
    const services = await serviceModel.findById(serviceId);
    if(!services) {
      return { status: false, message: "Aucun service trouvé avec cet identifiant" };
    }
    return { status: true, message: "Service trouvé avec succès", services };
  } catch (error) {
    console.error(error);
    return { status: false, message: "Erreur lors de la recherche du service" };
  }
};
  
  module.exports = { getListService,createService,updateServiceById,deleteServiceById,getServiceById};
  


