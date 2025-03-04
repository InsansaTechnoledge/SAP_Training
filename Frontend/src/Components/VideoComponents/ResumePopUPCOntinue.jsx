import React from "react";

const ResumePopup = ({ resumeTime, onResume, onCancel, formatTime }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-50 p-4">
            <div className="bg-gradient-to-b from-gray-900 to-gray-800 p-6 rounded-xl shadow-2xl text-center max-w-md w-full border border-gray-700">
                <div className="mb-5">
                    <h2 className="text-2xl font-bold text-white mb-3">Continue Watching?</h2>
                    <p className="text-gray-300">
                        You left off at <span className="text-blue-400 font-semibold">{formatTime(resumeTime)}</span>
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                    <button
                        className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        onClick={() => onResume(resumeTime)}
                    >
                        Resume
                    </button>
                    <button
                        className="flex-1 bg-transparent hover:bg-gray-700 text-gray-300 font-medium py-3 px-6 rounded-lg border border-gray-600 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                        onClick={onCancel}
                    >
                        Start Over
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResumePopup;