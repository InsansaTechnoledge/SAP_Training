import mongoose from "mongoose";

const WatchedVideoSchema = new mongoose.Schema({
    videoId: {
        type: Number,
        required: true
    },
    progress: {
        type: Number,
        required: true
    }
});

const WatchedVideo = mongoose.model("WatchedVideo", WatchedVideoSchema);
export default WatchedVideo;