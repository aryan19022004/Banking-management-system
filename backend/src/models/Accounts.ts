import mongoose, { Document, ObjectId } from 'mongoose';

export enum AccountStatus {
  ACTIVE = "active",
  PENDING_CLOSURE = "pending_closure",
  CLOSED = "closed"
}

interface IAccount extends Document {
  userId: mongoose.Types.ObjectId;
  accountNumber: string;
  atmCardNumber: string;
  balance: number;
  pin: string;
  status: AccountStatus;
  type: string;
  closureDate?: Date | null;
  ifsc: string;
  branchId: mongoose.Types.ObjectId;
  isDeleted: boolean;
}

const accountSchema = new mongoose.Schema<IAccount>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  branchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch',
    required: true
  },
  accountNumber: {
    type: String,

  },
  ifsc: {
    type: String,
    required: true
  },
  atmCardNumber: {
    type: String,

  },
  balance: {
    type: Number,
    required: true
  },
  pin: {
    type: String,

  },
  status: {
    type: String,
    enum: Object.values(AccountStatus),
    default: AccountStatus.ACTIVE
  },
  type: {
    type: String,
    required: true,
    enum: ["savings", "current"],
    default: "savings"
  },
  closureDate: {
    type: Date
  },

  isDeleted: {
    type: Boolean,
    default: false
  }
});

export default mongoose.model<IAccount>('Account', accountSchema);