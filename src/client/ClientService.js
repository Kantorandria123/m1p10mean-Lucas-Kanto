var clientModel = require('./ClientModel');
var key = '123456789trytryrtyr';
var encryptor = require('simple-encryptor')(key);

module.exports.createClientDBService = (clientDetails) => {


   return new Promise(function myFn(resolve, reject) {

       var clientModelData = new clientModel();

       clientModelData.nom = clientDetails.nom;
       clientModelData.email = clientDetails.email;
       clientModelData.phone = clientDetails.phone;
       clientModelData.mdp = clientDetails.mdp;
       var encrypted = encryptor.encrypt(clientDetails.mdp);
       clientModelData.mdp = encrypted;
       clientModelData.argent = clientDetails.argent;
       clientModelData.token = clientDetails.token;
      

      clientModelData.save()
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

module.exports.loginUserDBService = (clientDetails) => {
   return new Promise((resolve, reject) => {
     clientModel.findOne({ email: clientDetails.email })
       .then(result => {
         if (result !== undefined && result !== null) {
           var decrypted = encryptor.decrypt(result.mdp);
           if (decrypted == clientDetails.mdp) {
             now = getCurrentDateTime();
             newToken = encryptor.encrypt(now + decrypted);
             clientModel.findOneAndUpdate(
               { _id: result._id },
               { $set: { token: newToken } },
               { new: true }
             ).then(resulttoken => {
               clientModel.findOne(
                  { email: resulttoken.email,token:resulttoken.token })
                  .then(resultfinal=> {
                     resolve({
                        status: true,
                        message: "client validé avec succès!",
                        client: resultfinal
                      });
                  });
             });
           } else {
             reject({
               status: false,
               message: "Validation de client échouée"
             });
           }
         } else {
           reject({
             status: false,
             message: "Détails d'erreur de client"
           });
         }
       })
       .catch(error => {
         reject({ status: false, message: "Données invalides" });
       });
   });
 }
 
 module.exports.getClientByToken = (clientDetails) => {
   return new Promise((resolve, reject) => {
     clientModel.findOne({ email: clientDetails.email,token:clientDetails.token})
       .then(result => {
         resolve({
            status: true,
            message: "client trouver!",
            client: result
          });
       })

       .catch(error => {
         reject({ status: false, message: "Données invalides" });
       });
   });
 }
 
 module.exports.updateArgentByClientId = async (clientDetails) => {
  try {
    const id = clientDetails._id;
    const newArgent = Number(clientDetails.argent);
    const currentClient = await clientModel.findById(id);
    if (!currentClient) {
      return { status: false, message: "Client introuvable" };
    }

    const currentArgent = currentClient.argent;
    if (currentArgent < newArgent) {
      return { status: false, message: "Le solde actuel est insuffisant pour cette transaction" };
    }

    const updateArgent = await clientModel.findByIdAndUpdate(
      id,
      { $inc: { argent: -newArgent } },
      { new: true }
    );

    if (!updateArgent) {
      return { status: false, message: "PAIEMENT ARGENT introuvable" };
    }

    return { status: true, message: "État du PAIEMENT ARGENT mis à jour avec succès", updateArgent };
  } catch (error) {
    console.error(error);
    return { status: false, message: "Erreur lors de la mise à jour de l'état du PAIEMENT ARGENT" };
  }
};


function getCurrentDateTime() {
   const currentDateTime = new Date();
   const date = currentDateTime.toISOString().split('T')[0];
   const time = currentDateTime.toLocaleTimeString();
   const dateTimeString = `${date} ${time}`;
   return dateTimeString;
 }

