const managerModel = require('./ManagerModel');
var key = '123456789trytryrtyr';
var encryptor = require('simple-encryptor')(key);

const loginManagerDBService = (managerDetails) => {
    return new Promise((resolve, reject) => {
        managerModel.findOne({ email: managerDetails.email})
        .then(result => {
          if (result !== undefined && result !==null) {
            var decrypted = encryptor.decrypt(result.mdp);
            if (decrypted == managerDetails.mdp) {
              now = getCurrentDateTime();
              newToken = encryptor.encrypt(now + decrypted);
              managerModel.findOneAndUpdate(
                {_id: result._id},
                {$set: { token: newToken }},
                {new: true}
              ).then(resulttoken => {
                managerModel.findOne(
                  { email: resulttoken.email, token: resulttoken.token})
                  .then(resultfinal=> {
                    resolve({
                      status: true,
                      message: "Manager validé avec succès!",
                      managers: resultfinal
                    });
                  });
              });
            } else {
              reject({
                status: false,
                message: "Validation du manager échouée"
              });
            }
          } else {
            reject({
              status: false,
              message: "Details d'erreur du manager"
            });
          }
        })
        .catch(error => {
          reject({status: false, message: "Données invalides"});
        });
    });
  }

  function getCurrentDateTime() {
    const currentDateTime = new Date();
    const date = currentDateTime.toISOString().split('T')[0];
    const time = currentDateTime.toLocaleTimeString();
    const dateTimeString = `${date} ${time}`;
    return dateTimeString;
  }
  
   
  module.exports = {
    loginManagerDBService
  };