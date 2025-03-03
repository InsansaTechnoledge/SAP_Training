import mongoose from "mongoose";

const PaymentSchema = new mongoose({
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
    transaction_id: {
        type: String,
        required: true
    }
});

const PaymentModel = new mongoose.model("Payment", PaymentSchema);
export default PaymentModel;