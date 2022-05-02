import {Schema, model} from 'mongoose'
import Project from "./project.interface";


const projectSchema = new Schema<Project>({
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
        default : 0
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
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
})

projectSchema.virtual('donations', {
    ref: 'Donation',
    localField: '_id',
    foreignField: 'project',
})

export default model<Project>('Project', projectSchema)