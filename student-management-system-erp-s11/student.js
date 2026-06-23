function stuDashboard(container) {
  var student = currentUser;
  var attendance = DB.attendance[student.id] || {};
  var allDays = Object.values(attendance).flat();
  var attendancePct = allDays.length ? Math.round(allDays.reduce(function (a, b) { return a + b; }, 0) / allDays.length * 100) : 0;
  var marks = DB.marks[student.id] || {};
  var finals = Object.values(marks).map(function (mark) { return mark.final || 0; });
  var average = finals.length ? Math.round(finals.reduce(function (a, b) { return a + b; }, 0) / finals.length) : 0;
  var myAssignments = DB.assignments.filter(function (assignment) {
    var faculty = DB.users.find(function (user) {
      return user.id === assignment.faculty;
    });
    return faculty && facultyMatchesStudentDept(faculty, student.dept);
  });
  var pending = myAssignments.filter(function (assignment) {
    return !assignment.submissions.some(function (submission) {
      return submission.sid === student.id;
    });
  }).length;
  container.innerHTML = `
  <div style="background:linear-gradient(135deg,#0f2744,#1a3a5c);border-radius:12px;padding:24px;color:#fff;margin-bottom:20px;display:flex;align-items:center;gap:20px;">
    <div style="width:64px;height:64px;border-radius:50%;background:var(--accent);display:flex;align-items:center;justify-content:center;font-size:26px;font-weight:800;border:3px solid rgba(255,255,255,.3);">${student.name[0]}</div>
    <div><div style="font-size:20px;font-weight:700;">Welcome, ${student.name.split(' ')[0]}!</div>
    <div style="opacity:.7;font-size:13px;margin-top:3px;">${student.dept} · Year ${student.year} · Section ${student.section}</div></div>
  </div>
  <div class="stat-grid">
    <div class="stat-card"><div class="sc-icon">Attendance</div><div class="sc-val" style="color:${attendancePct < 75 ? 'var(--red)' : 'var(--green)'}">${attendancePct}%</div><div class="sc-lbl">Attendance</div><div class="sc-tag ${attendancePct < 75 ? 'tag-red' : 'tag-green'}">${attendancePct < 75 ? 'Low' : 'Good'}</div></div>
    <div class="stat-card"><div class="sc-icon">Marks</div><div class="sc-val">${average}/100</div><div class="sc-lbl">Avg Marks</div><div class="sc-tag ${average >= 60 ? 'tag-green' : 'tag-amber'}">${average >= 60 ? 'Passing' : 'At Risk'}</div></div>
    <div class="stat-card"><div class="sc-icon">Assignments</div><div class="sc-val">${pending}</div><div class="sc-lbl">Pending Assignments</div><div class="sc-tag tag-amber">Due</div></div>
    <div class="stat-card"><div class="sc-icon">Notices</div><div class="sc-val">${DB.notices.length}</div><div class="sc-lbl">New Notices</div><div class="sc-tag tag-blue">Unread</div></div>
  </div>
  <div class="card">
    <div class="card-header"><h3>Quick Links</h3></div>
    <div class="card-body"><div class="btn-row">
      <button class="btn-sm btn-primary" onclick="navigate('stuAttendance')">View Attendance</button>
      <button class="btn-sm btn-teal" onclick="navigate('stuMarks')">My Marks</button>
      <button class="btn-sm btn-outline" onclick="navigate('stuAssignments')">Assignments</button>
      <button class="btn-sm btn-outline" onclick="navigate('stuQuizzes')">Take Quiz</button>
    </div></div>
  </div>`;
}

