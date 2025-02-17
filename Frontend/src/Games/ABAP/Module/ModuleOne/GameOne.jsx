import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Star, Trophy, Sparkles, Check } from 'lucide-react';

const ABAPRunner = () => {
    const [position, setPosition] = useState({ x: 1, y: 0 });
    const [isJumping, setIsJumping] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const [score, setScore] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [questionBanner, setQuestionBanner] = useState(null);
    const [roadColors, setRoadColors] = useState(['blue-500', 'blue-500', 'blue-500']);
    const [collectibles, setCollectibles] = useState([]);
    const [speedLines, setSpeedLines] = useState([]);
    const [particleEffects, setParticleEffects] = useState([]);
    const [pathHighlight, setPathHighlight] = useState(false);
    const [correctAnswerEffect, setCorrectAnswerEffect] = useState(false);
    const [showNextQuestion, setShowNextQuestion] = useState(true);
    const [isPaused, setIsPaused] = useState(false);


    const questions = [
        {
            text: "Which ABAP statement declares a variable?",
            answers: ["DATA", "VAR", "LET"],
            correct: 0,
            explanation: "DATA statement is used to declare variables in ABAP"
        },
        {
            text: "What data type stores whole numbers in ABAP?",
            answers: ["INT4", "CHAR", "STRING"],
            correct: 0,
            explanation: "INT4 is used for whole numbers in ABAP"
        },
        {
            text: "Which starts a loop in ABAP?",
            answers: ["LOOP", "FOR", "WHILE"],
            correct: 0,
            explanation: "LOOP AT is used to iterate through internal tables"
        }
    ];

    const questionTree = [
        { id: 1, level: 'Basic', title: 'ABAP Syntax Basics', status: 'completed', score: 95 },
        { id: 2, level: 'Basic', title: 'Data Types Overview', status: 'current', score: 0 },
        { id: 3, level: 'Intermediate', title: 'Control Structures', status: 'locked', score: 0 },
        { id: 4, level: 'Intermediate', title: 'Modularization', status: 'locked', score: 0 },
        { id: 5, level: 'Advanced', title: 'Object Oriented ABAP', status: 'locked', score: 0 }
    ];


    // Function to create celebration particles
    const createCelebrationEffect = useCallback(() => {
        const particles = [];
        const timestamp = Date.now(); // Ensure uniqueness across function calls

        for (let i = 0; i < 20; i++) {
            const randomAngle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 100 + 50;

            particles.push({
                id: `celebrate-${timestamp}-${i}-${Math.random()}`, // ✅ Ensuring truly unique key
                x: position.x * 33.33 + 16.67,
                y: position.y,
                targetX: Math.round(Math.cos(randomAngle) * distance), // ✅ Ensure integer values
                targetY: Math.round(Math.sin(randomAngle) * distance),
                color: ['#FFD700', '#FF69B4', '#00FF00', '#4169E1'][Math.floor(Math.random() * 4)]
            });
        }
        return particles;
    }, [position]);


    // Fixed collectibles generation
    const generateCollectibles = useCallback(() => {
        const newCollectibles = [];
        for (let i = 0; i < 5; i++) {
            newCollectibles.push({
                id: `collectible-${Date.now()}-${i}`, // Added unique ID
                x: Math.floor(Math.random() * 3),
                y: Math.random() * 60 + 20,
                collected: false
            });
        }
        setCollectibles(newCollectibles);
    }, []);

    // Fixed question generation
    const generateNewQuestion = useCallback(() => {
        if (!gameStarted || gameOver) return;

        setShowNextQuestion(false);
        const questionIndex = Math.floor(Math.random() * questions.length);
        const newQuestion = { ...questions[questionIndex] };

        // Immediate question setting instead of delayed
        setCurrentQuestion(newQuestion);
        setQuestionBanner(true);
        setPosition({ x: 1, y: 0 });
        setShowNextQuestion(true);

        // Shorter banner display time
        setTimeout(() => setQuestionBanner(false), 2000);
    }, [gameStarted, gameOver]);

    // Fixed speed lines generation with correct animation values
    const generateSpeedLines = useCallback(() => {
        const lines = [];
        for (let i = 0; i < 20; i++) {
            lines.push({
                id: `line-${Date.now()}-${i}`,
                x: Math.random() * 100,
                y: Math.random() * 100,
                length: Math.random() * 100 + 50,
                speed: Math.random() * 2 + 1
            });
        }
        setSpeedLines(lines);
    }, []);

    // Fixed particle generation
    const generateParticle = useCallback((x, y) => {
        const newParticle = {
            id: `particle-${Date.now()}`,
            x,
            y,
            scale: Math.random() * 0.5 + 0.5,
            opacity: 1
        };
        setParticleEffects(prev => [...prev, newParticle]);
        setTimeout(() => {
            setParticleEffects(prev => prev.filter(p => p.id !== newParticle.id));
        }, 1000);
    }, []);



    // Fixed player movement
    const movePlayer = useCallback((direction) => {
        if (!gameStarted || gameOver) return;

        setPosition(prev => {
            const newPos = { ...prev };
            switch (direction) {
                case 'left':
                    if (prev.x > 0) newPos.x = prev.x - 1;
                    break;
                case 'right':
                    if (prev.x < 2) newPos.x = prev.x + 1;
                    break;
                case 'up':
                    if (prev.y < 90) {
                        newPos.y = prev.y + 10;
                        generateParticle(prev.x * 33.33 + 16.67, prev.y);
                        setPathHighlight(true);
                    }
                    break;
                case 'down':
                    if (prev.y > 0) {
                        newPos.y = prev.y - 10;
                        generateParticle(prev.x * 33.33 + 16.67, prev.y);
                        setPathHighlight(true);
                    }
                        break;
                default:
                    break;
            }
            return newPos;
        });

        // Check collectible collection with proper ID handling
        setCollectibles(prev => prev.map(collectible => {
            if (!collectible.collected &&
                Math.abs(collectible.x - position.x) < 1 &&
                Math.abs(collectible.y - position.y) < 10) {
                setScore(s => s + 5);
                return { ...collectible, collected: true };
            }
            return collectible;
        }));
    }, [gameStarted, gameOver, position, generateParticle]);


    const handleKeyDown = useCallback((e) => {
        e.preventDefault();
        switch (e.key) {
            case 'ArrowLeft':
                movePlayer('left');
                break;
            case 'ArrowRight':
                movePlayer('right');
                break;
            case 'ArrowUp':
                movePlayer('up');
                if (!isJumping) {
                    setIsJumping(true);
                    setTimeout(() => setIsJumping(false), 500);
                }
                break;
            case 'ArrowDown':
                movePlayer('down');
                // setIsRunning(true);
                break;
            default:
                break;
        }
    }, [movePlayer, isJumping]);

    const handleKeyUp = useCallback((e) => {
        if (e.key === 'ArrowDown') {
            setIsRunning(false);
        }
    }, []);

    // Fixed answer checking
    const checkAnswer = useCallback(() => {
        if (!currentQuestion || !gameStarted || gameOver) return;

        if (position.y >= 80) {
            if (position.x === currentQuestion.correct) {
                setScore(prev => prev + 10);
                setCorrectAnswerEffect(true);

                // ✅ Append new celebration effects without overwriting existing ones
                setParticleEffects(prev => [...prev, ...createCelebrationEffect()]);

                setRoadColors(prev => prev.map((_, i) =>
                    i === currentQuestion.correct ? 'green-500' : 'red-500'
                ));

                setTimeout(() => {
                    setCorrectAnswerEffect(false);
                    setRoadColors(['blue-500', 'blue-500', 'blue-500']);
                    generateNewQuestion();
                }, 1500);
            } else {
                setRoadColors(prev => prev.map((_, i) =>
                    i === currentQuestion.correct ? 'green-500' : 'red-500'
                ));
                setTimeout(() => {
                    setGameOver(true);
                    setPosition({ x: 1, y: 0 });
                }, 1000);
            }
        }
    }, [currentQuestion, position, gameStarted, gameOver, generateNewQuestion, createCelebrationEffect]);

    useEffect(() => {
        if (gameStarted && !gameOver) {
            generateNewQuestion();
        }
    }, [gameStarted, gameOver, generateNewQuestion]);

    useEffect(() => {
        if (gameStarted && !gameOver) {
            const interval = setInterval(checkAnswer, 100);
            return () => clearInterval(interval);
        }
    }, [gameStarted, gameOver, checkAnswer]);

    // Fixed game initialization
    const startGame = useCallback(() => {
        setGameStarted(true);
        setGameOver(false);
        setScore(0);
        setPosition({ x: 1, y: 0 });
        setRoadColors(['blue-500', 'blue-500', 'blue-500']);
        setIsRunning(false);
        setCurrentQuestion(null);
        setShowNextQuestion(true);
        generateCollectibles();
        generateSpeedLines();
        // Immediate question generation
        generateNewQuestion();
        document.getElementById('key-context').focus();

    }, [generateCollectibles, generateSpeedLines, generateNewQuestion]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
            <div
                id='key-context'
                className="w-full max-w-2xl h-[600px] bg-gray-800 relative overflow-hidden rounded-lg shadow-xl"
                tabIndex={0}
                onKeyDown={handleKeyDown}
                onKeyUp={handleKeyUp}
            >
                {/* Fixed Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-blue-900 to-blue-800">
                    {speedLines.map((line) => (
                        <motion.div
                            key={line.id}
                            className="absolute bg-white/20 h-px"
                            style={{
                                left: `${line.x}%`,
                                top: `${line.y}%`,
                                width: `${line.length}px`,
                            }}
                            animate={{
                                y: [0, 100],  // Fixed: Use percentage strings
                                opacity: [0, 0.5, 0],
                                x: [0, -100], // Fixed: Use percentage strings
                                rotate: -45
                            }}
                            transition={{
                                duration: line.speed,
                                repeat: Infinity,
                                ease: 'linear'
                            }}
                        />
                    ))}
                </div>


                {/* Path Highlight Effect */}
                {pathHighlight && (
                    <motion.div
                        className="absolute bottom-0 w-1/3 h-full"
                        style={{
                            left: `${position.x * 33.33}%`
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.2 }}
                        exit={{ opacity: 0 }}
                    >
                        <div className="h-full w-full bg-gradient-to-t from-blue-500/20 to-transparent" />
                    </motion.div>
                )}

                {/* Particle Effects */}
                <AnimatePresence>
                    {particleEffects.map((particle) => (
                        <motion.div
                            key={particle.id}
                            className="absolute w-3 h-3 rounded-full"
                            style={{
                                backgroundColor: particle.color,
                                left: `${particle.x}%`,
                                bottom: `${particle.y}%`
                            }}
                            initial={{ scale: 0, x: 0, y: 0 }}
                            animate={{
                                scale: [1, 0.8, 0],
                                x: particle.targetX || 0,  // ✅ Ensure x is always a number
                                y: particle.targetY || 0,  // ✅ Ensure y is always a number
                                opacity: [1, 0.5, 0]
                            }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{
                                duration: 0.8,
                                ease: "easeOut"
                            }}
                        />
                    ))}
                </AnimatePresence>



                {/* Dynamic Background
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-blue-900 to-blue-800">
                    {[...Array(30)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute bg-white w-1 h-1 rounded-full"
                            animate={{
                                y: ['-100%', '100%'],
                                opacity: [0, 1, 0]
                            }}
                            transition={{
                                duration: Math.random() * 3 + 2,
                                repeat: Infinity,
                                delay: Math.random() * 2
                            }}
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `-20px`
                            }}
                        />
                    ))}
                </div> */}

                {/* Modified Question Banner with improved visibility */}
                <AnimatePresence mode="wait">
                    {currentQuestion && (
                        <motion.div
                            key={currentQuestion.text}
                            initial={{ y: -100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 100, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            className="absolute top-6 left-1/2 transform -translate-x-1/2 w-11/12 z-50"
                        >
                            <div className="bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 px-8 py-5 rounded-xl shadow-2xl border border-white/20 backdrop-blur-lg">
                                <h2 className="text-2xl font-extrabold text-white text-center drop-shadow-lg tracking-wide">
                                    {currentQuestion.text}
                                </h2>
                                <div className="h-1 w-full bg-white/40 mt-2 rounded-full animate-pulse" />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>


                {/* Fixed Correct Answer Animation */}
                <AnimatePresence>
                    {correctAnswerEffect && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            transition={{ duration: 0.5 }}
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                        >
                            <div className="bg-green-500 rounded-full p-8">
                                <Check className="w-16 h-16 text-white" />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Fixed Celebration Particles */}
                <AnimatePresence>
                    {particleEffects.map((particle) => (
                        <motion.div
                            key={particle.id}
                            className="absolute w-3 h-3 rounded-full"
                            style={{
                                backgroundColor: particle.color,
                                left: `${particle.x}%`,
                                bottom: `${particle.y}%`
                            }}
                            initial={{ scale: 0, x: 0, y: 0 }}
                            animate={{
                                scale: [1, 0.8, 0],
                                x: particle.targetX || 0,  // ✅ Ensure x is always a number
                                y: particle.targetY || 0,  // ✅ Ensure y is always a number
                                opacity: [1, 0.5, 0]
                            }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{
                                duration: 0.8,
                                ease: "easeOut"
                            }}
                        />
                    ))}
                </AnimatePresence>




                {/* Modified Game Lanes with improved answer visibility */}
                <div className="absolute bottom-0 w-full h-full flex">
                    {roadColors.map((color, index) => (
                        <div
                            key={index}
                            className={`w-1/3 relative bg-gradient-to-b from-black via-${color} to-gray-900 border-x-2 border-white/10 shadow-[inset_0_0_10px_rgba(255,255,255,0.1)] transition-all duration-500`}
                        >
                            {currentQuestion && currentQuestion.answers && (
                                <motion.div
                                    initial={{ y: -30, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: 30, opacity: 0 }}
                                    transition={{ type: "spring", stiffness: 150, damping: 20 }}
                                    className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-11/12 z-40"
                                >
                                    <div className="bg-white/20 backdrop-blur-md p-4 rounded-lg text-xl font-bold shadow-xl text-white tracking-wide border border-white/10 text-center">
                                        {currentQuestion.answers[index]}
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Enhanced Collectibles */}
                {collectibles.map((collectible, index) => (
                    !collectible.collected && (
                        <motion.div
                            key={index}
                            className="absolute"
                            style={{
                                left: `${(collectible.x * 33.33) + 16.67}%`,
                                bottom: `${collectible.y}%`
                            }}
                            animate={{
                                y: [0, -10, 0],
                                rotate: [0, 360],
                                scale: [1, 1.2, 1]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity
                            }}
                        >
                            <motion.div
                                animate={{
                                    boxShadow: [
                                        "0 0 0px rgba(234, 179, 8, 0)",
                                        "0 0 20px rgba(234, 179, 8, 0.5)",
                                        "0 0 0px rgba(234, 179, 8, 0)"
                                    ]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity
                                }}
                            >
                                <Star className="w-4 h-4 text-yellow-400" />
                            </motion.div>
                        </motion.div>
                    )
                ))}

                {/* Enhanced Player Character */}
                <motion.div
                    className="absolute"
                    style={{
                        left: `${(position.x * 33.33) + 16.67}%`,
                        bottom: `${position.y}%`
                    }}
                    animate={{
                        rotate: isJumping ? [0, 360] : 0,
                        scale: isRunning ? [1, 1.1, 1] : 1
                    }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                    <div className="w-8 h-12 relative">
                        <motion.div
                            className="absolute inset-0 bg-blue-400 rounded-lg shadow-lg"
                            animate={{
                                scale: isRunning ? [1, 1.1, 1] : 1,
                                boxShadow: isRunning ?
                                    "0 0 20px rgba(59, 130, 246, 0.5)" :
                                    "0 0 0px rgba(59, 130, 246, 0)"
                            }}
                            transition={{
                                duration: 0.5,
                                repeat: isRunning ? Infinity : 0
                            }}
                        >
                            <Code className="w-full h-full p-1 text-blue-600" />
                        </motion.div>

                        {/* Running Trail Effect */}
                        {isRunning && (
                            <motion.div
                                className="absolute -bottom-4 left-1/2 transform -translate-x-1/2"
                                animate={{
                                    scale: [1, 1.5, 1],
                                    opacity: [0.5, 0, 0]
                                }}
                                transition={{ duration: 0.5, repeat: Infinity }}
                            >
                                <div className="w-8 h-8 bg-blue-300 rounded-full blur-sm" />
                            </motion.div>
                        )}
                    </div>
                </motion.div>

                {/* HUD */}
                <div className="absolute top-2 left-2 bg-black/50 p-2 rounded-lg">
                    <div className="flex items-center space-x-2">
                        <Trophy className="text-yellow-400 w-4 h-4" />
                        <span className="text-white text-sm font-bold">Score: {score}</span>
                    </div>
                </div>

                {/* Controls Guide */}
                <div className="absolute top-2 right-2 bg-black/50 p-2 rounded-lg text-white text-xs">
                    <p>← → Move left/right</p>
                    <p>↑ Move forward</p>
                    <p>↓ Move backward</p>
                </div>

                {/* Start/Game Over Screen */}
                <AnimatePresence>
                    {(!gameStarted || gameOver) && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/80 flex items-center justify-center"
                        >
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="text-center"
                            >
                                <h2 className="text-3xl text-white mb-4 font-bold">
                                    {gameOver ? 'Game Over!' : 'ABAP Runner'}
                                </h2>
                                {gameOver && (
                                    <p className="text-xl text-white mb-4">Final Score: {score}</p>
                                )}
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={startGame}
                                    className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-600 transition-colors"
                                >
                                    {gameOver ? 'Play Again' : 'Start Game'}
                                </motion.button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ABAPRunner;