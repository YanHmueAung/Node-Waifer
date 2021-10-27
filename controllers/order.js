const DB = require('../models/order');
const ProductDB = require('../models/product');
const OrderItemDB = require('../models/orderItem');

let add = async (req, res, next) => {
    // let existName = await DB.findOne({ name: req.body.name })
    // if (existName) {
    //     res.status(310).send({ 'con': false, msg: 'category Exist', existName });
    // } else {
    // console.log('REq.body', req.body);
    let data = new DB(req.body);
    // console.log('DATA', data);
    let OrderObj = {
        count: req.body.items.length,
        user: req.body.user.id,
        status: true,
        total: 1900,

    }
    let dbOrderResult = await new DB(OrderObj).save();
    let itemsTotal = 0;
    for (let item of req.body.items) {
        let product = await ProductDB.findById(item.id);
        let orderItem = {
            order: dbOrderResult._id,
            count: item.count,
            product: product._id,
            name: product.name,
            images: product.images,
            price: product.price,
            discount: product.discount,
            status: true
        }
        itemsTotal += (item.count * product.price) - product.discount;
        let orderItemResult = await new OrderItemDB(orderItem).save();

        await DB.findByIdAndUpdate(dbOrderResult._id, { $push: { items: orderItemResult._id } });
    }
    await DB.findByIdAndUpdate(dbOrderResult._id, { total: itemsTotal });
    let result = await DB.findById(dbOrderResult._id)

    res.send({ "con": true, 'msg': "Role category", "data": result });

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
let getMyOrder = async (req, res, next) => {
    let result = await DB.find({ user: req.body.user.id }).populate("items");
    res.send({ "con": true, "msg": "get success order", result });
}

module.exports = {
    add,
    all,
    get,
    patch,
    drop,
    getMyOrder
}