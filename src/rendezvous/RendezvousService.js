const RendezvousModel = require('./RendezvousModel');

const getListRendezvous = async () => {
  try {
    const rendezvousList = await rendezvousModel.find({});
    return { status: true, message: "Liste des rendez-vous récupérée avec succès", rendezvousList };
  } catch (error) {
    console.error(error);
    return { status: false, message: "Erreur lors de la récupération de la liste des rendez-vous" };
  }
};
const creerRendezVous = (rendezvous) => {
    return new Promise((resolve, reject) => {
        var rendezvousData = new RendezvousModel();
        rendezvousData.daty = rendezvous.daty;
        rendezvousData.horaire = rendezvous.horaire;
        rendezvousData.description = rendezvous.description;
        rendezvousData.employee_id = rendezvous.employee_id;
        rendezvousData.service_id = rendezvous.service_id;
        rendezvousData.client_id = rendezvous.client_id;
        rendezvousData.etat =  1;
        rendezvousData.save()
            .then(result => {
                console.log('Save successful');
                
                const insertedId = result._id;
                resolve({ success: true, id: insertedId });
            })
            .catch(error => {
                console.error('Save failed', error);
                reject({ success: false, error: error });
            });
    });
}

const listeRendezvousByClient = async (clientId,etat) => {
  try {
    const etatInt=parseInt(etat);
    const rendezvousList = await RendezvousModel.aggregate([
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
    return { status: true, message: "Liste des rendez-vous récupérée avec succès", rendezvousList };
  } catch (error) {
    console.error(error);
    return { status: false, message: "Erreur lors de la récupération de la liste des rendez-vous par client" };
  }
};

const listeRendezvousNotifier = async (clientId) => {
  try {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
    const day = String(currentDate.getDate()+1).padStart(2, '0'); 
    const datyNotification = `${year}-${month}-${day}`;
    const rendezvousList = await RendezvousModel.aggregate([
      {
        $match: {
          client_id: clientId,
          daty : datyNotification
        }
      },
      {
        $addFields: {
          employee_id: { $toObjectId: "$employee_id" },
          service_id: { $toObjectId: "$service_id" }
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
          client_id: 1
        }
      }
    ]);
    return { status: true, message: "Liste des rendez-vous récupérée avec succès", rendezvousList };
  } catch (error) {
    console.error(error);
    return { status: false, message: "Erreur lors de la récupération de la liste des rendez-vous par client" };
  }
};

const listeRendezvousByEmployee = async (employeeId) => {
  try {
    const rendezvousList = await RendezvousModel.aggregate([
      {
        $match: {
          employee_id: employeeId
        }
      },
      {
        $addFields: {
          client_id: { $toObjectId: "$client_id" },
          service_id: { $toObjectId: "$service_id" }
        }
      },
      {
        $lookup: {
          from: "clients",
          localField: "client_id",
          foreignField: "_id",
          as: "client_info"
        }
      },
      {
        $unwind: "$client_info"
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
          "client_info.nom":1,
          "client_info.email":1,
          "client_info.phone":1,
          "service_info.nom": 1,
          "service_info.duree": 1,
          "service_info.prix": 1,
          "service_info.commission": 1,
          "service_info.image": 1,
          _id: 1,
          daty: 1,
          horaire: 1,
          description: 1,
          employee_id: 1,
          etat:1
        }
      }
    ]);
    return {status: true, message: "Liste des rendez-vous récupérée avec succès", rendezvousList};
  } catch (error) {
    console.error(error);
    return {status: false, message: "Erreur lors de la récupération de la liste des rendez-vous par employée"};
  }
};

const updateEtatRendezVousById = async (id, newEtat) => {
  try {
    const newEtatInt=parseInt(newEtat);
    const updatedRendezvous = await RendezvousModel.findByIdAndUpdate(
      id,
      { $set: { etat: newEtatInt } },
      { new: true }
    );

    if (!updatedRendezvous) {
      return { status: false, message: "Rendez-vous introuvable" };
    }

    return { status: true, message: "État du rendez-vous mis à jour avec succès", updatedRendezvous };
  } catch (error) {
    console.error(error);
    return { status: false, message: "Erreur lors de la mise à jour de l'état du rendez-vous" };
  }
};
const historiqueRendezvousByClient = async (clientId) => {
  try {
    const rendezvousList = await RendezvousModel.aggregate([
      {
        $match: {
          client_id: clientId
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
    return { status: true, message: "Liste des rendez-vous récupérée avec succès", rendezvousList };
  } catch (error) {
    console.error(error);
    return { status: false, message: "Erreur lors de la récupération de la liste des rendez-vous par client" };
  }
};
const nombreResevationParjour = async () => {
  try {
    const rendezvousList = await RendezvousModel.aggregate([
      {
        $project: {
            dayOfWeek: {
                $let: {
                    vars: {
                        parts: { $split: ["$daty", "-"] },
                        year: { $toInt: { $arrayElemAt: [{ $split: ["$daty", "-"] }, 0] } },
                        month: { $toInt: { $arrayElemAt: [{ $split: ["$daty", "-"] }, 1] } },
                        day: { $toInt: { $arrayElemAt: [{ $split: ["$daty", "-"] }, 2] } }
                    },
                    in: { $dayOfWeek: { $dateFromParts: { year: "$$year", month: "$$month", day: "$$day" } } }
                }
            }
        }
    },
    {
        $group: {
            _id: "$dayOfWeek",
            count: { $sum: 1 }
        }
    },
    {
        $match: {
            count: { $gt: 0 } // Filtrer les jours avec des rendez-vous
        }
    },
    {
        $project: {
            _id: 0,
            jourint: "$_id",
            jour: {
                $switch: {
                    branches: [
                        { case: { $eq: ["$_id", 1] }, then: "Dimanche" },
                        { case: { $eq: ["$_id", 2] }, then: "Lundi" },
                        { case: { $eq: ["$_id", 3] }, then: "Mardi" },
                        { case: { $eq: ["$_id", 4] }, then: "Mercredi" },
                        { case: { $eq: ["$_id", 5] }, then: "Jeudi" },
                        { case: { $eq: ["$_id", 6] }, then: "Vendredi" },
                        { case: { $eq: ["$_id", 7] }, then: "Samedi" }
                    ],
                    default: "Jour invalide"
                }
            },
            count: 1
        }
    }
    ]);
    return {status: true, message: "Liste des chiffreList récupérée avec succès", rendezvousList};
  } catch (error) {
    console.error(error);
    return {status: false, message: "Erreur lors de la récupération de la liste des rendezvousList par tempsmoyen"};
  }
};
const nombreResevationParmois = async () => {
  try {
    const rendezvousList = await RendezvousModel.aggregate([
      {
        $project: {
            month: {
                $let: {
                    vars: {
                        parts: { $split: ["$daty", "-"] },
                        year: { $toInt: { $arrayElemAt: [{ $split: ["$daty", "-"] }, 0] } },
                        month: { $toInt: { $arrayElemAt: [{ $split: ["$daty", "-"] }, 1] } },
                        day: { $toInt: { $arrayElemAt: [{ $split: ["$daty", "-"] }, 2] } }
                    },
                    in: { $month: { $dateFromParts: { year: "$$year", month: "$$month", day: "$$day" } } }
                }
            }
        }
    },
    {
        $group: {
            _id: "$month",
            count: { $sum: 1 }
        }
    },
    {
        $match: {
            count: { $gt: 0 } // Filtrer les jours avec des rendez-vous
        }
    },
    {
        $project: {
            _id: 0,
            moisint: "$_id",
            mois: {
                $switch: {
                    branches: [
                         { case: { $eq: ["$_id", 1] }, then: "Janvier" },
		                { case: { $eq: ["$_id", 2] }, then: "Février" },
		                { case: { $eq: ["$_id", 3] }, then: "Mars" },
		                { case: { $eq: ["$_id", 4] }, then: "Avril" },
		                { case: { $eq: ["$_id", 5] }, then: "Mai" },
		                { case: { $eq: ["$_id", 6] }, then: "Juin" },
		                { case: { $eq: ["$_id", 7] }, then: "Juillet" },
		                { case: { $eq: ["$_id", 8] }, then: "Août" },
		                { case: { $eq: ["$_id", 9] }, then: "Septembre" },
		                { case: { $eq: ["$_id", 10] }, then: "Octobre" },
		                { case: { $eq: ["$_id", 11] }, then: "Novembre" },
		                { case: { $eq: ["$_id", 12] }, then: "Décembre" }
                    ],
                    default: "mois invalide"
                }
            },
            count: 1
        }
    }
    ]);
    return {status: true, message: "Liste des chiffreList récupérée avec succès", rendezvousList};
  } catch (error) {
    console.error(error);
    return {status: false, message: "Erreur lors de la récupération de la liste des rendezvousList par tempsmoyen"};
  }
};


const getRendezvousClientsNotifier = async () => {
  try {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
    const day = String(currentDate.getDate()+1).padStart(2, '0'); 
    const datyNotification = `${year}-${month}-${day}`;
    console.log("daty notif : "+datyNotification);
    const rendezvousList = await RendezvousModel.aggregate([
      {
        $match: {
          daty: datyNotification
        }
      },
      {
        $addFields: {
          employee_id: { $toObjectId: "$employee_id" },
          service_id: { $toObjectId: "$service_id" },
          client_id: { $toObjectId: "$client_id" }
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
        $lookup: {
          from: "clients",
          localField: "client_id",
          foreignField: "_id",
          as: "client_info"
        }
      },
      {
        $unwind: "$client_info"
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
          "client_info.nom": 1,
          "client_info.email": 1,
          _id: 1,
          daty: 1,
          horaire: 1,
          description: 1,
          client_id: 1
        }
      },
      {
        $group: {
          _id: {
            client_id: "$client_id",
            daty: "$daty",
            email:"$client_info.email"
          },
          rendezvous: {
            $push: "$$ROOT"
          }
        }
      }
    ]);
    return { status: true, message: "Liste des rendez-vous récupérée avec succès", rendezvousList };
  } catch (error) {
    console.error(error);
    return { status: false, message: "Erreur lors de la récupération de la liste des rendez-vous par client" };
  }
};
module.exports = {
  getListRendezvous,creerRendezVous,listeRendezvousByClient,listeRendezvousNotifier,listeRendezvousByEmployee,updateEtatRendezVousById,historiqueRendezvousByClient,getRendezvousClientsNotifier
};
