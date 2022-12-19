const mongoose = require("mongoose");

const dummySchema = mongoose.Schema({}, {
    timestamps: true
});

module.exports = mongoose.model('dummy', dummySchema);