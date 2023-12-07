import mongoose from 'mongoose';

const billSchema = new mongoose.Schema(
    {
        customerName: {
            type: String,
            required: true,
        },
        customerNumber: {
            type: Number,
            required: true,
        },
        date: {
            type: Date,
            default: Date.now(),
        },
        totalQty: {
            type: Number,
            required: true,
        },
        totalPrice: {
            type: Number,
            required: true,
        },
        tax: {
            type: String,
            required: true,
        },
        gtotal: {
            type: String,
            required: true,
        },
        paymentMode: {
            type: String,
            required: true,
        },
        usid: {
            type: String,
            required: true,
        },
        cartItemsCheckOut: {
            type: Array,
            required: true,
        },

    },
    { timestamp: true }
);

const Bill = mongoose.model('bill', billSchema);

export default Bill;
