const DB = require('../models/order');

let add = async (req, res, next) => {
    // let existName = await DB.findOne({ name: req.body.name })
    // if (existName) {
    //     res.status(310).send({ 'con': false, msg: 'category Exist', existName });
    // } else {
    console.log(req.body);
    let data = new DB(req.body);
    console.log(data);
    let OrderObj = {
        count: req.body.items.length

        // user: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
        // total: { type: Number, required: true },
        // status: { type: Boolean, required: true },
        // items: [{ type: Schema.Types.ObjectId, required: true, ref: 'orderItem' }],
    }

    res.send({ "con": true, 'msg': "Role category", "data": OrderObj });

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