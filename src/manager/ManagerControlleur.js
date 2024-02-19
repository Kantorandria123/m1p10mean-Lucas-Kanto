const managerService = require('./ManagerService');

const getlistemanagerControlleur = async (req, res) => {
  try {
    const result = await managerService.getListManager();
    if (result.status) {
      res.send({ status: true, message: result.message, managers: result.managers });
    } else {
      res.send({ status: false, message: result.message });
    }
  } catch (error) {
    console.error(error);
    res.send({ status: false, message: "Erreur lors de la récupération de la liste des managerés" });
  }
};

const loginmanagereControllerFn = async (req, res) => {
  try{
    const result = await managerService.loginManagereDBService(req.body);
    if (result.status) {
      res.send({"status": true, "message": result.message, "managers": result.managers});
    } else {
      res.send({"status": false, "message": result.message});
    }
  } catch (error) {
    console.error(error);
    res.send({ "status": false, "message": error.message });
  }
}

const managereByTokenControlleur = async (req, res) => {
  try {
    const result = await managerService.getManagereByToken(req.body);
    if (result.status) {
      res.send({"status": true, "message": result.message, "managers": result.managers});
    } else {
      res.send({"status": false, "message": result.message });
    }
  } catch (error) {
    console.error(error);
    res.send({"status": false, "message": error.message});
  }
}

const managereByIdControllerFn = async (req, res) => {
  try {
    const managereId = req.params.managereId;
    console.log("managereId: " +managereId);
   const result = await managerService.getManagereById(managereId);
   if (result.status) {
    res.send({ status: true, message: result.message, managers: result.managers });
   } else {
    res.send({ status: false, message: result.message });
   }
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: false, message: "Erreur lors de la récupération de la liste des managere par id" });
  }
}




module.exports = {getlistemanagerControlleur,loginmanagereControllerFn,managereByIdControllerFn,managereByTokenControlleur};
