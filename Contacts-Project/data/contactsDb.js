const dotenv = require('dotenv').config();
const { MongoClient } = require('mongodb');

let contactsData;

const initDb = (callback) => {
    if (contactsData) {
        console.log('Db is already initialized!');
        return callback(null, contactsData)
    }
    MongoClient.connect(process.env.MONGODB_URL)
        .then((client) => {
            contactsData = client.db();
            callback(null, contactsData);
        })
        .catch((err) => {
            callback(err);
        });
};

const getContactsData = () => {
    if (!contactsData) {
        throw Error('Contacts Data not initialized')
    }
    return contactsData;
};

module.exports = { initDb, getContactsData };