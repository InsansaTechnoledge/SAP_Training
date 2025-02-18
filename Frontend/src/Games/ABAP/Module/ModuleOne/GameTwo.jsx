import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Book, Terminal, Sparkles, CheckCircle, Circle, Play, RefreshCw, Lock, ChevronDown, ChevronUp } from 'lucide-react';
import GameTwoLevelInterface from './GameTwoLevelInterface';

const ABAPExplorer = ({ score, setScore }) => {
    const [currentNodeIndex, setCurrentNodeIndex] = useState(0);
    const [discoveredConcepts, setDiscoveredConcepts] = useState([]);
    const [gameStarted, setGameStarted] = useState(false);
    const [particleEffects, setParticleEffects] = useState([]);
    const [activeCodeBlock, setActiveCodeBlock] = useState(null);
    const [showChallenge, setShowChallenge] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [executionOutput, setExecutionOutput] = useState('');
    const [codeSuccess, setCodeSuccess] = useState(false);
    const [isCompiling, setIsCompiling] = useState(false);
    const [isMapExpanded, setIsMapExpanded] = useState(true);
    const [levelDisplay, setLevelDisplay] = useState();
    const [userInput, setUserInput] = useState('');
    const [currentLevel, setCurrentLevel] = useState(1);
    const [currentLevelPath, setCurrentLevelPath] = useState([]);

    // Flatten the learning path
    const learningPath = [
        {
            id: 'intro_abap_basics',
            title: 'Introduction to ABAP',
            content: {
                concept: 'ABAP Fundamentals',
                explanation: 'ABAP (Advanced Business Application Programming) is SAP\'s programming language. Let\'s write our first ABAP program.',
                baseCode: 'WRITE: ___.\n\n* This is a comment\nWRITE: ___.',
                challenge: {
                    description: "Write your first ABAP program by printing 'Hello ABAP' and 'I am learning'",
                    gaps: [
                        { id: 'gap1', options: ["'Hello ABAP'", "'Hello World'", "'Hi ABAP'"], correct: "'Hello ABAP'" },
                        { id: 'gap2', options: ["'I am learning'", "'Welcome'", "'Testing'"], correct: "'I am learning'" }
                    ],
                    expectedOutput: "Hello ABAP\nI am learning"
                }
            }
        },
        {
            id: 'numeric_datatypes',
            title: 'Numeric Data Types',
            content: {
                concept: 'Integer and Decimal Types',
                explanation: 'ABAP has different numeric types: i (integer), p (packed), f (float). Let\'s work with integer type.',
                baseCode: 'DATA: lv_integer TYPE i,\n      lv_decimal TYPE p DECIMALS 2.\n\nlv_integer = ___.\nlv_decimal = ___.\n\nWRITE: / lv_integer, / lv_decimal.',
                challenge: {
                    description: "Initialize an integer with 42 and a decimal with 3.14",
                    gaps: [
                        { id: 'gap1', options: ['42', '100', '55'], correct: '42' },
                        { id: 'gap2', options: ['3.14', '2.50', '1.00'], correct: '3.14' }
                    ],
                    expectedOutput: "42\n3.14"
                }
            }
        },
        {
            id: 'character_string_types',
            title: 'Character & String Types',
            content: {
                concept: 'Text Data Types',
                explanation: 'ABAP uses c (fixed-length character), n (numeric text), and string (variable-length) types for text.',
                baseCode: 'DATA: lv_char   TYPE c LENGTH 10,\n      lv_string TYPE string.\n\nlv_char   = ___.\nlv_string = ___.\n\nWRITE: / lv_char, / lv_string.',
                challenge: {
                    description: "Store 'ABAP' in fixed-length char and 'Programming Language' in string",
                    gaps: [
                        { id: 'gap1', options: ["'ABAP'", "'SAP'", "'CODE'"], correct: "'ABAP'" },
                        { id: 'gap2', options: ["'Programming Language'", "'Code'", "'System'"], correct: "'Programming Language'" }
                    ],
                    expectedOutput: "ABAP\nProgramming Language"
                }
            }
        },
        {
            id: 'variable_declaration',
            title: 'Variable Declaration',
            content: {
                concept: 'Variable Declaration and Initialization',
                explanation: 'Variables in ABAP must be declared with DATA statement and can be initialized inline.',
                baseCode: 'DATA: lv_count TYPE i ___ 5,\n      lv_name  TYPE string ___ \'John\',\n      lv_active TYPE abap_bool ___ abap_true.\n\nWRITE: / lv_count, / lv_name, / lv_active.',
                challenge: {
                    description: "Complete the variable declarations using the correct initialization keyword (VALUE)",
                    gaps: [
                        { id: 'gap1', options: ['VALUE', 'INITIAL', 'DEFAULT'], correct: 'VALUE' },
                        { id: 'gap2', options: ['VALUE', 'INITIAL', 'DEFAULT'], correct: 'VALUE' },
                        { id: 'gap3', options: ['VALUE', 'INITIAL', 'DEFAULT'], correct: 'VALUE' }
                    ],
                    expectedOutput: "5\nJohn\nX"
                }
            }
        },
        {
            id: 'arithmetic_operators',
            title: 'Arithmetic Operators',
            content: {
                concept: 'Basic Calculations',
                explanation: 'ABAP supports standard arithmetic operators: + (add), - (subtract), * (multiply), / (divide), and ** (exponentiation).',
                baseCode: 'DATA: lv_num1 TYPE i VALUE 10,\n      lv_num2 TYPE i VALUE 3,\n      lv_result TYPE i.\n\nlv_result = lv_num1 ___ lv_num2.\n* Now try division\nlv_result = lv_num1 ___ lv_num2.',
                challenge: {
                    description: "Perform multiplication and division operations",
                    gaps: [
                        { id: 'gap1', options: ['*', '+', '-'], correct: '*' },
                        { id: 'gap2', options: ['/', '*', '+'], correct: '/' }
                    ],
                    expectedOutput: "30\n3"
                }
            }
        },
        {
            id: 'if_statement',
            title: 'IF Statement',
            content: {
                concept: 'Conditional Logic',
                explanation: 'IF statements allow conditional execution of code based on logical conditions.',
                baseCode: 'DATA: lv_number TYPE i VALUE 15.\n\nIF lv_number ___ 10.\n  WRITE: \'Greater than 10\'.\n___ lv_number = 10.\n  WRITE: \'Equals 10\'.\nELSE.\n  WRITE: \'Less than 10\'.\nENDIF.',
                challenge: {
                    description: "Complete the IF statement using correct comparison operator and ELSEIF keyword",
                    gaps: [
                        { id: 'gap1', options: ['>', '<', '='], correct: '>' },
                        { id: 'gap2', options: ['ELSEIF', 'ELSE IF', 'ELIF'], correct: 'ELSEIF' }
                    ],
                    expectedOutput: "Greater than 10"
                }
            }
        },
        {
            id: 'case_statement',
            title: 'CASE Statement',
            content: {
                concept: 'Multiple Choice Control',
                explanation: 'CASE statements provide a cleaner way to handle multiple conditions compared to IF-ELSEIF chains.',
                baseCode: 'DATA: lv_grade TYPE c LENGTH 1 VALUE ___.\n\nCASE lv_grade.\n  WHEN \'A\'.\n    WRITE: \'Excellent\'.\n  WHEN ___.\n    WRITE: \'Good\'.\n  WHEN \'C\'.\n    WRITE: \'Fair\'.\n  OTHERS.\n    WRITE: \'Need improvement\'.\nENDCASE.',
                challenge: {
                    description: "Complete the CASE statement for grade evaluation",
                    gaps: [
                        { id: 'gap1', options: ["'A'", "'B'", "'C'"], correct: "'A'" },
                        { id: 'gap2', options: ["'B'", "'C'", "'D'"], correct: "'B'" }
                    ],
                    expectedOutput: "Excellent"
                }
            }
        },
        {
            id: 'do_loop',
            title: 'DO Loop',
            content: {
                concept: 'Basic Loop Structure',
                explanation: 'DO loops allow you to repeat code a specific number of times.',
                baseCode: 'DATA: lv_sum TYPE i VALUE 0,\n      lv_count TYPE i VALUE ___.\n\nDO ___ TIMES.\n  lv_sum = lv_sum + sy-index.\nENDDO.\n\nWRITE: lv_sum.',
                challenge: {
                    description: "Calculate sum of first 5 numbers using DO loop",
                    gaps: [
                        { id: 'gap1', options: ['0', '1', '5'], correct: '0' },
                        { id: 'gap2', options: ['3', '5', '10'], correct: '5' }
                    ],
                    expectedOutput: "15"
                }
            }
        },
        {
            id: 'while_loop',
            title: 'WHILE Loop',
            content: {
                concept: 'Condition-Based Loop',
                explanation: 'WHILE loops continue executing as long as a condition remains true.',
                baseCode: 'DATA: lv_counter TYPE i VALUE 1,\n      lv_result TYPE i VALUE 1.\n\nWHILE lv_counter ___ 5.\n  lv_result = lv_result * ___.\n  lv_counter = lv_counter + 1.\nENDWHILE.\n\nWRITE: lv_result.',
                challenge: {
                    description: "Calculate factorial of 5 using WHILE loop",
                    gaps: [
                        { id: 'gap1', options: ['<=', '<', '>='], correct: '<=' },
                        { id: 'gap2', options: ['lv_counter', 'lv_result', '2'], correct: 'lv_counter' }
                    ],
                    expectedOutput: "120"
                }
            }
        },
        {
            id: 'compound_conditions',
            title: 'Compound Conditions',
            content: {
                concept: 'Complex Logical Expressions',
                explanation: 'Combine conditions using AND, OR, and NOT operators for complex logic.',
                baseCode: 'DATA: lv_age TYPE i VALUE 25,\n      lv_is_member TYPE abap_bool VALUE abap_true.\n\nIF lv_age ___ 18 ___ lv_is_member = abap_true.\n  WRITE: \'Access granted\'.\nELSE.\n  WRITE: \'Access denied\'.\nENDIF.',
                challenge: {
                    description: "Create a condition that checks if person is adult AND is a member",
                    gaps: [
                        { id: 'gap1', options: ['>=', '>', '='], correct: '>=' },
                        { id: 'gap2', options: ['AND', 'OR', 'NOT'], correct: 'AND' }
                    ],
                    expectedOutput: "Access granted"
                }
            }
        },
        {
            id: 'nested_control',
            title: 'Nested Control Structures',
            content: {
                concept: 'Combined Control Structures',
                explanation: 'Control structures can be nested within each other for complex logic flows.',
                baseCode: 'DATA: lv_num TYPE i VALUE ___.\n\nIF lv_num > 0.\n  DO ___ TIMES.\n    IF sy-index MOD 2 = 0.\n      WRITE: sy-index.\n    ENDIF.\n  ENDDO.\nENDIF.',
                challenge: {
                    description: "Print even numbers up to 6 using nested IF inside DO loop",
                    gaps: [
                        { id: 'gap1', options: ['1', '5', '10'], correct: '10' },
                        { id: 'gap2', options: ['4', '6', '8'], correct: '6' }
                    ],
                    expectedOutput: "2 4 6"
                }
            }
        },
        // Level 2 - Guess the output
        {
            id: 'intro_abap_basics_l2',
            level: 2,
            title: 'Introduction to ABAP - Level 2',
            content: {
                concept: 'Output Prediction',
                explanation: 'Understanding how ABAP code executes is crucial. Predict the output of this program.',
                baseCode: 'DATA: lv_num1 TYPE i VALUE 10,\n      lv_num2 TYPE i VALUE 5.\n\nlv_num1 = lv_num1 + lv_num2.\nlv_num2 = lv_num1 * 2.\n\nWRITE: / lv_num1.\nWRITE: / lv_num2.',
                challenge: {
                    type: 'guessOutput',
                    description: "What will be the output of this program? Select the correct sequence of numbers.",
                    options: [
                        "15\n30",
                        "10\n20",
                        "15\n20",
                        "20\n30"
                    ],
                    correct: "15\n30"
                }
            }
        },
        // Level 3 - Write code
        {
            id: 'intro_abap_basics_l3',
            level: 3,
            title: 'Introduction to ABAP - Level 3',
            content: {
                concept: 'Code Writing',
                explanation: 'Now you\'ll write complete ABAP code blocks. Write a program that calculates and displays the sum and average of three numbers.',
                baseCode: 'DATA: lv_num1 TYPE i VALUE 10,\n      lv_num2 TYPE i VALUE 20,\n      lv_num3 TYPE i VALUE 30,\n      lv_sum  TYPE i,\n      lv_avg  TYPE p DECIMALS 2.\n\n* Write your code here\n',
                challenge: {
                    type: 'writeCode',
                    description: "Complete the program to calculate and display the sum and average of the three numbers.",
                    expectedOutput: "Sum: 60\nAverage: 20.00",
                    solution: [
                        "lv_sum = lv_num1 + lv_num2 + lv_num3.",
                        "lv_avg = lv_sum / 3.",
                        "WRITE: / 'Sum: ', lv_sum.",
                        "WRITE: / 'Average: ', lv_avg."
                    ]
                }
            }
        }
    ];

    useEffect(() => {
        const filteredPath = learningPath.filter(node =>
            (node.level || 1) === currentLevel
        );
        setCurrentLevelPath(filteredPath);
        if (gameStarted && filteredPath.length > 0) {
            setActiveCodeBlock(filteredPath[0].content);
            setCurrentNodeIndex(0);
        }
    }, [currentLevel, gameStarted]);



    const handleChallengeAttempt = () => {
        setIsCompiling(true);
        setExecutionOutput('Compiling ABAP code...');

        setTimeout(() => {
            let isCorrect = false;
            const challenge = activeCodeBlock.challenge;

            if (currentLevel === 1) {
                // Level 1: Fill in the blanks
                isCorrect = challenge.gaps.every(
                    gap => selectedOptions[gap.id] === gap.correct
                );
            } else if (currentLevel === 2) {
                // Level 2: Guess the output
                isCorrect = selectedOptions.output === challenge.correct;
            } else {
                // Level 3: Write code

                var solutionString = challenge.solution.join('');

                isCorrect = solutionString.replace(/\s+/g, '') === userInput.replace(/\s+/g, '')

                // isCorrect = solutionString.replace(" ", "").replace("\n", "").replace("\t", "") == userInput.replace(" ", "").replace("\n", "").replace("\t", "")
            }

            setIsCompiling(false);

            if (isCorrect) {
                setExecutionOutput(challenge.expectedOutput);
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
            } else {
                setExecutionOutput('Incorrect solution. Try again!');
                setCodeSuccess(false);
            }
        }, 1000);
    };



    const renderChallenge = () => {
        if (!activeCodeBlock || !activeCodeBlock.challenge) return null;

        const challenge = activeCodeBlock.challenge;

        switch (currentLevel) {
            case 1:
                // Level 1: Fill in the blanks
                return (
                    <div className="bg-gray-800 p-4 rounded-lg">
                        <pre className="text-green-400 overflow-x-auto whitespace-pre-wrap">
                            {activeCodeBlock.baseCode.split('___').map((part, index) => (
                                <React.Fragment key={index}>
                                    {part}
                                    {index < challenge.gaps.length && (
                                        <select
                                            value={selectedOptions[challenge.gaps[index].id] || ''}
                                            onChange={(e) => handleOptionSelect(
                                                challenge.gaps[index].id,
                                                e.target.value
                                            )}
                                            className="bg-purple-900 text-white px-2 py-1 rounded mx-1 border border-purple-500/30"
                                        >
                                            <option value="">Select...</option>
                                            {challenge.gaps[index].options.map((opt) => (
                                                <option key={opt} value={opt}>{opt}</option>
                                            ))}
                                        </select>
                                    )}
                                </React.Fragment>
                            ))}
                        </pre>
                    </div>
                );
            case 2:
                // Level 2: Guess the output
                return (
                    <div className="space-y-4">
                        <div className="bg-gray-800 p-4 rounded-lg">
                            <pre className="text-green-400 overflow-x-auto whitespace-pre-wrap">
                                {activeCodeBlock.baseCode}
                            </pre>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            {challenge.options.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedOptions({ output: option })}
                                    className={`p-2 rounded-lg text-white ${selectedOptions.output === option
                                            ? 'bg-purple-600'
                                            : 'bg-gray-700 hover:bg-gray-600'
                                        }`}
                                >
                                    <pre>{option}</pre>
                                </button>
                            ))}
                        </div>
                    </div>
                );
            case 3:
                // Level 3: Write code
                return (
                    <div className="space-y-4">
                        <div className="bg-gray-800 p-4 rounded-lg">
                            <pre className="text-green-400 overflow-x-auto whitespace-pre-wrap">
                                {activeCodeBlock.baseCode}
                            </pre>
                        </div>
                        <textarea
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            className="w-full h-32 bg-gray-800 text-green-400 p-4 rounded-lg font-mono"
                            placeholder="Write your ABAP code here..."
                        />
                    </div>
                );
            default:
                return null;
        }
    };





    const handleOptionSelect = (gapId, value) => {
        setSelectedOptions(prev => ({
            ...prev,
            [gapId]: value
        }));
    };

    const executeCode = () => {
        if (!activeCodeBlock || !activeCodeBlock.challenge) return;

        setIsCompiling(true);
        setExecutionOutput('Compiling ABAP code...');

        setTimeout(() => {
            const isCorrect = activeCodeBlock.challenge.gaps.every(
                gap => selectedOptions[gap.id] === gap.correct
            );

            setIsCompiling(false);

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
        }, 1000); // Show compiling message for 1 second
    };

    const startGame = () => {
        setGameStarted(true);
        setLevelDisplay(true);
        setScore(0);
        setDiscoveredConcepts([]);
        setSelectedOptions({});
        setExecutionOutput('');
        setCodeSuccess(false);
    };

    const proceedToNextChallenge = () => {
        if (currentNodeIndex < currentLevelPath.length - 1) {
            setCurrentNodeIndex(prev => prev + 1);
            setActiveCodeBlock(currentLevelPath[currentNodeIndex + 1].content);
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
                    <motion.div className="text-center p-8 bg-gradient-to-r from-purple-900/50 to-violet-900/50 rounded-2xl border border-purple-500/30 backdrop-blur-md">
                        <motion.h2 className="text-4xl text-white mb-6 font-bold">
                            Master ABAP Step by Step
                        </motion.h2>
                        <p className="text-gray-300 mb-6">
                            Complete challenges across three difficulty levels
                        </p>
                        <button
                        onClick={()=>{
                            setLevelDisplay(true)
                            setGameStarted(true)
                        }}
                        className='bg-purple-600 border-purple-400 p-4 rounded-xl border text-white transition-all duration-300'>
                            Start Game
                        </button>
                        {/* <div className="grid grid-cols-3 gap-4 mb-6 w-full max-w-lg mx-auto">
                            {[1, 2, 3].map((level) => (
                                <button
                                    key={level}
                                    onClick={() => {
                                        setCurrentLevel(level);
                                        startGame();
                                    }}
                                    className={`p-4 rounded-xl border ${currentLevel === level
                                            ? 'bg-purple-600 border-purple-400'
                                            : 'bg-gray-800 border-gray-600 hover:bg-gray-700'
                                        } text-white transition-all duration-300`}
                                >
                                    <div className="text-xl font-bold mb-2">Level {level}</div>
                                    <div className="text-sm opacity-80">
                                        {level === 1 ? 'Fill Blanks' : level === 2 ? 'Guess Output' : 'Write Code'}
                                    </div>
                                </button>
                            ))}
                        </div>  */}
                    </motion.div>
                ) : (

                    <>
                        {
                            levelDisplay ?
                                (
                                    <>
                                        <GameTwoLevelInterface proceedToNextChallenge={proceedToNextChallenge} setCurrentLevel={setCurrentLevel} setLevelDisplay={setLevelDisplay} currentLevel={currentLevel} startGame={startGame}/>
                                    </>
                                )
                                :
                                (
                                    <>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {/* Learning Path Map with Collapse/Expand */}
                                            <div className="bg-gray-900/80 p-6 rounded-2xl border border-purple-500/30">
                                                <div className="flex justify-between items-center mb-4">
                                                    <h2 className="text-2xl font-bold text-white">Level {currentLevel} Progress</h2>
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

                                                        {renderChallenge()}

                                                        <div className="space-y-2">
                                                            <div className="flex justify-between items-center">
                                                                <h3 className="text-white font-semibold">Output:</h3>
                                                                <div className="flex gap-2">
                                                                    <button
                                                                        onClick={handleChallengeAttempt}
                                                                        disabled={isCompiling}
                                                                        className={`bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 ${isCompiling ? 'opacity-50 cursor-not-allowed' : ''
                                                                            }`}
                                                                    >
                                                                        {isCompiling ? (
                                                                            <RefreshCw className="w-4 h-4 animate-spin" />
                                                                        ) : (
                                                                            <Play className="w-4 h-4" />
                                                                        )}
                                                                        {isCompiling ? 'Compiling...' : 'Run'}
                                                                    </button>
                                                                    <button
                                                                        onClick={() => {
                                                                            setSelectedOptions({});
                                                                            setUserInput('');
                                                                            setExecutionOutput('');
                                                                            setCodeSuccess(false);
                                                                        }}
                                                                        disabled={isCompiling}
                                                                        className={`bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 ${isCompiling ? 'opacity-50 cursor-not-allowed' : ''
                                                                            }`}
                                                                    >
                                                                        <RefreshCw className="w-4 h-4" />
                                                                        Reset
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <div
                                                                className={`p-4 rounded-lg ${isCompiling
                                                                    ? 'bg-blue-900/30 border border-blue-500/30'
                                                                    : executionOutput
                                                                        ? (codeSuccess ? 'bg-green-900/30' : 'bg-red-900/30')
                                                                        : 'bg-gray-800'
                                                                    }`}
                                                            >
                                                                <motion.pre
                                                                    key={executionOutput}
                                                                    initial={{ opacity: 0 }}
                                                                    animate={{ opacity: 1 }}
                                                                    transition={{ duration: 0.3 }}
                                                                    className="text-white font-mono"
                                                                >
                                                                    {isCompiling ? (
                                                                        <div className="flex items-center gap-2">
                                                                            <RefreshCw className="w-4 h-4 animate-spin" />
                                                                            {executionOutput}
                                                                        </div>
                                                                    ) : (
                                                                        executionOutput || 'Output will appear here...'
                                                                    )}
                                                                </motion.pre>
                                                            </div>
                                                        </div>

                                                        {codeSuccess && (
                                                            <motion.button
                                                                whileHover={{ scale: 1.05 }}
                                                                whileTap={{ scale: 0.95 }}
                                                                onClick={()=>{
                                                                    currentNodeIndex >= currentLevelPath.length-1
                                                                    ?
                                                                    (
                                                                        <>
                                                                        {setLevelDisplay(true)}
                                                                        {setCurrentLevel(currentLevel+1)}
                                                                        </>
                                                                    )
                                                                    :
                                                                    proceedToNextChallenge()
                                                                }}
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
                                        <div className={`p-4 rounded-lg ${isCompiling
                                                ? 'bg-blue-900/30 border border-blue-500/30'
                                                : executionOutput
                                                    ? (codeSuccess ? 'bg-green-900/30' : 'bg-red-900/30')
                                                    : 'bg-gray-800'
                                            }`}>
                                            <motion.pre
                                                key={executionOutput}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ duration: 0.3 }}
                                                className="text-white font-mono"
                                            >
                                                {isCompiling ? (
                                                    <div className="flex items-center gap-2">
                                                        <RefreshCw className="w-4 h-4 animate-spin" />
                                                        {executionOutput}
                                                    </div>
                                                ) : (
                                                    executionOutput || 'Output will appear here...'
                                                )}
                                            </motion.pre>
                                        </div>
                                    

                                    </>
                                )
                        }
                    </>
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