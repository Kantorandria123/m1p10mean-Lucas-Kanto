const managerModel = require('./ManagerModel');
var key = '123456789trytryrtyr';
var encryptor = require('simple-encryptor')(key);

const getListManager = async () => {
  try {
    const managers = await managerModel.find({});
    return { status: true, message: "Liste des Managerés récupérée avec succès", managers };
  } catch (error) {
    console.error(error);
    return { status: false, message: "Erreur lors de la récupération de la liste des Managerés" };
  }
};

const loginManagereDBService = (managereDetails) => {
  return new Promise((resolve, reject) => {
    managerModel.findOne({ email: managereDetails.email})
      .then(result => {
        if (result !== undefined && result !==null) {
          var decrypted = encryptor.decrypt(result.mdp);
          if (decrypted == managereDetails.mdp) {
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
                    message: "Managerée validé avec succès!",
                    managers: resultfinal
                  });
                });
            });
          } else {
            reject({
              status: false,
              message: "Validation de l'Managerée échouée"
            });
          }
        } else {
          reject({
            status: false,
            message: "Details d'erreur de l' Managerée"
          });
        }
      })
      .catch(error => {
        reject({status: false, message: "Données invalides"});
      });
  });
}

const getManagereByToken = (managerDetails) => {
  return new Promise((resolve, reject) => {
    managerModel.findOne({ email: managerDetails.email,token: managerDetails.token})
      .then(result => {
        resolve({
          status: true,
          message: "Managerée trouver!",
          managers: result
        });
      })
      .catch(error => {
        reject({status: false, message: "Données invalides"});
      });
  });
}

const getManagereById = async (managereId) => {
  try {
    const managers = await managerModel.findById(managereId);
    if (!managers) {
      return { status: false, message: "Aucun Manageré trouvé avec cet identifiant" };
    }
    return { status: true, message: "Manageré trouvé avec succès", managers };
  } catch (error) {
    console.error(error);
    return { status: false, message: "Erreur lors de la recherche de l'Manageré" };
  }
};



function getCurrentDateTime() {
  const currentDateTime = new Date();
  const date = currentDateTime.toISOString().split('T')[0];
  const time = currentDateTime.toLocaleTimeString();
  const dateTimeString = `${date} ${time}`;
  return dateTimeString;
}

 
module.exports = {
  loginManagereDBService,getManagereByToken,getManagereById,getListManager
};