function stuAttendance(container) {
  var student = currentUser;
  var attendance = DB.attendance[student.id] || {};
  var subjects = Object.keys(attendance);
  container.innerHTML = `
  <div class="stat-grid" style="grid-template-columns:repeat(auto-fit,minmax(200px,1fr));">
    ${subjects.map(function (subject) {
      var days = attendance[subject];
      var pct = days.length ? Math.round(days.reduce(function (a, b) { return a + b; }, 0) / days.length * 100) : 0;
      var present = days.filter(function (day) { return day === 1; }).length;
      return `<div class="stat-card">
        <div style="font-weight:700;font-size:14px;margin-bottom:8px;">${subject}</div>
        <div class="sc-val" style="color:${pct < 75 ? 'var(--red)' : 'var(--green)'}">${pct}%</div>
        <div class="sc-lbl">${present}/${days.length} classes</div>
        <div class="progress-bar"><div class="progress-fill" style="width:${pct}%;background:${pct < 75 ? 'var(--red)' : 'var(--green)'}"></div></div>
        <div class="sc-tag ${pct < 75 ? 'tag-red' : 'tag-green'}">${pct < 75 ? 'Below 75%' : 'Good standing'}</div>
      </div>`;
    }).join('')}
  </div>
  ${subjects.map(function (subject) {
    var days = attendance[subject];
    return `<div class="card">
      <div class="card-header"><h3>${subject} - Session-wise Record</h3></div>
      <div class="card-body">
        <div class="att-grid">
          ${days.map(function (day, index) { return `<div class="att-day ${day ? 'att-present' : 'att-absent'}" title="Session ${index + 1}">${index + 1}</div>`; }).join('')}
        </div>
        <div style="display:flex;gap:14px;margin-top:14px;font-size:12px;">
          <span>Present</span><span>Absent</span>
        </div>
      </div>
    </div>`;
  }).join('')}`;
}

function stuMarks(container) {
  var student = currentUser;
  var marks = DB.marks[student.id] || {};
  var subjects = Object.keys(marks);
  container.innerHTML = `
  ${subjects.map(function (subject) {
    var mark = marks[subject];
    var total = mark.mid1 + mark.mid2 + mark.assign + mark.final;
    var max = 50 + 50 + 20 + 100;
    var pct = Math.round(total / max * 100);
    var grade = mark.final >= 90 ? 'O' : mark.final >= 80 ? 'A+' : mark.final >= 70 ? 'A' : mark.final >= 60 ? 'B+' : mark.final >= 50 ? 'B' : 'F';
    var gradeClass = mark.final >= 60 ? 'b-green' : mark.final >= 50 ? 'b-amber' : 'b-red';
    return `<div class="card">
      <div class="card-header">
        <h3>${subject}</h3>
        <span class="badge ${gradeClass}" style="font-size:16px;padding:4px 14px;">${grade}</span>
      </div>
      <div class="card-body">
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:16px;">
          <div class="info-item"><div class="ii-lbl">Mid-1</div><div class="ii-val">${mark.mid1}/50</div></div>
          <div class="info-item"><div class="ii-lbl">Mid-2</div><div class="ii-val">${mark.mid2}/50</div></div>
          <div class="info-item"><div class="ii-lbl">Assignment</div><div class="ii-val">${mark.assign}/20</div></div>
          <div class="info-item"><div class="ii-lbl">Final Exam</div><div class="ii-val">${mark.final}/100</div></div>
        </div>
        <div style="display:flex;align-items:center;gap:12px;">
          <span style="font-size:13px;color:var(--muted);">Overall: ${total}/${max}</span>
          <div class="progress-bar" style="flex:1;"><div class="progress-fill" style="width:${pct}%;"></div></div>
          <span style="font-size:13px;font-weight:700;">${pct}%</span>
        </div>
      </div>
    </div>`;
  }).join('')}`;
}

