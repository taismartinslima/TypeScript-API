import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { ErrorResponse } from '#utils/ErrorResponse.js';
import { asyncWrapper } from '#utils/asyncWrapper.js';
import { Server } from '#config/Server.js';
import { User } from '#models/User.js';

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) throw new ErrorResponse('Invalid Request: Unauthorized.', 401);

    jwt.verify(token, Server.JWT_SECRET, (err, decoded) => {
        if (err) throw new ErrorResponse('Invalid Request: Unauthorized.', 401);

        req.user = decoded as { id: number };
        next();
    });
};

export const authorize = asyncWrapper(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (!user) throw new ErrorResponse('Invalid Request: Unauthorized.', 401);
    if (user.hasPermission !== 'ADMIN') throw new ErrorResponse('Invalid Request: Unauthorized.', 401);
    next();
});
