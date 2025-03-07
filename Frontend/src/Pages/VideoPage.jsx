import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

import Video2 from '../assets/Video2.mp4'; // Fallback video
import VideoDiscussion from '../Components/VideoComponents/VideoDiscussion';
import ScheduleCall from '../Components/VideoComponents/ScheduleCall';
import Resources from '../Components/VideoComponents/Resources';
import NextModule from '../Components/VideoComponents/NextModule';
import CourseContent from '../Components/VideoComponents/CourseContent';
import VideoNotes from '../Components/VideoComponents/VideoNotes';
import VideoPlayer from '../Components/VideoComponents/VideoPlayer';
import CryptoJS from 'crypto-js';
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import BreadcrumbNavigation from '../Components/VideoComponents/BreadCrumbs';
import axios from 'axios';
import { API_BASE_URL } from '../config';


const VideoPage = () => {
    const [currentTime, setCurrentTime] = useState(0);
    const [videoBlobUrl, setVideoBlobUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [videoKey, setVideoKey] = useState(Date.now().toString()); // Unique key for video element
    const [video, setVideo] = useState();
    const [currentVideo, setCurrentVideo] = useState({
        title: '',
        duration: '',
        progress: 0,
        module: "",
        src: ''
    });
    const [breadcrumbItems, setBreadcrumbItems] = useState([]);
    const [progress, setProgress] = useState(0);

    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    // const {module, moduleId} = location.state;
    const [module,setModule] = useState();

    useEffect(() => {
        const videoId = searchParams.get('videoId');
        const moduleId = searchParams.get('moduleId');
        const fetchVideo = async () => {
            try {

                const response = await axios.get(`${API_BASE_URL}/api/v1/videos/video?id=${videoId}`);
                if (response.status === 200) {
                    // console.log(response);
                    setVideo(response.data);
                }

                const response2 = await axios.get(`${API_BASE_URL}/api/v1/contents/video?id=${moduleId}`);
                if (response2.status === 200) {
                    console.log(response2.data);
                    setModule(response2.data);
                }
            }
            catch (err) {
                console.log("error fetching video", err);
            }
        }

        const fetchModuleDetails = async () => {
            // const response = await axios.get(`${API_BASE_URL}/api/v1`)
        }

        fetchVideo();       
        fetchModuleDetails();
    }, []);

    useEffect(() => {
        if (video) {

            setCurrentVideo({
                title: video.contentId.title,
                duration: video.contentId.duration,
                progress: progress,
                module: "",
                source: video.source
            });
        }

        if(module){
            setBreadcrumbItems([
                {
                    label: `${module.name}`,
                    onClick: () => {
                        navigate(`/course?id=${module.$id}`)
                        console.log('Navigate to ABAP Fundamentals module');
                    }
                },
                {
                    label: `${video.contentId.title}`
                }
            ]);
        }
    }, [video, module]);

    useEffect(()=>{
        if(currentVideo.title!=''){
            setIsLoading(false);
        }
    },[currentVideo])

    // Sample video data
    // const currentVideo = {
    //     title: "Introduction to ABAP",
    //     duration: "10:00",
    //     progress: 40,
    //     module: "ABAP Fundamentals",
    //     src: Video2
    // };

    // Encryption key (should be stored securely and fetched from backend)
    // In production, NEVER expose this in client-side code
    const SECRET_KEY = "your-secure-encryption-key";

    // Function to encrypt a URL
    const encryptUrl = (url) => {
        return CryptoJS.AES.encrypt(url, SECRET_KEY).toString();
    };

    // Function to decrypt a URL
    const decryptUrl = (encryptedUrl) => {
        const bytes = CryptoJS.AES.decrypt(encryptedUrl, SECRET_KEY);
        return bytes.toString(CryptoJS.enc.Utf8);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // useEffect(() => {
    //     // In a real application, this encrypted URL would come from your backend API
    //     // rather than being encrypted in the frontend
    //     const videoUrl = "https://res.cloudinary.com/dgapvegsq/video/upload/v1739252871/ydjmvohvg00e2dxnbojo.mp4";

    //     // Encrypt the URL
    //     const encryptedUrl = encryptUrl(videoUrl);
    //     console.log("Encrypted URL (this should only be visible during development):", encryptedUrl);

    //     // Instead of storing the full decrypted URL, we'll use a short-lived token approach
    //     const fetchVideo = async () => {
    //         try {
    //             setIsLoading(true);

    //             // In a production environment, this should be a secure API call
    //             // that validates user session/permissions before returning the video
    //             const decryptedUrl = decryptUrl(encryptedUrl);

    //             // Add a unique token or timestamp to prevent caching and make the URL harder to extract
    //             const tokenizedUrl = `${decryptedUrl}${decryptedUrl.includes('?') ? '&' : '?'}token=${Date.now()}`;

    //             const response = await fetch(tokenizedUrl, {
    //                 method: "GET",
    //                 headers: {
    //                     // Add custom headers that your server can validate
    //                     'X-Secure-Request': 'true',
    //                     'X-Request-Timestamp': Date.now().toString()
    //                 },
    //             });

    //             if (!response.ok) {
    //                 throw new Error(`HTTP error! Status: ${response.status}`);
    //             }

    //             const blob = await response.blob();

    //             // Create a blob URL but don't expose it directly
    //             const blobUrl = URL.createObjectURL(blob);
    //             setVideoBlobUrl(blobUrl);

    //             // Generate a new key to force the video element to re-render
    //             // This helps prevent inspection of the previous source
    //             setVideoKey(Date.now().toString());
    //         } catch (error) {
    //             console.error("Error fetching video:", error);
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     };

    //     fetchVideo();

    //     // Clean up function to revoke the blob URL when component unmounts
    //     return () => {
    //         if (videoBlobUrl) {
    //             URL.revokeObjectURL(videoBlobUrl);
    //             setVideoBlobUrl(null);
    //         }
    //     };
    // }, []);

    // Additional security measures
    
    useEffect(() => {
        // Disable right-click menu on the whole page
        const handleContextMenu = (e) => e.preventDefault();

        // Disable keyboard shortcuts for developer tools
        const handleKeyDown = (e) => {
            // Prevent F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C
            if (
                e.keyCode === 123 ||
                (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67))
            ) {
                e.preventDefault();
            }
        };

        // Track if developer tools are open (may not work in all browsers)
        const detectDevTools = () => {
            const widthThreshold = window.outerWidth - window.innerWidth > 160;
            const heightThreshold = window.outerHeight - window.innerHeight > 160;

            if (widthThreshold || heightThreshold) {
                // Optional: Take action if dev tools detected
                console.log("Developer tools may be open");
                // You could blur the video, pause it, or take other actions
            }
        };

        document.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('keydown', handleKeyDown);
        window.addEventListener('resize', detectDevTools);

        // Set initial check
        detectDevTools();

        // Clean up
        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
            document.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('resize', detectDevTools);
        };
    }, []);

    

    if (!video || !module) {
        return <div>
            Loaidng...
        </div>
    }

    return (
        <div
            className="min-h-screen bg-theme-gradient"
            onCopy={(e) => e.preventDefault()}
            onContextMenu={(e) => e.preventDefault()}
        >
            <div className="container mx-auto px-4 py-8 mt-20">
                {/* Navigation Breadcrumb */}
                <BreadcrumbNavigation items={breadcrumbItems} />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Video Player Section */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Video Player */}
                        {isLoading ? (
                            <div className="aspect-video bg-gray-800 flex items-center justify-center">
                                <div className="text-white">Loading secure video content...</div>
                            </div>
                        ) : (
                            // Pass the key to force re-render and use the modified VideoPlayer
                            <VideoPlayer
                                key={videoKey}
                                videoBlobUrl={currentVideo.source}
                                onTimeUpdate={(time) => setCurrentTime(time)}
                                encryptedSrc={encryptUrl(currentVideo.source || "")} // This is what will show in inspected elements
                                setProgress={setProgress}
                            />
                        )}

                        {/* Video Info */}
                        <div>
                            <h1 className="text-2xl font-bold text-secondary mb-2">
                                {currentVideo.title}
                            </h1>
                            <p className="text-secondary">
                                Part of <span className="text-blue">{currentVideo.module}</span> module
                            </p>
                        </div>


                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6 lg:h-[35rem] lg:overflow-scroll overflow-x-hidden 
                scrollbar-thin scrollbar-track-gray-200
                scrollbar-thumb-blue-500 hover:scrollbar-thumb-blue-700 
                transition-all duration-300">  

                        {/* Course Progress */}
                        <CourseContent content={module.contentId} moduleId={module.$id}/>

                        {/* Schedule a Call */}
                        <ScheduleCall />

                        {/* Resources */}
                        <Resources />

                        {/* Next Module */}
                        <NextModule />
                    </div>
                    <div className='gap-8 lg:col-span-3 space-y-6'>
                        {/* Notes Section */}
                        <VideoNotes currentTime={currentTime} formatTime={formatTime} />

                        {/* Discussion Section */}
                        <VideoDiscussion />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoPage;