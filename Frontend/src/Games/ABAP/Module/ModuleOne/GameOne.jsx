import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Star, Trophy, Sparkles } from 'lucide-react';
import CarPlayer from '../../../../Components/UI/CarPlayer';
import { Howl } from 'howler'; // Import Howler


// Load sounds
const sounds = {
    jump: new Howl({ src: ['/Sounds/jump.wav'], volume: 0.04 }),
    correct: new Howl({ src: ['/Sounds/correct.wav'], volume: 0.08 }),
    wrong: new Howl({ src: ['/sounds/wrong.ogg'], volume: 0.08 }),
    gameover: new Howl({ src: ['/Sounds/gameover.wav'], volume: 0.03 }),
    background: new Howl({ src: ['/Sounds/background.wav'], volume: 0.1, loop: true })
};


const ABAPRunner = ({ score, setScore }) => {
    const [position, setPosition] = useState({ x: 1, y: 0 });
    const [isJumping, setIsJumping] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [roadColors, setRoadColors] = useState(['blue-500', 'blue-500', 'blue-500']);
    const [speedLines, setSpeedLines] = useState([]);
    const [particleEffects, setParticleEffects] = useState([]);
    const [roadOffset, setRoadOffset] = useState(0);
    const [laneStates, setLaneStates] = useState(['default', 'default', 'default']);
    const [carVisible, setCarVisible] = useState(false);


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

    // Create celebration particles
    const createCelebrationEffect = useCallback(() => {
        const particles = [];
        const timestamp = Date.now();

        for (let i = 0; i < 20; i++) {
            const randomAngle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 100 + 50;

            particles.push({
                id: `celebrate-${timestamp}-${i}`,
                x: position.x * 33.33 + 16.67,
                y: position.y,
                targetX: Math.round(Math.cos(randomAngle) * distance),
                targetY: Math.round(Math.sin(randomAngle) * distance),
                color: ['#FFD700', '#FF69B4', '#00FF00', '#4169E1'][Math.floor(Math.random() * 4)]
            });
        }
        return particles;
    }, [position]);

    // Generate speed lines
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

    // Generate new question
    const generateNewQuestion = useCallback(() => {
        if (!gameStarted || gameOver) return;
        const questionIndex = Math.floor(Math.random() * questions.length);
        const newQuestion = questions[questionIndex];
        setCurrentQuestion(newQuestion);
        setPosition({ x: 1, y: 0 });
        setRoadOffset(0);
        setLaneStates(['default', 'default', 'default']);
    }, [gameStarted, gameOver]);

    // Player movement
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
                        setRoadOffset(prev => prev + 50); 
                        sounds.jump.play();
                    }
                    break;
                case 'down':
                    if (prev.y > 0) {
                        newPos.y = prev.y - 10;
                        setRoadOffset(prev => prev - 50);

                    };
                    break;
                default:
                    break;
            }
            return newPos;
        });
    }, [gameStarted, gameOver]);

    // Handle key events
    const handleKeyDown = useCallback((e) => {
        e.preventDefault();
        switch (e.key) {
            case 'ArrowLeft':
                movePlayer('left');
                break;
            case 'ArrowLeft':
            case 'a': 
                movePlayer('left');
                break;
            case 'ArrowRight':
                movePlayer('right');
                break;
            case 'ArrowRight':
            case 'd': 
                movePlayer('right');
                break;
            case 'ArrowUp':
                movePlayer('up');
                if (!isJumping) {
                    setIsJumping(true);
                    setTimeout(() => setIsJumping(false), 500);
                    // sounds.jump.play();
                }
                break;
            case 'ArrowUp':
            case 'w': // Move Up (Jump)
                movePlayer('up');
                if (!isJumping) {
                    setIsJumping(true);
                    sounds.jump.play(); // Play jump sound
                    setTimeout(() => setIsJumping(false), 500);
                }
                break;
            case 'ArrowDown':
                movePlayer('down');
                break;
            case 'ArrowDown':
            case 's': // Move Down
                movePlayer('down');
                break;
            default:
                break;
        }
    }, [movePlayer, isJumping]);

    // Check answer
    const checkAnswer = useCallback(() => {
        if (!currentQuestion || !gameStarted || gameOver) return;

        if (position.y >= 80) {
            if (position.x === currentQuestion.correct) {
                setScore(prev => prev + 10);
                sounds.correct.play(); 
                setParticleEffects(prev => [...prev, ...createCelebrationEffect()]);
                setRoadColors(prev => prev.map((_, i) =>
                    i === currentQuestion.correct ? 'green-500' : 'red-500'
                ));
                setLaneStates(prev => prev.map((_, i) =>
                    i === currentQuestion.correct ? 'correct' : 'wrong'
                ));

                setTimeout(() => {
                    setRoadColors(['blue-500', 'blue-500', 'blue-500']);
                    generateNewQuestion();
                }, 1000);
            } else {
               
                setRoadColors(prev => prev.map((_, i) =>
                    i === currentQuestion.correct ? 'green-500' : 'red-500'
                ));
                sounds.wrong.play();
                setLaneStates(prev => prev.map((_, i) =>
                    i === currentQuestion.correct ? 'correct' : 'wrong'
                ));
                
                setTimeout(() => {
                    sounds.gameover.play();
                    sounds.background.stop(); 
                    setGameOver(true);
                    setCarVisible(false);
                    setCurrentQuestion(null);
                    setPosition({ x: 1, y: 0 });
                }, 1000);
            }
        }
    }, [currentQuestion, gameStarted, gameOver, position, createCelebrationEffect]);

    // Start game
    const startGame = useCallback(() => {
        setGameStarted(true);
        setGameOver(false);
        setScore(0);
        setPosition({ x: 1, y: 0 });
        setRoadOffset(0);
        setLaneStates(['default', 'default', 'default']);
        setRoadColors(['blue-500', 'blue-500', 'blue-500']);
        setIsRunning(false);
        generateSpeedLines();
        sounds.background.play();
        document.getElementById('game-container').focus();
        setCarVisible(true)
    }, [generateSpeedLines]);

    useEffect(() => {
        if (gameStarted && !gameOver) {
            console.log("Generating New Question...");
            generateNewQuestion();
        }
    }, [gameStarted, gameOver, generateNewQuestion]);

    useEffect(() => {
        if (gameStarted && !gameOver) {
            const interval = setInterval(checkAnswer, 100);
            return () => clearInterval(interval);
        }
    }, [gameStarted, gameOver, checkAnswer]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-violet-900 p-8">
            <div className="max-w-6xl mx-auto">
                {/* Game Title */}
                <motion.h1
                    className="text-5xl font-bold text-center mb-8"
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: "spring", duration: 1 }}
                >
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                        {currentQuestion ? currentQuestion.text : "ABAP Runner"}
                    </span>
                </motion.h1>

                {/* Game Container */}
                <div
                    id="game-container"
                    className="relative h-[450px] rounded-3xl overflow-hidden shadow-2xl border border-purple-500/30"
                    tabIndex={0}
                    onKeyDown={handleKeyDown}
                >
                    {/* Road Container */}
                    <div className="absolute inset-0 bg-gray-900">
                        {/* Road */}
                        <div
                            className="absolute w-full h-[2000px] bottom-0 transform-gpu"
                            style={{
                                transform: `translateY(${roadOffset}px)`,
                                transition: 'transform 0.3s ease-out'
                            }}
                        >
                            {/* Lanes */}
                            <div className="relative w-full h-full flex">
                                {laneStates.map((state, index) => (
                                    <div key={index} className="flex-1 relative">
                                        {/* Lane Background */}
                                        <div
                                            className={`absolute inset-0 transition-colors duration-300 ${state === 'correct' ? 'bg-green-600' :
                                                    state === 'wrong' ? 'bg-red-600' :
                                                        'bg-gray-800'
                                                }`}
                                        />

                                        {/* Lane Markings */}
                                        <div className="absolute inset-0 overflow-hidden">
                                            {[...Array(40)].map((_, i) => (
                                                <div
                                                    key={i}
                                                    className="absolute w-[10px] h-[50px] bg-yellow-400 left-1/2 transform -translate-x-1/2"
                                                    style={{
                                                        top: `${i * 100}px`,
                                                    }}
                                                />
                                            ))}
                                        </div>

                                        {/* Answer Box */}
                                        {currentQuestion && (
                                            <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-white text-black px-6 py-3 rounded-xl border border-gray-300 shadow-lg">
                                                <p className="font-semibold">{currentQuestion.answers[index] ?? "No Answer"}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Player */}

                    <CarPlayer position={position} isJumping={isJumping} carVisible={carVisible}/>

                    {/* <motion.div
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
                        <div className="w-12 h-16 bg-gradient-to-r from-blue-400 to-purple-400 rounded-xl shadow-lg">
                            <Code className="w-full h-full p-2 text-white" />
                        </div>
                    </motion.div> */}


                    {/* Start/Game Over Screen */}
                    <AnimatePresence>
                        {(!gameStarted || gameOver) && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center"
                            >
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="text-center p-8 bg-gradient-to-r from-purple-900/50 to-violet-900/50 rounded-2xl border border-purple-500/30"
                                >
                                    <motion.h2
                                        className="text-4xl font-bold mb-6"
                                        animate={{
                                            color: ['#9333EA', '#EC4899', '#9333EA']
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity
                                        }}
                                    >
                                        {gameOver ? 'Game Over!' : 'ABAP Runner'}
                                    </motion.h2>

                                    {gameOver && (
                                        <motion.div
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            className="mb-6"
                                        >
                                            <p className="text-2xl text-white">Final Score: {score}</p>
                                            <Trophy className="w-16 h-16 text-yellow-400 mx-auto mt-4" />
                                        </motion.div>
                                    )}

                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={startGame}
                                        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl text-xl font-bold shadow-lg"
                                    >
                                        {gameOver ? 'Play Again' : 'Start Game'}
                                    </motion.button>

                                    {/* Controls Guide */}
                                    <div className="mt-8 bg-black/30 p-6 rounded-xl text-white space-y-3 backdrop-blur-sm border border-white/10">
                                        <h3 className="text-xl font-semibold mb-4">Controls</h3>
                                        <div className="grid grid-cols-1 gap-4">
                                            <div className="flex items-center justify-center space-x-4">
                                                <div className="flex space-x-2">
                                                    <kbd className="px-3 py-1 bg-white/10 rounded-lg border border-white/20">←</kbd>
                                                    <kbd className="px-3 py-1 bg-white/10 rounded-lg border border-white/20">→</kbd>
                                                    <div>
                                                        |
                                                    </div>
                                                    <kbd className="px-3 py-1 bg-white/10 rounded-lg border border-white/20">A</kbd>
                                                    <kbd className="px-3 py-1 bg-white/10 rounded-lg border border-white/20">D</kbd>
                                                </div>
                                                <span className="text-white/80">Move left/right</span>
                                            </div>
                                            <div className="flex items-center justify-center space-x-4">
                                                <kbd className="px-3 py-1 bg-white/10 rounded-lg border border-white/20">↑</kbd>
                                                <div>|</div>
                                                <kbd className="px-3 py-1 bg-white/10 rounded-lg border border-white/20">W</kbd>

                                                <span className="text-white/80">Move forward</span>
                                            </div>
                                            <div className="flex items-center justify-center space-x-4">
                                                <kbd className="px-3 py-1 bg-white/10 rounded-lg border border-white/20">↓</kbd>
                                                <div>|</div>
                                                <kbd className="px-3 py-1 bg-white/10 rounded-lg border border-white/20">S</kbd>

                                                <span className="text-white/80">Move backward</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Particle Effects */}
                    <AnimatePresence>
                        {particleEffects.map((particle) => (
                            <motion.div
                                key={particle.id}
                                className="absolute"
                                style={{
                                    left: `${particle.x}%`,
                                    top: `${particle.y}%`,
                                }}
                                initial={{
                                    scale: 1,
                                    opacity: 1,
                                    x: 0,
                                    y: 0
                                }}
                                animate={{
                                    scale: 0,
                                    opacity: 0,
                                    x: particle.targetX,
                                    y: particle.targetY
                                }}
                                exit={{ opacity: 0 }}
                                transition={{
                                    duration: 0.8,
                                    ease: "easeOut"
                                }}
                            >
                                <Sparkles
                                    className="w-6 h-6"
                                    style={{ color: particle.color }}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                   
                </div>

                {/* Game Instructions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 text-center text-white/80"
                >
                    <p className="text-lg">
                        Navigate the lanes and choose the correct ABAP answers.
                        Move up to submit your answer!
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default ABAPRunner;