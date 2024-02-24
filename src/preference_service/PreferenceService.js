var preferenceModel = require('./PreferenceModel');


const createPreference = (preferenceDetail) => {
  return new Promise(function(resolve, reject) {
      preferenceModel.findOne({
          service_id: preferenceDetail.service_id,
          client_id: preferenceDetail.client_id
      }).then(existingPreference => {
          if (existingPreference) {
              console.error('Preference already exists');
              reject('Preference already exists');
          } else {
              var preferenceModelData = new preferenceModel();
              preferenceModelData.service_id = preferenceDetail.service_id;
              preferenceModelData.client_id = preferenceDetail.client_id;

              preferenceModelData.save()
                  .then(result => {
                      console.log('Preference created successfully');
                      resolve(true);
                  })
                  .catch(error => {
                      console.error('Save failed preference', error);
                      reject("Error creating preference");
                  });
          }
      }).catch(error => {
          console.error('Error checking existing preference', error);
          reject('Error checking existing preference');
      });
  });
}

 const getMesPreferencesServices = async (clientId) => {
    try {
      const preferenceslist = await preferenceModel.aggregate([
        {
          $match: {
            client_id: clientId,
          }
        },
        {
          $addFields: {
            service_id: { $toObjectId: "$service_id" },
          }
        },
        {
          $lookup: {
            from: "services",
            localField: "service_id",
            foreignField: "_id",
            as: "service_info"
          }
        },
        {
          $unwind: "$service_info"
        },
        {
          $project: {
            "service_info.nom": 1,
            "service_info.duree": 1,
            "service_info.prix": 1,
            "service_info.commission": 1,
            "service_info.image": 1,
            _id: 1
          }
        }
      ]);
      console.log("preference.length : "+preferenceslist);
      return { status: true, message: "Liste des preferences-vous récupérée avec succès", preferenceslist };
    } catch (error) {
      console.error(error);
      return { status: false, message: "Erreur lors de la récupération de la liste des preferences par client" };
    }
  };
  module.exports = {
    getMesPreferencesServices,createPreference
  };
  