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

            <AnimatedFooter />
        </div>

       
    );
};

export default LandingPage;
