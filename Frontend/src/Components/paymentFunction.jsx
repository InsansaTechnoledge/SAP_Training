import axios from 'axios';
import { API_BASE_URL,RAZORPAY_KEY_ID } from '../config';
export const Paynow=async(paymentData)=>{
    try{
        console.log("Payment data",paymentData);
        if(!paymentData.amount || paymentData.amount<=0){
            console.log("Invalid amount");
            return {status:400,message:"Invalid amount"};
        }
        // have to add the phone number here for the upi
        const response=await axios.post(`${API_BASE_URL}/api/v1/payment/createOrder`,paymentData);
        const order=response.data;
        if(!order.id){
           return {status:400,message:"Error in creating order"};
        }
        console.log("openoiing razorpay");
        
        return new Promise((resolve,reject)=>{
            const options={
                key:RAZORPAY_KEY_ID,
                amount:paymentData.amount,
                currency:paymentData.currency,
                name:"Attainment - Insansa Tecknowledge",
                description:"Insansa Technologies",
                // image:paymentData.image,
                order_id:order.id,
                handler: async function(response){
                    console.log("Payment successfull");
                    console.log(response);
                    const paymentData={
                        razorpay_payment_id:response.razorpay_payment_id,
                        razorpay_order_id:response.razorpay_order_id,
                        razorpay_signature:response.razorpay_signature
                    };
                    try{
                    response=await axios.post(`${API_BASE_URL}/api/v1/payment/verifyPayment`,paymentData);
                    console.log(response);
                    if(response.status===200){
                        resolve( {status:response.status,message:"Payment successfull",payment:response.data.payment});
                    }
                    else{
                        
                        reject ({status:response.status,message:"Payment failed"});
                    }
                }catch(error){
                    console.error("Error verifying payment:", error);
                    reject(error);
                }
                },
                prefill:{
                    name:paymentData.fullName,
                    email:paymentData.email,
                    contact:paymentData.phone
                },
                theme:{
                    color:"#3399cc"
                },
                modal: {
                    ondismiss: function () {
                        console.log("Razorpay window closed by user.");
                        reject(new Error("Payment process was closed by the user"));
                    }
                }
            };
            const rzp1=Razorpay(options);
            rzp1.open();
        })
        

    }catch(error){
        console.error("Error in creating order. Error : ",error);
        return new Error("Error in creating order");
    }
}


