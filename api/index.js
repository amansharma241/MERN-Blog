import express from 'express';
import mongoose from'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';

dotenv.config()
const app = express();
app.use(cors({
    origin:"http://localhost:5173",
}))
app.use(express.json());
app.use(cookieParser())
mongoose.connect(process.env.MONGO).then(() =>{console.log("connected")})


// app.get('/test',(req,res)=>{
//     res.json({message:'API is working!'})
// })

app.use('/user/api',userRouter);
app.use('/user/auth',authRouter);
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