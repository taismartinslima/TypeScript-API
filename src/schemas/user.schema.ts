import Joi from 'joi';

const schema = {
    POST: Joi.object({
        firstName: Joi.string().allow(null).default(null).min(2).max(50).optional(),
        lastName: Joi.string().allow(null).default(null).min(2).max(50).optional(),
        email: Joi.string().email({ minDomainSegments: 2 }).required(),
        password: Joi.string().min(8).max(50).required(),
        isVerified: Joi.boolean().allow(null).default(false).optional(),
        isSubscribed: Joi.boolean().allow(null).default(false).optional(),
        isActive: Joi.boolean().allow(null).default(false).optional(),
        hasPermission: Joi.string().valid('ADMIN', 'USER').allow(null).default('USER').optional()
    }).options({ abortEarly: false }),
    PUT: Joi.object({
        firstName: Joi.string().allow(null).default(null).min(2).max(50).optional(),
        lastName: Joi.string().allow(null).default(null).min(2).max(50).optional(),
        email: Joi.string().email({ minDomainSegments: 2 }).optional(),
        password: Joi.string().min(8).max(50).optional(),
        isVerified: Joi.boolean().allow(null).default(false).optional(),
        isSubscribed: Joi.boolean().allow(null).default(false).optional(),
        isActive: Joi.boolean().allow(null).default(false).optional(),
        hasPermission: Joi.string().valid('ADMIN', 'USER').allow(null).default('USER').optional()
    }).options({ abortEarly: false })
};

export default schema;
