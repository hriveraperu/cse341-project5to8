const Validation = require('validatorjs');
const validation = (body, rules, customMessages, callback) => {
    const valid = new Validation(body, rules, customMessages, callback);
    valid.passes(() => callback(null, true));
    valid.fails(() => callback(valid.errors, false));
};

module.exports = validation;