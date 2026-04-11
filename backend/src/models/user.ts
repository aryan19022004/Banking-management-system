import mongoose, { Document } from 'mongoose';

export interface IUser {
    _id: string
    name: string,
    email: string,
    password: string,
    phone: string,

}

const userSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }

})

export default mongoose.model<IUser>('User', userSchema);