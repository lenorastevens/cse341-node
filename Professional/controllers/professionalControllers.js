const mongodb = require('../data/professionalsDb');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
    const result = await mongodb.getProfessionalData().collection('professional').find();
    result.toArray().then((professionals) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(professionals);
    });
};

const getSingle = async (req, res) => {
    const userId = ObjectId.createFromHexString(req.params.id);
    const result = await mongodb.getProfessionalData().collection('professional').find({ _id: userId });
    result.toArray().then((professionals) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(professionals[0]);
    });
};

module.exports = { getAll, getSingle };