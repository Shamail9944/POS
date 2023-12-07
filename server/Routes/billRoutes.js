import express from "express";
import { getBillController, addBillController } from "../Controllers/billController.js";


const router = express.Router();

// ------------ Routes ------------ //

//Method - get
router.get("/get-bill", getBillController);

//Method - post
router.post("/add-bill", addBillController);


export default router;
