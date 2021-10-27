const DB = require('../models/product');
const subcatDb = require('../models/subcat')

let add = async (req, res, next) => {
    let exitName = await DB.findOne({ name: req.body.name });
    if (exitName) {
        res.send({ "con": false, "msg": "already exit" })
    } else {
        let data = new DB(req.body);
        let result = await data.save();
        await subcatDb.findByIdAndUpdate(req.body.subcat, { $push: { childcats: result._id } })
        res.send({ "con": true, 'msg': "Role prodcut ", result });
    }
}
let all = async (req, res, next) => {
    let result = await DB.find().populate('catid').populate('subcatid').populate('childcatid');
    res.send({ "con": true, 'msg': "All prodcuts ", result });
}
let get = async (req, res, next) => {
    let result = await DB.findById(req.params.id);
    res.send({ "con": true, "msg": "single prodcut ", result });
}
let patch = async (req, res, next) => {
    await DB.findByIdAndUpdate(req.params.id, req.body);
    let result = await DB.findById(req.params.id);
    res.send({ "con": true, "msg": "Update success prodcut ", result });
}
let drop = async (req, res, next) => {
    let childcat = await DB.findById(req.params.id);
    await subcatDb.findByIdAndUpdate(childcat.subcat, { $pull: { childcats: childcat._id } })
    let result = await DB.findByIdAndDelete(req.params.id);
    res.send({ "con": true, "msg": "Delete prodcut ", result })
}
let paginate = async (req, res, next) => {
    let page = req.params.page;
    // let skipCount = Number(page) ==1?0:(Number(page)-1)*process.env.LIMIT;
    // let result = await DB.find().skip(skipCount).limit(Number(process.env.LIMIT));

    let skipCount = Number(page) * Number(process.env.LIMIT);
    let result = await DB.find().skip(skipCount - Number(process.env.LIMIT)).limit(Number(process.env.LIMIT));
    res.send({ con: true, 'msg': 'Single Product', result });
}

module.exports = {
    add,
    all,
    get,
    patch,
    drop,
    paginate
}