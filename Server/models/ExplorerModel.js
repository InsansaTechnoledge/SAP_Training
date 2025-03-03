import mongoose from "mongoose";

const GapSchema = new mongoose.Schema({
    id: { 
        type: String, 
        required: true 
    },
    options: {
        type: [String], 
        required: true 
    },
    correct: { 
        type: String, 
        required: true 
    }
});

const ChallengeLevelOneSchema = new mongoose.Schema({
    description: { 
        type: String, 
        required: true 
    },
    gaps: { 
        type: [GapSchema], 
        default: [] 
    },
    expectedOutput: { 
        type: String, 
        required: true 
    }
});

const ChallengeLevelTwoSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    options: {
        type: [String],
        required: true
    },
    correct: {
        type: Number,
        required: true
    }
});

const ChallengeLevelThreeSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    expectedOutput: {
        type: String,
        required: true
    },
    solution: {
        type: [String],
        required: true
    }
});

const QuestionSchemaLevelOne = new mongoose.Schema({
    id: { 
        type: Number, 
        required: true 
    },
    title: { 
        type: String, 
        required: true 
    },
    concept: { 
        type: String, 
        required: true 
    },
    explanation: { 
        type: String, 
        required: true 
    },
    baseCode: { 
        type: String, 
        required: true 
    },
    challenge: { 
        type: ChallengeLevelOneSchema, 
        required: true 
    }
});

const QuestionSchemaLevelTwo = new mongoose.Schema({
    id: { 
        type: Number, 
        required: true 
    },
    title: { 
        type: String, 
        required: true 
    },
    concept: { 
        type: String, 
        required: true 
    },
    explanation: { 
        type: String, 
        required: true 
    },
    baseCode: { 
        type: String, 
        required: true 
    },
    challenge: { 
        type: ChallengeLevelTwoSchema, 
        required: true 
    }
});

const QuestionSchemaLevelThree = new mongoose.Schema({
    id: { 
        type: Number, 
        required: true 
    },
    title: { 
        type: String, 
        required: true 
    },
    concept: { 
        type: String, 
        required: true 
    },
    explanation: { 
        type: String, 
        required: true 
    },
    baseCode: { 
        type: String, 
        required: true 
    },
    challenge: { 
        type: ChallengeLevelThreeSchema, 
        required: true 
    }
});


const ExplorerSchema=new mongoose.Schema({
    explorerLevelOne:{
        content: { 
            type: [QuestionSchemaLevelOne], 
            default: [] 
        },
        completedQuestions: { 
            type: Number,
             default: 0 
        }
    },
    explorerLevelTwo:{
        content: { 
            type: [QuestionSchemaLevelTwo], 
            default: [] 
        },
        completedQuestions: { 
            type: Number,
             default: 0 
        }
    },
    explorerLevelThree:{
        content: { 
            type: [QuestionSchemaLevelThree], 
            default: [] 
        },
        completedQuestions: { 
            type: Number,
             default: 0 
        }
    }
});
const Explorer = mongoose.model("Explorer", ExplorerSchema);
export default Explorer;


