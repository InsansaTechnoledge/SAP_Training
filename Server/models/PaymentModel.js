import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    receipt:{
        type: String,
        required: true
    },
    courseId: {
        type: String, 
    },
    moduleId: {
        type: String,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required: true
    },
    orderId: {
        type: String,
        required: true
    },
    paymentMethod: {
        type: String
    },
    currency:{
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    transactionId: {
        type: String,
    },
    status: {
        type: String,
        required: true
    },
});

const PaymentModel = mongoose.model("Payment", PaymentSchema);
export default PaymentModel;