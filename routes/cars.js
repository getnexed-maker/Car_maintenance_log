import express from "express";
import db from "../db.js"
import "dotenv/config";
import authenticateToken from "../middleware/auth.js"

const router = express.Router();

router.post("/add" , authenticateToken , async (req,res)=> {
    const userId = req.user.id
    const brand = req.body.brand
    const model = req.body.model
    const gen = req.body.generation
    const year = req.body.year
    const car_type = req.body.car_type
    const engine = req.body.engine
    const mileage_unit = req.body.mileage_unit

    try {
        const result = await db.query("INSERT INTO cars (user_id, brand, model, generation, year, car_type, engine, mileage_unit) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)", 
            [userId, brand, model, gen, year, car_type, engine, mileage_unit])
        res.json({ message: "Car added succesfully" })
    } catch (err) {
        res.status(500).json({ message: "Incorrect data" })
    }
} )

router.get("/", authenticateToken, async(req,res)=>{
    const userId = req.user.id
    try {
        const result = await db.query("SELECT * FROM cars WHERE user_id=$1", [userId])
        res.json({ cars: result.rows })
    } catch (err) {
        res.status(500).json({ message: "Failed loading cars" })
    }
})

router.get("/:id", authenticateToken, async(req, res)=> {
    const carId = req.params.id
    try {
        const result = await db.query("SELECT * FROM cars WHERE id=$1", [carId])
        res.json({car: result.rows})
    } catch (err) {
        res.status(500).json({ message: "Failed loading cars" })
    }

})

router.put("/update", authenticateToken, async(req,res)=> {
    const userId = req.user.id
    const carId = req.params.id
    const updatedBrand = req.body.brand
    const updatedModel = req.body.model
    const updatedGen = req.body.generation
    const updatedYear = req.body.year
    const updatedCar_type = req.body.car_type
    const updatedEngine = req.body.engine
    const updatedMileage_unit = req.body.mileage_unit
    try {
        const currentRecord = await db.query("SELECT * FROM cars WHERE id=$1", [carId])
        const current = currentRecord.rows[0]
        const brand = updatedBrand || current.brand
        const model = updatedModel || current.model
        const gen = updatedGen || current.generation
        const year = updatedYear || current.year
        const car_type = updatedCar_type || current.car_type
        const engine = updatedEngine || current.engine
        const mileage_unit = updatedMileage_unit || current.mileage_unit

        const result = await db.query("UPDATE cars SET brand=$1, model=$2, generation=$3, year=$4, car_type=$5, engine=$6, mileage_unit=$7 WHERE id=$8 AND user_id=$9", 
            [brand, model, gen, year, car_type, engine, mileage_unit, carId, userId]
        )
        res.json({ message: "Car updated successfully" })
    } catch (err) {
        res.status(500).json({ message: "Failed updating car data" })
    }


})


router.delete("/delete", authenticateToken, async(req,res)=>{
    const userId = req.user.id
    const carId = req.params.id
    try {
        const result = await db.query("DELETE FROM cars WHERE id=$1 AND user_id=$2", [carId, userId])
        res.json({ message: "Car deleted successfully" })
    } catch (err) {
        res.status(500).json({ message: "Failed deleting car" })
    }
})
