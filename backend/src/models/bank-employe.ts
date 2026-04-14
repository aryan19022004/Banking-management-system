import mongoose, { Document } from "mongoose";

interface IBankEmployee extends Document {
    userId: mongoose.Types.ObjectId,
    branchId: mongoose.Types.ObjectId,
    isDeleted: boolean

}

const bankEmployeeSchema = new mongoose.Schema<IBankEmployee>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    branchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Branch",
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})

export default mongoose.model<IBankEmployee>("BankEmployee", bankEmployeeSchema);