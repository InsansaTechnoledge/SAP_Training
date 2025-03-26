import mongoose, { Schema, model } from 'mongoose';
import cron from 'node-cron';

const PaymentSchema = new mongoose.Schema(
    {
        date: {
            type: Date,
            required: true,
            default: Date.now(),
            index: true,
        },

        receipt: {
            type: String,
            required: true,
            unique: true,
        },

        moduleId: {
            type: [String],
        },

        courseId: {
            type: [String],
            validate: {
                validator: function (array) {
                    return array.length > 0 || this.moduleId.length > 0;
                },
                message: 'At least one course or module must be specified',
            },
        },

        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true,
        },

        orderId: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },

        paymentMethod: {
            type: String,
            enum: [
                'credit_card',
                'debit_card',
                'paypal',
                'bank_transfer',
                'wallet',
                'upi',
                'other',
            ],
            required: true,
        },

        currency: {
            type: String,
            required: true,
            uppercase: true,
            trim: true,
            minlength: 3,
            maxlength: 3,
        },

        amount: {
            type: Number,
            required: true,
            min: [0, 'Amount cannot be negative'],
        },

        transactionId: {
            type: String,
            sparse: true,
            index: true,
        },

        status: {
            type: String,
            required: true,
            enum: [
                'pending',
                'processing',
                'completed',
                'failed',
                'refunded',
                'partially_refunded',
                'disputed',
            ],
            default: 'pending',
            index: true,
        },

        statusHistory: [
            {
                status: {
                    type: String,
                    enum: [
                        'pending',
                        'processing',
                        'completed',
                        'failed',
                        'refunded',
                        'partially_refunded',
                        'disputed',
                    ],
                },
                timestamp: {
                    type: Date,
                    default: Date.now,
                },
                note: String,
            },
        ],

        discount: {
            code: String,
            amount: Number,
            percentage: Number,
        },

        tax: {
            rate: Number,
            amount: Number,
        },

        subtotal: {
            type: Number,
            required: true,
        },

        refund: {
            amount: Number,
            date: Date,
            reason: String,
            transactionId: String,
        },

        billingAddress: {
            name: String,
            addressLine1: String,
            addressLine2: String,
            city: String,
            state: String,
            zipCode: String,
            country: String,
        },

        paymentGateway: {
            name: String,
            merchantId: String,
            feeAmount: Number,
        },

        metadata: {
            type: Map,
            of: String,
        },

        // For verification and troubleshooting
        ipAddress: String,

        userAgent: String,

        gatewayResponse: Object,

        // expiryDate: {
        //     type: Date
        // }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

// Add the required virtual field for total items
PaymentSchema.virtual('totalItems').get(function () {
    return this.courseId.length + this.moduleId.length;
});

// Make the virtual field required
PaymentSchema.path('courseId').validate(function () {
    return this.totalItems > 0;
}, 'At least one item (course or module) must be purchased');

// Compound indexes for common queries
PaymentSchema.index({ userId: 1, status: 1 });
PaymentSchema.index({ date: 1, status: 1 });

// Pre-save hook to update status history
PaymentSchema.pre('save', function (next) {
    // If status changed, add to status history
    if (this.isModified('status')) {
        this.statusHistory.push({
            status: this.status,
            timestamp: new Date(),
            note: 'Status updated',
        });
    }
    next();
});

// Instance methods
PaymentSchema.methods = {
    // Process refund
    async processRefund(amount, reason) {
        // Validate
        if (amount > this.amount) {
            throw new Error('Refund amount cannot exceed payment amount');
        }

        if (this.status !== 'completed') {
            throw new Error('Can only refund completed payments');
        }

        // Set refund details
        this.refund = {
            amount: amount,
            date: new Date(),
            reason: reason,
            transactionId: `refund_${this.transactionId}`,
        };

        // Update status
        if (amount === this.amount) {
            this.status = 'refunded';
        } else {
            this.status = 'partially_refunded';
        }

        return this.save();
    },

    // Add payment note to history
    async addNote(note) {
        this.statusHistory.push({
            status: this.status,
            timestamp: new Date(),
            note: note,
        });

        return this.save();
    },

    // Calculate total amount (including taxes, less discounts)
    calculateTotal() {
        let total = this.subtotal;

        // Add tax if exists
        if (this.tax && this.tax.amount) {
            total += this.tax.amount;
        }

        // Subtract discount if exists
        if (this.discount && this.discount.amount) {
            total -= this.discount.amount;
        }

        return total;
    },
};

// Static methods
PaymentSchema.statics = {
    // Find expired payments (pending for too long)
    async findExpiredPayments() {
        const oneDayAgo = new Date();
        oneDayAgo.setDate(oneDayAgo.getDate() - 1);

        return this.find({
            status: 'pending',
            date: { $lt: oneDayAgo },
        });
    },

    // Generate revenue reports by date range
    async generateRevenueReport(startDate, endDate) {
        return this.aggregate([
            {
                $match: {
                    status: 'completed',
                    date: {
                        $gte: new Date(startDate),
                        $lte: new Date(endDate),
                    },
                },
            },
            {
                $group: {
                    _id: {
                        year: { $year: '$date' },
                        month: { $month: '$date' },
                        day: { $dayOfMonth: '$date' },
                    },
                    totalRevenue: { $sum: '$amount' },
                    count: { $sum: 1 },
                    avgOrderValue: { $avg: '$amount' },
                },
            },
            {
                $sort: {
                    '_id.year': 1,
                    '_id.month': 1,
                    '_id.day': 1,
                },
            },
        ]);
    },

    // Update expired payments
    async markExpiredPayments() {
        const oneDayAgo = new Date();
        oneDayAgo.setDate(oneDayAgo.getDate() - 1);

        const result = await this.updateMany(
            {
                status: 'pending',
                date: { $lt: oneDayAgo },
            },
            {
                $set: {
                    status: 'failed',
                },
                $push: {
                    statusHistory: {
                        status: 'failed',
                        timestamp: new Date(),
                        note: 'Automatically marked as failed due to expiration',
                    },
                },
            }
        );

        return result.modifiedCount;
    },
};

// Setup automated tasks
export const setupPaymentAutomation = () => {
    const Payment = model('Payment', PaymentSchema);

    // Daily job to mark expired payments
    cron.schedule('0 2 * * *', async () => {
        try {
            const markedCount = await Payment.markExpiredPayments();
            console.log(`Marked ${markedCount} expired payments as failed`);
        } catch (error) {
            console.error('Error in payment expiration automation:', error);
        }
    });

    console.log('Payment automation job scheduled');
};

const Payment = model('Payment', PaymentSchema);
export default Payment;
