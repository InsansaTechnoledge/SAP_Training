import React, { useEffect, useRef, useState } from 'react';
import {
    Facebook,
    Twitter,
    Linkedin,
    Instagram,
    Mail,
    Phone,
    MapPin,
    ChevronRight,
    Globe,
    ArrowUp
} from 'lucide-react';

const AnimatedFooter = () => {
    const [isInView, setIsInView] = useState(false);
    const footerRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setIsInView(true);
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (footerRef.current) {
            observer.observe(footerRef.current);
        }

        return () => {
            if (footerRef.current) {
                observer.unobserve(footerRef.current);
            }
        };
    }, []);

    const socialLinks = [
        { icon: Facebook, href: '#', color: 'hover:bg-blue-600', label: 'Facebook' },
        { icon: Twitter, href: '#', color: 'hover:bg-blue-400', label: 'Twitter' },
        { icon: Linkedin, href: '#', color: 'hover:bg-blue-700', label: 'LinkedIn' },
        { icon: Instagram, href: '#', color: 'hover:bg-pink-600', label: 'Instagram' }
    ];

    const quickLinks = [
        'Home',
        'About Us',
        'Services',
        'Products',
        'Contact'
    ];

    const products = [
        'ABAP Dashboard',
        'Learning Management',
        'Enterprise Solutions',
        'Custom Development',
        'Consulting Services'
    ];

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer
            ref={footerRef}
            className="relative bg-gradient-to-b from-gray-900 to-gray-800 overflow-hidden"
        >
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                    backgroundSize: '40px 40px'
                }} />
            </div>

            {/* Gradient Border */}
            <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

            {/* Scroll to Top Button */}
            <button
                onClick={scrollToTop}
                className="fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg 
                          hover:bg-blue-700 transform hover:-translate-y-1 transition-all duration-300"
            >
                <ArrowUp className="h-5 w-5" />
            </button>

            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Company Info - Fade In Left */}
                    <div className={`
                        transform transition-all duration-1000 delay-100
                        ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}
                    `}>
                        <div className="flex items-center space-x-2 group cursor-pointer mb-6">
                            <Globe className="h-8 w-8 text-blue-500 group-hover:animate-spin-slow" />
                            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
                                Insansa
                            </span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            Empowering businesses through innovative technology solutions.
                            Leaders in ABAP development and enterprise software solutions.
                        </p>
                        <div className="flex space-x-4">
                            {socialLinks.map((social, index) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={index}
                                        href={social.href}
                                        aria-label={social.label}
                                        className={`
                                            transform transition-all duration-500 delay-[${200 + (index * 100)}ms]
                                            ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                                            w-10 h-10 rounded-lg bg-gray-800/50 backdrop-blur-sm flex items-center justify-center 
                                            text-gray-400 ${social.color} hover:text-white 
                                            hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/20
                                        `}
                                    >
                                        <Icon className="h-5 w-5" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Quick Links - Fade In Up */}
                    <div className={`
                        transform transition-all duration-1000 delay-200
                        ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                    `}>
                        <h3 className="text-white text-lg font-semibold mb-6">Quick Links</h3>
                        <ul className="space-y-4">
                            {quickLinks.map((link, index) => (
                                <li
                                    key={index}
                                    className={`
                                        transform transition-all duration-500 delay-[${300 + (index * 100)}ms]
                                        ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}
                                    `}
                                >
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-blue-400 flex items-center group 
                                                 transition-all duration-300 hover:pl-2"
                                    >
                                        <ChevronRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transform 
                                                               translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300" />
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Products - Fade In Up */}
                    <div className={`
                        transform transition-all duration-1000 delay-300
                        ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                    `}>
                        <h3 className="text-white text-lg font-semibold mb-6">Our Products</h3>
                        <ul className="space-y-4">
                            {products.map((product, index) => (
                                <li
                                    key={index}
                                    className={`
                                        transform transition-all duration-500 delay-[${400 + (index * 100)}ms]
                                        ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}
                                    `}
                                >
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-blue-400 flex items-center group 
                                                 transition-all duration-300 hover:pl-2"
                                    >
                                        <ChevronRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transform 
                                                               translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300" />
                                        {product}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info - Fade In Right */}
                    <div className={`
                        transform transition-all duration-1000 delay-400
                        ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}
                    `}>
                        <h3 className="text-white text-lg font-semibold mb-6">Contact Us</h3>
                        <div className="space-y-6">
                            <div className="group">
                                <div className="flex items-start space-x-3 text-gray-400 group-hover:text-blue-400 transition-all duration-300">
                                    <MapPin className="h-5 w-5 mt-1 flex-shrink-0 group-hover:animate-bounce" />
                                    <span>123 Tech Street, Innovation Hub, Digital City, 12345</span>
                                </div>
                            </div>
                            <a
                                href="mailto:info@insansa.com"
                                className="flex items-center space-x-3 text-gray-400 hover:text-blue-400 group transition-all duration-300"
                            >
                                <Mail className="h-5 w-5 group-hover:animate-bounce" />
                                <span>info@insansa.com</span>
                            </a>
                            <a
                                href="tel:+1234567890"
                                className="flex items-center space-x-3 text-gray-400 hover:text-blue-400 group transition-all duration-300"
                            >
                                <Phone className="h-5 w-5 group-hover:animate-bounce" />
                                <span>+123 456 7890</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Newsletter Section - Fade In Up */}
                <div className={`
                    border-t border-gray-800/50 mt-12 pt-8
                    transform transition-all duration-1000 delay-500
                    ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                `}>
                    <div className="max-w-2xl mx-auto text-center">
                        <h3 className="text-white text-lg font-semibold mb-4">Stay Updated</h3>
                        <p className="text-gray-400 mb-6">Subscribe to our newsletter for the latest updates and innovations.</p>
                        <div className="flex max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-3 rounded-l-lg bg-gray-800/50 text-white placeholder-gray-400 
                                         focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                            />
                            <button className="px-6 py-3 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 
                                           transform hover:-translate-y-1 transition-all duration-300">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Copyright - Fade In Up */}
                <div className={`
                    border-t border-gray-800/50 mt-12 pt-8
                    transform transition-all duration-1000 delay-600
                    ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                `}>
                    <div className="text-center">
                        <p className="text-gray-400">
                            © {new Date().getFullYear()} Insansa Techknowledge. All rights reserved.
                        </p>
                        <p className="text-gray-500 text-sm mt-2">
                            A product of excellence in technology and innovation.
                        </p>
                    </div>
                </div>
            </div>

            {/* Animated Background Lines */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 opacity-10">
                    {[...Array(5)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"
                            style={{
                                top: `${20 * i}%`,
                                left: '-100%',
                                right: '-100%',
                                animation: `slideRight ${3 + i}s linear infinite`
                            }}
                        />
                    ))}
                </div>
            </div>

            <style jsx>{`
                @keyframes slideRight {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow 3s linear infinite;
                }
            `}</style>
        </footer>
    );
};

export default AnimatedFooter;