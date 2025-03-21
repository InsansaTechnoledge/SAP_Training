//change the css at final render
//confirmation email and invoice is incomplete
import React, { useState, useEffect } from 'react';
import {
    CheckCircle,
    Shield,
    Gift,
    User,
    Mail,
    Phone,

    Lock,

} from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import axios from 'axios';
import { Paynow } from '../Components/Payment/paymentFunction';
import { useUser } from '../Context/UserContext';
import { useCart } from '../Context/CartContext';
import PaymentFailedAlert from '../Components/Payment/PaymentFailedAlert';

const Checkout = ({ checkoutData, inCartView = false, goBackToCart }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
    });
    const [errors, setErrors] = useState({});
    const [isProcessing, setIsProcessing] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const navigate = useNavigate();
    const { user } = useUser();
    const [paymentInvoice, setPaymentInvoice] = useState({
        paymentMethod: '',
        orderId: '',
        paymentId: '',
        receiptNo: '',
    });

    const [alertMessage, setAlertMessage] = useState();

    const {
        subtotal,
        gst,
        promoDiscount,
        promoDiscountAmount,
        launchDiscount,
        finalTotal
    } = checkoutData;

    // Map the cart array separately
    const cart = checkoutData.cart.map(item => ({
        $id: item.$id,
        title: item.title,
        price: item.price
    }));

    // useEffect(()=>{
    //     if(isComplete){
    //         navigate(`/payment-success?paymentId=${}`);
    //     }
    // },[isComplete])

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        let processedValue = value;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : processedValue,
        });

        // Clear error when user types
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: null
            });
        }
    };

    const validateStep1 = () => {
        const newErrors = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Full name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email address is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email address is invalid';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^\d{10}$/.test(formData.phone.replace(/[- ]/g, ''))) {
            newErrors.phone = 'Phone number must be 10 digits';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement('script')
            script.src = src
            script.onload = () => {
                resolve(true)
            }
            script.onerror = () => {
                resolve(false)
            }
            document.body.appendChild(script)
        })
    }
    useEffect(() => {
        loadScript('https://checkout.razorpay.com/v1/checkout.js')
    }, [])

    const handleContinue = async () => {
        if (validateStep1()) {
            const generateReceiptNumber = () => {
                const now = new Date();
                const formattedDate = now.toISOString().slice(0, 10).replace(/-/g, ""); // YYYYMMDD
                const formattedTime = now.toTimeString().slice(0, 8).replace(/:/g, ""); // HHMMSS
                return `${formattedDate}${formattedTime}${user._id}`;
            };
            formData.amount = checkoutData.finalTotal;
            formData.currency = 'INR';
            formData.receipt = generateReceiptNumber();
            formData.courseId = cart.map(item => item.$id);
            formData.userId = user._id;
            console.log(formData);

            try {
                const result = await Paynow(formData);//what to do for the result
                console.log(result);
          
                if (result.status === 200) {

                    alert(result.message);

                    const emailData = {
                        "formData": formData,
                        "payment": result.payment,
                        "checkoutData": cart
                    }




                    //email sending here 
                    const emailResponse = await axios.post(`${API_BASE_URL}/api/v1/email/paymentMail`, emailData);
                    console.log(emailResponse);


                    setIsComplete(true);
                    var purchasedModules = localStorage.getItem('unlockedModules');
                    const responses = await Promise.all(
                        cart.map(course =>
                            axios.get(`${API_BASE_URL}/api/v1/modules?id=${course.$id}`) // Replace with your actual API endpoint
                        )
                    );
                    console.log(responses);
                    var newModules = [];
                    responses.map(response => {
                        const moduleIds = response.data.map(mod => mod.$id);
                        newModules = [...newModules, ...moduleIds];
                    })

                    console.log(newModules);
                    if (!purchasedModules) {
                        localStorage.setItem('unlockedModules', newModules);
                    }
                    else {
                        purchasedModules = purchasedModules.split(',');
                        localStorage.setItem('unlockedModules', [...purchasedModules, ...newModules]);
                    }

                    navigate(`/payment-success?paymentId=${result.payment._id}`);


                }
                else {
                    setAlertMessage(result.message);
                }


            } catch (error) {
                console.error("Payment Error:", error);
                setAlertMessage(
                    'Payment processing failed. Please try again.'
                );


            } finally {
                setIsProcessing(false);
            }

        }
    };


    const renderOrderSummary = () => (
        <div className="bg-secondary rounded-lg p-4">
            <h3 className="font-medium mb-3 text-secondary">Order Summary</h3>
            <div className="space-y-2 mb-3">
                {cart.map((item) => (
                    <div key={item.title} className="flex justify-between text-sm">
                        <span className="text-secondary">{item.title}</span>
                        <span className="font-medium text-secondary">₹{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                ))}
            </div>
            <div className="space-y-2 text-sm border-t pt-2 border-gray-200 dark:border-gray-700">
                <div className="flex justify-between">
                    <span className="text-secondary">Subtotal</span>
                    <span className="text-secondary">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-secondary">GST (18%)</span>
                    <span className="text-secondary">₹{gst.toFixed(2)}</span>
                </div>
                {promoDiscount > 0 && (
                    <div className="flex justify-between text-green-600">
                        <span>Promo Discount</span>
                        <span>-₹{promoDiscountAmount.toFixed(2)}</span>
                    </div>
                )}
                <div className="flex justify-between text-green-600">
                    <span>Launch Discount</span>
                    <span>-₹{launchDiscount.toFixed(2)}</span>
                </div>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 mt-2 pt-2">
                <div className="flex justify-between font-bold">
                    <span className="text-secondary">Total</span>
                    <span className="text-blue-600 dark:text-blue-400">₹{finalTotal.toFixed(2)}</span>
                </div>
            </div>
        </div>
    );

    const renderStep1 = () => (
        <div className="space-y-4">
            <h2 className="text-xl font-bold text-secondary">Personal Information</h2>
            <div>
                <label className="block text-sm font-medium text-secondary mb-1">
                    Full Name
                </label>
                <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary w-5 h-5" />
                    <input
                        type="text"
                        disabled={isComplete}
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className={`w-full p-3 text-secondary pl-10 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-secondary  ${errors.fullName ? 'border-red-500' : 'border-gray-300'
                            }`}
                        placeholder="John Doe"
                    />
                </div>
                {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-secondary mb-1">
                    Email Address
                </label>
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary w-5 h-5" />
                    <input
                        disabled={isComplete}
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full text-secondary p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-secondary ${errors.email ? 'border-red-500' : 'border-gray-300'
                            }`}
                        placeholder="your@email.com"
                    />
                </div>
                {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-secondary mb-1">
                    Phone Number
                </label>
                <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary w-5 h-5" />
                    <input
                        disabled={isComplete}
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full text-secondary p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-secondary ${errors.phone ? 'border-red-500' : 'border-gray-300'
                            }`}
                        placeholder="9876543210"
                    />
                </div>
                {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
            </div>

            {!inCartView && renderOrderSummary()}
        </div>
    );


    return (
        <div className="px-6 pb-6">
            {
                alertMessage
                    ?
                    <PaymentFailedAlert setAlertMessage={setAlertMessage} alertMessage={alertMessage} />
                    :
                    null
            }
            {!isComplete && (
                <div className="flex justify-between items-center mb-6">
                    <div className="text-sm text-secondary">
                        'Personal Information & Payment Details'

                    </div>
                </div>
            )}

            {inCartView && !isComplete && renderOrderSummary()}

            <div className="mt-6">
                {renderStep1()}
                {/* {currentStep === 2 && renderStep2()} */}
                {/* {isComplete && renderComplete()} */}

                {!isComplete && (
                    <div className="mt-6">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={isProcessing}
                            onClick={handleContinue}
                            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 rounded-xl font-medium transition-colors flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isProcessing ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Processing...</span>
                                </>
                            ) : (

                                <>
                                    {/* <span>Continue to Payment</span>
                                            <ChevronRight className="w-5 h-5" /> */}
                                    <Lock className="w-5 h-5" />
                                    <span>Pay Now ₹{finalTotal.toFixed(2)}</span>
                                </>

                            )}
                        </motion.button>
                    </div>
                )}
            </div>

            <div className="mt-6 text-center space-y-2">
                {!isComplete && (
                    <>
                        <div className="flex items-center justify-center space-x-2">
                            <Shield className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Secure checkout powered by Stripe
                            </p>
                        </div>

                        <div className="flex justify-center space-x-4">
                            <img src="/images/visa.svg" alt="Visa" className="h-8" />
                            <img src="/images/mastercard.svg" alt="Mastercard" className="h-8" />
                            <img src="/images/amex.svg" alt="American Express" className="h-8" />
                            <img src="/images/upi.svg" alt="UPI" className="h-8" />
                        </div>

                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
                            By completing your purchase, you agree to our{" "}
                            <a href="#" className="text-blue-600 hover:underline">
                                Terms of Service
                            </a>{" "}
                            and{" "}
                            <a href="#" className="text-blue-600 hover:underline">
                                Privacy Policy
                            </a>
                        </p>
                    </>
                )}

                {isComplete && (
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            A confirmation email has been sent to <span className="font-medium">{formData.email}</span>
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            Need help? Contact our <a href="#" className="text-blue-600 hover:underline">support team</a>
                        </p>
                    </div>
                )}
            </div>

            {inCartView && !isComplete && (
                <div className="mt-6">
                    <button
                        onClick={goBackToCart}
                        className="w-full text-gray-600 dark:text-gray-400 py-2 text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center justify-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                        Back to Cart
                    </button>
                </div>
            )}
        </div>
    );
};

export default Checkout;