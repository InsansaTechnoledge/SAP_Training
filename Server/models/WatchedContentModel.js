import mongoose from "mongoose";

const WatchedContentSchema = new mongoose.Schema({
    courseId: {
        type: String,
        requierd: true
    },
    score: {
        type: Number,
        requierd: true
    },
    completed: {
        type: Boolean,
        requierd: true
    }
});

const WatchedContent = mongoose.model("WatchedContent", WatchedContentSchema);
export default WatchedContent;