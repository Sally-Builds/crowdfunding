import {Document} from 'mongoose'


export default interface POST extends Document {
    title: string
    body: string
}