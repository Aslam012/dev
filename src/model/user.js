const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: { type: String,  },
    email: { type: String, },
    password: { type: String, },
    role: { type: String, default: "Public" },
    is_active: { type: Boolean, default: true },
    is_deleted: { type: Boolean, default: false },
}, {
    timestamps: true
});

module.exports = mongoose.model('user', userSchema);