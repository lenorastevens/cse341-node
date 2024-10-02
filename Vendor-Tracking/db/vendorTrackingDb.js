const dotenv = require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

let vendorTrackingDb;

const initDb = (callback) => {
    if (vendorTrackingDb) {
    console.log('Db is already initialized!');
    return callback(null, vendorTrackingDb);    
    }
    MongoClient.connect(process.env.MONGODB_URI)
        .then((client) => {
            vendorTrackingDb = client.db('vendorTracking');
            callback(null, vendorTrackingDb);
        })
        .catch((err) => {
            callback(err);
        });
    };

    const getVendorDb = () => {
        if (!vendorTrackingDb) {
            throw Error('Db not initialized');
        }
        return vendorTrackingDb;
    };

    module.exports = { initDb, getVendorDb };