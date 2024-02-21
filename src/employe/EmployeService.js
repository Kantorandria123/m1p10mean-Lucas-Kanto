const employeModel = require('./EmployeModel');
var key = '123456789trytryrtyr';
var encryptor = require('simple-encryptor')(key);

const createEmployeDBService = (employeDetails) => {


  return new Promise(function myFn(resolve, reject) {

      var employeModelData = new employeModel();
      employeModelData.nom = employeDetails.nom;
      employeModelData.email = employeDetails.email;
      employeModelData.horaireTravail = employeDetails.horaireTravail;
      employeModelData.heuredebut = employeDetails.heuredebut;
      employeModelData.heureFin = employeDetails.heureFin;
      employeModelData.nbJourTravailSemaine = employeDetails.nbJourTravailSemaine;
      employeModelData.nbJourTravailMois = employeDetails.nbJourTravailMois;
      employeModelData.image = employeDetails.image;
      if (employeDetails.mdp !== undefined && employeDetails.mdp !== null) {
          var encrypted = encryptor.encrypt(employeDetails.mdp);
          employeModelData.mdp = encrypted;
      }
      
     

     employeModelData.save()
           .then(result => {
               console.log('Save successful');
               
               const insertedId = result._id;
               resolve({ status: true, id: insertedId });
           })
           .catch(error => {
               console.error('Save failed', error);
               reject({ status: false, error: error });
           });
    
  });

}

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

const deleteEmployeById = async (employeeId) => {
  try {
    const deletedEmployee = await employeModel.findByIdAndDelete(employeeId);
    if (!deletedEmployee) {
      return { status: false, message: "Aucun employé trouvé avec cet identifiant pour la suppression" };
    }
    return { status: true, message: "Employé supprimé avec succès", deletedEmployee };
  } catch (error) {
    console.error(error);
    return { status: false, message: "Erreur lors de la suppression de l'employé" };
  }
};
const getTempsMoyenTravailEmployes = async () => {
  try {
    const employeList = await employeModel.aggregate([
      {
        $project: {
          _id:1,
          nom: 1,
          email:1,
          heures_travail_total: { $subtract: ["$heureFin", "$heuredebut"] },
          nbJourTravailSemaine: 1,
          nbJourTravailMois: 1
        }
      },
      {
        $addFields: {
          temps_travail_moyen_par_jour: { $divide: ["$heures_travail_total", 1] },
          temps_travail_moyen_par_semaine: { $divide: [ { $multiply: ["$heures_travail_total", "$nbJourTravailSemaine"] }, 1 ] },
          temps_travail_moyen_par_mois:{ $divide: [ { $multiply: ["$heures_travail_total", "$nbJourTravailMois"] }, 1 ] }
        }
      }
    ]);
    return {status: true, message: "Liste des tempsmoyen employe récupérée avec succès", employeList};
  } catch (error) {
    console.error(error);
    return {status: false, message: "Erreur lors de la récupération de la liste des employelist par tempsmoyen"};
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
  getListEmploye,loginEmployeeDBService,getEmployeeByToken,getEmployeeById,updateEmployeeById,createEmployeDBService,deleteEmployeById,getTempsMoyenTravailEmployes
};
