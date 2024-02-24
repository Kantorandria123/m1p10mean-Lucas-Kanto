var preferenceModel = require('./PreferenceModel');


const createPreference = (preferenceDetail) => {
  return new Promise(function(resolve, reject) {
      preferenceModel.findOne({
          employe_id: preferenceDetail.employe_id,
          client_id: preferenceDetail.client_id
      }).then(existingPreference => {
          if (existingPreference) {
              console.error('Preference already exists');
              reject('Preference already exists');
          } else {
              var preferenceModelData = new preferenceModel();
              preferenceModelData.employe_id = preferenceDetail.employe_id;
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
 const getMesPreferencesEmployes = async (clientId) => {
    try {
      console.log("clientId : "+clientId);
      const preferenceslist = await preferenceModel.aggregate([
        {
          $match: {
            client_id: clientId,
          }
        },
        {
          $addFields: {
            employe_id: { $toObjectId: "$employe_id" },
          }
        },
        {
          $lookup: {
            from: "employes",
            localField: "employe_id",
            foreignField: "_id",
            as: "employes_info"
          }
        },
        {
          $unwind: "$employes_info"
        },
        {
          $project: {
            "employes_info.nom": 1,
            "employes_info.email": 1,
            "employes_info.horaireTravail": 1,
            "employes_info.commission": 1,
            "employes_info.image": 1,
            _id: 1
          }
        }
      ]);
      console.log("preference.length : "+preferenceslist.length);
      return { status: true, message: "Liste des preferences-vous récupérée avec succès", preferenceslist };
    } catch (error) {
      console.error(error);
      return { status: false, message: "Erreur lors de la récupération de la liste des preferences par client" };
    }
  };
 module.exports = {
    getMesPreferencesEmployes,createPreference
  };
  