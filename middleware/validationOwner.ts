import { Request, Response, NextFunction } from 'express';
import validation2 from '../helpers/validation2';

const saveOwner = (req: Request, res: Response, next: NextFunction) => {
    const validationRule = {
        firstName: 'required|string',
        lastName: 'required|string',
        position: 'required|string',
        area: 'required|string'        
    };
    validation2(req.body, validationRule, {}, (err: any, status: boolean) => {
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

export default saveOwner;