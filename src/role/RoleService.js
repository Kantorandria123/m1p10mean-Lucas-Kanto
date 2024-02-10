const roleModel = require('./RoleModel');

const getListRole = async () => {
  try {
    const roles = await roleModel.find({});
    return { status: true, message: "Liste role récupérée avec succès", roles };
  } catch (error) {
    console.error(error);
    return { status: false, message: "Erreur lors de la récupération de la liste role" };
  }
};

module.exports = {
    getListRole
  };
  