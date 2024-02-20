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
      resolveContent({success: true, id: insertedId});
    })
    .catch(error => {
      console.error('Save failed', error);
      reject({success: false, error: error});
    });
  });
}
  
  module.exports = { getListService,createService};
  


