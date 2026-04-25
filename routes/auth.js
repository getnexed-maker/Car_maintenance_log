import express from "express";
import db from "../db.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import "dotenv/config";


const router = express.Router();
const saltrounds = 10

router.post("/auth/register", async (req, res) =>{
const email = req.body.email;
const password = req.body.password;

try {
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (checkResult.rows.length > 0) {
        res.send("Email already exists. Try logging in.");
    } else {
        bcrypt.hash(password, saltrounds, async (err, hash)=> {
            if (err) {
          console.log("Error hashing password", err)
        } else {
            const result = await db.query("INSERT INTO users (email, password_hash) VALUES ($1, $2)",
          [email, hash])
          res.json({ message: "User registered successfully" })
    }})}
} catch (err) {
    console.log(err);
}})

router.post("/auth/login", async (req,res) => {
const email = req.body.email;
const password = req.body.password;

try {
const result = await db.query("SELECT * FROM users WHERE email = $1", [email])
if (result.rows.length > 0) {
    const user = result.rows[0]
    const storedHashedPassword = user.password_hash;
    const payload = {
        id: user.id,
        email: user.email
    }
    const secret = process.env.JWT_SECRET

   bcrypt.compare(password, storedHashedPassword, (err, result)=> {
        if (err) {
            console.log("error comparing passwords")
        } else {
            if (result) {
               const token = jwt.sign(payload, secret, {
                expiresIn: '20min'
               })
               res.json({token})
            } else {
                res.status(401).json({ message: "Incorrect password" })
            }
        }
    })
} else {
    res.status(404).json({ message: "User not found" });
}


} catch (err) {
    console.log(err);
}})

export default router