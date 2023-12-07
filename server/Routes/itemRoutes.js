import express from "express";
import { getItemController, addItemController, editItemController, deleteItemController, getItemByIdController } from "../Controllers/itemController.js";


const router = express.Router();

// ------------ Routes ------------ //

//Method - get by id
router.get("/get-item/:id", getItemByIdController);

//Method - get
router.get("/get-item", getItemController);

//Method - post
router.post("/add-item", addItemController);

//Method - put
router.put("/edit-item/:id", editItemController);

//Method - put
router.delete("/delete-item/:id", deleteItemController);

export default router;
