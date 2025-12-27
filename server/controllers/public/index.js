import express from "express";
import pool from "../../utils/dbConnect.js";
import bcrypt from "bcrypt";
const router = express.Router();

router.post("/register",async (req,res)=>{
    try {
        const {fullName,email,password}=req.body
        // password = await bcrypt.hash(password,10);
        const [result] = await pool.execute(
            "INSERT INTO users (fullName,email,password) VALUES (?,?,?)",[fullName,email,password]
        );
        res.json({msg:"Registration successfull"});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
    }
})

export default router;