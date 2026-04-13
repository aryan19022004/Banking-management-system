import mongoose, { Document } from "mongoose";

interface IUserType extends Document {
    name: string,
}

const userTypeSchema = new mongoose.Schema<IUserType>({
    name: {
        type: String,
        required: true
    }
})

export default mongoose.model<IUserType>("UserType", userTypeSchema);
