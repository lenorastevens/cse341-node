const mongodb = require('../db/vendorTrackingDb');
const ObjectId = require('mongodb').ObjectId;

const getAllUsers = async (req, res) => {
    //#swagger.tags=['App Users']
    const result = await mongodb.getVendorDb().collection('appUsers').find();
    result.toArray().then((appUsers) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(appUsers);
    });
    // mongodb
    //     .getVendorDb()
    //     .collection('appUsers')
    //     .find()
    //     .toArray((err, appUsers) => {
    //         if (err) {
    //             res.status(400).json({ message:err })
    //         }
    //         res.setHeader('Content-Type', 'application/json');
    //         res.status(200).json(appUsers);
    //     });
};

const getSingleUsers = async (req, res) => {
    //#swagger.tags=['App Users']
    const result = await mongodb.getVendorDb().collection('appUsers').find();
    result.toArray().then((appUsers) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(appUsers);
    });

    // if (!ObjectId.isValid(req.param.id)) {
    //     res.status(400).json('Must use a valid vendor id to find a vendor.');
    // }  
    // const userId = ObjectId.createFromHexString(req.params.id);
    // mongodb
    //     .getVendorDb()
    //     .collection('appUsers')
    //     .find( { _id: userId })
    //     .toArray((err, result) => {
    //         if (err) {
    //             res.status(400).json({ message:err })
    //         }
    //         res.setHeader('Content-Type', 'application/json');
    //         res.status(200).json(result[0]);
    //     });
};

// const createAppUsers = async (req, res) => {

// };

// const updateAppUsers = async (req, res) => {

// };

// const deleteAppUsers = async (req, res) => {
    
// };

module.exports = {
    getAllUsers,
    getSingleUsers
    // createAppUsers,
    // updateAppUsers,
    // deleteAppUsers
}