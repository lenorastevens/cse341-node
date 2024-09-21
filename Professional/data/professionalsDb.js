const dotenv = require('dotenv').config();
const { MongoClient } = require('mongodb');

let professionalData;

const initDb = (callback) => {
    if (professionalData) {
        console.log('Db is already initialized!');
        return callback(null, professionalData)
    }
    MongoClient.connect(process.env.MONGODB_URL)
        .then((client) => {
            professionalData = client.db();
            callback(null, professionalData);
        })
        .catch((err) => {
            callback(err);
        });
};

const getProfessionalData = () => {
    if (!professionalData) {
        throw Error('Professional Data not initialized')
    }
    return professionalData;
};

module.exports = { initDb, getProfessionalData };