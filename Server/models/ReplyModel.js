import mongoose from "mongoose";

const ReplySchema = new mongoose.Schema({
    reply: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        required: true
    },
    discussionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Discussion",
        required: true
    }
});

const Reply = mongoose.model("Reply", ReplySchema);
export default Reply;