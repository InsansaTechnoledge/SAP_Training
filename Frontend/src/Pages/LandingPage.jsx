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
import ShopBanner from '../Components/ShopBanner';

const LandingPage = () => {
    // const [isMenuOpen, setIsMenuOpen] = useState(false);
    // const navigate = useNavigate();
    

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Hero Section */}
            <HeroSection />

            <DashboardBanner />

            {/* Courses Grid */}
            <Courses/>

            <ShopBanner/>

            <LearningExp />

            <AuthComponent />

            <CertificateSection />

            <AnimatedFooter />
        </div>

       
    );
};

export default LandingPage;
