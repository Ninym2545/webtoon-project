import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const {Schema} = mongoose

mongoose.set('strictQuery', false);
const historySchema = new Schema({
    user_id:{
        type: ObjectId,
        ref: 'users',
        required: true,
    },
    coin:{
        type: String,
        unique: true,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
},{timestamps: true}
);

export default mongoose.models.History || mongoose.model("History", historySchema);