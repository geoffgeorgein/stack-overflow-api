import express  from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/users.js";
import questionRoutes from "./routes/Questions.js";
import answerRoutes from "./routes/answers.js";

dotenv.config();


const app=express();

app.use(express.json({limit:"30mb",extended:true}));
app.use(express.urlencoded({limit:"30mb",extended:true}));
app.use(cors());

mongoose.connect(process.env.CONNECTION_URL)


const PORT = process.env.PORT || 5000;

app.use((req, res, next) => {
  const corsWhitelist = [
      'https://stack-overflow-clone-fsz7pi7e7-geoffgeorgein.vercel.app',
      'http://127.0.0.1:5173',
      
  ];
  if (corsWhitelist.indexOf(req.headers.origin) !== -1) {
      res.header('Access-Control-Allow-Origin', req.headers.origin);
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  }

  next();
});

app.get('/',(req,res)=>{
    res.json('hello world1')
})

app.use("/user", userRoutes);
app.use("/questions", questionRoutes);
app.use("/answer", answerRoutes);


app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});