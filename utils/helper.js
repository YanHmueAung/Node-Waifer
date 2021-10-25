const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Redis = require('./redis');

let verifyToken = async req => {
    // console.log(req.headers.authorization);
    let token = req.headers.authorization.split(" ")[1];
    //console.log(token);
    let decode = jwt.verify(token, process.env.SECRET_KEY);
    return await Redis.getObj(decode.id);
    if (redisUser) {
        console.log();
    } else {
        console.log();
    }
    console.log(decode);


}


module.exports = {
    encode: (password) => bcrypt.hashSync(password, 10),
    comparepass: (password, db) => bcrypt.compare(password, db),
    makeToken: payload => jwt.sign(payload, process.env.SECRET_KEY),
    verifyToken
}