document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Telemetry Number Counting Engine ---
    let certifiedCount = localStorage.getItem('citizensCertifiedCount');
    if (!certifiedCount) {
        certifiedCount = 25;
        localStorage.setItem('citizensCertifiedCount', 25);
    } else {
        certifiedCount = parseInt(certifiedCount, 10);
    }
    const certifiedCounterEl = document.getElementById('citizens-certified-counter');
    if (certifiedCounterEl) {
        certifiedCounterEl.setAttribute('data-target', certifiedCount);
    }

    let communityRating = localStorage.getItem('communityRating');
    if (!communityRating) {
        communityRating = 94.8;
        localStorage.setItem('communityRating', 94.8);
    } else {
        communityRating = parseFloat(communityRating);
    }
    const ratingCounterEl = document.getElementById('community-rating-counter');
    if (ratingCounterEl) {
        ratingCounterEl.setAttribute('data-target', communityRating.toFixed(1));
    }

    const counters = document.querySelectorAll('.metric-number');
    
    const initializeCounters = () => {
        counters.forEach(counter => {
            const target = parseFloat(counter.getAttribute('data-target'));
            const isPercent = target % 1 !== 0 || counter.id === 'community-rating-counter';
            const executionSteps = 100; 
            const valueIncrement = target / executionSteps;

            let loopVal = 0;
            const processTick = () => {
                loopVal += valueIncrement;
                if (loopVal < target) {
                    counter.textContent = isPercent ? loopVal.toFixed(1) + '%' : Math.ceil(loopVal).toLocaleString() + '+';
                    setTimeout(processTick, 10);
                } else {
                    counter.textContent = isPercent ? target.toFixed(1) + '%' : target.toLocaleString() + '+';
                }
            };
            processTick();
        });
    };
    setTimeout(initializeCounters, 350);


    // --- 2. Interactive Feature Pathway Cards (Click Action) ---
    const featureCards = document.querySelectorAll('.click-trigger');
    
    featureCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Prevent link hijacking if clicking custom anchor layout items
            if(e.target.tagName !== 'A' && e.target.parentElement.tagName !== 'A') {
                e.preventDefault();
            }
            
            // Remove active highlight class from other card elements
            featureCards.forEach(c => c.classList.remove('activated-card'));
            
            // Apply click feedback structural animation state
            card.classList.add('activated-card');
        });
    });


    // --- 3. Interactive Pillar Selection Highlights ---
    const pillarCards = document.querySelectorAll('.click-highlight');
    
    pillarCards.forEach(pillar => {
        pillar.addEventListener('click', () => {
            // Check if item is already highlighted to toggle it cleanly
            if (pillar.classList.contains('focused-pillar')) {
                pillar.classList.remove('focused-pillar');
            } else {
                // Dim down all other pillar cards to isolate focus on this choice
                pillarCards.forEach(p => p.classList.remove('focused-pillar'));
                pillar.classList.add('focused-pillar');
            }
        });
    });


    const showModal = ({ title, content, isConfirm = false, onConfirm = null }) => {
        const existing = document.getElementById('custom-modal');
        if (existing) existing.remove();

        const modal = document.createElement('div');
        modal.id = 'custom-modal';
        modal.className = 'custom-modal-overlay';
        modal.innerHTML = `
            <div class="custom-modal-container">
                <div class="custom-modal-header">
                    <div class="custom-modal-title"><i class="fa-solid fa-scale-balanced"></i> ${title}</div>
                    <button class="custom-modal-close" id="modal-close-btn">&times;</button>
                </div>
                <div class="custom-modal-body">
                    ${content}
                </div>
                <div class="custom-modal-footer">
                    ${isConfirm ? `<button class="custom-modal-btn btn-cancel" id="modal-cancel-btn">Cancel</button>` : ''}
                    <button class="custom-modal-btn btn-confirm" id="modal-confirm-btn">${isConfirm ? 'Confirm' : 'Close'}</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        setTimeout(() => modal.classList.add('active'), 10);

        const closeModal = () => {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        };

        modal.querySelector('#modal-close-btn').addEventListener('click', closeModal);
        if (isConfirm) {
            modal.querySelector('#modal-cancel-btn').addEventListener('click', closeModal);
        }
        modal.querySelector('#modal-confirm-btn').addEventListener('click', () => {
            closeModal();
            if (onConfirm) onConfirm();
        });
    };

    // --- 4. System Guide Navigation Button Highlight ---
    const guideBtn = document.getElementById('systemGuideBtn');
    if (guideBtn) {
        guideBtn.addEventListener('click', () => {
            guideBtn.style.transform = 'scale(0.95)';
            guideBtn.style.borderColor = '#fbbf24';
            
            setTimeout(() => {
                guideBtn.style.transform = 'none';
                showModal({
                    title: 'Simulation Hub Guide',
                    content: `
                        <div class="modal-guide-container">
                            <div class="modal-guide-card" style="display: flex; gap: 14px; align-items: flex-start; margin-bottom: 16px;">
                                <div style="background: rgba(245, 158, 11, 0.1); padding: 10px; border-radius: 6px; color: var(--neon-amber); display: flex; align-items: center; justify-content: center;"><i class="fa-solid fa-chart-line" style="font-size: 1.1rem; width: 18px; text-align: center;"></i></div>
                                <div>
                                    <h4 style="color: var(--text-silver); font-size: 0.95rem; font-weight: 700; margin: 0 0 4px 0;">1. Simulation Hub Telemetry</h4>
                                    <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.5; margin: 0;">Monitor live civic parameters including Citizens Trained (default 25+), News Checked (default 50+), and the dynamic Community Rating percentage (default 94.8%). These indicators respond in real-time as you complete challenges.</p>
                                </div>
                            </div>
                            <div class="modal-guide-card" style="display: flex; gap: 14px; align-items: flex-start; margin-bottom: 16px;">
                                <div style="background: rgba(249, 115, 22, 0.1); padding: 10px; border-radius: 6px; color: var(--neon-orange); display: flex; align-items: center; justify-content: center;"><i class="fa-solid fa-graduation-cap" style="font-size: 1.1rem; width: 18px; text-align: center;"></i></div>
                                <div>
                                    <h4 style="color: var(--text-silver); font-size: 0.95rem; font-weight: 700; margin: 0 0 4px 0;">2. Explore Pillars & Toolkit</h4>
                                    <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.5; margin: 0;">Navigate to "Learn the Roles" to explore the 8 fundamental media functions (such as Watchdog, Informer, and Public Forum) and verify checklists to unlock challenges.</p>
                                </div>
                            </div>
                            <div class="modal-guide-card" style="display: flex; gap: 14px; align-items: flex-start; margin-bottom: 0;">
                                <div style="background: rgba(251, 191, 36, 0.1); padding: 10px; border-radius: 6px; color: var(--neon-gold); display: flex; align-items: center; justify-content: center;"><i class="fa-solid fa-gamepad" style="font-size: 1.1rem; width: 18px; text-align: center;"></i></div>
                                <div>
                                    <h4 style="color: var(--text-silver); font-size: 0.95rem; font-weight: 700; margin: 0 0 4px 0;">3. Deploy Quiz Simulator</h4>
                                    <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.5; margin: 0;">Test your media literacy skills against 7 random scenarios chosen from a 50-situation pool to earn the Democracy Defender badge. Completing the quiz dynamically updates the telemetry counters on the main Hub page.</p>
                                </div>
                            </div>
                        </div>
                    `
                });
            }, 150);
        });
    }
});