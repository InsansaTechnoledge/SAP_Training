import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import {
    Cloud, Code, Database, Brain, ShoppingCart, Heart, Star,
    Users, Clock, ArrowRight, GraduationCap, Search, Filter,
    BookOpen, Activity
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Context/CartContext';
import { useWishlist } from '../Context/WishlistContext';
import AIimage from '../assets/AI.jpg';
import CCimage from '../assets/CC.jpg';
import FSDimage from '../assets/FSD.jpg';
import ABAPimage from '../assets/ABAP.jpg';




const Courses = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [hoveredCourse, setHoveredCourse] = useState(null);
    const { addToCart } = useCart();
    const { wishlist, addToWishlist } = useWishlist();
    const navigate = useNavigate();

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
            image: ABAPimage,
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
            image: CCimage,
            features: ['Live Projects', 'Cloud Credits', 'Certification']
        },
        {
            title: 'AI Fundamentals',
            icon: <Brain className="w-8 h-8" />,
            description: 'Learn AI/ML concepts, build models, and deploy intelligent applications.',
            price: 699,
            category: 'ai',
            students: 1789,
            rating: 4.7,
            duration: '14 weeks',
            image: AIimage,
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
            image: FSDimage,
            features: ['Code Reviews', 'Portfolio', 'Mentorship']
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
        <div className="relative min-h-screen bg-theme-gradient">

            <div className="max-w-7xl mx-auto px-4 py-16">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                        Explore Our Courses
                    </h1>
                    <p className="text-primary text-lg max-w-2xl mx-auto">
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
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-secondary text-secondary focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        />
                    </div>

                    <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setActiveTab(category.id)}
                                className={`px-6 py-3 rounded-xl font-medium whitespace-nowrap transition-all ${activeTab === category.id
                                    ? 'bg-theme text-contrast shadow-lg'
                                    : 'bg-secondary text-secondary hover:bg-blue-50 dark:hover:bg-gray-700'
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
                            className="bg-secondary rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
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
                                    className="absolute top-4 right-4 p-2 bg-transparent"
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

                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2 text-secondary">{course.title}</h3>
                                <p className="text-secondary text-sm mb-4">
                                    {course.description}
                                </p>

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
                                                ${course.price}
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
                                            onClick={() => {navigate('/course')}}
                                        >
                                            <span>Explore for Free</span>
                                            <BookOpen className="w-4 h-4" />
                                        </motion.div>

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