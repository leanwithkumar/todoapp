import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import todoRoute from './Routes/todo.routes.js';
import userRoute from './Routes/user.routes.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const port = process.env.PORT || 6000;
const mongo_url = process.env.MONGO_URL;
const frontend_url = process.env.FRONTEND_URL;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: frontend_url,
    credentials: true,
    methods: "GET, POST, PUT, DELETE",
    allowedHeaders: ["Content-type", "Authorization"]
}));

const connectdb = async () => {
    try {
        await mongoose.connect(mongo_url);
        console.log("mongodb connected");
    } catch (err) {
        console.log("unable to connect with database", err);
    }
};

connectdb();

app.use('/todo', todoRoute);
app.use('/user', userRoute);

app.listen(port, () => {
    console.log(`app is listening at port ${port}`);
});
