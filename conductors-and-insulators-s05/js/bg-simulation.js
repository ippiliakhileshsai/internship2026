/* ═══════════════════════════════════════════════════════
   CONDUCTOVERSE — Global Background Electron Simulation
   Creates a fixed, non-intrusive background canvas showing
   flowing electrical pathways and mouse-reactive electrons.
   ═══════════════════════════════════════════════════════ */

(function () {
    // Prevent initializing multiple times
    if (window.bgElectronSimInitialized) return;
    window.bgElectronSimInitialized = true;

    // Create and style canvas
    const canvas = document.createElement("canvas");
    canvas.className = "bg-electron-canvas";
    Object.assign(canvas.style, {
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        zIndex: "-1",
        pointerEvents: "none",
        opacity: "0.45",
        background: "transparent"
    });
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates
    let mouse = { x: -1000, y: -1000, active: false };

    // Setup event listeners
    window.addEventListener("resize", () => {
        width = (canvas.width = window.innerWidth);
        height = (canvas.height = window.innerHeight);
        initCircuitGrid();
    });

    window.addEventListener("mousemove", (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        mouse.active = true;
    });

    window.addEventListener("mouseleave", () => {
        mouse.active = false;
    });

    // Particle classes
    class Electron {
        constructor(path) {
            this.path = path; // Reference to parent path
            this.progress = Math.random(); // 0 to 1 along path
            this.speed = 0.001 + Math.random() * 0.0015;
            this.size = 1.8 + Math.random() * 1.5;
            this.color = Math.random() > 0.4 ? "rgba(0, 243, 255, 0.85)" : "rgba(255, 183, 3, 0.85)"; // High visibility Neon Cyan or Neon Gold
            this.history = [];
            this.maxHistory = 6;
        }

        update() {
            this.progress += this.speed;
            if (this.progress >= 1) {
                this.progress = 0;
                this.history = [];
            }
        }

        draw() {
            const point = this.path.getPoint(this.progress);
            if (!point) return;

            // Mouse interaction (bending towards/away from mouse)
            let dx = point.x - mouse.x;
            let dy = point.y - mouse.y;
            let dist = Math.sqrt(dx * dx + dy * dy);
            let rx = point.x;
            let ry = point.y;

            if (mouse.active && dist < 180) {
                let force = (180 - dist) / 180;
                // Softly pull the drawn electron position towards the mouse
                rx += (mouse.x - point.x) * force * 0.15;
                ry += (mouse.y - point.y) * force * 0.15;
            }

            // Save history for trails
            this.history.push({ x: rx, y: ry });
            if (this.history.length > this.maxHistory) {
                this.history.shift();
            }

            // Draw fading trail
            const baseColor = this.color.substring(0, this.color.lastIndexOf(",") + 1);
            for (let i = 0; i < this.history.length; i++) {
                const p = this.history[i];
                const opacity = (i + 1) / this.history.length;
                const size = this.size * (0.3 + 0.7 * opacity);
                
                ctx.beginPath();
                ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
                ctx.fillStyle = `${baseColor} ${opacity * 0.6})`;
                ctx.fill();
            }

            // Draw main glowing head
            ctx.beginPath();
            ctx.arc(rx, ry, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 8;
            ctx.shadowColor = this.color;
            ctx.fill();
            ctx.shadowBlur = 0; // Reset
        }
    }

    class CircuitPath {
        constructor(x1, y1, x2, y2) {
            this.x1 = x1;
            this.y1 = y1;
            this.x2 = x2;
            this.y2 = y2;
            this.electrons = [];
            
            // Spawn 1 to 2 electrons per path
            const count = Math.floor(Math.random() * 2) + 1;
            for (let i = 0; i < count; i++) {
                this.electrons.push(new Electron(this));
            }
        }

        getPoint(t) {
            return {
                x: this.x1 + (this.x2 - this.x1) * t,
                y: this.y1 + (this.y2 - this.y1) * t
            };
        }

        draw() {
            // Draw faint background wiring line
            ctx.beginPath();
            ctx.moveTo(this.x1, this.y1);
            ctx.lineTo(this.x2, this.y2);
            ctx.strokeStyle = "rgba(23, 105, 255, 0.045)";
            ctx.lineWidth = 1;
            ctx.stroke();

            // Draw electrons
            for (let electron of this.electrons) {
                electron.update();
                electron.draw();
            }
        }
    }

    // Grid of circuit paths
    let paths = [];

    function initCircuitGrid() {
        paths = [];
        const cols = Math.ceil(width / 180);
        const rows = Math.ceil(height / 180);
        
        // Generate coordinates for grid nodes with slight noise
        const grid = [];
        for (let r = 0; r <= rows; r++) {
            grid[r] = [];
            for (let c = 0; c <= cols; c++) {
                grid[r][c] = {
                    x: c * 180 + (Math.random() - 0.5) * 60,
                    y: r * 180 + (Math.random() - 0.5) * 60
                };
            }
        }

        // Connect nodes to form pathway segments
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const node = grid[r][c];
                
                // Connect to right neighbor
                if (c + 1 <= cols && Math.random() > 0.3) {
                    paths.push(new CircuitPath(node.x, node.y, grid[r][c+1].x, grid[r][c+1].y));
                }
                // Connect to bottom neighbor
                if (r + 1 <= rows && Math.random() > 0.3) {
                    paths.push(new CircuitPath(node.x, node.y, grid[r+1][c].x, grid[r+1][c].y));
                }
                // Connect diagonal
                if (r + 1 <= rows && c + 1 <= cols && Math.random() > 0.8) {
                    paths.push(new CircuitPath(node.x, node.y, grid[r+1][c+1].x, grid[r+1][c+1].y));
                }
            }
        }
    }

    // Loop
    function animate() {
        ctx.clearRect(0, 0, width, height);

        for (let path of paths) {
            path.draw();
        }

        requestAnimationFrame(animate);
    }

    // Start
    initCircuitGrid();
    animate();

    // --- NEW: Global Click Spark Effect ---
    window.addEventListener("mousedown", (e) => {
        const spark = document.createElement("div");
        spark.className = "click-spark";
        spark.style.left = (e.clientX - 5) + "px";
        spark.style.top = (e.clientY - 5) + "px";
        document.body.appendChild(spark);
        
        setTimeout(() => {
            spark.remove();
        }, 600);
    });

    // --- NEW: Scroll Animations ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                // Optional: Stop observing once animated in
                // observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    // Auto-apply scroll classes to key elements on page load
    document.querySelectorAll('.card, .concept-card, .visual-use-card, .material-card, .section-head, .storyboard-panel, .sim-control-panel').forEach(el => {
        el.classList.add('scroll-animate');
        observer.observe(el);
    });

    // --- NEW: iOS Navbar Scroll Movement ---
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // --- NEW: Sliding Glass Pill Navbar Transition ---
    function initSlidingNavPill() {
        const navLinks = document.querySelector('.nav-links');
        if (!navLinks) return;

        const activeLink = navLinks.querySelector('a.active');
        const allLinks = Array.from(navLinks.querySelectorAll('a'));
        
        // Create pill
        const pill = document.createElement('div');
        pill.className = 'nav-sliding-pill';
        navLinks.appendChild(pill);

        let currentTarget = activeLink;

        function positionPill(targetElement, prevElement = null) {
            if (!targetElement) {
                pill.style.opacity = '0';
                return;
            }
            pill.style.opacity = '1';

            const navRect = navLinks.getBoundingClientRect();
            const targetRect = targetElement.getBoundingClientRect();

            // Client offset adjustments to handle border/scroll context
            const left = targetRect.left - navRect.left - navLinks.clientLeft;
            const right = navRect.width - (left + targetRect.width) - navLinks.clientLeft * 2;
            const top = targetRect.top - navRect.top - navLinks.clientTop;
            const height = targetRect.height;

            if (prevElement) {
                const prevRect = prevElement.getBoundingClientRect();
                const prevLeft = prevRect.left - navRect.left;

                // Stagger transition depending on movement direction to create a "bulge/stretch" effect
                if (left > prevLeft) {
                    // Moving Right: right edge leads, left edge lags
                    pill.style.transition = 'right 0.32s cubic-bezier(0.25, 1, 0.2, 1), left 0.36s cubic-bezier(0.25, 1, 0.2, 1) 0.05s, top 0.32s, height 0.32s';
                } else if (left < prevLeft) {
                    // Moving Left: left edge leads, right edge lags
                    pill.style.transition = 'left 0.32s cubic-bezier(0.25, 1, 0.2, 1), right 0.36s cubic-bezier(0.25, 1, 0.2, 1) 0.05s, top 0.32s, height 0.32s';
                } else {
                    // No horizontal change, use standard transition
                    pill.style.transition = 'left 0.32s cubic-bezier(0.25, 1, 0.2, 1), right 0.32s cubic-bezier(0.25, 1, 0.2, 1), top 0.32s, height 0.32s';
                }
            } else {
                pill.style.transition = 'none';
            }

            pill.style.left = `${left}px`;
            pill.style.right = `${right}px`;
            pill.style.top = `${top}px`;
            pill.style.height = `${height}px`;

            if (!prevElement) {
                pill.offsetHeight; // Force reflow
                pill.style.transition = ''; // Restore default
            }
        }

        // Check sessionStorage for previous index to handle smooth cross-page transition
        let prevIndexStr = null;
        try {
            prevIndexStr = sessionStorage.getItem('nav-prev-index');
            if (prevIndexStr !== null) {
                sessionStorage.removeItem('nav-prev-index');
            }
        } catch (e) {
            console.warn("sessionStorage is not accessible:", e);
        }

        let initialPrevLink = null;
        if (prevIndexStr !== null) {
            const prevIndex = parseInt(prevIndexStr, 10);
            if (!isNaN(prevIndex) && prevIndex >= 0 && prevIndex < allLinks.length) {
                initialPrevLink = allLinks[prevIndex];
            }
        }

        // Initialize position
        if (activeLink) {
            if (initialPrevLink && initialPrevLink !== activeLink) {
                // Initialize at previous page's position with no transition
                positionPill(initialPrevLink);
                // Then immediately animate to active link on next frame
                requestAnimationFrame(() => {
                    positionPill(activeLink, initialPrevLink);
                });
            } else {
                // Regular load: position instantly
                positionPill(activeLink);
            }
        } else {
            pill.style.opacity = '0';
        }

        // Add mouse enter listener to each link
        allLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                const prevTarget = currentTarget;
                currentTarget = link;
                positionPill(link, prevTarget);
            });

            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (!href || href.startsWith('#') || link.getAttribute('target') === '_blank') return;
                
                // Allow standard browser behaviors like Cmd/Ctrl clicks to open new tabs
                if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

                const clickedIndex = allLinks.indexOf(link);
                const activeIndex = activeLink ? allLinks.indexOf(activeLink) : -1;

                if (activeIndex !== -1) {
                    try {
                        sessionStorage.setItem('nav-prev-index', activeIndex.toString());
                    } catch (e) {
                        console.warn("sessionStorage write failed:", e);
                    }
                }

                // Smoothly slide pill to clicked item
                const prevTarget = currentTarget;
                currentTarget = link;
                positionPill(link, prevTarget);

                // Delay page load to let the slide animation play
                e.preventDefault();
                setTimeout(() => {
                    window.location.href = href;
                }, 220);
            });
        });

        // Add mouse leave listener to the navbar menu
        navLinks.addEventListener('mouseleave', () => {
            const prevTarget = currentTarget;
            currentTarget = activeLink;
            positionPill(activeLink, prevTarget);
        });

        // Add resize listener to update position instantly without delay
        window.addEventListener('resize', () => {
            positionPill(currentTarget);
        });
    }

    // Initialize navbar transition
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initSlidingNavPill);
    } else {
        initSlidingNavPill();
    }

})();
