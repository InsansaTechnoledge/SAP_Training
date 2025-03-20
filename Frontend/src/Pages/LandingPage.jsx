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
import Curve from '../assets/curve_line.svg'
import Pricing from '../Components/Pricing';
import EventBannerLanding from '../Components/EventBannerLanding';

const LandingPage = () => {
    // const [isMenuOpen, setIsMenuOpen] = useState(false);
    // const navigate = useNavigate();
    

    return (
        <div className="min-h-screen bg-blue-600">

            {/* Hero Section */}
            <HeroSection />

            <DashboardBanner />

            {/* <img src={Curve} className='backdrop-opacity-0 w-full'/> */}
            {/* Courses Grid */}
            {/* <Courses/> */}

            <ShopBanner/>

            <EventBannerLanding/>

            <LearningExp />

            <Pricing/>

            <AuthComponent />

            <CertificateSection />

            <AnimatedFooter />
        </div>

       
    );
};

export default LandingPage;
