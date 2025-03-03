import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TPPGunView = ({ mousePosition, isShooting, isReloading }) => {
    const [recoilOffset, setRecoilOffset] = useState({ x: 0, y: 0 });
    const [gunPosition, setGunPosition] = useState({ x: 0, y: 0 });

    // Get screen center
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    // Handle recoil effect
    useEffect(() => {
        if (isShooting) {
            setRecoilOffset({ x: (Math.random() - 0.5) * 5, y: -10 });

            const resetTimeout = setTimeout(() => {
                setRecoilOffset({ x: 0, y: 0 });
            }, 100);

            return () => clearTimeout(resetTimeout);
        }
    }, [isShooting]);

    // Handle gun movement with mouse
    useEffect(() => {
        const targetX = (mousePosition.x - centerX) * 0.1;
        const targetY = (mousePosition.y - centerY) * 0.1;

        setGunPosition({ x: targetX, y: targetY });
    }, [mousePosition]);

    return (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-40 pointer-events-none">
            {/* Character Model Holding Gun */}
            <motion.div
                className="relative w-40 h-80"
                animate={{ x: gunPosition.x + recoilOffset.x, y: gunPosition.y + recoilOffset.y }}
                transition={{ duration: 0.1 }}
            >
                {/* Character Body */}
                <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-20 h-40 bg-gray-800 rounded-lg shadow-lg" />

                {/* Character Arms */}
                <div className="absolute left-1/2 bottom-10 -translate-x-1/2 w-24 h-10 bg-gray-700 rounded-lg" />

                {/* Gun Model */}
                <div className="absolute left-1/2 bottom-16 -translate-x-1/2 w-24 h-12 bg-gray-900 rounded shadow-lg border border-gray-700">
                    {/* Barrel */}
                    <div className="absolute left-1/2 -top-4 -translate-x-1/2 w-6 h-12 bg-gray-800 rounded-t" />
                    {/* Grip */}
                    <div className="absolute left-1/2 -bottom-4 -translate-x-1/2 w-8 h-10 bg-gray-800 rounded-b" />
                    {/* Magazine */}
                    <div className="absolute left-1/2 bottom-2 -translate-x-1/2 w-6 h-8 bg-gray-700 rounded" />
                </div>

                {/* Muzzle Flash */}
                {isShooting && (
                    <motion.div
                        className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-full"
                        initial={{ scale: 1, opacity: 1 }}
                        animate={{ scale: 1.5, opacity: 0 }}
                        transition={{ duration: 0.1 }}
                    >
                        <div className="relative">
                            <div className="absolute w-16 h-16 bg-orange-500 blur-md rounded-full" />
                            <div className="absolute w-12 h-12 bg-yellow-400 blur-sm rounded-full transform translate-x-2 translate-y-2" />
                            <div className="absolute w-8 h-8 bg-white rounded-full transform translate-x-4 translate-y-4" />
                        </div>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
};

export default TPPGunView;
