import React, { useState } from 'react';
import {
    CreditCard,
    CheckCircle,
    X,
    Shield,
    Gift,
    User,
    Mail,
    Phone,
    ChevronRight,
    Lock,
    AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

const Checkout = ({ checkoutData, inCartView = false, goBackToCart }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        cardNumber: '',
        cardExpiry: '',
        cardCvv: '',
        nameOnCard: '',
        agreeToTerms: false
    });
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [errors, setErrors] = useState({});
    const [isProcessing, setIsProcessing] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    const {
        cart,
        subtotal,
        gst,
        promoDiscount,
        promoDiscountAmount,
        launchDiscount,
        finalTotal
    } = checkoutData;

    const formatCardNumber = (value) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = v.match(/\d{4,16}/g);
        const match = matches && matches[0] || '';
        const parts = [];

        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }

        if (parts.length) {
            return parts.join(' ');
        } else {
            return value;
        }
    };

    const formatExpiryDate = (value) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');

        if (v.length >= 2) {
            return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
        }

        return v;
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        let processedValue = value;

        if (name === 'cardNumber') {
            processedValue = formatCardNumber(value);
        } else if (name === 'cardExpiry') {
            processedValue = formatExpiryDate(value);
        } else if (name === 'cardCvv') {
            processedValue = value.replace(/[^\d]/g, '').slice(0, 3);
        }

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

    const validateStep2 = () => {
        const newErrors = {};

        if (paymentMethod === 'card') {
            if (!formData.cardNumber.trim() || formData.cardNumber.replace(/\s/g, '').length < 16) {
                newErrors.cardNumber = 'Valid card number is required';
            }

            if (!formData.cardExpiry.trim() || formData.cardExpiry.length < 5) {
                newErrors.cardExpiry = 'Valid expiry date is required';
            }

            if (!formData.cardCvv.trim() || formData.cardCvv.length < 3) {
                newErrors.cardCvv = 'Valid CVV is required';
            }

            if (!formData.nameOnCard.trim()) {
                newErrors.nameOnCard = 'Name on card is required';
            }
        }

        if (!formData.agreeToTerms) {
            newErrors.agreeToTerms = 'You must agree to the terms and conditions';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleContinue = () => {
        if (currentStep === 1) {
            if (validateStep1()) {
                setCurrentStep(2);
            }
        } else if (currentStep === 2) {
            if (validateStep2()) {
                processPayment();
            }
        }
    };

    const processPayment = async () => {
        setIsProcessing(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Handle successful payment
            setIsComplete(true);

            // In a real application, you would:
            // 1. Send the payment info to your backend
            // 2. Process the payment using a payment processor
            // 3. Update user's account with purchased courses
            // 4. Display confirmation

        } catch (error) {
            setErrors({
                payment: 'Payment processing failed. Please try again.'
            });
        } finally {
            setIsProcessing(false);
        }
    };

    const renderOrderSummary = () => (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h3 className="font-medium mb-3 text-secondary">Order Summary</h3>
            <div className="space-y-2 mb-3">
                {cart.map((item) => (
                    <div key={item.title} className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">{item.title}</span>
                        <span className="font-medium text-secondary">₹{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                ))}
            </div>
            <div className="space-y-2 text-sm border-t pt-2 border-gray-200 dark:border-gray-700">
                <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                    <span className="text-secondary">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">GST (18%)</span>
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
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Full Name
                </label>
                <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className={`w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 dark:bg-gray-800 dark:border-gray-700 ${errors.fullName ? 'border-red-500' : 'border-gray-300'
                            }`}
                        placeholder="John Doe"
                    />
                </div>
                {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email Address
                </label>
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 dark:bg-gray-800 dark:border-gray-700 ${errors.email ? 'border-red-500' : 'border-gray-300'
                            }`}
                        placeholder="your@email.com"
                    />
                </div>
                {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Phone Number
                </label>
                <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 dark:bg-gray-800 dark:border-gray-700 ${errors.phone ? 'border-red-500' : 'border-gray-300'
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

    const renderStep2 = () => (
        <div className="space-y-4">
            <h2 className="text-xl font-bold text-secondary">Payment Method</h2>

            <div className="grid grid-cols-2 gap-3">
                <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`border rounded-lg p-4 flex items-center justify-center space-x-2 transition-all ${paymentMethod === 'card'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-300 dark:border-gray-700'
                        }`}
                >
                    <CreditCard className={`w-5 h-5 ${paymentMethod === 'card' ? 'text-blue-500' : 'text-gray-500 dark:text-gray-400'
                        }`} />
                    <span className={paymentMethod === 'card' ? 'text-blue-600 font-medium' : 'text-gray-600 dark:text-gray-400'}>
                        Credit Card
                    </span>
                </button>

                <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`border rounded-lg p-4 flex items-center justify-center space-x-2 transition-all ${paymentMethod === 'upi'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-300 dark:border-gray-700'
                        }`}
                >
                    <svg
                        viewBox="0 0 24 24"
                        className={`w-5 h-5 ${paymentMethod === 'upi' ? 'text-blue-500' : 'text-gray-500 dark:text-gray-400'
                            }`}
                        fill="currentColor"
                    >
                        <path d="M14.65,8.96L9.37,15.09H14.68L9.38,21.48L21.17,12.33H15.85L21.16,2.52L9.38,12.33H14.64" />
                    </svg>
                    <span className={paymentMethod === 'upi' ? 'text-blue-600 font-medium' : 'text-gray-600 dark:text-gray-400'}>
                        UPI
                    </span>
                </button>
            </div>

            {paymentMethod === 'card' && (
                <div className="space-y-4 mt-2">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Card Number
                        </label>
                        <div className="relative">
                            <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                name="cardNumber"
                                value={formData.cardNumber}
                                onChange={handleInputChange}
                                className={`w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 dark:bg-gray-800 dark:border-gray-700 ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="4242 4242 4242 4242"
                                maxLength="19"
                            />
                        </div>
                        {errors.cardNumber && (
                            <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Expiry Date
                            </label>
                            <input
                                type="text"
                                name="cardExpiry"
                                value={formData.cardExpiry}
                                onChange={handleInputChange}
                                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 dark:bg-gray-800 dark:border-gray-700 ${errors.cardExpiry ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="MM/YY"
                                maxLength="5"
                            />
                            {errors.cardExpiry && (
                                <p className="text-red-500 text-sm mt-1">{errors.cardExpiry}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                CVV
                            </label>
                            <input
                                type="text"
                                name="cardCvv"
                                value={formData.cardCvv}
                                onChange={handleInputChange}
                                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 dark:bg-gray-800 dark:border-gray-700 ${errors.cardCvv ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="123"
                                maxLength="3"
                            />
                            {errors.cardCvv && (
                                <p className="text-red-500 text-sm mt-1">{errors.cardCvv}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Name on Card
                        </label>
                        <input
                            type="text"
                            name="nameOnCard"
                            value={formData.nameOnCard}
                            onChange={handleInputChange}
                            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 dark:bg-gray-800 dark:border-gray-700 ${errors.nameOnCard ? 'border-red-500' : 'border-gray-300'
                                }`}
                            placeholder="John Doe"
                        />
                        {errors.nameOnCard && (
                            <p className="text-red-500 text-sm mt-1">{errors.nameOnCard}</p>
                        )}
                    </div>
                </div>
            )}

            {paymentMethod === 'upi' && (
                <div className="space-y-4 mt-2">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            UPI ID
                        </label>
                        <div className="relative">
                            <svg
                                viewBox="0 0 24 24"
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
                                fill="currentColor"
                            >
                                <path d="M14.65,8.96L9.37,15.09H14.68L9.38,21.48L21.17,12.33H15.85L21.16,2.52L9.38,12.33H14.64" />
                            </svg>
                            <input
                                type="text"
                                name="upiId"
                                className="w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 dark:bg-gray-800 dark:border-gray-700 border-gray-300"
                                placeholder="yourname@upi"
                            />
                        </div>
                    </div>

                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                        <div className="flex space-x-3">
                            <AlertCircle className="text-yellow-500 w-5 h-5 flex-shrink-0" />
                            <p className="text-sm text-yellow-700 dark:text-yellow-400">
                                After clicking "Pay Now", you'll receive a payment request on your UPI app.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex items-start mt-4">
                <div className="flex items-center h-5">
                    <input
                        id="terms"
                        name="agreeToTerms"
                        type="checkbox"
                        checked={formData.agreeToTerms}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                </div>
                <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="text-gray-600 dark:text-gray-400">
                        I agree to the <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
                    </label>
                    {errors.agreeToTerms && (
                        <p className="text-red-500 text-sm mt-1">{errors.agreeToTerms}</p>
                    )}
                </div>
            </div>

            {errors.payment && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                    <div className="flex space-x-3">
                        <X className="text-red-500 w-5 h-5 flex-shrink-0" />
                        <p className="text-sm text-red-700 dark:text-red-400">
                            {errors.payment}
                        </p>
                    </div>
                </div>
            )}

            {!inCartView && renderOrderSummary()}
        </div>
    );

    const renderComplete = () => (
        <div className="space-y-6 text-center">
            <div className="flex flex-col items-center">
                <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-green-600 rounded-full opacity-75 blur"></div>
                    <div className="relative bg-white dark:bg-gray-900 p-4 rounded-full">
                        <CheckCircle className="w-16 h-16 text-green-500" />
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-secondary mt-6">Payment Successful!</h2>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                    Your courses are now ready to access
                </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-medium text-secondary mb-4">Order Details</h3>

                <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Order ID</span>
                        <span className="font-medium text-secondary">#ORD-{Math.floor(Math.random() * 10000)}</span>
                    </div>

                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Date</span>
                        <span className="font-medium text-secondary">{new Date().toLocaleDateString()}</span>
                    </div>

                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Payment Method</span>
                        <span className="font-medium text-secondary">
                            {paymentMethod === 'card' ? 'Credit Card' : 'UPI'}
                        </span>
                    </div>

                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Amount Paid</span>
                        <span className="font-medium text-green-600">₹{finalTotal.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            <div className="space-y-3">
                <h3 className="text-lg font-medium text-secondary">Your Courses</h3>

                <div className="space-y-3">
                    {cart.map((item) => (
                        <div key={item.title} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg p-4 flex justify-between items-center">
                            <div className="flex items-center space-x-3">
                                <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-lg">
                                    <Gift className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-secondary">{item.title}</h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Access until: Lifetime
                                    </p>
                                </div>
                            </div>
                            <a
                                href="#"
                                className="bg-blue-100 dark:bg-blue-900/20 hover:bg-blue-200 dark:hover:bg-blue-900/30 text-blue-600 text-sm px-3 py-1 rounded-full transition-colors"
                            >
                                Start Learning
                            </a>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-6 space-y-3">
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => window.location.href = "/dashboard"}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-xl font-medium transition-colors"
                >
                    Go to Dashboard
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => window.location.href = "/courses"}
                    className="w-full bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-secondary py-3 rounded-xl font-medium transition-colors"
                >
                    Browse More Courses
                </motion.button>
            </div>
        </div>
    );

    return (
        <div className="px-6 pb-6">
            {!isComplete && (
                <div className="flex justify-between items-center mb-6">
                    <div className="flex space-x-2">
                        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 1
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                            }`}>
                            <span className="text-sm font-medium">1</span>
                        </div>
                        <div className={`h-1 w-8 mt-4 ${currentStep > 1
                            ? 'bg-blue-600'
                            : 'bg-gray-200 dark:bg-gray-700'
                            }`} />
                        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 2
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                            }`}>
                            <span className="text-sm font-medium">2</span>
                        </div>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                        {currentStep === 1 && 'Personal Information'}
                        {currentStep === 2 && 'Payment Details'}
                    </div>
                </div>
            )}

            {inCartView && !isComplete && renderOrderSummary()}

            <div className="mt-6">
                {currentStep === 1 && renderStep1()}
                {currentStep === 2 && renderStep2()}
                {isComplete && renderComplete()}

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
                                    {currentStep === 1 ? (
                                        <>
                                            <span>Continue to Payment</span>
                                            <ChevronRight className="w-5 h-5" />
                                        </>
                                    ) : (
                                        <>
                                            <Lock className="w-5 h-5" />
                                            <span>Pay Now ₹{finalTotal.toFixed(2)}</span>
                                        </>
                                    )}
                                </>
                            )}
                        </motion.button>

                        {currentStep === 2 && (
                            <button
                                onClick={() => setCurrentStep(1)}
                                className="w-full text-gray-600 dark:text-gray-400 py-2 mt-2 text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            >
                                Back to information
                            </button>
                        )}
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