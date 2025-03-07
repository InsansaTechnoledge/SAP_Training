import React, { useState, useEffect } from 'react';
import {
    ShoppingCart, Heart, GraduationCap, Search, Menu, X, ChevronRight, User, LogIn, UserPlus, ChevronDown, Settings, LogOut, Sun, Moon, UsersRound
} from 'lucide-react';
import SearchOverlay from './SearchOverlay';
import { useCart } from '../Context/CartContext';
import { useWishlist } from '../Context/WishlistContext';
import Wishlist from './Wishlist';
import Cart from './Cart';
import { useLocation, useNavigate } from 'react-router-dom';



const Navigation = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState();
    const [isMobileView, setIsMobileView] = useState(false);

    const { cart, setIsCartOpen, isCartOpen } = useCart()
    const { wishlist, setIsWishlistOpen, isWishlistOpen } = useWishlist();
    const location = useLocation();

    const fixed_navbar_in = ['/video', '/quiz', '/dashboard', '/shop', '/game'];

    const navigate = useNavigate();


    useEffect(() => {
        // Dark mode setup
        const dark = localStorage.getItem('darkTheme');
        dark === 'true' ? document.documentElement.classList.add('dark') : document.documentElement.classList.remove('dark');
        setIsDarkMode(dark === 'true');

        // Check if mobile view
        const checkMobileView = () => {
            setIsMobileView(window.innerWidth < 768);
        };

        // Initial check
        checkMobileView();

        // Add resize listener
        window.addEventListener('resize', checkMobileView);
        return () => window.removeEventListener('resize', checkMobileView);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 50;
            setScrolled(isScrolled);
        };

        if (!fixed_navbar_in.includes(location.pathname)) {
            setScrolled(false);
            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
        } else {
            setScrolled(true);
        }
    }, [location]);

    useEffect(() => {
        if (isMenuOpen || isSearchOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMenuOpen, isSearchOpen]);

    // Close user menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isUserMenuOpen && !event.target.closest('.user-menu')) {
                setIsUserMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isUserMenuOpen]);

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Searching for:', searchQuery);
        setIsSearchOpen(false);
        setSearchQuery('');
    };

    const handleLogin = () => {
        setIsAuthenticated(true);
        setIsUserMenuOpen(false);
        setIsMenuOpen(false); // Close mobile menu after login
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setIsUserMenuOpen(false);
        setIsMenuOpen(false); // Close mobile menu after logout
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
        }
    };

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 transition-all duration-300 z-50 
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

                            {/* User Menu - Desktop Only */}
                            <div className="relative user-menu hidden md:block">
                                <button
                                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                    className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${scrolled
                                        ? 'bg-blue-800 hover:bg-blue-700'
                                        : 'bg-white/10 hover:bg-white/20'
                                        }`}
                                >
                                    {isAuthenticated ? (
                                        <>
                                            <User className="w-5 h-5 text-white" />
                                            <ChevronDown className="w-4 h-4 text-white" />
                                        </>
                                    ) : (
                                        <>
                                            <LogIn className="w-5 h-5 text-white" />
                                            <span className="text-sm text-white">Login</span>
                                        </>
                                    )}
                                </button>

                                {/* User Dropdown Menu - Desktop */}
                                {isUserMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50">
                                        {isAuthenticated ? (
                                            <>
                                                <a href="#profile" className="flex items-center px-4 py-2 text-blue-900 hover:bg-blue-50">
                                                    <User className="w-4 h-4 mr-2" />
                                                    Profile
                                                </a>
                                                <a href="#settings" className="flex items-center px-4 py-2 text-blue-900 hover:bg-blue-50">
                                                    <Settings className="w-4 h-4 mr-2" />
                                                    Settings
                                                </a>
                                                <a href="#settings" className="flex items-center px-4 py-2 text-blue-900 hover:bg-blue-50">
                                                    <UsersRound className="w-4 h-4 mr-2" />
                                                    Community
                                                </a>
                                                <hr className="my-2 border-blue-100" />
                                                <button
                                                    onClick={handleLogout}
                                                    className="flex items-center w-full px-4 py-2 text-blue-900 hover:bg-blue-50"
                                                >
                                                    <LogOut className="w-4 h-4 mr-2" />
                                                    Logout
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    onClick={handleLogin}
                                                    className="flex items-center w-full px-4 py-2 text-blue-900 hover:bg-blue-50"
                                                >
                                                    <LogIn className="w-4 h-4 mr-2" />
                                                    Login
                                                </button>
                                                <a href="#signup" className="flex items-center px-4 py-2 text-blue-900 hover:bg-blue-50">
                                                    <UserPlus className="w-4 h-4 mr-2" />
                                                    Sign Up
                                                </a>
                                            </>
                                        )}
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
                            {isAuthenticated ? (
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <div className="p-2 bg-blue-100 rounded-full">
                                            <User className="w-6 h-6 text-blue-700" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-blue-900">User Name</p>
                                            <p className="text-xs text-blue-500">user@example.com</p>
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
                                    <a href="#signup" className="flex items-center justify-center p-3 bg-blue-100 rounded-lg text-blue-700 text-sm font-medium">
                                        <UserPlus className="w-4 h-4 mr-1" />
                                        Sign Up
                                    </a>
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
                        {isAuthenticated && (
                            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-blue-100 bg-white">
                                <button
                                    onClick={handleLogout}
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

            {isWishlistOpen && <Wishlist />}
            {isCartOpen && <Cart />}
        </>
    );
};

export default Navigation;