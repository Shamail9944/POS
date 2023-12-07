import dotenv from "dotenv";
import connectDb from "./config/config.js";
import Items from './Models/itemModel.js';
import data from "./Utils/data.js";
import "colors";


//config
dotenv.config();
connectDb();

//function seeder
const importData = async () => {
  try {
    await Items.deleteMany();
    const itemsData = await Items.insertMany(data);
    console.log("All Items Added".bgGreen);
    process.exit();
  } catch (error) {
    console.log(`${error}`.bgRed.inverse);
    process.exit(1);
  }
};

importData();
