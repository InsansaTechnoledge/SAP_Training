import React, { useState } from 'react';
import {
    BookOpen,
    Check,
    X,
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
    Reply,
    Flag,
    HelpCircle,
    AlertTriangle
} from 'lucide-react';

import QuizStartOverlay from './QuizOverlay';

const QuizPage = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('');
    const [newComment, setNewComment] = useState('');
    const [showCallForm, setShowCallForm] = useState(false);
    const [remainingTime, setRemainingTime] = useState(300); // 5 minutes per question
    const [showStartOverlay, setShowStartOverlay] = useState(true);

    // Sample quiz data
    const currentQuiz = {
        title: "ABAP Fundamentals Quiz",
        module: "ABAP Fundamentals",
        totalQuestions: 10
    };

    // Sample question data
    const questions = [
        {
            id: 1,
            question: "Which of the following is the correct syntax for declaring a variable in ABAP?",
            options: [
                "DATA: variable TYPE string.",
                "VAR variable AS string",
                "DECLARE variable STRING",
                "SET variable TYPE string"
            ],
            correctAnswer: 0,
            explanation: "In ABAP, variables are declared using the DATA statement. The correct syntax is 'DATA: variable TYPE string.' where TYPE specifies the data type."
        }
        // Add more questions as needed
    ];

    // Quiz progress tracking
    const moduleProgress = [
        { id: 1, title: "Basic Syntax", questionsCount: 10, completed: true },
        { id: 2, title: "Data Types", questionsCount: 8, completed: false },
        { id: 3, title: "Control Structures", questionsCount: 12, completed: false }
    ];

    // Next module data
    const nextModule = {
        title: "Advanced ABAP",
        description: "Test your knowledge of advanced ABAP concepts with challenging questions",
        topics: [
            "Object-Oriented Programming",
            "Design Patterns",
            "ABAP Units",
            "ODATA"
        ],
        price: 49,
        isLocked: true
    };

    const handleAnswerSubmit = () => {
        if (selectedAnswer !== null) {
            setIsAnswerSubmitted(true);
        }
    };

    const handleNextQuestion = () => {
        setCurrentQuestionIndex(prev => Math.min(prev + 1, questions.length - 1));
        setSelectedAnswer(null);
        setIsAnswerSubmitted(false);
    };

    const addNote = () => {
        if (newNote.trim()) {
            setNotes([
                ...notes,
                {
                    id: Date.now(),
                    questionId: questions[currentQuestionIndex].id,
                    content: newNote
                }
            ]);
            setNewNote('');
        }
    };

    const deleteNote = (noteId) => {
        setNotes(notes.filter(note => note.id !== noteId));
    };

    // Resources data
    const resources = [
        { id: 1, title: "ABAP Quiz Study Guide", type: "PDF", size: "2.1 MB" },
        { id: 2, title: "Practice Questions", type: "PDF", size: "1.5 MB" },
        { id: 3, title: "Answer Explanations", type: "PDF", size: "1.8 MB" },
        { id: 4, title: "Common Mistakes Guide", type: "PDF", size: "956 KB" }
    ];

    // Sample comments data
    const [comments] = useState([
        {
            id: 1,
            user: "Sarah Chen",
            avatar: "/api/placeholder/32/32",
            content: "I'm confused about the syntax in question 3. Can someone explain?",
            timestamp: "2 hours ago",
            likes: 5,
            replies: [
                {
                    id: 101,
                    user: "Michael Ross",
                    avatar: "/api/placeholder/32/32",
                    content: "The syntax follows ABAP's standard declaration pattern. Remember to always...",
                    timestamp: "1 hour ago",
                    likes: 3
                }
            ]
        }
    ]);

    return (
        <div className="min-h-screen bg-gray-50">
            {showStartOverlay && (
                <QuizStartOverlay
                    onStart={() => setShowStartOverlay(false)}
                    onPostpone={() => {
                        // Handle postpone action - could redirect to another page
                        // or show a confirmation dialog
                        if (window.confirm('Are you sure you want to attempt this quiz later?')) {
                            // Redirect or handle postpone action
                        }
                    }}
                />
            )}
            <div className="container mx-auto px-4 py-8 mt-24">
                {/* Navigation Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
                    <span>ABAP Fundamentals</span>
                    <ChevronRight className="h-4 w-4" />
                    <span className="text-blue-600">Quiz: Basic Syntax</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Quiz Section */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Quiz Container */}
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                            {/* Quiz Header */}
                            <div className="p-6 border-b">
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-gray-500">Question {currentQuestionIndex + 1} of {questions.length}</span>
                                        <div className="h-2 w-32 bg-gray-200 rounded-full">
                                            <div
                                                className="h-full bg-blue-600 rounded-full"
                                                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-gray-500" />
                                        <span className="text-sm text-gray-500">{Math.floor(remainingTime / 60)}:{(remainingTime % 60).toString().padStart(2, '0')}</span>
                                    </div>
                                </div>
                                <h2 className="text-xl font-semibold text-gray-900">
                                    {questions[currentQuestionIndex].question}
                                </h2>
                            </div>

                            {/* Answer Options */}
                            <div className="p-6 space-y-4">
                                {questions[currentQuestionIndex].options.map((option, index) => (
                                    <button
                                        key={index}
                                        onClick={() => !isAnswerSubmitted && setSelectedAnswer(index)}
                                        className={`w-full p-4 rounded-lg border text-left transition-all ${selectedAnswer === index
                                                ? isAnswerSubmitted
                                                    ? index === questions[currentQuestionIndex].correctAnswer
                                                        ? 'border-green-500 bg-green-50'
                                                        : 'border-red-500 bg-red-50'
                                                    : 'border-blue-500 bg-blue-50'
                                                : 'border-gray-200 hover:border-blue-200'
                                            }`}
                                        disabled={isAnswerSubmitted}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${selectedAnswer === index
                                                    ? isAnswerSubmitted
                                                        ? index === questions[currentQuestionIndex].correctAnswer
                                                            ? 'bg-green-500 text-white'
                                                            : 'bg-red-500 text-white'
                                                        : 'bg-blue-500 text-white'
                                                    : 'border border-gray-300'
                                                }`}>
                                                {isAnswerSubmitted && selectedAnswer === index && (
                                                    index === questions[currentQuestionIndex].correctAnswer
                                                        ? <Check className="h-4 w-4" />
                                                        : <X className="h-4 w-4" />
                                                )}
                                            </div>
                                            <span className="flex-1">{option}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            {/* Answer Explanation */}
                            {isAnswerSubmitted && (
                                <div className="p-6 bg-gray-50 border-t">
                                    <div className="flex items-start gap-3">
                                        <div className="p-2 bg-blue-100 rounded-lg">
                                            <Lightbulb className="h-5 w-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-2">Explanation</h3>
                                            <p className="text-gray-700">{questions[currentQuestionIndex].explanation}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="p-6 border-t bg-white">
                                <div className="flex justify-between items-center">
                                    <button className="flex items-center gap-2 text-gray-500 hover:text-red-600">
                                        <Flag className="h-5 w-5" />
                                        Report Issue
                                    </button>
                                    {!isAnswerSubmitted ? (
                                        <button
                                            onClick={handleAnswerSubmit}
                                            disabled={selectedAnswer === null}
                                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Submit Answer
                                        </button>
                                    ) : (
                                        <button
                                            onClick={handleNextQuestion}
                                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
                                        >
                                            Next Question
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Notes Section */}
                        <div className="bg-white rounded-xl p-6 shadow-sm">
                            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <BookOpen className="h-5 w-5 text-blue-600" />
                                Question Notes
                            </h2>

                            <div className="flex gap-3 mb-6">
                                <input
                                    type="text"
                                    value={newNote}
                                    onChange={(e) => setNewNote(e.target.value)}
                                    placeholder="Add a note for this question..."
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

                            <div className="space-y-4">
                                {notes.filter(note => note.questionId === questions[currentQuestionIndex].id).map(note => (
                                    <div key={note.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
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
                                Quiz Progress
                            </h2>
                            <div className="space-y-4">
                                {moduleProgress.map(section => (
                                    <div
                                        key={section.id}
                                        className={`
                                            p-4 rounded-lg border cursor-pointer
                                            ${section.completed ? 'bg-green-50 border-green-100' : 'bg-gray-50 border-gray-100'}
                                            hover:border-blue-200 transition-colors
                                        `}
                                    >
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="font-medium text-gray-900 mb-1">{section.title}</h3>
                                                <div className="flex items-center text-sm text-gray-500">
                                                    <HelpCircle className="h-4 w-4 mr-1" />
                                                    {section.questionsCount} questions
                                                </div>
                                            </div>
                                            {section.completed && (
                                                <CheckCircle className="h-5 w-5 text-green-500" />
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold flex items-center gap-2">
                                    <Lightbulb className="h-5 w-5 text-indigo-600" />
                                    Next Quiz Module
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
                            Study Resources
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
                            Discussion Forum
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
                                    placeholder="Ask a question about this quiz..."
                                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                                />
                                <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors flex items-center gap-2">
                                    <Send className="h-4 w-4" />
                                    Post Question
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

                    {/* Request Tutoring Section */}
                    <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 shadow-sm mt-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold flex items-center gap-2">
                                <Phone className="h-5 w-5 text-blue-600" />
                                Need Help with ABAP?
                            </h2>
                        </div>

                        {!showCallForm ? (
                            <div className="text-center">
                                <p className="text-gray-600 mb-4">
                                    Schedule a 1-on-1 tutoring session with our ABAP experts to improve your understanding.
                                </p>
                                <button
                                    onClick={() => setShowCallForm(true)}
                                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors flex items-center gap-2 mx-auto"
                                >
                                    <Calendar className="h-5 w-5" />
                                    Schedule Tutoring
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
                                        Topics Needing Help
                                    </label>
                                    <textarea
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                                        placeholder="Describe the topics you'd like to review..."
                                    />
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        type="submit"
                                        className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
                                    >
                                        Request Tutoring
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
    );
};

export default QuizPage;