import React, { useState, useEffect } from 'react';
import ABAPShooterGame from '../Games/ABAP/Module/ModuleOne/GameThree';


// Main wrapper component
const AimABAPGameWrapper = ({ onClose }) => {
    const [showExitConfirmation, setShowExitConfirmation] = useState(false);

    // Handle escape key for exit prompt
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setShowExitConfirmation(true);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Confirm exit game
    const handleConfirmExit = () => {
        onClose();
    };

    // Cancel exit and continue playing
    const handleCancelExit = () => {
        setShowExitConfirmation(false);
    };

    return (
        <div className="fixed inset-0 z-50 bg-black">
            {/* Game component */}
            <ABAPShooterGame />

            {/* Exit button */}
            <button
                className="absolute top-4 right-4 z-[60] bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
                onClick={() => setShowExitConfirmation(true)}
            >
                Exit Game
            </button>

            {/* Exit confirmation modal */}
            {showExitConfirmation && (
                <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 backdrop-blur-sm">
                    <div className="bg-gray-900 border-2 border-blue-500 rounded-xl p-6 w-full max-w-sm">
                        <h2 className="text-xl font-bold text-white mb-3">Exit Game?</h2>
                        <p className="text-gray-300 mb-4">Your current game progress will be lost.</p>

                        <div className="flex space-x-3">
                            <button
                                onClick={handleConfirmExit}
                                className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg"
                            >
                                Exit
                            </button>
                            <button
                                onClick={handleCancelExit}
                                className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg"
                            >
                                Continue Playing
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// Integration with main application
const withAimABAPGame = (WrappedComponent) => {
    return function WithAimABAPGameHOC(props) {
        const [isGameActive, setIsGameActive] = useState(false);

        const launchGame = () => {
            setIsGameActive(true);
        };

        const closeGame = () => {
            setIsGameActive(false);
        };

        return (
            <>
                <WrappedComponent {...props} onSelectAimABAPGame={launchGame} />

                {isGameActive && (
                    <AimABAPGameWrapper onClose={closeGame} />
                )}
            </>
        );
    };
};

export { withAimABAPGame, AimABAPGameWrapper };