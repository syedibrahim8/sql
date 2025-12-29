import express from "express";
import pool from "../../utils/dbConnect.js";
import bcrypt from "bcrypt";
const router = express.Router();

router.post("/register",async (req,res)=>{
    try {
        let {fullName,email,password}=req.body
        password = await bcrypt.hash(password,10);
        const [result] = await pool.execute(
            "INSERT INTO users (fullName,email,password) VALUES (?,?,?)",[fullName,email,password]
        );
        // console.log(result);
        res.json({id:result.insertId});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
    }
})

router.post("/login",async(req,res)=>{
    try {
        const {email,password} = req.body
        let [[regPass]] = await pool.execute(
            "SELECT password FROM users WHERE email = ?",[email]
        )
        if(!regPass) return res.status(404).json({msg:"User not found"})
        let login = await bcrypt.compare(password,regPass.password)
        if(!login) return res.status(401).json({msg:"Invalid credentials"})
        res.status(200).json({msg:"Login success"})
    } catch (error) {
       console.log(error);
       res.status(500).json({msg:error}) 
    }
})

export default router;