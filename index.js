import express from "express";
import "dotenv/config";
import authRoutes from "./routes/auth.js";
import carRoutes from "./routes/cars.js";
import maintenanceRoutes from "./routes/maintenance.js";
import bodyParser from "body-parser";


const app = express();
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/cars", carRoutes);
app.use("/maintenance", maintenanceRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));