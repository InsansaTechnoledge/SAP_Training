import { Schema, model } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

const WishlistSchema = new Schema(
    {
        courseId: {
            type: String,
            required: [true, 'course is required'],
        },
        date: {
            type: Date,
            default: Date.now(),
        },
    },
    {
        _id: false,
    }
);

const PurchasedCourseSchema = new Schema({
    courseId: {
        type: String,
        required: [true, 'course is required'],
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
});

const PurchasedModuleSchema = new Schema({
    moduleId: {
        type: String,
        required: [true, 'module is required'],
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    isCompleted: {
        type: Boolean,
    },
});
const userSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: [true, 'name is required'],
            minLength: [2, 'enter a valid name'],
        },

        email: {
            type: String,
            unique: [true, 'Email already exists'],
            required: [true, 'Email is required'],
            trim: true,
            lowercase: true,
            minLength: [10, 'Enter a valid email'],
            maxLength: [60, 'email length exeeds '],
            validate: {
                validator: function (v) {
                    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                        v
                    );
                },
                message: 'Please enter a valid email address',
            },
        },

        password: {
            type: String,
            required: [true, 'Password is required'],
            select: false, // Exclude password from queries
            trim: true,
            validate: {
                validator: function (value) {
                    return validator.isStrongPassword(value, {
                        minLength: 8,
                        minLowercase: 1,
                        minUppercase: 1,
                        minNumbers: 1,
                        minSymbols: 1,
                    });
                },
                message:
                    'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.',
            },
        },

        googleId: {
            type: String,
            select: false,
        },

        cart: {
            type: [
                {
                    courseId: {
                        type: String,
                        required: true,
                    },
                    addedAt: {
                        type: Date,
                        default: Date.now(),
                    },
                },
            ],
            default: [],
        },

        wishlist: {
            type: [WishlistSchema],
        },

        coursesPurchased: {
            type: [PurchasedCourseSchema],
        },

        modulesPurchased: {
            type: [PurchasedModuleSchema],
        },

        accountStatus: {
            type: String,
            enum: ['active', 'suspended', 'inactive'],
            default: 'active',
        },

        lastLogin: {
            type: Date,
        },

        profession: {
            type: String,
        },

        interest: [
            {
                type: String,
            },
        ],

        experience: {
            type: String,
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

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next;
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    } catch (err) {
        next(err);
    }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.virtual('courseCount').get(function () {
    return this.coursesPurchased.length;
});

const User = model('User', userSchema);
export default User;
