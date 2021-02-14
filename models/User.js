const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: [5, "Must be 5-10 chars"],
        maxLength: [10, "Must be 5-10 chars"]
    },
    password: {
        type: String,
        required: true,
        minLength: [6, "Must be 6-10 chars"],
        maxLength: [10, "Must be 6-10 chars"],
    },
    email: {
        type: String,
        required: true,
        unique: true,
    }
});