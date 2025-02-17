import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search, Star, Clock, Users, Sparkles, Heart, ShoppingCart, ChevronDown,
    ChevronRight, Tag, TrendingUp, Award, BookOpen, Filter, X, Shield,
    Zap, Gift, Briefcase, Code, Database, ChartBar, BookType,
    GraduationCap, Layout
} from 'lucide-react';
import { useWishlist } from '../Context/WishlistContext';
import Courses from '../Components/Courses';


const PlacementTrainingShop = () => {
    const [cartItems, setCartItems] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const {wishlist, addToWishlist} = useWishlist();

    const [announcement, setAnnouncement] = useState('');
    useEffect(() => {
        if (announcement) {
            const timeout = setTimeout(() => setAnnouncement(''), 1000);
            return () => clearTimeout(timeout);
        }
    }, [announcement]);


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

    // const courses = [
    //     {
    //         id: 1,
    //         title: "Placement Readiness Program",
    //         category: "placement",
    //         originalPrice: 1999,
    //         price: 999,
    //         duration: "16 weeks",
    //         rating: 4.9,
    //         reviews: 1850,
    //         students: 7250,
    //         image: "/api/placeholder/400/225",
    //         description: "Complete placement preparation with job guarantee",
    //         level: "All Levels",
    //         instructor: {
    //             name: "Career Expert Team",
    //             title: "Industry Professionals",
    //             image: "/api/placeholder/64/64"
    //         },
    //         tags: ["Job Guarantee", "Live Classes"],
    //         features: [
    //             "Technical Interview Prep",
    //             "Aptitude Training",
    //             "Soft Skills Development",
    //             "Resume Building",
    //             "Mock Interviews"
    //         ]
    //     },
    //     {
    //         id: 2,
    //         title: "SAP FICO Certification",
    //         category: "sap-major",
    //         originalPrice: 1499,
    //         price: 899,
    //         duration: "12 weeks",
    //         rating: 4.8,
    //         reviews: 920,
    //         students: 4800,
    //         image: "/api/placeholder/400/225",
    //         description: "Complete SAP FICO module training",
    //         level: "Professional",
    //         instructor: {
    //             name: "Robert Wilson",
    //             title: "SAP Certified Consultant",
    //             image: "/api/placeholder/64/64"
    //         },
    //         tags: ["Certification", "Industry Ready"],
    //         features: [
    //             "Financial Accounting",
    //             "Controlling",
    //             "Real-time Projects",
    //             "Certification Prep"
    //         ]
    //     },
    //     {
    //         id: 3,
    //         title: "SAP ABAP Programming",
    //         category: "sap-minor",
    //         originalPrice: 799,
    //         price: 499,
    //         duration: "8 weeks",
    //         rating: 4.7,
    //         reviews: 650,
    //         students: 3200,
    //         image: "/api/placeholder/400/225",
    //         description: "Learn SAP ABAP programming from scratch",
    //         level: "Intermediate",
    //         instructor: {
    //             name: "David Chen",
    //             title: "Senior SAP Developer",
    //             image: "/api/placeholder/64/64"
    //         },
    //         tags: ["Hands-on", "Project Based"],
    //         features: [
    //             "ABAP Basics",
    //             "Advanced Programming",
    //             "Integration Skills",
    //             "Real Projects"
    //         ]
    //     }
    // ];


    // Memoized filtered courses
    // const filteredCourses = useMemo(() => {
    //     return courses.filter(course => {
    //         const matchesCategory = activeCategory === 'all' || course.category === activeCategory;
    //         const matchesSearch = searchQuery === '' ||
    //             course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //             course.description.toLowerCase().includes(searchQuery.toLowerCase());
    //         return matchesCategory && matchesSearch;
    //     });
    // }, [activeCategory, searchQuery]);

    const handleWishlist = (course) => {
        
        setAnnouncement(wishlist.includes(course.id)
            ? 'Removed from wishlist'
            : 'Added to wishlist');
        
        addToWishlist(course);
    };



    

    const CategoryCard = ({ category }) => (
        <motion.div
            whileHover={{ y: -5 }}
            className="bg-card rounded-xl p-6 hover:shadow-lg transition-all"
            onClick={() => {
                setActiveCategory(category.id);
                setAnnouncement(`Showing ${category.name} courses`);
            }}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    setActiveCategory(category.id);
                }
            }}
            aria-label={`${category.name} category with ${category.courses} courses`}
        >
            <div className="flex justify-between items-start mb-4">
                <div className="card-theme-gradient p-3 rounded-lg border-contrast">
                    <category.icon className="w-6 h-6 text-white" />
                </div>
                <span className="card-blue text-sm font-medium px-3 py-1 rounded-full">
                    {category.courses} Courses
                </span>
            </div>
            <h3 className="text-xl font-bold text-secondary mb-2">{category.name}</h3>
            <p className="text-secondary text-sm mb-4">{category.description}</p>
            <div className="space-y-2">
                {category.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-secondary text-sm">
                        <ChevronRight className="w-4 h-4 text-blue" />
                        {feature}
                    </div>
                ))}
            </div>
        </motion.div>
    );

    const CourseCard = ({ course }) => (
        <motion.article
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-card rounded-xl overflow-hidden hover:shadow-xl transition-all focus-within:ring-2 focus-within:ring-blue"
            role="article"
            aria-label={`${course.title} course`}

        >
            <div className="relative">
                <img
                    src={course.image}
                    alt={`${course.title} course cover`}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                />
                <button
                    onClick={() => handleWishlist(course)}
                    className="absolute top-4 right-4 p-2 bg-card rounded-full shadow-lg hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-blue"
                    aria-label={`${wishlist.includes(course) ? 'Remove from' : 'Add to'} wishlist`}
                >
                    <Heart
                        className={`w-5 h-5 ${wishlist.includes(course) ? 'text-blue fill-current' : 'text-secondary'}`}
                    />
                </button>
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
                        <p className="text-secondary text-sm">{course.instructor.title}</p>
                    </div>
                </div>

                <div className="space-y-2 mb-4">
                    {course.features.slice(0, 3).map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-secondary text-sm">
                            <ChevronRight className="w-4 h-4 text-blue" />
                            {feature}
                        </div>
                    ))}
                </div>

                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 text-blue" />
                        <span className="text-secondary font-medium">{course.rating}</span>
                        <span className="text-secondary">({course.reviews})</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-blue" />
                        <span className="text-secondary">{course.duration}</span>
                    </div>
                </div>

                <div className="flex items-center gap-3 mb-6">
                    <span className="text-3xl font-bold text-blue">${course.price}</span>
                    <div className="flex flex-col">
                        <span className="text-secondary line-through">${course.originalPrice}</span>
                        <span className="card-green text-sm px-2 rounded">
                            Save ${course.originalPrice - course.price}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 p-6">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="card-theme-gradient border-contrast text-white py-3 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-blue"
                        onClick={() => {
                            setAnnouncement(`Enrolling in ${course.title}`);
                            // Enrollment logic here
                        }}
                    
                    >
                        Enroll Now
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-secondary/10 text-secondary py-3 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-blue"
                        onClick={() => {
                            setAnnouncement(`Viewing details for ${course.title}`);
                            // Show details logic here
                        }}
                    >
                        Course Details
                    </motion.button>
                </div>
            </div>
        </motion.article>
    );

    return (
        <div className="bg-primary min-h-screen mt-20">
            <div className="container mx-auto max-w-7xl px-4 py-12">
                {/* Accessibility announcer */}
                <div
                    role="status"
                    aria-live="polite"
                    className="sr-only"
                >
                    {announcement}
                </div>

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
                    <p className="text-xl text-secondary mb-8 max-w-2xl mx-auto">
                        Comprehensive SAP training and placement programs to accelerate your career growth
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto relative">
                        <label htmlFor="search" className="sr-only">
                            Search courses
                        </label>
                        <input
                            id="search"
                            type="search"
                            placeholder="Search for SAP courses and placement programs..."
                            className="w-full bg-card text-secondary px-6 py-4 rounded-xl pl-12 focus:outline-none focus:ring-2 focus:ring-blue"
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setAnnouncement(`Searching for ${e.target.value}`);
                            }}
                        />
                        <Search
                            className="w-5 h-5 text-secondary absolute left-4 top-1/2 transform -translate-y-1/2"
                            aria-hidden="true"
                        />
                    </div>
                </div>

                {/* Categories Grid */}
                <section
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
                    aria-label="Course categories"
                >
                    {categories.map(category => (
                        <CategoryCard key={category.id} category={category} />
                    ))}
                </section>

                {/* Courses Section */}
                {/* <section aria-label="Available courses">
                    <div className="mb-8 flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-secondary">
                            {activeCategory === 'all' ? 'Featured Courses' :
                                categories.find(c => c.id === activeCategory)?.name}
                        </h2>
                        {activeCategory !== 'all' && (
                            <button
                                onClick={() => {
                                    setActiveCategory('all');
                                    setAnnouncement('Showing all courses');
                                }}
                                className="text-blue hover:underline flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-blue rounded-lg px-2 py-1"
                            >
                                View All
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        )}
                    </div> */}

                    {/* Courses Grid */}
                    {/* <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        role="list"
                        aria-label="Course list"
                    >
                        <AnimatePresence>
                            {filteredCourses.map(course => (
                                <CourseCard key={course.id} course={course} />
                            ))}
                        </AnimatePresence>
                    </div>

                    {filteredCourses.length === 0 && (
                        <p className="text-center text-secondary/70 py-8">
                            No courses found. Try adjusting your search or filters.
                        </p>
                    )} */}
                {/* </section> */}

                <Courses category={activeCategory}/>
            </div>
        </div>
    );
};

export default PlacementTrainingShop;