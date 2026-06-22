var navMenus = {
  admin: [
    { section: 'Overview' },
    { label: 'Dashboard', icon: '📊', page: 'adminDashboard' },
    { section: 'User Management' },
    { label: 'Manage Students', icon: '👨‍🎓', page: 'adminStudents' },
    { label: 'Manage Faculty', icon: '👩‍🏫', page: 'adminFaculty' },
    { section: 'Academic' },
    { label: 'Courses', icon: '📚', page: 'adminCourses' },
    { label: 'Notices', icon: '📢', page: 'adminNotices' },
    { section: 'Account' },
    { label: 'My Profile', icon: '👤', page: 'adminProfile' },
  ],
  faculty: [
    { section: 'Overview' },
    { label: 'Dashboard', icon: '📊', page: 'facDashboard' },
    { section: 'Teaching' },
    { label: 'My Students', icon: '👨‍🎓', page: 'facStudents' },
    { label: 'Attendance', icon: '✅', page: 'facAttendance' },
    { label: 'Enter Marks', icon: '📝', page: 'facMarks' },
    { label: 'Assignments', icon: '📋', page: 'facAssignments' },
    { label: 'Quizzes', icon: '🧩', page: 'facQuizzes' },
    { section: 'Communication' },
    { label: 'Notices', icon: '📢', page: 'facNotices' },
    { section: 'Account' },
    { label: 'My Profile', icon: '👤', page: 'facProfile' },
  ],
  student: [
    { section: 'Overview' },
    { label: 'Dashboard', icon: '📊', page: 'stuDashboard' },
    { section: 'Academic' },
    { label: 'Attendance', icon: '✅', page: 'stuAttendance' },
    { label: 'Marks & Grades', icon: '📈', page: 'stuMarks' },
    { label: 'Assignments', icon: '📋', page: 'stuAssignments' },
    { label: 'Quizzes', icon: '🧩', page: 'stuQuizzes' },
    { section: 'Information' },
    { label: 'Notices', icon: '📢', page: 'stuNotices' },
    { section: 'Account' },
    { label: 'My Profile', icon: '👤', page: 'stuProfile' },
  ],
};

function setupSidebar() {
  var role = currentUser.role;
  var badge = document.getElementById('sideRoleBadge');
  badge.textContent = role.toUpperCase();
  badge.className = 'role-badge rb-' + role;
  document.getElementById('sideUserName').textContent = currentUser.name;
  document.getElementById('sideUserId').textContent = currentUser.id;

  var nav = document.getElementById('sidebarNav');
  nav.innerHTML = '';
  (navMenus[role] || []).forEach(function (item) {
    if (item.section) {
      var section = document.createElement('div');
      section.className = 'nav-section';
      section.textContent = item.section;
      nav.appendChild(section);
      return;
    }

    var el = document.createElement('div');
    el.className = 'nav-item';
    el.dataset.page = item.page;
    el.innerHTML = '<span class="ni">' + item.icon + '</span><span>' + item.label + '</span>';
    el.onclick = function () {
      navigate(item.page);
    };
    nav.appendChild(el);
  });
}

function setActiveNav(page) {
  document.querySelectorAll('.nav-item').forEach(function (el) {
    el.classList.toggle('active', el.dataset.page === page);
  });
}
