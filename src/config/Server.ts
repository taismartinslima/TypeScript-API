import { Dialect } from 'sequelize';

interface ServerConfig {
    DB_DIALECT: Dialect;
    DB_HOST: string;
    DB_PORT: number;
    DB_NAME: string;
    DB_USER: string;
    DB_PASSWORD: string;
    NODE_ENV: string;
    NODE_PORT: number;
    NODE_HOST: string;
    JWT_SECRET: string;
    JWT_EXPIRES_IN: number;
}

export const Server: ServerConfig = {
    DB_DIALECT: process.env.DB_DIALECT as Dialect,
    DB_HOST: process.env.DB_HOST as string,
    DB_PORT: Number(process.env.DB_PORT),
    DB_NAME: process.env.DB_NAME as string,
    DB_USER: process.env.DB_USER as string,
    DB_PASSWORD: process.env.DB_PASSWORD as string,
    NODE_ENV: process.env.NODE_ENV as string,
    NODE_PORT: Number(process.env.NODE_PORT),
    NODE_HOST: process.env.NODE_HOST as string,
    JWT_SECRET: process.env.JWT_SECRET as string,
    JWT_EXPIRES_IN: Number(process.env.JWT_EXPIRES_IN)
};
