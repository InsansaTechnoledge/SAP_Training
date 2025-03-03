import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
    Play, Pause, RotateCcw, RotateCw, Volume2, VolumeX, Maximize2, Minimize2, Settings, AlertTriangle,
    PictureInPicture, Layers, Lock, Unlock, Download, FileText, Bookmark, BookmarkCheck
} from 'lucide-react';

const VideoPlayer = ({ videoBlobUrl, onTimeUpdate , encryptedSrc }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(1);
    const [playbackSpeed, setPlaybackSpeed] = useState(1);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showSpeedMenu, setShowSpeedMenu] = useState(false);
    const [videoBlurred, setVideoBlurred] = useState(false);
    const [screenCaptureAttempted, setScreenCaptureAttempted] = useState(false);
    const [isRewindActive, setIsRewindActive] = useState(false);
    const [isForwardActive, setIsForwardActive] = useState(false);
    const videoRef = useRef(null);
    const videoContainerRef = useRef(null);
    const progressBarRef = useRef(null);
    const watermarkCanvasRef = useRef(null);
    const [tabSwitched, setTabSwitched] = useState(false);
    const [idleWarningShown, setIdleWarningShown] = useState(false);
    const [lastActiveTime, setLastActiveTime] = useState(Date.now());
    const [hoverTime, setHoverTime] = useState(null);
    const [hoverX, setHoverX] = useState(0);

    // New state variables
    const [controlsVisible, setControlsVisible] = useState(true);
    const [autoHideControls, setAutoHideControls] = useState(true);
    const [controlsTimeout, setControlsTimeout] = useState(null);
    const [controlsLocked, setControlsLocked] = useState(false);
    const [videoQuality, setVideoQuality] = useState('auto');
    const [showQualityMenu, setShowQualityMenu] = useState(false);
    const [bookmarks, setBookmarks] = useState([]);
    const [showBookmarks, setShowBookmarks] = useState(false);
    const [watchHistory, setWatchHistory] = useState(0); // Percentage of video watched
    const [bufferingProgress, setBufferingProgress] = useState(0);
    const [isPipActive, setIsPipActive] = useState(false);
    const [videoDescription, setVideoDescription] = useState(null);
    const [transcodingProgress, setTranscodingProgress] = useState(100); // Simulated transcode progress (100 = complete)
    const [isHDAvailable, setIsHDAvailable] = useState(true);
    const [userActivity, setUserActivity] = useState({ type: null, timestamp: null });

    const sessionId = useMemo(() => {
        const timestamp = Date.now().toString(36);
        const randomPart = Math.random().toString(36).substring(2, 8);
        return `${timestamp}-${randomPart}`;
    }, []);

    const watermarkText = "Protected Content - Not for Distribution";

    const playbackSpeeds = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
    const qualityOptions = ['auto', '1080p', '720p', '480p', '360p'];

    const handlePlayPause = () => {
        handleResetBlur();
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    // Forward 10s
    const handleForward = () => {
        handleResetBlur();
        if (videoRef.current) {
            const newTime = Math.min(videoRef.current.currentTime + 10, duration);
            videoRef.current.currentTime = newTime;
            setCurrentTime(newTime);
            setIsForwardActive(true);
            setTimeout(() => setIsForwardActive(false), 300);

            // Log user interaction
            logUserActivity('forward', newTime);
        }
    };

    // Rewind 10s
    const handleRewind = () => {
        handleResetBlur();
        if (videoRef.current) {
            const newTime = Math.max(videoRef.current.currentTime - 10, 0);
            videoRef.current.currentTime = newTime;
            setCurrentTime(newTime);
            setIsRewindActive(true);
            setTimeout(() => setIsRewindActive(false), 300);

            // Log user interaction
            logUserActivity('rewind', newTime);
        }
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime);

            // Calculate and update watch history
            const percentage = (videoRef.current.currentTime / videoRef.current.duration) * 100;
            setWatchHistory(Math.max(watchHistory, percentage));

            // Save current time to localStorage for resume functionality
            localStorage.setItem('videoPlayerLastTime', videoRef.current.currentTime);
        }
    };

    const handleFullscreen = () => {
        handleResetBlur();
        if (!document.fullscreenElement) {
            videoContainerRef.current.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    const handleSpeedChange = (speed) => {
        handleResetBlur();
        if (videoRef.current) {
            videoRef.current.playbackRate = speed;
            setPlaybackSpeed(speed);
            setShowSpeedMenu(false);

            // Log user interaction
            logUserActivity('speedChange', speed);
        }
    };

    const handleVolumeChange = (e) => {
        handleResetBlur();
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (videoRef.current) {
            videoRef.current.volume = newVolume;
            setIsMuted(newVolume === 0);

            // Save volume preference
            localStorage.setItem('videoPlayerVolume', newVolume);
        }
    };

    const toggleMute = () => {
        handleResetBlur();
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
            if (!isMuted) {
                setVolume(0);
            } else {
                const savedVolume = localStorage.getItem('videoPlayerVolume');
                const newVolume = savedVolume ? parseFloat(savedVolume) : 1;
                setVolume(newVolume);
                videoRef.current.volume = newVolume;
            }
        }
    };

    // New function to log user activity
    const logUserActivity = (type, value) => {
        const newActivity = {
            type,
            value,
            timestamp: new Date().toISOString()
        };
        setUserActivity(newActivity);

        // In a real implementation, you might want to batch these and send to a server
        // For now, we'll just log to console
        console.log('User activity:', newActivity);
    };

    // Handle Picture-in-Picture mode
    const togglePictureInPicture = async () => {
        handleResetBlur();
        try {
            if (document.pictureInPictureElement) {
                await document.exitPictureInPicture();
                setIsPipActive(false);
            } else if (videoRef.current) {
                // Use custom PiP implementation that keeps watermark
                await videoRef.current.requestPictureInPicture();
                setIsPipActive(true);
            }
        } catch (error) {
            console.error("PiP failed:", error);
            // Show notification to user
            alert("Picture-in-Picture mode is not supported in your browser");
        }
    };

    // Add bookmark at current time
    const addBookmark = () => {
        if (videoRef.current) {
            const time = videoRef.current.currentTime;
            const newBookmark = {
                id: Date.now(),
                time,
                label: `Bookmark at ${formatTime(time)}`
            };
            setBookmarks([...bookmarks, newBookmark]);

            // Store bookmarks in localStorage
            localStorage.setItem('videoBookmarks', JSON.stringify([...bookmarks, newBookmark]));
        }
    };

    // Jump to bookmark
    const jumpToBookmark = (time) => {
        if (videoRef.current) {
            videoRef.current.currentTime = time;
            setCurrentTime(time);
            setShowBookmarks(false);
        }
    };

    // Remove bookmark
    const removeBookmark = (id) => {
        const updatedBookmarks = bookmarks.filter(bookmark => bookmark.id !== id);
        setBookmarks(updatedBookmarks);
        localStorage.setItem('videoBookmarks', JSON.stringify(updatedBookmarks));
    };

    // Toggle quality option
    const handleQualityChange = (quality) => {
        setVideoQuality(quality);
        setShowQualityMenu(false);

        // Simulate quality change - in a real implementation you would
        // switch video sources or use adaptive streaming
        console.log(`Quality changed to ${quality}`);

        // Log user interaction
        logUserActivity('qualityChange', quality);
    };

    // Toggle controls lock
    const toggleControlsLock = () => {
        setControlsLocked(!controlsLocked);
        // When locking controls, make sure they're visible
        if (!controlsLocked) {
            setControlsVisible(true);
            // Clear any existing timeouts
            if (controlsTimeout) {
                clearTimeout(controlsTimeout);
            }
        }
    };

    // Handle mouse movement to show/hide controls
    const handleMouseMove = () => {
        if (autoHideControls && !controlsLocked) {
            setControlsVisible(true);

            // Clear any existing timeout
            if (controlsTimeout) {
                clearTimeout(controlsTimeout);
            }

            // Set new timeout to hide controls after 3 seconds
            const timeout = setTimeout(() => {
                setControlsVisible(false);
            }, 3000);

            setControlsTimeout(timeout);
        }
    };

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                setTabSwitched(true);
                if (videoRef.current && isPlaying) {
                    videoRef.current.pause();
                    setIsPlaying(false);
                }
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
    }, [isPlaying]);

    useEffect(() => {
        const idleCheckInterval = setInterval(() => {
            const idleTime = Date.now() - lastActiveTime;

            // Show warning after 2 minutes (120000 ms)
            if (idleTime > 120000 && !idleWarningShown) {
                console.log("Idle Warning Triggered");
                setIdleWarningShown(true);
            }

            // Blur video and pause after 3 minutes (180000 ms)
            if (idleTime > 180000) {
                console.log("User inactive for too long, blurring video...");
                setVideoBlurred(true);
                if (isPlaying) {
                    videoRef.current.pause();
                    setIsPlaying(false);
                }
            }
        }, 1000); // Check every 1 second

        return () => clearInterval(idleCheckInterval);
    }, [lastActiveTime, idleWarningShown, isPlaying]);



    const handleResetBlur = () => {
        setVideoBlurred(false);
        setScreenCaptureAttempted(false);

        setTimeout(() => {
            setIdleWarningShown(false); // Delay resetting idle warning
        }, 1000); // Reset warning 1 sec after activity detected

        setLastActiveTime(Date.now());
    };
    const handleProgressBarClick = (event) => {
        handleResetBlur();
        if (videoRef.current && progressBarRef.current) {
            const rect = progressBarRef.current.getBoundingClientRect();
            const clickX = event.clientX - rect.left;
            const progressWidth = rect.width;
            const seekTime = (clickX / progressWidth) * videoRef.current.duration;
            videoRef.current.currentTime = seekTime;
            setCurrentTime(seekTime);

            // Log user interaction
            logUserActivity('seek', seekTime);
        }
    };

    const handleProgressBarHover = (event) => {
        if (progressBarRef.current && videoRef.current) {
            const rect = progressBarRef.current.getBoundingClientRect();
            const hoverX = event.clientX - rect.left;
            const progressWidth = rect.width;
            const hoverTime = (hoverX / progressWidth) * videoRef.current.duration;
            setHoverTime(formatTime(hoverTime));
            setHoverX(hoverX);
        }
    };

    const handleMouseLeave = () => {
        setHoverTime(null);
    };

    const formatTime = (seconds) => {
        if (!seconds) return "0:00";

        const hours = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);

        if (hours > 0) {
            return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // Show video information overlay
    const toggleVideoDescription = () => {
        if (videoDescription) {
            setVideoDescription(null);
        } else {
            // Simulate fetching video metadata
            setVideoDescription({
                title: "Sample Protected Video",
                description: "This is a secure video player with advanced anti-piracy measures.",
                duration: duration,
                resolution: videoQuality === 'auto' ? '1080p' : videoQuality,
                codec: "H.264",
                drm: "Yes"
            });
        }
    };

    // Update buffer progress indicator
    useEffect(() => {
        if (videoRef.current) {
            const handleProgress = () => {
                if (videoRef.current && videoRef.current.buffered.length > 0) {
                    const bufferedEnd = videoRef.current.buffered.end(videoRef.current.buffered.length - 1);
                    const duration = videoRef.current.duration;
                    const bufferedPercent = (bufferedEnd / duration) * 100;
                    setBufferingProgress(bufferedPercent);
                }
            };

            videoRef.current.addEventListener('progress', handleProgress);
            return () => {
                if (videoRef.current) {
                    videoRef.current.removeEventListener('progress', handleProgress);
                }
            };
        }
    }, []);

    // Load previous settings and watch position
    useEffect(() => {
        // Load volume setting
        const savedVolume = localStorage.getItem('videoPlayerVolume');
        if (savedVolume !== null) {
            const parsedVolume = parseFloat(savedVolume);
            setVolume(parsedVolume);
            if (videoRef.current) {
                videoRef.current.volume = parsedVolume;
            }
        }

        // Load bookmarks
        const savedBookmarks = localStorage.getItem('videoBookmarks');
        if (savedBookmarks) {
            try {
                setBookmarks(JSON.parse(savedBookmarks));
            } catch (e) {
                console.error("Error loading bookmarks:", e);
            }
        }

        // Load last position if video has been watched before
        const lastPosition = localStorage.getItem('videoPlayerLastTime');
        if (lastPosition && videoRef.current) {
            if (parseFloat(lastPosition) > 10) {
                const shouldResume = window.confirm("Resume from where you left off?");
                if (shouldResume) {
                    videoRef.current.currentTime = parseFloat(lastPosition);
                }
            }
        }

    }, []);

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                setTabSwitched(true);
                if (videoRef.current && isPlaying) {
                    videoRef.current.pause();
                    setIsPlaying(false);
                }
            }
        };


        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
    }, [isPlaying]);

    //  dynamic watermarking for the video that identifies the user ! 
    useEffect(() => {
        if (!videoRef.current || !watermarkCanvasRef.current || !videoContainerRef.current) return;

        // Canvas and context setup
        const canvas = watermarkCanvasRef.current;
        const ctx = canvas.getContext('2d', { alpha: true });
        const video = videoRef.current;
        const container = videoContainerRef.current;

        // Configuration options - could be moved to props or state
        const config = {
            refreshRate: 3000,         // How often to change watermark position (ms)
            opacity: {
                primary: 0.3,
                secondary: 0.25,
                tertiary: 0.15
            },
            colors: {
                primary: [65, 105, 225],   // Royal blue
                secondary: [100, 149, 237], // Cornflower blue
                accent: [255, 255, 255]     // White
            },
            spacing: 180,              // Space between watermark rows
            rotation: -0.15,           // Rotation angle in radians
            fonts: {
                main: 'bold 18px Arial, sans-serif',
                sub: '14px Arial, sans-serif',
                small: '12px Arial, sans-serif',
                tiny: '10px Arial, sans-serif'
            }
        };

        // Company and user information (ideally passed from props)
        const companyName = "Insansa Techknowledge";
        const userIdentifier = obfuscateEmail("user@example.com");

        // Function to partially obfuscate email for privacy
        function obfuscateEmail(email) {
            const [username, domain] = email.split('@');
            if (username.length <= 3) return email;
            return `${username.substring(0, 3)}***@${domain}`;
        }

        // Generate a deterministic but unique session ID that persists for the session
       

        // Initialize canvas and start the watermark
        const initCanvas = () => {
            resizeCanvas();
            startWatermarkCycle();
        };

        // Resize canvas to match container
        const resizeCanvas = () => {
            const { clientWidth, clientHeight } = container;

            // Handle high DPI displays
            const dpr = window.devicePixelRatio || 1;
            canvas.width = clientWidth * dpr;
            canvas.height = clientHeight * dpr;

            // Adjust CSS size
            canvas.style.width = `${clientWidth}px`;
            canvas.style.height = `${clientHeight}px`;

            // Scale context for high DPI
            ctx.scale(dpr, dpr);

            drawWatermark();
        };

        // Main watermark drawing function
        const drawWatermark = () => {
            const width = parseInt(canvas.style.width);
            const height = parseInt(canvas.style.height);

            // Clear previous watermarks
            ctx.clearRect(0, 0, width, height);

            // Get current timestamp
            const timestamp = new Date().toLocaleString(undefined, {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });

            // Create gradient for primary text
            const gradient = ctx.createLinearGradient(0, 0, width, 0);
            const { primary, secondary } = config.colors;
            gradient.addColorStop(0, `rgba(${primary[0]}, ${primary[1]}, ${primary[2]}, ${config.opacity.primary})`);
            gradient.addColorStop(1, `rgba(${secondary[0]}, ${secondary[1]}, ${secondary[2]}, ${config.opacity.primary})`);

            // Text for watermark
            const watermarkContent = `${watermarkText} • ${userIdentifier}`;

            // Add slight randomization to initial position
            const offset = Math.sin(Date.now() / 10000) * 20;

            // Draw diagonal watermarks
            for (let y = 60 + offset; y < height; y += config.spacing) {
                // Save context for rotation
                ctx.save();

                // Position and rotate
                ctx.translate(width / 2, y);
                ctx.rotate(config.rotation);

                // Company name (primary)
                ctx.font = config.fonts.main;
                ctx.fillStyle = gradient;
                ctx.textAlign = 'center';
                ctx.fillText(companyName, 0, 0);

                // User info (secondary)
                ctx.font = config.fonts.sub;
                ctx.fillStyle = `rgba(${config.colors.accent[0]}, ${config.colors.accent[1]}, ${config.colors.accent[2]}, ${config.opacity.secondary})`;
                ctx.fillText(watermarkContent, 0, 20);

                // Timestamp (tertiary)
                ctx.font = config.fonts.small;
                ctx.fillText(timestamp, 0, 38);

                ctx.restore();
            }

            // Add session ID and copyright
            ctx.font = config.fonts.tiny;
            ctx.fillStyle = `rgba(${config.colors.accent[0]}, ${config.colors.accent[1]}, ${config.colors.accent[2]}, ${config.opacity.tertiary})`;
            ctx.textAlign = 'right';
            ctx.fillText(`Session: ${sessionId} • © ${new Date().getFullYear()}`, width - 10, height - 10);
        };

        // Start the cycle of refreshing watermarks
        let watermarkTimer;
        let animationFrameId;

        const startWatermarkCycle = () => {
            // Initial draw
            drawWatermark();

            // Set up animation if video is playing
            if (isPlaying) {
                animationFrameId = requestAnimationFrame(animateWatermark);
            }

            // Periodically refresh watermark position
            watermarkTimer = setInterval(() => {
                drawWatermark();
            }, config.refreshRate);
        };

        // Animation function for subtle movement during playback
        const animateWatermark = () => {
            if (!isPlaying) return;

            // Add subtle animation here if desired
            // This could be a slight opacity pulse or position adjustment

            animationFrameId = requestAnimationFrame(animateWatermark);
        };

        // Initialize
        initCanvas();

        // Event listeners
        window.addEventListener('resize', resizeCanvas);
        video.addEventListener('play', () => {
            if (!animationFrameId && isPlaying) {
                animationFrameId = requestAnimationFrame(animateWatermark);
            }
        });

        // Clean up function
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            clearInterval(watermarkTimer);
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        };
    }, [isPlaying, watermarkText]);

    // Monitor for user inactivity and add blur effect after period of inactivity
    // after 2 mins and pause after 3 mins
    useEffect(() => {
        const idleCheckInterval = setInterval(() => {
            const idleTime = Date.now() - lastActiveTime;

            // Show warning after 2 minutes of inactivity
            if (idleTime > 12000 && !idleWarningShown) {
                setIdleWarningShown(true);
            }

            // Blur video after 3 minutes of inactivity
            if (idleTime > 180000) {
                setVideoBlurred(true);
                if (isPlaying) {
                    videoRef.current.pause();
                    setIsPlaying(false);
                }
            }
        }, 10000); // Check every 10 seconds

        return () => clearInterval(idleCheckInterval);
    }, [lastActiveTime, idleWarningShown, isPlaying]);

    // Detect screen capture attempts
    useEffect(() => {
        // Function to detect when a user attempts to take a screenshot
        const handleKeyDown = (e) => {
            // Update user activity timestamp
            setLastActiveTime(Date.now());
            setIdleWarningShown(false);
            const key = e.key.toLowerCase();
            const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;

            // Block Developer Tools and View Source
            const blockedShortcuts = [
                { ctrl: true, shift: true, key: "c" }, // DevTools
                { ctrl: true, shift: true, key: "i" }, // DevTools
                { ctrl: true, shift: true, key: "j" }, // Console
                { ctrl: true, key: "u" }, // View Source
                { key: "f12" } // F12 DevTools
            ];

            // Adjust for Mac (Cmd instead of Ctrl)
            const isBlocked = blockedShortcuts.some(shortcut =>
                (isMac ? e.metaKey : e.ctrlKey) === !!shortcut.ctrl &&
                e.shiftKey === !!shortcut.shift &&
                key === shortcut.key
            );

            if (isBlocked) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }

            // Common screenshot key combinations
            const isPrintScreen = e.key === 'PrintScreen';
            const isMacScreenshot = (e.metaKey || e.ctrlKey) && e.shiftKey && (e.key === '3' || e.key === '4' || e.key === '5');
            const isWindowsSnippingTool = e.shiftKey && e.key === 'S' && e.ctrlKey;
            const isGameBarRecording = e.altKey && e.key.toLowerCase() === 'r';

            if (isPrintScreen || isMacScreenshot || isWindowsSnippingTool) {
                e.preventDefault();
                e.stopPropagation();
                handleScreenCaptureAttempt();
                return false;
            }

            if (isGameBarRecording) {
                e.preventDefault();
                e.stopPropagation();
                handleScreenCaptureAttempt();
                console.log("Game Bar Recording Detected!"); // Optional for debugging
                return false;
            }

            // Allow spacebar for play/pause
            if (e.code === "Space") {
                e.preventDefault(); // Prevents scrolling when pressing spacebar
                handlePlayPause();
            }
        };

        // Block right-click menu (basic protection)
        const handleContextMenu = (e) => {
            if (videoContainerRef.current?.contains(e.target)) {
                e.preventDefault();
            }
        };

        // Properly implement visibility change detection
        const handleVisibilityChange = () => {
            if (document.hidden) {
                handleScreenCaptureAttempt();
            }
            if (document.hidden) {
                setTabSwitched(true);
                if (videoRef.current && isPlaying) {
                    videoRef.current.pause();
                    setIsPlaying(false);
                }
            }
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);

        // screen recording detection
        const detectScreenCapture = async () => {
            try {
                if (navigator.mediaDevices && typeof navigator.mediaDevices.getDisplayMedia === 'function') {
                    const originalGetDisplayMedia = navigator.mediaDevices.getDisplayMedia;

                    navigator.mediaDevices.getDisplayMedia = async function (constraints) {
                        // Trigger the screen capture protection
                        handleScreenCaptureAttempt();

                        // Either block completely or let it continue based on your preference
                        // Option 1: Block completely (will cause rejection errors in calling code)
                        // throw new Error('Screen capture is not allowed');

                        // Option 2: Let it proceed but with visual protection
                        return originalGetDisplayMedia.call(this, constraints);
                    };
                }
            } catch (error) {
                console.error("Error setting up screen recording detection:", error);
            }
        };

        // Mouse movement detection for activity tracking
        const handleUserActivity = () => {
            setLastActiveTime(Date.now());
            setIdleWarningShown(false);
        };

        // Set up event listeners
        document.addEventListener("keydown", handleKeyDown, true); // Use capture phase
        document.addEventListener("contextmenu", handleContextMenu);
        document.addEventListener("mousemove", handleUserActivity);
        document.addEventListener("click", handleUserActivity);
        document.addEventListener("scroll", handleUserActivity);
        detectScreenCapture();

        // Clean up event listeners
        return () => {
            document.removeEventListener("keydown", handleKeyDown, true);
            document.removeEventListener("contextmenu", handleContextMenu);
            document.removeEventListener("mousemove", handleUserActivity);
            document.removeEventListener("click", handleUserActivity);
            document.removeEventListener("scroll", handleUserActivity);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, []);

    const handleScreenCaptureAttempt = () => {
        console.log("Screen capture attempt detected!");

        setVideoBlurred(true);
        setScreenCaptureAttempted(true);
        if (videoRef.current && isPlaying) {
            videoRef.current.pause();
            setIsPlaying(false);
        }

        // Log user activity for security monitoring
        logUserActivity('screenCapture', { timestamp: new Date().toISOString() });

        // Add an additional layer of protection by adding a temporary overlay
        if (videoContainerRef.current) {
            const overlay = document.createElement('div');
            overlay.style.position = 'absolute';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.backgroundColor = 'rgba(0,0,0,0.8)';
            overlay.style.color = 'white';
            overlay.style.display = 'flex';
            overlay.style.justifyContent = 'center';
            overlay.style.alignItems = 'center';
            overlay.style.zIndex = '9999';
            overlay.style.textAlign = 'center';
            overlay.style.padding = '20px';
            overlay.id = 'capture-protection-overlay';
            overlay.innerHTML = `
      <div>
        <h2>Screen Capture Detected</h2>
        <p>Screen recording and capture are not permitted for this protected content.</p>
        <p>This incident has been logged.</p>
      </div>
    `;

            if (!document.getElementById('capture-protection-overlay')) {
                videoContainerRef.current.appendChild(overlay);
            }
        }

        // Additional measure: Scramble the video buffer if possible
        if (videoRef.current && videoRef.current.captureStream) {
            try {
                // This attempt to access captureStream will help detect recording
                const stream = videoRef.current.captureStream();
                console.log("Stream accessed, potential capture in progress");
            } catch (e) {
                console.log("Stream access error:", e);
            }
        }

        console.log("Screen capture attempt at", new Date().toISOString());

        //  send this event to your server:
        // fetch('/api/report-capture-attempt', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({
        //     timestamp: new Date().toISOString(),
        //     userId: 'current-user-id',
        //     videoId: 'current-video-id',
        //     browser: navigator.userAgent,
        //     location: window.location.href
        //   })
        // });

        // Reset after a delay
        setTimeout(() => {
            setVideoBlurred(false);
            setScreenCaptureAttempted(false);

            // Remove the overlay
            const overlay = document.getElementById('capture-protection-overlay');
            if (overlay) overlay.remove();
        }, 8000);
    };

    useEffect(() => {
        const handleBeforePrint = () => {
            setVideoBlurred(true); // Blur the page when print is attempted
            console.log("Print attempt detected"); // Log the print attempt
            logUserActivity('printAttempt', { timestamp: new Date().toISOString() });
        };

        const handleAfterPrint = () => {
            setVideoBlurred(false); // Restore visibility after print dialog is closed
        };

        window.addEventListener("beforeprint", handleBeforePrint);
        window.addEventListener("afterprint", handleAfterPrint);

        return () => {
            window.removeEventListener("beforeprint", handleBeforePrint);
            window.removeEventListener("afterprint", handleAfterPrint);
        };
    }, []);

    useEffect(() => {
        const videoElement = videoRef.current;

        // Handle time updates
        const handleTimeUpdate = () => {
            if (videoElement) {
                setCurrentTime(videoElement.currentTime);
                onTimeUpdate && onTimeUpdate(videoElement.currentTime);
            }
        };

        // Set duration once metadata is loaded
        const handleLoadedMetadata = () => {
            if (videoElement) {
                setDuration(videoElement.duration);
            }
        };

        if (videoElement) {
            videoElement.addEventListener('timeupdate', handleTimeUpdate);
            videoElement.addEventListener('loadedmetadata', handleLoadedMetadata);

            // Important security feature: prevent downloading via right-click
            videoElement.addEventListener('contextmenu', (e) => e.preventDefault());

            // Set encrypted source as a custom attribute for inspection
            videoElement.setAttribute('data-src', encryptedSrc || 'encrypted');
        }

        return () => {
            if (videoElement) {
                videoElement.removeEventListener('timeupdate', handleTimeUpdate);
                videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
                videoElement.removeEventListener('contextmenu', (e) => e.preventDefault());
            }
        };
    }, [videoBlobUrl, onTimeUpdate, encryptedSrc]);

    return (
        <div
            ref={videoContainerRef}
            className="relative bg-black rounded-xl aspect-video overflow-hidden border border-gray-700 shadow-lg select-none"
            onDragStart={(e) => e.preventDefault()}
            onMouseMove={handleMouseMove}
        >

            {/* Video element */}
            {/* <video
                ref={videoRef}
                className={`w-full h-full ${videoBlurred ? 'blur-xl' : ''} transition-all duration-300`}
                src={videoBlobUrl ? videoBlobUrl : ""}
                onClick={handlePlayPause}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={() => setDuration(videoRef.current?.duration || 0)}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onContextMenu={(e) => e.preventDefault()}
                draggable="false"
                disablePictureInPicture
                controlsList="nodownload"
                playsInline
            /> */}

            <video
                ref={videoRef}
                className="w-full aspect-video"
                src={videoBlobUrl}
                playsInline
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                // Remove controlsList to prevent showing download button in some browsers
                // Replace with our custom controls
                controlsList="nodownload"
                disablePictureInPicture
                // Custom data attribute for the encrypted source (for inspection)
                data-encrypted-src={encryptedSrc || 'encrypted'}
                // Hide the real src from dev tools as much as possible
                style={{ objectFit: 'contain' }}
            />

            {/* Watermark overlay canvas */}
            <canvas
                ref={watermarkCanvasRef}
                className="absolute inset-0 pointer-events-none z-10"
            />

            {/* Bookmarks indicators on progress bar */}
            {bookmarks.length > 0 && (
                <div className="absolute bottom-12 left-0 right-0 h-2 pointer-events-none">
                    {bookmarks.map(bookmark => (
                        <div
                            key={bookmark.id}
                            className="absolute w-1 h-3 bg-yellow-400 rounded-full cursor-pointer z-20"
                            style={{ left: `${(bookmark.time / duration) * 100}%`, bottom: '0' }}
                            onClick={() => jumpToBookmark(bookmark.time)}
                            title={bookmark.label}
                        />
                    ))}
                </div>
            )}

            {/* Controls overlay - conditionally visible */}
            <div
                className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300 ${controlsVisible || controlsLocked ? 'opacity-100' : 'opacity-0'}`}
            >
                {/* Idle warning overlay */}
                {idleWarningShown && !videoBlurred && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-30">
                        <div className="bg-gray-800 p-6 rounded-lg shadow-xl text-center">
                            <AlertTriangle className="mx-auto mb-4 text-yellow-500" size={48} />
                            <h2 className="text-xl font-bold text-white mb-2">Are you still watching?</h2>
                            <p className="text-gray-300 mb-4">Your video will be paused due to inactivity.</p>
                            <button
                                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
                                onClick={handleResetBlur}
                            >
                                Continue Watching
                            </button>
                        </div>
                    </div>
                )}

                {/* Screen capture attempt warning */}
                {screenCaptureAttempted && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-40">
                        <div className="bg-red-900 p-6 rounded-lg shadow-xl text-center max-w-md">
                            <AlertTriangle className="mx-auto mb-4 text-yellow-400" size={48} />
                            <h2 className="text-xl font-bold text-white mb-2">Screen Capture Detected</h2>
                            <p className="text-gray-200 mb-2">Recording or capturing this content is not permitted.</p>
                            <p className="text-gray-200 mb-4">This incident has been logged and reported.</p>
                            <button
                                className="bg-red-700 hover:bg-red-800 text-white font-medium py-2 px-4 rounded"
                                onClick={handleResetBlur}
                            >
                                Resume Viewing
                            </button>
                        </div>
                    </div>
                )}

                {/* Tab switched warning */}
                {tabSwitched && !videoBlurred && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-30">
                        <div className="bg-gray-800 p-6 rounded-lg shadow-xl text-center">
                            <AlertTriangle className="mx-auto mb-4 text-yellow-500" size={48} />
                            <h2 className="text-xl font-bold text-white mb-2">Playback Paused</h2>
                            <p className="text-gray-300 mb-4">Video playback is automatically paused when switching tabs.</p>
                            <button
                                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
                                onClick={() => {
                                    setTabSwitched(false);
                                    handleResetBlur();
                                }}
                            >
                                Resume Playback
                            </button>
                        </div>
                    </div>
                )}

                {/* Video description overlay */}
                {videoDescription && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-30">
                        <div className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-lg">
                            <h2 className="text-xl font-bold text-white mb-2">{videoDescription.title}</h2>
                            <p className="text-gray-300 mb-4">{videoDescription.description}</p>

                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <h3 className="font-medium text-gray-400">Duration</h3>
                                    <p className="text-white">{formatTime(videoDescription.duration)}</p>
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-400">Resolution</h3>
                                    <p className="text-white">{videoDescription.resolution}</p>
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-400">Codec</h3>
                                    <p className="text-white">{videoDescription.codec}</p>
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-400">DRM Protected</h3>
                                    <p className="text-white">{videoDescription.drm}</p>
                                </div>
                            </div>

                            <button
                                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded w-full"
                                onClick={() => setVideoDescription(null)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}

                {/* Bookmarks list overlay */}
                {showBookmarks && (
                    <div className="absolute right-0 top-0 bottom-0 bg-gray-900/90 w-64 p-4 z-30 overflow-y-auto">
                        <h3 className="text-white font-bold mb-3">Bookmarks</h3>
                        {bookmarks.length === 0 ? (
                            <p className="text-gray-400 text-sm">No bookmarks yet</p>
                        ) : (
                            <ul className="space-y-2">
                                {bookmarks.map(bookmark => (
                                    <li key={bookmark.id} className="flex items-center justify-between bg-gray-800 p-2 rounded">
                                        <button
                                            className="text-white text-sm truncate flex-1 text-left"
                                            onClick={() => jumpToBookmark(bookmark.time)}
                                        >
                                            {bookmark.label}
                                        </button>
                                        <button
                                            className="text-red-500 hover:text-red-400 ml-2"
                                            onClick={() => removeBookmark(bookmark.id)}
                                        >
                                            ✕
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                        <button
                            className="mt-4 w-full bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm"
                            onClick={() => setShowBookmarks(false)}
                        >
                            Close
                        </button>
                    </div>
                )}

                {/* Center play/pause button */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    {!isPlaying && (
                        <button
                            className="bg-white/30 backdrop-blur-sm rounded-full p-5 text-white pointer-events-auto"
                            onClick={handlePlayPause}
                        >
                            <Play size={32} className="ml-1" />
                        </button>
                    )}
                </div>

                {/* Forward/rewind indicators */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    {isRewindActive && (
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-5 text-white">
                            <RotateCcw size={32} />
                            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold">10</span>
                        </div>
                    )}

                    {isForwardActive && (
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-5 text-white">
                            <RotateCw size={32} />
                            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold">10</span>
                        </div>
                    )}
                </div>

                {/* Bottom controls */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                    {/* Progress bar */}
                    <div
                        className="relative h-2 bg-gray-600 rounded-full mb-4 cursor-pointer"
                        ref={progressBarRef}
                        onClick={handleProgressBarClick}
                        onMouseMove={handleProgressBarHover}
                        onMouseLeave={handleMouseLeave}
                    >
                        {/* Buffer progress */}
                        <div
                            className="absolute top-0 left-0 h-full bg-gray-500 rounded-full"
                            style={{ width: `${bufferingProgress}%` }}
                        ></div>

                        {/* Watch history progress */}
                        <div
                            className="absolute top-0 left-0 h-full bg-gray-400 rounded-full opacity-50"
                            style={{ width: `${watchHistory}%` }}
                        ></div>

                        {/* Current progress */}
                        <div
                            className="absolute top-0 left-0 h-full bg-blue-500 rounded-full"
                            style={{ width: `${(currentTime / duration) * 100}%` }}
                        ></div>

                        {/* Hover time indicator */}
                        {hoverTime && (
                            <div
                                className="absolute top-0 transform -translate-y-8 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded"
                                style={{ left: hoverX }}
                            >
                                {hoverTime}
                            </div>
                        )}

                        {/* Draggable handle */}
                        <div
                            className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-md cursor-pointer"
                            style={{ left: `calc(${(currentTime / duration) * 100}% - 8px)` }}
                        ></div>
                    </div>

                    {/* Controls row */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            {/* Play/Pause */}
                            <button
                                className="text-white hover:text-blue-400 transition-colors"
                                onClick={handlePlayPause}
                            >
                                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                            </button>

                            {/* Rewind */}
                            <button
                                className="text-white hover:text-blue-400 transition-colors"
                                onClick={handleRewind}
                            >
                                <RotateCcw size={18} />
                            </button>

                            {/* Forward */}
                            <button
                                className="text-white hover:text-blue-400 transition-colors"
                                onClick={handleForward}
                            >
                                <RotateCw size={18} />
                            </button>

                            {/* Volume */}
                            <div className="flex items-center space-x-2">
                                <button
                                    className="text-white hover:text-blue-400 transition-colors"
                                    onClick={toggleMute}
                                >
                                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                                </button>
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                    value={volume}
                                    onChange={handleVolumeChange}
                                    className="w-16 md:w-24 cursor-pointer"
                                />
                            </div>

                            {/* Time display */}
                            <div className="text-white text-sm hidden md:block">
                                {formatTime(currentTime)} / {formatTime(duration)}
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            {/* Control lock toggle */}
                            <button
                                className="text-white hover:text-blue-400 transition-colors"
                                onClick={toggleControlsLock}
                                title={controlsLocked ? "Unlock controls" : "Lock controls"}
                            >
                                {controlsLocked ? <Lock size={16} /> : <Unlock size={16} />}
                            </button>

                            {/* Bookmark button */}
                            <button
                                className="text-white hover:text-blue-400 transition-colors"
                                onClick={addBookmark}
                                title="Add bookmark at current position"
                            >
                                <Bookmark size={16} />
                            </button>

                            {/* Show bookmarks list */}
                            <button
                                className="text-white hover:text-blue-400 transition-colors"
                                onClick={() => setShowBookmarks(!showBookmarks)}
                                title="Show bookmarks"
                            >
                                <BookmarkCheck size={16} />
                            </button>

                            {/* Picture in Picture */}
                            <button
                                className="text-white hover:text-blue-400 transition-colors"
                                onClick={togglePictureInPicture}
                                title="Picture in Picture"
                            >
                                <PictureInPicture size={16} />
                            </button>

                            {/* Video info */}
                            <button
                                className="text-white hover:text-blue-400 transition-colors"
                                onClick={toggleVideoDescription}
                                title="Video information"
                            >
                                <FileText size={16} />
                            </button>

                            {/* Quality selector */}
                            <div className="relative">
                                <button
                                    className="text-white hover:text-blue-400 transition-colors"
                                    onClick={() => setShowQualityMenu(!showQualityMenu)}
                                    title="Video quality"
                                >
                                    <Layers size={16} />
                                </button>

                                {showQualityMenu && (
                                    <div className="absolute bottom-full right-0 mb-1 bg-gray-800 rounded shadow-lg p-2 w-28">
                                        {qualityOptions.map(quality => (
                                            <button
                                                key={quality}
                                                className={`block w-full text-left px-2 py-1 text-sm rounded ${videoQuality === quality ? 'bg-blue-600 text-white' : 'text-white hover:bg-gray-700'}`}
                                                onClick={() => handleQualityChange(quality)}
                                            >
                                                {quality}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Playback speed */}
                            <div className="relative">
                                <button
                                    className="text-white hover:text-blue-400 transition-colors"
                                    onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                                    title="Playback speed"
                                >
                                    <Settings size={16} />
                                </button>

                                {showSpeedMenu && (
                                    <div className="absolute bottom-full right-0 mb-1 bg-gray-800 rounded shadow-lg p-2 w-24">
                                        {playbackSpeeds.map(speed => (
                                            <button
                                                key={speed}
                                                className={`block w-full text-left px-2 py-1 text-sm rounded ${playbackSpeed === speed ? 'bg-blue-600 text-white' : 'text-white hover:bg-gray-700'}`}
                                                onClick={() => handleSpeedChange(speed)}
                                            >
                                                {speed}x
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Fullscreen toggle */}
                            <button
                                className="text-white hover:text-blue-400 transition-colors"
                                onClick={handleFullscreen}
                                title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                            >
                                {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Transcoding progress indicator (only shown when transcoding is in progress) */}
            {transcodingProgress < 100 && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-50">
                    <div className="text-center">
                        <h3 className="text-white mb-3">Processing video...</h3>
                        <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-blue-500 transition-all duration-300"
                                style={{ width: `${transcodingProgress}%` }}
                            ></div>
                        </div>
                        <p className="text-gray-300 mt-2 text-sm">{transcodingProgress.toFixed(0)}%</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VideoPlayer;