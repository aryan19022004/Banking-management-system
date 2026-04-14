import mongoose, { Document } from "mongoose";

interface IBranch extends Document {
    name: string,
    ifsc: string,
    address: string,
    city: string,
    state: string,
    zip: string,
    isDeleted: boolean
}

const branchSchema = new mongoose.Schema<IBranch>({
    name: {
        type: String,
        required: true
    },
    ifsc: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zip: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})

export default mongoose.model<IBranch>("Branch", branchSchema);