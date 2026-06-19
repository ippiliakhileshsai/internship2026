/* ═══════════════════════════════════════════════════════
   CONDUCTOVERSE — Admin Portal Shared Logic
   Handles session verification, logging, and database accessors.
   ═══════════════════════════════════════════════════════ */

let currentAdminSession = null;

// 1. Immediate Admin Session Verification (Before DOM compiles to prevent layout flashes)
(function() {
    currentAdminSession = JSON.parse(localStorage.getItem("conductoverseCurrentUser") || "null");
    if (!currentAdminSession || currentAdminSession.role !== "admin") {
        window.location.href = "login.html";
    }
})();

// 2. DOMContentLoaded Shared Init
document.addEventListener("DOMContentLoaded", () => {
    // Set admin display name in sidebar card and header
    const adminUsername = document.getElementById("adminUsername");
    const welcomeTitle = document.getElementById("welcomeTitle");
    if (adminUsername) adminUsername.textContent = currentAdminSession.username;
    if (welcomeTitle) welcomeTitle.textContent = `Admin Command Center`;

    // Highlight active sidebar item based on filename
    const path = window.location.pathname;
    let page = path.substring(path.lastIndexOf('/') + 1) || "admin-overview.html";
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

    // Inject Admin Theme stylesheet dynamically if not present
    if (!document.querySelector('link[href*="admin.css"]')) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "css/admin.css";
        document.head.appendChild(link);
    }

    // Set body class to apply admin overrides
    document.body.classList.add("admin-body");
});

// 3. Admin Database Accessors & Utility Functions
window.ConductoVerseAdmin = {
    // Session Logout
    logout() {
        localStorage.removeItem("conductoverseCurrentUser");
        window.location.href = "login.html";
    },

    // User Operations
    getUsers() {
        return JSON.parse(localStorage.getItem("conductoverseUsers") || "[]");
    },

    createUser(username, password, role) {
        if (!username || !password || !role) {
            return { success: false, message: "All user fields are required!" };
        }
        if (username.toLowerCase() === "admin" || username.toLowerCase() === "admin@123") {
            return { success: false, message: "Cannot register reserved Admin usernames!" };
        }

        const users = this.getUsers();
        if (users.some(u => u.username.toLowerCase() === username.toLowerCase())) {
            return { success: false, message: "Username already exists!" };
        }

        const newUser = {
            username,
            password,
            role,
            registeredAt: new Date().toISOString()
        };
        users.push(newUser);
        localStorage.setItem("conductoverseUsers", JSON.stringify(users));
        this.addSystemLog(`Created new user account: ${username} (${role.toUpperCase()})`, "success");
        return { success: true };
    },

    deleteUser(username) {
        const users = this.getUsers();
        const initialLength = users.length;
        const filteredUsers = users.filter(u => u.username.toLowerCase() !== username.toLowerCase());

        if (filteredUsers.length === initialLength) {
            return { success: false, message: "User not found!" };
        }

        localStorage.setItem("conductoverseUsers", JSON.stringify(filteredUsers));

        // Purge user's specific quiz and spot activity data
        localStorage.removeItem(`conductoverseQuizResult_${username}`);
        localStorage.removeItem(`conductoverseSpotResult_${username}`);

        this.addSystemLog(`Deleted user account: ${username}`, "danger");
        return { success: true };
    },

    resetUserPassword(username, newPassword) {
        if (!newPassword || newPassword.trim().length === 0) {
            return { success: false, message: "Password cannot be empty!" };
        }

        const users = this.getUsers();
        const user = users.find(u => u.username.toLowerCase() === username.toLowerCase());
        if (!user) {
            return { success: false, message: "User not found!" };
        }

        user.password = newPassword;
        localStorage.setItem("conductoverseUsers", JSON.stringify(users));
        this.addSystemLog(`Reset password for user: ${username}`, "warning");
        return { success: true };
    },

    // Announcements Operations
    getAnnouncements() {
        return JSON.parse(localStorage.getItem("conductoverseAnnouncements") || "[]");
    },

    createAnnouncement(title, content) {
        if (!title || !content) {
            return { success: false, message: "Title and content cannot be empty!" };
        }

        const announcements = this.getAnnouncements();
        const newAnn = {
            id: "ann_" + Date.now(),
            title,
            content,
            postedBy: "Admin",
            postedAt: new Date().toISOString()
        };

        announcements.push(newAnn);
        localStorage.setItem("conductoverseAnnouncements", JSON.stringify(announcements));
        this.addSystemLog(`Broadcasted new global announcement: "${title}"`, "info");
        return { success: true };
    },

    deleteAnnouncement(id) {
        const announcements = this.getAnnouncements();
        const filtered = announcements.filter(a => a.id !== id);
        localStorage.setItem("conductoverseAnnouncements", JSON.stringify(filtered));
        this.addSystemLog(`Deleted announcement: ${id}`, "warning");
        return { success: true };
    },

    // System Logs Operations
    getSystemLogs() {
        return JSON.parse(localStorage.getItem("conductoverseSystemLogs") || "[]");
    },

    addSystemLog(text, type = "info") {
        const logs = this.getSystemLogs();
        const newLog = {
            id: "log_" + Date.now() + "_" + Math.floor(Math.random() * 1000),
            text,
            type, // 'success', 'warning', 'danger', 'info'
            timestamp: new Date().toISOString()
        };

        // Keep last 150 logs to prevent localStorage pollution
        logs.unshift(newLog);
        if (logs.length > 150) {
            logs.pop();
        }

        localStorage.setItem("conductoverseSystemLogs", JSON.stringify(logs));
    },

    clearSystemLogs() {
        localStorage.setItem("conductoverseSystemLogs", JSON.stringify([]));
        this.addSystemLog("Cleared system audit logs", "warning");
    },

    // System Configurations
    getSystemStats() {
        const users = this.getUsers();
        const announcements = this.getAnnouncements();
        const logs = this.getSystemLogs();

        const studentsCount = users.filter(u => u.role === "student").length;
        const teachersCount = users.filter(u => u.role === "teacher").length;

        // Scan localStorage for quiz and spot attempts
        let quizAttempts = 0;
        let spotAttempts = 0;
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith("conductoverseQuizResult_")) quizAttempts++;
            if (key.startsWith("conductoverseSpotResult_")) spotAttempts++;
        }

        return {
            totalUsers: users.length,
            students: studentsCount,
            teachers: teachersCount,
            announcements: announcements.length,
            quizAttempts,
            spotAttempts,
            logsCount: logs.length
        };
    },

    // Database Reset Operations
    wipeDatabase() {
        // Retrieve users but keep only the teacher demo users or admin configuration
        const defaultUsers = [
            { username: "admin@123", password: "1234", role: "admin", registeredAt: new Date().toISOString() }
        ];

        // Wipe quiz/spot results
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (
                key.startsWith("conductoverseQuizResult_") || 
                key.startsWith("conductoverseSpotResult_") ||
                key.startsWith("conductoverseReadAnnouncements_") ||
                key === "conductoverseQuizResult" ||
                key === "conductoverseSpotResult"
            ) {
                keysToRemove.push(key);
            }
        }
        keysToRemove.forEach(key => localStorage.removeItem(key));

        // Restore default lists
        localStorage.setItem("conductoverseUsers", JSON.stringify(defaultUsers));
        localStorage.setItem("conductoverseAnnouncements", JSON.stringify([]));
        localStorage.setItem("conductoverseSystemLogs", JSON.stringify([]));

        this.addSystemLog("Database wipe completed. System restored to default configurations.", "danger");
    }
};
