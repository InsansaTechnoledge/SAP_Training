import React, { useEffect, useState } from 'react'
import { useUser } from '../Context/UserContext'
import loginLanding from '../assets/loginLanding.png'
import { Book, Clock, Medal, Brain, Cloud, Database, Badge, BadgePlusIcon, BadgeCent, LucideCheckCircle2, Award, Trophy } from 'lucide-react';
import ContinueWatching from '../Components/LoginLandingComponents/ContinueWatching';
import InterestBasedCourses from '../Components/LoginLandingComponents/InterestBasedCourses';
import ExploreCategories from '../Components/LoginLandingComponents/ExploreCategories';
import PurchasedCourse from '../Components/LoginLandingComponents/PurchasedCourse';
import CertificatesEarned from '../Components/LoginLandingComponents/CertificatesEarned';
import LoginInterestForm from '../Components/LoginLandingComponents/LoginInterestForm';
import AIimage from '../assets/AI.jpg'
import CCimage from '../assets/CC.jpg'
import ABAPimage from '../assets/ABAP.jpg'
import BadgesComponent from '../Components/BadgesComponent';

const LoginLanding = () => {
    const { user } = useUser();
    const [showInterestForm, setShowInterestForm] = useState(false);

    // useEffect(() => {
    //     if (user) {
    //         setShowInterestForm(!user.profession);
    //     }
    // }, [user])

    if (showInterestForm) {
        return (
            <LoginInterestForm setShowInterestForm={setShowInterestForm} />
        )
    }

    const interestBasedCourses = [
        // Crash Courses
        {
            $id: '67c9947c00368902ed56',
            title: 'AI Quick Start',
            icon: <Brain className="w-8 h-8" />,
            description: 'Accelerated AI/ML fundamentals in just 4 weeks.',
            price: 1999,
            category: 'crash',
            students: 567,
            rating: 4.6,
            duration: '4 weeks',
            image: AIimage,
            features: ['Intensive', 'Quick Learning', 'Fundamentals'],
            domain: 'crash'
        },
        {
            $id: '67c831550006cb081c51',
            title: 'Cloud Essentials Crash Course',
            icon: <Cloud className="w-8 h-8" />,
            description: 'Rapid cloud computing fundamentals and deployment.',
            price: 2499,
            category: 'crash',
            students: 412,
            rating: 4.5,
            duration: '3 weeks',
            image: CCimage,
            features: ['Accelerated', 'Practical', 'Certification Prep'],
            domain: 'crash'
        },
        // Standalone Courses
        {
            $id: '67c6e04e00365c934681',
            title: 'ABAP Mastery Program',
            icon: <Database className="w-8 h-8" />,
            description: 'A Comprehensive Learning Path for ABAP Developers .',
            price: 5999,
            category: 'standalone',
            students: 1234,
            rating: 4.8,
            duration: '12 weeks',
            image: ABAPimage,
            features: ['24/7 Support', 'Certificate', 'Projects'],
            domain: 'standalone'
        }
    ];


    return (
        <>
            <div className='px-6 md:px-12 lg:px-24 xl:px-36 pb-10 bg-theme-gradient pt-24'>
                <div className='grid grid-cols-4 gap-5'>
                    <div className='flex flex-col col-span-4'>
                        <div className='p-3 bg-gradient-blue flex flex-col md:flex-row justify-center text-center mb-5 rounded-xl'>
                            <div className='flex flex-col content-center my-auto'>
                                <h1 className='font-bold text-5xl mb-5  my-auto text-left text-secondary'>
                                    Hey {user.name} 👋,
                                </h1>
                                <h3 className='text-left text-secondary'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla earum repellat deserunt sit aliquid laborum. </h3>
                            </div>
                            <img
                                className='w-full sm:w-xs mx-auto'
                                src={loginLanding} />
                        </div>
                        <div className='grow grid md:grid-cols-3 gap-8 '>
                            <div className='p-5 rounded-lg text-lg bg-card-amber'>
                                <div className='flex gap-2 font-medium mb-3 text-secondary'>
                                    <Book className='text-secondary' /> Courses purchased

                                </div>
                                <div className='text-5xl font-bold text-secondary'>
                                    5
                                </div>
                            </div>
                            <div className='p-5 rounded-lg text-lg bg-card-green'>
                                <div className='flex gap-2 font-medium mb-3 text-secondary'>
                                    <Clock className='text-secondary' /> Currently watching

                                </div>
                                <div className='text-5xl font-bold text-secondary'>
                                    2
                                </div>
                            </div>
                            <div className='p-5 rounded-lg text-lg bg-card-blue'>
                                <div className='flex gap-2 font-medium mb-3 text-secondary'>
                                    <Medal className='text-secondary' /> Certifications

                                </div>
                                <div className='text-5xl font-bold text-secondary'>
                                    3
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* badges component */}
                    <div className='col-span-4'>
                    <BadgesComponent />
                    </div>
                    
                </div>
                <div className='gap-8'>
                    <div className=''>

                        <h2 className='mt-8 mb-5 text-3xl font-bold text-secondary'>Continue watching</h2>
                        <div className='grid lg:grid-cols-2 gap-8 p-5'>
                            <ContinueWatching />
                            <ContinueWatching />
                            <ContinueWatching />
                        </div>

                        <div className='gap-8'>
                            <div>
                                <h2 className='mt-8 mb-5 text-3xl font-bold text-secondary'>
                                    My courses
                                </h2>
                                <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 max-h-[28rem] overflow-auto p-5'>
                                    <PurchasedCourse />
                                    <PurchasedCourse />
                                    <PurchasedCourse />
                                    <PurchasedCourse />
                                    {/* <PurchasedCourse />
                                    <PurchasedCourse />
                                    <PurchasedCourse />
                                    <PurchasedCourse />
                                    <PurchasedCourse /> */}

                                </div>
                            </div>
                            <div>
                                <h2 className='mt-8 mb-5 text-3xl font-bold text-secondary'>
                                    My certificates
                                </h2>
                                <div className='grid lg:grid-cols-2 xl:grid-cols-3 gap-8 max-h-[27rem] overflow-auto p-5'>
                                    <CertificatesEarned />
                                    <CertificatesEarned />
                                    <CertificatesEarned />
                                </div>
                            </div>
                        </div>

                        <h2 className='mt-8 mb-5 text-3xl font-bold text-secondary'>Courses based on your interest</h2>
                        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-8'>
                            {interestBasedCourses.map((course) => (
                                <InterestBasedCourses key={course.$id} course={course} />
                            ))
                            }
                            {/* <InterestBasedCourses /> */}
                            {/* <InterestBasedCourses /> */}
                        </div>

                        <h2 className='mt-8 mb-5 text-3xl font-bold text-secondary'>Explore new topics</h2>
                        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-8'>
                            <ExploreCategories />
                            <ExploreCategories />
                            <ExploreCategories />
                            <ExploreCategories />
                            <ExploreCategories />
                        </div>



                    </div>


                </div>
            </div>
        </>
    )
}

export default LoginLanding