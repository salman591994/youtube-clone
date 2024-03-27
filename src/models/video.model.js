import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";


const videoSchema = new mongoose.Schema(
{
    videoFile:{
        type: String,  //cloudnary url
        requried: true,
    },
    thubnail:{
        type: String,  //cloudnary url
        requried: true
    },
    owner:{
            type: Schema.Types.ObjectId,
            ref: "User"
    },
    title:{
        type: String,  
        requried: true,
    },
    description:{
        type: String,
        requried: true,
        unique: true,
        lowerCase: true,
        trim: true,
        index: true
    },
    duration:{
        type: Number, //from cloudnary
        requried: true,    
    },
    views:{
        type: Number,
        default: 0,
    },
    isPublished:{
        type: Boolean,
        default: true,
    } 
},{timeStamps: true})

videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model(Video, videoSchema)