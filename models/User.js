import { Double } from "mongodb";
import mongoose from "mongoose";

const {Schema} = mongoose


const userSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        unique: true,
        required: true,
    },
    password:{
        type: String,
    },
    ticker_buy:{
        type: Number, 
        default: 0 
    },
    ticker_rent:{
        type: Number,
        default: 0
    },
    coin:{
        type: Number,
        default: 0
    },
    role:{
        type: String,
        default: "user"
    },
    providerAccountId:{
        type: String,
        
    },
    image:{
        type: String,
       
    },
    provider:{
        type: String,
        default: "credentials"
    },
},{timestamps: true}
);

export default mongoose.models.User || mongoose.model("User", userSchema);