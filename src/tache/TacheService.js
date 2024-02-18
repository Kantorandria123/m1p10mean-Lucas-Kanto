const tacheModel = require('./TacheModel');

const getListtache = async () => {
  try {
    const tacheList = await tacheModel.find({});
    return { status: true, message: "Liste des tache récupérée avec succès", tacheList };
  } catch (error) {
    console.error(error);
    return { status: false, message: "Erreur lors de la récupération de la liste des tache" };
  }
};
const creertache = (tache) => {
    return new Promise((resolve, reject) => {
        var tacheData = new tacheModel();
        tacheData.daty = tache.daty;
        tacheData.horairedebut = tache.horairedebut;
        tacheData.horairefin = tache.horairefin;
        tacheData.description = tache.description;
        tacheData.employee_id = tache.employee_id;
        tacheData.service_id = tache.service_id;
        tacheData.etat =  1;
        tacheData.save()
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

const listetaches = async (employeid,etat) => {
  try {
    const etatInt=parseInt(etat);
    const tacheList = await tacheModel.aggregate([
      {
        $match: {
          employee_id:employeid,
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
          horairedebut: 1,
          horairefin: 1,
          description: 1,
          etat:1
        }
      }
    ]);
    return { status: true, message: "Liste des tache récupérée avec succès", tacheList };
  } catch (error) {
    console.error(error);
    return { status: false, message: "Erreur lors de la récupération de la liste des tache" };
  }
};


module.exports = {
  getListtache,creertache,listetaches
};
