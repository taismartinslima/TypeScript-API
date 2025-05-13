import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';

import { connection } from '#db/db.js';
import { errorHandler } from '#middlewares/errorHandler.middleware.js';
import { Server } from '#config/Server.js';
import router from '#routes/index.routes.js';

const app: express.Application = express();
const isProduction: boolean = Server.NODE_ENV === 'production';

app.disable('x-powered-by')
    .use(bodyParser.urlencoded({ extended: true }))
    .use(express.json())
    .use(cors())
    .use(express.static('public'));

if (!isProduction) {
    app.use(morgan('dev'));
    console.log('\x1b[33m%s\x1b[0m', 'Running in development mode, not for production.');
} else {
    app.use(morgan('common'));
    console.log('\x1b[32m%s\x1b[0m', 'Running in production mode, please be careful.');
}

app.use('/api', router);
app.use(errorHandler);

app.get('/', async (req: Request, res: Response): Promise<void> => {
    res.status(418).json({ message: 'I am a teapot' });
});

const startAPI = async (): Promise<void> => {
    try {
        await connection.sync({ force: false });
        app.listen(Server.NODE_PORT, () => {
            console.log(`Application running on ${Server.NODE_HOST}:${Server.NODE_PORT}`);
        });
    } catch (error) {
        console.error('\x1b[31m%s\x1b[0m', error);
        process.exit(1);
    }
};

void startAPI();
