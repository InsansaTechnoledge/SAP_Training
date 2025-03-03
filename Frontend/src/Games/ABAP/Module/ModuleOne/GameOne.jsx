import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Star, Trophy, Sparkles } from 'lucide-react';
import CarPlayer from '../../../../Components/UI/CarPlayer';
import { Howl } from 'howler';

// Load sounds
const sounds = {
    jump: new Howl({
        src: ['/Sounds/jump.wav'],
        volume: 0.04,
        html5: true
    }),
    correct: new Howl({
        src: ['/Sounds/correct.wav'],
        volume: 0.08,
        html5: true
    }),
    wrong: new Howl({
        src: ['/sounds/wrong.ogg'],
        volume: 0.08,
        html5: true
    }),
    gameover: new Howl({
        src: ['/Sounds/gameover.wav'],
        volume: 0.03,
        html5: true
    }),
    background: new Howl({
        src: ['/Sounds/background.wav'],
        volume: 0.1,
        loop: true,
        html5: true,
        onloaderror: function (id, err) {
            console.error('Background music loading error:', err);
        },
        onplayerror: function (id, err) {
            console.error('Background music play error:', err);
            // Attempt to recover from play error
            sounds.background.once('unlock', function () {
                sounds.background.play();
            });
        }
    })
};

