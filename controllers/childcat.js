const DB = require('../models/childcat');
const subcatDb = require('../models/subcat')

let add = async (req, res, next) => {
    let exitName = await DB.findOne({ name: req.body.name });
    if (exitName) {
        res.send({ "con": false, "msg": "already exit" })
    } else {
        let data = new DB({ name: req.body.name, image: req.body.filename, subcat: req.body.subcat });
        let result = await data.save();
        await subcatDb.findByIdAndUpdate(req.body.subcat, { $push: { childcats: result._id } })
        res.send({ "con": true, 'msg': "Role childCategory ", result });
    }
}
let all = async (req, res, next) => {
    let result = await DB.find();
    res.send({ "con": true, 'msg': "All child Categories ", result });
}
let get = async (req, res, next) => {
    let result = await DB.findById(req.params.id);
    res.send({ "con": true, "msg": "single childCategory ", result });
}
let patch = async (req, res, next) => {
    await DB.findByIdAndUpdate(req.params.id, req.body);
    let result = await DB.findById(req.params.id);
    res.send({ "con": true, "msg": "Update success childCategory ", result });
}
let drop = async (req, res, next) => {
    //let childcat = await
    let result = await DB.findByIdAndDelete(req.params.id);
    res.send({ "con": true, "msg": "Delete childCategory ", result })
}

module.exports = {
    add,
    all,
    get,
    patch,
    drop,
}