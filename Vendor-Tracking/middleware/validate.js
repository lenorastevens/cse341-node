const validator = require('../helpers/validate');
const saveVendor = (req, res, next) => {
    const validationRule = {
        vendorName: "required|string",
        contact: "required|string",
        position: "required|string",
        contactPhone: "required|string",
        contactEmail: "required|string|email",
        streetAddress: "required|string",
        city: "required|string",
        state: "required|string",
        zipCode: "required|int32",
        notes: "string"
    };

   validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    });
};
module.exports = {
    saveVendor
};