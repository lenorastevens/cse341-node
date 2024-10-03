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
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid app user id to find a user.');
    }

    try {
        const appUserId = ObjectId.createFromHexString(req.params.id);

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

const updateAppUser = async (req, res) => {
    //#swagger.tags=['App Users']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid app user id to find user.');
    }

    try {
        const appUserId = ObjectId.createFromHexString(req.params.id);

        const appUser = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone
        };

        const result = await mongodb
            .getVendorDb()
            .collection('appUsers')
            .replaceOne({ _id: appUserId }, appUser);

        if (result.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(result.error || 'An error occurred while updating the app user.');
        }

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

};

const deleteAppUser = async (req, res) => {
    // #swagger.tags=['App Users']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid app user id to find user.');
    }
    
    try {
        const appUserId = ObjectId.createFromHexString(req.params.id);

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
    updateAppUser,
    deleteAppUser
}