import express  from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/users.js";
import questionRoutes from "./routes/Questions.js";
import answerRoutes from "./routes/Answers.js";

const app=express();

app.use(express.json({limit:"30mb",extended:true}));
app.use(express.urlencoded({limit:"30mb",extended:true}));
app.use(cors());

mongoose.connect('mongodb+srv://geoff234:q0ar5cpfIgwaehIX@cluster0.zqgwnbu.mongodb.net/')


const PORT = process.env.PORT || 5000;

app.get('/',(req,res)=>{
    res.json('hello world1')
})

app.use("/user", userRoutes);
app.use("/questions", questionRoutes);
app.use("/answer", answerRoutes);


app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});