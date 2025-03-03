import mongoose from "mongoose";

const PurchasedCourseSchema = new mongoose.Schema({
    courseId: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    }
});

const PurchasedCourse = mongoose.model("PurchasedCourse", PurchasedCourseSchema);
export default PurchasedCourse;