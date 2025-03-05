import { AppwriteDB } from "../config/db.js";
import { Query } from "node-appwrite";


export const addQuestion = async () => {
    try {
        const questions = [
            {
                "question": "What does ABAP stand for?",
                "option1": "Advanced Business Automation Programming",
                "option2": "Advanced Business Application Programming",
                "option3": "Automated Business Application Processing",
                "option4": "Application-Based Advanced Programming",
                "correctOption": "option2",
                "explanation": "ABAP stands for Advanced Business Application Programming, which is SAP\u2019s proprietary programming language."
            },
            {
                "question": "Which platform does ABAP primarily run on?",
                "option1": ".NET Framework",
                "option2": "Java Virtual Machine",
                "option3": "SAP NetWeaver",
                "option4": "Android OS",
                "correctOption": "option3",
                "explanation": "ABAP is designed to run primarily on the SAP NetWeaver platform."
            },
            {
                "question": "Which of the following is the modern development environment for ABAP?",
                "option1": "SE80",
                "option2": "ABAP Development Tools (ADT)",
                "option3": "SAP Console",
                "option4": "Eclipse for Java",
                "correctOption": "option2",
                "explanation": "ABAP Development Tools (ADT) is the modern development environment that runs on Eclipse."
            },
            {
                "question": "What is the purpose of SE80 in SAP ABAP?",
                "option1": "Managing SAP users",
                "option2": "Handling SAP licensing",
                "option3": "Providing an integrated environment for ABAP development",
                "option4": "Creating mobile applications",
                "correctOption": "option3",
                "explanation": "SE80 is an integrated environment for ABAP development within SAP GUI."
            },
            {
                "question": "Which ABAP tool is used for writing and editing ABAP programs?",
                "option1": "SE24",
                "option2": "SE38",
                "option3": "SE11",
                "option4": "SE37",
                "correctOption": "option2",
                "explanation": "SE38 is the transaction code for ABAP Editor, where developers write and edit ABAP programs."
            },
            {
                "question": "Which of the following best describes the purpose of ABAP Development Tools (ADT) compared to SE80?",
                "option1": "ADT is an Eclipse-based development environment, while SE80 is SAP GUI-based.",
                "option2": "SE80 supports modern ABAP features like RAP and CDS Views, while ADT does not.",
                "option3": "ADT is primarily used for debugging, while SE80 is for writing ABAP programs.",
                "option4": "SE80 is recommended for modern ABAP development due to cloud integration.",
                "correctOption": "option1",
                "explanation": "ADT is an Eclipse-based development environment, providing modern features over SE80."
            },
            {
                "question": "In the ABAP Workbench (SE80), which tool is specifically used for defining database tables, views, and data elements?",
                "option1": "Class Builder (SE24)",
                "option2": "Function Builder (SE37)",
                "option3": "ABAP Dictionary (SE11)",
                "option4": "Screen Painter",
                "correctOption": "option3",
                "explanation": "ABAP Dictionary (SE11) is used for defining database tables, views, and data elements."
            },
            {
                "question": "Which of the following is NOT an advantage of using ABAP for SAP ERP development?",
                "option1": "Customization of standard SAP applications",
                "option2": "Integration with third-party systems",
                "option3": "Direct execution on non-SAP platforms",
                "option4": "Performance optimization using built-in tools",
                "correctOption": "option3",
                "explanation": "ABAP cannot be directly executed on non-SAP platforms."
            },
            {
                "question": "What is the primary reason ADT is recommended over SE80 for modern ABAP development?",
                "option1": "ADT supports advanced features like RAP and real-time syntax checking.",
                "option2": "SE80 does not support object-oriented programming.",
                "option3": "ADT is used only for debugging and performance tuning.",
                "option4": "SE80 is no longer supported in SAP NetWeaver.",
                "correctOption": "option1",
                "explanation": "ADT provides support for RAP, syntax checking, and better modern ABAP development capabilities."
            },
            {
                "question": "In the ABAP Workbench (SE80), which tool is used to define reusable function modules for modularization?",
                "option1": "ABAP Dictionary (SE11)",
                "option2": "Function Builder (SE37)",
                "option3": "Class Builder (SE24)",
                "option4": "ABAP Editor (SE38)",
                "correctOption": "option2",
                "explanation": "Function Builder (SE37) is used to define and manage reusable function modules."
            },
            {
                "question": "Which ABAP development environment provides real-time syntax checking and better integration with version control systems?",
                "option1": "SE80 (ABAP Workbench)",
                "option2": "Screen Painter",
                "option3": "ABAP Development Tools (ADT)",
                "option4": "Menu Painter",
                "correctOption": "option3",
                "explanation": "ADT provides real-time syntax checking and better integration with version control systems."
            },
            {
                "question": "What is the primary advantage of using ABAP Development Tools (ADT) over the traditional SE80 environment?",
                "option1": "ADT supports modern ABAP features like RAP, CDS Views, and Unit Testing.",
                "option2": "SE80 allows object-oriented programming, while ADT does not.",
                "option3": "ADT is only used for debugging, while SE80 is for writing programs.",
                "option4": "SE80 is required for cloud-based ABAP development",
                "correctOption": "option1",
                "explanation": "ADT enables modern ABAP development with features like RAP, CDS Views, and Unit Testing."
            },
         
            {
                "question": "What is the correct syntax to declare a variable in ABAP?",
                "option1": "DECLARE lv_price TYPE DECIMALS 2;",
                "option2": "DATA: lv_price TYPE P DECIMALS 2.",
                "option3": "VAR lv_price AS P DECIMALS 2;",
                "option4": "lv_price = new P(2);",
                "correctOption": "option2",
                "explanation": "The correct syntax to declare a variable in ABAP follows the format: DATA: lv_price TYPE P DECIMALS 2."
            },
         
             {
                "question": "Which of the following is NOT a predefined data type in ABAP?",
                "option1": "C (Character)",
                "option2": "I (Integer)",
                "option3": "V (Variable String)",
                "option4": "P (Packed Decimal)",
                "correctOption": "option3",
                "explanation": "ABAP does not have a predefined data type called 'V' (Variable String). Instead, it uses 'STRING' for variable-length character data."
            },
         
            {
                "question": "What is the output of the following ABAP code?\nDATA: lv_text TYPE string.\n\nlv_text = 'Hello, ABAP!'.\n\nWRITE lv_text.",
                "option1": "Compilation error",
                "option2": "Blank output",
                "option3": "Hello, ABAP!",
                "option4": "NULL",
                "correctOption": "option3",
                "explanation": "The WRITE statement prints the value of lv_text, which is 'Hello, ABAP!'."
            },
            {
                "question": "Which ABAP data type is used to store whole numbers?",
                "option1": "I (Integer)",
                "option2": "C (Character)",
                "option3": "P (Packed Decimal)",
                "option4": "T (Time)",
                "correctOption": "option1",
                "explanation": "The 'I' (Integer) data type is used to store whole numbers in ABAP."
            },
         
            {
                "question": "What is an internal table in ABAP used for?",
                "option1": "Storing a single value",
                "option2": "Storing multiple records dynamically",
                "option3": "Running SQL queries",
                "option4": "Connecting to external databases",
                "correctOption": "option2",
                "explanation": "Internal tables in ABAP are used to store multiple records dynamically, similar to arrays in other programming languages."
            },
            {
                "question": "What is the correct syntax to define a structured type in ABAP?",
                "option1": "DATA: BEGIN STRUCT ty_employee, emp_id TYPE I, name TYPE C LENGTH 20, salary TYPE P DECIMALS 2, END STRUCT.",
                "option2": "TYPES: BEGIN OF ty_employee, emp_id TYPE I, name TYPE C LENGTH 20, salary TYPE P DECIMALS 2, END OF ty_employee.",
                "option3": "CREATE STRUCTURE ty_employee AS (emp_id INT, name CHAR(20), salary DECIMAL(2)).",
                "option4": "DECLARE TYPE ty_employee WITH emp_id INT, name CHAR(20), salary DECIMAL(2).",
                "correctOption": "option2",
                "explanation": "The correct syntax for defining a structured type in ABAP is using TYPES: BEGIN OF ... END OF."
            },
         
             {
                "question": "What will be the output of the following ABAP code snippet?\n\nCONSTANTS gc_company TYPE char20 VALUE 'SAP'.  \nWRITE gc_company.",
                "option1": "Compilation error",
                "option2": "SAP",
                "option3": "20 spaces",
                "option4": "NULL",
                "correctOption": "option2",
                "explanation": "The constant `gc_company` is defined as a CHAR(20) type with the value 'SAP'. When written to the output, it will display 'SAP' with trailing spaces, but in most cases, spaces are trimmed in the output."
            },
         
             {
                "question": "Which of the following is NOT a type of variable in ABAP?",
                "option1": "Scalar",
                "option2": "Structure",
                "option3": "Constant",
                "option4": "Internal Table",
                "correctOption": "option3",
                "explanation": "A constant is not a variable because its value cannot be changed once assigned."
            },
            {
                "question": "What is the role of a TYPE in ABAP?",
                "option1": "It stores actual values in memory",
                "option2": "It defines the structure but does not hold any data",
                "option3": "It is only used for predefined types",
                "option4": "It is used to perform mathematical operations",
                "correctOption": "option2",
                "explanation": "A TYPE in ABAP defines the structure but does not store data; it acts as a blueprint."
            },
            {
                "question": "What is the correct analogy for a TYPE in ABAP?",
                "option1": "A completed building",
                "option2": "A blueprint for a building",
                "option3": "A construction site",
                "option4": "A tenant renting a building",
                "correctOption": "option2",
                "explanation": "A TYPE in ABAP is like a blueprint; it defines the structure but does not contain actual data."
            },
            {
                "question": "Which of the following is NOT a predefined data type in ABAP?",
                "option1": "C (Character)",
                "option2": "I (Integer)",
                "option3": "Z (Custom Type)",
                "option4": "X (Hexadecimal)",
                "correctOption": "option3",
                "explanation": "Z is not a predefined data type in ABAP; it is often used as a prefix for custom types."
            },
         
            {
                "question": "How does ABAP store date values?",
                "option1": "MM-DD-YYYY format",
                "option2": "YYYY-MM-DD format",
                "option3": "YYYYMMDD format",
                "option4": "DD-MM-YYYY format",
                "correctOption": "option3",
                "explanation": "ABAP stores date values in the YYYYMMDD format as an 8-character string."
            },
            {
                "question": "Which numeric type in ABAP is used for storing whole numbers?",
                "option1": "F (Floating Point)",
                "option2": "P (Packed Decimal)",
                "option3": "I (Integer)",
                "option4": "X (Byte Field)",
                "correctOption": "option3",
                "explanation": "The 'I' (Integer) data type is used in ABAP to store whole numbers."
            },
            {
                "question": "Which statement is used to define a user-defined type in ABAP?",
                "option1": "DATA",
                "option2": "TYPES",
                "option3": "DEFINE",
                "option4": "STRUCTURE",
                "correctOption": "option2",
                "explanation": "The 'TYPES' statement is used in ABAP to define user-defined types."
            },
            {
                "question": "Which category of predefined types in ABAP is used for raw data storage?",
                "option1": "Character Types",
                "option2": "Numeric Types",
                "option3": "Hexadecimal Type",
                "option4": "Structured Types",
                "correctOption": "option3",
                "explanation": "Hexadecimal types (e.g., X type) are used in ABAP for raw data storage."
            },
            {
                "question": "What is the purpose of structured types in ABAP?",
                "option1": "To store raw hexadecimal values",
                "option2": "To store single numeric values",
                "option3": "To group multiple fields together like a database record",
                "option4": "To define a fixed-length character string",
                "correctOption": "option3",
                "explanation": "Structured types in ABAP allow grouping multiple fields together, similar to database records."
            },
            {
                "question": "What happens when a variable is declared but not initialized in ABAP?",
                "option1": "It causes a syntax error",
                "option2": "It is automatically assigned a default value",
                "option3": "It remains undefined and causes a runtime error",
                "option4": "It gets the value of the previous variable in memory",
                "correctOption": "option2",
                "explanation": "In ABAP, uninitialized variables are automatically assigned default values (e.g., '0' for numeric types and space for character types)."
            },
         
             {
                "question": "Which of the following statements is true about internal tables in ABAP?",
                "option1": "They must always have a primary key",
                "option2": "They store multiple records like an array or database table",
                "option3": "They are stored in the database by default",
                "option4": "They do not require a TYPE declaration",
                "correctOption": "option2",
                "explanation": "Internal tables in ABAP act like arrays or database tables and are used to store multiple records dynamically."
            },
            {
                "question": "In ABAP, what is the key difference between a structure and an internal table?",
                "option1": "A structure holds only character-type data",
                "option2": "A structure holds a single record, while an internal table holds multiple records",
                "option3": "An internal table must be predefined in SAP",
                "option4": "A structure must always be declared with the TABLES statement",
                "correctOption": "option2",
                "explanation": "A structure is used to hold a single record, whereas an internal table can hold multiple records dynamically."
            },
            {
                "question": "Which of the following ABAP data types allows for precise decimal arithmetic?",
                "option1": "I (Integer)",
                "option2": "F (Floating Point)",
                "option3": "P (Packed Decimal - DECIMAL)",
                "option4": "N (Numeric Text)",
                "correctOption": "option3",
                "explanation": "The 'P' (Packed Decimal) data type in ABAP allows precise decimal arithmetic, making it suitable for financial calculations."
            },
            {
                "question": "How can a developer define a deep structure in ABAP?",
                "option1": "By including a table type inside another structure",
                "option2": "By using only predefined data types",
                "option3": "By using only numeric and character types",
                "option4": "By defining a structure with a single field",
                "correctOption": "option1",
                "explanation": "A deep structure in ABAP is defined by including another table type inside the structure, enabling complex data organization."
            },
            {
                "question": "What will be the output of the following ABAP code?\n\nDATA: lv_text TYPE string.\nWRITE lv_text.",
                "option1": "A runtime error occurs",
                "option2": "An empty output",
                "option3": "The value ‘0’ is printed",
                "option4": "The variable name is printed",
                "correctOption": "option2",
                "explanation": "If an ABAP string variable is declared but not initialized, it will produce an empty output when written."
            },
         
             {
                "question": "Which ABAP predefined type should be used for storing binary data?",
                "option1": "C (Character)",
                "option2": "I (Integer)",
                "option3": "X (Byte Field)",
                "option4": "P (Packed Decimal)",
                "correctOption": "option3",
                "explanation": "The 'X' (Byte Field) type is used in ABAP to store binary data."
            },
            {
                "question": "What is the difference between LIKE and TYPE in ABAP variable declarations?",
                "option1": "LIKE refers to an existing variable or field, while TYPE defines a new data type",
                "option2": "TYPE refers to an existing variable, while LIKE creates a new data type",
                "option3": "Both LIKE and TYPE are used interchangeably",
                "option4": "LIKE is only used for user-defined types",
                "correctOption": "option1",
                "explanation": "LIKE is used to reference an existing variable or field, whereas TYPE is used to define a new data type."
            },
            {
                "question": "Which ABAP statement is used to dynamically assign memory to a data reference variable?",
                "option1": "CREATE DATA",
                "option2": "ALLOCATE MEMORY",
                "option3": "NEW OBJECT",
                "option4": "MEMORY ASSIGN",
                "correctOption": "option1",
                "explanation": "The 'CREATE DATA' statement is used in ABAP to dynamically allocate memory for data reference variables."
            },
            {
                "question": "What is the default value of an ABAP variable of type C (Character) when not explicitly assigned?",
                "option1": "NULL",
                "option2": "Space (‘ ’)",
                "option3": "0",
                "option4": "Undefined",
                "correctOption": "option2",
                "explanation": "In ABAP, character-type variables default to a space (‘ ’) when they are not explicitly assigned a value."
            },
         
              {
                "question": "Which ABAP predefined type should be used for storing binary data?",
                "option1": "C (Character)",
                "option2": "I (Integer)",
                "option3": "X (Byte Field)",
                "option4": "P (Packed Decimal)",
                "correctOption": "option3",
                "explanation": "The 'X' (Byte Field) type is used in ABAP to store binary data."
            },
            {
                "question": "What is the difference between LIKE and TYPE in ABAP variable declarations?",
                "option1": "LIKE refers to an existing variable or field, while TYPE defines a new data type",
                "option2": "TYPE refers to an existing variable, while LIKE creates a new data type",
                "option3": "Both LIKE and TYPE are used interchangeably",
                "option4": "LIKE is only used for user-defined types",
                "correctOption": "option1",
                "explanation": "LIKE is used to reference an existing variable or field, whereas TYPE is used to define a new data type."
            },
            {
                "question": "Which ABAP statement is used to dynamically assign memory to a data reference variable?",
                "option1": "CREATE DATA",
                "option2": "ALLOCATE MEMORY",
                "option3": "NEW OBJECT",
                "option4": "MEMORY ASSIGN",
                "correctOption": "option1",
                "explanation": "The 'CREATE DATA' statement is used in ABAP to dynamically allocate memory for data reference variables."
            },
            {
                "question": "What is the default value of an ABAP variable of type C (Character) when not explicitly assigned?",
                "option1": "NULL",
                "option2": "Space (‘ ’)",
                "option3": "0",
                "option4": "Undefined",
                "correctOption": "option2",
                "explanation": "In ABAP, character-type variables default to a space (‘ ’) when they are not explicitly assigned a value."
            },
         
             {
                "question": "What is the correct syntax for a WHILE loop in ABAP?",
                "option1": "WHILE (i < 5).  \n  WRITE i.  \n  i = i + 1.  \nLOOP.",
                "option2": "DATA gv_counter TYPE I VALUE 1.  \nWHILE gv_counter <= 5.  \n  WRITE: / 'Count:', gv_counter.  \n  gv_counter = gv_counter + 1.  \nENDWHILE.",
                "option3": "LOOP UNTIL gv_counter > 5.  \n  WRITE gv_counter.  \n  gv_counter = gv_counter + 1.  \nENDLOOP.",
                "option4": "FOR gv_counter = 1 TO 5.  \n  WRITE gv_counter.  \nEND.",
                "correctOption": "option2",
                "explanation": "The correct WHILE loop syntax in ABAP follows the format: WHILE condition. ... ENDWHILE."
            },
            {
                "question": "What will be the output of the following SWITCH statement?\n\nDATA gv_grade TYPE char1 VALUE 'B'.  \nDATA gv_result TYPE string.  \ngv_result = SWITCH string( gv_grade  \n    WHEN 'A' THEN 'Excellent'  \n    WHEN 'B' THEN 'Good'  \n    WHEN 'C' THEN 'Average'  \n    ELSE 'Needs Improvement' ).  \nWRITE gv_result.",
                "option1": "Excellent",
                "option2": "Good",
                "option3": "Average",
                "option4": "Needs Improvement",
                "correctOption": "option2",
                "explanation": "The SWITCH statement evaluates 'B', which matches the condition 'WHEN B', resulting in the output 'Good'."
            },
            {
                "question": "What is the main advantage of the Parallel Cursor Technique?",
                "option1": "Improves loop efficiency when processing large tables",
                "option2": "Reduces memory usage",
                "option3": "Increases SQL execution speed",
                "option4": "Prevents table locking",
                "correctOption": "option1",
                "explanation": "The Parallel Cursor Technique enhances performance by reducing the number of loop iterations required to process large datasets."
            },
         
            {
                "question": "The following piece of code is used:\n\nDATA: def TYPE abc,\nGhi LIKE xyz.\n\nWhich of the four elements are data types and which are data objects?",
                "option1": "abc, xyz - data type\ndef, ghi - data objects",
                "option2": "abc - data type\ndef, ghi - data objects\nxyz - data type or data objects",
                "option3": "def, ghi - data objects\nabc, xyz - data type or data object",
                "option4": "abc - data type\ndef, ghi, xyz - data objects",
                "correctOption": "option2",
                "explanation": "In ABAP, 'abc' is explicitly mentioned as a type, and 'xyz' could be a data type or an object. 'def' and 'ghi' are declared as data objects."
            },
            {
                "question": "Which of the following data types are predefined ABAP data types?",
                "option1": "XSTRING",
                "option2": "RING",
                "option3": "DECIMALS",
                "option4": "FLOAT",
                "correctOption": "option4",
                "explanation": "FLOAT is a predefined numeric data type in ABAP, while RING and DECIMALS are not standard predefined ABAP types."
            },
            {
                "question": "What is required to fully specify a Table Type in the ABAP Dictionary?",
                "option1": "Section line",
                "option2": "Header line",
                "option3": "Table size",
                "option4": "Table key",
                "correctOption": "option4",
                "explanation": "A Table Type in ABAP Dictionary must have a Table Key to define its structure and uniqueness constraints."
            },
         
            {
                "question": "What is the default length of the type P data type?",
                "option1": "1-16",
                "option2": "64",
                "option3": "8",
                "option4": "1",
                "correctOption": "option1",
                "explanation": "The default length for the type P (Packed Decimal) data type in ABAP is between 1 to 16 bytes, depending on the defined precision."
            },
            {
                "question": "Which of the four elements are data types and which are data objects?\n\nDATA: def TYPE abc,\nGhi LIKE xyz.",
                "option1": "abc - data type, def, ghi - data objects, xyz - data type or data objects",
                "option2": "def, ghi - data objects, abc, xyz - data type or data object",
                "option3": "abc, xyz - data type, def, ghi - data objects",
                "option4": "abc - data type, def, ghi, xyz - data objects",
                "correctOption": "option1",
                "explanation": "In ABAP, 'abc' is a data type, 'xyz' could be a data type or a data object, while 'def' and 'ghi' are data objects."
            },
            {
                "question": "Which statement is used to generically define the data reference variable z1?",
                "option1": "data z1 type any table",
                "option2": "data z1 type any",
                "option3": "data z1 type ref to data",
                "option4": "data z1 type ref to PA0001",
                "correctOption": "option3",
                "explanation": "The correct way to generically define a data reference variable in ABAP is using 'data z1 type ref to data'."
            },
            {
                "question": "Which of the following ABAP statements throws an error at the syntax check?",
                "option1": "DATA variable(5) TYPE c.",
                "option2": "DATA variable TYPE t.",
                "option3": "DATA variable(5) TYPE n.",
                "option4": "DATA variable(5) TYPE p.",
                "correctOption": "option2",
                "explanation": "The 'TYPE t' statement is incorrect as 't' is not a valid predefined data type in ABAP."
            },
            {
                "question": "You have been asked to review the following expression, which processes character strings:\n\nresult = find( val = 'abapABAP' sub = 'A' occ = 2 case = 'X' ....).\n\nWhat is the expected value of result?",
                "option1": "4",
                "option2": "2",
                "option3": "6",
                "option4": "1",
                "correctOption": "option3",
                "explanation": "The FIND function searches for the second occurrence of 'A' (case-insensitive) in 'abapABAP', which is at position 6."
            }
        ]
        // const questions = req.body.questions; // Assuming questions come from request body

        if (!Array.isArray(questions) || questions.length === 0) {
            return res.status(400).json({ message: "Invalid or empty questions array" });
        }

        console.log(process.env.APPWRITE_DBID);

        const promises = questions.map((doc) =>
            AppwriteDB.createDocument(
                process.env.APPWRITE_DBID,
                process.env.APPWRITE_DBC_Questions,
                "unique()", // Use "unique()" to auto-generate an ID
                doc
            )
        );

        const responses = await Promise.all(promises); // Wait for all requests to complete
        console.log(responses);
        // return res.status(201).json({ message: "Questions added successfully", responses });
    } catch (error) {
        console.error("Error adding questions:", error);
        // return res.status(500).json({ message: "Failed to add questions", error: error.message });
    }
};

