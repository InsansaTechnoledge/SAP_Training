import React from 'react'
import { useUser } from '../Context/UserContext'
import MyCourses from '../Components/LoginLandingComponents/MyCourses';
import loginLanding from '../assets/loginLanding.png'
import { Book, Clock, Medal } from 'lucide-react';
import ContinueWatching from '../Components/LoginLandingComponents/ContinueWatching';
import Courses from '../Components/Courses';
import InterestBasedCourses from '../Components/LoginLandingComponents/InterestBasedCourses';
import ExploreCategories from '../Components/LoginLandingComponents/ExploreCategories';
import PurchasedCourse from '../Components/LoginLandingComponents/PurchasedCourse';
import CertificatesEarned from '../Components/LoginLandingComponents/CertificatesEarned';

const LoginLanding = () => {
    const { user } = useUser();
    return (
        <>
            <div className='mx-36 mb-10'>
                <div className='bg-blue-400 bg-gradient-to-r from-blue-500 to-blue-300 mt-24 flex justify-center text-center mb-5 rounded-xl'>
                    <div className='flex flex-col content-center  my-auto'>
                        <h1 className='font-bold text-5xl mb-5  my-auto text-left'>
                            Hey {user.name} 👋,
                        </h1>
                        <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla earum repellat deserunt sit aliquid laborum. </h3>
                    </div>
                    <img
                        className='w-xs'
                        src={loginLanding} />
                </div>
                <div className='grid grid-cols-4 gap-8'>
                    <div className='col-span-4'>
                        <div className='grid grid-cols-3 gap-8 '>
                            <div className='p-5 rounded-lg text-lg bg-amber-200'>
                                <div className='flex gap-2 font-medium mb-3'>
                                    <Book /> Courses purchased

                                </div>
                                <div className='text-5xl font-bold'>
                                    5
                                </div>
                            </div>
                            <div className='p-5 rounded-lg text-lg bg-green-200'>
                                <div className='flex gap-2 font-medium mb-3'>
                                    <Clock /> Currently watching

                                </div>
                                <div className='text-5xl font-bold'>
                                    2
                                </div>
                            </div>
                            <div className='p-5 rounded-lg text-lg bg-blue-200'>
                                <div className='flex gap-2 font-medium mb-3'>
                                    <Medal /> Certifications

                                </div>
                                <div className='text-5xl font-bold'>
                                    3
                                </div>
                            </div>
                        </div>

                        <h2 className='mt-8 mb-5 text-3xl font-bold'>Continue watching</h2>
                        <div className='grid grid-cols-2 gap-8 p-5'>
                            <ContinueWatching />
                            <ContinueWatching />
                            <ContinueWatching />
                        </div>

                        <div className='gap-8'>
                            <div>
                                <h2 className='mt-8 mb-5 text-3xl font-bold'>
                                    My courses
                                </h2>
                                <div className='grid grid-cols-4 gap-10 max-h-[28rem] overflow-auto p-5'>
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
                                <h2 className='mt-8 mb-5 text-3xl font-bold'>
                                    My Certificates
                                </h2>
                                <div className='grid grid-cols-3 gap-8 max-h-[27rem] overflow-auto p-5'>
                                    <CertificatesEarned />
                                    <CertificatesEarned />
                                    <CertificatesEarned />
                                </div>
                            </div>
                        </div>

                        <h2 className='mt-8 mb-5 text-3xl font-bold'>Courses based on your interest</h2>
                        <div className='grid grid-cols-3 gap-8'>
                            <InterestBasedCourses />
                            <InterestBasedCourses />
                            <InterestBasedCourses />
                        </div>

                        <h2 className='mt-8 mb-5 text-3xl font-bold'>Explore new topics</h2>
                        <div className='grid grid-cols-3 gap-8'>
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