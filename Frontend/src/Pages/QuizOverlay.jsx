import React from 'react';
import { AlertTriangle, ArrowRight, Clock } from 'lucide-react';

const QuizStartOverlay = ({ onStart, onPostpone }) => {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-xl w-full p-6 space-y-6">
                {/* Header */}
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900">Before You Begin</h2>
                    <p className="text-gray-600 mt-2">Please review these important tips before starting the quiz</p>
                </div>

                {/* Tips Section */}
                <div className="bg-gradient-to-br from-yellow-50 to-white rounded-xl p-6 border border-yellow-100">
                    <div className="flex items-center gap-2 mb-4">
                        <AlertTriangle className="h-5 w-5 text-yellow-600" />
                        <h3 className="font-semibold text-gray-900">Quiz Tips</h3>
                    </div>

                    <ul className="space-y-3">
                        <li className="flex items-start gap-2 text-gray-700">
                            <ArrowRight className="h-4 w-4 mt-1 text-yellow-600 shrink-0" />
                            Read each question carefully before selecting an answer
                        </li>
                        <li className="flex items-start gap-2 text-gray-700">
                            <ArrowRight className="h-4 w-4 mt-1 text-yellow-600 shrink-0" />
                            Take notes on questions you find challenging
                        </li>
                        <li className="flex items-start gap-2 text-gray-700">
                            <ArrowRight className="h-4 w-4 mt-1 text-yellow-600 shrink-0" />
                            Review explanations even for correct answers
                        </li>
                        <li className="flex items-start gap-2 text-gray-700">
                            <ArrowRight className="h-4 w-4 mt-1 text-yellow-600 shrink-0" />
                            You can only attempt this quiz once, so make sure you're prepared
                        </li>
                    </ul>
                </div>

                {/* Time Information */}
                <div className="flex items-center justify-center gap-2 text-gray-600">
                    <Clock className="h-5 w-5" />
                    <span>Time allowed: 1 minute per question</span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                    <button
                        onClick={onPostpone}
                        className="flex-1 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
                    >
                        Attempt Later
                    </button>
                    <button
                        onClick={onStart}
                        className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors font-medium"
                    >
                        Start Quiz
                    </button>
                </div>

                {/* Note */}
                <p className="text-sm text-gray-500 text-center">
                    Note: This quiz can only be attempted once. Make sure you're ready before starting.
                </p>
            </div>
        </div>
    );
};

export default QuizStartOverlay;