import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
    courseId: {
        type: Number, 
        required: true
    },
    type: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    transactionId: {
        type: String,
        required: true
    }
});

const PaymentModel = mongoose.model("Payment", PaymentSchema);
export default PaymentModel;