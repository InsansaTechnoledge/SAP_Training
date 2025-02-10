import React, { useState, useEffect } from 'react';
import { ShoppingCart, Heart, GraduationCap, Search, Menu, X, ChevronRight, User, LogIn, UserPlus, ChevronDown, Settings, LogOut } from 'lucide-react';
import SearchOverlay from './SearchOverlay';

const Navigation = ({ cart, wishlist, setIsCartOpen, setIsWishlistOpen }) => {
    const [scrolled, setScrolled] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 50;
            setScrolled(isScrolled);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setIsUserMenuOpen(false);
    };

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 transition-all duration-300 z-50 
                ${scrolled
                    ? 'bg-gradient-to-r from-blue-700 to-blue-900 shadow-lg'
                    : 'bg-transparent'}`}>
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex justify-between items-center">
                        {/* Logo Section */}
                        <div className="flex items-center space-x-3 group cursor-pointer">
                            <div className={`p-2 rounded-lg transform transition-all duration-300 ${scrolled ? 'bg-blue-50' : 'bg-white/10'
                                } group-hover:rotate-12`}>
                                <GraduationCap className={`w-8 h-8 ${scrolled ? 'text-blue-800' : 'text-white'
                                    }`} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-2xl font-bold text-white">TechAcademy</span>
                                <span className={`text-xs transition-colors duration-300 ${scrolled ? 'text-blue-100' : 'text-white/90'
                                    }`}>
                                    Learn. Grow. Excel.
                                </span>
                            </div>
                        </div>

                        {/* Navigation Links */}
                        <div className="hidden md:flex items-center space-x-8">
                            <a href="#" className="text-white hover:text-blue-50 transition-colors">Courses</a>
                            <a href="#" className="text-white hover:text-blue-50 transition-colors">Resources</a>
                            <a href="#" className="text-white hover:text-blue-50 transition-colors">Community</a>
                        </div>

                        {/* Actions Section */}
                        <div className="flex items-center space-x-6">
                            {/* Search Button */}
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

                            {/* Wishlist Button */}
                            <button
                                className="relative group"
                                onClick={() => setIsWishlistOpen(true)}
                            >
                                <div className={`p-2 rounded-full transition-all duration-300 ${scrolled
                                        ? 'bg-blue-800 hover:bg-blue-700'
                                        : 'bg-white/10 hover:bg-white/20'
                                    }`}>
                                    <Heart className="w-6 h-6 text-white group-hover:scale-110 transform transition-transform" />
                                </div>
                                {wishlist.length > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full border-2 border-blue-900">
                                        {wishlist.length}
                                    </span>
                                )}
                            </button>

                            {/* Cart Button */}
                            <button
                                className="relative group"
                                onClick={() => setIsCartOpen(true)}
                            >
                                <div className={`p-2 rounded-full transition-all duration-300 ${scrolled
                                        ? 'bg-blue-800 hover:bg-blue-700'
                                        : 'bg-white/10 hover:bg-white/20'
                                    }`}>
                                    <ShoppingCart className="w-6 h-6 text-white group-hover:scale-110 transform transition-transform" />
                                </div>
                                {cart.length > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full border-2 border-blue-900">
                                        {cart.reduce((total, item) => total + item.quantity, 0)}
                                    </span>
                                )}
                            </button>

                            {/* User Menu */}
                            <div className="relative user-menu">
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

                                {/* User Dropdown Menu */}
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
                                className={`md:hidden p-2 rounded-full transition-all duration-300 ${scrolled
                                        ? 'bg-blue-800 hover:bg-blue-700'
                                        : 'bg-white/10 hover:bg-white/20'
                                    }`}
                            >
                                <Menu className="w-6 h-6 text-white" />
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

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="fixed inset-0 bg-blue-950/50 backdrop-blur-sm z-50">
                    <div className="fixed inset-y-0 right-0 w-64 bg-white shadow-xl">
                        <div className="p-4 flex justify-between items-center border-b border-blue-100">
                            <h2 className="text-lg font-semibold text-blue-900">Menu</h2>
                            <button
                                onClick={() => setIsMenuOpen(false)}
                                className="p-2 hover:bg-blue-50 rounded-full"
                            >
                                <X className="w-6 h-6 text-blue-500" />
                            </button>
                        </div>
                        <nav className="p-4">
                            <ul className="space-y-2">
                                {['Courses', 'Resources', 'Community', 'Search', 'Login', 'Sign Up'].map((item) => (
                                    <li key={item}>
                                        <a
                                            href="#"
                                            className="flex items-center justify-between p-3 hover:bg-blue-50 rounded-lg group"
                                            onClick={() => {
                                                if (item === 'Search') {
                                                    setIsMenuOpen(false);
                                                    setIsSearchOpen(true);
                                                }
                                                if (item === 'Login') {
                                                    handleLogin();
                                                    setIsMenuOpen(false);
                                                }
                                            }}
                                        >
                                            <span className="text-blue-900">{item}</span>
                                            <ChevronRight className="w-5 h-5 text-blue-400 group-hover:text-blue-700" />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navigation;