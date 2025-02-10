import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import Navbar from '../Components/Navbar';
import HeroSection from '../Components/HeroSection';
import Courses from '../Components/Courses';
import AuthComponent from '../Components/AuthComponent';
import CertificateSection from '../Components/CertificateDisplay';
import LearningExp from '../Components/LearningExp';
import DashboardBanner from '../Components/DashBoardLanding';
import AnimatedFooter from '../Components/Footer';

const LandingPage = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [wishlist, setWishlist] = useState([]); 
    const [isWishlistOpen, setIsWishlistOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Hero Section */}
            <HeroSection />

            <DashboardBanner />

            {/* Courses Grid */}
            <Courses
                cart={cart}
                setCart={setCart}
                isCartOpen={isCartOpen}
                setIsCartOpen={setIsCartOpen}
                wishlist={wishlist}
                setWishlist={setWishlist}
                isWishlistOpen={isWishlistOpen}
                setIsWishlistOpen={setIsWishlistOpen}
            />

            <LearningExp />

            <AuthComponent />

            <CertificateSection />

            {/* CTA Section */}
            <div className="bg-gray-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
                    <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                        Join thousands of students who are already advancing their careers with TechLearn Pro
                    </p>
                    <button className="bg-blue-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-700">
                        Get Started Now
                    </button>
                </div>
            </div>

            <AnimatedFooter />
        </div>

       
    );
};

export default LandingPage;
