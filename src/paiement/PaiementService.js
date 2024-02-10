var paiementModel = require('./PaiementModel');

module.exports.createPaiementSercvice = (paiementDetail) => {


   return new Promise(function myFn(resolve, reject) {

       var paeiementModelData = new paiementModel();

       paeiementModelData.daty = paiementDetail.daty;
       paeiementModelData.prix = paiementDetail.prix;
       paeiementModelData.rendezvous_id = paiementDetail.rendezvous_id;
       paeiementModelData.etat = 1;

       paeiementModelData.save()
            .then(result => {
                console.log('Save paiement success'); 
                const insertedId = result._id;
                console.log('insertedId '+insertedId);
                resolve({ status: true, id: insertedId });
            })
            .catch(error => {
                console.error('Save paiement failed', error);
                reject({ status: false, error: error });
            });
     
   });

}



