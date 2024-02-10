const employeService = require('./EmployeService');

const getlisteEmployeControlleur = async (req, res) => {
  try {
    const result = await employeService.getListEmploye();
    if (result.status) {
      res.send({ status: true, message: result.message, employes: result.employes });
    } else {
      res.send({ status: false, message: result.message });
    }
  } catch (error) {
    console.error(error);
    res.send({ status: false, message: "Erreur lors de la récupération de la liste des employés" });
  }
};

var createEmployeeControllerFn = async (req, res) => 
{
    try
    {
    console.log(req.body);
    var status = await employeService.createEmployeeDBService(req.body);
    console.log(status);

    if (status) {
        res.send({ "status": true, "message": "Employee created successfully" });
    } else {
        res.send({ "status": false, "message": "Error creating Employeeuser" });
    }
}
catch(err)
{
    console.log(err);
}
}

var loginEmployeeControllerFn = async (req, res) => {
  try {
      const result = await employeService.loginEmployeeDBService(req.body);
      if (result.status) {
          res.send({ "status": true, "message": result.message, "employee": result.employee });
      } else {
          res.send({ "status": false, "message": result.message });
      }
  } catch (error) {
      console.error(error);
      res.send({ "status": false, "message": error.message });
  }
}

var getEmployeeByTokenControlleur = async (req, res) => {
  try {
      const result = await employeService.getEmployeeByToken(req.body);
      if (result.status) {
          res.send({ "status": true, "message": result.message, "employee": result.employee });
      } else {
          res.send({ "status": false, "message": result.message });
      }
  } catch (error) {
      console.error(error);
      res.send({ "status": false, "message": error.message });
  }
}


module.exports = { getlisteEmployeControlleur,loginEmployeeControllerFn,getEmployeeByTokenControlleur,createEmployeeControllerFn };
