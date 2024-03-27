// require('dotenv').config({path: './env'})
import app from './app.js'
import connectDB from "./db/db.js";

import dotenv from "dotenv";

dotenv.config()


 connectDB ()
 .then(()=>{
    app.listen(process.env.PORT || 8000, ()=>{console.log('server running in PORT : ', process.env.PORT)} )
 })
 .catch((err)=>{
    console.log("MONGO DB CONNECTION FAILED !!!", err)
 })


