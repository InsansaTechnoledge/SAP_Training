import React, { useState, useEffect } from 'react';
import { X, Minus, Plus, ShoppingBag, CreditCard, Package2, ArrowRight, Tags } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../Context/CartContext';

const Cart = () => {
    const { cart, setIsCartOpen, addToCart, removeFromCart } = useCart();
    const [promoCode, setPromoCode] = useState('');
    const [promoDiscount, setPromoDiscount] = useState(0);
    const [promoError, setPromoError] = useState('');
    const [savedPromoCodes, setSavedPromoCodes] = useState({});


    useEffect(() => {
        // Fetch promo codes from localStorage
        try {
            const storedPromoCodes = localStorage.getItem('insansaPromoCodes');
            if (storedPromoCodes) {
                // Parse the stored promo codes, handling potential JSON parsing errors
                const parsedPromoCodes = JSON.parse(storedPromoCodes);
                setSavedPromoCodes(parsedPromoCodes);
            }
        } catch (error) {
            console.error('Error parsing promo codes:', error);
            // Optional: Reset localStorage if there's a parsing error
            localStorage.removeItem('insansaPromoCodes');
        }
    }, []);


    const LAUNCH_DISCOUNT = 5000;
    const GST_RATE = 0.18;

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const gst = subtotal * GST_RATE;
    const launchDiscount = LAUNCH_DISCOUNT;


    const validatePromoCode = () => {
        // Normalize the promo code
        const normalizedPromoCode = promoCode.toUpperCase().trim();

        // Check if the promo code exists in saved promo codes
        if (savedPromoCodes[normalizedPromoCode] !== undefined) {
            // Get the discount percentage from saved promo codes
            const discountPercentage = savedPromoCodes[normalizedPromoCode] / 100;

            setPromoDiscount(discountPercentage);
            setPromoError('');
        } else {
            setPromoDiscount(0);
            setPromoError('Invalid or expired promo code');
        }
    };

    // Calculate promo discount amount
    const promoDiscountAmount = subtotal * promoDiscount;

    // Calculate total
    const totalBeforeDiscount = subtotal + gst;
    const totalAfterPromoDiscount = totalBeforeDiscount - promoDiscountAmount;
    const finalTotal = Math.max(totalAfterPromoDiscount - launchDiscount, 0);

    return (
        <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 w-full sm:w-[448px] h-full bg-theme-gradient shadow-2xl z-50 flex flex-col"
        >
            <div className="flex-1 flex flex-col h-full">
                {/* Header - remains the same as previous implementation */}
                <div className="p-6">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-xl">
                                <ShoppingBag className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-secondary">Your Cart</h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {cart.length} {cart.length === 1 ? 'item' : 'items'}
                                </p>
                            </div>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsCartOpen(false)}
                            className="bg-secondary p-2 rounded-xl text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                        >
                            <X className="w-5 h-5 text-primary" />
                        </motion.button>
                    </div>
                </div>

                {/* Cart Items - similar to previous implementation */}
                <div className="flex-1 overflow-y-auto px-6">
                    <AnimatePresence>
                        {cart.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex flex-col items-center justify-center h-full space-y-6 text-center"
                            >
                                <div className="relative">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full opacity-75 blur"></div>
                                    <div className="relative bg-primary p-6 rounded-full">
                                        <ShoppingBag className="w-16 h-16 text-blue-600 dark:text-blue-400" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-secondary mb-2">Your cart is empty</h3>
                                    <p className="text-gray-500 dark:text-gray-400">Looks like you haven't added any courses yet</p>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setIsCartOpen(false)}
                                    className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
                                >
                                    Browse Courses
                                </motion.button>
                            </motion.div>
                        ) : (
                            // Cart items rendering - same as previous implementation
                            <ul className="space-y-4 pb-6">
                                {cart.map((item) => (
                                    <motion.li
                                        key={item.title}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700"
                                    >
                                        {/* Item details remain the same */}
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-3">
                                                    <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-lg">
                                                        <Package2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-medium dark:text-white">{item.title}</h3>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                                            ₹{item.price} per course
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => removeFromCart(item.title)}
                                                className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 bg-red-50 dark:bg-red-900/20 p-1.5 rounded-lg"
                                            >
                                                <X className="w-4 h-4" />
                                            </motion.button>
                                        </div>
                                        <div className="mt-4 flex justify-end">
                                            <p className="font-bold text-blue-600 dark:text-blue-400">
                                                ₹{(item.price * item.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                    </motion.li>
                                ))}
                            </ul>
                        )}
                    </AnimatePresence>
                </div>

                {/* Footer with Total, Promo Code, and Checkout */}
                {cart.length > 0 && (
                    <div className="border-t dark:border-gray-800 p-6 bg-white dark:bg-gray-900">
                        {/* Promo Code Section */}
                        <div className="mb-4 flex items-center space-x-2">
                            <div className="flex-1 relative">
                                <input
                                    type="text"
                                    placeholder="Enter Promo Code"
                                    value={promoCode}
                                    onChange={(e) => setPromoCode(e.target.value)}
                                    className="w-full p-2 pl-10 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                                />
                                <Tags className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={validatePromoCode}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                            >
                                Apply
                            </motion.button>
                        </div>
                        {promoError && (
                            <div className="text-red-600 text-sm mb-2">
                                {promoError}
                            </div>
                        )}
                        {promoDiscount > 0 && (
                            <div className="text-green-600 text-sm mb-2">
                                Promo code applied: {(promoDiscount * 100).toFixed(0)}% off
                            </div>
                        )}

                        <div className="mb-4 space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                                <span className="font-medium dark:text-white">₹{subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 dark:text-gray-400">GST (18%)</span>
                                <span className="font-medium dark:text-white">₹{gst.toFixed(2)}</span>
                            </div>
                            {promoDiscount > 0 && (
                                <div className="flex justify-between items-center text-green-600">
                                    <span>Promo Discount</span>
                                    <span>-₹{promoDiscountAmount.toFixed(2)}</span>
                                </div>
                            )}
                            <div className="flex justify-between items-center text-green-600">
                                <span>Launch Discount</span>
                                <span>-₹{launchDiscount.toFixed(2)}</span>
                            </div>
                            <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />
                            <div className="flex justify-between items-center">
                                <span className="font-bold text-lg dark:text-white">Total</span>
                                <span className="font-bold text-lg text-blue-600 dark:text-blue-400">
                                    ₹{finalTotal.toFixed(2)}
                                </span>
                            </div>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 rounded-xl font-medium transition-colors flex items-center justify-center space-x-2"
                        >
                            <CreditCard className="w-5 h-5" />
                            <span>Checkout Now</span>
                            <ArrowRight className="w-5 h-5" />
                        </motion.button>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default Cart;