import { Schema, model } from 'mongoose';
import cron from 'node-cron';

const WatchedVideoSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },

        videoId: {
            type: String,
            required: true,
        },

        courseId: {
            type: String,
            required: true,
        },

        moduleId: {
            type: String,
            required: true,
        },

        // Current progress in seconds
        currentTime: {
            type: Number,
            default: 0,
        },

        // Total duration of video in seconds
        duration: {
            type: Number,
            required: true,
        },

        // Progress percentage (0-100)
        progress: {
            type: Number,
            required: true,
            min: 0,
            max: 100,
            default: 0,
        },

        // Playback speed last used by user
        playbackSpeed: {
            type: Number,
            default: 1.0,
        },

        // Whether user has completed watching (reached 90%+ of video)
        completed: {
            type: Boolean,
            default: false,
        },

        // Timestamps for analytics
        firstWatched: {
            type: Date,
            default: Date.now,
        },

        lastWatched: {
            type: Date,
            default: Date.now,
        },

        completedAt: {
            type: Date,
        },

        // Number of times video has been started
        viewCount: {
            type: Number,
            default: 1,
        },

        // Array of watch sessions
        watchSessions: [
            {
                startTime: {
                    type: Date,
                    default: Date.now,
                },
                endTime: {
                    type: Date,
                },
                progressMade: {
                    type: Number,
                    default: 0,
                },
                device: {
                    type: String,
                },
            },
        ],

        // Important moments user bookmarked
        bookmarks: [
            {
                timeInSeconds: {
                    type: Number,
                    required: true,
                },
                label: {
                    type: String,
                    trim: true,
                },
                createdAt: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],

        // Engagement metrics
        engagementScore: {
            type: Number,
            default: 0,
            min: 0,
            max: 100,
        },

        // Note: This is used for automated reminder system
        remindersSent: {
            type: Number,
            default: 0,
        },

        lastReminderDate: {
            type: Date,
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        id: false,
        versionKey: false,
    }
);

// Create compound indexes for efficient queries
WatchedVideoSchema.index({ userId: 1, videoId: 1 }, { unique: true });
WatchedVideoSchema.index({ userId: 1, courseId: 1 });
WatchedVideoSchema.index({ userId: 1, completed: 1 });
WatchedVideoSchema.index({ lastWatched: 1 }); // For time-based automation

// Pre-save middleware to update completion status and timestamps
WatchedVideoSchema.pre('save', function (next) {
    // Update lastWatched timestamp
    this.lastWatched = new Date();

    // Auto-mark as completed if progress exceeds 90%
    if (this.progress >= 90 && !this.completed) {
        this.completed = true;
        this.completedAt = new Date();
    }

    // Calculate engagement score based on various factors
    // This is a simplified example - you might use more complex algorithms
    const recencyFactor = Math.min(
        1,
        (Date.now() - this.firstWatched) / (1000 * 60 * 60 * 24 * 30)
    );
    const progressFactor = this.progress / 100;
    const viewCountFactor = Math.min(1, this.viewCount / 5);
    const bookmarksFactor = Math.min(1, this.bookmarks.length / 3);

    this.engagementScore = Math.round(
        (progressFactor * 0.5 +
            viewCountFactor * 0.2 +
            bookmarksFactor * 0.2 +
            recencyFactor * 0.1) *
            100
    );

    next();
});

// Instance methods
WatchedVideoSchema.methods = {
    // Update video progress
    updateProgress: async function (currentTimeInSeconds, duration) {
        // Calculate new progress percentage
        const newProgress = Math.min(
            100,
            Math.round((currentTimeInSeconds / duration) * 100)
        );

        // Only update if progress increases (prevent rewind from decreasing progress)
        if (newProgress > this.progress) {
            this.progress = newProgress;
        }

        // Always update current time regardless
        this.currentTime = currentTimeInSeconds;
        this.duration = duration;

        // Increment view count if this is a new session
        const lastSession = this.watchSessions[this.watchSessions.length - 1];
        if (!lastSession || lastSession.endTime) {
            this.viewCount += 1;
            this.watchSessions.push({
                startTime: new Date(),
                device: 'web', // You could pass device info here
            });
        }

        return this.save();
    },

    // End current watch session
    endSession: async function (currentTimeInSeconds) {
        const lastSessionIndex = this.watchSessions.length - 1;

        if (
            lastSessionIndex >= 0 &&
            !this.watchSessions[lastSessionIndex].endTime
        ) {
            const session = this.watchSessions[lastSessionIndex];
            const sessionStart = session.startTime;
            const now = new Date();

            // Update session data
            this.watchSessions[lastSessionIndex].endTime = now;
            this.watchSessions[lastSessionIndex].progressMade =
                this.progress - session.progressMade;

            // Calculate and update current time based on progress made
            this.currentTime = currentTimeInSeconds;

            return this.save();
        }

        return this;
    },

    // Add a bookmark at the current time
    addBookmark: async function (timeInSeconds, label = '') {
        this.bookmarks.push({
            timeInSeconds,
            label,
            createdAt: new Date(),
        });

        return this.save();
    },

    // Reset progress (for re-watching)
    resetProgress: async function () {
        this.progress = 0;
        this.currentTime = 0;
        this.completed = false;
        this.completedAt = null;

        // Don't reset bookmarks, history, etc.

        return this.save();
    },
};

