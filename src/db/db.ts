import { Sequelize } from 'sequelize-typescript';

import { Server } from '#config/Server.js';
import { User } from '#models/User.js';

export const connection = new Sequelize({
    dialect: Server.DB_DIALECT,
    database: Server.DB_NAME,
    username: Server.DB_USER,
    password: Server.DB_PASSWORD,
    host: Server.DB_HOST,
    port: Server.DB_PORT,
    models: [User],
    logging: (message) => {
        if (Server.NODE_ENV === 'production') {
            console.log(message);
        }
    }
});
