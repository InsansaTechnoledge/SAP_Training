import mongoose from "mongoose";

const DiscussionSchema = mongoose.Schema({
    comment: {
        type: String, 
        required: true
    },
    time: {
        type: Date,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    contentId: {
        type: String,
        required: true
    }
});

const Discussion = mongoose.model("Discussion", DiscussionSchema);
export default Discussion;