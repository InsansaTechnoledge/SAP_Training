import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cart: {
        type: [Number]
    },
    wishlist: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Wishlist"
        }
    ],
    modulesPurchased: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "PurchasedModule"
        }
    ],
    coursesPurchased: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "PurchasedCourse"
        }
    ],
    payment: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Payment"
        }
    ],
    certificates: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Certificate"
        }
    ],
    watchedContents: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "WatchedContent"
        }
    ],
    watchedVideo: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "WatchedVideo"
        }
    ],
    discussionLikes: {
        type: [Number]
    },
    replyLikes: {
        type: [Number]
    },
    notes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Note"
        }
    ],
    achievement:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Achievement"
        }
    ]
        
    

});

const User = mongoose.model("User", UserSchema);
export default User;