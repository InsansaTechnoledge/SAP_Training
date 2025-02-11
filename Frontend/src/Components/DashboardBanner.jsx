import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Layout, Activity, Trophy, Lock, ShoppingCart, LogIn } from 'lucide-react';

const DashboardBannerComponent = ({
    isLoggedIn = true,
    isFullCoursePurchased = true,
    onPurchase,
    onLogin
}) => {
    const navigate = useNavigate();

    const stats = [
        { icon: <Activity className="w-5 h-5" />, label: 'Progress', value: '68%' },
        { icon: <Trophy className="w-5 h-5" />, label: 'Achievements', value: '12' },
    ];

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    const handleNavigate = () => {
        if (isFullCoursePurchased) {
            navigate('/dashboard');
        }
    };

    const getActionButton = () => {
        if (!isLoggedIn) {
            return (
                <button
                    onClick={onLogin}
                    className="group flex items-center space-x-2 bg-blue-400 text-contrast px-6 py-3 rounded-xl font-medium shadow-lg hover:bg-blue-300 transition-colors duration-200"
                >
                    <LogIn className="w-5 h-5" />
                    <span>Login to Access</span>
                    <ChevronRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" />
                </button>
            );
        }

        if (isFullCoursePurchased) {
            return (
                <button
                    onClick={handleNavigate}
                    className="group flex items-center space-x-2 bg-primary text-primary px-6 py-3 rounded-xl font-medium shadow-lg hover:bg-blue-50 transition-colors duration-200"
                >
                    <Layout className="w-5 h-5" />
                    <span>Go to Dashboard</span>
                    <ChevronRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" />
                </button>
            );
        }

        return (
            <button
                onClick={onPurchase}
                className="group flex items-center space-x-2 bg-blue-400 text-contrast px-6 py-3 rounded-xl font-medium shadow-lg hover:bg-blue-300 transition-colors duration-200"
            >
                <ShoppingCart className="w-5 h-5" />
                <span>Purchase Full Course</span>
                <ChevronRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" />
            </button>
        );
    };

    return (
        <div className="w-full bg-gradient-to-r from-blue-700 via-blue-600 to-blue-800 overflow-hidden shadow-xl">
            <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <h2 className="text-white text-xl md:text-2xl font-bold">
                                Track Your Learning Journey
                            </h2>
                            {(!isLoggedIn || !isFullCoursePurchased) && (
                                <Lock className="w-5 h-5 text-blue-200" />
                            )}
                        </div>
                        <p className="text-blue-100 text-sm md:text-base mb-4">
                            {!isLoggedIn
                                ? "Login to access your personalized dashboard"
                                : isFullCoursePurchased
                                    ? "Track your progress in your personalized dashboard"
                                    : "Purchase the full course to unlock your personalized dashboard"}
                        </p>

                        <div className="flex flex-wrap gap-4 mb-6">
                            {stats.map((stat, index) => (
                                <div
                                    key={index}
                                    className={`flex items-center rounded-xl px-4 py-2 ${isLoggedIn && isFullCoursePurchased ? 'bg-blue-600/40' : 'bg-blue-800/30'
                                        }`}
                                >
                                    <div className={`mr-2 ${isLoggedIn && isFullCoursePurchased ? 'text-white' : 'text-blue-200'
                                        }`}>
                                        {stat.icon}
                                    </div>
                                    <div>
                                        <p className={`text-sm font-medium ${isLoggedIn && isFullCoursePurchased ? 'text-white' : 'text-blue-200'
                                            }`}>
                                            {isLoggedIn && isFullCoursePurchased ? stat.value : '--'}
                                        </p>
                                        <p className={`text-xs ${isLoggedIn && isFullCoursePurchased ? 'text-blue-100' : 'text-blue-300'
                                            }`}>
                                            {stat.label}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {getActionButton()}
                </div>
            </div>

            <div className="h-2 w-full bg-blue-800/30">
                <div
                    className={`h-full rounded-r-full ${isLoggedIn && isFullCoursePurchased ? 'bg-blue-400' : 'bg-blue-900/30'
                        }`}
                    style={{ width: isLoggedIn && isFullCoursePurchased ? '68%' : '0%' }}
                />
            </div>
        </div>
    );
};

export default DashboardBannerComponent;