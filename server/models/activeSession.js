"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const activeSessionSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    tokenExpiry: {
        type: Number,
        required: true,
    },
});
const activeSession = mongoose.model("ActiveSession", activeSessionSchema);
module.exports = activeSession;
