const DB = require('../models/permit');
const RoleDB = require('../models/role');

let add = async (req, res, next) => {
    let data = new DB(req.body);
    let result = await data.save();
    await RoleDB.findByIdAndUpdate(req.body.role, { $push: { permits: result._id } });
    res.send({ "con": true, 'msg': "Role permit", result });
}
let all = async (req, res, next) => {
    let result = await DB.find().populate('role');
    res.send({ "con": true, 'msg': "All permits ", result });
}
let get = async (req, res, next) => {
    let result = await DB.fintById(req.params.id);
    res.send({ "con": true, "msg": "single permit", result });
}
let patch = async (req, res, next) => {
    await DB.findByIdAndUpdate(req.params.id, req.body);
    let result = await DB.fintById(req.params.id);
    res.send({ "con": true, "msg": "Update success permit", result });
}
let drop = async (req, res, next) => {
    let result = await DB.findByIdAndDelete(req.params.id);
    res.send({ "con": true, "msg": "Delete permit", result })
}

module.exports = {
    add,
    all,
    get,
    patch,
    drop,
}