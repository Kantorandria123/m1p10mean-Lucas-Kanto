const managerService = require('./ManagerService');

const loginManagerControllerFn = async (req, res) => {
    try{
      const result = await managerService.loginManagerDBService(req.body);
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

  module.exports = {
    loginManagerControllerFn
  };