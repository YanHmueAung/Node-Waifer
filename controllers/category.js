const DB = require('../models/category');

let add = async (req, res, next) => {
    let existName = await DB.findOne({ name: req.body.name })
    if (existName) {
        res.status(310).send({ 'con': false, msg: 'category Exist', existName });
    } else {
        let data = new DB(req.body);
        let result = await data.save();
        res.send({ "con": true, 'msg': "Role category", result });
    }
}
let all = async (req, res, next) => {
    let result = await DB.find().populate({
        path: 'subcat',
        model: 'subcategory',
        populate: {
            path: 'childcats',
            model: 'childcategory'
        }
    });
    res.send({ "con": true, 'msg': "All categories ", result });
}
let get = async (req, res, next) => {
    let result = await DB.findById(req.params.id);
    res.send({ "con": true, "msg": "single category", result });
}
let patch = async (req, res, next) => {
    await DB.findByIdAndUpdate(req.params.id, req.body);
    let result = await DB.findById(req.params.id);
    res.send({ "con": true, "msg": "Update success category", result });
}
let drop = async (req, res, next) => {
    let result = await DB.findByIdAndDelete(req.params.id);
    res.send({ "con": true, "msg": "Delete category", result })
}

module.exports = {
    add,
    all,
    get,
    patch,
    drop,
}