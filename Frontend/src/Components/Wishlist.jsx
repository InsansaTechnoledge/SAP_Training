import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, ShoppingCart, Sparkles, ArrowRight } from 'lucide-react';
import { useWishlist } from '../Context/WishlistContext';
import { useCart } from '../Context/CartContext';

const Wishlist = () => {
    const {wishlist, setIsWishlistOpen, removeFromWishlist} = useWishlist();
    const {addToCart} = useCart();

    return (
        <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 w-full sm:w-[448px] h-full bg-theme-gradient shadow-2xl z-50 flex flex-col"
        >
            <div className="flex-1 flex flex-col h-full">
                {/* Header */}
                <div className="p-6">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            <div className="bg-pink-100 dark:bg-pink-900 p-2 rounded-xl">
                                <Heart className="w-6 h-6 text-pink-600 dark:text-pink-400" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-secondary">Your Wishlist</h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {wishlist.length} {wishlist.length === 1 ? 'course' : 'courses'}
                                </p>
                            </div>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsWishlistOpen(false)}
                            className="bg-secondary p-2 rounded-xl text-primary dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                        >
                            <X className="w-5 h-5 text-primary" />
                        </motion.button>
                    </div>
                </div>

                {/* Wishlist Items */}
                <div className="flex-1 overflow-y-auto px-6">
                    <AnimatePresence>
                        {wishlist.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex flex-col items-center justify-center h-full space-y-6 text-center"
                            >
                                <div className="relative">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full opacity-75 blur"></div>
                                    <div className="relative bg-primary p-6 rounded-full">
                                        <Heart className="w-16 h-16 text-pink-600 dark:text-pink-400" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-secondary mb-2">Your wishlist is empty</h3>
                                    <p className="text-gray-500 dark:text-gray-400">Save your favorite courses for later</p>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setIsWishlistOpen(false)}
                                    className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-pink-700 hover:to-purple-700 transition-colors"
                                >
                                    Discover Courses
                                </motion.button>
                            </motion.div>
                        ) : (
                            <ul className="space-y-4 pb-6">
                                {wishlist.map((item) => (
                                    <motion.li
                                        key={item.title}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700"
                                    >
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-12 h-12 bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/50 dark:to-purple-900/50 rounded-xl flex items-center justify-center">
                                                        {item.icon}
                                                    </div>
                                                    <div>
                                                        <h3 className="font-medium dark:text-white">{item.title}</h3>
                                                        <div className="flex items-center space-x-2">
                                                            <span className="text-sm font-semibold text-pink-600 dark:text-pink-400">
                                                                ${item.price}
                                                            </span>
                                                            <Sparkles className="w-4 h-4 text-yellow-500" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => removeFromWishlist(item.title)}
                                                className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 bg-red-50 dark:bg-red-900/20 p-1.5 rounded-lg"
                                            >
                                                <X className="w-4 h-4" />
                                            </motion.button>
                                        </div>
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => {
                                                addToCart(item);
                                                removeFromWishlist(item.title);
                                            }}
                                            className="mt-4 w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white py-3 rounded-xl transition-colors"
                                        >
                                            <ShoppingCart className="w-4 h-4" />
                                            <span>Add to Cart</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </motion.button>
                                    </motion.li>
                                ))}
                            </ul>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
};

export default Wishlist;