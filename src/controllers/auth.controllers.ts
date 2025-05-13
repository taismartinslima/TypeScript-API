import { Response, Request } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { asyncWrapper } from '#utils/asyncWrapper.js';
import { ErrorResponse } from '#utils/ErrorResponse.js';
import { Server } from '#config/Server.js';
import { User } from '#models/User.js';

export const register = asyncWrapper(async (req: Request, res: Response): Promise<void> => {
    const { firstName, lastName, email, password, isSubscribed } = req.body;

    if (!email || !password) throw new ErrorResponse('Invalid Request: Required fields insufficient.', 400);
    if (isSubscribed === undefined || isSubscribed === null) throw new ErrorResponse('Invalid Request: Required fields insufficient.', 400);

    const entry = await User.findOne({ where: { email } });
    if (entry) throw new ErrorResponse('Invalid Request: User already exists.', 400);

    const user = await User.create({ firstName, lastName, email, password, isSubscribed });
    if (!user) throw new ErrorResponse('Internal Server Error', 500);

    res.status(201).json({ user });
});

export const login = asyncWrapper(async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    if (!email || !password) throw new ErrorResponse('Invalid Request: Required fields insufficient.', 400);

    const user = await User.scope('withPassword').findOne({ where: { email } });
    if (!user) throw new ErrorResponse('Invalid Request: Invalid credentials', 401);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new ErrorResponse('Invalid Request: Invalid credentials', 401);

    if (!user.isVerified) throw new ErrorResponse('Invalid Request: User not verified', 401);

    const claims = {
        id: user.id,
        exp: Math.floor(Date.now() / 1000) + Server.JWT_EXPIRES_IN
    };

    const token = jwt.sign(claims, Server.JWT_SECRET, { algorithm: 'HS256' });
    user.setDataValue('password', undefined);

    res.status(200).json({ user: user, token: token });
});

export const getProfile = asyncWrapper(async (req: Request, res: Response): Promise<void> => {
    const user = await User.findByPk(req.user.id);
    if (!user) throw new ErrorResponse('Invalid Request: User not found.', 404);

    res.status(200).json({ user: user });
});
