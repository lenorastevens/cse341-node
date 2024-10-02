const mongodb = require('../db/vendorTrackingDb');
const ObjectId = require('mongodb').ObjectId;

const getAllVendors = async (req, res) => {
    //#swagger.tags=['Vendors']
    const result = await mongodb.getVendorDb().collection('vendors').find();
    result.toArray().then((vendors) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(vendors);
    });


    // mongodb
    //     .getVendorDb()
    //     .collection('vendors')
    //     .find()
    //     .toArray((err, vendors) => {
    //         if (err) {
    //             res.status(400).json({ message:err })
    //         }
    //         res.setHeader('Content-Type', 'application/json');
    //         res.status(200).json(vendors);
    //     });
};

const getSingleVendor = async (req, res) => {
    //#swagger.tags=['Vendors']
    const userId = ObjectId.createFromHexString(req.params.id);
    const result = await mongodb.getVendorDb().collection('vendors').find();
    result.toArray().then((vendors) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(vendors[0]);
    })


    // if (!ObjectId.isValid(req.param.id)) {
    //     res.status(400).json('Must use a valid vendor id to find a vendor.');
    // }  
    // const userId = ObjectId.createFromHexString(req.params.id);
    // mongodb
    //     .getVendorDb()
    //     .collection('vendors')
    //     .find( { _id: userId })
    //     .toArray((err, result) => {
    //         if (err) {
    //             res.status(400).json({ message:err })
    //         }
    //         res.setHeader('Content-Type', 'application/json');
    //         res.status(200).json(result[0]);
    //     });
};

// const createVendor = async (req, res) => {

// };

// const updateVendor = async (req, res) => {

// };

// const deleteVendor = async (req, res) => {
    
// };

module.exports = {
    getAllVendors,
    getSingleVendor
    // createVendor,
    // updateVendor,
    // deleteVendor
}