function stuAssignments(container) {
  var student = currentUser;
  var myAssignments = DB.assignments.filter(function (assignment) {
    var faculty = DB.users.find(function (user) {
      return user.id === assignment.faculty;
    });
    return faculty && facultyMatchesStudentDept(faculty, student.dept);
  });
  container.innerHTML = `
  <div class="card">
    <div class="card-header"><h3>My Assignments</h3></div>
    <div class="card-body">
      ${myAssignments.map(function (assignment) {
        var submitted = assignment.submissions.find(function (submission) {
          return submission.sid === student.id;
        });
        return `<div style="border:1px solid var(--border);border-radius:10px;padding:18px;margin-bottom:12px;">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;">
            <div>
              <div style="font-weight:700;font-size:15px;">${assignment.title}</div>
              <div style="font-size:12px;color:var(--muted);margin-top:4px;">${assignment.subject} · Due: ${assignment.due} · Max: ${assignment.maxMarks} marks</div>
              ${submitted ? `<div style="margin-top:6px;font-size:12px;color:var(--green);">Submitted: ${submitted.file} ${submitted.marks != null ? '· Marks: ' + submitted.marks : '· Awaiting evaluation'}</div>` : ''}
            </div>
            <span class="badge ${submitted ? 'b-green' : 'b-amber'}">${submitted ? 'Submitted' : 'Pending'}</span>
          </div>
          ${!submitted ? `<div style="margin-top:12px;" id="upzone_${assignment.id}">
            <div class="upload-zone" onclick="triggerUpload('${assignment.id}')" id="uz_${assignment.id}">
              <div class="uz-icon">File</div>
              <div style="font-weight:600;font-size:14px;">Click to upload file</div>
              <div style="font-size:12px;color:var(--muted);margin-top:4px;">PDF, DOC, ZIP accepted</div>
            </div>
            <input type="file" id="file_${assignment.id}" style="display:none" onchange="handleFileSubmit('${assignment.id}',this)"/>
          </div>` : ''}
        </div>`;
      }).join('')}
    </div>
  </div>`;
}

function triggerUpload(id) {
  document.getElementById('file_' + id)?.click();
}

function handleFileSubmit(aid, input) {
  var file = input.files[0];
  if (!file) return;
  var assignment = DB.assignments.find(function (candidate) {
    return candidate.id === aid;
  });
  if (!assignment) return;
  assignment.submissions.push({
    sid: currentUser.id,
    name: currentUser.name,
    file: file.name,
    date: new Date().toLocaleDateString(),
    marks: null,
  });
  toast('"' + file.name + '" submitted successfully');
  navigate('stuAssignments');
}

function stuQuizzes(container) {
  var student = currentUser;
  var myQuizzes = DB.quizzes.filter(function (quiz) {
    var faculty = DB.users.find(function (user) {
      return user.id === quiz.faculty;
    });
    return faculty && facultyMatchesStudentDept(faculty, student.dept);
  });
  container.innerHTML = `
  <div class="card">
    <div class="card-header"><h3>Available Quizzes</h3></div>
    <div class="card-body">
      ${myQuizzes.map(function (quiz) {
        var done = DB.quizResults[quiz.id + '_' + student.id];
        return `<div style="border:1px solid var(--border);border-radius:10px;padding:18px;margin-bottom:12px;display:flex;justify-content:space-between;align-items:center;">
          <div>
            <div style="font-weight:700;font-size:15px;">${quiz.title}</div>
            <div style="font-size:12px;color:var(--muted);margin-top:4px;">${quiz.subject} · ${quiz.questions.length} questions · ${quiz.timeLimit} mins</div>
            ${done ? `<div style="font-size:12px;color:var(--green);margin-top:4px;">Score: ${done.score}/${quiz.questions.length}</div>` : ''}
          </div>
          <button class="btn-sm ${done ? 'btn-outline' : 'btn-primary'}" onclick="startQuiz('${quiz.id}')">${done ? 'Retake' : 'Start Quiz'}</button>
        </div>`;
      }).join('')}
    </div>
  </div>`;
}

function startQuiz(qid) {
  var quiz = DB.quizzes.find(function (candidate) {
    return candidate.id === qid;
  });
  if (!quiz) return;
  quizState = { qid: qid, current: 0, answers: [], started: Date.now() };
  renderQuizQuestion();
}

