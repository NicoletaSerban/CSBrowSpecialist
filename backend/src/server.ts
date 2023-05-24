import dontenv from 'dotenv';
dontenv.config();
import express from "express";
// only for development
import cors from "cors";
import jobsRouter from './routers/job.router';
import userRouter from './routers/user.router'
import { dbConnect } from './configs/database.config';

dbConnect();
const app = express();
app.use(express.json())

app.use(cors({
    credentials: true,
    origin: ["http://localhost:4200"]
}));

app.use('/api/jobs', jobsRouter);
app.use('/api/users', userRouter);


const port = 5000;
app.listen(port, () => {
    console.log(`Website is served on http://localhost:${port}`)
})