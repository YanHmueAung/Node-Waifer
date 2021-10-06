const mongoose = require('mongoose');
const { Schema } = mongoose;

const SubcatSchema = new Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    category: [{ type: Schema.Types.ObjectId, ref: 'category' }],
    childcats: [{ type: Schema.Types.ObjectId, ref: 'childcategory' }],
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now }
})

const Subcat = mongoose.model('subcategory', SubcatSchema);
module.exports = Subcat;