function renderQuizQuestion() {
  var quiz = DB.quizzes.find(function (candidate) {
    return candidate.id === quizState.qid;
  });
  var index = quizState.current;
  var question = quiz.questions[index];
  var total = quiz.questions.length;
  var progress = Math.round(index / total * 100);
  openModal(quiz.title + ' - Q' + (index + 1) + '/' + total, `
    <div class="progress-bar"><div class="progress-fill" style="width:${progress}%"></div></div>
    <div style="font-size:15px;font-weight:600;margin:16px 0 12px;">${question.q}</div>
    <div id="quizOpts">
      ${question.opts.map(function (option, optionIndex) {
        return `<div class="quiz-option ${quizState.answers[index] === optionIndex ? 'selected' : ''}" onclick="selectOpt(${optionIndex})" id="qopt_${optionIndex}">${option}</div>`;
      }).join('')}
    </div>
  `, [
    { label: index === 0 ? 'Cancel' : 'Previous', cls: 'btn-sm btn-outline', action: index === 0 ? closeModal : prevQuestion },
    { label: index === total - 1 ? 'Submit Quiz' : 'Next', cls: 'btn-sm btn-primary', action: index === total - 1 ? submitQuiz : nextQuestion },
  ]);
}

function selectOpt(i) {
  quizState.answers[quizState.current] = i;
  document.querySelectorAll('.quiz-option').forEach(function (element, index) {
    element.classList.toggle('selected', index === i);
  });
}

function nextQuestion() {
  if (quizState.answers[quizState.current] === undefined) {
    toast('Please select an answer', 'amber');
    return;
  }
  quizState.current += 1;
  renderQuizQuestion();
}

function prevQuestion() {
  quizState.current -= 1;
  renderQuizQuestion();
}

function submitQuiz() {
  var quiz = DB.quizzes.find(function (candidate) {
    return candidate.id === quizState.qid;
  });
  var score = 0;
  quiz.questions.forEach(function (question, index) {
    if (quizState.answers[index] === question.ans) score += 1;
  });
  DB.quizResults[quiz.id + '_' + currentUser.id] = { score: score, total: quiz.questions.length, date: new Date().toLocaleDateString() };
  var pct = Math.round(score / quiz.questions.length * 100);
  var passed = pct >= 60;
  openModal('Quiz Results', `
    <div style="text-align:center;padding:20px;">
      <div style="font-size:64px;margin-bottom:12px;">${passed ? 'Trophy' : 'Book'}</div>
      <div style="font-size:32px;font-weight:800;color:${passed ? 'var(--green)' : 'var(--red)'};">${score}/${quiz.questions.length}</div>
      <div style="font-size:18px;font-weight:600;margin:6px 0;">${pct}% - ${passed ? 'Passed!' : 'Keep practising'}</div>
      <div class="progress-bar" style="margin:16px auto;max-width:200px;"><div class="progress-fill" style="width:${pct}%;background:${passed ? 'var(--green)' : 'var(--red)'}"></div></div>
      <div style="font-size:13px;color:var(--muted);">Correct: ${score} - Wrong: ${quiz.questions.length - score}</div>
    </div>
  `, [{ label: 'Done', cls: 'btn-sm btn-primary', action: function () { closeModal(); navigate('stuQuizzes'); } }]);
}

function stuNotices(container) {
  renderNoticesPage(container, false);
}

function stuProfile(container) {
  var student = currentUser;
  var attendance = DB.attendance[student.id] || {};
  var allDays = Object.values(attendance).flat();
  var attendancePct = allDays.length ? Math.round(allDays.reduce(function (a, b) { return a + b; }, 0) / allDays.length * 100) : 0;
  renderProfilePage(container, student, [
    { label: 'Department', val: student.dept },
    { label: 'Year', val: 'Year ' + student.year },
    { label: 'Section', val: student.section },
    { label: 'Date of Birth', val: student.dob || '—' },
    { label: 'Guardian', val: student.guardian || '—' },
    { label: 'Overall Attendance', val: attendancePct + '%' },
  ]);
}
