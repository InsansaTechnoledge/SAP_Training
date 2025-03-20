import React from 'react'

const PaymentFailedAlert = ({alertMessage, setAlertVisible}) => {
    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 logout-confirm">
            <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm mx-4 w-full">
                <h3 className="text-lg font-medium text-blue-900 mb-2">Oops! something went wrong</h3>
                <p className="text-gray-600 mb-4">{alertMessage}</p>
                <div className="flex space-x-3 justify-end">
                    <button
                        onClick={()=>setAlertVisible(false)}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors"
                    >
                        Okay
                    </button>
                    
                </div>
            </div>
        </div>
    )
}

export default PaymentFailedAlert