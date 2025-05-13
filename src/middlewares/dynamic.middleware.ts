import { Request, Response, NextFunction } from 'express';

import { ErrorResponse } from '#utils/ErrorResponse.js';
import { connection } from '#db/db.js';

export const dynamicModelMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    let modelName = `${req.params.model.charAt(0).toUpperCase()}${req.params.model.slice(1, -1)}`;
    const model = connection.models[modelName];

    if (!model) throw new ErrorResponse(`Invalid Request: Model not found.`, 404);

    req.model = model;
    next();
};
