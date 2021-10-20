const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    brand: { type: String, required: true },
    images: [{ type: String, required: true }],
    catid: { type: Schema.ObjectId, ref: 'category' },
    subcatid: { type: Schema.ObjectId, ref: 'subcategory' },
    childcatid: { type: Schema.ObjectId, ref: 'childcategory' },
    discount: { type: Number, default: 0 },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now }
})

const Product = mongoose.model('product', ProductSchema);
module.exports = Product;