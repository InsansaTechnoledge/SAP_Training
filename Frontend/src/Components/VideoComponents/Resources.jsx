import React from 'react';
import { FileText, Download } from 'lucide-react';

const Resources = () => {
    const resources = [
        { id: 1, title: "ABAP Fundamentals Cheat Sheet", type: "PDF", size: "2.1 MB" },
        { id: 2, title: "Exercise Files", type: "ZIP", size: "4.5 MB" },
        { id: 3, title: "Code Examples", type: "TXT", size: "156 KB" },
        { id: 4, title: "Practice Questions", type: "PDF", size: "1.8 MB" }
    ];

    return (
        <div className="bg-card rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-secondary">
                <FileText className="h-5 w-5 text-blue" />
                Resources
            </h2>

            <div className="space-y-3">
                {resources.map(resource => (
                    <div key={resource.id} className="flex items-center justify-between p-3 rounded-lg border-contrast hover:bg-gray-50 transition-colors">
                        <div className="flex items-center">
                            <div className="mr-3 p-2 bg-blue-100 rounded text-blue-600">
                                <FileText className="h-4 w-4" />
                            </div>
                            <div>
                                <h3 className="font-medium text-secondary">{resource.title}</h3>
                                <p className="text-xs text-gray-500">{resource.type} • {resource.size}</p>
                            </div>
                        </div>
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
                            <Download className="h-4 w-4" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Resources;
