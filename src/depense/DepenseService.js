var depenseModel = require('./DepenseModel');

const createDepense = async (depenses, req) => {
    return new Promise ((resolve, reject) => {
        const depenseData = new depenseModel();
        depenseData.description = depenses.description;
        depenseData.montant = depenses.montant;
        depenseData.date = depenses.date;
        depenseData.type = depenses.type;

        depenseData.save()
            .then(result => {
                console.log('Save successful');
                const insertedId = result._id;
                console.log('insertId :' + insertedId);
                resolve({success: true, id: insertedId});
            })
            .catch(error => {
                console.error('Save failed', error);
                reject({ success: false, error: error });
            });
    });
}

module.exports = {createDepense};