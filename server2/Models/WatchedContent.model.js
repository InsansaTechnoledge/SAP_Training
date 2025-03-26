import mongoose, { Schema, model } from 'mongoose';
import cron from 'node-cron';

const WatchedContentSchema = new mongoose.Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
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

        contentId: {
            type: String,
            required: true,
        },

        score: {
            type: Number,
            required: true,
            min: [0, 'Score cannot be negative'],
            max: [1000, 'Score cannot exceed 1000'],
        },

        watchProgress: {
            type: Number,
            default: 0,
            min: 0,
            max: 100,
        },

        completed: {
            type: Boolean,
            required: true,
            default: false,
        },

        completedAt: {
            type: Date,
            default: null,
        },

        status: {
            type: String,
            enum: [
                'not_started',
                'in_progress',
                'completed',
                'abandoned',
                'expired',
                'needs_review',
            ],
            default: 'not_started',
        },

        lastAccessedAt: {
            type: Date,
            default: Date.now,
        },

        remindersSent: {
            type: Number,
            default: 0,
        },

        lastReminderSentAt: {
            type: Date,
            default: null,
        },

        expiresAt: {
            type: Date,
            default: function () {
                // Default course access expires after 180 days (6 months)
                const date = new Date();
                date.setDate(date.getDate() + 180);
                return date;
            },
        },

        deviceInfo: {
            type: String,
            trim: true,
        },

        notes: {
            type: [String],
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

// Create compound index for efficient queries
WatchedContentSchema.index(
    { userId: 1, courseId: 1, moduleId: 1, contentId: 1 },
    { unique: true }
);
WatchedContentSchema.index({ status: 1, lastAccessedAt: 1 }); // For status automation queries
WatchedContentSchema.index({ expiresAt: 1 }); // For expiration automation

// Pre-save middleware to update timestamps and status
WatchedContentSchema.pre('save', function (next) {
    // Update lastAccessedAt on every save
    this.lastAccessedAt = new Date();

    // Set completedAt when marked as completed
    if (this.isModified('completed') && this.completed === true) {
        this.completedAt = new Date();
        this.status = 'completed';
    }

    // Update status based on watch progress
    if (this.isModified('watchProgress')) {
        if (
            this.watchProgress > 0 &&
            this.watchProgress < 100 &&
            this.status !== 'completed'
        ) {
            this.status = 'in_progress';
        } else if (this.watchProgress >= 100 && !this.completed) {
            this.completed = true;
            this.completedAt = new Date();
            this.status = 'completed';
        }
    }

    next();
});

// Static methods for automation
WatchedContentSchema.statics = {
    // Auto-mark abandoned content (no activity for 30 days but not completed)
    async markAbandoned() {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const result = await this.updateMany(
            {
                status: 'in_progress',
                lastAccessedAt: { $lt: thirtyDaysAgo },
                completed: false,
            },
            {
                $set: {
                    status: 'abandoned',
                },
            }
        );

        return result.modifiedCount;
    },

    // Auto-expire content access after expiration date
    async markExpired() {
        const now = new Date();

        const result = await this.updateMany(
            {
                expiresAt: { $lt: now },
                status: { $nin: ['completed', 'expired'] },
            },
            {
                $set: {
                    status: 'expired',
                },
            }
        );

        return result.modifiedCount;
    },

    // Flag content that needs review (70%+ progress but abandoned for 14+ days)
    async flagForReview() {
        const fourteenDaysAgo = new Date();
        fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);

        const result = await this.updateMany(
            {
                watchProgress: { $gte: 70, $lt: 100 },
                lastAccessedAt: { $lt: fourteenDaysAgo },
                status: 'in_progress',
            },
            {
                $set: {
                    status: 'needs_review',
                },
            }
        );

        return result.modifiedCount;
    },

    // Send reminders for stalled progress
    async scheduleReminders() {
        // Find users with stalled progress (7+ days since last access)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        // Get users needing reminders (in progress, not accessed recently, fewer than 3 reminders already sent)
        const needReminders = await this.find({
            status: 'in_progress',
            lastAccessedAt: { $lt: sevenDaysAgo },
            remindersSent: { $lt: 3 },
            $or: [
                { lastReminderSentAt: null },
                { lastReminderSentAt: { $lt: sevenDaysAgo } },
            ],
        });

        // Process reminders (in a real app, you'd integrate with an email/notification service)
        let remindersSent = 0;
        for (const content of needReminders) {
            content.remindersSent += 1;
            content.lastReminderSentAt = new Date();
            await content.save();

            // Here you would trigger your notification system
            console.log(
                `Reminder sent to user ${content.userId} for course ${content.courseId}`
            );
            remindersSent++;
        }

        return remindersSent;
    },

    // Auto-extend expiring content based on active usage
    async extendActiveContent() {
        const now = new Date();
        const inOneWeek = new Date();
        inOneWeek.setDate(inOneWeek.getDate() + 7);

        // Find content expiring soon but still actively used
        const activeContentExpiringSoon = await this.find({
            expiresAt: { $lt: inOneWeek, $gt: now },
            lastAccessedAt: { $gt: sevenDaysAgo },
            watchProgress: { $gt: 50 },
            status: 'in_progress',
        });

        let extended = 0;
        for (const content of activeContentExpiringSoon) {
            // Extend by 30 days
            const newExpiryDate = new Date(content.expiresAt);
            newExpiryDate.setDate(newExpiryDate.getDate() + 30);

            content.expiresAt = newExpiryDate;
            await content.save();
            extended++;
        }

        return extended;
    },
};

// Setup cron jobs for automation
export const setupWatchedContentAutomation = () => {
    const WatchedContent = model('WatchedContent', WatchedContentSchema);

    // Daily jobs
    cron.schedule('0 0 * * *', async () => {
        try {
            console.log('Running daily WatchedContent automation jobs...');
            const abandoned = await WatchedContent.markAbandoned();
            const expired = await WatchedContent.markExpired();
            const flagged = await WatchedContent.flagForReview();

            console.log(
                `Automation complete: ${abandoned} marked abandoned, ${expired} expired, ${flagged} flagged for review`
            );
        } catch (error) {
            console.error('Error in daily WatchedContent automation:', error);
        }
    });

    // Reminders job - run three times a week
    cron.schedule('0 9 * * 1,3,5', async () => {
        try {
            const remindersSent = await WatchedContent.scheduleReminders();
            console.log(`Sent ${remindersSent} progress reminders to users`);
        } catch (error) {
            console.error('Error in reminder automation:', error);
        }
    });

    // Weekly content extension job
    cron.schedule('0 1 * * 0', async () => {
        try {
            const extended = await WatchedContent.extendActiveContent();
            console.log(`Extended ${extended} active content items`);
        } catch (error) {
            console.error('Error in content extension automation:', error);
        }
    });

    console.log('WatchedContent automation jobs scheduled');
};

const WatchedContent = model('WatchedContent', WatchedContentSchema);
export default WatchedContent;
