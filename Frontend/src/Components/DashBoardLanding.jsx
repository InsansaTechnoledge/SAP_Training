import React from 'react';
import { BarChart, Users, BookOpen, Star, ArrowRight } from 'lucide-react';
import Dashboard from '../assets/Dashboard.png'
import Tilt from 'react-parallax-tilt'

const DashboardBanner = () => {
    const features = [
        {
            icon: BarChart,
            text: "Track your progress with interactive charts"
        },
        {
            icon: BookOpen,
            text: "Access comprehensive learning modules"
        },
        {
            icon: Users,
            text: "Compare with peer rankings"
        },
        {
            icon: Star,
            text: "Monitor test performance"
        }
    ];

    return (
        <div className="bg-theme-gradient pb-16 pt-44 rounded-br-[30rem] ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    {/* Left side - Content */}
                    <div className="lg:w-1/2 space-y-6">
                        <h2 className="text-3xl font-bold text-primary">
                            Accelerate Your Learning with Our
                            <span className="text-primary"> Intelligent Dashboard</span>
                        </h2>

                        <p className="text-lg text-secondary">
                            Stay on top of your ABAP learning journey with our intuitive dashboard.
                            Track progress, analyze performance, and achieve your goals faster.
                        </p>

                        <div className="grid grid-cols-2 gap-4">
                            {features.map((feature, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <feature.icon className="h-4 w-4 text-blue-600" />
                                    </div>
                                    <span className="text-sm text-secondary">{feature.text}</span>
                                </div>
                            ))}
                        </div>

                        {/* <button className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                            Explore Dashboard
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </button> */}
                    </div>


                    {/* Right side - Dashboard Preview */}
                    <div className="lg:w-1/2">
                        <Tilt
                            tiltMaxAngleX={15}
                            tiltMaxAngleY={15}
                            perspective={1000}
                            scale={1.05}
                            transitionSpeed={400}
                            glareEnable={true}
                            glareMaxOpacity={0.2}
                        >
                            <div className="relative">
                                {/* Decorative elements */}
                                <div className="absolute -top-4 -right-4 w-full h-full bg-blue-100 rounded-xl transform rotate-3"></div>
                                <div className="absolute -bottom-4 -left-4 w-full h-full bg-indigo-100 rounded-xl transform -rotate-3"></div>

                                {/* Main image */}
                                <div className="relative bg-white rounded-xl shadow-xl p-4">
                                    <img
                                        src={Dashboard}
                                        alt="Dashboard Preview"
                                        className="rounded-lg w-full"
                                    />

                                    {/* Floating stats cards */}
                                    <div className="absolute -right-8 -top-8 bg-white p-4 rounded-lg shadow-lg">
                                        <div className="flex items-center gap-2">
                                            <BarChart className="h-5 w-5 text-blue-600" />
                                            <span className="font-semibold">68% Progress</span>
                                        </div>
                                    </div>

                                    <div className="absolute -left-8 -bottom-8 bg-white p-4 rounded-lg shadow-lg">
                                        <div className="flex items-center gap-2">
                                            <Star className="h-5 w-5 text-yellow-500" />
                                            <span className="font-semibold">Top 15%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Tilt>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardBanner;