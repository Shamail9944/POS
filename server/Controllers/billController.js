import Bill from './../Models/billModel.js';

// get Bill
export const getBillController = async (req, res) => {
    try {
        const getallBills = await Bill.find();
        res.status(200).send(getallBills);
    } catch (error) {
        console.log(error);
    }
};

// add Bill
export const addBillController = async (req, res) => {
    try {
        const newBill = new Bill(req.body)
        await newBill.save()
        res.status(200).send("New Bill added successfully in Db.");
    } catch (error) {
        res.status(400).send("Error in saving new Bill in Db.");
        console.log(error);
    }
};
