var express = require('express');

const router = express.Router();

var clientController = require('../src/client/ClientControlleur');
var serviceControlleur = require('../src/service/ServiceControlleur');
var employeControlleur = require('../src/employe/EmployeControlleur');
var rendezvousControlleur = require('../src/rendezvous/RendezvousControlleur');
var offrespecialControlleur = require('../src/offrespeciale/OffrespecialeControlleur');
var preferenceServoceControlleur = require('../src/preference_service/PreferenceControlleur');
var preferenceEmployeControlleur = require('../src/preference_employe/PreferenceControlleur');
var paiementControlleur = require('../src/paiement/PaiementControlleur');
var roleControlleur = require("../src/role/RoleControlleur");
/*client*/ 
router.route('/client/login').post(clientController.loginUserControllerFn);
router.route('/client/create').post(clientController.createClientControllerFn);
router.route('/client/getbytoken').post(clientController.getClientByTokenControlleur);

/*role*/ 
router.route('/role/lesroles').get(roleControlleur.getlisteRoleControlleur);

/*service*/ 
router.route('/service/lesservices').get(serviceControlleur.getListServiceControlleur);

/*employe*/ 
router.route('/employe/lesEmployes').get(employeControlleur.getlisteEmployeControlleur);
router.route('/employe/create').post(employeControlleur.createEmployeeControllerFn);
router.route('/employe/getbytoken').post(employeControlleur.getEmployeeByTokenControlleur);
router.route('/employe/login').post(employeControlleur.loginEmployeeControllerFn);

/*rendezvous*/ 
router.route('/rendezvous/creer').post(rendezvousControlleur.creerRendevousControlleur);
router.route('/rendezvous/lesrendezvous/:clientId').get(rendezvousControlleur.listeRendezvousByClientControllerFn);
router.route('/rendezvous/notification/:clientId').get(rendezvousControlleur.listeRendezvousNotifierControlleurFn);

// offrespécial
router.route('/offrespecial/creer').post(offrespecialControlleur.creerOffrespecialControlleur);
router.route('/offrespecial/lesoffrespecial').get(offrespecialControlleur.listeOffrespecialControlleur);

/*preference_service*/
router.route('/preference/service/creer').post(preferenceServoceControlleur.createPreferenceControllerFn);

/*preference_service*/
router.route('/preference/employe/creer').post(preferenceEmployeControlleur.createPreferenceControllerFn);

/*paiement*/
router.route('/paiement/creer').post(paiementControlleur.createPaiementControllerFn);
module.exports = router;