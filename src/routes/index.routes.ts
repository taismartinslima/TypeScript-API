import express, { Router } from 'express';

import { dynamicModelMiddleware } from '#middlewares/dynamic.middleware.js';
import { paginationMiddleware } from '#middlewares/pagination.middleware.js';
import { authenticate, authorize } from '#middlewares/auth.middleware.js';
import { validateRequest } from '#middlewares/validation.middleware.js';
import { createOne, findAll, findOne, updateOne, deleteOne } from '#controllers/dynamic.controllers.js';
import authRouter from '#routes/auth.routes.js';

const router: Router = express.Router();

router.use('/auth', authRouter);
router.use('/:model', dynamicModelMiddleware);

router.route('/:model').get(paginationMiddleware, findAll).post(authenticate, authorize, validateRequest, createOne);

router
    .route('/:model/:id')
    .get(findOne)
    .put(authenticate, authorize, validateRequest, updateOne)
    .delete(authenticate, authorize, deleteOne);

export default router;
