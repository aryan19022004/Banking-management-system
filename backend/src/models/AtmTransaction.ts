import mongoose, { Document, ObjectId } from 'mongoose';

interface IAtmTransaction extends Document {
    accountId: ObjectId,
    amount: number,
    type: string,
    status: string,
    timestamp: Date,
    through: string,
}

const atmTransactionSchema = new mongoose.Schema<IAtmTransaction>({
    accountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
    through: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        required: true
    }
})

export default mongoose.model<IAtmTransaction>('AtmTransaction', atmTransactionSchema);