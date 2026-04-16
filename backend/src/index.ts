import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import AuthRoutes from './routes/Authentication.js';
import AccountRoutes from './routes/accounts.js';
import TransactionRoutes from './routes/transactions.js';
import BranchRoutes from './routes/branch.js';
const app = express();

app.use(cookieParser());

mongoose.connect(process.env.MONGODB_URI as string)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.log(error);
    })

app.use(express.json());
app.use('/auth', AuthRoutes);
app.use('/account', AccountRoutes);
app.use('/transaction', TransactionRoutes);
app.use('/branch', BranchRoutes);


app.listen(3000, () => {
    console.log('Server started on port 3000');
}); 