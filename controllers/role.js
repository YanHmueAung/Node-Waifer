const DB = require('../models/role');

let add = async (req, res, next) => {
    let data = new DB(req.body);
    let result = await data.save();
    res.send({ "con": true, 'msg': "Role role", result });
}
let all = async (req, res, next) => {
    let result = await DB.find().populate('permit');
    res.send({ "con": true, 'msg': "All roles ", result });
}
let get = async (req, res, next) => {
    let result = await DB.findById(req.params.id);
    console.log(result);

    res.send({ "con": true, "msg": "single role", "res": result });
}
let patch = async (req, res, next) => {
    await DB.findByIdAndUpdate(req.params.id, req.body);
    let result = await DB.findById(req.params.id);
    res.send({ "con": true, "msg": "Update success role", result });
}
let drop = async (req, res, next) => {
    let result = await DB.findByIdAndDelete(req.params.id);

    res.send({ "con": true, "msg": "Delete role", result })
}
const addPermit = async (req, res) => {
    const role = await DB.findById(req.body.roleId);
    const index = await role.permits.indexOf(req.body.permitId);
    if (index == -1) {
        const result = await DB.findByIdAndUpdate(req.body.roleId, { $push: { 'permits': req.body.permitId } });
        res.send({ 'con': true, 'msg': 'Role added pemit', index })

    } else {
        res.send({ 'con': true, 'msg': 'Permit already exit', index })
    }
}
const removePermit = async (req, res) => {
    const role = await DB.findById(req.body.roleId);
    const index = await role.permits.indexOf(req.body.permitId);
    if (index == -1) {
        res.send({ 'con': true, 'msg': 'pemit dont have', index })

    } else {
        const result = await DB.findByIdAndUpdate(req.body.roleId, { $pull: { 'permits': req.body.permitId } });
        res.send({ 'con': true, 'msg': 'Permit  exit and delete', index })
    }
}
module.exports = {
    add,
    all,
    get,
    patch,
    drop,
    addPermit,
    removePermit
}