import mongoose from "mongoose";

const userSchema =new mongoose.Schema({

    email:{type:String, required:true,unique: true},
    name:{type:String, required:true,unique: true}, 
    password:{type:String, required:true},
    about:{type:String},
    tags:{type:[String] },
    joinedOn:{type: Date, default: Date.now}
})

export default mongoose.model("User", userSchema);