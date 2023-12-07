import Items from '../Models/itemModel.js'

// get items
export const getItemController = async (req, res) => {
    try {
        const getallItems = await Items.find();
        res.status(200).send(getallItems);
    } catch (error) {
        console.log(error);
    }
};

// add items
export const addItemController = async (req, res) => {
    try {
        const newItem = new Items(req.body)
        await newItem.save()
        res.status(200).send("New Item added successfully in Db.");
    } catch (error) {
        res.status(400).send("Error in saving new item in Db.");
        console.log(error);
    }
};

// edit items
export const editItemController = async (req, res) => {
    try {
        const { id } = req.params;
        const { data } = req.body;
        await Items.findByIdAndUpdate(id, data)
        res.status(201).send("Exisitng Item edited successfully in Db.");
    } catch (error) {
        console.log("Error in editing exisiting item in Db.", error);
    }
};

//delete item
export const deleteItemController = async (req, res) => {
    try {
        const { id } = req.params;
        await Items.findByIdAndDelete(id)
        res.status(200).send("Item deleted successfully.");
    } catch (error) {
        console.log("Error in deleting item.", error);
    }
};




// get Specific items
export const getItemByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const itemById = await Items.findById(id);
        res.status(200).send(itemById);
    } catch (error) {
        console.log(error);
    }
};