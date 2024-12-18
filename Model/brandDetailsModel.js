const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    heading: {
        type: String,
        required: true
    }
});

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
        type: [imageSchema],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("BrandDetails", brandDetailsSchema);