import axios from 'axios';
import { CheckCircle, Gift } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { API_BASE_URL } from '../../config';
import { motion } from 'framer-motion';
import { useUser } from '../../Context/UserContext';
import { useCart } from '../../Context/CartContext';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const paymentId = searchParams.get('paymentId');
    const [paymentData, setPaymentData] = useState();
    const {user} = useUser();
    const navigate = useNavigate();
    const {setIsCartOpen} = useCart();

    useEffect(()=>{
        
        const fetchPaymentData = async () => {
            try{
                const response = await axios.post(`${API_BASE_URL}/api/v1/payment/getPayment`, {
                    userId: user._id,
                    paymentId: paymentId
                });
                if(response.status==200){
                    setPaymentData(response.data.payment);
                    console.log(response.data.payment);
                }
            }
            catch(err){
                console.log(err);
                alert(err.response.data.message);
            }
        }
        
        if(paymentId && user){
            fetchPaymentData();
            setIsCartOpen(false);
        }
    },[user, paymentId])

    if(!paymentData){
        return (
            <div>Loading...</div>
        )
    }

  return (
    <div className='pt-24 bg-theme-gradient pb-8 min-h-dvh'>
        <div className="space-y-6 text-center w-4/5 mx-auto">
                    <div className="flex flex-col items-center">
                        <div className="relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-green-600 rounded-full opacity-75 blur"></div>
                            <div className="relative bg-card p-4 rounded-full">
                                <CheckCircle className="w-12 h-12 text-green-500" />
                            </div>
                        </div>
        
                        <h2 className="text-2xl font-bold text-secondary mt-6">Payment Successful!</h2>
                        <p className="text-gray mt-2">
                            Your courses are now ready to access
                        </p>
                    </div>

                    <div className='grid lg:grid-cols-2 gap-5'>
                    <div className="space-y-3 p-5 bg-card rounded-lg">
                        <h3 className="text-lg font-medium text-secondary">Your Courses</h3>
        
                        <div className="space-y-3">
                            {paymentData.courses.map((item) => (
                                <div key={item.title} className="bg-secondary border-contrast  rounded-lg p-4 flex justify-between items-center">
                                    <div className="flex items-center space-x-3">
                                        <div className="bg-blue p-2 rounded-lg">
                                            <Gift className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-secondary">{item.title}</h4>
                                            <p className="text-sm text-gray">
                                                Access until: Lifetime
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => (navigate(`/course?id=${item.$id}`))}
                                        className="bg-blue-600 text-white text-sm px-3 py-1 rounded-full transition-colors hover:cursor-pointer"
                                    >
                                        Start Learning
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className=" bg-card rounded-lg p-6">
                        <h3 className="text-lg font-medium text-secondary mb-4">Order Details</h3>
        
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm ">
                                <span className="text-gray">Receipt Id</span>
                                <span className="font-medium text-secondary">{paymentData.receipt}</span>
                            </div>
        
                            <div className="flex justify-between text-sm">
                                <span className="text-gray">Order ID</span>
                                <span className="font-medium text-secondary">{paymentData.orderId}</span>
                            </div>
        
                            <div className="flex justify-between text-sm">
                                <span className="text-gray">Date</span>
                                <span className="font-medium text-secondary">{paymentData.date}</span>
                            </div>
        
                            <div className="flex justify-between text-sm">
                                <span className="text-gray">Payment Id</span>
                                <span className="font-medium text-secondary">{paymentData.transactionId}</span>
                            </div>
        
                            <div className="flex justify-between text-sm">
                                <span className="text-gray">Payment Method</span>
                                <span className="font-medium text-secondary">
                                    {paymentData.paymentMethod}
                                </span>
                            </div>
        
                            <div className="flex justify-between text-sm">
                                <span className="text-gray">Amount Paid</span>
                                <span className="font-medium text-green-600">₹{paymentData.amount.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
        
                    
                    </div>
        
                    <div className="mt-6 space-y-3  w-1/2 mx-auto">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => navigate("/")}
                            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-xl font-medium transition-colors"
                        >
                            Go to Dashboard
                        </motion.button>
        
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => navigate("/shop")}
                            className="w-full bg-card text-secondary border-contrast py-3 rounded-xl font-medium transition-colors"
                        >
                            Browse More Courses
                        </motion.button>
                    </div>
                </div>
    </div>
  )
}

export default PaymentSuccess