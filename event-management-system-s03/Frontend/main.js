// assets/js/main.js
// Core application wrapper: manages layouts, dark/light theme, navbar transitions, local CORS fallback, and authentication dropdowns.

document.addEventListener("DOMContentLoaded", async () => {
  // Determine relative paths based on directory depth
  const isSubpage = window.location.pathname.includes('/pages/') || window.location.pathname.includes('\\pages\\');
  const prefix = isSubpage ? '../' : './';
  const pagePrefix = 'pages/';

  // Load components
  await loadHeaderFooter(prefix, pagePrefix);

  // Initialize theme
  initTheme();

  // Initialize navigation drawers & toggles
  initNavbar(prefix);

  // Setup Dynamic Navbar Authentication Dropdown
  setupNavbarAuth(prefix, pagePrefix);

  // Initialize icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Scroll animations
  initScrollAnimations();
});

// Dynamic component loader with absolute local fallback
async function loadHeaderFooter(prefix, pagePrefix) {
  const headerEl = document.getElementById("header-placeholder");
  const footerEl = document.getElementById("footer-placeholder");

  // HTML templates for the navbar and footer with dynamic pathing
  const navbarHTML = `
    <nav class="navbar" style="position: sticky; top: 0; z-index: var(--z-nav); background: rgba(255,255,255,0.92); backdrop-filter: blur(12px); border-bottom: 1.5px solid var(--border-color); padding: 14px 0; transition: all 0.3s ease;">
      <div class="container flex justify-between items-center">
        <a href="${prefix}index.html" class="flex items-center gap-2 font-display text-xl fw-extrabold text-indigo" style="color:var(--brand-indigo-600); text-decoration:none;">
          <i data-lucide="layers" style="color: var(--brand-indigo-500); width: 22px; height: 22px;"></i>
          Connect<span style="color: var(--brand-coral-500);">MyEvent</span>
        </a>
        <div class="flex items-center gap-8">
          <div class="hidden md:flex gap-6 items-center">
            <a href="${prefix}index.html" class="nav-link font-sans text-sm fw-bold text-secondary hover:text-indigo" style="text-decoration:none;">Home</a>
            <a href="${prefix}${pagePrefix}browse-events.html" class="nav-link font-sans text-sm fw-bold text-secondary hover:text-indigo" style="text-decoration:none;">Browse Events</a>
          </div>
          <div class="flex items-center gap-3">
            <button type="button" id="themeToggle" class="btn btn-ghost btn-icon" aria-label="Toggle Theme" style="border-radius: var(--radius-full); width:36px; height:36px; padding:0; display:flex; align-items:center; justify-content:center;">
              <i data-lucide="sun" class="sun-icon" style="width: 18px; height: 18px;"></i>
              <i data-lucide="moon" class="moon-icon" style="width: 18px; height: 18px; display:none;"></i>
            </button>
            <div class="nav-actions" style="display:flex; align-items:center; gap:12px;">
              <!-- Unauthenticated Buttons -->
              <div id="unauthActions" class="flex gap-2">
                <a href="${prefix}${pagePrefix}login.html" class="btn btn-ghost btn-sm" style="border-radius: var(--radius-full);">Sign In</a>
                <a href="${prefix}${pagePrefix}register.html" class="btn btn-primary btn-sm btn-pill">Get Started</a>
              </div>
              <!-- Authenticated Profile Dropdown -->
              <div class="profile-dropdown-container" id="profileDropdownContainer" style="display: none; position: relative;">
                <button type="button" class="avatar avatar-sm cursor-pointer" id="profileMenuToggle" style="border: none;">U</button>
                <div class="profile-dropdown" id="profileDropdown" style="position: absolute; top: calc(100% + 8px); right: 0; width: 220px; background: var(--bg-surface); border: 1.5px solid var(--border-color); border-radius: var(--radius-lg); box-shadow: var(--shadow-xl); display: none; flex-direction: column; overflow: hidden; z-index: 200; animation: scaleIn var(--transition-fast) forwards; padding: 8px 0;">
                  <div style="padding: 10px 16px; border-bottom: 1.5px solid var(--border-color); margin-bottom: 4px;">
                    <span class="fw-bold block text-main text-sm text-truncate" id="profileDropdownName" style="max-width:180px; font-weight:var(--font-bold); display:block;">User Name</span>
                    <span class="text-xs text-muted block text-truncate" id="profileDropdownEmail" style="max-width:180px; margin-top:2px; display:block;">email@college.edu</span>
                  </div>
                  <a href="${prefix}${pagePrefix}my-activities.html" class="profile-item-link" id="myActivitiesLink" style="padding: 10px 16px; display: flex; align-items: center; gap: 8px; font-size: 13px; color: var(--text-secondary); text-decoration: none; font-weight: var(--font-semibold);"><i data-lucide="layout-dashboard" style="width:14px; height:14px;"></i> My Activities</a>
                  <a href="${prefix}${pagePrefix}organizer-dashboard.html" class="profile-item-link" id="organizerDashboardLink" style="padding: 10px 16px; display: none; align-items: center; gap: 8px; font-size: 13px; color: var(--text-secondary); text-decoration: none; font-weight: var(--font-semibold);"><i data-lucide="briefcase" style="width:14px; height:14px;"></i> Organizer Panel</a>
                  <div class="divider" style="margin: 4px 0;"></div>
                  <button type="button" class="profile-item-link text-error" onclick="handleLogout()" style="border: none; background: none; width: 100%; text-align: left; cursor: pointer; color: var(--error); padding: 10px 16px; display: flex; align-items: center; gap: 8px; font-size: 13px;"><i data-lucide="log-out" style="width:14px; height:14px;"></i> Logout</button>
                </div>
              </div>
            </div>
            <button type="button" class="hamburger md:hidden flex flex-col gap-1.5" id="hamburger" aria-expanded="false" aria-label="Toggle menu" style="border:none; background:none; cursor:pointer;">
              <span style="display:block; width:22px; height:2.5px; background:var(--text-main); border-radius:1px; transition:0.3s;"></span>
              <span style="display:block; width:22px; height:2.5px; background:var(--text-main); border-radius:1px; transition:0.3s;"></span>
              <span style="display:block; width:22px; height:2.5px; background:var(--text-main); border-radius:1px; transition:0.3s;"></span>
            </button>
          </div>
        </div>
      </div>
    </nav>
    <div class="mobile-nav-backdrop" id="mobileNavBackdrop" style="position:fixed; inset:0; background:rgba(15,11,46,0.5); z-index:300; display:none; opacity:0; transition:opacity 0.3s;"></div>
    <div class="mobile-nav" id="mobileNav" style="position:fixed; top:0; right:-320px; width:300px; height:100vh; background:var(--bg-surface); z-index:301; padding:28px; display:flex; flex-direction:column; gap:28px; box-shadow:var(--shadow-xl); transition:right 0.3s ease-in-out; border-left:1px solid var(--border-color);">
      <div class="flex justify-between items-center">
        <a href="${prefix}index.html" class="font-display text-lg fw-extrabold text-indigo" style="color:var(--brand-indigo-600); text-decoration:none;">
          Connect<span style="color: var(--brand-coral-500);">MyEvent</span>
        </a>
        <button type="button" id="mobileNavClose" class="btn btn-ghost" style="padding:4px; width:32px; height:32px; display:flex; align-items:center; justify-content:center; border-radius:var(--radius-full);" aria-label="Close"><i data-lucide="x" style="width: 18px; height: 18px;"></i></button>
      </div>
      <div class="flex flex-col gap-4">
        <a href="${prefix}index.html" class="nav-link font-sans text-base fw-bold text-secondary" style="text-decoration:none;">Home</a>
        <a href="${prefix}${pagePrefix}browse-events.html" class="nav-link font-sans text-base fw-bold text-secondary" style="text-decoration:none;">Browse Events</a>
        <div class="divider" style="margin: 12px 0;"></div>
        <div id="mobileUnauthActions">
          <a href="${prefix}${pagePrefix}login.html" class="btn btn-ghost btn-full mb-2" style="border-radius: var(--radius-full);">Sign In</a>
          <a href="${prefix}${pagePrefix}register.html" class="btn btn-primary btn-full btn-pill">Get Started Free</a>
        </div>
        <div id="mobileAuthActions" style="display: none; flex-direction: column; gap: var(--space-3);">
          <div class="flex items-center gap-3 mb-2">
            <div class="avatar avatar-md" id="mobileUserAvatar">U</div>
            <div>
              <span class="fw-bold block text-main text-sm" id="mobileUserName" style="font-weight:var(--font-bold); display:block;">User Name</span>
              <span class="text-xs text-secondary block" id="mobileUserRole" style="margin-top:2px; display:block;">Participant</span>
            </div>
          </div>
          <a href="${prefix}${pagePrefix}my-activities.html" class="btn btn-ghost btn-full" id="mobileMyActivitiesLink" style="border-radius: var(--radius-full); text-align: left; justify-content: flex-start; display:flex; align-items:center; text-decoration:none;"><i data-lucide="layout-dashboard" style="width:16px; margin-right:8px;"></i> My Activities</a>
          <a href="${prefix}${pagePrefix}organizer-dashboard.html" class="btn btn-ghost btn-full" id="mobileOrganizerLink" style="border-radius: var(--radius-full); text-align: left; justify-content: flex-start; display:none; align-items:center; text-decoration:none;"><i data-lucide="briefcase" style="width:16px; margin-right:8px;"></i> Organizer Panel</a>
          <button type="button" class="btn btn-ghost btn-full text-error" onclick="handleLogout()" style="border-radius: var(--radius-full); text-align: left; justify-content: flex-start; color: var(--error); display:flex; align-items:center;"><i data-lucide="log-out" style="width:16px; margin-right:8px;"></i> Logout</button>
        </div>
      </div>
    </div>
  `;

  const footerHTML = `
    <footer class="footer" style="background: var(--bg-dark); color: var(--n-300); padding: 72px 0 36px; border-top: 1px solid var(--n-800);">
      <div class="container grid grid-cols-1 md:grid-cols-4 gap-8">
        <div class="md:col-span-1">
          <a href="${prefix}index.html" class="font-display text-xl fw-extrabold text-indigo mb-4 block" style="color:var(--brand-indigo-400); text-decoration:none;">
            Connect<span style="color: var(--brand-coral-400);">MyEvent</span>
          </a>
          <p class="text-sm text-secondary mb-6" style="color: var(--n-400);">Intelligent event matching platform helping colleges, enterprises, and local groups manage listings, registrations, and analytics in one place.</p>
          <div class="flex gap-4">
            <a href="#" style="color: var(--n-400); hover:color:#fff;"><i data-lucide="twitter" style="width:18px; height:18px;"></i></a>
            <a href="#" style="color: var(--n-400); hover:color:#fff;"><i data-lucide="linkedin" style="width:18px; height:18px;"></i></a>
            <a href="#" style="color: var(--n-400); hover:color:#fff;"><i data-lucide="github" style="width:18px; height:18px;"></i></a>
          </div>
        </div>
        <div>
          <h4 class="font-display text-sm fw-bold text-on-dark mb-4" style="color:#fff;">Discover</h4>
          <div class="flex flex-col gap-2.5">
            <a href="${prefix}${pagePrefix}browse-events.html" class="text-sm hover:text-indigo" style="color: var(--n-400);">All Competitions</a>
            <a href="${prefix}${pagePrefix}browse-events.html?cat=hackathon" class="text-sm hover:text-indigo" style="color: var(--n-400);">Hackathons</a>
            <a href="${prefix}${pagePrefix}browse-events.html?cat=workshop" class="text-sm hover:text-indigo" style="color: var(--n-400);">Workshops</a>
          </div>
        </div>
        <div>
          <h4 class="font-display text-sm fw-bold text-on-dark mb-4" style="color:#fff;">Organizers</h4>
          <div class="flex flex-col gap-2.5">
            <a href="${prefix}${pagePrefix}register.html?role=organizer" class="text-sm hover:text-indigo" style="color: var(--n-400);">Publish an Event</a>
            <a href="${prefix}${pagePrefix}login.html" class="text-sm hover:text-indigo" style="color: var(--n-400);">Organizer Portal</a>
          </div>
        </div>
        <div>
          <h4 class="font-display text-sm fw-bold text-on-dark mb-4" style="color:#fff;">Support</h4>
          <div class="flex flex-col gap-2.5">
            <a href="#" class="text-sm hover:text-indigo" style="color: var(--n-400);">Contact Support</a>
            <a href="#" class="text-sm hover:text-indigo" style="color: var(--n-400);">Terms of Service</a>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="divider" style="background: var(--n-800); margin: 36px 0 24px;"></div>
        <div class="flex flex-wrap justify-between items-center gap-4 text-xs" style="color: var(--n-500);">
          <p>&copy; 2026 ConnectMyEvent. Built for high performance & modern accessibility.</p>
          <div class="flex gap-4">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms & Conditions</a>
            <a href="#">Cookie settings</a>
          </div>
        </div>
      </div>
    </footer>
  `;

  // Try to load via fetch, fallback to templates on fail
  if (headerEl) {
    try {
      const response = await fetch(`${prefix}components/header.html`);
      if (response.ok) {
        let html = await response.text();
        // Replace absolute paths to make them local-depth aware
        html = html.replace(/\/index\.html/g, `${prefix}index.html`)
                   .replace(/\/pages\/browse-events\.html/g, `${prefix}${pagePrefix}browse-events.html`)
                   .replace(/\/pages\/login\.html/g, `${prefix}${pagePrefix}login.html`)
                   .replace(/\/pages\/register\.html/g, `${prefix}${pagePrefix}register.html`);
        headerEl.innerHTML = html;
      } else {
        headerEl.innerHTML = navbarHTML;
      }
    } catch (e) {
      headerEl.innerHTML = navbarHTML;
    }
  }

  if (footerEl) {
    try {
      const response = await fetch(`${prefix}components/footer.html`);
      if (response.ok) {
        let html = await response.text();
        html = html.replace(/\/index\.html/g, `${prefix}index.html`)
                   .replace(/\/pages\/browse-events\.html/g, `${prefix}${pagePrefix}browse-events.html`)
                   .replace(/\/pages\/login\.html/g, `${prefix}${pagePrefix}login.html`)
                   .replace(/\/pages\/register\.html/g, `${prefix}${pagePrefix}register.html`);
        footerEl.innerHTML = html;
      } else {
        footerEl.innerHTML = footerHTML;
      }
    } catch (e) {
      footerEl.innerHTML = footerHTML;
    }
  }
}

