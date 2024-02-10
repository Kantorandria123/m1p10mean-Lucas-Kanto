var paiementService = require('./PaiementService');

var createPaiementControllerFn = async (req, res) => 
{
    try
    {
    console.log(req.body);
    var status = await paiementService.createPaiementSercvice(req.body);
    console.log(status);

    if (status) {
        res.send({ "status": true, "message": "paiement created successfully" });
    } else {
        res.send({ "status": false, "message": "Error creating paiement" });
    }
}
catch(err)
{
    console.log(err);
}
}



module.exports = { createPaiementControllerFn };