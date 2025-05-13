import { Request, Response } from 'express';

import { ErrorResponse } from '#utils/ErrorResponse.js';
import { asyncWrapper } from '#utils/asyncWrapper.js';

export const findAll = asyncWrapper(async (req: Request, res: Response): Promise<void> => {
    const { page, limit, offset } = res.pagination;
    const entries = await req.model.findAndCountAll({
        offset,
        limit,
        order: [['id', 'ASC']]
    });
    if (!entries) throw new ErrorResponse(`Invalid Request: Entries not found.`, 404);

    const totalPages = Math.ceil(entries.count / limit);

    const paginationData = {
        totalEntries: entries.count,
        totalPages,
        currentPage: page > totalPages ? totalPages : page,
        nextPage: page < totalPages ? page + 1 : null,
        previousPage: page > 1 ? page - 1 : null,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1
    };

    res.status(200).json({ ...paginationData, entries: entries.rows });
});

export const findOne = asyncWrapper(async (req: Request, res: Response): Promise<void> => {
    const entry = await req.model.findByPk(req.params.id);
    if (!entry) throw new ErrorResponse(`Invalid Request: Entry not found.`, 404);

    res.status(200).json({ entries: [entry] });
});

export const createOne = asyncWrapper(async (req: Request, res: Response): Promise<void> => {
    const entry = await req.model.create(req.body);
    if (!entry) throw new ErrorResponse(`Invalid Request: Entry not created.`, 400);

    res.status(201).json({ entries: [entry] });
});

export const updateOne = asyncWrapper(async (req: Request, res: Response): Promise<void> => {
    const entry = await req.model.findByPk(req.params.id);
    if (!entry) throw new ErrorResponse(`Invalid Request: Entry not found.`, 404);

    await entry.update(req.body);
    res.status(202).json({ entries: [entry] });
});

export const deleteOne = asyncWrapper(async (req: Request, res: Response): Promise<void> => {
    const entry = await req.model.findByPk(req.params.id);
    if (!entry) throw new ErrorResponse(`Invalid Request: Entry not found.`, 404);

    await entry.destroy();
    res.status(204).json({ entries: null });
});
