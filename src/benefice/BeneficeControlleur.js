var beneficeService = require('./BeneficeService');

const getBeneficeParmoisControllerFn = async (req, res) => {
    try {
      const result = await beneficeService.BeneficeParmois();
      if (result.status) {
        res.send({ status: true, message: result.message, beneficeList: result.beneficeList });
      } else {
        res.send({ status: false, message: result.message });
      }
    } catch (error) {
      console.error(error);
      res.send({ status: false, message: "Erreur lors de la récupération de la liste des chiffreList" });
    }
  };

  module.exports = { getBeneficeParmoisControllerFn };