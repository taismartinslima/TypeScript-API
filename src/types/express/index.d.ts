declare namespace Express {
    export interface Request {
        model: import('sequelize').ModelStatic<import('sequelize').Model<any, any>>;
        user: {
            id: number;
        };
    }
    export interface Response {
        pagination: {
            page: number;
            limit: number;
            offset: number;
        };
    }
}
