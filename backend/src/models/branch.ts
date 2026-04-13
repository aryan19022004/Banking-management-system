import mongoose, { Document } from "mongoose";

interface IBank extends Document {
    name: string,
    ifsc: string,
    branch: string,
    address: string,
}

const bankSchema = new mongoose.Schema<IBank>({
    name: {
        type: String,
        required: true
    },
    ifsc: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
})

export default mongoose.model<IBank>("Bank", bankSchema);