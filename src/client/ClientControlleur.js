var clientService = require('./ClientService');

var createClientControllerFn = async (req, res) => 
{
    try
    {
    console.log(req.body);
    var status = await clientService.createClientDBService(req.body);
    console.log(status);

    if (status) {
        res.send({ "status": true, "message": "Client created successfully" });
    } else {
        res.send({ "status": false, "message": "Error creating user" });
    }
}
catch(err)
{
    console.log(err);
}
}

var loginUserControllerFn = async (req, res) => {
    try {
        const result = await clientService.loginUserDBService(req.body);
        if (result.status) {
            res.send({ "status": true, "message": result.message, "client": result.client });
        } else {
            res.send({ "status": false, "message": result.message });
        }
    } catch (error) {
        console.error(error);
        res.send({ "status": false, "message": error.message });
    }
}

var getClientByTokenControlleur = async (req, res) => {
    try {
        const result = await clientService.getClientByToken(req.body);
        if (result.status) {
            res.send({ "status": true, "message": result.message, "client": result.client });
        } else {
            res.send({ "status": false, "message": result.message });
        }
    } catch (error) {
        console.error(error);
        res.send({ "status": false, "message": error.message });
    }
}
const updateArgentcontrollerFn = async (req, res) => {
    try {
      console.log("req.body "+req.body);
      const result = await clientService.updateArgentByClientId(req.body);
  
      if (result.status) {
        res.send({ status: true, message: result.message, updateArgent: result.updateArgent });
      } else {
        res.send({ status: false, message: result.message });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ status: false, message: "Erreur lors de la mise à jour de l'état update argent" });
    }
  };

const getlisteClientControllerFn = async (req, res) => {
    try {
        const result = await clientService.getListClient() ;
        if (result.status) {
            res.send({ status: true, message: result.message, clients: result.clients });
        } else {
            res.send({ status: false, message: result.message });
        }
    } catch (error) {
        console.error(error);
        res.send({ status: false, message: "Erreur lors de la récupération de la liste des clients" });
      }
}
module.exports = { createClientControllerFn,loginUserControllerFn,getClientByTokenControlleur,updateArgentcontrollerFn,getlisteClientControllerFn };