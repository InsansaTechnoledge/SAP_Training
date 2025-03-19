import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    receipt:{
        type: Number,
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
        type: String,
        required: true
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
        required: true
    },
    status: {
        type: String,
        required: true
    },
});

const PaymentModel = mongoose.model("Payment", PaymentSchema);
export default PaymentModel;