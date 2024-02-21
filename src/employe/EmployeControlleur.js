const employeService = require('./EmployeService');

var createemployeControllerFn = async (req, res) => 
{
    try
    {
    var status = await employeService.createEmployeDBService(req.body);
    if (status) {
        res.send({ "status": true, "message": "employe created successfully" });
    } else {
        res.send({ "status": false, "message": "Error creating user" });
    }
}
catch(err)
{
    console.log(err);
}
}
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

const updateEmployeeByIdControllerFn = async (req, res) => {
  try {
    const employeeId = req.params.employeeId;
    const newData = req.body; // Supposons que les nouvelles données sont envoyées dans le corps de la requête

    const result = await employeService.updateEmployeeById(employeeId, newData);
    if (result.status) {
      res.send({ status: true, message: result.message, updatedEmployee: result.updatedEmployee });
    } else {
      res.send({ status: false, message: result.message });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: false, message: "Erreur lors de la mise à jour de l'employé par ID" });
  }
};
const deleteEmployeeByIdControllerFn = async (req, res) => {
  try {
    const employeeId = req.params.id; 
    const result = await employeService.deleteEmployeById(employeeId); 

    if (result.status) {
      res.send({ status: true, message: result.message, deletedEmployee: result.deletedEmployee });
    } else {
      res.send({ status: false, message: result.message });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: false, message: "Erreur lors de la suppression de l'employé par ID" });
  }
};
const getTempsMoyenTravailEmployesControllerFn = async (req, res) => {
  try {
    const result = await employeService.getTempsMoyenTravailEmployes();
    if (result.status) {
      res.send({ status: true, message: result.message, employeList: result.employeList });
    } else {
      res.send({ status: false, message: result.message });
    }
  } catch (error) {
    console.error(error);
    res.send({ status: false, message: "Erreur lors de la récupération de la liste des employes" });
  }
};
module.exports = { getlisteEmployeControlleur,loginEmployeeControllerFn,employeeByTokenControlleur,employeeByIdControllerFn,updateEmployeeByIdControllerFn,createemployeControllerFn,deleteEmployeeByIdControllerFn,getTempsMoyenTravailEmployesControllerFn};
