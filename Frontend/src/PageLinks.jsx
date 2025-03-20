import React, { useEffect } from 'react';
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
import { useUser } from './Context/UserContext';
import axios from 'axios';
import { API_BASE_URL } from './config';
import LoginLanding from './Pages/LoginLanding';
import EventPage from './Pages/EventPage';
import UserProfileDashboard from './Components/ProfilePage/UserSide/userProfileDashboard';
import PaymentSuccess from './Components/Payment/PaymentSuccess';
const PageLinks = () => {
    const { user, setUser } = useUser();

    useEffect(() => {
        const checkAuth = async () => {
            if (!user) {
                try {

                    const response = await axios.get(`${API_BASE_URL}/api/v1/auth/checkAuth`, {
                        withCredentials: true
                    });

                    if (response.status === 200) {
                        console.log(response.data);
                        setUser(response.data.user);
                    }
                }
                catch (err) {
                    console.log(err);
                }
            }
        }

        checkAuth();
    }, []);


    return (
        <>
            <Router>
                {/* {
                    !user || (user && user.profession)
                    ?
                    <Navigation />
                    :
                    null
                } */}
                
                <Navigation />
                <Routes>
                    <Route path="/" element={user ? <LoginLanding /> : <LandingPage />} />
                    <Route path='/payment-success' element={ <PaymentSuccess /> } />
                    <Route path='/events' element={<EventPage />} />
                    <Route path="/course" element={<ExamPage />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/video" element={<VideoPage />} />
                    <Route path="/quiz" element={<QuizPage />} />
                    <Route path="/shop" element={<CourseShop />} />
                    <Route path="/payment" element={<Checkout />} />
                    <Route path="/dashboard" element={<UserDashboard />} />
                    <Route path="/profile" element={<UserProfileDashboard />} />
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
