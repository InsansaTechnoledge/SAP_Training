import React from 'react';
import { Lightbulb, Lock, ArrowRight } from 'lucide-react';

const NextModule = () => {
    const nextModule = {
        title: "Advanced ABAP",
        description: "Dive deep into advanced ABAP concepts with industry-standard practices and patterns",
        topics: [
            "Object-Oriented Programming",
            "Design Patterns",
            "ABAP Units",
            "ODATA"
        ],
        price: 49,
        isLocked: true
    };

    return (
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 shadow-lg text-white">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                    <Lightbulb className="h-5 w-5" />
                    Up Next
                </h2>
                {nextModule.isLocked && (
                    <span className="flex items-center text-xs bg-white/20 px-2 py-1 rounded">
                        <Lock className="h-3 w-3 mr-1" />
                        Premium
                    </span>
                )}
            </div>

            <h3 className="text-xl font-bold mb-2">{nextModule.title}</h3>
            <p className="text-blue-100 mb-4">{nextModule.description}</p>

            <div className="mb-6">
                <h4 className="text-sm uppercase tracking-wider text-blue-200 mb-2">What you'll learn</h4>
                <ul className="space-y-2">
                    {nextModule.topics.map((topic, index) => (
                        <li key={index} className="flex items-center gap-2">
                            <ArrowRight className="h-4 w-4 text-blue-300" />
                            <span>{topic}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <button className="w-full py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
                <span>Unlock for ${nextModule.price}</span>
            </button>
        </div>
    );
};

export default NextModule;
