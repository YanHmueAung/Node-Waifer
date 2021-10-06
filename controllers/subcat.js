const DB = require('../models/subcat');
const CatDB = require('../models/category');

let add = async (req, res, next) => {
    let exitSubCat = await DB.findOne({ name: req.body.name });
    if (exitSubCat) {
        res.status(333).send({ 'con': false, msg: 'you already have name', exitSubCat })
    } else {

        let data = new DB({ name: req.body.name, category: req.body.category, image: req.body.filename });
        let result = await data.save();
        let category = await CatDB.findByIdAndUpdate(req.body.category, { $push: { subcat: result._id } });
        res.send({ "con": true, 'msg': "Role Sub Category", result });
    }
}
let all = async (req, res, next) => {
    let result = await DB.find();
    res.send({ "con": true, 'msg': "All Sub Categories ", result });
}
let get = async (req, res, next) => {
    let result = await DB.findById(req.params.id);
    res.send({ "con": true, "msg": "single Sub Category", result });
}
let patch = async (req, res, next) => {
    await DB.findByIdAndUpdate(req.params.id, req.body);
    let result = await DB.findById(req.params.id);
    res.send({ "con": true, "msg": "Update success Sub Category", result });
}
let drop = async (req, res, next) => {
    let subcat = await DB.findById(req.params.id);
    await CatDB.findByIdAndUpdate(subcat.category, { $pull: { "subcat": subcat._id } });

    let result = await DB.findByIdAndDelete(req.params.id);
    res.send({ "con": true, "msg": "Delete Sub Category", result })
}

module.exports = {
    add,
    all,
    get,
    patch,
    drop,
}