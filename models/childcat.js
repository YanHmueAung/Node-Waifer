const mongoose = require('mongoose');
const { Schema } = mongoose;

const ChildcatSchema = new Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    subcat: { type: Schema.Types.ObjectId, ref: 'subcategory' },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now }
})

const Childcat = mongoose.model('childcategory', ChildcatSchema);
module.exports = Childcat;