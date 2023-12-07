import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import "colors";
import connectDb from "./config/config.js";
import itemRoutes from './Routes/itemRoutes.js'
import userRoutes from './Routes/userRoutes.js'
import billRoutes from './Routes//billRoutes.js'
import path from 'path'
import { fileURLToPath } from 'url'
import { url } from "inspector";
//dotenv config
dotenv.config();

//db config
connectDb();


// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)
//rest object
const app = express();

//middlwares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, './client/build')));

//port
const PORT = process.env.PORT;

//Root Url request 
// app.use('*', function (req, res) {
//     res.sendFile(path.join(__dirname, './client/build/index.html'))
// })

//listen
app.listen(PORT, () => {
    console.log(`Server Running On Port ${PORT}`.bgCyan.white);
});

//routes - End Points
app.use("/api/v1/items", itemRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/bills", billRoutes);
