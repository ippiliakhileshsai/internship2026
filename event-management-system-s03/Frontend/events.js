// assets/js/events.js
// Interactivity engine for ConnectMyEvent: renders, filters, handles carousels, and loads details.

document.addEventListener("DOMContentLoaded", () => {
  // ── 1. LANDING PAGE INITIALIZATION ──
  initLandingPage();

  // ── 2. BROWSE EVENTS PAGE INITIALIZATION ──
  initBrowsePage();

  // ── 3. EVENT DETAIL PAGE INITIALIZATION ──
  initDetailPage();
});

/* ============================================================
   1. LANDING PAGE LOGIC
   ============================================================ */
function initLandingPage() {
  const featuredContainer = document.getElementById("featuredCarousel");
  const landingEventsGrid = document.getElementById("landingEventsGrid");
  const landingCatTabs = document.getElementById("landingCatTabs");

  if (!mockEvents) return;

  // Render Featured Events Carousel
  if (featuredContainer) {
    const featuredList = mockEvents.filter(e => e.featured);
    featuredContainer.innerHTML = featuredList.map(event => `
      <div class="carousel-slide anim-fade">
        <div class="carousel-card card" style="border-top: 4px solid ${event.color};">
          <div class="carousel-card-body flex gap-6 items-center">
            <div class="carousel-icon-box" style="background: ${event.bgColor}; color: ${event.color};">
              ${event.icon}
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex gap-2 items-center mb-2">
                <span class="badge" style="background: ${event.bgColor}; color: ${event.color};">${event.categoryLabel}</span>
                <span class="badge badge-amber"><i data-lucide="sparkles" style="width:12px; height:12px;"></i> Featured</span>
              </div>
              <h3 class="text-xl font-bold text-truncate mb-2">${event.title}</h3>
              <p class="text-sm text-secondary text-truncate-2 mb-4">${event.description}</p>
              <div class="flex flex-wrap gap-4 text-xs text-muted mb-4">
                <span class="flex items-center gap-1"><i data-lucide="calendar" style="width:12px; height:12px;"></i> ${event.date}</span>
                <span class="flex items-center gap-1"><i data-lucide="map-pin" style="width:12px; height:12px;"></i> ${event.location}</span>
                <span class="flex items-center gap-1"><i data-lucide="users" style="width:12px; height:12px;"></i> ${event.registrationsCount} Registered</span>
              </div>
              <a href="pages/event-detail.html?id=${event.id}" class="btn btn-primary btn-sm">Explore Details</a>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    // Setup Slider Controls
    setupCarouselControls();
  }

  // Render Category pills & default listing
  if (landingCatTabs && landingEventsGrid) {
    // Add event listeners to category tabs
    const tabs = landingCatTabs.querySelectorAll(".cat-tab");
    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        const category = tab.getAttribute("data-category");
        renderLandingEvents(category);
      });
    });

    // Default render all
    renderLandingEvents("all");
  }
}

function renderLandingEvents(category) {
  const grid = document.getElementById("landingEventsGrid");
  if (!grid) return;

  const filtered = category === "all" 
    ? mockEvents.slice(0, 6) 
    : mockEvents.filter(e => e.category === category).slice(0, 6);

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full text-center py-12">
        <p class="text-muted text-lg">No upcoming events listed in this category yet.</p>
        <a href="pages/browse-events.html" class="btn btn-outline btn-sm mt-4">Browse All Events</a>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(event => renderEventCard(event)).join('');
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function setupCarouselControls() {
  let currentIndex = 0;
  const slides = document.querySelectorAll(".carousel-slide");
  const prevBtn = document.getElementById("carouselPrev");
  const nextBtn = document.getElementById("carouselNext");

  if (slides.length <= 1) return;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.display = i === index ? "block" : "none";
    });
    currentIndex = index;
  }

  showSummarySlide();

  function showSummarySlide() {
    showSlide(0);
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      let nextIndex = currentIndex - 1;
      if (nextIndex < 0) nextIndex = slides.length - 1;
      showSlide(nextIndex);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      let nextIndex = currentIndex + 1;
      if (nextIndex >= slides.length) nextIndex = 0;
      showSlide(nextIndex);
    });
  }

  // Auto-play interval
  setInterval(() => {
    let nextIndex = currentIndex + 1;
    if (nextIndex >= slides.length) nextIndex = 0;
    showSlide(nextIndex);
  }, 6000);
}

/* ============================================================
   2. BROWSE EVENTS PAGE LOGIC
   ============================================================ */
function initBrowsePage() {
  const grid = document.getElementById("eventsGrid");
  if (!grid) return;

  // Pre-filter by URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const catParam = urlParams.get('cat');
  const qParam = urlParams.get('q');

  const searchInput = document.getElementById('searchInput');
  if (qParam && searchInput) {
    searchInput.value = qParam;
  }

  if (catParam) {
    const checkbox = document.querySelector(`.cat-filter[value="${catParam}"]`);
    if (checkbox) {
      checkbox.checked = true;
    }
  }

  // Initial render
  applyFiltersAndSort();

  // Attach search and filter event listeners
  document.querySelectorAll('.cat-filter, .price-filter, .format-filter').forEach(elem => {
    elem.addEventListener('change', applyFiltersAndSort);
  });

  if (searchInput) {
    searchInput.addEventListener('input', applyFiltersAndSort);
  }

  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', applyFiltersAndSort);
  }
}

function applyFiltersAndSort() {
  const grid = document.getElementById("eventsGrid");
  const count = document.getElementById("eventCount");
  if (!grid) return;

  const searchInput = document.getElementById('searchInput');
  const searchVal = searchInput ? searchInput.value.toLowerCase() : "";

  const checkedCats = Array.from(document.querySelectorAll('.cat-filter:checked')).map(cb => cb.value);
  const checkedPrices = Array.from(document.querySelectorAll('.price-filter:checked')).map(cb => cb.value);
  const checkedFormats = Array.from(document.querySelectorAll('.format-filter:checked')).map(cb => cb.value);

  let filtered = mockEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchVal) || 
                          event.organizer.toLowerCase().includes(searchVal) ||
                          event.location.toLowerCase().includes(searchVal);
    
    const matchesCat = checkedCats.length === 0 || checkedCats.includes(event.category);
    const matchesPrice = checkedPrices.length === 0 || checkedPrices.includes(event.price);
    const matchesFormat = checkedFormats.length === 0 || checkedFormats.includes(event.format);

    return matchesSearch && matchesCat && matchesPrice && matchesFormat;
  });

  // Sort Logic
  const sortSelect = document.getElementById('sortSelect');
  const sortBy = sortSelect ? sortSelect.value : "upcoming";

  if (sortBy === "popular") {
    filtered.sort((a, b) => b.registrationsCount - a.registrationsCount);
  } else if (sortBy === "days-left") {
    filtered.sort((a, b) => a.daysLeft - b.daysLeft);
  } else {
    // Default upcoming (ID order or date order)
    filtered.sort((a, b) => a.id - b.id);
  }

  // Update counter
  if (count) count.textContent = filtered.length;

  // Render cards
  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full text-center py-16 card card-flat bg-surface" style="border-style: dashed; border-width: 2px;">
        <p class="text-muted text-lg mb-2">No matching events found.</p>
        <p class="text-sm text-secondary">Try updating your filters or search keywords.</p>
        <button class="btn btn-outline btn-sm mt-4" onclick="resetFilters()">Reset All Filters</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(event => renderEventCard(event)).join('');
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function resetFilters() {
  document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.value = '';
  applyFiltersAndSort();
}

window.resetFilters = resetFilters; // Expose globally for clear button click

/* ============================================================
   3. EVENT DETAIL PAGE LOGIC
   ============================================================ */
function initDetailPage() {
  const detailContainer = document.getElementById("eventDetailContainer");
  if (!detailContainer) return;

  const urlParams = new URLSearchParams(window.location.search);
  const eventId = parseInt(urlParams.get('id')) || 1;
  const event = mockEvents.find(e => e.id === eventId);

  if (!event) {
    detailContainer.innerHTML = `
      <div class="text-center py-20">
        <h2 class="text-3xl font-bold mb-4">Event Not Found</h2>
        <p class="text-secondary mb-6">The event you are looking for does not exist or has been archived.</p>
        <a href="browse-events.html" class="btn btn-primary">Browse Active Events</a>
      </div>
    `;
    return;
  }

  // Hydrate single page values
  document.getElementById("eventTitle").textContent = event.title;
  document.getElementById("eventOrg").textContent = event.organizer;
  document.getElementById("eventDesc").textContent = event.description;
  document.getElementById("stickyPrice").textContent = event.priceAmount;
  document.getElementById("stickyDate").textContent = event.date;
  document.getElementById("stickyVenue").textContent = event.location;
  document.getElementById("stickyTeam").textContent = event.teamSize;
  document.getElementById("stickyDays").textContent = `${event.daysLeft} days left`;
  document.getElementById("stickyRegs").textContent = `${event.registrationsCount} Registered`;

  // Hydrate banner
  const banner = document.getElementById("eventBanner");
  if (banner) {
    banner.style.background = `linear-gradient(135deg, ${event.color}, var(--brand-indigo-950))`;
    const iconDiv = banner.querySelector(".event-banner-icon");
    if (iconDiv) iconDiv.textContent = event.icon;
  }

  // Hydrate timeline
  const timelineGrid = document.getElementById("timelineGrid");
  if (timelineGrid) {
    timelineGrid.innerHTML = event.timeline.map((step, idx) => `
      <div class="timeline-step flex items-start gap-4">
        <div class="timeline-node flex flex-col items-center">
          <div class="node-circle ${idx === 0 ? 'active' : ''}">${idx + 1}</div>
          ${idx < event.timeline.length - 1 ? '<div class="node-line"></div>' : ''}
        </div>
        <div class="timeline-content pb-6">
          <h4 class="font-bold text-sm text-main">${step.label}</h4>
          <span class="text-xs text-secondary font-mono">${step.date}</span>
        </div>
      </div>
    `).join('');
  }

  // Hydrate schedule
  const scheduleGrid = document.getElementById("scheduleGrid");
  if (scheduleGrid) {
    scheduleGrid.innerHTML = event.schedule.map(item => `
      <div class="schedule-item flex gap-4 p-4 border border-color rounded-md bg-elevated mb-3">
        <div class="schedule-time font-mono text-xs text-indigo font-bold shrink-0 w-28">${item.time}</div>
        <div class="schedule-title text-sm font-semibold">${item.title}</div>
      </div>
    `).join('');
  }

  // Hydrate speakers
  const speakersGrid = document.getElementById("speakersGrid");
  if (speakersGrid && event.speakers.length > 0) {
    speakersGrid.innerHTML = event.speakers.map(sp => `
      <div class="flex items-center gap-4 p-4 border border-color rounded-lg bg-surface">
        <div class="avatar avatar-md">${sp.name.charAt(0)}</div>
        <div>
          <h4 class="font-bold text-sm">${sp.name}</h4>
          <p class="text-xs text-secondary m-0">${sp.role}</p>
        </div>
      </div>
    `).join('');
  } else if (speakersGrid) {
    speakersGrid.innerHTML = `<p class="text-sm text-secondary">No guest speakers scheduled for this event.</p>`;
  }

  // Hydrate sponsors
  const sponsorsGrid = document.getElementById("sponsorsGrid");
  if (sponsorsGrid && event.sponsors.length > 0) {
    sponsorsGrid.innerHTML = event.sponsors.map(s => `
      <div class="sponsor-box border border-color rounded-lg px-6 py-4 flex items-center justify-center bg-elevated">
        <span class="text-xl mr-2">${s.logo}</span>
        <span class="font-bold text-sm text-secondary">${s.name}</span>
      </div>
    `).join('');
  } else if (sponsorsGrid) {
    sponsorsGrid.innerHTML = `<p class="text-sm text-secondary">Organized independently. No external sponsors listed.</p>`;
  }

  // Hydrate category badge
  const catBadge = document.getElementById("eventCatBadge");
  if (catBadge) {
    catBadge.textContent = event.categoryLabel;
    catBadge.className = `badge badge-cat-${event.category}`;
  }
}

/* ============================================================
   4. EVENT CARD GENERATOR
   ============================================================ */
function renderEventCard(event) {
  const pathPrefix = window.location.pathname.includes('/pages/') ? '' : 'pages/';
  return `
    <article class="card flex flex-col h-full" style="border-top: 3.5px solid ${event.color};">
      <div class="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div class="flex justify-between items-start mb-4">
            <span class="badge badge-cat-${event.category}">${event.categoryLabel}</span>
            <div class="flex gap-2">
              <span class="badge badge-outline text-xs"><i data-lucide="clock" style="width:11px; height:11px; margin-right:2px;"></i> ${event.daysLeft}d left</span>
              ${event.price === 'free' 
                ? '<span class="badge badge-success text-xs">Free</span>' 
                : `<span class="badge badge-indigo text-xs">${event.priceAmount}</span>`}
            </div>
          </div>
          
          <h3 class="text-lg font-bold mb-2 font-display text-truncate-2" title="${event.title}">${event.title}</h3>
          
          <div class="flex flex-col gap-1.5 text-xs text-secondary font-sans mb-4">
            <span class="flex items-center gap-2"><i data-lucide="building" style="width: 13px; height: 13px;"></i> ${event.organizer}</span>
            <span class="flex items-center gap-2"><i data-lucide="calendar" style="width: 13px; height: 13px;"></i> ${event.date}</span>
            <span class="flex items-center gap-2"><i data-lucide="map-pin" style="width: 13px; height: 13px;"></i> ${event.location}</span>
          </div>
        </div>

        <div>
          <div class="divider mt-2 mb-4"></div>
          <div class="flex justify-between items-center">
            <div class="flex flex-col">
              <span class="text-xs text-muted">Registered</span>
              <span class="text-sm font-bold font-mono text-indigo">${event.registrationsCount.toLocaleString()}</span>
            </div>
            <a href="${pathPrefix}event-detail.html?id=${event.id}" class="btn btn-primary btn-sm btn-pill">Explore details</a>
          </div>
        </div>
      </div>
    </article>
  `;
}
