import {MONGODB_CNX_STR} from '../config/mongodb.config.js'
import mongoose from 'mongoose'

export async function connectDB(){
    const db = await mongoose.connect(MONGODB_CNX_STR)
    console.log("Se conectó correctamente a la DB")
}

