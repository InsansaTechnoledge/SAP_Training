import React, { useState, useEffect } from 'react';
import { Search, X, BookOpen, Clock, Star, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SearchOverlay = ({ isOpen, onClose, onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [recentSearches] = useState([
        'Web Development', 'UI/UX Design', 'Python Programming'
    ]);
    const [trendingSearches] = useState([
        'Machine Learning', 'React Native', 'Data Science'
    ]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(searchQuery);
        setSearchQuery('');
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 bg-blue-950/50 backdrop-blur-sm z-50"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) onClose();
                    }}
                >
                    <div className="min-h-screen pt-24 px-4 pb-8 overflow-y-auto">
                        <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                            className="max-w-3xl mx-auto"
                        >
                            {/* Search Container */}
                            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                                {/* Search Header */}
                                <div className="p-6 border-b border-blue-100">
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-xl font-semibold text-blue-900">
                                            Search Courses
                                        </h2>
                                        <motion.button
                                            whileHover={{ rotate: 90 }}
                                            transition={{ duration: 0.2 }}
                                            onClick={onClose}
                                            className="p-2 hover:bg-blue-50 rounded-full"
                                        >
                                            <X className="w-6 h-6 text-blue-500" />
                                        </motion.button>
                                    </div>

                                    {/* Search Form */}
                                    <form onSubmit={handleSearch}>
                                        <div className="relative">
                                            <Search className="absolute left-4 top-3.5 w-5 h-5 text-blue-400" />
                                            <motion.input
                                                initial={{ width: "80%" }}
                                                animate={{ width: "100%" }}
                                                type="text"
                                                value={searchQuery}
                                                onChange={(e) => {
                                                    setSearchQuery(e.target.value);
                                                    setShowSuggestions(e.target.value.length > 0);
                                                }}
                                                placeholder="Search for courses, topics, or skills..."
                                                className="w-full pl-12 pr-4 py-3 text-lg border-2 border-blue-100 rounded-xl 
                                                          focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100
                                                          transition-all duration-300"
                                            />
                                        </div>
                                    </form>
                                </div>

                                {/* Search Content */}
                                <div className="p-6">
                                    <AnimatePresence>
                                        {showSuggestions ? (
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 20 }}
                                                className="space-y-4"
                                            >
                                                <p className="text-sm text-blue-900 font-medium">
                                                    Suggested Results
                                                </p>
                                                {['React Basics', 'React Hooks', 'React Native'].map((suggestion, index) => (
                                                    <motion.button
                                                        key={suggestion}
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: index * 0.1 }}
                                                        className="flex items-center space-x-3 w-full p-3 hover:bg-blue-50 
                                                                   rounded-lg transition-colors duration-200"
                                                        onClick={() => {
                                                            setSearchQuery(suggestion);
                                                            setShowSuggestions(false);
                                                        }}
                                                    >
                                                        <BookOpen className="w-5 h-5 text-blue-400" />
                                                        <span className="text-blue-900">{suggestion}</span>
                                                    </motion.button>
                                                ))}
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="grid md:grid-cols-2 gap-6"
                                            >
                                                {/* Recent Searches */}
                                                <div>
                                                    <div className="flex items-center space-x-2 mb-4">
                                                        <Clock className="w-4 h-4 text-blue-400" />
                                                        <h3 className="text-sm font-medium text-blue-900">Recent Searches</h3>
                                                    </div>
                                                    <div className="space-y-2">
                                                        {recentSearches.map((search, index) => (
                                                            <motion.button
                                                                key={search}
                                                                initial={{ opacity: 0, x: -20 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                transition={{ delay: index * 0.1 }}
                                                                className="block w-full text-left px-4 py-2 text-blue-600 hover:bg-blue-50 
                                                                           rounded-lg transition-colors duration-200"
                                                                onClick={() => setSearchQuery(search)}
                                                            >
                                                                {search}
                                                            </motion.button>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Trending Searches */}
                                                <div>
                                                    <div className="flex items-center space-x-2 mb-4">
                                                        <TrendingUp className="w-4 h-4 text-blue-400" />
                                                        <h3 className="text-sm font-medium text-blue-900">Trending Now</h3>
                                                    </div>
                                                    <div className="space-y-2">
                                                        {trendingSearches.map((search, index) => (
                                                            <motion.button
                                                                key={search}
                                                                initial={{ opacity: 0, x: 20 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                transition={{ delay: index * 0.1 }}
                                                                className="block w-full text-left px-4 py-2 text-blue-600 hover:bg-blue-50 
                                                                           rounded-lg transition-colors duration-200"
                                                                onClick={() => setSearchQuery(search)}
                                                            >
                                                                {search}
                                                            </motion.button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SearchOverlay;