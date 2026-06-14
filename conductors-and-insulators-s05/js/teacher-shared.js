/* ═══════════════════════════════════════════════════════
   CONDUCTOVERSE — Teacher Portal Shared Logic
   Handles session verification, data initialization, and logs.
   ═══════════════════════════════════════════════════════ */

let currentTeacherSession = null;
let studentsData = [];
let assignmentsData = [];
let submissionsData = [];
let announcementsData = [];

// Immediate session verification before DOM compiles
(function() {
    currentTeacherSession = JSON.parse(localStorage.getItem("conductoverseCurrentUser") || "null");
    if (!currentTeacherSession || currentTeacherSession.role !== "teacher") {
        window.location.href = "login.html";
    }
})();

// Immediate check for sidebar state to avoid layout flash
(function() {
    const isCollapsed = localStorage.getItem("conductoverseSidebarCollapsed") === "true";
    if (isCollapsed) {
        const checkExist = setInterval(() => {
            const grid = document.querySelector(".dashboard-grid");
            if (grid) {
                grid.classList.add("collapsed");
                clearInterval(checkExist);
            }
        }, 4);
        setTimeout(() => clearInterval(checkExist), 2500);
    }
})();

document.addEventListener("DOMContentLoaded", () => {
    // Set display name in profile card and welcome hero
    const teacherUsername = document.getElementById("teacherUsername");
    const welcomeTitle = document.getElementById("welcomeTitle");
    if (teacherUsername) teacherUsername.textContent = currentTeacherSession.username;
    if (welcomeTitle) welcomeTitle.textContent = `Welcome back, ${currentTeacherSession.username}!`;

    // Highlight active sidebar item based on filename
    const path = window.location.pathname;
    let page = path.substring(path.lastIndexOf('/') + 1) || "teacher-overview.html";
    page = page.split('?')[0].split('#')[0];
    if (page && !page.includes('.')) {
        page += ".html";
    }
    const sidebarLinks = document.querySelectorAll(".sidebar-menu a");
    sidebarLinks.forEach(link => {
        const href = link.getAttribute("href");
        if (page === href) {
            link.classList.add("active");
        }
    });

    // Initialize data structures
    initializeTeacherDemoData();
    
    // Load fresh data into globals
    loadGlobalTeacherData();

    // Initialize collapsible sidebar and date banner
    initSidebarCollapse();
    injectDashboardDate();
});

function loadGlobalTeacherData() {
    studentsData = JSON.parse(localStorage.getItem("conductoverseUsers") || "[]").filter(u => u.role === "student");
    assignmentsData = JSON.parse(localStorage.getItem("conductoverseAssignments") || "[]");
    submissionsData = JSON.parse(localStorage.getItem("conductoverseSubmissions") || "[]");
    announcementsData = JSON.parse(localStorage.getItem("conductoverseAnnouncements") || "[]");
}

function logout() {
    localStorage.removeItem("conductoverseCurrentUser");
    window.location.href = "index.html";
}

