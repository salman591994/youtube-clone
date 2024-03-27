import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


const userSchema = new mongoose.Schema(
{
    username:{
        type: String,
        requried: true,
        unique: true,
        lowerCase: true,
        trim: true,
        index: true
    },
    email:{
        type: String,
        requried: true,
        unique: true,
        lowerCase: true,
        trim: true,
    },
    fullName:{
        type: String,
        requried: true,
        trim: true,
        index: true
    },
    avatar:{
        type: String,  //cloudnary url
        requried: true,
    },
    coverImage:{
        type: String,  //cloudnary url
    },
    watchHistory:[
        {
        type: Schema.Types.ObjectId,
        ref: "Video"     
        }
    ],
    passward:{
        type: String,
        requried: [true, 'password is requried']
    },
    refreshToken:{
        type: String,
    } 
},{timeStamps: true})

userSchema.pre("save", async function(next){
    if(!this.isModified("passward")) return next();

    this.passward = bcrypt.hash(this.passward,8)
    next();
})

userSchema.method.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.method.generateAccessToken = function(){
  return  jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullName: this.fullName
    },
    process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
    )
}
userSchema.method.generateRefreshToken = function(){
    return  jwt.sign({
        _id: this._id,
    }, 
    process.env.REFRESH_TOKEN_SECRET,{
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
    )
}

export const User = mongoose.model(User, userSchema)