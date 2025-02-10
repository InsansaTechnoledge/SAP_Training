import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Cloud, Code, Database, Brain, ShoppingCart, Heart, Star,
    Users, Clock, ArrowRight, GraduationCap, Search, Filter,
    BookOpen, Activity
} from 'lucide-react';
import Wishlist from "./Wishlist";
import Cart from './Cart';
import Navigation from './Navbar';

const Courses = ({ cart, setCart, isCartOpen, setIsCartOpen, wishlist, setWishlist, isWishlistOpen, setIsWishlistOpen }) => {
    const [activeTab, setActiveTab] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [hoveredCourse, setHoveredCourse] = useState(null);

    const categories = [
        { id: 'all', label: 'All Courses' },
        { id: 'enterprise', label: 'Enterprise' },
        { id: 'cloud', label: 'Cloud Computing' },
        { id: 'ai', label: 'AI & ML' },
        { id: 'development', label: 'Development' }
    ];

    const courses = [
        {
            title: 'SAP ABAP Development',
            icon: <Database className="w-8 h-8" />,
            description: 'Master enterprise development with SAP ABAP and optimize business processes.',
            price: 599,
            category: 'enterprise',
            students: 1234,
            rating: 4.8,
            duration: '12 weeks',
            image: '/api/placeholder/800/400',
            features: ['24/7 Support', 'Certificate', 'Projects']
        },
        {
            title: 'Cloud Computing',
            icon: <Cloud className="w-8 h-8" />,
            description: 'AWS, Azure, and Google Cloud with hands-on deployment scenarios.',
            price: 499,
            category: 'cloud',
            students: 2156,
            rating: 4.9,
            duration: '10 weeks',
            image: '/api/placeholder/800/400',
            features: ['Live Projects', 'Cloud Credits', 'Certification']
        },
        {
            title: 'AI/ML Fundamentals',
            icon: <Brain className="w-8 h-8" />,
            description: 'Learn AI/ML concepts, build models, and deploy intelligent applications.',
            price: 699,
            category: 'ai',
            students: 1789,
            rating: 4.7,
            duration: '14 weeks',
            image: '/api/placeholder/800/400',
            features: ['GPU Access', 'Datasets', 'ML Models']
        },
        {
            title: 'Full Stack Development',
            icon: <Code className="w-8 h-8" />,
            description: 'End-to-end development with React, Node.js, and databases.',
            price: 799,
            category: 'development',
            students: 3421,
            rating: 4.9,
            duration: '16 weeks',
            image: '/api/placeholder/800/400',
            features: ['Code Reviews', 'Portfolio', 'Mentorship']
        }
    ];

    const addToCart = (course) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.title === course.title);
            if (existingItem) {
                return prevCart.map((item) =>
                    item.title === course.title ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...course, quantity: 1 }];
        });
    };

    const addToWishlist = (course) => {
        if (!wishlist.some((item) => item.title === course.title)) {
            setWishlist([...wishlist, course]);
        }
    };

    const isInWishlist = (courseTitle) => wishlist.some(item => item.title === courseTitle);

    const filteredCourses = courses.filter(course =>
        (activeTab === 'all' || course.category === activeTab) &&
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

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <Navigation
                cart={cart}
                wishlist={wishlist}
                setIsCartOpen={setIsCartOpen}
                setIsWishlistOpen={setIsWishlistOpen}
            />

            <div className="max-w-7xl mx-auto px-4 py-16">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                        Explore Our Courses
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
                        Level up your skills with our industry-leading courses taught by expert instructors
                    </p>
                </div>

                {/* Search and Filter Section */}
                <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search courses..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        />
                    </div>

                    <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setActiveTab(category.id)}
                                className={`px-6 py-3 rounded-xl font-medium whitespace-nowrap transition-all ${activeTab === category.id
                                        ? 'bg-blue-600 text-white shadow-lg'
                                        : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700'
                                    }`}
                            >
                                {category.label}
                            </button>
                        ))}
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
                            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
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
                                    onClick={() => addToWishlist(course)}
                                    className="absolute top-4 right-4 p-2 bg-white/90 rounded-full shadow-lg backdrop-blur-sm"
                                >
                                    <Heart className={`w-5 h-5 ${isInWishlist(course.title) ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
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

                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{course.title}</h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                                    {course.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {course.features.map((feature, index) => (
                                        <span
                                            key={index}
                                            className="text-xs px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full"
                                        >
                                            {feature}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between mb-4 text-sm">
                                    <div className="flex items-center space-x-1">
                                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                                        <span className="font-medium">{course.rating}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <Users className="w-5 h-5 text-gray-400" />
                                        <span>{course.students.toLocaleString()}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <Clock className="w-5 h-5 text-gray-400" />
                                        <span>{course.duration}</span>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center">
                                    <div className="flex flex-col">
                                        <span className="text-sm text-gray-500 dark:text-gray-400">Price</span>
                                        <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                            ${course.price}
                                        </span>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => addToCart(course)}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center space-x-2 shadow-lg"
                                    >
                                        <span>Enroll Now</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {isWishlistOpen && <Wishlist wishlist={wishlist} setWishlist={setWishlist} setIsWishlistOpen={setIsWishlistOpen} />}
            {isCartOpen && <Cart cart={cart} setCart={setCart} setIsCartOpen={setIsCartOpen} />}
        </div>
    );
};

export default Courses;