const ABAPRunner = ({ score, setScore, audioSettings }) => {
    const [position, setPosition] = useState({ x: 1, y: 0 });
    const [isJumping, setIsJumping] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [gameCompleted, setGameCompleted] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [roadColors, setRoadColors] = useState(['blue-500', 'blue-500', 'blue-500']);
    const [speedLines, setSpeedLines] = useState([]);
    const [particleEffects, setParticleEffects] = useState([]);
    const [roadOffset, setRoadOffset] = useState(0);
    const [laneStates, setLaneStates] = useState(['default', 'default', 'default']);
    const [carVisible, setCarVisible] = useState(false);
    const [answeredQuestions, setAnsweredQuestions] = useState([]);

    const questions = [
        [
           
        {
            id: 23,
            text: "Which ABAP statement declares a variable?",
            answers: [
                "DATA",
                "VAR",
                "LET"
            ],
            correct: 0,
            explanation: "DATA statement is used to declare variables in ABAP"
        },
        {
            id: 22,
            text: "What data type stores whole numbers in ABAP?",
            answers: [
                "INT4",
                "CHAR",
                "STRING"
            ],
            correct: 0,
            explanation: "INT4 is used for whole numbers in ABAP"
        },
        {
            id: 21,
            text: "Which starts a loop in ABAP?",
            answers: [
                "LOOP",
                "FOR",
                "WHILE"
            ],
            correct: 0,
            explanation: "LOOP AT is used to iterate through internal tables"
        },
        {
            id: 1,
            text: "What does ABAP stand for?",
            answers: [
                "Automated Business Application Process",
                "Applied Business Application Program",
                "Advanced Business Application Programming"
            ],
            correct: 2,
            explanation: "ABAP stands for Advanced Business Application Programming, a language used in SAP systems."
        },
        {
            id: 2,
            text: "Which environment is used for ABAP development?",
            answers: [
                "Eclipse IDE",
                "Visual Studio",
                "ABAP Workbench"
            ],
            correct: 2,
            explanation: "ABAP Workbench (SE80) is the primary environment for ABAP development."
        },
        {
            id: 3,
            text: "Which statement is used to declare a constant in ABAP?",
            answers: [
                "DATA",
                "DEFINE",
                "CONSTANTS"
            ],
            correct: 2,
            explanation: "The CONSTANTS statement is used to declare a constant in ABAP."
        },
        {
            id: 4,
            text: "Which of the following is NOT a valid ABAP data type?",
            answers: [
                "DECIMAL",
                "NUMERIC",
                "STRING"
            ],
            correct: 1,
            explanation: "NUMERIC is not a valid ABAP data type; instead, we use types like INTEGER or PACKED."
        },
        {
            id: 5,
            text: "Which statement is used to display output in ABAP?",
            answers: [
                "DISPLAY",
                "WRITE",
                "PRINT"
            ],
            correct: 1,
            explanation: "The WRITE statement is used to output data in ABAP."
        },
        {
            id: 6,
            text: "Which of these is a built-in numeric data type in ABAP?",
            answers: [
                "STRING",
                "DEC",
                "CHAR"
            ],
            correct: 1,
            explanation: "DEC (Packed Number) is a built-in numeric data type in ABAP."
        },
        {
            id: 7,
            text: "Which statement defines an internal table in ABAP?",
            answers: [
                "TABLE",
                "TYPES",
                "DATA"
            ],
            correct: 1,
            explanation: "TYPES statement is used to define internal tables and structures in ABAP."
        },
        {
            id: 8,
            text: "Which of these is a valid ABAP loop statement?",
            answers: [
                "DO",
                "UNTIL",
                "FOR"
            ],
            correct: 0,
            explanation: "The DO statement is used to create a loop in ABAP."
        },
        {
            id: 9,
            text: "Which keyword is used to stop a loop in ABAP?",
            answers: [
                "STOP",
                "BREAK",
                "EXIT"
            ],
            correct: 2,
            explanation: "The EXIT statement is used to terminate a loop in ABAP."
        },
        {
            id: 10,
            text: "Which of these statements is used for conditional execution in ABAP?",
            answers: [
                "CASE",
                "LOOP",
                "SELECT"
            ],
            correct: 0,
            explanation: "CASE statement is used for conditional execution in ABAP."
        },
        {
            id: 11,
            text: "Which ABAP statement is used to define a structure?",
            answers: [
                "DATA",
                "TABLES",
                "TYPES"
            ],
            correct: 2,
            explanation: "TYPES statement is used to define structures in ABAP."
        },
        {
            id: 12,
            text: "Which ABAP statement is used to perform string operations?",
            answers: [
                "JOIN",
                "CONCATENATE",
                "MERGE"
            ],
            correct: 1,
            explanation: "CONCATENATE is used to join multiple strings in ABAP."
        },
        {
            id: 13,
            text: "Which statement is used for database queries in ABAP?",
            answers: [
                "FETCH",
                "QUERY",
                "SELECT"
            ],
            correct: 2,
            explanation: "SELECT statement is used to retrieve data from the database."
        },
        {
            id: 14,
            text: "What is the purpose of the CLEAR statement in ABAP?",
            answers: [
                "Deletes a variable",
                "Initializes a variable with zero",
                "Resets a variable to its default value"
            ],
            correct: 2,
            explanation: "CLEAR resets a variable to its default initial value."
        },
        {
            id: 15,
            text: "Which statement is used to loop through an internal table?",
            answers: [
                "LOOP AT",
                "ITERATE",
                "WHILE"
            ],
            correct: 0,
            explanation: "LOOP AT is used to iterate through an internal table."
        },
        {
            id: 16,
            text: "Which keyword is used to define a subroutine in ABAP?",
            answers: [
                "METHOD",
                "PROCEDURE",
                "FORM"
            ],
            correct: 2,
            explanation: "FORM is used to define subroutines in ABAP."
        },
        {
            id: 17,
            text: "Which statement is used to call a function module in ABAP?",
            answers: [
                "CALL FUNCTION",
                "EXECUTE FUNCTION",
                "INVOKE FUNCTION"
            ],
            correct: 0,
            explanation: "CALL FUNCTION is used to execute function modules in ABAP."
        },
        {
            id: 18,
            text: "Which statement is used to handle exceptions in ABAP?",
            answers: [
                "EXCEPTION HANDLER",
                "HANDLE ERROR",
                "TRY...CATCH"
            ],
            correct: 2,
            explanation: "TRY...CATCH is used to handle exceptions in ABAP."
        },
        {
            id: 19,
            text: "What does the CONTINUE statement do inside a loop?",
            answers: [
                "Repeats the same iteration",
                "Skips the current iteration and moves to the next",
                "Exits the loop"
            ],
            correct: 1,
            explanation: "CONTINUE statement skips the current iteration and proceeds to the next iteration in the loop."
        },
        {
            id: 20,
            text: "Which statement is used to terminate a program in ABAP?",
            answers: [
                "EXIT PROGRAM",
                "LEAVE PROGRAM",
                "END"
            ],
            correct: 1,
            explanation: "LEAVE PROGRAM statement is used to terminate an ABAP program."
        }
        ]

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

    // Effect to initialize sounds with current audio settings
    useEffect(() => {
        const updateVolumes = () => {
            const masterVolume = audioSettings.isMuted ? 0 : audioSettings.masterVolume / 100;

            // Update background music volume without stopping
            const bgVolume = (audioSettings.backgroundMusic / 100) * masterVolume;
            if (sounds.background.playing()) {
                sounds.background.volume(bgVolume);
            }

            // Update other sound volumes
            sounds.jump.volume((audioSettings.jumpSound / 100) * masterVolume);
            sounds.correct.volume((audioSettings.correctSound / 100) * masterVolume);
            sounds.wrong.volume((audioSettings.wrongSound / 100) * masterVolume);
            sounds.gameover.volume((audioSettings.gameoverSound / 100) * masterVolume);
        };

        updateVolumes();

        // Make sounds accessible globally
        window.sounds = sounds;

        return () => {
            delete window.sounds;
        };
    }, [audioSettings]);

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
        if (!gameStarted || gameOver || gameCompleted) return;

        // Filter out questions that have already been answered
        // Change this line in the generateNewQuestion function:
        const unansweredQuestions = questions[0].filter(q => !answeredQuestions.includes(q.id));
        // Check if all questions have been answered
        if (unansweredQuestions.length === 0) {
            setGameCompleted(true);
            sounds.background.stop();
            setCarVisible(false);
            setCurrentQuestion(null);
            return;
        }

        // Select a random unanswered question
        const questionIndex = Math.floor(Math.random() * unansweredQuestions.length);
        const newQuestion = unansweredQuestions[questionIndex];
        setCurrentQuestion(newQuestion);
        setPosition({ x: 1, y: 0 });
        setRoadOffset(0);
        setLaneStates(['default', 'default', 'default']);
    }, [gameStarted, gameOver, gameCompleted, answeredQuestions]);

    // Player movement
    const movePlayer = useCallback((direction) => {
        if (!gameStarted || gameOver || gameCompleted) return;

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
                    }
                    break;
                default:
                    break;
            }
            return newPos;
        });
    }, [gameStarted, gameOver, gameCompleted]);

    // Handle key events
    const handleKeyDown = useCallback((e) => {
        e.preventDefault();
        switch (e.key) {
            case 'ArrowLeft':
            case 'a':
                movePlayer('left');
                break;
            case 'ArrowRight':
            case 'd':
                movePlayer('right');
                break;
            case 'ArrowUp':
            case 'w':
                movePlayer('up');
                if (!isJumping) {
                    setIsJumping(true);
                    sounds.jump.play();
                    setTimeout(() => setIsJumping(false), 0);
                }
                break;
            case 'ArrowDown':
            case 's':
                movePlayer('down');
                break;
            default:
                break;
        }
    }, [movePlayer, isJumping]);

    // Check answer
    const checkAnswer = useCallback(() => {
        if (!currentQuestion || !gameStarted || gameOver || gameCompleted) return;

        if (position.y >= 80) {
            if (position.x === currentQuestion.correct) {
                // Mark this question as answered
                setAnsweredQuestions(prev => [...prev, currentQuestion.id]);

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
    }, [currentQuestion, gameStarted, gameOver, gameCompleted, position, createCelebrationEffect, generateNewQuestion]);

    // Start game
    const startGame = useCallback(() => {
        setGameStarted(true);
        setGameOver(false);
        setGameCompleted(false);
        setScore(0);
        setPosition({ x: 1, y: 0 });
        setRoadOffset(0);
        setLaneStates(['default', 'default', 'default']);
        setRoadColors(['blue-500', 'blue-500', 'blue-500']);
        setIsRunning(false);
        setAnsweredQuestions([]);
        generateSpeedLines();

        if (!sounds.background.playing()) {
            sounds.background.play();
        }

        sounds.background.play();
        document.getElementById('game-container').focus();
        setCarVisible(true);
    }, [generateSpeedLines]);

    useEffect(() => {
        if (gameStarted && !gameOver && !gameCompleted) {
            console.log("Generating New Question...");
            generateNewQuestion();
        }
    }, [gameStarted, gameOver, gameCompleted, generateNewQuestion]);

    useEffect(() => {
        if (gameStarted && !gameOver && !gameCompleted) {
            const interval = setInterval(checkAnswer, 100);
            return () => clearInterval(interval);
        }
    }, [gameStarted, gameOver, gameCompleted, checkAnswer]);

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
                    onKeyDown={position.y === 80 ? null : handleKeyDown}
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
                            <div className="w-full h-full flex">
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
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Answer Box */}
                    <div className='absolute bottom-12 w-full grid grid-cols-3 gap-x-6 px-3'>
                        {
                            laneStates.map((state, index) => {
                                if (currentQuestion) {
                                    return (
                                        <div key={index} className="text-center relative left-1/2 transform -translate-x-1/2 bg-white text-black px-6 py-3 rounded-xl border border-gray-300 shadow-lg">
                                            <p className="font-semibold">
                                                {currentQuestion.answers[index] !== undefined ? currentQuestion.answers[index] : "No Answer"}
                                            </p>
                                        </div>
                                    )
                                }
                                return null;
                            })
                        }
                    </div>

                    {/* Player */}
                    <CarPlayer position={position} isJumping={isJumping} carVisible={carVisible} />

                    {/* Start/Game Over/Completion Screen */}
                    <AnimatePresence>
                        {(!gameStarted || gameOver || gameCompleted) && (
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
                                        {gameCompleted ? 'Success!' : gameOver ? 'Game Over!' : 'ABAP Runner'}
                                    </motion.h2>

                                    {(gameOver || gameCompleted) && (
                                        <motion.div
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            className="mb-6"
                                        >
                                            <p className="text-2xl text-white">Final Score: {score}</p>
                                            {gameCompleted && (
                                                <div className="mt-4">
                                                    <p className="text-xl text-green-400">Congratulations! You've completed all questions!</p>
                                                    <div className="flex justify-center mt-4">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star key={i} className="w-8 h-8 text-yellow-400 mx-1" />
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                            {gameOver && (
                                                <Trophy className="w-16 h-16 text-yellow-400 mx-auto mt-4" />
                                            )}
                                        </motion.div>
                                    )}

                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={startGame}
                                        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl text-xl font-bold shadow-lg"
                                    >
                                        {gameOver || gameCompleted ? 'Play Again' : 'Start Game'}
                                    </motion.button>

                                    {/* Controls Guide - Only show on initial screen */}
                                    {
                                        !gameOver && !gameCompleted && (
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
                                        )
                                    }
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
                    <p className="text-sm mt-2">
                        Progress: {answeredQuestions.length}/{questions[0].length} questions completed
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default ABAPRunner;