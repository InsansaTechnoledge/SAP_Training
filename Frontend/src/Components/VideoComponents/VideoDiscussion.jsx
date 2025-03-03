import React, { useState } from 'react';
import { MessageSquare, Send, ThumbsUp, Reply } from 'lucide-react';

const VideoDiscussion = () => {
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState([
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

    const handlePostComment = () => {
        if (newComment.trim()) {
            setComments([...comments, {
                id: Date.now(),
                user: "John Doe",
                avatar: "/api/placeholder/32/32",
                content: newComment,
                timestamp: "Just now",
                likes: 0,
                replies: []
            }]);
            setNewComment('');
        }
    };

    return (
        <div className="bg-card rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-secondary">
                <MessageSquare className="h-5 w-5 text-blue" />
                Discussion
            </h2>

            <div className="flex gap-3 mb-6">
                <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment or question..."
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-secondary"
                />
                <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors flex items-center gap-2"
                    onClick={() => setNewComment('')}
                >
                    <Send className="h-4 w-4" />
                    Post
                </button>
            </div>

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
                                    <h4 className="font-medium text-secondary">{comment.user}</h4>
                                    <span className="text-xs text-gray-500">{comment.timestamp}</span>
                                </div>
                                <p className="text-secondary mb-2">{comment.content}</p>
                                <div className="flex items-center gap-4 text-sm">
                                    <button className="flex items-center gap-1 text-gray-500 hover:text-blue-500 transition-colors">
                                        <ThumbsUp className="h-4 w-4" />
                                        <span>{comment.likes}</span>
                                    </button>
                                    <button className="flex items-center gap-1 text-gray-500 hover:text-blue-500 transition-colors">
                                        <Reply className="h-4 w-4" />
                                        <span>Reply</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {comment.replies.length > 0 && (
                            <div className="pl-14 space-y-4">
                                {comment.replies.map(reply => (
                                    <div key={reply.id} className="flex gap-4">
                                        <img
                                            src={reply.avatar}
                                            alt={reply.user}
                                            className="w-8 h-8 rounded-full"
                                        />
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h4 className="font-medium text-secondary">{reply.user}</h4>
                                                <span className="text-xs text-gray-500">{reply.timestamp}</span>
                                            </div>
                                            <p className="text-secondary mb-2">{reply.content}</p>
                                            <div className="flex items-center gap-4 text-sm">
                                                <button className="flex items-center gap-1 text-gray-500 hover:text-blue-500 transition-colors">
                                                    <ThumbsUp className="h-4 w-4" />
                                                    <span>{reply.likes}</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VideoDiscussion;
