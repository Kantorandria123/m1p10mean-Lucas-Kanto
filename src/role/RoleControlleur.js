const roleService = require('./RoleService');


const getlisteRoleControlleur = async (req, res) => {
    try {
      const result = await roleService.getListRole();
      if (result.status) {
        res.send({ status: true, message: result.message, roles: result.roles });
      } else {
        res.send({ status: false, message: result.message });
      }
    } catch (error) {
      console.error(error);
      res.send({ status: false, message: "Erreur lors de la récupération de la liste role" });
    }
  };

  module.exports = {getlisteRoleControlleur}