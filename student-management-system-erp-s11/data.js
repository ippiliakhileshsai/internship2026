var DB = {
  users: [
    { id: 'admin', pass: 'admin123', role: 'admin', name: 'Dr. Ramesh Kumar', dept: 'Administration', email: 'admin@unierp.edu', phone: '9000000001', join: '2015-06-01' },
    { id: 'FAC001', pass: 'faculty123', role: 'faculty', name: 'Dr. Priya Sharma', dept: 'Computer Science', email: 'priya@unierp.edu', phone: '9000000002', subjects: ['Data Structures', 'DBMS'], join: '2018-08-01' },
    { id: 'FAC002', pass: 'faculty123', role: 'faculty', name: 'Prof. Anil Reddy', dept: 'Electronics', email: 'anil@unierp.edu', phone: '9000000003', subjects: ['Digital Circuits', 'Signals'], join: '2017-06-01' },
  ],
  students: [
    { id: 'STU001', pass: 'student123', name: 'Ravi Teja', dept: 'CSE', year: 2, section: 'A', email: 'ravi@student.edu', phone: '9111111111', dob: '2002-05-10', guardian: 'Suresh Teja', join: '2022-08-01' },
    { id: 'STU002', pass: 'student123', name: 'Sneha Patel', dept: 'CSE', year: 2, section: 'A', email: 'sneha@student.edu', phone: '9111111112', dob: '2002-09-15', guardian: 'Ramesh Patel', join: '2022-08-01' },
    { id: 'STU003', pass: 'student123', name: 'Kiran Kumar', dept: 'ECE', year: 2, section: 'B', email: 'kiran@student.edu', phone: '9111111113', dob: '2002-03-20', guardian: 'Vijay Kumar', join: '2022-08-01' },
  ],
  attendance: {
    STU001: { 'Data Structures': [1,1,1,0,1,1,0,1,1,1,0,1,1,1,0,1,1,1,1,0,1,1,1,1,1,1,0,1,1,1], DBMS: [1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,1,0,1,1] },
    STU002: { 'Data Structures': [1,0,1,1,1,0,1,1,1,1,0,1,1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,0], DBMS: [1,1,1,1,0,1,1,1,0,1,1,0,1,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,0,1] },
    STU003: { 'Digital Circuits': [1,1,1,1,1,0,0,1,1,1,1,0,1,1,1,1,1,0,1,1,1,0,1,1,1,1,0,1,1,1], Signals: [0,1,1,1,1,1,0,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1] },
  },
  marks: {
    STU001: { 'Data Structures': { mid1: 45, mid2: 42, assign: 18, final: 78 }, DBMS: { mid1: 38, mid2: 44, assign: 19, final: 82 } },
    STU002: { 'Data Structures': { mid1: 40, mid2: 38, assign: 16, final: 72 }, DBMS: { mid1: 42, mid2: 41, assign: 17, final: 76 } },
    STU003: { 'Digital Circuits': { mid1: 48, mid2: 46, assign: 20, final: 88 }, Signals: { mid1: 35, mid2: 38, assign: 15, final: 68 } },
  },
  assignments: [
    { id: 'A1', subject: 'Data Structures', title: 'Implement Binary Search Tree', due: '2024-12-20', maxMarks: 20, faculty: 'FAC001', submissions: [] },
    { id: 'A2', subject: 'DBMS', title: 'ER Diagram for Library System', due: '2024-12-22', maxMarks: 20, faculty: 'FAC001', submissions: [] },
    { id: 'A3', subject: 'Digital Circuits', title: 'Design 4-bit Adder Circuit', due: '2024-12-23', maxMarks: 20, faculty: 'FAC002', submissions: [] },
  ],
  quizzes: [
    {
      id: 'Q1',
      subject: 'Data Structures',
      title: 'Trees and Graphs Quiz',
      faculty: 'FAC001',
      timeLimit: 10,
      questions: [
        { q: 'What is the time complexity of binary search?', opts: ['O(n)', 'O(log n)', 'O(n^2)', 'O(1)'], ans: 1 },
        { q: 'Which data structure uses LIFO?', opts: ['Queue', 'Stack', 'Tree', 'Heap'], ans: 1 },
        { q: 'In a BST, where is the minimum element?', opts: ['Root', 'Rightmost', 'Leftmost', 'Any leaf'], ans: 2 },
        { q: 'What is the height of a balanced BST with 7 nodes?', opts: ['2', '3', '4', '5'], ans: 1 },
        { q: 'BFS uses which data structure?', opts: ['Stack', 'Queue', 'Heap', 'Array'], ans: 1 },
      ],
    },
    {
      id: 'Q2',
      subject: 'DBMS',
      title: 'SQL Fundamentals Quiz',
      faculty: 'FAC001',
      timeLimit: 10,
      questions: [
        { q: 'Which SQL clause filters groups?', opts: ['WHERE', 'HAVING', 'GROUP BY', 'ORDER BY'], ans: 1 },
        { q: 'What does PRIMARY KEY ensure?', opts: ['Uniqueness only', 'Not null only', 'Uniqueness and not null', 'Foreign ref'], ans: 2 },
        { q: 'Which join returns all rows from left table?', opts: ['INNER JOIN', 'RIGHT JOIN', 'LEFT JOIN', 'FULL JOIN'], ans: 2 },
        { q: 'Normalization reduces?', opts: ['Speed', 'Redundancy', 'Tables', 'Queries'], ans: 1 },
        { q: 'ACID stands for?', opts: ['Atomicity Consistency Isolation Durability', 'All Consistent Internal Data', 'Atomic Central Index Data', 'None'], ans: 0 },
      ],
    },
  ],
  quizResults: {},
  notices: [
    { id: 'N1', title: 'Semester Exams Schedule Released', body: 'End semester exams will commence from January 15th, 2025. Detailed timetable is uploaded on the portal.', date: '2024-12-10', from: 'Admin', type: 'exam' },
    { id: 'N2', title: 'Library Books Return Deadline', body: 'All issued books must be returned before December 30th, 2024. Fine will be charged for late returns.', date: '2024-12-08', from: 'Admin', type: 'general' },
    { id: 'N3', title: 'Data Structures Assignment Due', body: 'Please submit the BST implementation assignment before December 20th.', date: '2024-12-05', from: 'Dr. Priya Sharma', type: 'assignment' },
  ],
  courses: ['Data Structures', 'DBMS', 'Digital Circuits', 'Signals & Systems', 'Mathematics III'],
  idCounter: 1000,
};

var currentUser = null;
var quizState = null;
var attendanceState = {};

function getDefaultPage() {
  return currentUser.role === 'admin'
    ? 'adminDashboard'
    : currentUser.role === 'faculty'
      ? 'facDashboard'
      : 'stuDashboard';
}

function getProfilePage() {
  return currentUser.role === 'student'
    ? 'stuProfile'
    : currentUser.role === 'faculty'
      ? 'facProfile'
      : 'adminProfile';
}

function subjectDept(subject) {
  return subject === 'Data Structures' || subject === 'DBMS' ? 'CSE' : 'ECE';
}

function subjectsForDept(dept) {
  return DB.students.filter(function (student) {
    return student.dept === dept;
  });
}

function studentsForFacultySubjects(subjects) {
  return DB.students.filter(function (student) {
    return (subjects || []).some(function (subject) {
      return subjectDept(subject) === student.dept;
    });
  });
}

function facultyMatchesStudentDept(faculty, studentDept) {
  return (faculty.subjects || []).some(function (subject) {
    return subjectDept(subject) === studentDept;
  });
}

function nextId(prefix) {
  DB.idCounter += 1;
  return prefix + String(DB.idCounter).padStart(3, '0');
}
