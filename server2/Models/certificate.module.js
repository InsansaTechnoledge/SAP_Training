import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const certificateSchema = new Schema(
    {
        certificateId: {
            type: String,
            default: () => uuidv4(),
            unique: true,
            index: true,
            immutable: true,
        },

        courseId: {
            type: String,
            required: [true, 'Course ID is required'],
        },

        userId: {
            type: Schema.Types.ObjectId,
            required: [true, 'User ID is required'],
            ref: 'User',
            index: true,
        },

        status: {
            type: String,
            enum: ['issued', 'revoked'],
            default: 'issued',
            index: true,
        },

        issueDate: {
            type: Date,
            default: Date.now,
            immutable: true,
        },

        score: {
            type: Number,
            min: 0,
            max: 100,
        },

        remarks: {
            type: String,
            default: 'Congratulations on completing this course',
            maxlength: 500,
        },

        metadata: {
            type: Map,
            of: Schema.Types.Mixed,
            default: {},
        },
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
            transform: function (doc, ret) {
                delete ret._id;
                return ret;
            },
        },
        toObject: { virtuals: true },
        id: false,
        versionKey: false,
    }
);

// Indexes for common queries
certificateSchema.index({ userId: 1, courseId: 1 }, { unique: true });
certificateSchema.index({ issueDate: -1 });

// Virtual for certificate verification URL
certificateSchema.virtual('verificationUrl').get(function () {
    return `https://yourdomain.com/verify/${this.certificateId}`;
});

// Methods
certificateSchema.methods.revoke = function (reason) {
    this.status = 'revoked';
    this.metadata.set('revocationReason', reason);
    this.metadata.set('revokedAt', new Date());
    return this.save();
};

// Middleware - e.g., pre-save validation
certificateSchema.pre('save', function (next) {
    if (this.isNew) {
        // Additional validation or processing for new certificates
        this.metadata.set('issuedBy', 'system');
    }
    next();
});

const Certificate = model('Certificate', certificateSchema);

Certificate.createIndexes([{ name: 'text', remarks: 'text' }]);

export default Certificate;
