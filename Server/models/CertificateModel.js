import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema({
    courseId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

const CertificateModel = mongoose.model("Certificate", certificateSchema);
export default CertificateModel;