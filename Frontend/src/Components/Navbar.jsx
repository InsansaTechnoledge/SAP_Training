import React, { useState, useEffect } from 'react';
import {
    ShoppingCart, Heart, GraduationCap, Search, Menu, X, ChevronRight, User, LogIn, 
    UserPlus, ChevronDown, Settings, LogOut, Sun, Moon, UsersRound, Bell, Calendar,
    Award, BookOpen, Flag, Zap, Clock, Check
} from 'lucide-react';
import SearchOverlay from './SearchOverlay';
import { useCart } from '../Context/CartContext';
import { useWishlist } from '../Context/WishlistContext';
import Wishlist from './Wishlist';
import Cart from './Cart';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { useUser } from '../Context/UserContext';
import AuthBanner from './AuthComponent';
import AuthForm from './AuthForm';


const Navigation = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    // const [user &&, setuser] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState();
    const [isMobileView, setIsMobileView] = useState(false);
    const { cart, setIsCartOpen, isCartOpen } = useCart()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { wishlist, setIsWishlistOpen, isWishlistOpen } = useWishlist();
    const location = useLocation();
    const { user, setUser } = useUser();
    const [activeTab, setActiveTab] = useState('login');
    const [fixedNavbarIn, setFixedNavbarIn] = useState(['/video', '/quiz', '/dashboard', '/shop', '/game','/events']);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    
    // New notification-related states
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);

    const navigate = useNavigate();

    // Sample notifications data - replace with API call in production
    useEffect(() => {
        if (user) {
            // This would be an API call in production
            const mockNotifications = [
                {
                    id: 1,
                    type: 'event',
                    title: 'Upcoming Hackathon',
                    message: 'Join our 24-hour coding challenge this weekend!',
                    timestamp: '2025-03-18T14:30:00Z',
                    read: false,
                    icon: 'zap'
                },
                {
                    id: 2,
                    type: 'course',
                    title: 'New Course Available',
                    message: 'Advanced React Patterns course is now available',
                    timestamp: '2025-03-17T09:15:00Z',
                    read: false,
                    icon: 'book'
                },
                {
                    id: 3,
                    type: 'quiz',
                    title: '1v1 Quiz Challenge',
                    message: 'You have a quiz challenge in 2 hours',
                    timestamp: '2025-03-16T17:45:00Z',
                    read: true,
                    icon: 'calendar'
                },
                {
                    id: 4,
                    type: 'achievement',
                    title: 'Badge Unlocked',
                    message: 'Congratulations! You earned the JavaScript Guru badge',
                    timestamp: '2025-03-15T12:10:00Z',
                    read: true,
                    icon: 'award'
                },
                {
                    id: 5,
                    type: 'course',
                    title: 'Course Completed',
                    message: 'You completed Data Structures & Algorithms course',
                    timestamp: '2025-03-14T15:20:00Z',
                    read: true,
                    icon: 'check'
                }
            ];
            
            setNotifications(mockNotifications);
            setUnreadCount(mockNotifications.filter(notif => !notif.read).length);
        }
    }, [user]);

    const handleScroll = () => {
        const isScrolled = window.scrollY > 50;
        setScrolled(isScrolled);
    };

    useEffect(() => {
        if (user) {
            setFixedNavbarIn([
                ...fixedNavbarIn,
                '/'
            ])
        }
        else {
            // alert("JU");
            setFixedNavbarIn(fixedNavbarIn.filter(nav => nav !== '/'));
        }
    }, [user])

    useEffect(() => {
        document.documentElement.classList.remove('dark');
        isDarkMode ? document.documentElement.classList.add('dark') : document.documentElement.classList.remove('dark');
    }, [isDarkMode]);

    useEffect(() => {
        // Dark mode setup
        const dark = localStorage.getItem('darkTheme');
        // dark === 'true' ? document.documentElement.classList.add('dark') : document.documentElement.classList.remove('dark');
        setIsDarkMode(dark == 'true');

        // Check if mobile view
        const checkMobileView = () => {
            setIsMobileView(window.innerWidth < 768);
        };

        // Initial check
        checkMobileView();

        // Add resize listener
        window.addEventListener('resize', checkMobileView);
        return () => window.removeEventListener('resize', checkMobileView);
    }, [user]);

    useEffect(() => {


        if (!fixedNavbarIn.includes(location.pathname)) {
            setScrolled(false);
            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
        } else {
            setScrolled(true);
        }
    }, [location, user, fixedNavbarIn]);

    useEffect(() => {
        if (isMenuOpen || isSearchOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMenuOpen, isSearchOpen]);

    // Close user menu and notifications when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isUserMenuOpen && !event.target.closest('.user-menu')) {
                setIsUserMenuOpen(false);
            }
            if (isNotificationsOpen && !event.target.closest('.notifications-menu')) {
                setIsNotificationsOpen(false);
            }
            if (showLogoutConfirm && !event.target.closest('.logout-confirm')) {
                setShowLogoutConfirm(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isUserMenuOpen, isNotificationsOpen, showLogoutConfirm]);

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Searching for:', searchQuery);
        setIsSearchOpen(false);
        setSearchQuery('');
    };

    const handleLogin = () => {
        // setuser &&(true);
        setActiveTab('login');
        setIsModalOpen(true);
        setIsUserMenuOpen(false);
        setIsMenuOpen(false); // Close mobile menu after login
    };

    const handleSignup = () => {
        // setuser &&(true);
        setActiveTab('signup');
        setIsModalOpen(true);
        setIsUserMenuOpen(false);
        setIsMenuOpen(false); // Close mobile menu after login
    };

    const confirmLogout = () => {
        setShowLogoutConfirm(true);
        // We don't close the user menu yet so the confirmation stays in context
    };

    const handleLogout = async () => {
        // setuser &&(false);
        setIsUserMenuOpen(false);
        setIsMenuOpen(false); // Close mobile menu after logout
        setShowLogoutConfirm(false);

        try {

            const response = await axios.get(`${API_BASE_URL}/api/v1/auth/logout`, {
                withCredentials: true
            });

            if (response.status === 200) {
                console.log(response.data.message);
                setUser(null);
            }
        }
        catch (err) {
            console.log(err);
            alert(err.response.data.message);
        }
    };

    const cancelLogout = () => {
        setShowLogoutConfirm(false);
    };

    const toggleTheme = () => {
        localStorage.setItem('darkTheme', !isDarkMode);
        setIsDarkMode(!isDarkMode);
        document.documentElement.classList.toggle('dark');
    };

    // Function to handle mobile menu item clicks
    const handleMobileMenuItemClick = (action) => {
        setIsMenuOpen(false);

        if (action === 'search') {
            setIsSearchOpen(true);
        } else if (action === 'cart') {
            setIsCartOpen(true);
        } else if (action === 'wishlist') {
            setIsWishlistOpen(true);
        } else if (action === 'notifications') {
            setIsNotificationsOpen(true);
        }
    };

    // Function to mark notification as read
    const markAsRead = (id) => {
        setNotifications(prev => 
            prev.map(notif => 
                notif.id === id ? {...notif, read: true} : notif
            )
        );
        setUnreadCount(prev => Math.max(0, prev - 1));
    };

    // Function to mark all notifications as read
    const markAllAsRead = () => {
        setNotifications(prev => 
            prev.map(notif => ({...notif, read: true}))
        );
        setUnreadCount(0);
    };

    // Function to get icon component based on notification type
    const getNotificationIcon = (iconName) => {
        switch(iconName) {
            case 'calendar': return <Calendar className="w-5 h-5" />;
            case 'award': return <Award className="w-5 h-5" />;
            case 'book': return <BookOpen className="w-5 h-5" />;
            case 'flag': return <Flag className="w-5 h-5" />;
            case 'zap': return <Zap className="w-5 h-5" />;
            case 'clock': return <Clock className="w-5 h-5" />;
            case 'check': return <Check className="w-5 h-5" />;
            default: return <Bell className="w-5 h-5" />;
        }
    };

    // Function to format timestamp to relative time
    const formatRelativeTime = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
        
        if (diffInHours < 1) {
            const diffInMinutes = Math.floor((now - date) / (1000 * 60));
            return `${diffInMinutes} minutes ago`;
        } else if (diffInHours < 24) {
            return `${diffInHours} hours ago`;
        } else {
            const diffInDays = Math.floor(diffInHours / 24);
            return `${diffInDays} days ago`;
        }
    };

    return (
        <>
            {
                isModalOpen
                    ?
                    <AuthForm activeTab={activeTab} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
                    :
                    null
            }
            <nav className={`fixed top-0 left-0 right-0 transition-all duration-300 z-40 
                ${scrolled
                    ? 'nav-theme-gradient shadow-lg'
                    : 'bg-transparent'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
                    <div className="flex justify-between items-center">
                        {/* Logo Section - Simplified for mobile */}
                        <div className="flex items-center space-x-2 sm:space-x-3 group cursor-pointer">
                            <div className={`p-1.5 sm:p-2 rounded-lg transform transition-all duration-300 
                                ${scrolled
                                    ? isDarkMode
                                        ? 'bg-gray-700'
                                        : 'bg-blue-50'
                                    : 'bg-white/10'} 
                                group-hover:rotate-12`}>
                                <GraduationCap className={`w-6 h-6 sm:w-8 sm:h-8 
                                    ${scrolled
                                        ? isDarkMode
                                            ? 'text-gray-100'
                                            : 'text-blue-800'
                                        : 'text-white'}`} />
                            </div>
                            <div className="flex flex-col">

                                <span
                                    onClick={() => navigate("/")}
                                    className="text-xl sm:text-2xl font-bold text-white cursor-pointer">
                                    Attainment
                                </span>


                                <span className={`text-xs transition-colors duration-300 ${scrolled ? 'text-blue-100' : 'text-white/90'
                                    }`}>
                                    Learn. Grow. Excel.
                                </span>
                            </div>
                        </div>

                        {/* Navigation Links - Desktop Only */}
                        <div className="hidden md:flex items-center space-x-8">
                            <a href="#" className="text-white hover:text-blue-50 transition-colors">Courses</a>
                            <a href="#" className="text-white hover:text-blue-50 transition-colors">Resources</a>
                            <a href="#" className="text-white hover:text-blue-50 transition-colors">Pricing</a>
                            <button onClick={() => navigate('/events')} className="text-white hover:text-blue-50 transition-colors">Events</button>
                        </div>

                        {/* Actions Section - Simplified for Mobile */}
                        <div className="flex items-center space-x-2 sm:space-x-4 md:space-x-6">
                            {/* Theme Toggle - Show on all devices */}
                            <button
                                onClick={toggleTheme}
                                className={`relative p-2 rounded-full transition-all duration-300 
                                    ${scrolled
                                        ? isDarkMode
                                            ? 'bg-gray-700 hover:bg-gray-600'
                                            : 'bg-blue-800 hover:bg-blue-700'
                                        : 'bg-white/10 hover:bg-white/20'
                                    } overflow-hidden`}
                                aria-label="Toggle theme"
                            >
                                <div className={`transform transition-all duration-500 ${isDarkMode ? '-rotate-180' : 'rotate-0'}`}>
                                    {isDarkMode ? (
                                        <Moon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-100" />
                                    ) : (
                                        <Sun className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-200" />
                                    )}
                                </div>
                                <div className={`absolute inset-0 rounded-full transition-opacity duration-300 
                                    ${isDarkMode ? 'opacity-0' : 'opacity-100'} 
                                    bg-gradient-to-tr from-yellow-300/20 to-yellow-200/5`} />
                            </button>

                            {/* Search Button - Desktop Only */}
                            <button
                                onClick={() => setIsSearchOpen(true)}
                                className={`hidden md:flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${scrolled
                                    ? 'bg-blue-800 hover:bg-blue-700'
                                    : 'bg-white/10 hover:bg-white/20'
                                    }`}
                            >
                                <Search className="w-4 h-4 text-white" />
                                <span className="text-sm text-white">Search</span>
                            </button>

                            {/* Notification Bell - Show only when logged in */}
                            {user && (
                                <div className="relative notifications-menu">
                                    <button
                                        onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                                        className="relative group"
                                        aria-label="Open notifications"
                                    >
                                        <div className={`p-1.5 sm:p-2 rounded-full transition-all duration-300 ${scrolled
                                            ? 'bg-blue-800 hover:bg-blue-700'
                                            : 'bg-white/10 hover:bg-white/20'
                                            }`}>
                                            <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:scale-110 transform transition-transform" />
                                        </div>
                                        {unreadCount > 0 && (
                                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center rounded-full border-2 border-blue-900">
                                                {unreadCount}
                                            </span>
                                        )}
                                    </button>

                                    {/* Notification Dropdown */}
                                    {isNotificationsOpen && (
                                        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl overflow-hidden z-50">
                                            <div className="p-4 bg-blue-50 border-b border-blue-100 flex justify-between items-center">
                                                <h3 className="text-sm font-medium text-blue-900">Notifications for {user.name}</h3>
                                                {unreadCount > 0 && (
                                                    <button 
                                                        onClick={markAllAsRead}
                                                        className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                                                    >
                                                        Mark all as read
                                                    </button>
                                                )}
                                            </div>
                                            
                                            <div className="max-h-80 overflow-y-auto">
                                                {notifications.length > 0 ? (
                                                    <>
                                                        {notifications.map((notif) => (
                                                            <div 
                                                                key={notif.id}
                                                                onClick={() => markAsRead(notif.id)}
                                                                className={`p-4 border-b border-gray-100 flex items-start space-x-3 cursor-pointer hover:bg-blue-50 transition-colors ${!notif.read ? 'bg-blue-50/50' : ''}`}
                                                            >
                                                                <div className={`shrink-0 p-2 rounded-full ${
                                                                    notif.type === 'event' ? 'bg-purple-100 text-purple-600' :
                                                                    notif.type === 'course' ? 'bg-blue-100 text-blue-600' :
                                                                    notif.type === 'quiz' ? 'bg-amber-100 text-amber-600' :
                                                                    'bg-green-100 text-green-600'
                                                                }`}>
                                                                    {getNotificationIcon(notif.icon)}
                                                                </div>
                                                                <div className="flex-1 min-w-0">
                                                                    <div className="flex justify-between">
                                                                        <p className="font-medium text-gray-900">{notif.title}</p>
                                                                        {!notif.read && (
                                                                            <span className="h-2 w-2 bg-blue-600 rounded-full"></span>
                                                                        )}
                                                                    </div>
                                                                    <p className="text-sm text-gray-600 mt-1">{notif.message}</p>
                                                                    <p className="text-xs text-gray-500 mt-1">{formatRelativeTime(notif.timestamp)}</p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </>
                                                ) : (
                                                    <div className="py-8 px-4 text-center">
                                                        <p className="text-gray-500">No notifications yet</p>
                                                    </div>
                                                )}
                                            </div>
                                            
                                            <div className="p-3 border-t border-gray-100 text-center">
                                                <button 
                                                    onClick={() => navigate('/notifications')}
                                                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                                                >
                                                    View all notifications
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Wishlist Button - Show on all devices but compact on mobile */}
                            <button
                                className="relative group"
                                onClick={() => setIsWishlistOpen(true)}
                            >
                                <div className={`p-1.5 sm:p-2 rounded-full transition-all duration-300 ${scrolled
                                    ? 'bg-blue-800 hover:bg-blue-700'
                                    : 'bg-white/10 hover:bg-white/20'
                                    }`}>
                                    <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:scale-110 transform transition-transform" />
                                </div>
                                {wishlist.length > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center rounded-full border-2 border-blue-900">
                                        {wishlist.length}
                                    </span>
                                )}
                            </button>

                            {/* Cart Button - Show on all devices but compact on mobile */}
                            <button
                                className="relative group"
                                onClick={() => setIsCartOpen(true)}
                            >
                                <div className={`p-1.5 sm:p-2 rounded-full transition-all duration-300 ${scrolled
                                    ? 'bg-blue-800 hover:bg-blue-700'
                                    : 'bg-white/10 hover:bg-white/20'
                                    }`}>
                                    <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:scale-110 transform transition-transform" />
                                </div>
                                {cart.length > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center rounded-full border-2 border-blue-900">
                                        {cart.reduce((total, item) => total + item.quantity, 0)}
                                    </span>
                                )}
                            </button>

                            {/* User Menu - Desktop Only - IMPROVED */}
                            <div className="relative user-menu hidden md:block">
                                <button
                                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                    className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${scrolled
                                        ? 'bg-blue-800 hover:bg-blue-700'
                                        : 'bg-white/10 hover:bg-white/20'
                                        }`}
                                >
                                    {user ? (
                                        <>
                                            <div className="flex items-center space-x-2">
                                                <div className="w-6 h-6 bg-blue-400 text-white rounded-full flex items-center justify-center overflow-hidden">
                                                    {user.profileImage ? (
                                                        <img 
                                                            src={user.profileImage} 
                                                            alt={user.name || "User"} 
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <User className="w-4 h-4" />
                                                    )}
                                                </div>
                                                <span className="text-sm text-white max-w-[100px] truncate">{user.name || "User"}</span>
                                                <ChevronDown className="w-4 h-4 text-white" />
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <LogIn className="w-5 h-5 text-white" />
                                            <span className="text-sm text-white">Login</span>
                                        </>
                                    )}
                                </button>

                                {/* User Dropdown Menu - Desktop - IMPROVED */}
                                {isUserMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl overflow-hidden z-50">
                                        {user ? (
                                            <>
                                                {/* User info panel */}
                                                <div className="p-4 bg-blue-50 border-b border-blue-100">
                                                    <div className="flex items-center space-x-3">
                                                        <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center overflow-hidden">
                                                            {user.profileImage ? (
                                                                <img 
                                                                    src={user.profileImage} 
                                                                    alt={user.name || "User"} 
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            ) : (
                                                                <User className="w-6 h-6" />
                                                            )}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="font-medium text-blue-900 truncate">{user.name || "User"}</p>
                                                            <p className="text-xs text-blue-500 truncate">{user.email || "user@example.com"}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <a href="#profile" className="flex items-center px-4 py-3 text-blue-900 hover:bg-blue-50">
                                                    <User className="w-4 h-4 mr-3 text-blue-700" />
                                                    Profile
                                                </a>
                                                <a href="#settings" className="flex items-center px-4 py-3 text-blue-900 hover:bg-blue-50">
                                                    <Settings className="w-4 h-4 mr-3 text-blue-700" />
                                                    Settings
                                                </a>
                                                <a href="#community" className="flex items-center px-4 py-3 text-blue-900 hover:bg-blue-50">
                                                    <UsersRound className="w-4 h-4 mr-3 text-blue-700" />
                                                    Community
                                                </a>
                                                <hr className="my-1 border-blue-100" />
                                                <button
                                                    onClick={confirmLogout}
                                                    className="flex items-center w-full px-4 py-3 text-red-700 hover:bg-red-50"
                                                >
                                                    <LogOut className="w-4 h-4 mr-3" />
                                                    Logout
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <div className="p-4 bg-blue-50 border-b border-blue-100">
                                                    <h3 className="text-lg font-medium text-blue-900">Welcome!</h3>
                                                    <p className="text-xs text-blue-700 mt-1">Sign in to access your account</p>
                                                </div>
                                                <button
                                                    onClick={handleLogin}
                                                    className="flex items-center w-full px-4 py-3 text-blue-900 hover:bg-blue-50"
                                                >
                                                    <LogIn className="w-4 h-4 mr-3 text-blue-700" />
                                                    Login
                                                </button>
                                                <button
                                                    onClick={handleSignup}
                                                    className="flex items-center px-4 py-2 text-blue-900 hover:bg-blue-50">
                                                    <UserPlus className="w-4 h-4 mr-2" />
                                                    Sign Up
                                                </button>
                                            </>
                                        )}
                                    </div>
                                )}
                                
                                {/* Logout Confirmation Overlay */}
                                {showLogoutConfirm && (
                                    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 logout-confirm">
                                        <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm mx-4 w-full">
                                            <h3 className="text-lg font-medium text-blue-900 mb-2">Confirm Logout</h3>
                                            <p className="text-gray-600 mb-4">Are you sure you want to log out of your account?</p>
                                            <div className="flex space-x-3 justify-end">
                                                <button
                                                    onClick={cancelLogout}
                                                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    onClick={handleLogout}
                                                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                                                >
                                                    Yes, Logout
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setIsMenuOpen(true)}
                                className={`md:hidden p-1.5 sm:p-2 rounded-full transition-all duration-300 ${scrolled
                                    ? 'bg-blue-800 hover:bg-blue-700'
                                    : 'bg-white/10 hover:bg-white/20'
                                    }`}
                            >
                                <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Search Overlay */}
            <SearchOverlay
                isOpen={isSearchOpen}
                onClose={() => setIsSearchOpen(false)}
                onSearch={(query) => handleSearch(query)}
            />

            {/* Mobile Menu Overlay - Enhanced for better mobile UX */}
            {isMenuOpen && (
                <div className="fixed inset-0 bg-blue-950/70 backdrop-blur-sm z-50 md:hidden transition-all duration-300">
                    <div className="fixed inset-y-0 right-0 w-4/5 max-w-xs bg-white shadow-xl transform transition-transform duration-300">
                        <div className="p-4 flex justify-between items-center border-b border-blue-100">
                            <div className="flex items-center space-x-2">
                                <GraduationCap className="w-6 h-6 text-blue-700" />
                                <h2 className="text-lg font-semibold text-blue-900">Attainment</h2>
                            </div>
                            <button
                                onClick={() => setIsMenuOpen(false)}
                                className="p-2 hover:bg-blue-50 rounded-full"
                            >
                                <X className="w-6 h-6 text-blue-500" />
                            </button>
                        </div>

                        {/* User Section in Mobile Menu */}
                        <div className="p-4 border-b border-blue-100">
                            {user ? (
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <div className="p-2 bg-blue-100 rounded-full overflow-hidden">
                                            {user.profileImage ? (
                                                <img 
                                                    src={user.profileImage} 
                                                    alt={user.name || "User"} 
                                                    className="w-6 h-6 object-cover"
                                                />
                                            ) : (
                                                <User className="w-6 h-6 text-blue-700" />
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-medium text-blue-900">{user.name || "User Name"}</p>
                                            <p className="text-xs text-blue-500">{user.email || "user@example.com"}</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <a href="#profile" className="flex items-center justify-center p-2 bg-blue-50 rounded-lg text-blue-700 text-sm">
                                            <User className="w-4 h-4 mr-1" />
                                            Profile
                                        </a>
                                        <a href="#settings" className="flex items-center justify-center p-2 bg-blue-50 rounded-lg text-blue-700 text-sm">
                                            <Settings className="w-4 h-4 mr-1" />
                                            Settings
                                        </a>
                                    </div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 gap-2">
                                    <button
                                        onClick={handleLogin}
                                        className="flex items-center justify-center p-3 bg-blue-600 rounded-lg text-white text-sm font-medium"
                                    >
                                        <LogIn className="w-4 h-4 mr-1" />
                                        Login
                                    </button>
                                    <button 
                                        onClick={handleSignup}
                                        className="flex items-center justify-center p-3 bg-blue-100 rounded-lg text-blue-700 text-sm font-medium">
                                        <UserPlus className="w-4 h-4 mr-1" />
                                        Sign Up
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Quick Actions in Mobile Menu */}
                        <div className="p-4 border-b border-blue-100">
                            <p className="text-sm text-blue-400 mb-3">Quick Actions</p>
                            <div className="grid grid-cols-3 gap-2">
                                <button
                                    onClick={() => handleMobileMenuItemClick('search')}
                                    className="flex flex-col items-center justify-center p-3 bg-blue-50 rounded-lg"
                                >
                                    <Search className="w-5 h-5 text-blue-700 mb-1" />
                                    <span className="text-xs text-blue-700">Search</span>
                                </button>
                                <button
                                    onClick={() => handleMobileMenuItemClick('wishlist')}
                                    className="flex flex-col items-center justify-center p-3 bg-blue-50 rounded-lg relative"
                                >
                                    <Heart className="w-5 h-5 text-blue-700 mb-1" />
                                    <span className="text-xs text-blue-700">Wishlist</span>
                                    {wishlist.length > 0 && (
                                        <span className="absolute top-1 right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                                            {wishlist.length}
                                        </span>
                                    )}
                                </button>
                                <button
                                    onClick={() => handleMobileMenuItemClick('cart')}
                                    className="flex flex-col items-center justify-center p-3 bg-blue-50 rounded-lg relative"
                                >
                                    <ShoppingCart className="w-5 h-5 text-blue-700 mb-1" />
                                    <span className="text-xs text-blue-700">Cart</span>
                                    {cart.length > 0 && (
                                        <span className="absolute top-1 right-1 bg-emerald-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                                            {cart.reduce((total, item) => total + item.quantity, 0)}
                                        </span>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Main Menu Navigation */}
                        <nav className="p-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 300px)' }}>
                            <p className="text-sm text-blue-400 mb-3">Main Menu</p>
                            <ul className="space-y-2">
                                {['Courses', 'Resources', 'Pricing', 'Community', 'About Us', 'Contact'].map((item) => (
                                    <li key={item}>
                                        <a
                                            href="#"
                                            className="flex items-center justify-between p-3 hover:bg-blue-50 rounded-lg group transition-colors"
                                        >
                                            <span className="text-blue-900">{item}</span>
                                            <ChevronRight className="w-5 h-5 text-blue-400 group-hover:text-blue-700 transition-colors" />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        {/* Bottom actions */}
                        {user && (
                            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-blue-100 bg-white">
                                <button
                                    onClick={confirmLogout}
                                    className="flex items-center justify-center w-full p-3 bg-red-50 rounded-lg text-red-700"
                                >
                                    <LogOut className="w-4 h-4 mr-2" />
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Close area (clicking outside the menu) */}
                    <div
                        className="absolute inset-0 z-[-1]"
                        onClick={() => setIsMenuOpen(false)}
                    />
                </div>
            )}

            {/* Mobile Logout Confirmation */}
            {showLogoutConfirm && isMenuOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] logout-confirm">
                    <div className="bg-white rounded-lg shadow-xl p-6 mx-4 w-11/12 max-w-sm">
                        <h3 className="text-lg font-medium text-blue-900 mb-2">Confirm Logout</h3>
                        <p className="text-gray-600 mb-4">Are you sure you want to log out of your account?</p>
                        <div className="flex space-x-3 justify-end">
                            <button
                                onClick={cancelLogout}
                                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleLogout}
                                    className="flex items-center justify-center w-full p-3 bg-red-50 rounded-lg text-red-700"
                                >
                                    <LogOut className="w-4 h-4 mr-2" />
                                    Logout
                                </button>
                            </div>

                    </div>

                    {/* Close area (clicking outside the menu) */}
                    <div
                        className="absolute inset-0 z-[-1]"
                        onClick={() => setIsMenuOpen(false)}
                    />
                </div>
            )}

            {isWishlistOpen && <Wishlist />}
            {isCartOpen && <Cart />}
        </>
    );
};

export default Navigation;