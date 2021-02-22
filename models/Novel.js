const mongoose = require('mongoose');

const NovelSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    publisher: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    release_date: {
        type: String,
        required: true
    },
    era: {
        type: String,
        required: true
    },
    timeline: {
        type: String,
        required: true
    },
    book_cover: { 
        type: String,
    }
}, { timestamps: true });

module.exports = mongoose.model('Novels', NovelSchema)