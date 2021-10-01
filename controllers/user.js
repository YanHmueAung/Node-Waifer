const DB = require('../models/user');
const Helper = require('../utils/helper');
const Redis = require('../utils/redis');

const register = async (req, res) => {
    const emailUser = await DB.findOne({ email: req.body.email });
    console.log(emailUser);
    if (emailUser) {
        res.send({ 'con': true, 'msg': "email already " })
    } else {
        const phoneUser = await DB.findOne({ phone: req.body.phone });
        if (phoneUser) {
            res.send({ 'con': true, "msg": "phone already", })
        } else {

            req.body.password = Helper.encode(req.body.password);
            const result = await new DB(req.body);
            const user = await result.save();
            res.send({ 'con': true, "msg": "Register User", "req": req.body });
        }
    }
}
const login = async (req, res) => {
    const phoneUser = await DB.findOne({ phone: req.body.phone });
    console.log(phoneUser);
    if (phoneUser) {
        const result = await Helper.comparepass(req.body.password, phoneUser.password);
        console.log(result);
        if (result) {
            const user = {
                "id": phoneUser.id,
                "name": phoneUser.name,
                "password": phoneUser.password,
                "token": ""
            }
            const usertoken = Helper.makeToken(user);
            user.token = usertoken;
            await Redis.setObj(user.id, user);
            res.send({ "msg": "we are good", user })
        } else {
            res.send({ "msg": " wrong password" })
        }
    } else {
        res.send({ 'con': true, "msg": "can not login", })
    }
}
const addRole = async (req, res) => {
    let user = await DB.findById(req.body.userId);
    const roles = user.roles;
    const index = await roles.indexOf(req.body.roleId);
    if (index == -1) {
        await DB.findByIdAndUpdate(req.body.userId, { $push: { roles: req.body.roleId } });
        res.send({ "con": true });
    } else {
        res.send({ "msg": "role already exit" });
    }
}
const removeRole = async (req, res) => {
    let user = await DB.findById(req.body.userId);
    const roles = user.roles;
    const index = await roles.indexOf(req.body.roleId);
    if (index == -1) {
        res.send({ "con": "you cant delete" });
    } else {
        await DB.findByIdAndUpdate(req.body.userId, { $pull: { roles: req.body.roleId } });
        res.send({ "msg": true });
    }
}
const addPermit = async (req, res) => {
    let user = await DB.findById(req.body.userId);
    const permits = user.permits;
    const index = await permits.indexOf(req.body.permitId);
    if (index == -1) {
        await DB.findByIdAndUpdate(req.body.userId, { $push: { permits: req.body.permitId } });
        res.send({ "con": true });
    } else {
        res.send({ "msg": "permit already exit" });
    }
}
const removePermit = async (req, res) => {
    let user = await DB.findById(req.body.userId);
    const permits = user.permits;
    const index = await permits.indexOf(req.body.permitId);
    if (index == -1) {
        res.send({ "con": "you cant delete" });
    } else {
        await DB.findByIdAndUpdate(req.body.userId, { $pull: { permits: req.body.permitId } });
        res.send({ "msg": true });
    }
}
let add = async (req, res, next) => {
    let data = new DB(req.body);
    let result = await data.save();
    res.send({ "con": true, 'msg': "Role user", result });
}
let all = async (req, res, next) => {
    let result = await DB.find().populate('roles').populate('permits');
    res.send({ "con": true, 'msg': "All users ", result });
}
let get = async (req, res, next) => {
    let result = await DB.fintById(req.params.id);
    res.send({ "con": true, "msg": "single user", result });
}
let patch = async (req, res, next) => {
    await DB.findByIdAndUpdate(req.params.id, req.body);
    let result = await DB.fintById(req.params.id);
    res.send({ "con": true, "msg": "Update success user", result });
}
let drop = async (req, res, next) => {
    let result = await DB.findByIdAndDelete(req.params.id);
    res.send({ "con": true, "msg": "Delete user", result })
}
const hasRole = async (userId, checkRoleId) => {
    const user = await DB.findByIdAndUpdate(userId).populate('roles');
    const foundRole = user.roles.find((role) => role._id == checkRoleId);
    if (foundRole) return true;
    return false;
}
const hasPermit = async (req, res) => {

    const permitId = '615422353a8c772d6cad021b';
    //const permitId = '615528c79d737257b80f42cd';
    const userId = '61543c3dc8045f393417ea83';
    const user = await DB.findByIdAndUpdate(userId).populate('permits');
    const foundfirstPermit = await user.permits.find(permit => permit._id == permitId);
    if (foundfirstPermit) {
        console.log('wefound in permits')
        res.send({ "con": true, "msg": "good", foundfirstPermit })
    } else {
        const roleUser = await DB.findByIdAndUpdate(userId).populate('roles');
        const permits = []
        await roleUser.roles.map(role => role.permits.forEach(permit => permits.push(permit)));
        const foundPermit = permits.find(e => e == permitId)
        res.send({ "con": true, "msg": "good", foundPermit, permits, permitId })
    }
    // const foundPermit = user.permits.find((permit) => permit._id == checkPermitId);
    // if (foundPermit) return true;
    // return false;
}


module.exports = {
    add,
    all,
    get,
    patch,
    drop,
    login,
    register,
    addRole,
    removeRole,
    addPermit,
    removePermit,
    hasRole,
    hasPermit
}