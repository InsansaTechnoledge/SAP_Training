import React, { useState } from 'react';
import { BookOpen, Plus, Clock, Trash2, Edit2 } from 'lucide-react';

const VideoNotes = ({ currentTime, formatTime }) => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('');

    const addNote = () => {
        if (newNote.trim()) {
            setNotes([
                ...notes,
                { id: Date.now(), timestamp: currentTime, content: newNote, time: formatTime(currentTime) }
            ]);
            setNewNote('');
        }
    };

    const deleteNote = (noteId) => {
        setNotes(notes.filter(note => note.id !== noteId));
    };

    return (
        <div className="bg-card rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-secondary">
                <BookOpen className="h-5 w-5 text-blue" />
                Video Notes
            </h2>

            {/* Add Note */}
            <div className="flex gap-3 mb-6">
                <input
                    type="text"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Add a note at current timestamp..."
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-secondary"
                />
                <button
                    onClick={addNote}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors flex items-center gap-2"
                >
                    <Plus className="h-4 w-4" />
                    Add Note
                </button>
            </div>

            {/* Notes List */}
            <div className="space-y-4">
                {notes.map(note => (
                    <div key={note.id} className="flex items-start gap-4 p-4 bg-card border-contrast rounded-lg">
                        <div className="flex items-center text-sm text-secondary">
                            <Clock className="h-4 w-4 mr-1" />
                            {note.time}
                        </div>
                        <p className="flex-1 text-secondary">{note.content}</p>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => deleteNote(note.id)}
                                className="p-1 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                            >
                                <Trash2 className="h-4 w-4" />
                            </button>
                            <button
                                className="p-1 text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
                            >
                                <Edit2 className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                ))}

                {notes.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        <p>No notes yet. Add your first note at any point in the video.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VideoNotes;
