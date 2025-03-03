import React, { useState, useEffect, useCallback } from 'react';
import { AlertTriangle, Zap, Trophy, BookOpen } from 'lucide-react';
import FPSGunView from '../../../../Components/UI/GunPov';

const ABAPShooterGame = () => {
    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(1);
    const [question, setQuestion] = useState(null);
    const [targets, setTargets] = useState([]);
    const [ammo, setAmmo] = useState(6);
    const [maxAmmo, setMaxAmmo] = useState(6);
    const [isReloading, setIsReloading] = useState(false);
    const [showReloadPrompt, setShowReloadPrompt] = useState(false);
    const [muzzleFlash, setMuzzleFlash] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [showLevelComplete, setShowLevelComplete] = useState(false);
    const [lastHitTarget, setLastHitTarget] = useState(null);
    const [gameStats, setGameStats] = useState({ accuracy: 0, shotsFired: 0, correctHits: 0 });
    const [showControls, setShowControls] = useState(false);
    const [comboCount, setComboCount] = useState(0);
    const [showComboEffect, setShowComboEffect] = useState(false);

    // ABAP Questions with difficulty levels
    const abapQuestions = {
        beginner: [
            {
                text: "What does ABAP stand for?",
                answers: [
                    "Advanced Business Application Programming",
                    "Automated Business Application Process",
                    "Advanced Basic Application Program",
                    "Automated Business Analysis Programming"
                ],
                correctAnswer: "Advanced Business Application Programming"
            },
            {
                text: "Which statement is used to write output in ABAP?",
                answers: ["WRITE", "PRINT", "OUTPUT", "DISPLAY"],
                correctAnswer: "WRITE"
            }
        ],
        intermediate: [
            {
                text: "What is the correct syntax for an internal table declaration?",
                answers: [
                    "DATA: lt_table TYPE TABLE OF structure",
                    "DEFINE TABLE lt_table TYPE structure",
                    "CREATE TABLE lt_table TYPE structure",
                    "TABLE: lt_table TYPE OF structure"
                ],
                correctAnswer: "DATA: lt_table TYPE TABLE OF structure"
            },
            {
                text: "Which command is used to read data from database table?",
                answers: ["SELECT", "FETCH", "READ", "GET"],
                correctAnswer: "SELECT"
            }
        ],
        advanced: [
            {
                text: "What is the purpose of BADI in ABAP?",
                answers: [
                    "Business Add-In for enhancement",
                    "Basic Application Development Interface",
                    "Backend Application Development Integration",
                    "Business Application Development Instance"
                ],
                correctAnswer: "Business Add-In for enhancement"
            },
            {
                text: "Which method is used for Exception handling in ABAP OO?",
                answers: [
                    "TRY-CATCH-ENDTRY",
                    "BEGIN-RESCUE-END",
                    "HANDLE-ERROR-ENDHANDLE",
                    "START-EXCEPTION-END"
                ],
                correctAnswer: "TRY-CATCH-ENDTRY"
            }
        ]
    };

    // Optimized handlers using useCallback
    const handleMouseMove = useCallback((e) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
    }, []);

    const handleKeyDown = useCallback((e) => {
        if ((e.key === 'r' || e.key === 'R') && !isReloading && ammo < maxAmmo) {
            reload();
        } else if (e.key === 'h' || e.key === 'H') {
            setShowControls(prev => !prev);
        }
    }, [isReloading, ammo, maxAmmo]);

    // Generate layout based on screen size
    const getTargetPosition = useCallback((index, total) => {
        const gameWidth = window.innerWidth;
        const gameHeight = window.innerHeight;
        const isSmallScreen = gameWidth < 768;

        if (isSmallScreen) {
            // Vertical layout for small screens
            return {
                x: gameWidth * 0.5,
                y: gameHeight * (0.3 + index * 0.15)
            };
        } else {
            // Grid layout for larger screens
            const row = Math.floor(index / 2);
            const col = index % 2;
            return {
                x: gameWidth * (0.3 + col * 0.4),
                y: gameHeight * (0.35 + row * 0.25)
            };
        }
    }, []);

    // Generate new question with adaptive difficulty
    const generateNewQuestion = useCallback(() => {
        let category;
        if (level <= 2) category = 'beginner';
        else if (level <= 4) category = 'intermediate';
        else category = 'advanced';

        const questions = abapQuestions[category];
        const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
        setQuestion(randomQuestion);

        // Responsive target positioning
        const newTargets = randomQuestion.answers.map((answer, index) => ({
            id: Date.now() + index,
            text: answer,
            isCorrect: answer === randomQuestion.correctAnswer,
            position: getTargetPosition(index, randomQuestion.answers.length),
        }));

        setTargets(newTargets);
    }, [level, getTargetPosition]);

    // Initialize game
    useEffect(() => {
        document.body.style.cursor = 'none';
        const handleResize = () => {
            generateNewQuestion();
        };

        generateNewQuestion();
        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('click', handleShoot);
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.cursor = 'default';
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('click', handleShoot);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [generateNewQuestion, handleMouseMove, handleKeyDown]);

    const reload = () => {
        if (isReloading || ammo === maxAmmo) return;

        setIsReloading(true);
        setShowReloadPrompt(false);
        playSound('reload');

        setTimeout(() => {
            setAmmo(maxAmmo);
            setIsReloading(false);
        }, 1500);
    };

    const handleShoot = () => {
        if (isReloading || ammo <= 0) {
            if (ammo <= 0) {
                playSound('empty');
                setShowReloadPrompt(true);
                setTimeout(() => setShowReloadPrompt(false), 2000);
            }
            return;
        }

        playSound('shoot');
        setMuzzleFlash(true);
        setTimeout(() => setMuzzleFlash(false), 100);
        setAmmo(prev => prev - 1);

        // Update stats
        setGameStats(prev => ({
            ...prev,
            shotsFired: prev.shotsFired + 1
        }));

        const elementsAtPoint = document.elementsFromPoint(mousePosition.x, mousePosition.y);
        const targetElement = elementsAtPoint.find(el =>
            el.classList && el.classList.contains('target-element')
        );

        if (targetElement) {
            const targetIndex = parseInt(targetElement.dataset.index);
            checkAnswer(targetIndex);
        }
    };

    const checkAnswer = (index) => {
        const selectedTarget = targets[index];
        if (!selectedTarget) return;

        setLastHitTarget({
            index,
            isCorrect: selectedTarget.isCorrect,
            position: { x: mousePosition.x, y: mousePosition.y }
        });

        if (selectedTarget.isCorrect) {
            const comboPoints = Math.min(comboCount, 5) * 2;
            const levelBonus = level;
            const totalPoints = 10 + comboPoints + levelBonus;

            setScore(prev => prev + totalPoints);
            setComboCount(prev => prev + 1);
            setShowComboEffect(true);
            setTimeout(() => setShowComboEffect(false), 800);

            playSound('correct');

            setGameStats(prev => {
                const newCorrectHits = prev.correctHits + 1;
                return {
                    ...prev,
                    correctHits: newCorrectHits,
                    accuracy: Math.round((newCorrectHits / (prev.shotsFired || 1)) * 100)
                };
            });

            // Update target visuals
            setTargets(prev => prev.map((t, i) => ({
                ...t,
                status: i === index ? 'correct' : t.status
            })));

            if (score + totalPoints >= level * 50) {
                setTimeout(() => setShowLevelComplete(true), 1000);
            } else {
                setTimeout(() => {
                    setLastHitTarget(null);
                    generateNewQuestion();
                }, 1500);
            }
        } else {
            setScore(prev => Math.max(0, prev - 5));
            setComboCount(0);
            playSound('incorrect');

            // Update target visuals
            setTargets(prev => prev.map((t, i) => ({
                ...t,
                status: i === index ? 'incorrect' : t.status,
                showCorrect: t.isCorrect ? true : false
            })));

            setTimeout(() => {
                setLastHitTarget(null);
                generateNewQuestion();
            }, 2000);
        }
    };

    const nextLevel = () => {
        setLevel(prev => prev + 1);
        setShowLevelComplete(false);
        setComboCount(0);

        // Increase max ammo every 2 levels
        if (level % 2 === 0) {
            setMaxAmmo(prev => prev + 2);
            setAmmo(maxAmmo + 2);
        } else {
            setAmmo(maxAmmo);
        }

        generateNewQuestion();
    };

    const playSound = (soundType) => {
        const sounds = {
            shoot: new Audio('/Sounds/shoot.ogg'),
            reload: new Audio('/Sounds/reload.wav'),
            correct: new Audio('/audio/correct.mp3'),
            incorrect: new Audio('/api/placeholder/audio/incorrect.mp3'),
            empty: new Audio('/Sounds/empty.wav')
        };

        try {
            sounds[soundType].play();
        } catch (error) {
            console.log('Sound play error:', error);
        }
    };

    return (
        <div className="relative w-screen h-screen overflow-hidden bg-gradient-to-b from-blue-900 to-black">
            {/* Compact HUD for small screens */}
            <div className="absolute top-2 left-0 right-0 z-50 flex justify-between px-3">
                <div className="flex space-x-2">
                    <div className="bg-black/60 backdrop-blur-sm border border-blue-700 rounded-lg px-3 py-1">
                        <div className="text-white font-mono text-sm">
                            {score}
                        </div>
                    </div>
                    <div className="bg-black/60 backdrop-blur-sm border border-blue-700 rounded-lg px-3 py-1">
                        <div className="text-white font-mono text-sm">
                            LVL {level}
                        </div>
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="bg-black/60 backdrop-blur-sm border border-blue-700 rounded-lg px-3 py-1">
                        <div className="text-white font-mono text-sm flex items-center">
                            <Trophy size={14} className="mr-1 text-yellow-400" />
                            {gameStats.accuracy}%
                        </div>
                    </div>
                </div>
            </div>

            {/* Adaptive Question Display */}
            {question && (
                <div className="absolute top-12 left-1/2 transform -translate-x-1/2 z-20 w-11/12 md:w-3/4 max-w-xl">
                    <div className="bg-gray-900/80 backdrop-blur-md border border-blue-700 rounded-xl px-4 py-3 shadow-2xl">
                        <h2 className="text-white text-lg md:text-2xl font-bold text-center">{question.text}</h2>
                    </div>
                </div>
            )}

            {/* Adaptive targets for different screen sizes */}
            {targets.map((target, index) => (
                <div
                    key={target.id}
                    data-index={index}
                    className={`target-element absolute z-10 w-5/6 md:w-48 h-16 md:h-48 
                        ${target.status === 'correct' ? 'bg-green-900/40 border-green-500' :
                            target.status === 'incorrect' ? 'bg-red-900/40 border-red-500' :
                                'bg-blue-900/40 border-blue-700'}
                        border-2 rounded-lg flex items-center justify-center 
                        transition-all duration-300 backdrop-blur-sm hover:border-blue-500`}
                    style={{
                        left: `${target.position.x}px`,
                        top: `${target.position.y}px`,
                        transform: `translate(-50%, -50%) ${target.status ? 'scale(1.05)' : 'scale(1)'}`,
                        maxWidth: window.innerWidth < 768 ? '90vw' : '300px'
                    }}
                >
                    <div className="text-white text-sm md:text-xl font-bold text-center p-2 md:p-4">
                        {target.text}
                    </div>
                    {target.showCorrect && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full 
                                      flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                        </div>
                    )}
                </div>
            ))}

            {/* Combo counter effect */}
            {showComboEffect && comboCount > 1 && (
                <div className="absolute top-24 right-6 z-50 flex items-center">
                    <span className="font-bold text-yellow-400 mr-2 text-2xl">{comboCount}x</span>
                    <Zap className="text-yellow-400" size={24} />
                </div>
            )}

            {/* Hit marker animation */}
            {lastHitTarget && (
                <div
                    className={`absolute z-20 transform -translate-x-1/2 -translate-y-1/2 text-xl md:text-2xl
                              ${lastHitTarget.isCorrect ? 'text-green-500' : 'text-red-500'}`}
                    style={{
                        left: lastHitTarget.position.x,
                        top: lastHitTarget.position.y,
                        animation: 'hitMarker 0.5s ease-out forwards'
                    }}
                >
                    {lastHitTarget.isCorrect ? (
                        <div className="flex flex-col items-center">
                            <span>✓</span>
                            {comboCount > 1 && (
                                <span className="text-xs text-yellow-400">+{Math.min(comboCount, 5) * 2} combo</span>
                            )}
                        </div>
                    ) : '✗'}
                </div>
            )}

            {/* Compact ammo display */}
            <div className="absolute bottom-4 left-4 z-50 flex flex-col">
                <div className="flex">
                    {Array.from({ length: maxAmmo }).map((_, i) => (
                        <div
                            key={i}
                            className={`w-3 md:w-4 h-10 md:h-12 mx-0.5 rounded-t-sm 
                                ${i < ammo ? 'bg-gradient-to-b from-blue-400 to-blue-600' : 'bg-gray-800'}
                                transition-all duration-200`}
                            style={{
                                transform: i < ammo ? 'translateY(0)' : 'translateY(3px)',
                                boxShadow: i < ammo ? '0 0 8px rgba(59, 130, 246, 0.5)' : 'none'
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Reload progress bar */}
            {isReloading && (
                <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-36 h-1.5 
                              bg-gray-800 rounded-full overflow-hidden">
                    <div className="reload-progress h-full bg-blue-500 animate-[reloadProgress_1.5s_ease-in-out]"></div>
                </div>
            )}

            {/* Compact reload prompt */}
            {showReloadPrompt && (
                <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-50 
                              bg-black/70 backdrop-blur-sm border border-red-700 rounded-lg 
                              px-4 py-2 flex items-center">
                    <AlertTriangle className="text-red-500 mr-2" size={16} />
                    <span className="text-white text-sm font-mono">Press <span className="text-blue-400">R</span> to reload</span>
                </div>
            )}

            {/* Adaptive level complete overlay */}
            {showLevelComplete && (
                <div className="absolute inset-0 bg-black/70 backdrop-blur-md z-100 flex items-center justify-center px-4">
                    <div className="bg-gray-900 border-2 border-blue-500 rounded-xl p-6 w-full max-w-xs md:max-w-md">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 text-center">
                            Level {level} Complete!
                        </h2>
                        <div className="text-gray-300 text-sm md:text-lg mb-4">
                            <div className="mb-2">
                                <span className="text-green-400 font-bold text-lg md:text-xl">{level * 50}</span> points earned!
                            </div>
                            <div className="grid grid-cols-2 gap-2 bg-gray-800/50 p-3 rounded-lg">
                                <div className="flex items-center">
                                    <Trophy size={16} className="text-yellow-400 mr-2" />
                                    <span>Accuracy: {gameStats.accuracy}%</span>
                                </div>
                                <div>
                                    Shots: {gameStats.shotsFired}
                                </div>
                                <div>
                                    Correct: {gameStats.correctHits}
                                </div>
                                <div>
                                    Best Combo: {comboCount}
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={nextLevel}
                            className="mt-4 w-full py-2 md:py-3 bg-blue-600 hover:bg-blue-700 text-white 
                                     font-bold rounded-lg transition-colors"
                        >
                            Level {level + 1} {level % 2 === 0 ? '(+2 Ammo!)' : ''}
                        </button>
                    </div>
                </div>
            )}

            {/* Collapsible controls help */}
            <div
                className="absolute bottom-4 right-4 z-50 bg-black/60 backdrop-blur-sm border border-blue-700 
                           rounded-lg p-2 cursor-pointer"
                onClick={() => setShowControls(prev => !prev)}
            >
                <BookOpen size={20} className="text-blue-400" />
            </div>

            {showControls && (
                <div className="absolute bottom-16 right-4 z-50 bg-black/80 backdrop-blur-md border 
                                border-blue-700 rounded-lg p-3 max-w-xs">
                    <h3 className="text-blue-400 font-bold mb-2 text-sm">Controls</h3>
                    <div className="text-white text-xs space-y-1">
                        <div><span className="text-blue-400">Click</span> to shoot</div>
                        <div><span className="text-blue-400">R</span> to reload</div>
                        <div><span className="text-blue-400">H</span> to toggle help</div>
                        <div className="mt-2 text-gray-400 text-xs">
                            Combos: Chain correct answers for bonus points!
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes hitMarker {
                    0% {
                        opacity: 1;
                        transform: translate(-50%, -50%) scale(1);
                    }
                    100% {
                        opacity: 0;
                        transform: translate(-50%, -50%) scale(2);
                    }
                }
                @keyframes reloadProgress {
                    0% { width: 0; }
                    100% { width: 100%; }
                }
            `}</style>

            {/* FPS Gun View - smaller for mobile */}
            <FPSGunView
                mousePosition={mousePosition}
                isShooting={muzzleFlash}
                isReloading={isReloading}
                scale={window.innerWidth < 768 ? 0.8 : 1}
            />

            {/* Compact custom cursor */}
            <div
                className="fixed z-100 pointer-events-none"
                style={{
                    left: `${mousePosition.x - 10}px`,
                    top: `${mousePosition.y - 10}px`
                }}
            >
                <svg width="20" height="20" viewBox="0 0 20 20">
                    <circle cx="10" cy="10" r="2" fill="white" />
                    <circle cx="10" cy="10" r="6" stroke="white" strokeWidth="1"
                        fill="transparent" strokeDasharray="2 2" strokeOpacity="0.7" />
                    <line x1="10" y1="2" x2="10" y2="6" stroke="white" strokeWidth="1" strokeOpacity="0.7" />
                    <line x1="10" y1="14" x2="10" y2="18" stroke="white" strokeWidth="1" strokeOpacity="0.7" />
                    <line x1="2" y1="10" x2="6" y2="10" stroke="white" strokeWidth="1" strokeOpacity="0.7" />
                    <line x1="14" y1="10" x2="18" y2="10" stroke="white" strokeWidth="1" strokeOpacity="0.7" />
                </svg>
            </div>
        </div>
    );
};

export default ABAPShooterGame;