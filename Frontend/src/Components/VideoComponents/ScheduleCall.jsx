import React, { useState } from 'react';
import { Phone, Calendar } from 'lucide-react';

const ScheduleCall = () => {
    const [showCallForm, setShowCallForm] = useState(false);

    return (
        <div className="bg-card rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-secondary">
                <Phone className="h-5 w-5 text-blue" />
                Get Expert Help
            </h2>

            <p className="text-secondary mb-4">Still have questions? Schedule a 1-on-1 call with an instructor to get personalized help.</p>

            {!showCallForm ? (
                <button
                    onClick={() => setShowCallForm(true)}
                    className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors flex items-center justify-center gap-2"
                >
                    <Calendar className="h-4 w-4" />
                    Schedule a Call
                </button>
            ) : (
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-secondary mb-1">Preferred Date</label>
                        <input
                            type="date"
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-secondary mb-1">Topic</label>
                        <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>ABAP Syntax Questions</option>
                            <option>Debugging Issues</option>
                            <option>Project Guidance</option>
                            <option>Career Advice</option>
                        </select>
                    </div>
                    <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors">
                        Submit Request
                    </button>
                </div>
            )}
        </div>
    );
};

export default ScheduleCall;
