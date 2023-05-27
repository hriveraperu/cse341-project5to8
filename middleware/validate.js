const validation = require('../helpers/validate');

const saveContact = (req, res, next) => {
    const validationRule = {
        firstName: 'required|string',
        lastName: 'required|string',
        phone: 'required|string',
        email: 'required|email',
        address: 'required|string',
        city: 'required|string',
        country: 'required|string',
        website: 'required|string',
    };
    validation(req.body, validationRule, {}, (err,status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed, try again',
                data: err
            });
        } else {
            next();
        }
    });
};

module.exports = {
    saveContact
};

