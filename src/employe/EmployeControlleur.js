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

const loginEmployeeControllerFn = async (req, res) => {
  try{
    const result = await employeService.loginEmployeeDBService(req.body);
    if (result.status) {
      res.send({"status": true, "message": result.message, "employes": result.employes});
    } else {
      res.send({"status": false, "message": result.message});
    }
  } catch (error) {
    console.error(error);
    res.send({ "status": false, "message": error.message });
  }
}

const employeeByTokenControlleur = async (req, res) => {
  try {
    const result = await employeService.getEmployeeByToken(req.body);
    if (result.status) {
      res.send({"status": true, "message": result.message, "employes": result.employes});
    } else {
      res.send({"status": false, "message": result.message });
    }
  } catch (error) {
    console.error(error);
    res.send({"status": false, "message": error.message});
  }
}

const employeeByIdControllerFn = async (req, res) => {
  try {
    const employeeId = req.params.employeeId;
    console.log("employeeId: " +employeeId);
   const result = await employeService.getEmployeeById(employeeId);
   if (result.status) {
    res.send({ status: true, message: result.message, employes: result.employes });
   } else {
    res.send({ status: false, message: result.message });
   }
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: false, message: "Erreur lors de la récupération de la liste des employee par id" });
  }
}

module.exports = { getlisteEmployeControlleur,loginEmployeeControllerFn,employeeByTokenControlleur,employeeByIdControllerFn};
