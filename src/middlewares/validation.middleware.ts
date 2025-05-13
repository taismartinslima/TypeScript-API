import { NextFunction, Request, Response } from 'express';
import { ObjectSchema } from 'joi';

import { ErrorResponse } from '#utils/ErrorResponse.js';
import userSchema from '#schemas/user.schema.js';

export const validateUser = (req: Request, res: Response, next: NextFunction): void => {
    const { error } = userSchema.POST.validate(req.body);
    if (error) return next(new ErrorResponse(error.details[0].message, 400));
    next();
};

export const validateRequest = (req: Request, res: Response, next: NextFunction): void => {
    const {
        params: { model },
        method
    } = req;
    let schema: ObjectSchema<any>;

    switch (model) {
        case 'users':
            schema = userSchema[method as keyof typeof userSchema];
            break;
        default:
            return next(new ErrorResponse(`Invalid Request: Model not found.`, 404));
    }

    const { error } = schema.validate(req.body);
    if (error) return next(new ErrorResponse(error.details[0].message, 400));

    next();
};
