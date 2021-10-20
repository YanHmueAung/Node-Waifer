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
        }),
        "addRole": Joi.object({
            "userid": Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            "roleid": Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        }),
        "addPermit": Joi.object({
            "userid": Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            "permitid": Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        })

    },
    "AllSchema": {
        "id": Joi.object({
            "id": Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        })
    }, "category": {
        "create": Joi.object({
            "name": Joi.string().required(),
            "image": Joi.any().required(),
            //"phone": Joi.string().min(3).max(11).required(),
            //"password": Joi.string().min(3).max(20).required(),
        })
    }, "subcategory": {
        "create": Joi.object({
            "name": Joi.string().required(),
            "category": Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        })
    }, "childcategory": {
        "create": Joi.object({
            "name": Joi.string().required(),
            "subcat": Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        })
    }, "product": {
        "create": Joi.object({
            "name": Joi.string().required(),
            "price": Joi.string().required(),
            "brand": Joi.string().required(),
            "catid": Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            "subcatid": Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            "childcatid": Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        })
    }, "role": {
        "create": Joi.object({
            "name": Joi.string().required(),
        }),
        "roleAddPermit": Joi.object({
            "roleid": Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            "permitid": Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        })
    }, "permit": {
        "create": Joi.object({
            "name": Joi.string().required(),
        })
    }
}
module.exports = Schema;
