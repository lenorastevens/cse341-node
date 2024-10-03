const mongodb = require('../db/vendorTrackingDb');
const ObjectId = require('mongodb').ObjectId;

const getAllUsers = async (req, res) => {
    //#swagger.tags=['App Users']
    try {    
        const appUsers = await mongodb
            .getVendorDb()
            .collection('appUsers')
            .find()
            .toArray()

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(appUsers);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getSingleUser = async (req, res) => {
    //#swagger.tags=['App Users']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json('Must use a valid app user id to find a user.');
        } 

        const appUserId = new ObjectId(req.params.id);

        const appUser = await mongodb
            .getVendorDb()
            .collection('appUsers')
            .findOne( { _id: appUserId });

        if (!appUser) {
            return res.status(404).json('App user not found.');
        }     

        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json(appUser);

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

};

const createAppUser = async (req, res) => {
    //#swagger.tags=['App Users']
    const appUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone
    };

    const response = await mongodb.getVendorDb().collection('appUsers').insertOne(appUser);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'An error occured while adding the app user.')
    }

};

// const updateAppUsers = async (req, res) => {
    //#swagger.tags=['App Users']

// };

const deleteAppUser = async (req, res) => {
    // #swagger.tags=['App Users']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json('Must use a valid app user id to find user.');
        }

        const appUserId = new ObjectId(req.params.id);

        const result = await mongodb
            .getVendorDb()
            .collection('appUsers')
            .deleteOne({ _id: appUserId }, true);
        
        if (result.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(result.error || 'An error occurred while deleting the app user.');
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }    
};

module.exports = {
    getAllUsers,
    getSingleUser,
    createAppUser,
    // updateAppUsers,
    deleteAppUser
}