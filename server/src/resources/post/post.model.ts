import { Schema, model } from 'mongoose';
import Post from '@/resources/post/post.interface'

const PostSchema = new Schema(
    {
        title: {
            type: String,
            required: [true],
        },
        body: {
            type: String,
            require: true,
        },
    },
    { timestamps: true }
);

const Post = model<Post>('Post', PostSchema)
export default Post