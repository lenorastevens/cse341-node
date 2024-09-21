const mongodb = require('../data/contactsDb');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
    const result = await mongodb.getContactsData().collection('contacts').find();
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    });
};

const getSingle = async (req, res) => {
    const userId = ObjectId.createFromHexString(req.params.id);
    const result = await mongodb.getContactsData().collection('contacts').findOne({ _id: userId });
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts[0]);
    });
};

module.exports = { getAll, getSingle };