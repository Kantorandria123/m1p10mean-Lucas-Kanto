var preferenceModel = require('./PreferenceModel');


module.exports.createPreference = (preferenceDetail) => {
    return new Promise(function myFn(resolve, reject) {
        var preferenceModelData = new preferenceModel();
        preferenceModelData.employe_id = preferenceDetail.employe_id;
        preferenceModelData.client_id = preferenceDetail.client_id;
 
        preferenceModelData.save()
             .then(result => {
                 resolve(true);
             })
             .catch(error => {
                 console.error('Save failed preference employe', error);
                 reject("Error creating preference");
             });
    });
 }
 