export const addQuestionsToQuiz = async () => {
    const questions = [
        {
            "question": "What does ABAP stand for?",
            "option1": "Advanced Business Automation Programming",
            "option2": "Advanced Business Application Programming",
            "option3": "Automated Business Application Processing",
            "option4": "Application-Based Advanced Programming",
            "correctOption": "option2",
            "explanation": "ABAP stands for Advanced Business Application Programming, which is SAP\u2019s proprietary programming language."
        },
        {
            "question": "Which platform does ABAP primarily run on?",
            "option1": ".NET Framework",
            "option2": "Java Virtual Machine",
            "option3": "SAP NetWeaver",
            "option4": "Android OS",
            "correctOption": "option3",
            "explanation": "ABAP is designed to run primarily on the SAP NetWeaver platform."
        },
        {
            "question": "Which of the following is the modern development environment for ABAP?",
            "option1": "SE80",
            "option2": "ABAP Development Tools (ADT)",
            "option3": "SAP Console",
            "option4": "Eclipse for Java",
            "correctOption": "option2",
            "explanation": "ABAP Development Tools (ADT) is the modern development environment that runs on Eclipse."
        },
        {
            "question": "What is the purpose of SE80 in SAP ABAP?",
            "option1": "Managing SAP users",
            "option2": "Handling SAP licensing",
            "option3": "Providing an integrated environment for ABAP development",
            "option4": "Creating mobile applications",
            "correctOption": "option3",
            "explanation": "SE80 is an integrated environment for ABAP development within SAP GUI."
        },
        {
            "question": "Which ABAP tool is used for writing and editing ABAP programs?",
            "option1": "SE24",
            "option2": "SE38",
            "option3": "SE11",
            "option4": "SE37",
            "correctOption": "option2",
            "explanation": "SE38 is the transaction code for ABAP Editor, where developers write and edit ABAP programs."
        },
        {
            "question": "Which of the following best describes the purpose of ABAP Development Tools (ADT) compared to SE80?",
            "option1": "ADT is an Eclipse-based development environment, while SE80 is SAP GUI-based.",
            "option2": "SE80 supports modern ABAP features like RAP and CDS Views, while ADT does not.",
            "option3": "ADT is primarily used for debugging, while SE80 is for writing ABAP programs.",
            "option4": "SE80 is recommended for modern ABAP development due to cloud integration.",
            "correctOption": "option1",
            "explanation": "ADT is an Eclipse-based development environment, providing modern features over SE80."
        },
        {
            "question": "In the ABAP Workbench (SE80), which tool is specifically used for defining database tables, views, and data elements?",
            "option1": "Class Builder (SE24)",
            "option2": "Function Builder (SE37)",
            "option3": "ABAP Dictionary (SE11)",
            "option4": "Screen Painter",
            "correctOption": "option3",
            "explanation": "ABAP Dictionary (SE11) is used for defining database tables, views, and data elements."
        },
        {
            "question": "Which of the following is NOT an advantage of using ABAP for SAP ERP development?",
            "option1": "Customization of standard SAP applications",
            "option2": "Integration with third-party systems",
            "option3": "Direct execution on non-SAP platforms",
            "option4": "Performance optimization using built-in tools",
            "correctOption": "option3",
            "explanation": "ABAP cannot be directly executed on non-SAP platforms."
        },
        {
            "question": "What is the primary reason ADT is recommended over SE80 for modern ABAP development?",
            "option1": "ADT supports advanced features like RAP and real-time syntax checking.",
            "option2": "SE80 does not support object-oriented programming.",
            "option3": "ADT is used only for debugging and performance tuning.",
            "option4": "SE80 is no longer supported in SAP NetWeaver.",
            "correctOption": "option1",
            "explanation": "ADT provides support for RAP, syntax checking, and better modern ABAP development capabilities."
        },
        {
            "question": "In the ABAP Workbench (SE80), which tool is used to define reusable function modules for modularization?",
            "option1": "ABAP Dictionary (SE11)",
            "option2": "Function Builder (SE37)",
            "option3": "Class Builder (SE24)",
            "option4": "ABAP Editor (SE38)",
            "correctOption": "option2",
            "explanation": "Function Builder (SE37) is used to define and manage reusable function modules."
        },
        {
            "question": "Which ABAP development environment provides real-time syntax checking and better integration with version control systems?",
            "option1": "SE80 (ABAP Workbench)",
            "option2": "Screen Painter",
            "option3": "ABAP Development Tools (ADT)",
            "option4": "Menu Painter",
            "correctOption": "option3",
            "explanation": "ADT provides real-time syntax checking and better integration with version control systems."
        },
        {
            "question": "What is the primary advantage of using ABAP Development Tools (ADT) over the traditional SE80 environment?",
            "option1": "ADT supports modern ABAP features like RAP, CDS Views, and Unit Testing.",
            "option2": "SE80 allows object-oriented programming, while ADT does not.",
            "option3": "ADT is only used for debugging, while SE80 is for writing programs.",
            "option4": "SE80 is required for cloud-based ABAP development",
            "correctOption": "option1",
            "explanation": "ADT enables modern ABAP development with features like RAP, CDS Views, and Unit Testing."
        },
     
        {
            "question": "What is the correct syntax to declare a variable in ABAP?",
            "option1": "DECLARE lv_price TYPE DECIMALS 2;",
            "option2": "DATA: lv_price TYPE P DECIMALS 2.",
            "option3": "VAR lv_price AS P DECIMALS 2;",
            "option4": "lv_price = new P(2);",
            "correctOption": "option2",
            "explanation": "The correct syntax to declare a variable in ABAP follows the format: DATA: lv_price TYPE P DECIMALS 2."
        },
     
         {
            "question": "Which of the following is NOT a predefined data type in ABAP?",
            "option1": "C (Character)",
            "option2": "I (Integer)",
            "option3": "V (Variable String)",
            "option4": "P (Packed Decimal)",
            "correctOption": "option3",
            "explanation": "ABAP does not have a predefined data type called 'V' (Variable String). Instead, it uses 'STRING' for variable-length character data."
        },
     
        {
            "question": "What is the output of the following ABAP code?\nDATA: lv_text TYPE string.\n\nlv_text = 'Hello, ABAP!'.\n\nWRITE lv_text.",
            "option1": "Compilation error",
            "option2": "Blank output",
            "option3": "Hello, ABAP!",
            "option4": "NULL",
            "correctOption": "option3",
            "explanation": "The WRITE statement prints the value of lv_text, which is 'Hello, ABAP!'."
        },
        {
            "question": "Which ABAP data type is used to store whole numbers?",
            "option1": "I (Integer)",
            "option2": "C (Character)",
            "option3": "P (Packed Decimal)",
            "option4": "T (Time)",
            "correctOption": "option1",
            "explanation": "The 'I' (Integer) data type is used to store whole numbers in ABAP."
        },
     
        {
            "question": "What is an internal table in ABAP used for?",
            "option1": "Storing a single value",
            "option2": "Storing multiple records dynamically",
            "option3": "Running SQL queries",
            "option4": "Connecting to external databases",
            "correctOption": "option2",
            "explanation": "Internal tables in ABAP are used to store multiple records dynamically, similar to arrays in other programming languages."
        },
        {
            "question": "What is the correct syntax to define a structured type in ABAP?",
            "option1": "DATA: BEGIN STRUCT ty_employee, emp_id TYPE I, name TYPE C LENGTH 20, salary TYPE P DECIMALS 2, END STRUCT.",
            "option2": "TYPES: BEGIN OF ty_employee, emp_id TYPE I, name TYPE C LENGTH 20, salary TYPE P DECIMALS 2, END OF ty_employee.",
            "option3": "CREATE STRUCTURE ty_employee AS (emp_id INT, name CHAR(20), salary DECIMAL(2)).",
            "option4": "DECLARE TYPE ty_employee WITH emp_id INT, name CHAR(20), salary DECIMAL(2).",
            "correctOption": "option2",
            "explanation": "The correct syntax for defining a structured type in ABAP is using TYPES: BEGIN OF ... END OF."
        },
     
         {
            "question": "What will be the output of the following ABAP code snippet?\n\nCONSTANTS gc_company TYPE char20 VALUE 'SAP'.  \nWRITE gc_company.",
            "option1": "Compilation error",
            "option2": "SAP",
            "option3": "20 spaces",
            "option4": "NULL",
            "correctOption": "option2",
            "explanation": "The constant `gc_company` is defined as a CHAR(20) type with the value 'SAP'. When written to the output, it will display 'SAP' with trailing spaces, but in most cases, spaces are trimmed in the output."
        },
     
         {
            "question": "Which of the following is NOT a type of variable in ABAP?",
            "option1": "Scalar",
            "option2": "Structure",
            "option3": "Constant",
            "option4": "Internal Table",
            "correctOption": "option3",
            "explanation": "A constant is not a variable because its value cannot be changed once assigned."
        },
        {
            "question": "What is the role of a TYPE in ABAP?",
            "option1": "It stores actual values in memory",
            "option2": "It defines the structure but does not hold any data",
            "option3": "It is only used for predefined types",
            "option4": "It is used to perform mathematical operations",
            "correctOption": "option2",
            "explanation": "A TYPE in ABAP defines the structure but does not store data; it acts as a blueprint."
        },
        {
            "question": "What is the correct analogy for a TYPE in ABAP?",
            "option1": "A completed building",
            "option2": "A blueprint for a building",
            "option3": "A construction site",
            "option4": "A tenant renting a building",
            "correctOption": "option2",
            "explanation": "A TYPE in ABAP is like a blueprint; it defines the structure but does not contain actual data."
        },
        {
            "question": "Which of the following is NOT a predefined data type in ABAP?",
            "option1": "C (Character)",
            "option2": "I (Integer)",
            "option3": "Z (Custom Type)",
            "option4": "X (Hexadecimal)",
            "correctOption": "option3",
            "explanation": "Z is not a predefined data type in ABAP; it is often used as a prefix for custom types."
        },
     
        {
            "question": "How does ABAP store date values?",
            "option1": "MM-DD-YYYY format",
            "option2": "YYYY-MM-DD format",
            "option3": "YYYYMMDD format",
            "option4": "DD-MM-YYYY format",
            "correctOption": "option3",
            "explanation": "ABAP stores date values in the YYYYMMDD format as an 8-character string."
        },
        {
            "question": "Which numeric type in ABAP is used for storing whole numbers?",
            "option1": "F (Floating Point)",
            "option2": "P (Packed Decimal)",
            "option3": "I (Integer)",
            "option4": "X (Byte Field)",
            "correctOption": "option3",
            "explanation": "The 'I' (Integer) data type is used in ABAP to store whole numbers."
        },
        {
            "question": "Which statement is used to define a user-defined type in ABAP?",
            "option1": "DATA",
            "option2": "TYPES",
            "option3": "DEFINE",
            "option4": "STRUCTURE",
            "correctOption": "option2",
            "explanation": "The 'TYPES' statement is used in ABAP to define user-defined types."
        },
        {
            "question": "Which category of predefined types in ABAP is used for raw data storage?",
            "option1": "Character Types",
            "option2": "Numeric Types",
            "option3": "Hexadecimal Type",
            "option4": "Structured Types",
            "correctOption": "option3",
            "explanation": "Hexadecimal types (e.g., X type) are used in ABAP for raw data storage."
        },
        {
            "question": "What is the purpose of structured types in ABAP?",
            "option1": "To store raw hexadecimal values",
            "option2": "To store single numeric values",
            "option3": "To group multiple fields together like a database record",
            "option4": "To define a fixed-length character string",
            "correctOption": "option3",
            "explanation": "Structured types in ABAP allow grouping multiple fields together, similar to database records."
        },
        {
            "question": "What happens when a variable is declared but not initialized in ABAP?",
            "option1": "It causes a syntax error",
            "option2": "It is automatically assigned a default value",
            "option3": "It remains undefined and causes a runtime error",
            "option4": "It gets the value of the previous variable in memory",
            "correctOption": "option2",
            "explanation": "In ABAP, uninitialized variables are automatically assigned default values (e.g., '0' for numeric types and space for character types)."
        },
     
         {
            "question": "Which of the following statements is true about internal tables in ABAP?",
            "option1": "They must always have a primary key",
            "option2": "They store multiple records like an array or database table",
            "option3": "They are stored in the database by default",
            "option4": "They do not require a TYPE declaration",
            "correctOption": "option2",
            "explanation": "Internal tables in ABAP act like arrays or database tables and are used to store multiple records dynamically."
        },
        {
            "question": "In ABAP, what is the key difference between a structure and an internal table?",
            "option1": "A structure holds only character-type data",
            "option2": "A structure holds a single record, while an internal table holds multiple records",
            "option3": "An internal table must be predefined in SAP",
            "option4": "A structure must always be declared with the TABLES statement",
            "correctOption": "option2",
            "explanation": "A structure is used to hold a single record, whereas an internal table can hold multiple records dynamically."
        },
        {
            "question": "Which of the following ABAP data types allows for precise decimal arithmetic?",
            "option1": "I (Integer)",
            "option2": "F (Floating Point)",
            "option3": "P (Packed Decimal - DECIMAL)",
            "option4": "N (Numeric Text)",
            "correctOption": "option3",
            "explanation": "The 'P' (Packed Decimal) data type in ABAP allows precise decimal arithmetic, making it suitable for financial calculations."
        },
        {
            "question": "How can a developer define a deep structure in ABAP?",
            "option1": "By including a table type inside another structure",
            "option2": "By using only predefined data types",
            "option3": "By using only numeric and character types",
            "option4": "By defining a structure with a single field",
            "correctOption": "option1",
            "explanation": "A deep structure in ABAP is defined by including another table type inside the structure, enabling complex data organization."
        },
        {
            "question": "What will be the output of the following ABAP code?\n\nDATA: lv_text TYPE string.\nWRITE lv_text.",
            "option1": "A runtime error occurs",
            "option2": "An empty output",
            "option3": "The value ‘0’ is printed",
            "option4": "The variable name is printed",
            "correctOption": "option2",
            "explanation": "If an ABAP string variable is declared but not initialized, it will produce an empty output when written."
        },
     
         {
            "question": "Which ABAP predefined type should be used for storing binary data?",
            "option1": "C (Character)",
            "option2": "I (Integer)",
            "option3": "X (Byte Field)",
            "option4": "P (Packed Decimal)",
            "correctOption": "option3",
            "explanation": "The 'X' (Byte Field) type is used in ABAP to store binary data."
        },
        {
            "question": "What is the difference between LIKE and TYPE in ABAP variable declarations?",
            "option1": "LIKE refers to an existing variable or field, while TYPE defines a new data type",
            "option2": "TYPE refers to an existing variable, while LIKE creates a new data type",
            "option3": "Both LIKE and TYPE are used interchangeably",
            "option4": "LIKE is only used for user-defined types",
            "correctOption": "option1",
            "explanation": "LIKE is used to reference an existing variable or field, whereas TYPE is used to define a new data type."
        },
        {
            "question": "Which ABAP statement is used to dynamically assign memory to a data reference variable?",
            "option1": "CREATE DATA",
            "option2": "ALLOCATE MEMORY",
            "option3": "NEW OBJECT",
            "option4": "MEMORY ASSIGN",
            "correctOption": "option1",
            "explanation": "The 'CREATE DATA' statement is used in ABAP to dynamically allocate memory for data reference variables."
        },
        {
            "question": "What is the default value of an ABAP variable of type C (Character) when not explicitly assigned?",
            "option1": "NULL",
            "option2": "Space (‘ ’)",
            "option3": "0",
            "option4": "Undefined",
            "correctOption": "option2",
            "explanation": "In ABAP, character-type variables default to a space (‘ ’) when they are not explicitly assigned a value."
        },
     
          {
            "question": "Which ABAP predefined type should be used for storing binary data?",
            "option1": "C (Character)",
            "option2": "I (Integer)",
            "option3": "X (Byte Field)",
            "option4": "P (Packed Decimal)",
            "correctOption": "option3",
            "explanation": "The 'X' (Byte Field) type is used in ABAP to store binary data."
        },
        {
            "question": "What is the difference between LIKE and TYPE in ABAP variable declarations?",
            "option1": "LIKE refers to an existing variable or field, while TYPE defines a new data type",
            "option2": "TYPE refers to an existing variable, while LIKE creates a new data type",
            "option3": "Both LIKE and TYPE are used interchangeably",
            "option4": "LIKE is only used for user-defined types",
            "correctOption": "option1",
            "explanation": "LIKE is used to reference an existing variable or field, whereas TYPE is used to define a new data type."
        },
        {
            "question": "Which ABAP statement is used to dynamically assign memory to a data reference variable?",
            "option1": "CREATE DATA",
            "option2": "ALLOCATE MEMORY",
            "option3": "NEW OBJECT",
            "option4": "MEMORY ASSIGN",
            "correctOption": "option1",
            "explanation": "The 'CREATE DATA' statement is used in ABAP to dynamically allocate memory for data reference variables."
        },
        {
            "question": "What is the default value of an ABAP variable of type C (Character) when not explicitly assigned?",
            "option1": "NULL",
            "option2": "Space (‘ ’)",
            "option3": "0",
            "option4": "Undefined",
            "correctOption": "option2",
            "explanation": "In ABAP, character-type variables default to a space (‘ ’) when they are not explicitly assigned a value."
        },
     
         {
            "question": "What is the correct syntax for a WHILE loop in ABAP?",
            "option1": "WHILE (i < 5).  \n  WRITE i.  \n  i = i + 1.  \nLOOP.",
            "option2": "DATA gv_counter TYPE I VALUE 1.  \nWHILE gv_counter <= 5.  \n  WRITE: / 'Count:', gv_counter.  \n  gv_counter = gv_counter + 1.  \nENDWHILE.",
            "option3": "LOOP UNTIL gv_counter > 5.  \n  WRITE gv_counter.  \n  gv_counter = gv_counter + 1.  \nENDLOOP.",
            "option4": "FOR gv_counter = 1 TO 5.  \n  WRITE gv_counter.  \nEND.",
            "correctOption": "option2",
            "explanation": "The correct WHILE loop syntax in ABAP follows the format: WHILE condition. ... ENDWHILE."
        },
        {
            "question": "What will be the output of the following SWITCH statement?\n\nDATA gv_grade TYPE char1 VALUE 'B'.  \nDATA gv_result TYPE string.  \ngv_result = SWITCH string( gv_grade  \n    WHEN 'A' THEN 'Excellent'  \n    WHEN 'B' THEN 'Good'  \n    WHEN 'C' THEN 'Average'  \n    ELSE 'Needs Improvement' ).  \nWRITE gv_result.",
            "option1": "Excellent",
            "option2": "Good",
            "option3": "Average",
            "option4": "Needs Improvement",
            "correctOption": "option2",
            "explanation": "The SWITCH statement evaluates 'B', which matches the condition 'WHEN B', resulting in the output 'Good'."
        },
        {
            "question": "What is the main advantage of the Parallel Cursor Technique?",
            "option1": "Improves loop efficiency when processing large tables",
            "option2": "Reduces memory usage",
            "option3": "Increases SQL execution speed",
            "option4": "Prevents table locking",
            "correctOption": "option1",
            "explanation": "The Parallel Cursor Technique enhances performance by reducing the number of loop iterations required to process large datasets."
        },
     
        {
            "question": "The following piece of code is used:\n\nDATA: def TYPE abc,\nGhi LIKE xyz.\n\nWhich of the four elements are data types and which are data objects?",
            "option1": "abc, xyz - data type\ndef, ghi - data objects",
            "option2": "abc - data type\ndef, ghi - data objects\nxyz - data type or data objects",
            "option3": "def, ghi - data objects\nabc, xyz - data type or data object",
            "option4": "abc - data type\ndef, ghi, xyz - data objects",
            "correctOption": "option2",
            "explanation": "In ABAP, 'abc' is explicitly mentioned as a type, and 'xyz' could be a data type or an object. 'def' and 'ghi' are declared as data objects."
        },
        {
            "question": "Which of the following data types are predefined ABAP data types?",
            "option1": "XSTRING",
            "option2": "RING",
            "option3": "DECIMALS",
            "option4": "FLOAT",
            "correctOption": "option4",
            "explanation": "FLOAT is a predefined numeric data type in ABAP, while RING and DECIMALS are not standard predefined ABAP types."
        },
        {
            "question": "What is required to fully specify a Table Type in the ABAP Dictionary?",
            "option1": "Section line",
            "option2": "Header line",
            "option3": "Table size",
            "option4": "Table key",
            "correctOption": "option4",
            "explanation": "A Table Type in ABAP Dictionary must have a Table Key to define its structure and uniqueness constraints."
        },
     
        {
            "question": "What is the default length of the type P data type?",
            "option1": "1-16",
            "option2": "64",
            "option3": "8",
            "option4": "1",
            "correctOption": "option1",
            "explanation": "The default length for the type P (Packed Decimal) data type in ABAP is between 1 to 16 bytes, depending on the defined precision."
        },
        {
            "question": "Which of the four elements are data types and which are data objects?\n\nDATA: def TYPE abc,\nGhi LIKE xyz.",
            "option1": "abc - data type, def, ghi - data objects, xyz - data type or data objects",
            "option2": "def, ghi - data objects, abc, xyz - data type or data object",
            "option3": "abc, xyz - data type, def, ghi - data objects",
            "option4": "abc - data type, def, ghi, xyz - data objects",
            "correctOption": "option1",
            "explanation": "In ABAP, 'abc' is a data type, 'xyz' could be a data type or a data object, while 'def' and 'ghi' are data objects."
        },
        {
            "question": "Which statement is used to generically define the data reference variable z1?",
            "option1": "data z1 type any table",
            "option2": "data z1 type any",
            "option3": "data z1 type ref to data",
            "option4": "data z1 type ref to PA0001",
            "correctOption": "option3",
            "explanation": "The correct way to generically define a data reference variable in ABAP is using 'data z1 type ref to data'."
        },
        {
            "question": "Which of the following ABAP statements throws an error at the syntax check?",
            "option1": "DATA variable(5) TYPE c.",
            "option2": "DATA variable TYPE t.",
            "option3": "DATA variable(5) TYPE n.",
            "option4": "DATA variable(5) TYPE p.",
            "correctOption": "option2",
            "explanation": "The 'TYPE t' statement is incorrect as 't' is not a valid predefined data type in ABAP."
        },
        {
            "question": "You have been asked to review the following expression, which processes character strings:\n\nresult = find( val = 'abapABAP' sub = 'A' occ = 2 case = 'X' ....).\n\nWhat is the expected value of result?",
            "option1": "4",
            "option2": "2",
            "option3": "6",
            "option4": "1",
            "correctOption": "option3",
            "explanation": "The FIND function searches for the second occurrence of 'A' (case-insensitive) in 'abapABAP', which is at position 6."
        }
    ]

    const questionTexts = questions.slice(38,).map(q => q.question);
    console.log(questionTexts);

    const responses = await AppwriteDB.listDocuments(process.env.APPWRITE_DBID, process.env.APPWRITE_DBC_Questions,[
        Query.equal('question',questionTexts)
    ]);

    console.log(responses);

    const questionIds = responses.documents.map(q => q.$id);

    await AppwriteDB.updateDocument(process.env.APPWRITE_DBID,process.env.APPWRITE_DBC_Quiz,"67c816110010282dd9d6",{
        questionId : questionIds
    });

    const doc = await AppwriteDB.getDocument(process.env.APPWRITE_DBID,process.env.APPWRITE_DBC_Quiz,"67c816110010282dd9d6");
    console.log(doc.questionId.length);
    console.log("added");
}
