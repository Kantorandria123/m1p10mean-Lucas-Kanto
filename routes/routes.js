var express = require('express');

const router = express.Router();
const path = require('path');
const upload = require('../src/config/multerConfig'); 

var clientController = require('../src/client/ClientControlleur');
var serviceControlleur = require('../src/service/ServiceControlleur');
var employeControlleur = require('../src/employe/EmployeControlleur');
var rendezvousControlleur = require('../src/rendezvous/RendezvousControlleur');
var offrespecialControlleur = require('../src/offrespeciale/OffrespecialeControlleur');
var preferenceServoceControlleur = require('../src/preference_service/PreferenceControlleur');
var preferenceEmployeControlleur = require('../src/preference_employe/PreferenceControlleur');
var paiementControlleur = require('../src/paiement/PaiementControlleur');
const emailController = require('../src/email/EmailController'); 
var tacheControlleur = require('../src/tache/TacheControlleur');
var managerControlleur = require('../src/manager/ManagerControlleur');
var depenseControlleur = require('../src/depense/DepenseControlleur');

/*client*/ 
router.route('/client/login').post(clientController.loginUserControllerFn);
router.route('/client/create').post(clientController.createClientControllerFn);
router.route('/client/getbytoken').post(clientController.getClientByTokenControlleur);
router.route('/client/updateargent').post(clientController.updateArgentcontrollerFn);

/*service*/ 
router.route('/service/lesservices').get(serviceControlleur.getListServiceControlleur);
router.route('/service/creer').post(upload,serviceControlleur.creerServiceController);
router.route('/service/serviceupdate/:serviceId').patch(serviceControlleur.updateServiceControllerFn);
router.route('/service/supprimer/:id').delete(serviceControlleur.deleteServiceByIdControllerFn);

/*employe*/ 
router.route('/employe/create').post(employeControlleur.createemployeControllerFn);
router.route('/employe/lesEmployes').get(employeControlleur.getlisteEmployeControlleur);
router.route('/employe/login').post(employeControlleur.loginEmployeeControllerFn);
router.route('/employe/employebytoken').post(employeControlleur.employeeByTokenControlleur);
router.route('/employe/employebyId/:employeeId').get(employeControlleur.employeeByIdControllerFn);
router.route('/employe/employeupdate/:employeeId').patch(employeControlleur.updateEmployeeByIdControllerFn);
router.route('/employe/supprimer/:id').delete(employeControlleur.deleteEmployeeByIdControllerFn);

/*rendezvous*/ 
router.route('/rendezvous/creer').post(rendezvousControlleur.creerRendevousControlleur);
router.route('/rendezvous/lesrendezvous/:clientId/:etat').get(rendezvousControlleur.listeRendezvousByClientControllerFn);
router.route('/rendezvous/historique/:clientId').get(rendezvousControlleur.historiqueRendezvousByClientControllerFn);
router.route('/rendezvous/notification/:clientId').get(rendezvousControlleur.listeRendezvousNotifierControlleurFn);
router.route('/rendezvous/employeerendezvous/:employeeId').get(rendezvousControlleur.listeRendezvousByEmployeeControllerFn);
router.route('/rendezvous/modifieretat/:id/:etat').get(rendezvousControlleur.updateEtatRendezVousControllerFn);
// offrespécial
router.route('/offrespecial/creer').post(offrespecialControlleur.creerOffrespecialControlleur);
router.route('/offrespecial/lesoffrespecial').get(offrespecialControlleur.listeOffrespecialControlleur);

/*preference_service*/
router.route('/preference/service/creer').post(preferenceServoceControlleur.createPreferenceControllerFn);
router.route('/preference/service/liste/:client_id').get(preferenceServoceControlleur.listePreferenceControllerFn);

/*preference_employe*/
router.route('/preference/employe/creer').post(preferenceEmployeControlleur.createPreferenceControllerFn);
router.route('/preference/employe/liste/:client_id').get(preferenceEmployeControlleur.listePreferenceControllerFn);
/*paiement*/
router.route('/paiement/creer').post(paiementControlleur.createPaiementControllerFn);
router.route('/paiement/lespaiements/:clientId/:etat').get(paiementControlleur.getlistePaiementControlleur);
router.route('/paiement/payer/:id/:etat').get(paiementControlleur.updateEtatPaiementontrollerFn);

/*email*/
router.post('/email/send', emailController.sendEmailControllerFn);

/*Tache*/
router.route('/tache/creer').post(tacheControlleur.creerTacheControlleur);
router.route('/tache/liste/:employeid/:etat').get(tacheControlleur.listetacheControllerFn);
router.route('/tache/modifieretat/:id/:etat').get(tacheControlleur.updateEtatControllerFn);

/*Manager*/ 
router.route('/manager/login').post(managerControlleur.loginmanagereControllerFn);
router.route('/manager/managertoken').post(managerControlleur.managereByTokenControlleur);

router.use('/uploads/images', express.static(path.join(__dirname, '../uploads/images')));

/*Dépense*/
router.route('/depense/creer').post(depenseControlleur.creerDepenseControlleurFn);
module.exports = router;