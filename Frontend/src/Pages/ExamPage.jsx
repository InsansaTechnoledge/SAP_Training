import React, { useEffect, useState } from 'react';
import { Lock, Unlock, Play, Trophy, Star, CheckCircle, Clock, ChevronRight, CreditCard, Zap, Users, Book, Code, Award, BarChart, Lightbulb } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardBannerComponent from '../Components/DashboardBanner';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const ExamPage = () => {
    const navigate = useNavigate();
    const [activeModule, setActiveModule] = useState(null);
    const [unlockedModules, setUnlockedModules] = useState(localStorage.getItem('unlockedModules').split(','));
    const [course, setCourse] = useState();
    const [stats,setStats] = useState([]);
    const [modules, setModules] = useState([]);

    useEffect(()=> {
        const fetchCourse = async () => {
            try{

                const courseId = '67c6e04e00365c934681';
                const response = await axios.get(`${API_BASE_URL}/api/v1/courses/course?id=${courseId}`);
                if(response.status===200){
                console.log(response.data);
                setCourse(response.data);
            }
            
            }
            catch(err){
                console.log("error fetching course", err);
            }

        }

        fetchCourse();
    },[])

    useEffect(()=>{
        if(course){
            setStats([
                { icon: Users, value: "10,000+", label: "Active Learners" },
                { icon: Book, value: `${course.practiceExamples}+`, label: "Practice Examples" },
                { icon: Code, value: `${course.realProjects}+`, label: "Real Projects" },
                { icon: Award, value: "98%", label: "Success Rate" }
            ]);

            setModules(course.moduleId);
        }
    },[course]);

    // const stats = [
    //     { icon: Users, value: "10,000+", label: "Active Learners" },
    //     { icon: Book, value: `${course.practiceExamples}+`, label: "Practice Examples" },
    //     { icon: Code, value: `${course.realProjects}+`, label: "Real Projects" },
    //     { icon: Award, value: "98%", label: "Success Rate" }
    // ];

    // const modules = [
    //     {
    //         id: 1,
    //         title: "ABAP Fundamentals",
    //         description: "Master the core concepts of ABAP programming through hands-on exercises and real-world examples",
    //         price: "Free",
    //         icon: Code,
    //         subModules: [
    //             { title: "Introduction to ABAP", duration: "2 min", completed: true, exercises: 5, type: "video" },
    //             { title: "Quiz on ABAP", duration: "2 min", completed: true, exercises: "1 quiz", type: "quiz" },
    //             { title: "Data Types & Variables", duration: "1 min", completed: false, exercises: 3, type: "video" },
    //             { title: "Control Structures", duration: "1 min", completed: false, exercises: 4, type: "video" },
    //             { title: "Module Assessment", duration: "2 min", completed: true, exercises: "final", type: "quiz" },
    //             { title: "Game", duration: "2 min", completed: true, exercises: "final", type: "game" }
    //         ],
    //         features: ["Interactive Console", "Guided Examples", "Basic Certificate"],
    //         color: "from-blue-500 to-blue-400",
    //         progress: 33
    //     },
    //     {
    //         id: 2,
    //         title: "Advanced ABAP",
    //         description: "Dive deep into advanced ABAP concepts with industry-standard practices and patterns",
    //         price: "49",
    //         icon: Lightbulb,
    //         subModules: [
    //             { title: "Object-Oriented Programming", duration: "3 min", completed: false, exercises: 6, type: "video" },
    //             { title: "OOP Concepts Quiz", duration: "1 min", completed: false, exercises: "1 quiz", type: "quiz" },
    //             { title: "Design Patterns", duration: "2 min", completed: false, exercises: 4, type: "video" },
    //             { title: "Design Patterns Quiz", duration: "1 min", completed: false, exercises: "1 quiz", type: "quiz" },
    //             { title: "ABAP Units", duration: "1 min", completed: false, exercises: 3, type: "video" },
    //             { title: "ODATA", duration: "1 min", completed: false, exercises: 5, type: "video" },
    //             { title: "Final Assessment", duration: "2 min", completed: false, exercises: "final", type: "quiz" }
    //         ],
    //         features: ["Advanced Projects", "Code Reviews", "Premium Support"],
    //         color: "from-indigo-500 to-indigo-400",
    //         progress: 0
    //     },
    //     {
    //         id: 3,
    //         title: "Database Programming",
    //         description: "Master database operations and optimization techniques for enterprise applications",
    //         price: "69",
    //         icon: BarChart,
    //         subModules: [
    //             { title: "ABAP Dictionary", duration: "2 min", completed: false, exercises: 5, type: "video" },
    //             { title: "Dictionary Quiz", duration: "1 min", completed: false, exercises: "1 quiz", type: "quiz" },
    //             { title: "Database Operations", duration: "2 min", completed: false, exercises: 6, type: "video" },
    //             { title: "Operations Quiz", duration: "1 min", completed: false, exercises: "1 quiz", type: "quiz" },
    //             { title: "Performance Optimization", duration: "1 min", completed: false, exercises: 4, type: "video" },
    //             { title: "Final Module Test", duration: "2 min", completed: false, exercises: "final", type: "quiz" }
    //         ],
    //         features: ["Performance Labs", "Real DB Access", "Expert Guidance"],
    //         color: "from-purple-500 to-purple-400",
    //         progress: 0
    //     }
    // ];


    const isModuleUnlocked = (moduleId) => unlockedModules.includes(moduleId);

    const handleUnlockModule = (moduleId) => {
        alert(`Processing payment for module ${moduleId}`);
        setUnlockedModules([...unlockedModules, moduleId]);
        localStorage.setItem('unlockedModules', [...unlockedModules, moduleId]);
        
    };

    const handleVideoClick = (moduleId, subModuleId) => {
        if (isModuleUnlocked(moduleId)) {
            navigate(`/video?id=${subModuleId}`);
        }
    };

    const handleContentClick = (module, content) => {
        if (isModuleUnlocked(module.$id)) {
            if (content.type === "quiz") {
                navigate(`/quiz?moduleId=${module.$id}&quizId=${content.$id}`);
            } 
            else if (content.type === "game" ){
                navigate('/game');
            }
            else {
                navigate(`/video?moduleId=${module.$id}&videoId=${content.$id}`, {state: {module: module.name, moduleId: module.$id}});
            }
        }
    };

    if(!course){
        return <div>Loaidng...</div>
    }

    return (

        <div className="min-h-screen bg-blue-50">
            
            {/* Hero Section with Animated Background */}
            <div className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmZmZmMTAiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-10" />
                    <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-blue-600 opacity-20 blur-3xl transform translate-x-32 -translate-y-16 animate-pulse" />
                    <div className="absolute left-0 bottom-0 h-64 w-64 rounded-full bg-blue-400 opacity-20 blur-3xl transform -translate-x-32 translate-y-16 animate-pulse" />
                </div>

                <div className="relative container mx-auto px-4 py-24">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center bg-blue-800/50 rounded-full px-6 py-3 mb-8 backdrop-blur-sm">
                            <Star className="h-5 w-5 text-yellow-400 mr-2" />
                            <span className="text-blue-100">{course.preTitle}</span>
                        </div>

                        <h1 className="text-7xl font-bold text-white mb-8 leading-tight">
                            {/* Master */}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200 ml-4">
                                {course.title}
                            </span>
                            <span className="block text-3xl mt-4 text-blue-200">
                                {course.subTitle}
                            </span>
                        </h1>

                        <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto leading-relaxed">
                            {course.description}
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <button className="group bg-primary text-secondary px-8 py-4 rounded-xl font-semibold hover:shadow-xl hover:shadow-blue-900/20 transform hover:scale-105 transition-all flex items-center gap-3 w-full sm:w-auto">
                                <Play className="h-5 w-5 group-hover:animate-pulse" />
                                Start Free Module
                            </button>
                            <button className="group bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-600 transition-all flex items-center gap-3 w-full sm:w-auto">
                                <Trophy className="h-5 w-5 group-hover:animate-bounce" />
                                View Success Stories
                            </button>
                        </div>

                        {/* Stats Section */}
                        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
                            {stats.map((stat, index) => (  
                                <div key={index} className="text-center p-4 rounded-xl bg-secondary backdrop-blur-sm">
                                    <stat.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                                    <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                                    <div className="text-primary text-sm">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Learning Modules Section */}
            <div className="mx-auto px-4 py-20 bg-theme-gradient">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-secondary mb-4">
                        Your Learning Journey
                    </h2>
                    <p className="text-secondary max-w-2xl mx-auto">
                        Follow our structured learning path or choose individual modules.
                        Each module includes practical exercises, real-world projects, and expert support.
                    </p>
                </div>

                <div className="max-w-6xl mx-auto space-y-8">
                    {modules.map((module, index) => (
                        <div
                            key={module.$id}
                            onMouseEnter={() => setActiveModule(module.$id)}
                            onMouseLeave={() => setActiveModule(null)}
                            className={`
                                relative bg-primary rounded-2xl shadow-lg overflow-hidden
                                ${activeModule === module.$id ? 'transform scale-[1.02] shadow-xl' : ''}
                                transition-all duration-300
                            `}
                        >
                            {/* Progress bar */}
                            <div className="absolute top-0 left-0 h-1 bg-secondary w-full">
                                <div
                                    className={`h-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-500`}
                                    style={{ width: `0%` }}
                                />
                            </div>

                            <div className="p-8">
                                <div className="flex justify-between items-start mb-8">
                                    <div className="flex items-start gap-4">
                                        <div className={`p-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-400 text-white`}>
                                            <Code className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-semibold text-primary mb-2">
                                                {module.name}
                                            </h3>
                                            <p className="text-secondary max-w-xl">{module.description}</p>
                                        </div>
                                    </div>

                                    {isModuleUnlocked(module.$id) ? (
                                        <div className="flex items-center card-green  px-6 py-3 rounded-xl">
                                            <Unlock className="h-5 w-5 mr-2" />
                                            <span>Module Unlocked</span>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => handleUnlockModule(module.$id)}
                                            className="flex items-center card-blue px-6 py-3 rounded-xl hover:cursor-pointer transition-colors"
                                        >
                                            <CreditCard className="h-5 w-5 mr-2" />
                                            {
                                                module.price===0
                                                ?
                                                <span>Free</span>
                                                :
                                                <span>${module.price}</span>
                                            }
                                        </button>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {module.contentId.map((content, i) => (
                                        <div
                                            key={i}
                                            onClick={() => handleContentClick(module, content)}
                                            className={`
                                                p-6 rounded-xl border group
                                                ${isModuleUnlocked(module.$id)
                                                    ? 'hover:border-blue-200 hover:shadow-md cursor-pointer border-gray-400'
                                                    : 'border-contrast opacity-75 cursor-not-allowed'}
                                                transition-all
                                            `}
                                        >
                                            <div className="flex justify-between items-start mb-3">
                                                <h4 className="font-medium text-secondary">
                                                    {content.title}
                                                </h4>
                                                {!isModuleUnlocked(module.$id) && (
                                                    <Lock className="h-4 w-4 text-gray-400" />
                                                )}
                                                {isModuleUnlocked(module.$id) && 
                                                // content.completed && 
                                                (
                                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                                )}
                                            </div>
                                            <div className="flex items-center justify-between text-sm text-gray-500">
                                                <div className="flex items-center">
                                                    <Clock className="h-4 w-4 mr-1" />
                                                    {parseInt(content.duration/60)} min
                                                </div>
                                                <div className="flex items-center">
                                                    {content.type === "quiz" ? (
                                                        <span className="text-blue-500">Quiz</span>
                                                    ) : (
                                                        <span className="text-blue-500">Video</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Module Features */}
                                <div className="mt-6 flex gap-4">
                                    {module.moduleCourseFeatureId.map((feature, index) => (
                                        <div key={index} className="flex items-center text-sm text-secondary">
                                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                            {feature}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <DashboardBannerComponent />


            {/* Call to Action */}
            <div className="bg-theme-gradient py-20">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-4xl font-bold text-secondary mb-6">
                            Ready to Transform Your ABAP Career?
                        </h2>
                        <p className="text-gray-600 mb-8 text-lg">
                            Get instant access to all modules and start your journey to becoming an ABAP expert today.
                            Special offer: Save 30% with our complete bundle.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <button className="group bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-500 transition-all flex items-center gap-3 w-full sm:w-auto">
                                <Zap className="h-5 w-5 group-hover:animate-bounce" />
                                Get Complete Bundle
                            </button>
                            <button className="group bg-primary text-primary px-8 py-4 rounded-xl font-semibold border transition-all flex items-center gap-3 w-full sm:w-auto">
                                <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                Learn More
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <CourseRoadmap/>
        </div>
    );
};

export default ExamPage;