// Static methods for automation and batch operations
WatchedVideoSchema.statics = {
    // Find abandoned videos (not completed, no activity for 14+ days)
    async findAbandoned(days = 14) {
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - days);

        return this.find({
            completed: false,
            progress: { $gt: 10, $lt: 90 }, // Started but not near completion
            lastWatched: { $lt: cutoffDate },
        })
            .populate('userId', 'name email')
            .sort({ progress: -1 });
    },

    // Resume reminders - find videos in progress and send reminders
    async scheduleResumeReminders() {
        const twoWeeksAgo = new Date();
        twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

        const oneMonthAgo = new Date();
        oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);

        // Find candidates for reminders
        const candidates = await this.find({
            completed: false,
            progress: { $gt: 25, $lt: 90 }, // Significant progress made
            lastWatched: { $lt: twoWeeksAgo, $gt: oneMonthAgo }, // Not too old or recent
            remindersSent: { $lt: 2 }, // Limit reminders
            $or: [
                { lastReminderDate: null },
                { lastReminderDate: { $lt: twoWeeksAgo } },
            ],
        })
            .populate('userId', 'email name')
            .limit(100); // Process in batches

        // In a real app, you'd send emails/notifications here
        let count = 0;
        for (const video of candidates) {
            // Update reminder tracking
            video.remindersSent += 1;
            video.lastReminderDate = new Date();
            await video.save();

            // Here you would integrate with your notification system
            console.log(
                `Sent reminder to ${video.userId.email} to resume video ${video.videoId}`
            );
            count++;
        }

        return count;
    },

    // Generate aggregated analytics
    async generateUserVideoStats(userId) {
        return this.aggregate([
            { $match: { userId: mongoose.Types.ObjectId(userId) } },
            {
                $group: {
                    _id: null,
                    totalVideos: { $sum: 1 },
                    completedVideos: {
                        $sum: { $cond: [{ $eq: ['$completed', true] }, 1, 0] },
                    },
                    totalWatchTime: { $sum: '$currentTime' },
                    averageProgress: { $avg: '$progress' },
                    averageEngagement: { $avg: '$engagementScore' },
                },
            },
        ]);
    },

    // Calculate course completion percentage
    async getCourseCompletion(userId, courseId) {
        const result = await this.aggregate([
            { $match: { userId: mongoose.Types.ObjectId(userId), courseId } },
            {
                $group: {
                    _id: '$courseId',
                    totalVideos: { $sum: 1 },
                    completedVideos: {
                        $sum: { $cond: [{ $eq: ['$completed', true] }, 1, 0] },
                    },
                    averageProgress: { $avg: '$progress' },
                },
            },
        ]);

        if (result.length === 0) {
            return { completion: 0, videoCount: 0 };
        }

        return {
            completion:
                (result[0].completedVideos / result[0].totalVideos) * 100,
            videoCount: result[0].totalVideos,
            completedCount: result[0].completedVideos,
            averageProgress: result[0].averageProgress,
        };
    },

    // Auto-calculate watch time estimates for unwatched videos
    async estimateRemainingWatchTime(userId, courseId) {
        // Get already watched videos to establish average watch speed
        const watched = await this.find({
            userId,
            courseId,
            completed: true,
        });

        // Calculate user's average speed factor (if available)
        let speedFactor = 1.0;
        if (watched.length > 0) {
            const speeds = watched.map((v) => v.playbackSpeed);
            speedFactor = speeds.reduce((sum, s) => sum + s, 0) / speeds.length;
        }

        // Get unwatched/in-progress videos
        const unwatched = await this.find({
            userId,
            courseId,
            completed: false,
        });

        // Calculate remaining time
        let remainingSeconds = 0;
        for (const video of unwatched) {
            // Calculate remaining seconds based on progress
            const remainingPercentage = 100 - video.progress;
            const videoDurationSeconds = video.duration;
            const videoRemainingSeconds =
                (remainingPercentage / 100) * videoDurationSeconds;

            // Adjust for user's playback speed
            remainingSeconds += videoRemainingSeconds / speedFactor;
        }

        return {
            remainingTime: remainingSeconds,
            formattedTime: this.formatTime(remainingSeconds),
            videoCount: unwatched.length,
            speedFactor,
        };
    },

    // Helper to format seconds into human-readable time
    formatTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);

        if (hours > 0) {
            return `${hours}h ${minutes}m`;
        } else {
            return `${minutes}m`;
        }
    },
};

// Setup automation jobs
export const setupVideoAutomation = () => {
    const WatchedVideo = model('WatchedVideo', WatchedVideoSchema);

    // Reminder job - run twice a week
    cron.schedule('0 10 * * 2,5', async () => {
        try {
            const remindersSent = await WatchedVideo.scheduleResumeReminders();
            console.log(`Sent ${remindersSent} video resume reminders`);
        } catch (error) {
            console.error('Error in video reminder automation:', error);
        }
    });

    console.log('Video automation jobs scheduled');
};

const WatchedVideo = model('WatchedVideo', WatchedVideoSchema);
export default WatchedVideo;
