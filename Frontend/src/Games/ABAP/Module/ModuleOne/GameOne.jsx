import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Star, Trophy, Sparkles, Check } from 'lucide-react';

const ABAPRunner = ({score,setScore}) => {
    const [position, setPosition] = useState({ x: 1, y: 0 });
    const [isJumping, setIsJumping] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
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
        {console.log(newQuestion);}
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
                    setCurrentQuestion(null);
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
        <div className="flex items-center justify-center bg-gradient-to-b from-gray-900 via-purple-900 to-violet-900 p-4">
            <div className="w-full max-w-4xl">
                {/* Game Title */}
                <motion.h1
                    className="text-4xl font-bold text-center text-white mb-6 tracking-wider"
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: "spring", duration: 1 }}
                >
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                        {currentQuestion ? currentQuestion.text : "ABAP Runner"}
                    </span>
                </motion.h1>

                {/* Main Game Container */}
                <div
                    id='key-context'
                    className="w-full h-[450px] relative overflow-hidden rounded-2xl shadow-[0_0_50px_rgba(168,85,247,0.3)] border border-purple-500/30"
                    tabIndex={0}
                    onKeyDown={handleKeyDown}
                    onKeyUp={handleKeyUp}
                >
                    {/* Dynamic Background */}
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-indigo-900 to-purple-900">
                        {speedLines.map((line) => (
                            <motion.div
                                key={line.id}
                                className="absolute bg-white/10"
                                style={{
                                    left: `${line.x}%`,
                                    top: `${line.y}%`,
                                    width: `${line.length}px`,
                                    height: "1px",
                                    filter: "blur(1px)"
                                }}
                                animate={{
                                    y: [0, 100],
                                    opacity: [0, 0.3, 0],
                                    x: [0, -100],
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

                    {/* Question Banner */}
                    {/* <AnimatePresence mode="wait">
                        {currentQuestion && (
                            <motion.div
                                key={currentQuestion.text}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ type: "tween", duration: 0.4 }}
                                className="absolute top-2 right-2 transform w-[36rem] z-50"
                            >
                                <div className="bg-black/30 backdrop-blur-sm px-6 py-4 rounded-xl border border-white/10">
                                    <h2 className="text-xl font-medium text-white/90 text-center leading-relaxed">
                                        {currentQuestion.text}
                                    </h2>
                                    <motion.div
                                        className="h-[2px] w-full bg-white/10 mt-3 rounded-full overflow-hidden"
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: 1 }}
                                        transition={{
                                            duration: 15,
                                            ease: "linear"
                                        }}
                                    >
                                        <div className="h-full w-full bg-white/20" />
                                    </motion.div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence> */}

                    {/* Game Lanes */}
                    <div className="absolute bottom-0 w-full h-full flex">
                        {roadColors.map((color, index) => (
                            <div
                                key={index}
                                className=" relative transition-all duration-500 w-full px-2"
                            >
                                <motion.div
                                    className="absolute inset-0 w-full"
                                    animate={{
                                        background: [
                                            `linear-gradient(to bottom, rgba(0,0,0,0), ${color === 'blue-500' ? '#3B82F6' : color === 'green-500' ? '#22C55E' : '#EF4444'}33)`,
                                            `linear-gradient(to bottom, rgba(0,0,0,0), ${color === 'blue-500' ? '#3B82F6' : color === 'green-500' ? '#22C55E' : '#EF4444'}66)`
                                        ]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        repeatType: "reverse"
                                    }}
                                />

                                {currentQuestion && currentQuestion.answers && (
                                    <motion.div
                                        initial={{ y: -30, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: 30, opacity: 0 }}
                                        className="relative top-2 transform -translate-x-0.5 z-40"
                                    >
                                        <div className="bg-white/10 w-full backdrop-blur-md py-4 px-4 rounded-xl text-md font-bold shadow-2xl text-white tracking-wide border border-white/20 text-center transform hover:scale-105 transition-transform">
                                            {currentQuestion.answers[index]}
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Player Character */}
                    <motion.div
                        className="absolute z-50"
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
                                className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-xl shadow-lg"
                                animate={{
                                    scale: isRunning ? [1, 1.1, 1] : 1,
                                    boxShadow: isRunning ?
                                        "0 0 30px rgba(147, 51, 234, 0.5)" :
                                        "0 0 0px rgba(147, 51, 234, 0)"
                                }}
                                transition={{
                                    duration: 0.5,
                                    repeat: isRunning ? Infinity : 0
                                }}
                            >
                                <Code className="w-full h-full p-2 text-white" />
                            </motion.div>

                            {/* Player Glow Effect */}
                            <motion.div
                                className="absolute -inset-2 bg-purple-500 rounded-full opacity-20 blur-md"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.2, 0.3, 0.2]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity
                                }}
                            />
                        </div>
                    </motion.div>

                    

                    {/* Start/Game Over Screen */}
                    <AnimatePresence>
                        {(!gameStarted || gameOver) && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center"
                            >
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="text-center p-8 bg-gradient-to-r from-purple-900/50 to-violet-900/50 rounded-2xl border border-purple-500/30 backdrop-blur-md"
                                >
                                    <motion.h2
                                        className="text-4xl text-white mb-6 font-bold bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"
                                        animate={{
                                            textShadow: [
                                                "0 0 20px rgba(168,85,247,0.5)",
                                                "0 0 40px rgba(168,85,247,0.2)",
                                                "0 0 20px rgba(168,85,247,0.5)"
                                            ]
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity
                                        }}
                                    >
                                        {gameOver ? 'Game Over!' : 'ABAP Runner'}
                                    </motion.h2>

                                    {gameOver && (
                                        <motion.p
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            className="text-2xl text-white mb-6"
                                        >
                                            Final Score: {score}
                                        </motion.p>
                                    )}

                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={startGame}
                                        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl text-xl font-bold shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
                                    >
                                        {gameOver ? 'Play Again' : 'Start Game'}
                                    </motion.button>

                                    {/* Controls Guide */}
                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                        className="mt-8 bg-black/30 p-4 rounded-xl text-white space-y-2 backdrop-blur-sm border border-white/10"
                                    >
                                        <p className="flex items-center justify-center space-x-2">
                                            <span className="px-2 py-1 bg-white/10 rounded">←</span>
                                            <span className="px-2 py-1 bg-white/10 rounded">→</span>
                                            <span className="ml-2">Move left/right</span>
                                        </p>
                                        <p className="flex items-center justify-center space-x-2">
                                            <span className="px-2 py-1 bg-white/10 rounded">↑</span>
                                            <span className="ml-2">Move forward</span>
                                        </p>
                                        <p className="flex items-center justify-center space-x-2">
                                            <span className="px-2 py-1 bg-white/10 rounded">↓</span>
                                            <span className="ml-2">Move backward</span>
                                        </p>
                                    </motion.div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default ABAPRunner;