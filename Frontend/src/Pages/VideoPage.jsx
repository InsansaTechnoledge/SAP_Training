import React, { useState } from 'react';
import {
    BookOpen,
    Play,
    Pause,
    Plus,
    Edit2,
    Trash2,
    ChevronRight,
    Clock,
    CheckCircle,
    List,
    ArrowRight,
    Lightbulb,
    Lock,
    Download,
    FileText,
    MessageSquare,
    Phone,
    Calendar,
    Send,
    ThumbsUp,
    Reply
} from 'lucide-react';

const VideoPage = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('');
    const [newComment, setNewComment] = useState('');
    const [showCallForm, setShowCallForm] = useState(false);

    // Sample video data
    const currentVideo = {
        title: "Introduction to ABAP",
        duration: "10:00",
        progress: 40,
        module: "ABAP Fundamentals"
    };

    const moduleVideos = [
        { id: 1, title: "Introduction to ABAP", duration: "10:00", completed: true },
        { id: 2, title: "Data Types & Variables", duration: "8:00", completed: false },
        { id: 3, title: "Control Structures", duration: "12:00", completed: false }
    ];

    // Next module data
    const nextModule = {
        title: "Advanced ABAP",
        description: "Dive deep into advanced ABAP concepts with industry-standard practices and patterns",
        topics: [
            "Object-Oriented Programming",
            "Design Patterns",
            "ABAP Units",
            "ODATA"
        ],
        price: 49,
        isLocked: true
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

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

    const resources = [
        { id: 1, title: "ABAP Fundamentals Cheat Sheet", type: "PDF", size: "2.1 MB" },
        { id: 2, title: "Exercise Files", type: "ZIP", size: "4.5 MB" },
        { id: 3, title: "Code Examples", type: "TXT", size: "156 KB" },
        { id: 4, title: "Practice Questions", type: "PDF", size: "1.8 MB" }
    ];

    // Comments data
    const [comments] = useState([
        {
            id: 1,
            user: "Sarah Chen",
            avatar: "/api/placeholder/32/32",
            content: "How do we handle exception cases in this scenario?",
            timestamp: "2 hours ago",
            likes: 5,
            replies: [
                {
                    id: 101,
                    user: "Michael Ross",
                    avatar: "/api/placeholder/32/32",
                    content: "You can use TRY-CATCH blocks to handle exceptions gracefully.",
                    timestamp: "1 hour ago",
                    likes: 3
                }
            ]
        },
        {
            id: 2,
            user: "David Kumar",
            avatar: "/api/placeholder/32/32",
            content: "Great explanation of the concepts! One question - can we use this in combination with OData?",
            timestamp: "3 hours ago",
            likes: 8,
            replies: []
        }
    ]);


    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                {/* Navigation Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
                    <span>ABAP Fundamentals</span>
                    <ChevronRight className="h-4 w-4" />
                    <span className="text-blue-600">Introduction to ABAP</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Video Player Section */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Video Player */}
                        <div className="relative bg-gray-900 rounded-xl aspect-video overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <button
                                    onClick={() => setIsPlaying(!isPlaying)}
                                    className="p-4 rounded-full bg-blue-600 text-white hover:bg-blue-500 transition-colors"
                                >
                                    {isPlaying ?
                                        <Pause className="h-6 w-6" /> :
                                        <Play className="h-6 w-6" />
                                    }
                                </button>
                            </div>

                            {/* Progress Bar */}
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800">
                                <div
                                    className="h-full bg-blue-600"
                                    style={{ width: `${currentVideo.progress}%` }}
                                />
                            </div>
                        </div>

                        {/* Video Info */}
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">
                                {currentVideo.title}
                            </h1>
                            <p className="text-gray-600">
                                Part of <span className="text-blue-600">{currentVideo.module}</span> module
                            </p>
                        </div>

                        {/* Notes Section */}
                        <div className="bg-white rounded-xl p-6 shadow-sm">
                            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <BookOpen className="h-5 w-5 text-blue-600" />
                                Video Notes
                            </h2>

                            {/* Add Note */}
                            <div className="flex gap-3 mb-6">
                                <input
                                    type="text"
                                    value={newNote}
                                    onChange={(e) => setNewNote(e.target.value)}
                                    placeholder="Add a note at current timestamp..."
                                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                    <div key={note.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                                        <div className="flex items-center text-sm text-gray-500">
                                            <Clock className="h-4 w-4 mr-1" />
                                            {note.time}
                                        </div>
                                        <p className="flex-1 text-gray-700">{note.content}</p>
                                        <div className="flex items-center gap-2">
                                            <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                                                <Edit2 className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() => deleteNote(note.id)}
                                                className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                   

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Module Progress */}
                        <div className="bg-white rounded-xl p-6 shadow-sm">
                            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <List className="h-5 w-5 text-blue-600" />
                                Module Videos
                            </h2>
                            <div className="space-y-4">
                                {moduleVideos.map(video => (
                                    <div
                                        key={video.id}
                                        className={`
                                            p-4 rounded-lg border cursor-pointer
                                            ${video.completed ? 'bg-green-50 border-green-100' : 'bg-gray-50 border-gray-100'}
                                            hover:border-blue-200 transition-colors
                                        `}
                                    >
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="font-medium text-gray-900 mb-1">{video.title}</h3>
                                                <div className="flex items-center text-sm text-gray-500">
                                                    <Clock className="h-4 w-4 mr-1" />
                                                    {video.duration}
                                                </div>
                                            </div>
                                            {video.completed && (
                                                <CheckCircle className="h-5 w-5 text-green-500" />
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Next Module Preview */}
                        <div className="bg-gradient-to-br from-indigo-50 to-white rounded-xl p-6 shadow-sm border border-indigo-100">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold flex items-center gap-2">
                                    <Lightbulb className="h-5 w-5 text-indigo-600" />
                                    Up Next
                                </h2>
                                {nextModule.isLocked && (
                                    <Lock className="h-5 w-5 text-indigo-400" />
                                )}
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                {nextModule.title}
                            </h3>
                            <p className="text-gray-600 mb-4">
                                {nextModule.description}
                            </p>

                            <div className="space-y-2 mb-6">
                                {nextModule.topics.map((topic, index) => (
                                    <div key={index} className="flex items-center text-gray-600">
                                        <ArrowRight className="h-4 w-4 mr-2 text-indigo-500" />
                                        {topic}
                                    </div>
                                ))}
                            </div>

                            <button className="w-full px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors flex items-center justify-center gap-2">
                                <Plus className="h-5 w-5" />
                                Unlock for ${nextModule.price}
                            </button>
                        </div>
                    </div>

                    {/* Resources Section */}
                    <div className="bg-white rounded-xl p-6 shadow-sm mt-6">
                        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <FileText className="h-5 w-5 text-blue-600" />
                            Downloadable Resources
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {resources.map(resource => (
                                <div
                                    key={resource.id}
                                    className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:border-blue-200 transition-all"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-blue-50 rounded-lg">
                                            <FileText className="h-5 w-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-900">{resource.title}</h3>
                                            <p className="text-sm text-gray-500">{resource.type} • {resource.size}</p>
                                        </div>
                                    </div>
                                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                        <Download className="h-5 w-5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                  

                    {/* Community Discussion Section */}
                    <div className="bg-white rounded-xl p-6 shadow-sm mt-6">
                        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <MessageSquare className="h-5 w-5 text-blue-600" />
                            Community Discussion
                        </h2>

                        {/* Add Comment */}
                        <div className="flex gap-4 mb-8">
                            <img
                                src="/api/placeholder/40/40"
                                alt="User"
                                className="w-10 h-10 rounded-full"
                            />
                            <div className="flex-1">
                                <textarea
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    placeholder="Ask a question or share your thoughts..."
                                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                                />
                                <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors flex items-center gap-2">
                                    <Send className="h-4 w-4" />
                                    Post Comment
                                </button>
                            </div>
                        </div>

                        {/* Comments List */}
                        <div className="space-y-6">
                            {comments.map(comment => (
                                <div key={comment.id} className="space-y-4">
                                    {/* Main Comment */}
                                    <div className="flex gap-4">
                                        <img
                                            src={comment.avatar}
                                            alt={comment.user}
                                            className="w-10 h-10 rounded-full"
                                        />
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-medium text-gray-900">{comment.user}</h3>
                                                <span className="text-sm text-gray-500">{comment.timestamp}</span>
                                            </div>
                                            <p className="text-gray-700 mb-2">{comment.content}</p>
                                            <div className="flex items-center gap-4">
                                                <button className="flex items-center gap-1 text-gray-500 hover:text-blue-600">
                                                    <ThumbsUp className="h-4 w-4" />
                                                    {comment.likes}
                                                </button>
                                                <button className="flex items-center gap-1 text-gray-500 hover:text-blue-600">
                                                    <Reply className="h-4 w-4" />
                                                    Reply
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Replies */}
                                    {comment.replies.map(reply => (
                                        <div key={reply.id} className="flex gap-4 ml-12">
                                            <img
                                                src={reply.avatar}
                                                alt={reply.user}
                                                className="w-8 h-8 rounded-full"
                                            />
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className="font-medium text-gray-900">{reply.user}</h3>
                                                    <span className="text-sm text-gray-500">{reply.timestamp}</span>
                                                </div>
                                                <p className="text-gray-700 mb-2">{reply.content}</p>
                                                <button className="flex items-center gap-1 text-gray-500 hover:text-blue-600">
                                                    <ThumbsUp className="h-4 w-4" />
                                                    {reply.likes}
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>


                    {/* Request a Call Section */}
                    <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 shadow-sm mt-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold flex items-center gap-2">
                                <Phone className="h-5 w-5 text-blue-600" />
                                Need Personal Assistance?
                            </h2>
                        </div>

                        {!showCallForm ? (
                            <div className="text-center">
                                <p className="text-gray-600 mb-4">
                                    Schedule a 1-on-1 call with our ABAP experts to get personalized help with your questions.
                                </p>
                                <button
                                    onClick={() => setShowCallForm(true)}
                                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors flex items-center gap-2 mx-auto"
                                >
                                    <Calendar className="h-5 w-5" />
                                    Schedule a Call
                                </button>
                            </div>
                        ) : (
                            <form className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Preferred Date
                                    </label>
                                    <input
                                        type="date"
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Preferred Time
                                    </label>
                                    <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        <option>09:00 AM</option>
                                        <option>10:00 AM</option>
                                        <option>11:00 AM</option>
                                        <option>02:00 PM</option>
                                        <option>03:00 PM</option>
                                        <option>04:00 PM</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Topics to Discuss
                                    </label>
                                    <textarea
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                                        placeholder="Brief description of what you'd like to discuss..."
                                    />
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        type="submit"
                                        className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
                                    >
                                        Request Call
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowCallForm(false)}
                                        className="px-6 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default VideoPage;