import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Book, Terminal, Sparkles, CheckCircle, Circle, Play, RefreshCw, Lock, ChevronDown, ChevronUp } from 'lucide-react';

const ABAPExplorer = () => {
    const [currentNodeIndex, setCurrentNodeIndex] = useState(0);
    const [discoveredConcepts, setDiscoveredConcepts] = useState([]);
    const [score, setScore] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);
    const [particleEffects, setParticleEffects] = useState([]);
    const [activeCodeBlock, setActiveCodeBlock] = useState(null);
    const [showChallenge, setShowChallenge] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [executionOutput, setExecutionOutput] = useState('');
    const [codeSuccess, setCodeSuccess] = useState(false);
    const [isMapExpanded, setIsMapExpanded] = useState(true);

    // Flatten the learning path
    const learningPath = [
        {
            id: 'variables_basics',
            title: 'Variables Basics',
            content: {
                concept: 'Variable Declaration',
                explanation: 'In ABAP, variables are declared using the DATA statement',
                baseCode: 'DATA: lv_number TYPE i,\n      lv_text   TYPE string.\n\n* Initialize variables\nlv_number = ___.\nlv_text = ___.\n\nWRITE: lv_number, lv_text.',
                challenge: {
                    description: "Complete the code by initializing the variables",
                    gaps: [
                        { id: 'gap1', options: ['42', '100', '999'], correct: '42' },
                        { id: 'gap2', options: ["'Hello ABAP'", "'Test'", "'Learning!"], correct: "'Hello ABAP'" }
                    ],
                    expectedOutput: "42 Hello ABAP"
                }
            }
        },
        {
            id: 'string_operations',
            title: 'String Operations',
            content: {
                concept: 'String Operations',
                explanation: 'ABAP provides powerful string manipulation capabilities',
                baseCode: 'DATA: lv_text1 TYPE string,\n      lv_text2 TYPE string,\n      lv_result TYPE string.\n\nlv_text1 = \"ABAP\".\nlv_text2 = ___.\n\nCONCATENATE lv_text1 lv_text2 INTO lv_result SEPARATED BY ___.\n\nWRITE: lv_result.',
                challenge: {
                    description: "Complete the string concatenation code",
                    gaps: [
                        { id: 'gap1', options: ["'Programming'", "'Development'", "'Coding'"], correct: "'Programming'" },
                        { id: 'gap2', options: ["' '", "'-'", "'_'"], correct: "' '" }
                    ],
                    expectedOutput: "ABAP Programming"
                }
            }
        },
        {
            id: 'calculations',
            title: 'Basic Calculations',
            content: {
                concept: 'Basic Calculations',
                explanation: 'ABAP supports various mathematical operations',
                baseCode: 'DATA: lv_num1 TYPE i,\n      lv_num2 TYPE i,\n      lv_result TYPE i.\n\nlv_num1 = ___.\nlv_num2 = ___.\n\nlv_result = lv_num1 ___ lv_num2.\n\nWRITE: lv_result.',
                challenge: {
                    description: "Create a calculation that results in 25",
                    gaps: [
                        { id: 'gap1', options: ['5', '10', '15'], correct: '5' },
                        { id: 'gap2', options: ['5', '10', '15'], correct: '5' },
                        { id: 'gap3', options: ['+', '*', '/'], correct: '*' }
                    ],
                    expectedOutput: "25"
                }
            }
        },
        {
            id: 'boolean_operations',
            title: 'Boolean Operations',
            content: {
                concept: 'Boolean Logic',
                explanation: 'ABAP supports logical operators like AND, OR, and NOT.',
                baseCode: 'DATA: lv_a TYPE i,\n      lv_b TYPE i,\n      lv_result TYPE abap_bool.\n\nlv_a = ___.\nlv_b = ___.\n\nIF lv_a ___ lv_b.\n  lv_result = abap_true.\nELSE.\n  lv_result = abap_false.\nENDIF.\n\nWRITE: lv_result.',
                challenge: {
                    description: "Make the condition return TRUE",
                    gaps: [
                        { id: 'gap1', options: ['10', '20', '30'], correct: '10' },
                        { id: 'gap2', options: ['20', '10', '5'], correct: '20' },
                        { id: 'gap3', options: ['>', '<', '>='], correct: '<' }
                    ],
                    expectedOutput: "X"  // ABAP_TRUE is 'X'
                }
            }
        },
        {
            id: 'looping_statements',
            title: 'Looping Statements',
            content: {
                concept: 'Loops',
                explanation: 'ABAP supports DO, WHILE, and LOOP AT for iterations.',
                baseCode: 'DATA: lv_index TYPE i,\n      lv_sum TYPE i.\n\nlv_sum = 0.\nlv_index = 1.\n\nDO __ TIMES.\n  lv_sum = lv_sum + lv_index.\n  lv_index = lv_index + 1.\nENDDO.\n\nWRITE: lv_sum.',
                challenge: {
                    description: "Calculate the sum of first 5 numbers",
                    gaps: [
                        { id: 'gap1', options: ['3', '5', '10'], correct: '5' }
                    ],
                    expectedOutput: "15"
                }
            }
        },
        {
            id: "conditional_statements",
            title: "Conditional Statements",
            content: {
                concept: "IF, CASE Statements",
                explanation: "ABAP allows conditional execution using IF...ELSEIF...ELSE and CASE statements.",
                baseCode: "DATA: lv_value TYPE i.\n\nlv_value = ___.\n\nIF lv_value ___ 10.\n  WRITE: 'Low'.\nELSEIF lv_value ___ 20.\n  WRITE: 'Medium'.\nELSE.\n  WRITE: 'High'.\nENDIF.",
                challenge: {
                    description: "Fill the condition to categorize the number correctly.",
                    gaps: [
                        {
                            id: "gap1",
                            options: ["5", "15", "25"],
                            correct: "15"
                        },
                        {
                            id: "gap2",
                            options: ["<", ">", "="],
                            correct: "<"
                        },
                        {
                            id: "gap3",
                            options: ["=", ">", "<"],
                            correct: "="
                        }
                    ],
                    expectedOutput: "Low"
                }
            }
        },
        {
            id: "data_types_structures",
            title: "Data Types & Structures",
            content: {
                concept: "Internal Tables and Work Areas",
                explanation: "Internal tables store multiple rows of structured data.",
                baseCode: "TYPES: BEGIN OF ty_employee,\n         id TYPE i,\n         name TYPE string,\n       END OF ty_employee.\n\nDATA: lt_employees TYPE TABLE OF ty_employee,\n      ls_employee  TYPE ty_employee.\n\nls_employee-id = ___.\nls_employee-name = ___.\n\nAPPEND ls_employee TO lt_employees.\n\nWRITE: ls_employee-id, ls_employee-name.",
                challenge: {
                    description: "Initialize an employee structure.",
                    gaps: [
                        {
                            id: "gap1",
                            options: ["101", "202", "303"],
                            correct: "101"
                        },
                        {
                            id: "gap2",
                            options: ["'John'", "'Alice'", "'Bob'"],
                            correct: "'John'"
                        }
                    ],
                    expectedOutput: "101 John"
                }
            }
        },
        {
            id: "looping_internal_tables",
            title: "Looping Over Internal Tables",
            content: {
                concept: "LOOP AT",
                explanation: "Iterate over internal tables using LOOP AT.",
                baseCode: "LOOP AT lt_employees INTO ls_employee.\n  WRITE: ls_employee-name.\nENDLOOP.",
                challenge: {
                    description: "Add a condition to print names longer than 3 characters.",
                    gaps: [
                        {
                            id: "gap1",
                            options: ["4", "3", "5"],
                            correct: "3"
                        }
                    ],
                    expectedOutput: "John"
                }
            }
        },
        {
            id: "modularization",
            title: "Modularization",
            content: {
                concept: "FORM Subroutines",
                explanation: "Use FORM...ENDFORM to modularize ABAP code.",
                baseCode: "FORM print_message USING lv_msg TYPE string.\n  WRITE: lv_msg.\nENDFORM.\n\nPERFORM print_message USING ___.",
                challenge: {
                    description: "Pass the correct string to the subroutine.",
                    gaps: [
                        {
                            id: "gap1",
                            options: ["'Hello ABAP'", "'Welcome'", "'Hi'"],
                            correct: "'Hello ABAP'"
                        }
                    ],
                    expectedOutput: "Hello ABAP"
                }
            }
        },
        {
            id: "Field Symbols",
            title: "Field Symbols",
            content: {
                concept: "Dynamic Variable Access",
                explanation: "Field symbols act as references to variables.",
                baseCode: "DATA: lv_number TYPE i VALUE 10.\nFIELD-SYMBOLS: <fs> TYPE i.\n\nASSIGN lv_number TO <fs>.\n\n<fs> = ___.\n\nWRITE: lv_number.",
                challenge: {
                    description: "Modify lv_number using field symbols.",
                    gaps: [
                        {
                            id: "gap1",
                            options: ["20", "30", "40"],
                            correct: "20"
                        }
                    ],
                    expectedOutput: "20"
                }
            }
        }

    ];


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
            setDiscoveredConcepts(prev => [...prev, activeCodeBlock.concept]);

            // Celebration effect
            const particles = Array.from({ length: 20 }, (_, i) => ({
                id: `celebrate-${Date.now()}-${i}`,
                x: Math.random() * 100,
                y: Math.random() * 100,
                color: ['#FFD700', '#FF69B4', '#00FF00'][Math.floor(Math.random() * 3)]
            }));
            setParticleEffects(prev => [...prev, ...particles]);
        } else {
            setExecutionOutput('Execution failed. Check your code!');
            setCodeSuccess(false);
        }
    };

    const startGame = () => {
        setGameStarted(true);
        setScore(0);
        setDiscoveredConcepts([]);
        setActiveCodeBlock(learningPath[0].content);
        setShowChallenge(true);
    };

    const proceedToNextChallenge = () => {
        if (currentNodeIndex < learningPath.length - 1) {
            setCurrentNodeIndex(prev => prev + 1);
            setActiveCodeBlock(learningPath[currentNodeIndex + 1].content);
            setSelectedOptions({});
            setExecutionOutput('');
            setCodeSuccess(false);
            setShowChallenge(true);
        }
    };

    return (
        <div className="items-center justify-center bg-gradient-to-b from-gray-900 via-purple-900 to-violet-900 p-4">
            <div className="w-full max-w-4xl mx-auto">
                <motion.h1
                    className="text-4xl font-bold text-center text-white mb-6 tracking-wider"
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                >
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                        ABAP Learning Path
                    </span>
                </motion.h1>

                {!gameStarted ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
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
                            Master ABAP Step by Step
                        </motion.h2>
                        <p className="text-gray-300 mb-6">
                            Complete coding challenges and unlock new concepts
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={startGame}
                            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl text-xl font-bold shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
                        >
                            Start Learning
                        </motion.button>
                    </motion.div>
                ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Learning Path Map with Collapse/Expand */}
                    <div className="bg-gray-900/80 p-6 rounded-2xl border border-purple-500/30">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold text-white">Learning Progress</h2>
                            <button
                                onClick={() => setIsMapExpanded(!isMapExpanded)}
                                className="text-white hover:text-purple-400 transition-colors"
                            >
                                {isMapExpanded ? (
                                    <ChevronUp className="w-6 h-6" />
                                ) : (
                                    <ChevronDown className="w-6 h-6" />
                                )}
                            </button>
                        </div>

                        <AnimatePresence>
                            {isMapExpanded && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                >
                                    <div className="space-y-4">
                                        {learningPath.map((node, index) => (
                                            <div
                                                key={node.id}
                                                className={`p-4 rounded-lg border ${index === currentNodeIndex
                                                    ? 'bg-purple-900/50 border-purple-500'
                                                    : index < currentNodeIndex
                                                        ? 'bg-green-900/30 border-green-500'
                                                        : 'bg-gray-800/50 border-gray-700'
                                                    }`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span className="text-white font-medium">{node.title}</span>
                                                    {index < currentNodeIndex ? (
                                                        <CheckCircle className="text-green-500" />
                                                    ) : index === currentNodeIndex ? (
                                                        <Play className="text-purple-500" />
                                                    ) : (
                                                        <Lock className="text-gray-500" />
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="mt-4 p-4 bg-black/40 rounded-lg">
                            <div className="flex items-center space-x-3">
                                <Sparkles className="text-yellow-400 w-6 h-6" />
                                <span className="text-white text-lg font-bold">{score} Points</span>
                            </div>
                        </div>
                    </div>

                    {/* Challenge Area */}
                    <div className="bg-gray-900 rounded-2xl border border-purple-500/30 p-6">
                        {activeCodeBlock && (
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

                                {codeSuccess && (
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={proceedToNextChallenge}
                                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg font-bold shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
                                        disabled={currentNodeIndex >= learningPath.length - 1}
                                    >
                                        {currentNodeIndex >= learningPath.length - 1
                                            ? "You've completed all challenges!"
                                            : "Continue to Next Challenge"}
                                    </motion.button>
                                )}
                            </motion.div>
                        )}
                    </div>
                </div>
                )}

                {/* Particle Effects */}
                <AnimatePresence>
                    {particleEffects.map((particle) => (
                        <motion.div
                            key={particle.id}
                            initial={{
                                opacity: 1,
                                scale: 0,
                                x: particle.x + "%",
                                y: particle.y + "%"
                            }}
                            animate={{
                                opacity: 0,
                                scale: 1,
                                x: [particle.x + "%", (particle.x + Math.random() * 20 - 10) + "%"],
                                y: [particle.y + "%", (particle.y - Math.random() * 20) + "%"]
                            }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1 }}
                            className="absolute w-2 h-2 rounded-full"
                            style={{
                                backgroundColor: particle.color,
                                pointerEvents: 'none'
                            }}
                        />
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ABAPExplorer;