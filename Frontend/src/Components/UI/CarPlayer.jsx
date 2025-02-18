import React from 'react';
import { motion } from "framer-motion";

const CarPlayer = ({ position, isJumping, carVisible }) => {
    if(!carVisible){
        return null;
    }
    return (
        <motion.div
            className="absolute z-50 transition-all duration-300"
            style={{
                left: `${(position.x * 33.33) + 16.67}%`,
                bottom: `${position.y}%`
            }}
            animate={{
                rotate: isJumping ? [0, 360] : 0,
                scale: isJumping ? [1, 1.2, 1] : 1
            }}
        >
            <div className="w-12 h-16 relative">
                {/* Extended headlight rays */}
                <div className="absolute top-1 -left-4 w-16 h-12 z-10">
                    <div className="absolute w-full h-full -left-2 -top-1">
                        <div className="absolute w-full h-full animate-pulse">
                            <div className="absolute w-full h-full bg-gradient-to-l from-yellow-100/0 via-yellow-100/30 to-yellow-100/0 transform -rotate-45 scale-x-150" />
                            <div className="absolute w-full h-full bg-gradient-to-l from-yellow-100/0 via-yellow-100/20 to-yellow-100/0 scale-x-150" />
                            <div className="absolute w-full h-full bg-gradient-to-l from-yellow-100/0 via-yellow-100/30 to-yellow-100/0 transform rotate-45 scale-x-150" />
                        </div>
                    </div>
                </div>
                <div className="absolute top-1 -right-4 w-16 h-12 z-10">
                    <div className="absolute w-full h-full -right-2 -top-1">
                        <div className="absolute w-full h-full animate-pulse">
                            <div className="absolute w-full h-full bg-gradient-to-r from-yellow-100/0 via-yellow-100/30 to-yellow-100/0 transform rotate-45 scale-x-150" />
                            <div className="absolute w-full h-full bg-gradient-to-r from-yellow-100/0 via-yellow-100/20 to-yellow-100/0 scale-x-150" />
                            <div className="absolute w-full h-full bg-gradient-to-r from-yellow-100/0 via-yellow-100/30 to-yellow-100/0 transform -rotate-45 scale-x-150" />
                        </div>
                    </div>
                </div>

                {/* Car body */}
                <div className="absolute w-full h-full">
                    {/* Main body shell */}
                    <div className="w-full h-full bg-gradient-to-b from-blue-400 to-blue-600 rounded-lg shadow-lg relative overflow-hidden">
                        {/* Hood */}
                        <div className="absolute top-0 left-0 right-0 h-4 bg-blue-500 rounded-t-lg" />

                        {/* Windshield */}
                        <div className="absolute top-3 left-1 right-1 h-3 bg-gradient-to-b from-sky-200 to-sky-300 rounded-sm transform -skew-y-6" />

                        {/* Side windows */}
                        <div className="absolute top-6 left-1 right-1 h-4 bg-gradient-to-b from-sky-200 to-sky-300 rounded-sm" />

                        {/* Rear window */}
                        <div className="absolute bottom-3 left-1 right-1 h-3 bg-gradient-to-b from-sky-200 to-sky-300 rounded-sm transform skew-y-6" />

                        {/* Headlights with enhanced glow */}
                        <div className="absolute top-1 left-1 w-2 h-1 bg-yellow-100 rounded-sm shadow-[0_0_12px_rgba(255,255,0,0.8)]" />
                        <div className="absolute top-1 right-1 w-2 h-1 bg-yellow-100 rounded-sm shadow-[0_0_12px_rgba(255,255,0,0.8)]" />

                        {/* Taillights */}
                        <div className="absolute bottom-1 left-1 w-2 h-1 bg-red-500 rounded-sm" />
                        <div className="absolute bottom-1 right-1 w-2 h-1 bg-red-500 rounded-sm" />

                        {/* Grille */}
                        <div className="absolute top-2 left-3 right-3 h-1 bg-gray-800 rounded-full" />

                        {/* Door lines */}
                        <div className="absolute top-6 left-0 w-px h-4 bg-blue-700" />
                        <div className="absolute top-6 right-0 w-px h-4 bg-blue-700" />
                    </div>

                    {/* Wheels with rims */}
                    <div className="absolute -left-1 top-3 w-2 h-2 bg-gray-800 rounded-full">
                        <div className="absolute inset-0.5 bg-gray-400 rounded-full" />
                    </div>
                    <div className="absolute -right-1 top-3 w-2 h-2 bg-gray-800 rounded-full">
                        <div className="absolute inset-0.5 bg-gray-400 rounded-full" />
                    </div>
                    <div className="absolute -left-1 bottom-3 w-2 h-2 bg-gray-800 rounded-full">
                        <div className="absolute inset-0.5 bg-gray-400 rounded-full" />
                    </div>
                    <div className="absolute -right-1 bottom-3 w-2 h-2 bg-gray-800 rounded-full">
                        <div className="absolute inset-0.5 bg-gray-400 rounded-full" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default CarPlayer;