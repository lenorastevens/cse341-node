const validator = require('../helpers/validate');

const saveVendor = (req, res, next) => {
    const validationRule = {
        vendorName: "required|string|max:100",
        contact: "required|string|max:50",
        position: "required|string|max:50",
        contactPhone: "required|string|max:15",
        contactEmail: "required|string|email|max:100",
        streetAddress: "required|string|max:100",
        city: "required|string|max:50",
        stateCode: "required|string|max:2",
        zipCode: "required|integer|digits:5",
        notes: "string|max:300"
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

const saveAppUser = (req, res, next) => {
    const validationRule = {
        firstName: "required|string|max:50",
        lastName: "required|string:max:50",
        email: "required|string|email|max:100",
        phone: "required|string|max:15"
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
}

module.exports = {
    saveVendor,
    saveAppUser
};