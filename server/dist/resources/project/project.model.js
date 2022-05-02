"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const projectSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    expectedAmount: {
        type: Number,
        required: true
    },
    totalAmount: {
        type: Number,
        default: 0
    },
    consensusPercent: {
        type: Number,
        default: 0
    },
    consensusStatus: {
        type: String,
        enum: ['pending', 'requested', 'approved'],
        default: 'pending'
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});
projectSchema.virtual('donations', {
    ref: 'Donation',
    localField: '_id',
    foreignField: 'project',
});
exports.default = (0, mongoose_1.model)('Project', projectSchema);
