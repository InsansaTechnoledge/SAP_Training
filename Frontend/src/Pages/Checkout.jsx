import React, { useState } from 'react';
import { CreditCard, Check, ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Checkout = ({ cart = [], setIsCheckoutOpen = [] }) => {
    const [paymentMethod, setPaymentMethod] = useState('credit-card');
    const [shippingDetails, setShippingDetails] = useState({ name: '', address: '', email: '' });

    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = totalPrice * 0.1;
    const finalTotal = totalPrice + tax;

    const handleChange = (e) => {
        setShippingDetails({ ...shippingDetails, [e.target.name]: e.target.value });
    };

    const handlePayment = () => {
        alert(`Payment successful via ${paymentMethod}!`);
        setIsCheckoutOpen(false);
    };

    return (
        <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 w-full sm:w-[480px] h-full bg-white dark:bg-gray-900 shadow-2xl z-50 flex flex-col"
        >
            {/* Header */}
            <div className="p-6 flex justify-between items-center border-b dark:border-gray-800">
                <button onClick={() => setIsCheckoutOpen(false)} className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                    <ArrowLeft className="w-5 h-5" />
                    <span>Back to Cart</span>
                </button>
                <h2 className="text-lg font-bold dark:text-white">Checkout</h2>
            </div>

            {/* Shipping Details */}
            <div className="p-6 flex-1 overflow-y-auto">
                <h3 className="font-semibold dark:text-white mb-4">Shipping Details</h3>
                <div className="space-y-4">
                    <input type="text" name="name" placeholder="Full Name" value={shippingDetails.name} onChange={handleChange} className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white" required />
                    <input type="text" name="address" placeholder="Shipping Address" value={shippingDetails.address} onChange={handleChange} className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white" required />
                    <input type="email" name="email" placeholder="Email Address" value={shippingDetails.email} onChange={handleChange} className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white" required />
                </div>

                {/* Product Summary */}
                <h3 className="font-semibold dark:text-white mt-6 mb-4">Order Summary</h3>
                <ul className="space-y-3 mb-6">
                    {cart.map((item) => (
                        <li key={item.title} className="flex justify-between text-gray-600 dark:text-gray-400">
                            <span>{item.quantity}x {item.title}</span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </li>
                    ))}
                </ul>

                {/* Payment Methods */}
                <h3 className="font-semibold dark:text-white mb-4">Payment Method</h3>
                <div className="space-y-3">
                    {[
                        { id: "credit-card", icon: CreditCard, label: "Credit Card" },
                        { id: "paypal", icon: Paypal, label: "PayPal" },
                        { id: "bank-transfer", icon: Bank, label: "Bank Transfer" },
                        { id: "cash-on-delivery", icon: Check, label: "Cash on Delivery" },
                    ].map(({ id, icon: Icon, label }) => (
                        <button
                            key={id}
                            onClick={() => setPaymentMethod(id)}
                            className={`flex items-center space-x-3 p-3 w-full border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white ${paymentMethod === id ? 'border-blue-600 dark:border-blue-400' : ''}`}
                        >
                            <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                            <span>{label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div className="border-t dark:border-gray-800 p-6 bg-white dark:bg-gray-900">
                <div className="mb-4">
                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                        <span>Subtotal</span>
                        <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                        <span>Tax (10%)</span>
                        <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent my-3" />
                    <div className="flex justify-between font-bold text-lg dark:text-white">
                        <span>Total</span>
                        <span>${finalTotal.toFixed(2)}</span>
                    </div>
                </div>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handlePayment}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 rounded-xl font-medium transition-colors flex items-center justify-center space-x-2"
                >
                    <CreditCard className="w-5 h-5" />
                    <span>Complete Payment</span>
                    <ArrowRight className="w-5 h-5" />
                </motion.button>
            </div>
        </motion.div>
    );
};

export default Checkout;
