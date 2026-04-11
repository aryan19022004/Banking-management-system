import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import AuthRoutes from './routes/Authentication.js';
import AccountRoutes from './routes/accounts.js';
const app = express();

app.use(cookieParser());

mongoose.connect('mongodb://127.0.0.1:27017/bankingSystem')
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.log(error);
    })

app.use(express.json());
app.use('/auth', AuthRoutes);
app.use('/account', AccountRoutes);


app.listen(3000, () => {
    console.log('Server started on port 3000');
}); 