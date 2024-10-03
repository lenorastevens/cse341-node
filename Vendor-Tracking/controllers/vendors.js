const { response } = require('express');
const mongodb = require('../db/vendorTrackingDb');
const ObjectId = require('mongodb').ObjectId;

const getAllVendors = async (req, res) => {
    //#swagger.tags=['Vendors']
    try {
        const vendors = await mongodb
            .getVendorDb()
            .collection('vendors')
            .find()
            .toArray();
        
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(vendors);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getSingleVendor = async (req, res) => {
    //#swagger.tags=['Vendors']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json('Must use a valid vendor id to find a vendor.');
        }  

        const vendorId = new ObjectId(req.params.id);

        const vendor = await mongodb
            .getVendorDb()
            .collection('vendors')
            .findOne({ _id: vendorId });

        if (!vendor) {
            return res.status(404).json('Vendor not found.');
        }        

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(vendor);

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }    
};

const createVendor = async (req, res) => {
    //#swagger.tags=['Vendors']
    const vendor = {
        vendorName: req.body.vendorName,
        contact: req.body.contact,
        position: req.body.position,
        contactPhone: req.body.contactPhone,
        contactEmail: req.body.contactEmail,
        streetAddress: req.body.streetAddress,
        city: req.body.city,
        state: req.body.state,
        zipCode: req.body.zipCode,
        notes: req.body.notes
    };
    const response = await mongodb.getVendorDb().collection('vendors').insertOne(vendor);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'Some error occured while adding the vendor.');
    }
};

const updateVendor = async (req, res) => {
    //#swagger.tags=['Vendors']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json('Must use a valid vendor id to find a vendor.');
        }
        
        const vendorId = new ObjectId(req.params.id);

        const vendor = {
            vendorName: req.body.vendorName,
            contact: req.body.contact,
            position: req.body.position,
            contactPhone: req.body.contactPhone,
            contactEmail: req.body.contactEmail,
            streetAddress: req.body.streetAddress,
            city: req.body.city,
            state: req.body.state,
            zipCode: req.body.zipCode,
            notes: req.body.notes
        };

        const result = await mongodb
            .getVendorDb()
            .collection('vendors')
            .replaceOne({ _id: vendorId }, vendor);
        console.log(result);
        if (result.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(result.error || 'An error occurred while updating the vendor.');
        }

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

};

const deleteVendor = async (req, res) => {
    //#swagger.tags=['Vendors']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json('Must use a valid vendor id to find a vendor.');
        }
        
        const vendorId = new ObjectId(req.params.id);

        const result = await mongodb
            .getVendorDb()
            .collection('vendors')
            .deleteOne({ _id: vendorId }, true);

        if (result.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(result.error || 'An error occurred while deleting the vendor.');
        }     
    } catch (err) {
        return res.status(500).json({ message: err.message });
    } 
};

module.exports = {
    getAllVendors,
    getSingleVendor,
    createVendor,
    updateVendor,
    deleteVendor
}