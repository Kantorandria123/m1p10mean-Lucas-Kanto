var paiementModel = require('./PaiementModel');

module.exports.createPaiementSercvice = (paiementDetail) => {


   return new Promise(function myFn(resolve, reject) {

       var paeiementModelData = new paiementModel();

       paeiementModelData.daty = paiementDetail.daty;
       paeiementModelData.prix = paiementDetail.prix;
       paeiementModelData.service = paiementDetail.service;
       paeiementModelData.rendezvous_id = paiementDetail.rendezvous_id;
       paeiementModelData.client_id = paiementDetail.client_id;
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
const listePaiement = async (clientId,etat) => {
    try {
      console.log("clientId : "+clientId);
      const etatInt=parseInt(etat);
      console.log("etat : "+etatInt);
      const paiemtnList = await paiementModel.aggregate([
        {
          $match: {
            client_id: clientId,
            etat: etatInt
          }
        },
        {
          $addFields: {
            employee_id: { $toObjectId: "$employee_id" },
            service_id: { $toObjectId: "$service_id" },
          }
        },
        {
          $lookup: {
            from: "employes",
            localField: "employee_id",
            foreignField: "_id",
            as: "employe_info"
          }
        },
        {
          $unwind: "$employe_info"
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
            "employe_info.nom": 1,
            "employe_info.horaireTravail": 1,
            "employe_info.image": 1,
            "service_info.nom": 1,
            "service_info.duree": 1,
            "service_info.prix": 1,
            "service_info.commission": 1,
            "service_info.image": 1,
            _id: 1,
            daty: 1,
            horaire: 1,
            description: 1,
            client_id: 1,
            etat:1
          }
        }
      ]);
      console.log("paiemtnList.length : "+paiemtnList);
      return { status: true, message: "Liste des paiemtnList récupérée avec succès", paiemtnList };
    } catch (error) {
      console.error(error);
      return { status: false, message: "Erreur lors de la récupération de la liste des paiemtnList par client" };
    }
  };



