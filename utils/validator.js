const jwt = require('jsonwebtoken');
const helper = require('./helper');
const UserController = require('../controllers/user')
const validator = (Schema) => {
    return (req, res, next) => {
        const result = Schema.validate(req.body);
        if (result.error) res.send({ "msg": false, "message": result.error.details[0].message });
        else next();
    }
}

const validateToken = () => {
    return async (req, res, next) => {
        if (!req.headers.authorization) {
            res.send({ 'con': "no barer token" })
        } else {
            let redisUser = await helper.verifyToken(req);
            console.log('redisUser', redisUser)
            req.body["user"] = redisUser;
            if (redisUser) {
                next();
            } else {
                res.send({ "msg": "auth Error" })
            }
            //res.send({ "token": token });
        }
        //res.send({ "msg": req.headers })
    }
}
const validateParam = (Schema, name) => {

    return (req, res, next) => {
        let result = Schema.validate({ id: req['params'][name] });
        if (result.error) res.send({ "msg": false, "message": result.error.details[0].message });
        else next();
    }
}
const validatePage = (Schema, name) => {

    return (req, res, next) => {
        let result = Schema.validate({ page: req['params'][name] });
        if (result.error) res.send({ "msg": false, "message": result.error.details[0].message });
        else next();
    }
}
const validateRole = (roleName) => {
    return async (req, res, next) => {
        let authenticated = await helper.verifyToken(req);
        if (authenticated) {
            let bol = await UserController.hasRoleByName(authenticated._id, roleName);
            if (bol) next();
            else res.send({ "msg": "auth Error" })
        } else {
            res.send({ "msg": "auth Error" })
        }
    }

}
const validatePermit = (permitName) => {
    return async (req, res, next) => {
        let authenticated = await helper.verifyToken(req);
        if (authenticated) {
            let bol = await UserController.hasPermitByName(authenticated._id, permitName);
            if (bol) next();
            else res.send({ "msg": "auth Error" })
        } else {
            res.send({ "msg": "auth Error" })
        }
    }

}
module.exports = { validator, validateToken, validateParam, validateRole, validatePage };