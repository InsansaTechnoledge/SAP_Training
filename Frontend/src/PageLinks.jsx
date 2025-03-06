import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import ExamPage from './Pages/ExamPage';
import UserDashboard from './Pages/ProfileDashboard';
import Wishlist from './Components/Wishlist';
import VideoPage from './Pages/VideoPage';
import Checkout from './Pages/Checkout';
import Navigation from './Components/Navbar';
import QuizPage from './Pages/QuizPage';
import CourseShop from './Pages/ShopPage';
import GameDashboard from './Pages/GamePage';
import RealisticShooterGame from './Games/ABAP/Module/ModuleOne/GameThree';
import StudyMaterialsShop from './Pages/StudyMaterails';
import PromoCodeGenerator from './Components/PromocodeGenerator';
const PageLinks = () => {
    

    return (
        <>
            <Router>
            <Navigation />
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/course" element={<ExamPage />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/video" element={<VideoPage />} />
                    <Route path="/quiz" element={<QuizPage />} />
                    <Route path="/shop" element={<CourseShop />} />
                    <Route path="/payment" element={<Checkout />} />
                    <Route path="/dashboard" element={<UserDashboard />} />
                    <Route path="/game" element={<GameDashboard />} />
                    <Route path="/game2" element={<RealisticShooterGame />} />
                    <Route path="/books" element={<StudyMaterialsShop />} />
                    <Route path="/checkout" element={<Checkout />} />


                    

                    <Route path="/pc" element={<PromoCodeGenerator />} />


                </Routes>
            </Router>
        </>
    );
};

export default PageLinks;
