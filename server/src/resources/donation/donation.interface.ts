import {Types, Document} from "mongoose"

export default interface Donation extends Document {
    amount: number,
    user: Types.ObjectId,
    project: Types.ObjectId,
    vetoStatus: boolean

}