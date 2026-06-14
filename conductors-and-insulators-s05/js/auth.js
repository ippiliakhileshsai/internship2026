/* ═══════════════════════════════════════════════════════
   CONDUCTOVERSE — Authentication & Session Middleware
   Manages login status, route guards, and dynamic navbar injection.
   ═══════════════════════════════════════════════════════ */

(function () {
    // 1. Immediate Page Access Guards (Runs before DOM compiles to prevent flash of protected content)
    const path = window.location.pathname;
    let page = path.substring(path.lastIndexOf('/') + 1) || "index.html";
    
    // Strip query parameters and hash fragments to prevent path mismatch
    page = page.split('?')[0].split('#')[0];

    // Normalize clean URLs (e.g. "login" -> "login.html")
    if (page && !page.includes('.')) {
        page += ".html";
    }

    const currentUser = JSON.parse(localStorage.getItem("conductoverseCurrentUser") || "null");

    // 2. Access Protection Guard: Only login.html and register.html are accessible when logged out
    if (!currentUser && page !== "login.html" && page !== "register.html") {
        window.location.href = "login.html";
        return;
    }
    
    // Redirect logged-in users away from login/register pages to their appropriate homepage
    if (currentUser && (page === "login.html" || page === "register.html")) {
        if (currentUser.role === "teacher") {
            window.location.href = "teacher-overview.html";
        } else {
            window.location.href = "index.html";
        }
        return;
    }

    // Role-based route guards
    if (currentUser) {
        const isTeacherPage = page.startsWith("teacher-") || page === "teacher.html";
        if (isTeacherPage && currentUser.role !== "teacher" && currentUser.role !== "admin") {
            window.location.href = "profile.html";
            return;
        }
        if (currentUser.role === "teacher" && (page === "profile.html" || page === "teacher.html")) {
            window.location.href = "teacher-overview.html";
            return;
        }
    }
    
    // 2. Dynamic Navbar & Stylesheet Injection on Load
    document.addEventListener("DOMContentLoaded", () => {
        // Inject auth styling sheet dynamically
        if (!document.querySelector('link[href*="auth.css"]')) {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = "css/auth.css";
            document.head.appendChild(link);
        }

        const navLinks = document.querySelector(".nav-links");
        if (navLinks) {
            // Remove previous instances if any
            navLinks.querySelectorAll(".auth-injected").forEach(el => el.remove());

            if (currentUser) {
                if (currentUser.role === 'teacher') {
                    // Remove all default nav links (student links)
                    navLinks.innerHTML = "";

                    // Inject Teacher distributed links
                    const links = [
                        { name: "Overview", url: "teacher-overview.html" },
                        { name: "Students", url: "teacher-students.html" },
                        { name: "Assignments", url: "teacher-assignments.html" },
                        { name: "Quizzes", url: "teacher-quizzes.html" },
                        { name: "Analytics", url: "teacher-analytics.html" },
                        { name: "Announcements", url: "teacher-announcements.html" },
                        { name: "Reports", url: "teacher-reports.html" },
                        { name: "Settings", url: "teacher-settings.html" }
                    ];

                    links.forEach(link => {
                        const li = document.createElement("li");
                        const isActive = page === link.url ? 'class="active"' : '';
                        li.innerHTML = `<a href="${link.url}" ${isActive}>${link.name}</a>`;
                        navLinks.appendChild(li);
                    });

                    // Logout Link
                    const logoutLi = document.createElement("li");
                    logoutLi.innerHTML = `<a href="#" id="authLogoutBtn" class="logout-btn-nav" style="border: 1px dashed rgba(231, 111, 81, 0.4); color: var(--red); padding: 6px 14px; border-radius: 999px;">Logout (${currentUser.username})</a>`;
                    navLinks.appendChild(logoutLi);

                    // Add logout click listener
                    logoutLi.querySelector("#authLogoutBtn").addEventListener("click", (e) => {
                        e.preventDefault();
                        localStorage.removeItem("conductoverseCurrentUser");
                        window.location.href = "index.html";
                    });
                } else {
                    // Inject Notification Styles dynamically
                    if (!document.getElementById("conductoverseNotificationStyles")) {
                        const style = document.createElement("style");
                        style.id = "conductoverseNotificationStyles";
                        style.textContent = `
                            @keyframes pulseBadge {
                                0% { transform: scale(1); }
                                50% { transform: scale(1.18); box-shadow: 0 0 12px rgba(231,111,81,0.8); }
                                100% { transform: scale(1); }
                            }
                            .notification-drawer {
                                position: fixed;
                                top: 0;
                                right: -420px;
                                width: min(100%, 400px);
                                height: 100vh;
                                background: rgba(255, 255, 255, 0.95);
                                backdrop-filter: blur(28px) saturate(180%);
                                -webkit-backdrop-filter: blur(28px) saturate(180%);
                                border-left: 1px solid rgba(0, 0, 0, 0.08);
                                box-shadow: -10px 0 40px rgba(0, 0, 0, 0.08);
                                z-index: 1000;
                                display: flex;
                                flex-direction: column;
                                transition: right 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                            }
                            .notification-drawer.open {
                                right: 0;
                            }
                            .notification-drawer-overlay {
                                position: fixed;
                                top: 0;
                                left: 0;
                                width: 100vw;
                                height: 100vh;
                                background: rgba(13, 27, 42, 0.15);
                                backdrop-filter: blur(4px);
                                z-index: 999;
                                opacity: 0;
                                pointer-events: none;
                                transition: opacity 0.4s ease;
                            }
                            .notification-drawer-overlay.open {
                                opacity: 1;
                                pointer-events: auto;
                            }
                            .notification-drawer-header {
                                padding: 24px;
                                border-bottom: 1px solid rgba(0, 0, 0, 0.06);
                                display: flex;
                                align-items: center;
                                justify-content: space-between;
                            }
                            .notification-drawer-header h2 {
                                font-family: 'Outfit', sans-serif;
                                font-weight: 850;
                                font-size: 1.3rem;
                                color: #0d1b2a;
                                margin: 0;
                            }
                            .notification-drawer-close {
                                background: none;
                                border: none;
                                font-size: 1.6rem;
                                font-weight: 600;
                                color: #31506f;
                                cursor: pointer;
                                width: 32px;
                                height: 32px;
                                border-radius: 50%;
                                display: grid;
                                place-items: center;
                                transition: background 0.2s;
                            }
                            .notification-drawer-close:hover {
                                background: rgba(0, 0, 0, 0.05);
                            }
                            .notification-drawer-content {
                                flex: 1;
                                overflow-y: auto;
                                padding: 24px;
                                display: flex;
                                flex-direction: column;
                                gap: 16px;
                            }
                            .notification-card {
                                padding: 18px;
                                border-radius: 16px;
                                background: white;
                                border: 1px solid rgba(0, 0, 0, 0.05);
                                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
                                display: flex;
                                flex-direction: column;
                                gap: 8px;
                                transition: transform 0.2s, box-shadow 0.2s;
                            }
                            .notification-card:hover {
                                transform: translateY(-2px);
                                box-shadow: 0 8px 20px rgba(0, 0, 0, 0.04);
                            }
                            .notification-card.unread {
                                border-left: 4px solid #e76f51;
                                background: linear-gradient(90deg, rgba(231,111,81,0.02), white);
                            }
                            .notification-card h3 {
                                font-family: 'Outfit', sans-serif;
                                font-weight: 800;
                                font-size: 1rem;
                                color: #0d1b2a;
                                margin: 0;
                            }
                            .notification-card p {
                                font-size: 0.86rem;
                                color: #5c748d;
                                line-height: 1.55;
                                margin: 0;
                                font-weight: 600;
                            }
                            .notification-card span {
                                font-size: 0.75rem;
                                color: #a0aec0;
                                font-weight: 700;
                            }
                        `;
                        document.head.appendChild(style);
                    }

                    // Ensure all general nav links are visible
                    navLinks.querySelectorAll("li").forEach(el => el.style.display = "");

                    // Notification Bell Link
                    const notifications = JSON.parse(localStorage.getItem("conductoverseAnnouncements") || "[]");
                    const readAnnouncements = JSON.parse(localStorage.getItem("conductoverseReadAnnouncements_" + currentUser.username) || "[]");
                    const unreadCount = notifications.filter(n => !readAnnouncements.includes(n.id)).length;

                    const bellLi = document.createElement("li");
                    bellLi.className = "auth-injected notification-bell-item";
                    bellLi.innerHTML = `
                        <a href="#" id="authNotificationBtn" style="position: relative; display: inline-flex; align-items: center; justify-content: center; width: 38px; height: 38px; padding: 0; border-radius: 50%; background: rgba(0,0,0,0.03); transition: background 0.3s; margin-right: 4px;">
                            <span style="font-size: 1.15rem; transform: translateY(-1px);">🔔</span>
                            ${unreadCount > 0 ? `
                                <span class="notification-badge" style="position: absolute; top: -1px; right: -1px; width: 18px; height: 18px; border-radius: 50%; background: #e76f51; color: white; font-size: 0.68rem; font-weight: 800; display: flex; align-items: center; justify-content: center; border: 2px solid white; box-shadow: 0 2px 5px rgba(231,111,81,0.4); animation: pulseBadge 2s infinite;">
                                    ${unreadCount}
                                </span>
                            ` : ''}
                        </a>
                    `;
                    navLinks.appendChild(bellLi);

                    // Create overlay and drawer in DOM on bell click
                    bellLi.querySelector("#authNotificationBtn").addEventListener("click", (e) => {
                        e.preventDefault();
                        
                        let overlay = document.getElementById("studentNotificationOverlay");
                        let drawer = document.getElementById("studentNotificationDrawer");
                        
                        if (!overlay) {
                            overlay = document.createElement("div");
                            overlay.id = "studentNotificationOverlay";
                            overlay.className = "notification-drawer-overlay";
                            document.body.appendChild(overlay);
                            
                            overlay.addEventListener("click", () => {
                                overlay.classList.remove("open");
                                drawer.classList.remove("open");
                            });
                        }
                        
                        if (!drawer) {
                            drawer = document.createElement("div");
                            drawer.id = "studentNotificationDrawer";
                            drawer.className = "notification-drawer";
                            document.body.appendChild(drawer);
                        }
                        
                        // Update/render content inside drawer
                        const allAnns = JSON.parse(localStorage.getItem("conductoverseAnnouncements") || "[]");
                        const activeRead = JSON.parse(localStorage.getItem("conductoverseReadAnnouncements_" + currentUser.username) || "[]");
                        const sortedAnns = [...allAnns].sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime());
                        
                        let contentHtml = "";
                        if (sortedAnns.length === 0) {
                            contentHtml = `
                                <div style="text-align: center; margin-top: 60px; padding: 24px;">
                                    <span style="font-size: 2.5rem; display: block; margin-bottom: 12px;">🎉</span>
                                    <strong style="color: #0d1b2a; font-family: 'Outfit', sans-serif; font-size: 1.05rem; display: block; margin-bottom: 4px;">All Clear!</strong>
                                    <span style="font-size: 0.85rem; color: #5c748d; font-weight: 600;">No announcements from your teacher.</span>
                                </div>
                            `;
                        } else {
                            sortedAnns.forEach(ann => {
                                const isUnread = !activeRead.includes(ann.id);
                                const dateStr = new Date(ann.postedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
                                contentHtml += `
                                    <div class="notification-card ${isUnread ? 'unread' : ''}">
                                        <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 8px;">
                                            <h3>${ann.title}</h3>
                                            ${isUnread ? '<span style="color:#e76f51; font-size:0.6rem; text-transform:uppercase; font-weight:800; background:rgba(231,111,81,0.1); padding:2px 6px; border-radius:999px;">New</span>' : ''}
                                        </div>
                                        <p>${ann.content}</p>
                                        <span>${dateStr}</span>
                                    </div>
                                `;
                            });
                        }
                        
                        drawer.innerHTML = `
                            <div class="notification-drawer-header">
                                <h2>📣 Announcements</h2>
                                <button class="notification-drawer-close" id="closeNotificationDrawerBtn">&times;</button>
                            </div>
                            <div class="notification-drawer-content">
                                ${contentHtml}
                            </div>
                        `;
                        
                        drawer.querySelector("#closeNotificationDrawerBtn").addEventListener("click", () => {
                            overlay.classList.remove("open");
                            drawer.classList.remove("open");
                        });
                        
                        // Toggle drawer open
                        overlay.classList.add("open");
                        drawer.classList.add("open");
                        
                        // Mark all as read
                        const newReadIds = allAnns.map(ann => ann.id);
                        localStorage.setItem("conductoverseReadAnnouncements_" + currentUser.username, JSON.stringify(newReadIds));
                        
                        // Remove count badge if present
                        const badge = bellLi.querySelector(".notification-badge");
                        if (badge) {
                            badge.remove();
                        }
                    });

                    // Profile Link
                    const profileLi = document.createElement("li");
                    profileLi.className = "auth-injected";
                    const isProfileActive = page === "profile.html" ? 'class="active"' : '';
                    profileLi.innerHTML = `<a href="profile.html" ${isProfileActive}>Profile</a>`;
                    navLinks.appendChild(profileLi);

                    // Logout Link
                    const logoutLi = document.createElement("li");
                    logoutLi.className = "auth-injected";
                    logoutLi.innerHTML = `<a href="#" id="authLogoutBtn" class="logout-btn-nav" style="border: 1px dashed rgba(231, 111, 81, 0.4); color: var(--red); padding: 6px 14px; border-radius: 999px;">Logout (${currentUser.username})</a>`;
                    navLinks.appendChild(logoutLi);

                    // Handle Logout logic
                    const logoutBtn = logoutLi.querySelector("#authLogoutBtn");
                    if (logoutBtn) {
                        logoutBtn.addEventListener("click", (e) => {
                            e.preventDefault();
                            localStorage.removeItem("conductoverseCurrentUser");
                            window.location.href = "index.html";
                        });
                    }
                }
            } else {
                // Hide general nav links when logged out to prevent broken redirection loops
                navLinks.querySelectorAll("li:not(.auth-injected)").forEach(el => el.style.display = "none");

                // Login Link
                const loginLi = document.createElement("li");
                loginLi.className = "auth-injected";
                const isLoginActive = page === "login.html" ? 'class="active"' : '';
                loginLi.innerHTML = `<a href="login.html" ${isLoginActive}>Login</a>`;
                navLinks.appendChild(loginLi);
            }

            // Adjust Logo redirect and text for teachers
            const logo = document.querySelector(".logo");
            if (logo && currentUser && currentUser.role === 'teacher') {
                logo.href = "teacher-overview.html";
                logo.innerHTML = `<span class="logo-mark">⚡</span> ConductoVerse Teacher`;
            }

            // Trigger window resize event to allow the background sliding pill to align itself
            setTimeout(() => {
                window.dispatchEvent(new Event('resize'));
            }, 100);
        }
    });

    // 3. Export global Auth helper methods for Form submissions
    window.ConductoVerseAuth = {
        getCurrentUser() {
            return currentUser;
        },

        login(username, password, role) {
            // Fixed Admin credentials
            if (role === "admin") {
                if (username === "admin@123" && password === "1234") {
                    const session = { username: "Admin", role: "admin", loggedAt: new Date().toISOString() };
                    localStorage.setItem("conductoverseCurrentUser", JSON.stringify(session));
                    return { success: true };
                } else {
                    return { success: false, message: "Invalid Admin credentials! Use admin@123 / 1234." };
                }
            }

            // Student / Teacher flow: Check registered users first
            const users = JSON.parse(localStorage.getItem("conductoverseUsers") || "[]");
            const existingUser = users.find(u => u.username.toLowerCase() === username.toLowerCase());

            if (existingUser) {
                if (existingUser.password === password) {
                    if (existingUser.role !== role) {
                        return { success: false, message: `Account exists but is registered as a ${existingUser.role.toUpperCase()}!` };
                    }
                    const session = { username: existingUser.username, role: existingUser.role, loggedAt: new Date().toISOString() };
                    localStorage.setItem("conductoverseCurrentUser", JSON.stringify(session));
                    return { success: true };
                } else {
                    return { success: false, message: "Incorrect password for this registered user!" };
                }
            }

            // Fallback for "any name and password succeeds" if not registered
            const newUserSession = { username: username, role: role, loggedAt: new Date().toISOString() };
            localStorage.setItem("conductoverseCurrentUser", JSON.stringify(newUserSession));
            
            // Add to dynamic users list just to register them
            users.push({ username, password, role });
            localStorage.setItem("conductoverseUsers", JSON.stringify(users));

            return { success: true };
        },

        register(username, password, role) {
            // Cannot register Admin keyword
            if (username.toLowerCase() === "admin" || username.toLowerCase() === "admin@123") {
                return { success: false, message: "The Admin username is reserved and cannot be registered!" };
            }

            const users = JSON.parse(localStorage.getItem("conductoverseUsers") || "[]");
            const userExists = users.some(u => u.username.toLowerCase() === username.toLowerCase());

            if (userExists) {
                return { success: false, message: "Username already exists! Please select another name or log in." };
            }

            // Register user
            users.push({ username, password, role, registeredAt: new Date().toISOString() });
            localStorage.setItem("conductoverseUsers", JSON.stringify(users));
            return { success: true };
        }
    };
})();
