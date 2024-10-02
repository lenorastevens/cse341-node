const mongodb = require('../db/vendorTrackingDb');
const ObjectId = require('mongodb').ObjectId;

const getAllVendors = async (req, res) => {
    //#swagger.tags=['Vendors']
    // const result = await mongodb.getVendorDb().collection('vendors').find();
    // result.toArray().then((vendors) => {
    //     res.setHeader('Content-Type', 'application/json');
    //     res.status(200).json(vendors);
    // });


    mongodb
        .getVendorDb()
        .collection('vendors')
        .find()
        .toArray((err, vendors) => {
            if (err) {
                res.status(400).json({message:err});
            }
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(vendors);
        });
};

const getSingleVendor = async (req, res) => {
    //#swagger.tags=['Vendors']
    // const userId = ObjectId.createFromHexString(req.params.id);
    // const result = await mongodb.getVendorDb().collection('vendors').find();
    // result.toArray().then((vendors) => {
    //     res.setHeader('Content-Type', 'application/json');
    //     res.status(200).json(vendors[0]);
    // });


    if (!ObjectId.isValid(req.param.id)) {
        res.status(400).json('Must use a valid vendor id to find a vendor.');
    }  
    const userId = ObjectId.createFromHexString(req.params.id);
    mongodb
        .getVendorDb()
        .collection('vendors')
        .find( { _id: userId })
        .toArray((err, result) => {
            if (err) {
                res.status(400).json({ message:err })
            }
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(result[0]);
        });
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
        res.status(500).json(response.error || 'Some error occured while updating the vendor.');
    }
};

// const updateVendor = async (req, res) => {

// };

// const deleteVendor = async (req, res) => {
    
// };

module.exports = {
    getAllVendors,
    getSingleVendor,
    createVendor
    // updateVendor,
    // deleteVendor
}