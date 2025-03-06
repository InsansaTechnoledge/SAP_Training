import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Info, TrendingUp, Award, Globe, Target, Code, Zap } from 'lucide-react';

const CourseRoadmap = () => {
    const [activeSection, setActiveSection] = useState(null);

    // Market Demand Data
    const marketDemandData = [
        { year: 2020, demand: 35 },
        { year: 2021, demand: 52 },
        { year: 2022, demand: 68 },
        { year: 2023, demand: 85 },
        { year: 2024, demand: 95 }
    ];

    // Salary Progression Data
    const salaryProgressionData = [
        { year: 2020, salary: 6 },
        { year: 2021, salary: 8 },
        { year: 2022, salary: 10 },
        { year: 2023, salary: 12 },
        { year: 2024, salary: 15 }
    ];

    // Interactive hover effect
    const handleSectionHover = (section) => {
        setActiveSection(section);
    };

    return (
        <div className="max-w-6xl mx-auto  bg-blue-50 p-8 rounded-2xl ">
            {/* <div className="text-center mb-12">
                <h1 className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 pb-4">
                    SAP ABAP Master Course
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Transform Your Career with the Most Comprehensive SAP ABAP Professional Training Program
                </p>
            </div> */}

            {/* Market Demand Section */}
            <section className="mb-16 bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center mb-6">
                    <Globe className="w-12 h-12 text-blue-600 mr-4" />
                    <h2 className="text-4xl font-bold text-gray-800">Market Demand Explosion</h2>
                </div>
                
                <div className="grid grid-cols-2 gap-8">
                    <div>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={marketDemandData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                                <XAxis dataKey="year" />
                                <YAxis label={{ value: 'Demand %', angle: -90, position: 'insideLeft' }} />
                                <Tooltip />
                                <Line type="monotone" dataKey="demand" stroke="#3b82f6" strokeWidth={3} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex flex-col justify-center">
                        <div className="text-6xl font-extrabold text-blue-600 mb-4">+95%</div>
                        <p className="text-xl text-gray-700">
                            Market demand for SAP ABAP professionals has skyrocketed by 95% in the last 4 years
                        </p>
                    </div>
                </div>
            </section>

            {/* Salary Progression */}
            <section className="mb-16 bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center mb-6">
                    <TrendingUp className="w-12 h-12 text-green-600 mr-4" />
                    <h2 className="text-4xl font-bold text-gray-800">Salary Progression</h2>
                </div>
                
                <div className="grid grid-cols-2 gap-8">
                    <div>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={salaryProgressionData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                                <XAxis dataKey="year" />
                                <YAxis label={{ value: 'Salary (Lakhs)', angle: -90, position: 'insideLeft' }} />
                                <Tooltip />
                                <Line type="monotone" dataKey="salary" stroke="#10b981" strokeWidth={3} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex flex-col justify-center">
                        <div className="text-6xl font-extrabold text-green-600 mb-4">₹15L</div>
                        <p className="text-xl text-gray-700">
                            Average annual salary for SAP ABAP professionals, with top experts earning up to ₹25L
                        </p>
                    </div>
                </div>
            </section>

            {/* Skill Modules */}
            <section className="mb-16">
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">What You'll Master</h2>
                <div className="grid md:grid-cols-4 gap-6">
                    {[
                        { icon: Code, title: "ABAP Core", description: "Advanced Programming Techniques" },
                        { icon: Zap, title: "HANA Integration", description: "Next-Gen Database Technologies" },
                        { icon: Target, title: "UI5 Development", description: "Modern Web Interfaces" },
                        { icon: Award, title: "Cloud Solutions", description: "SAP S/4HANA Expertise" }
                    ].map((module, index) => (
                        <div 
                            key={index} 
                            className="bg-white p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform"
                            onMouseEnter={() => handleSectionHover(module.title)}
                            onMouseLeave={() => handleSectionHover(null)}
                        >
                            <module.icon className="w-12 h-12 text-blue-600 mb-4" />
                            <h3 className="text-2xl font-semibold mb-2">{module.title}</h3>
                            <p className="text-gray-600">{module.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Call to Action */}
            <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-12 text-center">
                <h2 className="text-5xl font-black mb-6">Become a SAP ABAP Pro</h2>
                <p className="text-xl mb-8">Limited Seats | Early Bird Discount Available</p>
                <button className="bg-white text-blue-600 px-12 py-4 text-xl font-bold rounded-full shadow-2xl hover:scale-105 transition-transform">
                    Enroll Now
                </button>
            </section>
        </div>
    );
};

export default CourseRoadmap;