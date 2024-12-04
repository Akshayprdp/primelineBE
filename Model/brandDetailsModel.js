const mongoose = require('mongoose');

const brandDetailsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    tagline: {
        type: String,
        required: true
    },
    missionStatement: {
        type: String,
        required: true
    },
    coreValues: {
        type: [String],
        required: true
    },
    logo: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("BrandDetails", brandDetailsSchema);