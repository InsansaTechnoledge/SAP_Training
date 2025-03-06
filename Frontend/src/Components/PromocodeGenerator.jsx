import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Copy, RefreshCw, Tags, Trash2 } from 'lucide-react';

const PromoCodeGenerator = () => {
    const [percentage, setPercentage] = useState('');
    const [generatedCode, setGeneratedCode] = useState('');
    const [error, setError] = useState('');
    const [savedPromoCodes, setSavedPromoCodes] = useState({});

    // Load saved promo codes from local storage on component mount
    useEffect(() => {
        const storedPromoCodes = localStorage.getItem('insansaPromoCodes');
        if (storedPromoCodes) {
            setSavedPromoCodes(JSON.parse(storedPromoCodes));
        }
    }, []);

    const generatePromoCode = () => {
        // Reset previous states
        setError('');
        setGeneratedCode('');

        // Validate percentage input
        const discountPercentage = parseFloat(percentage);

        if (isNaN(discountPercentage) || discountPercentage < 0 || discountPercentage > 100) {
            setError('Please enter a valid percentage between 0 and 100');
            return;
        }

        // Generate promo code
        const randomString = Math.random().toString(36).substring(2, 7).toUpperCase();
        const promoCode = `INSANSA_ATTAINMENT_${Math.round(discountPercentage)}_${randomString}`;

        // Save promo code to local storage
        const updatedPromoCodes = {
            ...savedPromoCodes,
            [promoCode]: discountPercentage
        };

        setSavedPromoCodes(updatedPromoCodes);
        localStorage.setItem('insansaPromoCodes', JSON.stringify(updatedPromoCodes));

        setGeneratedCode(promoCode);
        setPercentage(''); // Clear input after generation
    };

    const copyToClipboard = (code) => {
        navigator.clipboard.writeText(code)
            .then(() => {
                alert('Promo code copied to clipboard!');
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    };

    const removePromoCode = (codeToRemove) => {
        const updatedPromoCodes = { ...savedPromoCodes };
        delete updatedPromoCodes[codeToRemove];

        setSavedPromoCodes(updatedPromoCodes);
        localStorage.setItem('insansaPromoCodes', JSON.stringify(updatedPromoCodes));
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg space-y-6">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Promo Code Generator</h2>
                <p className="text-gray-500 dark:text-gray-400 mt-2">Generate and manage custom promo codes</p>
            </div>

            <div className="space-y-4">
                <div className="relative">
                    <input
                        type="number"
                        value={percentage}
                        onChange={(e) => setPercentage(e.target.value)}
                        placeholder="Enter Discount Percentage"
                        className="w-full p-3 pl-10 border rounded-lg 
                            dark:bg-gray-700 dark:border-gray-600 
                            focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Tags className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>

                {error && (
                    <div className="text-red-600 text-sm text-center">
                        {error}
                    </div>
                )}

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={generatePromoCode}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg 
                        hover:bg-blue-700 transition-colors 
                        flex items-center justify-center space-x-2"
                >
                    <RefreshCw className="w-5 h-5" />
                    <span>Generate Promo Code</span>
                </motion.button>

                {generatedCode && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg flex justify-between items-center"
                    >
                        <span className="font-mono text-green-700 dark:text-green-300">
                            {generatedCode}
                        </span>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => copyToClipboard(generatedCode)}
                            className="text-green-600 hover:text-green-800 dark:text-green-400"
                        >
                            <Copy className="w-5 h-5" />
                        </motion.button>
                    </motion.div>
                )}
            </div>

            {/* Saved Promo Codes Section */}
            {Object.keys(savedPromoCodes).length > 0 && (
                <div className="border-t pt-4">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Saved Promo Codes</h3>
                    <div className="space-y-2">
                        {Object.entries(savedPromoCodes).map(([code, percentage]) => (
                            <motion.div
                                key={code}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-3 rounded-lg"
                            >
                                <div>
                                    <span className="font-mono text-gray-700 dark:text-gray-200 mr-2">{code}</span>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                        ({percentage}% off)
                                    </span>
                                </div>
                                <div className="flex space-x-2">
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => copyToClipboard(code)}
                                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
                                    >
                                        <Copy className="w-5 h-5" />
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => removePromoCode(code)}
                                        className="text-red-600 hover:text-red-800 dark:text-red-400"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </motion.button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PromoCodeGenerator;