function initializeTeacherDemoData() {
    // Purge any remaining demo/fake data from localStorage to ensure only real user actions are displayed.
    const demoUserNames = ["Emma Watts", "Tyler Spark", "Sophia Volt", "Liam Ampere", "Olivia Charge"];
    
    // 1. Remove demo users from conductoverseUsers
    try {
        let users = JSON.parse(localStorage.getItem("conductoverseUsers") || "[]");
        const originalLength = users.length;
        users = users.filter(u => !demoUserNames.some(name => name.toLowerCase() === u.username.toLowerCase()));
        if (users.length !== originalLength) {
            localStorage.setItem("conductoverseUsers", JSON.stringify(users));
        }
    } catch (e) {
        console.error("Error cleaning up demo users:", e);
    }

    // 2. Remove demo users' quiz/spot results
    demoUserNames.forEach(name => {
        localStorage.removeItem(`conductoverseQuizResult_${name}`);
        localStorage.removeItem(`conductoverseSpotResult_${name}`);
    });

    // 3. Remove default assignments
    const demoAssignmentIds = ["a_1", "a_2"];
    try {
        let assignments = JSON.parse(localStorage.getItem("conductoverseAssignments") || "[]");
        const originalAssignmentsLength = assignments.length;
        assignments = assignments.filter(a => !demoAssignmentIds.includes(a.id));
        if (assignments.length !== originalAssignmentsLength) {
            localStorage.setItem("conductoverseAssignments", JSON.stringify(assignments));
        }
    } catch (e) {
        console.error("Error cleaning up demo assignments:", e);
    }

    // 4. Remove default submissions
    const demoSubmissionIds = ["s_1", "s_2", "s_3"];
    try {
        let submissions = JSON.parse(localStorage.getItem("conductoverseSubmissions") || "[]");
        const originalSubmissionsLength = submissions.length;
        submissions = submissions.filter(s => !demoSubmissionIds.includes(s.id) && !demoUserNames.includes(s.student));
        if (submissions.length !== originalSubmissionsLength) {
            localStorage.setItem("conductoverseSubmissions", JSON.stringify(submissions));
        }
    } catch (e) {
        console.error("Error cleaning up demo submissions:", e);
    }

    // 5. Remove default announcements
    const demoAnnouncementIds = ["ann_1", "ann_2"];
    try {
        let announcements = JSON.parse(localStorage.getItem("conductoverseAnnouncements") || "[]");
        const originalAnnouncementsLength = announcements.length;
        announcements = announcements.filter(ann => !demoAnnouncementIds.includes(ann.id));
        if (announcements.length !== originalAnnouncementsLength) {
            localStorage.setItem("conductoverseAnnouncements", JSON.stringify(announcements));
        }
    } catch (e) {
        console.error("Error cleaning up demo announcements:", e);
    }
}

// Helper: Format Relative Time
function formatRelativeTime(dateInput) {
    const elapsed = Date.now() - new Date(dateInput).getTime();
    const secs = Math.floor(elapsed / 1000);
    if (secs < 60) return "Just now";
    const mins = Math.floor(secs / 60);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return new Date(dateInput).toLocaleDateString();
}

// Collapsible Sidebar Logic
function initSidebarCollapse() {
    const grid = document.querySelector(".dashboard-grid");
    const sidebar = document.querySelector(".dashboard-sidebar");
    const profileCard = document.querySelector(".profile-card");
    if (!grid || !sidebar || !profileCard) return;

    // Create toggle button dynamically
    const toggleBtn = document.createElement("button");
    toggleBtn.className = "sidebar-toggle-btn";
    toggleBtn.setAttribute("aria-label", "Toggle Sidebar");
    toggleBtn.id = "sidebarToggleBtn";

    // Insert toggle button inside the profile card
    profileCard.appendChild(toggleBtn);

    // Read collapse state (already handled by immediate check, but sync here)
    const isCollapsed = localStorage.getItem("conductoverseSidebarCollapsed") === "true";
    if (isCollapsed) {
        grid.classList.add("collapsed");
    } else {
        grid.classList.remove("collapsed");
    }

    // Toggle button click listener
    toggleBtn.addEventListener("click", () => {
        grid.classList.toggle("collapsed");
        const collapsedNow = grid.classList.contains("collapsed");
        localStorage.setItem("conductoverseSidebarCollapsed", collapsedNow);
        
        // Dispatch resize event to trigger updates in responsive components (e.g. SVG analytics charts)
        window.dispatchEvent(new Event("resize"));
    });
}

// Inject Current Date into dashboard main welcome banner
function injectDashboardDate() {
    const welcomeHero = document.querySelector(".welcome-hero");
    if (!welcomeHero) return;

    // Prevent duplicate injection
    if (document.getElementById("welcomeDate")) return;

    const dateContainer = document.createElement("div");
    dateContainer.id = "welcomeDate";
    dateContainer.className = "welcome-date";

    const dateIcon = document.createElement("span");
    dateIcon.className = "date-icon";
    dateIcon.textContent = "📅";
    dateContainer.appendChild(dateIcon);

    const dateText = document.createElement("span");
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    const today = new Date();
    dateText.textContent = today.toLocaleDateString("en-US", options);
    dateContainer.appendChild(dateText);

    // Place date banner at the very top of the welcome-hero card
    welcomeHero.insertBefore(dateContainer, welcomeHero.firstChild);
}
