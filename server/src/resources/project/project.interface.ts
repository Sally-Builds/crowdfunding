import {Document} from 'mongoose'

export default interface Project extends Document {
    name: string,
    expectedAmount: number,
    totalAmount: number,
    consensusPercent: number
    consensusStatus: string
}
