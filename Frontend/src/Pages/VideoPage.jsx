import React, { useState, useRef, useEffect } from 'react';
import {
    ChevronRight,
} from 'lucide-react';

import Video2 from '../assets/Video2.mp4';
import VideoDiscussion from '../Components/VideoComponents/VideoDiscussion';
import ScheduleCall from '../Components/VideoComponents/ScheduleCall';
import Resources from '../Components/VideoComponents/Resources';
import NextModule from '../Components/VideoComponents/NextModule';
import CourseContent from '../Components/VideoComponents/CourseContent';
import VideoNotes from '../Components/VideoComponents/VideoNotes';
import VideoPlayer from '../Components/VideoComponents/VideoPlayer';

const VideoPage = () => {
    const [currentTime, setCurrentTime] = useState(0);

    // Sample video data

    const currentVideo = {
        title: "Introduction to ABAP",
        duration: "10:00",
        progress: 40,
        module: "ABAP Fundamentals",
        src: Video2
    };
    
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const [videoBlobUrl, setVideoBlobUrl] = useState(null);



    useEffect(() => {
        // Fetch video as a Blob to hide original URL
        const fetchVideo = async () => {
            try {
                const response = await fetch("https://res.cloudinary.com/dgapvegsq/video/upload/v1739252871/ydjmvohvg00e2dxnbojo.mp4", {
                    method: "GET",
                   
                });
                const blob = await response.blob();
                const blobUrl = URL.createObjectURL(blob);
                setVideoBlobUrl(blobUrl);
            } catch (error) {
                console.error("Error fetching video:", error);
            }
        };

        fetchVideo();

        return () => {
            if (videoBlobUrl) URL.revokeObjectURL(videoBlobUrl);
        };
    }, []);


    return (
        <div className="min-h-screen bg-theme-gradient" onCopy={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()}>
            <div className="container mx-auto px-4 py-8 mt-20">
                {/* Navigation Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-secondary mb-6">
                    <span>ABAP Fundamentals</span>
                    <ChevronRight className="h-4 w-4" />
                    <span className="text-blue">Introduction to ABAP</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Video Player Section */}

                    <div className="lg:col-span-2 space-y-6">
                        {/* Video Player */}
                       
                        <VideoPlayer videoBlobUrl={videoBlobUrl} />

                        {/* Video Info */}
                        <div>
                            <h1 className="text-2xl font-bold text-secondary mb-2">
                                {currentVideo.title}
                            </h1>
                            <p className="text-secondary">
                                Part of <span className="text-blue">{currentVideo.module}</span> module
                            </p>
                        </div>

                        {/* Notes Section */}
                        
                        <VideoNotes currentTime={currentTime} formatTime={formatTime} />


                        {/* Discussion Section */}

                       <VideoDiscussion/>

                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Course Progress */}
                        
                        <CourseContent/>

                        {/* Schedule a Call */}
                       
                        <ScheduleCall/>

                        {/* Resources */}
                       
                        <Resources/>

                        {/* Next Module */}

                        <NextModule/>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoPage;