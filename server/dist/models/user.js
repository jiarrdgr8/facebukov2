"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
var userSchema = new mongoose.Schema({
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    avatar: {
        type: String,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    location: {
        type: String,
    },
    occupation: {
        type: String,
    },
    profileViews: {
        type: Number,
        default: getRandomInt(500, 2000),
    },
    impressions: {
        type: Number,
        default: getRandomInt(2000, 5000),
    },
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    post: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
        },
    ],
    accountVerification: {
        type: Boolean,
        default: false,
    },
    resetPass: {
        type: Boolean,
        default: false,
    },
    date_created: {
        type: Date,
        default: Date.now,
    },
});
module.exports = mongoose.model("User", userSchema);
