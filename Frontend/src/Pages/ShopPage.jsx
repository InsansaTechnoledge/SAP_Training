import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Star, Clock, Users, Sparkles, Heart, ShoppingCart, ChevronDown, ChevronRight, Tag, TrendingUp, Award, BookOpen, Filter, X, Shield, Zap, Gift, Briefcase, Code, Database, ChartBar, BookType, GraduationCap, Layout } from 'lucide-react';

const PlacementTrainingShop = () => {
    const [cartItems, setCartItems] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const categories = [
        {
            id: 'placement',
            name: 'Placement Integrated',
            icon: GraduationCap,
            description: 'Complete training with placement assistance',
            courses: 15,
            features: ['Interview Prep', 'Resume Building', 'Mock Tests']
        },
        {
            id: 'sap-major',
            name: 'SAP Major Courses',
            icon: BookType,
            description: 'Core SAP modules certification',
            courses: 8,
            features: ['SAP FICO', 'SAP MM', 'SAP SD']
        },
        {
            id: 'sap-minor',
            name: 'SAP Minor Courses',
            icon: Layout,
            description: 'Specialized SAP modules',
            courses: 12,
            features: ['SAP BASIS', 'SAP ABAP', 'SAP HCM']
        }
    ];

    const courses = [
        {
            id: 1,
            title: "Placement Readiness Program",
            category: "placement",
            originalPrice: 1999,
            price: 999,
            duration: "16 weeks",
            rating: 4.9,
            reviews: 1850,
            students: 7250,
            image: "/api/placeholder/400/225",
            description: "Complete placement preparation with job guarantee",
            level: "All Levels",
            instructor: {
                name: "Career Expert Team",
                title: "Industry Professionals",
                image: "/api/placeholder/64/64"
            },
            tags: ["Job Guarantee", "Live Classes"],
            features: [
                "Technical Interview Prep",
                "Aptitude Training",
                "Soft Skills Development",
                "Resume Building",
                "Mock Interviews"
            ]
        },
        {
            id: 2,
            title: "SAP FICO Certification",
            category: "sap-major",
            originalPrice: 1499,
            price: 899,
            duration: "12 weeks",
            rating: 4.8,
            reviews: 920,
            students: 4800,
            image: "/api/placeholder/400/225",
            description: "Complete SAP FICO module training",
            level: "Professional",
            instructor: {
                name: "Robert Wilson",
                title: "SAP Certified Consultant",
                image: "/api/placeholder/64/64"
            },
            tags: ["Certification", "Industry Ready"],
            features: [
                "Financial Accounting",
                "Controlling",
                "Real-time Projects",
                "Certification Prep"
            ]
        },
        {
            id: 3,
            title: "SAP ABAP Programming",
            category: "sap-minor",
            originalPrice: 799,
            price: 499,
            duration: "8 weeks",
            rating: 4.7,
            reviews: 650,
            students: 3200,
            image: "/api/placeholder/400/225",
            description: "Learn SAP ABAP programming from scratch",
            level: "Intermediate",
            instructor: {
                name: "David Chen",
                title: "Senior SAP Developer",
                image: "/api/placeholder/64/64"
            },
            tags: ["Hands-on", "Project Based"],
            features: [
                "ABAP Basics",
                "Advanced Programming",
                "Integration Skills",
                "Real Projects"
            ]
        }
    ];

    const CategoryCard = ({ category }) => (
        <motion.div
            whileHover={{ y: -5 }}
            className="bg-card rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer"
            onClick={() => setActiveCategory(category.id)}
        >
            <div className="flex justify-between items-start mb-4">
                <div className="card-theme-gradient p-3 rounded-lg">
                    <category.icon className="w-6 h-6 text-primary" />
                </div>
                <span className="card-blue text-sm font-medium px-3 py-1 rounded-full">
                    {category.courses} Courses
                </span>
            </div>
            <h3 className="text-xl font-bold text-secondary mb-2">{category.name}</h3>
            <p className="text-secondary/80 text-sm mb-4">{category.description}</p>
            <div className="space-y-2">
                {category.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-secondary/70 text-sm">
                        <ChevronRight className="w-4 h-4 text-blue" />
                        {feature}
                    </div>
                ))}
            </div>
        </motion.div>
    );

    const CourseCard = ({ course }) => (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-card rounded-xl overflow-hidden hover:shadow-xl transition-all"
        >
            <div className="relative">
                <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 bg-card rounded-full shadow-lg"
                    >
                        <Heart className={`w-5 h-5 ${wishlist.includes(course.id) ? 'text-blue fill-current' : 'text-secondary'}`} />
                    </motion.button>
                </div>
            </div>

            <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                    {course.tags.map(tag => (
                        <span key={tag} className="card-blue text-sm px-3 py-1 rounded-full">
                            {tag}
                        </span>
                    ))}
                </div>

                <h3 className="text-xl font-bold text-secondary mb-3">{course.title}</h3>

                <div className="flex items-center gap-3 mb-4">
                    <img
                        src={course.instructor.image}
                        alt={course.instructor.name}
                        className="w-10 h-10 rounded-full"
                    />
                    <div>
                        <p className="text-secondary font-medium">{course.instructor.name}</p>
                        <p className="text-secondary/70 text-sm">{course.instructor.title}</p>
                    </div>
                </div>

                <div className="space-y-2 mb-4">
                    {course.features.slice(0, 3).map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-secondary/70 text-sm">
                            <ChevronRight className="w-4 h-4 text-blue" />
                            {feature}
                        </div>
                    ))}
                </div>

                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 text-blue" />
                        <span className="text-secondary font-medium">{course.rating}</span>
                        <span className="text-secondary/70">({course.reviews})</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-blue" />
                        <span className="text-secondary">{course.duration}</span>
                    </div>
                </div>

                <div className="flex items-center gap-3 mb-6">
                    <span className="text-3xl font-bold text-blue">${course.price}</span>
                    <div className="flex flex-col">
                        <span className="text-secondary/50 line-through">${course.originalPrice}</span>
                        <span className="card-green text-sm px-2 rounded">
                            Save ${course.originalPrice - course.price}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="card-theme-gradient text-primary py-3 rounded-xl font-medium"
                    >
                        Enroll Now
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-secondary/10 text-secondary py-3 rounded-xl font-medium"
                    >
                        Course Details
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );

    return (
        <div className="bg-primary min-h-screen">
            <div className="container mx-auto max-w-7xl px-4 py-12">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl font-bold text-secondary mb-6"
                    >
                        Master{' '}
                        <span className="text-blue">SAP & Career Skills</span>
                    </motion.h1>
                    <p className="text-xl text-secondary/80 mb-8 max-w-2xl mx-auto">
                        Comprehensive SAP training and placement programs to accelerate your career growth
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto relative">
                        <input
                            type="text"
                            placeholder="Search for SAP courses and placement programs..."
                            className="w-full bg-card text-secondary px-6 py-4 rounded-xl pl-12 focus:outline-none focus:ring-2 focus:ring-blue"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Search className="w-5 h-5 text-secondary/50 absolute left-4 top-1/2 transform -translate-y-1/2" />
                    </div>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    {categories.map(category => (
                        <CategoryCard key={category.id} category={category} />
                    ))}
                </div>

                {/* Courses Section */}
                <div className="mb-8 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-secondary">
                        {activeCategory === 'all' ? 'Featured Courses' :
                            categories.find(c => c.id === activeCategory)?.name}
                    </h2>
                    {activeCategory !== 'all' && (
                        <button
                            onClick={() => setActiveCategory('all')}
                            className="text-blue hover:underline flex items-center gap-1"
                        >
                            View All
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    )}
                </div>

                {/* Courses Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence>
                        {courses
                            .filter(course => activeCategory === 'all' || course.category === activeCategory)
                            .map(course => (
                                <CourseCard key={course.id} course={course} />
                            ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default PlacementTrainingShop;