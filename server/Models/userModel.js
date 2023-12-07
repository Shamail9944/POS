import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        fname: {
            type: String,
            required: true,
        },
        lname: {
            type: String,
            required: true,
        },
        usid: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        verified: {
            type: Boolean,
        }
    },
    { timestamp: true }
);

const User = mongoose.model('user', userSchema);

export default User;
