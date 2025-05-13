import { Request, Response, NextFunction } from 'express';

export const paginationMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const page: number = parseInt(req.query.page as string) || 1;
    const limit: number = parseInt(req.query.limit as string) || 10;
    const offset: number = (page - 1) * limit;

    res.pagination = { page, limit, offset };
    next();
};
