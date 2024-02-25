var ClientService = require('./ClientService');

var createClientControllerFn = async (req, res) => 
{
    try
    {
    console.log(req.body);
    var status = await ClientService.createClientDBService(req.body);
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
        const result = await ClientService.loginUserDBService(req.body);
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
        const result = await ClientService.getClientByToken(req.body);
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
      const result = await ClientService.updateArgentByClientId(req.body);
  
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

  const clientByIdControllerFn = async (req, res) => {
    try {
        const clientId = req.params.clientId;
        const result = await clientService.getClientById(clientId);
        if (result.status) {
            res.send({ status: true, message: result.message, clients: result.clients });
        } else {
            res.send({ status: false, message: result.message });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: false, message: "Erreur lors de la récupération de la liste des clients par id" });
      }
}

module.exports = { createClientControllerFn,loginUserControllerFn,getClientByTokenControlleur,updateArgentcontrollerFn,clientByIdControllerFn };