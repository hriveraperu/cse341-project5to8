import { Request, Response, NextFunction } from 'express';
import validation from '../helpers/validation';

const saveContact = (req: Request, res: Response, next: NextFunction) => {
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
    validation(req.body, validationRule, {}, (err: any,status: boolean) => {
        if (!status) {
            res.status(412).json({
                success: false,
                message: 'Validation failed, try again',
                data: err
            });
        } else {
            next();
        }
    });
};

export {
    saveContact
};