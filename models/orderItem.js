const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderItemSchema = new Schema({
    count: { type: Number, required: true },
    order: { type: Schema.Types.ObjectId, required: true, ref: 'order' },
    product: { type: Schema.Types.ObjectId, required: true, ref: 'product' },
    name: { type: String, required: true },
    images: { type: Array, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    status: { type: Boolean, required: true },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now }
})

const OrderItem = mongoose.model('orderItem', OrderItemSchema);
module.exports = OrderItem;