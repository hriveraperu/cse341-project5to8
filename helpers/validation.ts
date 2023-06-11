import Validator from 'validatorjs';
const validation = (body: any, rules: any, customMessages: any, callback: (error: any, isValid: boolean) => void) => {
    const valid = new Validator(body, rules, customMessages);
    valid.passes(() => callback(null, true));
    valid.fails(() => callback(valid.errors, false));
};

export default validation;