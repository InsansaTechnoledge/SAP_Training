import React from 'react';
import { X, Minus, Plus, ShoppingBag, CreditCard, Package2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Cart = ({ cart, setCart, setIsCartOpen }) => {
    const removeFromCart = (title) => {
        setCart((prevCart) => {
            return prevCart
                .map(item =>
                    item.title === title ? { ...item, quantity: item.quantity - 1 } : item
                )
                .filter(item => item.quantity > 0);
        });
    };

    const addToCart = (title) => {
        setCart((prevCart) => {
            return prevCart.map(item =>
                item.title === title ? { ...item, quantity: item.quantity + 1 } : item
            );
        });
    };

    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 w-full sm:w-[448px] h-full bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 shadow-2xl z-50 flex flex-col"
        >
            <div className="flex-1 flex flex-col h-full">
                {/* Header */}
                <div className="p-6">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-xl">
                                <ShoppingBag className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold dark:text-white">Your Cart</h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {cart.length} {cart.length === 1 ? 'item' : 'items'}
                                </p>
                            </div>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsCartOpen(false)}
                            className="bg-gray-100 dark:bg-gray-800 p-2 rounded-xl text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </motion.button>
                    </div>
                </div>

                {/* Cart Items */}
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
                                    <div className="relative bg-white dark:bg-gray-900 p-6 rounded-full">
                                        <ShoppingBag className="w-16 h-16 text-blue-600 dark:text-blue-400" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold dark:text-white mb-2">Your cart is empty</h3>
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
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-3">
                                                    <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-lg">
                                                        <Package2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-medium dark:text-white">{item.title}</h3>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                                            ${item.price} per course
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
                                        <div className="mt-4 flex justify-between items-center">
                                            <div className="flex items-center space-x-3">
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => removeFromCart(item.title)}
                                                    className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </motion.button>
                                                <span className="font-medium dark:text-white w-8 text-center">{item.quantity}</span>
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => addToCart(item.title)}
                                                    className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </motion.button>
                                            </div>
                                            <p className="font-bold text-blue-600 dark:text-blue-400">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                    </motion.li>
                                ))}
                            </ul>
                        )}
                    </AnimatePresence>
                </div>

                {/* Footer with Total and Checkout */}
                {cart.length > 0 && (
                    <div className="border-t dark:border-gray-800 p-6 bg-white dark:bg-gray-900">
                        <div className="mb-4 space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                                <span className="font-medium dark:text-white">${totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 dark:text-gray-400">Tax (10%)</span>
                                <span className="font-medium dark:text-white">${(totalPrice * 0.1).toFixed(2)}</span>
                            </div>
                            <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />
                            <div className="flex justify-between items-center">
                                <span className="font-bold text-lg dark:text-white">Total</span>
                                <span className="font-bold text-lg text-blue-600 dark:text-blue-400">
                                    ${(totalPrice * 1.1).toFixed(2)}
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