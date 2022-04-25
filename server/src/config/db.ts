import mongoose, {ConnectOptions} from 'mongoose'
import dotenv from 'dotenv'
import { ConnectionOptions } from 'tls'

dotenv.config({path: './config.env'})

const DB:string  ="mongodb://localhost:27017/crowdfunding"
const connectDB = () => {
    return mongoose.connect(DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    } as ConnectOptions).then(() => {
        console.log('DB connected successfully')
    }).catch(e => {
        console.log(e)
    })
}

export default connectDB