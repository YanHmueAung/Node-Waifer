const Joi = require('joi');

const Schema = {
    "user": {
        "register": Joi.object({
            "name": Joi.string().required(),
            "email": Joi.string().email().required(),
            "phone": Joi.string().min(3).max(11).required(),
            "password": Joi.string().min(3).max(20).required(),
        }),
        "login": Joi.object({
            "email": Joi.string().email().required(),
            "phone": Joi.string().min(3).max(11).required()
        })

    },
    "AllSchema": {
        "id": Joi.object({
            "id": Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        })
    }
}
module.exports = Schema;