// Global Theme Management
function initTheme() {
  const currentTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", currentTheme);
  updateThemeIcons(currentTheme);

  // Use event delegation for themeToggle button since header can be injected asynchronously
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("#themeToggle");
    if (btn) {
      const activeTheme = document.documentElement.getAttribute("data-theme");
      const nextTheme = activeTheme === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", nextTheme);
      localStorage.setItem("theme", nextTheme);
      updateThemeIcons(nextTheme);
    }
  });
}

function updateThemeIcons(theme) {
  const sunIcons = document.querySelectorAll(".sun-icon");
  const moonIcons = document.querySelectorAll(".moon-icon");

  if (theme === "dark") {
    sunIcons.forEach(i => i.style.display = "none");
    moonIcons.forEach(i => i.style.display = "block");
  } else {
    sunIcons.forEach(i => i.style.display = "block");
    moonIcons.forEach(i => i.style.display = "none");
  }
}

// Navbar Drawer Interactivity
function initNavbar(prefix) {
  document.addEventListener("click", (e) => {
    const hamburger = e.target.closest("#hamburger");
    const closeBtn = e.target.closest("#mobileNavClose");
    const backdrop = e.target.closest("#mobileNavBackdrop");
    const mobileNav = document.getElementById("mobileNav");
    const mobileBackdrop = document.getElementById("mobileNavBackdrop");

    if (hamburger && mobileNav) {
      const isExpanded = hamburger.getAttribute("aria-expanded") === "true";
      hamburger.setAttribute("aria-expanded", !isExpanded);
      mobileNav.style.right = "0";
      if (mobileBackdrop) {
        mobileBackdrop.style.display = "block";
        setTimeout(() => mobileBackdrop.style.opacity = "1", 10);
      }
    }

    if ((closeBtn || backdrop) && mobileNav) {
      const burger = document.getElementById("hamburger");
      if (burger) burger.setAttribute("aria-expanded", "false");
      mobileNav.style.right = "-320px";
      if (mobileBackdrop) {
        mobileBackdrop.style.opacity = "0";
        setTimeout(() => mobileBackdrop.style.display = "none", 300);
      }
    }
  });

  // Sticky scroll navbar effect
  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    if (navbar) {
      if (window.scrollY > 40) {
        navbar.style.padding = "8px 0";
        navbar.style.boxShadow = "var(--shadow-md)";
      } else {
        navbar.style.padding = "14px 0";
        navbar.style.boxShadow = "none";
      }
    }
  });
}

