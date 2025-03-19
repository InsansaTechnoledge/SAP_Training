import razorPayConfig from "../config/razorPayConfig.js";
import  {validateWebhookSignature} from "razorpay/dist/utils/razorpay-utils.js";
import PaymentModel from "../models/paymentModel.js";
import { response } from "express";

const razorpay=await razorPayConfig();

export const createOrder=async(req,res)=>{
    try{
        const {date,receipt,courseId,moduleId,userId,currency,amount}=req.body;
        const option={
            amount:Number.parseInt(amount*100),
            currency,
            receipt,
            payment_capture:1
        };
        console.log("Creating order");
        console.log("Order option",option);
        const order=await razorpay.orders.create(option);
        console.log("Order created",order);
        const payment=new PaymentModel({
            date:Date.now(),
            receipt,
            courseId,
            moduleId,
            userId,
            orderId:order.id,
            currency,
            amount,
            status:"created",
            receipt
        });
        await payment.save();
        console.log("Order created successfully");
        res.status(200).json(order);

    }catch(error){
        console.error("Error in creating order. Error : ",error);
        res.status(401).json("Error in creating order");
    }//have to see the error code
};

export const verifyPayment=async(req,res)=>{
    const {razorpay_payment_id,razorpay_order_id,razorpay_signature}=req.body;
    const secret=process.env.RAZORPAY_KEY_SECRET;
    const body=razorpay_order_id+"|"+razorpay_payment_id;
    try{
        console.log("Verifying payment");
        const isValidateSignature=validateWebhookSignature(body,razorpay_signature,secret);
        console.log("isValidateSignature",isValidateSignature);
        if(isValidateSignature){
            const paymentDetails=await razorpay.payments.fetch(razorpay_payment_id);
            const payment=await PaymentModel.findOne({orderId:razorpay_order_id});
            payment.status=paymentDetails.status;
            payment.transactionId=razorpay_payment_id;
            payment.paymentMethod=paymentDetails.method;
            await payment.save();
            console.log("Payment verified successfully");
            res.status(200).json({message:"Payment verified successfully"});
        }else{
            response.status(400).json({message:"Payment verification failed"});
            console.error("Payment verification failed");
        }
        
    }catch(error){
        console.error("Error in verifying payment. Error : ",error);
        res.status(error.response.status).json({message:"Payment verification failed"});
    }
};