import mongoose from "mongoose";

const AchievementSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

const Achievement = mongoose.model("Achievement", AchievementSchema);
export default Achievement;