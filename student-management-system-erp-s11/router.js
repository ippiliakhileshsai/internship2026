var routeTitles = {
  adminDashboard: 'Dashboard',
  adminStudents: 'Student Management',
  adminFaculty: 'Faculty Management',
  adminCourses: 'Courses',
  adminNotices: 'Notices',
  adminProfile: 'My Profile',
  facDashboard: 'Dashboard',
  facStudents: 'My Students',
  facAttendance: 'Attendance',
  facMarks: 'Enter Marks',
  facAssignments: 'Assignments',
  facQuizzes: 'Quizzes',
  facNotices: 'Notices',
  facProfile: 'My Profile',
  stuDashboard: 'Dashboard',
  stuAttendance: 'My Attendance',
  stuMarks: 'Marks & Grades',
  stuAssignments: 'Assignments',
  stuQuizzes: 'Quizzes',
  stuNotices: 'Notices',
  stuProfile: 'My Profile',
};

var routeHandlers = {};

function registerRoutes(routes) {
  routeHandlers = routes;
}

function navigate(page) {
  if (!currentUser) return;
  setActiveNav(page);
  document.getElementById('pageTitle').textContent = routeTitles[page] || page;
  var container = document.getElementById('content');
  var render = routeHandlers[page];
  if (render) {
    container.innerHTML = '';
    render(container);
  }
}
