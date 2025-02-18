import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Book, Terminal, Sparkles, CheckCircle, Circle, Play, RefreshCw } from 'lucide-react';

const ABAPExplorer = () => {
    const [position, setPosition] = useState({ x: 1, y: 0 });
    const [currentModule, setCurrentModule] = useState(null);
    const [discoveredConcepts, setDiscoveredConcepts] = useState([]);
    const [nodeVisible, setNodeVisible] = useState(false);
    const [score, setScore] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);
    const [particleEffects, setParticleEffects] = useState([]);
    const [activeCodeBlock, setActiveCodeBlock] = useState(null);
    const [showChallenge, setShowChallenge] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [executionOutput, setExecutionOutput] = useState('');
    const [codeSuccess, setCodeSuccess] = useState(false);
    const [gameOnChallengeOff, setGameOnChallengeOff] = useState(true);
    const [nodeDiscoveryAlertVisible, setNodeDiscoveryAlertVisible] = useState(false);
    const [resumePlayingVisible,setResumePlayingVisible] = useState(false);
    const [playingModule, setPlayingModule] = useState();

    const explorerRef = useRef(null);


    const abapModules = [
        {
            id: 'variables',
            title: 'Variables & Data Types',
            content: [
                {
                    concept: 'Variable Declaration',
                    explanation: 'In ABAP, variables are declared using the DATA statement',
                    baseCode: 'DATA: lv_number TYPE i,\n      lv_text   TYPE string.\n\n* Initialize variables\nlv_number = ___.\nlv_text = ___.\n\nWRITE: lv_number, lv_text.',
                    challenge: {
                        description: "Complete the code by initializing the variables",
                        gaps: [
                            {
                                id: 'gap1',
                                options: ['42', '100', '999'],
                                correct: '42'
                            },
                            {
                                id: 'gap2',
                                options: ["'Hello ABAP'", "'Test'", "'Learning!'"],
                                correct: "'Hello ABAP'"
                            }
                        ],
                        expectedOutput: "42 Hello ABAP"
                    },
                    position: { x: 0, y: 30 }
                },
                {
                    concept: 'String Operations',
                    explanation: 'ABAP provides powerful string manipulation capabilities',
                    baseCode: 'DATA: lv_text1 TYPE string,\n      lv_text2 TYPE string,\n      lv_result TYPE string.\n\nlv_text1 = \'ABAP\'.\nlv_text2 = ___.\n\nCONCATENATE lv_text1 lv_text2 INTO lv_result SEPARATED BY ___.\n\nWRITE: lv_result.',
                    challenge: {
                        description: "Complete the string concatenation code",
                        gaps: [
                            {
                                id: 'gap1',
                                options: ["'Programming'", "'Development'", "'Coding'"],
                                correct: "'Programming'"
                            },
                            {
                                id: 'gap2',
                                options: ["' '", "'-'", "'_'"],
                                correct: "' '"
                            }
                        ],
                        expectedOutput: "ABAP Programming"
                    },
                    position: { x: 1, y: 60 }
                }
            ]
        },
        {
            id: 'calculations',
            title: 'Calculations & Logic',
            content: [
                {
                    concept: 'Basic Calculations',
                    explanation: 'ABAP supports various mathematical operations',
                    baseCode: 'DATA: lv_num1 TYPE i,\n      lv_num2 TYPE i,\n      lv_result TYPE i.\n\nlv_num1 = ___.\nlv_num2 = ___.\n\nlv_result = lv_num1 ___ lv_num2.\n\nWRITE: lv_result.',
                    challenge: {
                        description: "Create a calculation that results in 25",
                        gaps: [
                            {
                                id: 'gap1',
                                options: ['5', '10', '15'],
                                correct: '5'
                            },
                            {
                                id: 'gap2',
                                options: ['5', '10', '15'],
                                correct: '5'
                            },
                            {
                                id: 'gap3',
                                options: ['+', '*', '/'],
                                correct: '*'
                            }
                        ],
                        expectedOutput: "25"
                    },
                    position: { x: 2, y: 30 }
                }
            ]
        }
    ];

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

    const movePlayer = useCallback((direction) => {
        if (!gameStarted) return;

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
                    }
                    break;
                case 'down':
                    if (prev.y > 0) {
                        newPos.y = prev.y - 10;
                        generateParticle(prev.x * 33.33 + 16.67, prev.y);
                    }
                    break;
            }
            return newPos;
        });

        // Check for concept discovery
        abapModules.forEach(module => {
            module.content.forEach(concept => {
                if (
                    Math.abs(concept.position.x - position.x) < 1 &&
                    Math.abs(concept.position.y - position.y) < 10 &&
                    !discoveredConcepts.includes(concept.concept)
                ) {
                    setDiscoveredConcepts(prev => [...prev, concept.concept]);
                    setGameOnChallengeOff(false);
                    setActiveCodeBlock(concept);
                    setShowChallenge(true);
                    setSelectedOptions({});
                    setExecutionOutput('');
                    setCodeSuccess(false);
                    setPlayingModule(module);
                    setNodeDiscoveryAlertVisible(true);
                }
            });
        });
    }, [gameStarted, position, generateParticle, discoveredConcepts]);

    const handleOptionSelect = (gapId, value) => {
        setSelectedOptions(prev => ({
            ...prev,
            [gapId]: value
        }));
    };

    const executeCode = () => {
        if (!activeCodeBlock || !activeCodeBlock.challenge) return;

        const isCorrect = activeCodeBlock.challenge.gaps.every(
            gap => selectedOptions[gap.id] === gap.correct
        );

        if (isCorrect) {
            setExecutionOutput(activeCodeBlock.challenge.expectedOutput);
            setCodeSuccess(true);
            setScore(prev => prev + 20);

            // Celebration effect
            const particles = Array.from({ length: 20 }, (_, i) => ({
                id: `celebrate-${Date.now()}-${i}`,
                x: Math.random() * 100,
                y: Math.random() * 100,
                color: ['#FFD700', '#FF69B4', '#00FF00'][Math.floor(Math.random() * 3)]
            }));
            setParticleEffects(prev => [...prev, ...particles]);
            setResumePlayingVisible(true);
        } else {
            setExecutionOutput('Execution failed. Check your code!');
            setCodeSuccess(false);
        }
    };

    const handleKeyDown = useCallback((e) => {
        if (showChallenge) return; // Disable movement during challenge

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
                break;
            case 'ArrowDown':
                movePlayer('down');
                break;
        }
    }, [movePlayer, showChallenge]);

    const startGame = useCallback(() => {
        setGameStarted(true);
        setScore(0);
        setPosition({ x: 1, y: 0 });
        setDiscoveredConcepts([]);
        setNodeVisible(true);
        document.getElementById('explorer-container').focus();
    }, []);


    return (
        <div className="items-center justify-center bg-gradient-to-b from-gray-900 via-purple-900 to-violet-900 p-4">

            <div className="w-full max-w-4xl">
                <motion.h1
                    className="text-4xl font-bold text-center text-white mb-6 tracking-wider"
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                >
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                        ABAP Code Explorer
                    </span>
                </motion.h1>

                <div className="flex gap-4">
                    {
                        nodeDiscoveryAlertVisible
                        &&
                        <div className='absolute z-10 font-bold w-full backdrop-blur-md h-[450px] flex flex-col justify-center text-white text-2xl
                        text-center'>
                            You discovered new challenge : {playingModule.title}
                            <div className='mt-10'>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => {
                                        setGameOnChallengeOff(false)
                                        setNodeDiscoveryAlertVisible(false)
                                    }}
                                    className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl text-md  shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
                                >
                                    Accept Challenge
                                </motion.button>

                            </div>
                        </div>
                    }
                    {/* Main Game Area */}
                    {
                        gameOnChallengeOff ?
                            <div
                                id="explorer-container"
                                ref={explorerRef}
                                className="w-full h-[450px] relative overflow-hidden rounded-2xl shadow-[0_0_50px_rgba(168,85,247,0.3)] border border-purple-500/30"
                                tabIndex={0}
                                onKeyDown={handleKeyDown}
                                onFocus={(e) => e.preventDefault()}
                            >
                                {/* Futuristic Grid Background */}
                                <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-indigo-900 to-purple-900">
                                    <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 gap-4 p-4">
                                        {Array.from({ length: 144 }).map((_, i) => (
                                            <motion.div
                                                key={i}
                                                className="border border-purple-500/10 rounded"
                                                animate={{
                                                    opacity: [0.1, 0.2, 0.1],
                                                    scale: [1, 1.02, 1],
                                                }}
                                                transition={{
                                                    duration: 2,
                                                    repeat: Infinity,
                                                    delay: i * 0.01,
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Concept Nodes */}
                                {
                                    nodeVisible &&
                                    abapModules.map(module =>
                                        module.content.map(concept => (
                                            <motion.div
                                                key={concept.concept}
                                                className="absolute z-10"
                                                style={{
                                                    left: `${concept.position.x * 33.33 + 16.67}%`,
                                                    bottom: `${concept.position.y}%`
                                                }}
                                            >
                                                <motion.div
                                                    className={`w-12 h-12 rounded-full flex items-center justify-center ${discoveredConcepts.includes(concept.concept)
                                                        ? 'bg-green-500'
                                                        : 'bg-purple-500'
                                                        }`}
                                                    animate={{
                                                        scale: [1, 1.1, 1],
                                                        boxShadow: [
                                                            '0 0 20px rgba(168,85,247,0.5)',
                                                            '0 0 40px rgba(168,85,247,0.2)',
                                                            '0 0 20px rgba(168,85,247,0.5)'
                                                        ]
                                                    }}
                                                    transition={{
                                                        duration: 2,
                                                        repeat: Infinity
                                                    }}
                                                >
                                                    {discoveredConcepts.includes(concept.concept)
                                                        ? <CheckCircle className="text-white" />
                                                        : <Circle className="text-white" />
                                                    }
                                                </motion.div>
                                            </motion.div>
                                        ))
                                    )}

                                {/* Player Character */}
                                <motion.div
                                    className="absolute z-50"
                                    style={{
                                        left: `${position.x * 33.33 + 16.67}%`,
                                        bottom: `${position.y}%`
                                    }}
                                    animate={{
                                        scale: [1, 1.05, 1],
                                        rotate: [0, 5, -5, 0]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity
                                    }}
                                >
                                    <div className="w-12 h-16 relative">
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-xl shadow-lg"
                                        >
                                            <Terminal className="w-full h-full p-2 text-white" />
                                        </motion.div>
                                    </div>
                                </motion.div>

                                {/* Score Display */}
                                <motion.div
                                    initial={{ x: -100, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    className="absolute top-4 left-4 bg-black/40 backdrop-blur-md p-3 rounded-xl border border-purple-500/30"
                                >
                                    <div className="flex items-center space-x-3">
                                        <Sparkles className="text-yellow-400 w-6 h-6" />
                                        <span className="text-white text-lg font-bold">{score} Points</span>
                                    </div>
                                </motion.div>

                                {/* Start Screen */}
                                <AnimatePresence>
                                    {!gameStarted && (
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
                                                    className="text-4xl text-white mb-6 font-bold"
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
                                                    Interactive ABAP Explorer
                                                </motion.h2>
                                                <p className="text-gray-300 mb-6">
                                                    Discover ABAP concepts and complete coding challenges
                                                </p>
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={startGame}
                                                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl text-xl font-bold shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
                                                >
                                                    Start Exploring
                                                </motion.button>
                                            </motion.div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                            :
                            <>
                                {/* Code panel */}
                                <div className='w-full'>

                                <div className="w-full h-[400px] bg-gray-900 rounded-2xl border border-purple-500/30 overflow-hidden flex flex-col">
                                    <div className="flex-1 p-4 overflow-y-auto">
                                        {activeCodeBlock ? (
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="space-y-4"
                                            >
                                                <h2 className="text-xl font-bold text-white">
                                                    {activeCodeBlock.concept}
                                                </h2>
                                                <p className="text-gray-300">
                                                    {activeCodeBlock.explanation}
                                                </p>

                                                {showChallenge && activeCodeBlock.challenge && (
                                                    <div className="space-y-4">
                                                        <div className="bg-purple-900/30 p-4 rounded-lg border border-purple-500/30">
                                                            <h3 className="text-white font-semibold mb-2">Challenge:</h3>
                                                            <p className="text-gray-300">{activeCodeBlock.challenge.description}</p>
                                                        </div>

                                                        <div className="bg-gray-800 p-4 rounded-lg">
                                                            <pre className="text-green-400 overflow-x-auto whitespace-pre-wrap">
                                                                {activeCodeBlock.baseCode.split('___').map((part, index) => (
                                                                    <React.Fragment key={index}>
                                                                        {part}
                                                                        {index < activeCodeBlock.challenge.gaps.length && (
                                                                            <select
                                                                                value={selectedOptions[activeCodeBlock.challenge.gaps[index].id] || ''}
                                                                                onChange={(e) => handleOptionSelect(
                                                                                    activeCodeBlock.challenge.gaps[index].id,
                                                                                    e.target.value
                                                                                )}
                                                                                className="bg-purple-900 text-white px-2 py-1 rounded mx-1 border border-purple-500/30"
                                                                            >
                                                                                <option value="">Select...</option>
                                                                                {activeCodeBlock.challenge.gaps[index].options.map((opt) => (
                                                                                    <option key={opt} value={opt}>
                                                                                        {opt}
                                                                                    </option>
                                                                                ))}
                                                                            </select>
                                                                        )}
                                                                    </React.Fragment>
                                                                ))}
                                                            </pre>
                                                        </div>

                                                        {/* Output Console */}
                                                        <div className="space-y-2">
                                                            <div className="flex justify-between items-center">
                                                                <h3 className="text-white font-semibold">Output:</h3>
                                                                <div className="flex gap-2">
                                                                    <button
                                                                        onClick={executeCode}
                                                                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                                                                    >
                                                                        <Play className="w-4 h-4" />
                                                                        Run
                                                                    </button>
                                                                    <button
                                                                        onClick={() => {
                                                                            setSelectedOptions({});
                                                                            setExecutionOutput('');
                                                                            setCodeSuccess(false);
                                                                        }}
                                                                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                                                                    >
                                                                        <RefreshCw className="w-4 h-4" />
                                                                        Reset
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <div className={`p-4 rounded-lg ${executionOutput
                                                                ? (codeSuccess ? 'bg-green-900/30' : 'bg-red-900/30')
                                                                : 'bg-gray-800'
                                                                }`}>
                                                                <pre className="text-white font-mono">
                                                                    {executionOutput || 'Output will appear here...'}
                                                                </pre>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </motion.div>
                                        ) : (
                                            <div className="h-full flex items-center justify-center text-gray-400">
                                                <p>Move to a concept node to start a challenge</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {
                                    resumePlayingVisible
                                    &&
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => {
                                                setGameOnChallengeOff(true);
                                                setResumePlayingVisible(false);

                                                // Focus without scrolling
                                                if (explorerRef.current) {
                                                    explorerRef.current.focus({ preventScroll: true });

                                                    // Ensure the explorer container doesn't trigger unwanted scrolling
                                                    window.scrollTo({
                                                        top: 0,
                                                        behavior: "smooth" // Optional: Smooth scrolling to avoid sudden jumps
                                                    });
                                                }
                                            }}
                                            className="mt-5 p-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl text-md shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
                                        >
                                            Resume playing
                                        </motion.button>
                                }
                                </div>
                                
                            </>
                    }
                </div>
            </div>
        </div>
    );
};

export default ABAPExplorer;