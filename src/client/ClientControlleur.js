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

module.exports = { createClientControllerFn,loginUserControllerFn,getClientByTokenControlleur };