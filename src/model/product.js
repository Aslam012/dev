const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    image: { type: String },
    category: { type: String },
    size: { type: String },
    price: { type: Number, required: true },
    status: { type: String, default: "Active" },
    is_active: { type: Boolean, default: true },
    is_deleted: { type: Boolean, default: false },
}, {
    timestamps: true
});

module.exports = mongoose.model('product', productSchema);