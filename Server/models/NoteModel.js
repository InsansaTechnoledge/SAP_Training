import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
    note: {
        type: String,
        required: true
    },
    contentId: {
        type: Number,
        required: true
    }
});

const Note = mongoose.model("Note", NoteSchema);

export default Note;