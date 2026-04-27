import express from "express";
import db from "../db.js"
import "dotenv/config";
import authenticateToken from "../middleware/auth.js"

const router = express.Router();


router.post("/:carId", authenticateToken, async (req,res)=> {
    const userId = req.user.id
    const carId = req.params.carId
    const typeId = req.body.type_id
    const name = req.body.name
    const cost = req.body.cost
    const mileage_at_service = req.body.mileage_at_service
    const date = req.body.date
    const notes = req.body.notes

        try {
                const checkId = await db.query("SELECT * FROM cars WHERE id=$1 AND user_id=$2", [carId, userId])
                if (checkId.rows.length > 0 ) {
                    const result = await db.query("INSERT INTO maintenance_records (car_id, type_id, name, cost, mileage_at_service, date, notes) VALUES ($1, $2, $3, $4, $5, $6, $7)",
                        [carId, typeId, name, cost, mileage_at_service, date, notes]
                    )
                    res.json({ message: "Record added succesfully" })
                } else {
                    res.status(403).json({ message: "You are not authorized for this action" })
                }

        } catch (err) {
            res.status(500).json({ message: "Failed adding record" })
        }



})

router.get("/records/:carId", authenticateToken, async(req, res)=> {
    const userId = req.user.id
    const carId = req.params.carId
    try {  
        const checkId = await db.query("SELECT * FROM cars WHERE id=$1 AND user_id=$2", [carId, userId])
 if (checkId.rows.length > 0 ) {
        const result = await db.query("SELECT * FROM maintenance_records WHERE car_id=$1",[carId])
        res.json({ records: result.rows })
 } else 
    res.status(403).json({ message: "You are not authorized for this action" })
    } catch (err) {
        res.status(500).json({ message: "Failed loading records" })
    }
})

router.get("/records", authenticateToken, async(req, res)=>{
    const userId= req.user.id
    try {
            const result = await db.query(`
                    SELECT maintenance_records.* 
                    FROM maintenance_records
                    JOIN cars ON maintenance_records.car_id = cars.id
                    WHERE cars.user_id=$1
                    `, [userId])
        res.json({ records: result.rows })

    } catch (err) {
    res.status(500).json({ message: "Failed loading records" })
    }

})

router.put("/update/:recordId", authenticateToken, async(req, res)=> {
    const recordId = req.params.recordId
    const userId = req.user.id
    const updatedTypeId = req.body.type_id
    const updatedName = req.body.name
    const updatedCost = req.body.cost
    const updatedMileage_at_service = req.body.mileage_at_service
    const updatedDate = req.body.date
    const updatedNotes = req.body.notes
    try {
         const checkId = await db.query("SELECT maintenance_records.* FROM maintenance_records JOIN cars ON maintenance_records.car_id = cars.id WHERE maintenance_records.id=$1 AND cars.user_id=$2", [recordId, userId])
    if (checkId.rows.length > 0 ) {
        const current = checkId.rows[0]
        const typeId = updatedTypeId || current.type_id
        const name = updatedName || current.name
        const cost = updatedCost || current.cost
        const date = updatedDate || current.date
        const notes = updatedNotes || current.notes
        const mileage = updatedMileage_at_service || current.mileage_at_service

        const result = await db.query("UPDATE maintenance_records SET type_id=$1, name=$2, cost=$3, mileage_at_service=$4, date=$5, notes=$6 WHERE id=$7" ,
            [typeId, name, cost, mileage, date, notes, recordId])
            res.json({ message: "Record updated succesfully" })
    } else {
        res.status(403).json({ message: "You are not authorized for this action" })
    }

    } catch (err) {
        res.status(500).json({ message: "Failed updating records" })
    }
})

router.delete("/delete/:recordId", authenticateToken, async(req, res) => {
    const recordId = req.params.recordId
    const userId = req.user.id

    try {
    const checkId = await db.query("SELECT maintenance_records.* FROM maintenance_records JOIN cars ON maintenance_records.car_id = cars.id WHERE maintenance_records.id=$1 AND cars.user_id=$2", [recordId, userId])
    if (checkId.rows.length > 0 ) {
        const result = await db.query("DELETE FROM maintenance_records where id=$1", [recordId])
         res.json({ message: "Record deleted succesfully" })
    } else {
        res.status(403).json({ message: "You are not authorized for this action" })
    }
    } catch (err) {
        res.status(500).json({ message: "Failed deleting record" })
    }
})

export default router