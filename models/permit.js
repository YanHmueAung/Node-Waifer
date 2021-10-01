const mongoose = require('mongoose');
const { Schema } = mongoose;

const PermitSchema = new Schema({
    name: { type: String, required: true },
    role: { type: Schema.Types.ObjectId, ref: 'role' },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now }
})

const Permit = mongoose.model('permit', PermitSchema);
module.exports = Permit;