// Dynamic Authentication State Syncing
function setupNavbarAuth(prefix, pagePrefix) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const unauthDiv = document.getElementById("unauthActions");
  const mobileUnauthDiv = document.getElementById("mobileUnauthActions");
  
  const dropdownContainer = document.getElementById("profileDropdownContainer");
  const mobileAuthDiv = document.getElementById("mobileAuthActions");

  if (!isLoggedIn) {
    if (unauthDiv) unauthDiv.style.display = "flex";
    if (mobileUnauthDiv) mobileUnauthDiv.style.display = "block";
    if (dropdownContainer) dropdownContainer.style.display = "none";
    if (mobileAuthDiv) mobileAuthDiv.style.display = "none";
    return;
  }

  // User is logged in - hide unauthenticated elements
  if (unauthDiv) unauthDiv.style.display = "none";
  if (mobileUnauthDiv) mobileUnauthDiv.style.display = "none";

  // Show profile dropdowns
  if (dropdownContainer) dropdownContainer.style.display = "block";
  if (mobileAuthDiv) mobileAuthDiv.style.display = "flex";

  // Retrieve user metadata
  const userName = localStorage.getItem("userName") || "User Profile";
  const userEmail = localStorage.getItem("userEmail") || "user@connectmyevent.com";
  const userRole = localStorage.getItem("userRole") || "participant";
  const userInitial = userName.trim().charAt(0).toUpperCase();

  // Hydrate views
  const profileMenuToggle = document.getElementById("profileMenuToggle");
  const dropdownName = document.getElementById("profileDropdownName");
  const dropdownEmail = document.getElementById("profileDropdownEmail");
  const mobileAvatar = document.getElementById("mobileUserAvatar");
  const mobileName = document.getElementById("mobileUserName");
  const mobileRole = document.getElementById("mobileUserRole");

  if (profileMenuToggle) profileMenuToggle.textContent = userInitial;
  if (dropdownName) dropdownName.textContent = userName;
  if (dropdownEmail) dropdownEmail.textContent = userEmail;
  if (mobileAvatar) mobileAvatar.textContent = userInitial;
  if (mobileName) mobileName.textContent = userName;
  if (mobileRole) mobileRole.textContent = userRole === 'organizer' ? 'Organizer' : 'Participant';

  // Toggle roles and paths
  const myActivitiesLink = document.getElementById("myActivitiesLink");
  const orgLink = document.getElementById("organizerDashboardLink");
  const mobileMyActivitiesLink = document.getElementById("mobileMyActivitiesLink");
  const mobileOrgLink = document.getElementById("mobileOrganizerLink");

  if (userRole === "organizer") {
    if (orgLink) {
      orgLink.href = `${prefix}${pagePrefix}organizer-dashboard.html`;
      orgLink.style.display = "flex";
    }
    if (mobileOrgLink) {
      mobileOrgLink.href = `${prefix}${pagePrefix}organizer-dashboard.html`;
      mobileOrgLink.style.display = "flex";
    }
    if (myActivitiesLink) myActivitiesLink.style.display = "none";
    if (mobileMyActivitiesLink) mobileMyActivitiesLink.style.display = "none";
  } else {
    // Participant
    if (myActivitiesLink) {
      myActivitiesLink.href = `${prefix}${pagePrefix}my-activities.html`;
      myActivitiesLink.style.display = "flex";
    }
    if (mobileMyActivitiesLink) {
      mobileMyActivitiesLink.href = `${prefix}${pagePrefix}my-activities.html`;
      mobileMyActivitiesLink.style.display = "flex";
    }
    if (orgLink) orgLink.style.display = "none";
    if (mobileOrgLink) mobileOrgLink.style.display = "none";
  }

  // Profile Menu Dropdown toggles
  if (profileMenuToggle) {
    profileMenuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const dropdown = document.getElementById("profileDropdown");
      if (dropdown) dropdown.classList.toggle("open");
    });
  }

  document.addEventListener("click", () => {
    const dropdown = document.getElementById("profileDropdown");
    if (dropdown) dropdown.classList.remove("open");
  });
}

// Global Logout Callback
function handleLogout() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("userRole");
  localStorage.removeItem("userName");
  localStorage.removeItem("userEmail");

  const isSubpage = window.location.pathname.includes('/pages/') || window.location.pathname.includes('\\pages\\');
  const homePath = isSubpage ? '../index.html' : 'index.html';
  window.location.href = homePath;
}

window.handleLogout = handleLogout; // Expose globally for header inline button clicks

// Scroll Reveals
function initScrollAnimations() {
  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".reveal").forEach(elem => {
    observer.observe(elem);
  });
}
