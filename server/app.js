import express, { application } from "express";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT
const app = express()

app.get("/",(req,res)=>{
    try {
        res.status(200).json({msg:"Welcome"})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
    }
})

app.listen(port,()=>console.log(`Server running at http://localhost:${port}`))