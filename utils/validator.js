const jwt = require('jsonwebtoken');
const helper = require('./helper')
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
            res.send({ 'con': "no arer token" })
        } else {
            let authenticated = await helper.verifyToken(req);
            if (authenticated) {
                next();
            } else {
                res.send({ "msg": "auth Error" })
            }
            res.send({ "token": token });
        }
        res.send({ "msg": req.headers })
    }
}
const validateParam = (Schema, name) => {

    return (req, res, next) => {
        let result = Schema.validate({ id: req['params'][name] });
        if (result.error) res.send({ "msg": false, "message": result.error.details[0].message });
        else next();
    }
}
module.exports = { validator, validateToken, validateParam };