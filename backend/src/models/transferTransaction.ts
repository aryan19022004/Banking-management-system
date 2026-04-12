import mongoose, { Document, ObjectId } from 'mongoose';

interface ITransferTransaction extends Document {
    senderAccountId: ObjectId,
    receiverAccountId: ObjectId,
    amount: number,
    status: string,
    timestamp: Date,

}

const transferTransactionSchema = new mongoose.Schema<ITransferTransaction>({
    senderAccountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
    receiverAccountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
    amount: {
        type: Number,
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

export default mongoose.model<ITransferTransaction>('TransferTransaction', transferTransactionSchema);
