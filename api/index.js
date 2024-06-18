import express from 'express';
import mongoose from'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import postRouter from './routes/post.route.js';
import cookieParser from 'cookie-parser';

dotenv.config()
const app = express();
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
app.use(express.json());

mongoose.connect(process.env.MONGO).then(() =>{console.log("connected")})

app.use('/user/api',userRouter);
app.use('/user/auth',authRouter);
app.use('/api/post',postRouter);

app.use((err,req,res,next)=>{
    const statuscode = err.statuscode || 500;
    const message = err.message || "Internal server error";
    res.status(statuscode).json({
        statuscode:statuscode,
        message:message});
});

app.listen('3000',()=>{
    console.log("Server is running on port 3000");
})