const employeModel = require('./EmployeModel');
var key = '123456789trytryrtyr';
var encryptor = require('simple-encryptor')(key);

const getListEmploye = async () => {
  try {
    const employes = await employeModel.find({});
    return { status: true, message: "Liste des employés récupérée avec succès", employes };
  } catch (error) {
    console.error(error);
    return { status: false, message: "Erreur lors de la récupération de la liste des employés" };
  }
};

const loginEmployeeDBService = (employeeDetails) => {
  return new Promise((resolve, reject) => {
    employeModel.findOne({ email: employeeDetails.email})
      .then(result => {
        if (result !== undefined && result !==null) {
          var decrypted = encryptor.decrypt(result.mdp);
          if (decrypted == employeeDetails.mdp) {
            now = getCurrentDateTime();
            newToken = encryptor.encrypt(now + decrypted);
            employeModel.findOneAndUpdate(
              {_id: result._id},
              {$set: { token: newToken }},
              {new: true}
            ).then(resulttoken => {
              employeModel.findOne(
                { email: resulttoken.email, token: resulttoken.token})
                .then(resultfinal=> {
                  resolve({
                    status: true,
                    message: "Employée validé avec succès!",
                    employes: resultfinal
                  });
                });
            });
          } else {
            reject({
              status: false,
              message: "Validation de l'employée échouée"
            });
          }
        } else {
          reject({
            status: false,
            message: "Details d'erreur de l' employée"
          });
        }
      })
      .catch(error => {
        reject({status: false, message: "Données invalides"});
      });
  });
}

const getEmployeeByToken = (employeeDetails) => {
  return new Promise((resolve, reject) => {
    employeModel.findOne({ email: employeeDetails.email,token: employeeDetails.token})
      .then(result => {
        resolve({
          status: true,
          message: "Employée trouver!",
          employes: result
        });
      })
      .catch(error => {
        reject({status: false, message: "Données invalides"});
      });
  });
}

const getEmployeeById = async (employeeId) => {
  try {
    const employes = await employeModel.findById(employeeId);
    if (!employes) {
      return { status: false, message: "Aucun employé trouvé avec cet identifiant" };
    }
    return { status: true, message: "Employé trouvé avec succès", employes };
  } catch (error) {
    console.error(error);
    return { status: false, message: "Erreur lors de la recherche de l'employé" };
  }
};

const updateEmployeeById = async (employeeId, updateData) => {
  try {
    const updatedEmployee = await employeModel.findByIdAndUpdate(employeeId, updateData, { new: true });
    if (!updatedEmployee) {
      return { status: false, message: "Aucun employé trouvé avec cet identifiant pour la mise à jour" };
    }
    return { status: true, message: "Employé mis à jour avec succès", updatedEmployee };
  } catch (error) {
    console.error(error);
    return { status: false, message: "Erreur lors de la mise à jour de l'employé" };
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
  getListEmploye,loginEmployeeDBService,getEmployeeByToken,getEmployeeById,updateEmployeeById
};
