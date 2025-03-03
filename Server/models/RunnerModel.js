import mongoose from "mongoose";

const RunnerSchema = new mongoose.Schema({
    moduleId:{
        type: Number,
        required: true
    },
    questions:[
        {
            question:{
                type: String,
                required: true
            },
            answers:{
                type: [String],
                required: true
            },
            correct:{
                type: Number,
                required: true
            },
            explanation:{
                type: String,
                required: true
            }
        }
    ],
    completed:{
        type: Boolean,
        required: true
    }


});

const Runner = mongoose.model("Runner", RunnerSchema);
export default Runner;