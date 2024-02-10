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

const createEmployeeDBService = (employeeDetails) => {


  return new Promise(function myFn(resolve, reject) {

      var employeeModelData = new employeModel();

      employeeModelData.nom = employeeDetails.nom;
      employeeModelData.email = employeeDetails.email;
      employeeModelData.mdp = employeeDetails.mdp;
      var encrypted = encryptor.encrypt(employeeDetails.mdp);
      employeeModelData.mdp = encrypted;
      employeeModelData.image = employeeDetails.image;
      employeeModelData.horaireTravail = employeeDetails.horaireTravail;
      employeeModelData.role_id = employeeDetails.role_id;
      employeeModelData.token = employeeDetails.token;
     

      employeeModelData.save()
           .then(result => {
               console.log('Save successful');
               
               const insertedId = result._id;
               console.log('insertedId '+insertedId);
               resolve({ status: true, id: insertedId });
           })
           .catch(error => {
               console.error('Save failed', error);
               reject({ status: false, error: error });
           });
    
  });

}



const loginEmployeeDBService = (employeeDetails) => {
  return new Promise((resolve, reject) => {
    employeModel.findOne({ email: employeeDetails.email })
      .then(result => {
        if (result !== undefined && result !== null) {
          var decrypted = encryptor.decrypt(result.mdp);
          if (decrypted == employeeDetails.mdp) {
            now = getCurrentDateTime();
            newToken = encryptor.encrypt(now + decrypted);
            employeModel.findOneAndUpdate(
              { _id: result._id },
              { $set: { token: newToken } },
              { new: true }
            ).then(resulttoken => {
              employeModel.findOne(
                 { email: resulttoken.email,token:resulttoken.token,role_id: resulttoken.role_id })
                 .then(resultfinal=> {
                    resolve({
                       status: true,
                       message: "employee validé avec succès!",
                       employee: resultfinal
                     });
                 });
            });
          } else {
            reject({
              status: false,
              message: "Validation de l'employee échouée"
            });
          }
        } else {
          reject({
            status: false,
            message: "Détails d'erreur de l'employee"
          });
        }
      })
      .catch(error => {
        reject({ status: false, message: "Données invalides" });
      });
  });
}

const getEmployeeByToken = (employeeDetails) => {
  return new Promise((resolve, reject) => {
    employeModel.findOne({ email: employeeDetails.email,token:employeeDetails.token,role_id: employeeDetails.role_id})
      .then(result => {
        console.log("email : " + employeeDetails.email);
        console.log("token : " + employeeDetails.token);
        console.log("result "+result);
        resolve({
           status: true,
           message: "employee trouver!",
           employee: result
         });
      })

      .catch(error => {
        reject({ status: false, message: "Données invalides" });
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
  getListEmploye,
  createEmployeeDBService,
  loginEmployeeDBService,
  getEmployeeByToken
};
