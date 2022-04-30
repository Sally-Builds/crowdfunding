import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './user.interface';

const userSchema = new Schema<User>(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },
    },
    { timestamps: true }
);

userSchema.pre<User>('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    const hashedPassword = await bcrypt.hash(this.password, 12);

    this.password = hashedPassword;
    next();
});

userSchema.methods.isValidPassword = async function (
    password: string
): Promise<Error | boolean> {
    return await bcrypt.compare(password, this.password);
};

export default model<User>('User', userSchema);
