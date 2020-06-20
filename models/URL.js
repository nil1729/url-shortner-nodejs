const mongoose = require("mongoose");

const URLSchema = new mongoose.Schema({
    longURL: {
        type: String,
        required: true
    },
    shortID: {
        type: String,
        required: true
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    }
});

module.exports = mongoose.model("URL", URLSchema);