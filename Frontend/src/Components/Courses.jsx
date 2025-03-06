import React, { useContext, useState } from 'react';
import { domAnimation, motion } from 'framer-motion';
import {
    Cloud, Code, Database, Brain, ShoppingCart, Heart, Star,
    Users, Clock, ArrowRight, GraduationCap, Search, Filter,
    BookOpen, Activity, Plus,
    CornerUpLeftIcon
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Context/CartContext';
import { useWishlist } from '../Context/WishlistContext';
import AIimage from '../assets/AI.jpg';
import CCimage from '../assets/CC.jpg';
import FSDimage from '../assets/FSD.jpg';
import ABAPimage from '../assets/ABAP.jpg';

const Courses = ({ category }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [hoveredCourse, setHoveredCourse] = useState(null);
    const { addToCart } = useCart();
    const { wishlist, addToWishlist } = useWishlist();
    const navigate = useNavigate();

    const categories = [
        { id: 'all', label: 'All Courses' },
        { id: 'crash', label: 'Crash Courses' },
        { id: 'standalone', label: 'Standalone Courses' },
        { id: 'combined', label: 'Combined Courses' }
    ];

    const courses = [
        // Crash Courses
        {
            $id: '1',
            title: 'AI Quick Start',
            icon: <Brain className="w-8 h-8" />,
            description: 'Accelerated AI/ML fundamentals in just 4 weeks.',
            price: 1999,
            category: 'crash',
            students: 567,
            rating: 4.6,
            duration: '4 weeks',
            image: AIimage,
            features: ['Intensive', 'Quick Learning', 'Fundamentals'],
            domain: 'crash'
        },
        {
            $id: '',
            title: 'Fullstack Quick Start',
            icon: <Code className="w-8 h-8" />,
            description: 'Accelerated Fullstack fundamentals in just 4 weeks.',
            price: 2999,
            category: 'crash',
            students: 567,
            rating: 4.6,
            duration: '4 weeks',
            image: FSDimage,
            features: ['Intensive', 'Quick Learning', 'Fundamentals'],
            domain: 'crash'
        },
        {
            $id: '67c831550006cb081c51',
            title: 'Cloud Essentials Crash Course',
            icon: <Cloud className="w-8 h-8" />,
            description: 'Rapid cloud computing fundamentals and deployment.',
            price: 2499,
            category: 'crash',
            students: 412,
            rating: 4.5,
            duration: '3 weeks',
            image: CCimage,
            features: ['Accelerated', 'Practical', 'Certification Prep'],
            domain: 'crash'
        },
        // Standalone Courses
        {
            $id: '67c6e04e00365c934681',
            title: 'ABAP Mastery Program',
            icon: <Database className="w-8 h-8" />,
            description: 'A Comprehensive Learning Path for ABAP Developers .',
            price: 5999,
            category: 'standalone',
            students: 1234,
            rating: 4.8,
            duration: '12 weeks',
            image: ABAPimage,
            features: ['24/7 Support', 'Certificate', 'Projects'],
            domain: 'standalone'
        },
        {
            $id: ' ',
            title: 'Full Stack Development',
            icon: <Code className="w-8 h-8" />,
            description: 'End-to-end development with React, Node.js, and databases.',
            price: 7999,
            category: 'standalone',
            students: 3421,
            rating: 4.9,
            duration: '16 weeks',
            image: FSDimage,
            features: ['Code Reviews', 'Portfolio', 'Mentorship'],
            domain: 'standalone'
        },
        // Combined Courses
        {
            $id: '4',
            title: 'AI + Cloud Computing Combo',
            icon: (
                <div className="flex items-center">
                    <Brain className="w-6 h-6 mr-1" />
                    <Plus className="w-4 h-4 text-blue-500" />
                    <Cloud className="w-6 h-6 ml-1" />
                </div>
            ),
            description: 'Comprehensive AI and Cloud Computing learning path.',
            price: 9999,
            category: 'combined',
            students: 256,
            rating: 4.7,
            duration: '20 weeks',
            image: AIimage,
            features: ['Dual Certification', 'Advanced Projects', 'Career Boost'],
            domain: 'combined',
            combinedCourses: [
                {
                    title: 'AI Fundamentals',
                    price: 6999,
                    duration: '14 weeks'
                },
                {
                    title: 'Cloud Computing',
                    price: 4999,
                    duration: '10 weeks'
                }
            ]
        }
    ];

    const addInCart = (course) => {
        addToCart(course);
    };

    const addInWishlist = (course) => {
        addToWishlist(course);
    };

    const isInWishlist = (courseTitle) => wishlist.some(item => item.title === courseTitle);

    const filteredCourses = courses.filter(course =>
        (category === 'all' || course.domain === category) &&
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const courseVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    if (filteredCourses.length === 0) {
        return (
            <div className='text-secondary text-lg text-center'>
                New Courses coming soon!
            </div>
        )
    }

    return (
        <div className="relative min-h-screen">
            <div className="max-w-7xl mx-auto px-4 py-16">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 pb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                        Explore {category} Courses
                    </h1>
                    <p className="text-primary text-lg max-w-2xl mx-auto">
                        Level up your skills with our industry-leading courses taught by expert instructors
                    </p>
                </div>

                {/* Search and Filter Section */}
                <div className="mb-12 flex flex-col md:flex-row gap-4 items-center justify-center">
                    <div className="relative w-full md:w-xl">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search courses..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-secondary text-secondary focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        />
                    </div>
                </div>

                {/* Course Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {filteredCourses.map((course) => (
                        <motion.div
                            key={course.title}
                            variants={courseVariants}
                            onHoverStart={() => setHoveredCourse(course.title)}
                            onHoverEnd={() => setHoveredCourse(null)}
                            className="relative bg-secondary rounded-2xl shadow-md shadow-gray-500 hover:shadow-lg transition-all duration-300 overflow-hidden"
                        >
                            <div className="relative">
                                <img
                                    src={course.image}
                                    alt={course.title}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => addInWishlist(course)}
                                    className="absolute top-4 right-4 p-2 bg-secondary rounded-full"
                                >
                                    <Heart className={`w-5 h-5 ${isInWishlist(course.title) ? 'text-red-500 fill-current' : 'text-secondary'}`} />
                                </motion.button>
                                <div className="absolute bottom-4 left-4 flex items-center space-x-2">
                                    <div className="p-2 bg-white/90 rounded-lg backdrop-blur-sm">
                                        {course.icon}
                                    </div>
                                    <div className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm">
                                        {course.category.charAt(0).toUpperCase() + course.category.slice(1)}
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 flex flex-col justify-between border">
                                <div>
                                    <h3 className="text-xl font-bold mb-2 text-secondary">{course.title}</h3>
                                    <p className="text-secondary text-sm mb-4">
                                        {course.description}
                                    </p>

                                    {/* Combined Courses Details */}
                                    {course.combinedCourses && (
                                        <div className="mb-4 bg-primary/10 rounded-lg p-3">
                                            <h4 className="text-sm font-semibold mb-2 text-secondary">Combined Courses:</h4>
                                            {course.combinedCourses.map((subCourse, index) => (
                                                <div key={index} className="flex justify-between text-xs text-secondary">
                                                    <span>{subCourse.title}</span>
                                                    <span>₹{subCourse.price} | {subCourse.duration}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {course.features.map((feature, index) => (
                                            <span
                                                key={index}
                                                className="text-xs px-3 py-1 bg-primary text-primary rounded-full"
                                            >
                                                {feature}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className='bottom-0'>
                                    <div className="flex items-center justify-between mb-4 text-sm">
                                        <div className="flex items-center space-x-1">
                                            <Star className="w-5 h-5 text-yellow-400 fill-current" />
                                            <span className="font-medium text-primary">{course.rating}</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <Users className="w-5 h-5 text-gray-400" />
                                            <span className='text-primary'>{course.students.toLocaleString()}</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <Clock className="w-5 h-5 text-gray-400" />
                                            <span className='text-primary'>{course.duration}</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-3">
                                        <div className="flex justify-between items-center">
                                            <div className="flex flex-col">
                                                <span className="text-sm text-gray-500 dark:text-gray-400">Price</span>
                                                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                                    ₹{course.price}
                                                </span>
                                            </div>
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => addInCart(course)}
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center space-x-2 shadow-lg"
                                            >
                                                <span>Enroll Now</span>
                                                <ArrowRight className="w-4 h-4" />
                                            </motion.button>
                                        </div>

                                        <motion.div
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}

                                            className="w-full text-center bg-contrast hover:bg-gray-200 dark:hover:bg-gray-600 text-contrast px-6 py-3 rounded-xl flex items-center justify-center space-x-2 transition-colors duration-200"
                                            onClick={() => { if (course.$id) { navigate(`/course?id=${course.$id}`) } }}
                                        >{!course.$id ?
                                            <span>Coming soon!!</span>
                                            :
                                            <span>Explore for Free</span>}
                                            <BookOpen className="w-4 h-4" />
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default Courses;