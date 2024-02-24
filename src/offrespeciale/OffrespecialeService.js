const OffrespecialeModel = require('./OffrespecialeModel');

const getListOffrespecial = async () => {
  try{
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
    const day = String(currentDate.getDate()).padStart(2, '0'); 
    const daty = `${year}-${month}-${day}`;
    const offrespecialList = await OffrespecialeModel.aggregate([
      {
        $addFields: {
          service_id: { $toObjectId: "$service_id" }
        }
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
        $match: {
          datedebut: { $lte: daty }, // datedebut <= daty
          datefin: { $gte: daty }     // datefin >= daty
        }
      },
      {
        $project: {
          "service_info.nom": 1,
          "service_info.duree": 1,
          "service_info.prix": 1,
          "service_info.commission": 1,
          "service_info.image": 1,
          _id: 1,
          titre: 1,
          description: 1,
          datedebut: 1,
          datefin: 1
        }
      }
    ]);
    return {status: true, message: "Listes des offres spécial récupérée avec succès", offrespecialList};

  } catch (error) {
      console.error(error);
      return {status: false, message: "Erreur lors de la récupération de la liste des offres spécial"};
  }
};


const creerOffrespecial = (offrespecial) => {
    return new Promise((resolve, reject) => {
        var offrespecialData = new OffrespecialeModel();
        offrespecialData.titre = offrespecial.titre;
        offrespecialData.description = offrespecial.description;
        offrespecialData.datedebut = offrespecial.datedebut;
        offrespecialData.datefin = offrespecial.datefin;
        offrespecialData.service_id = offrespecial.service_id;

        offrespecialData.save()
            .then(result => {
                console.log('Save successful');

                const insertedId = result._id;
                console.log('insertedId' +insertedId);
                resolve({success: true, id: insertedId});
            })
            .catch(error => {
                console.error('Save failed', error);
                reject({success: false, error: error});
            });
    });
}

const getOffrespecial = async () => {
  try {
    const offrespeciales = await OffrespecialeModel.find({});
    return { status: true, message: "Liste des offres spéciales récupérée avec succès", offrespeciales };
  } catch (error) {
    console.error(error);
    return { status: false, message: "Erreur lors de la récupération de la liste des offres spéciales" };
  }
};

const deletedOffrespecialById = async (offrespecialId) => {
  try {
    const deletedOffrespecial = await OffrespecialeModel.findByIdAndDelete(offrespecialId);
    if(!deletedOffrespecial) {
      return { status: false, message: "Aucun offre spéciale trouvé avec cet identifiant pour la suppression" };
    }
    return { status: true, message: "Employé supprimé avec succès", deletedOffrespecial };
  } catch (error) {
    console.error(error);
    return { status: false, message: "Erreur lors de la suppression de l'offre spéciale" };
  }
}
module.exports = {
    getListOffrespecial,creerOffrespecial,getOffrespecial,deletedOffrespecialById
}