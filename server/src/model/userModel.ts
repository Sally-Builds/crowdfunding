import mongoose from 'mongoose'


interface UserInterface {
    email: string,
    password: string,
    role: string,
}

const userSchema = new mongoose.Schema <UserInterface>({
    email: {
        type: String,
        required: [true, 'Email is required'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
})


const User = mongoose.model<UserInterface>('User', userSchema)

module.exports = User