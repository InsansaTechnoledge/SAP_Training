import React from 'react';
import { List, CheckCircle, Play } from 'lucide-react';

const CourseContent = () => {
    const moduleVideos = [
        { id: 1, title: "Introduction to ABAP", duration: "10:00", completed: true },
        { id: 2, title: "Data Types & Variables", duration: "8:00", completed: false },
        { id: 3, title: "Control Structures", duration: "12:00", completed: false }
    ];

    return (
        <div className="bg-card rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-secondary">
                <List className="h-5 w-5 text-blue" />
                Course Content
            </h2>

            <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-blue-600 rounded-full"
                            style={{ width: '40%' }}
                        ></div>
                    </div>
                    <span className="text-sm font-medium text-blue-600">40%</span>
                </div>
                <p className="text-sm text-gray-500">4 of 10 videos completed</p>
            </div>

            {/* Module Videos */}
            <div className="space-y-3">
                {moduleVideos.map(video => (
                    <div key={video.id} className="flex items-center p-3 rounded-lg border-contrast hover:bg-gray-50 transition-colors">
                        <div className="mr-3">
                            {video.completed ? (
                                <CheckCircle className="h-5 w-5 text-green-500" />
                            ) : (
                                <Play className="h-5 w-5 text-blue-600" />
                            )}
                        </div>
                        <div className="flex-1">
                            <h3 className="font-medium text-secondary">{video.title}</h3>
                            <p className="text-sm text-gray-500">{video.duration}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CourseContent;