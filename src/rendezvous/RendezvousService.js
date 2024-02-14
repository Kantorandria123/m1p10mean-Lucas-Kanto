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
                console.log('insertedId '+insertedId);
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
    console.log("clientId : "+clientId);
    const etatInt=parseInt(etat);
    console.log("etat : "+etatInt);
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
    console.log("rendezvousList.length : "+rendezvousList);
    return { status: true, message: "Liste des rendez-vous récupérée avec succès", rendezvousList };
  } catch (error) {
    console.error(error);
    return { status: false, message: "Erreur lors de la récupération de la liste des rendez-vous par client" };
  }
};

const listeRendezvousNotifier = async (clientId) => {
  try {
    console.log("clientId : "+clientId);
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
    const day = String(currentDate.getDate()+1).padStart(2, '0'); 

    const datyNotification = `${year}-${month}-${day}`;

    console.log("datyNotification  = "+datyNotification); 
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
    console.log("rendezvousList.length : "+rendezvousList.length);
    return { status: true, message: "Liste des rendez-vous récupérée avec succès", rendezvousList };
  } catch (error) {
    console.error(error);
    return { status: false, message: "Erreur lors de la récupération de la liste des rendez-vous par client" };
  }
};

const listeRendezvousByEmployee = async (employeeId) => {
  try {
    console.log("employeeId : " +employeeId);
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
          employee_id: 1
        }
      }
    ]);
    console.log("rendezvousList.length :" +rendezvousList.length);
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

module.exports = {
  getListRendezvous,creerRendezVous,listeRendezvousByClient,listeRendezvousNotifier,listeRendezvousByEmployee,updateEtatRendezVousById
};
