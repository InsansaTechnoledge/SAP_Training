import { CheckCircle, Gift } from 'lucide-react'
import React from 'react'

const PaymentSuccess = () => {
  return (
    <div className='pt-24 bg-theme-gradient'>
        <div className="space-y-6 text-center mt-10">
                    <div className="flex flex-col items-center">
                        <div className="relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-green-600 rounded-full opacity-75 blur"></div>
                            <div className="relative bg-card p-4 rounded-full">
                                <CheckCircle className="w-16 h-16 text-green-500" />
                            </div>
                        </div>
        
                        <h2 className="text-2xl font-bold text-secondary mt-6">Payment Successful!</h2>
                        <p className="text-gray mt-2">
                            Your courses are now ready to access
                        </p>
                    </div>
        
                    <div className="bg-card rounded-lg p-6">
                        <h3 className="text-lg font-medium text-secondary mb-4">Order Details</h3>
        
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray">Receipt Id</span>
                                <span className="font-medium text-secondary">{paymentInvoice.receiptNo}</span>
                            </div>
        
                            <div className="flex justify-between text-sm">
                                <span className="text-gray">Order ID</span>
                                <span className="font-medium text-secondary">{paymentInvoice.orderId}</span>
                            </div>
        
                            <div className="flex justify-between text-sm">
                                <span className="text-gray">Date</span>
                                <span className="font-medium text-secondary">{new Date().toLocaleDateString()}</span>
                            </div>
        
                            <div className="flex justify-between text-sm">
                                <span className="text-gray">Payment Id</span>
                                <span className="font-medium text-secondary">{paymentInvoice.paymentId}</span>
                            </div>
        
                            <div className="flex justify-between text-sm">
                                <span className="text-gray">Payment Method</span>
                                <span className="font-medium text-secondary">
                                    {paymentInvoice.paymentMethod}
                                </span>
                            </div>
        
                            <div className="flex justify-between text-sm">
                                <span className="text-gray">Amount Paid</span>
                                <span className="font-medium text-green-600">₹{finalTotal.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
        
                    <div className="space-y-3">
                        <h3 className="text-lg font-medium text-secondary">Your Courses</h3>
        
                        <div className="space-y-3">
                            {cart.map((item) => (
                                <div key={item.title} className="bg-card border-contrast  rounded-lg p-4 flex justify-between items-center">
                                    <div className="flex items-center space-x-3">
                                        <div className="bg-card-blue p-2 rounded-lg">
                                            <Gift className="w-5 h-5 text-blue" />
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