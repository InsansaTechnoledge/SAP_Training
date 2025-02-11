import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Book, BookOpen, ChevronDown, Star, Clock } from 'lucide-react';

const CourseShop = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const majorCourses = [
        {
            id: 1,
            title: "SAP S/4HANA Implementation",
            category: "major",
            price: 999,
            duration: "12 weeks",
            rating: 4.8,
            students: 1250,
            image: "/api/placeholder/400/225"
        },
        {
            id: 2,
            title: "SAP FICO Professional",
            category: "major",
            price: 899,
            duration: "10 weeks",
            rating: 4.7,
            students: 980,
            image: "/api/placeholder/400/225"
        },
        {
            id: 3,
            title: "SAP MM Master Course",
            category: "major",
            price: 849,
            duration: "8 weeks",
            rating: 4.9,
            students: 750,
            image: "/api/placeholder/400/225"
        }
    ];

    const minorCourses = [
        {
            id: 4,
            title: "SAP Basics",
            category: "minor",
            price: 299,
            duration: "4 weeks",
            rating: 4.5,
            students: 2100,
            image: "/api/placeholder/400/225"
        },
        {
            id: 5,
            title: "SAP Security Fundamentals",
            category: "minor",
            price: 399,
            duration: "6 weeks",
            rating: 4.6,
            students: 890,
            image: "/api/placeholder/400/225"
        }
    ];

    const allCourses = [...majorCourses, ...minorCourses];

    const filteredCourses = allCourses.filter(course => {
        const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
        const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const CourseCard = ({ course }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all"
        >
            <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
            <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                <div className="flex items-center mb-4">
                    <Star className="w-5 h-5 text-yellow-400" />
                    <span className="ml-2 text-gray-600">{course.rating}</span>
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="text-gray-600">{course.students} students</span>
                </div>
                <div className="flex items-center mb-4">
                    <Clock className="w-5 h-5 text-blue-500" />
                    <span className="ml-2 text-gray-600">{course.duration}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-blue-600">${course.price}</span>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
                    >
                        Enroll Now
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-blue-900 text-white py-16">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold mb-4">SAP Learning Platform</h1>
                    <p className="text-xl text-blue-200">Master SAP with our comprehensive courses</p>
                </div>
            </div>

            {/* Search and Filter Section */}
            <div className="container mx-auto px-4 -mt-8">
                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-3 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search courses..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">All Courses</option>
                            <option value="major">Major Courses</option>
                            <option value="minor">Minor Courses</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Course Grid */}
            <div className="container mx-auto px-4 pb-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredCourses.map(course => (
                        <CourseCard key={course.id} course={course} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CourseShop;