import mongoose, { Document } from "mongoose";

interface IBankEmployee extends Document {
    userId: mongoose.Types.ObjectId,
    branchId: mongoose.Types.ObjectId,
    userType: mongoose.Types.ObjectId

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
    }
})

export default mongoose.model<IBankEmployee>("BankEmployee", bankEmployeeSchema);