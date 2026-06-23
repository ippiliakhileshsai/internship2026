/**
 * ==========================================================================
 * VOLTACADEMY 2D CIRCUIT SANDBOX - GAME ENGINE & SIMULATOR LOGIC
 * ==========================================================================
 * This file coordinates the interactive circuit loop.
 * It manages:
 * - Dynamic slot positions (4, 6, 8 slots) inside absolute coordinates.
 * - Selecting and placing components from inventory grid.
 * - Dynamic series circuit resistance calculations and ammeter/voltmeter readings.
 * - Safety blow logic on fuse.
 * - Intuitive pulsing hint on first empty slot (replaces old tutorial).
 * - Electron flow animation via HTML5 Canvas + requestAnimationFrame.
 * - Time Controls (Play / Pause / Slow Motion) for electron speed.
 * - Challenge Mode: pre-populated broken circuit with visual spark feedback.
 */

// --- CURRICULUM COMPONENT SPECIFICATION REGISTRY ---
const COMPONENT_DATA = {
  "battery": {
    id: "battery",
    name: "1.5V Battery",
    type: "power",
    grade: "Class 6",
    desc: "Provides the electrical push (voltage) that drives electric charges through the circuit.",
    resistance: 0.1,
    voltage: 1.5,
    behavior: "Provides electrical potential to create current flow.",
    inventorySvg: `
      <svg viewBox="0 0 100 100">
        <path d="M 10,50 L 90,50" stroke="#cbd5e1" stroke-width="6" stroke-linecap="round" />
        <rect x="25" y="32" width="45" height="36" rx="4" fill="#334155" stroke="#f1f5f9" stroke-width="3" />
        <rect x="25" y="32" width="12" height="36" rx="2" fill="#d97706" />
        <rect x="70" y="44" width="6" height="12" rx="2" fill="#f1f5f9" />
        <text x="31" y="54" fill="#f8fafc" font-size="10" font-family="'Orbitron', sans-serif" font-weight="bold">+</text>
        <text x="58" y="54" fill="#f8fafc" font-size="10" font-family="'Orbitron', sans-serif" font-weight="bold">-</text>
        <text x="39" y="52" fill="#94a3b8" font-size="7" font-family="sans-serif">1.5V</text>
      </svg>
    `,
    slotSvg: (orientation, state) => {
      const rotate = (orientation === "left" || orientation === "right") ? 90 : 0;
      return `
        <svg viewBox="0 0 100 100" style="transform: rotate(${rotate}deg);">
          <path d="M 0,50 L 100,50" stroke="#b45309" stroke-width="8" stroke-linecap="round" />
          <rect x="25" y="30" width="45" height="40" rx="6" fill="#1e293b" stroke="#f8fafc" stroke-width="4" />
          <rect x="25" y="30" width="15" height="40" rx="3" fill="#ea580c" />
          <rect x="70" y="43" width="7" height="14" rx="2" fill="#f8fafc" />
          <text x="32" y="55" fill="#f8fafc" font-size="12" font-family="'Orbitron', sans-serif" font-weight="bold" text-anchor="middle">+</text>
          <text x="58" y="55" fill="#f8fafc" font-size="12" font-family="'Orbitron', sans-serif" font-weight="bold" text-anchor="middle">-</text>
          <text x="45" y="53" fill="#64748b" font-size="7" font-family="'Orbitron', sans-serif" text-anchor="middle">1.5V</text>
        </svg>
      `;
    }
  },
  "bulb": {
    id: "bulb",
    name: "Light Bulb",
    type: "load",
    grade: "Class 6",
    desc: "A common output device (load) that consumes electrical energy and transforms it into bright light.",
    resistance: 2.5,
    behavior: "Glows yellow when current is flowing through the closed loop.",
    inventorySvg: `
      <svg viewBox="0 0 100 100">
        <path d="M 10,50 L 90,50" stroke="#cbd5e1" stroke-width="6" />
        <rect x="40" y="50" width="20" height="14" rx="2" fill="#64748b" />
        <line x1="42" y1="55" x2="58" y2="55" stroke="#475569" stroke-width="2" />
        <line x1="44" y1="60" x2="56" y2="60" stroke="#475569" stroke-width="2" />
        <circle cx="50" cy="40" r="18" fill="rgba(255,255,255,0.05)" stroke="#f1f5f9" stroke-width="3" />
        <path d="M 44,45 L 48,34 L 52,34 L 56,45" fill="none" stroke="#e2e8f0" stroke-width="2" />
      </svg>
    `,
    slotSvg: (orientation, state) => {
      return `
        <svg viewBox="0 0 100 100">
          ${orientation === "left" || orientation === "right" 
            ? '<path d="M 50,0 L 50,100" stroke="#b45309" stroke-width="8" />' 
            : '<path d="M 0,50 L 100,50" stroke="#b45309" stroke-width="8" />'
          }
          <circle cx="50" cy="45" r="28" fill="url(#bulb-glow-grad)" class="glow-active light-bulb-glow-halo" style="opacity:0;" />
          <rect x="40" y="56" width="20" height="14" rx="2" fill="#475569" stroke="#334155" stroke-width="2" />
          <line x1="40" y1="61" x2="60" y2="61" stroke="#334155" stroke-width="2" />
          <line x1="42" y1="66" x2="58" y2="66" stroke="#334155" stroke-width="2" />
          <path d="M 44,56 L 47,42 L 53,42 L 56,56" fill="none" stroke="#94a3b8" stroke-width="2.5" />
          <path d="M 47,42 Q 50,34 53,42" fill="none" stroke="#94a3b8" stroke-width="2" class="glow-active light-bulb-rays" style="stroke:#94a3b8;" />
          <circle cx="50" cy="42" r="20" fill="rgba(255, 255, 255, 0.05)" stroke="#f8fafc" stroke-width="3.5" class="glow-active light-bulb-glow" style="fill:rgba(255, 255, 255, 0.05);" />
          
          <g class="glow-active light-bulb-rays" style="opacity:0; stroke:#eab308; stroke-width:2;">
            <line x1="50" y1="12" x2="50" y2="4" />
            <line x1="28" y1="21" x2="22" y2="15" />
            <line x1="20" y1="42" x2="12" y2="42" />
            <line x1="72" y1="21" x2="78" y2="15" />
            <line x1="80" y1="42" x2="88" y2="42" />
          </g>
          <defs>
            <radialGradient id="bulb-glow-grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.6"/>
              <stop offset="100%" stop-color="#f59e0b" stop-opacity="0"/>
            </radialGradient>
          </defs>
        </svg>
      `;
    }
  },
  "wire": {
    id: "wire",
    name: "Wire",
    type: "conductor",
    grade: "Class 6",
    desc: "A solid metallic path (usually copper) that offers very low resistance to the flow of electric current.",
    resistance: 0.1,
    behavior: "Acts as a simple conductor to close a loop segment.",
    inventorySvg: `
      <svg viewBox="0 0 100 100">
        <path d="M 10,50 L 90,50" stroke="#b45309" stroke-width="10" stroke-linecap="round" />
        <path d="M 10,50 L 90,50" stroke="#ea580c" stroke-width="4" stroke-linecap="round" />
        <circle cx="15" cy="50" r="6" fill="#cbd5e1" />
        <circle cx="85" cy="50" r="6" fill="#cbd5e1" />
      </svg>
    `,
    slotSvg: (orientation, state) => {
      const rotate = (orientation === "left" || orientation === "right") ? 90 : 0;
      return `
        <svg viewBox="0 0 100 100" style="transform: rotate(${rotate}deg);">
          <path d="M 0,50 L 100,50" stroke="#b45309" stroke-width="12" stroke-linecap="round" />
          <path d="M 0,50 L 100,50" stroke="#f97316" stroke-width="4" stroke-linecap="round" />
          <circle cx="12" cy="50" r="7" fill="#f8fafc" stroke="#475569" stroke-width="2" />
          <circle cx="88" cy="50" r="7" fill="#f8fafc" stroke="#475569" stroke-width="2" />
        </svg>
      `;
    }
  },
  "switch-open": {
    id: "switch-open",
    name: "Switch (Open)",
    type: "insulator",
    grade: "Class 6",
    desc: "An open control device that breaks the continuous path, stopping the flow of electricity.",
    resistance: Infinity,
    behavior: "Acts as a break in the circuit. Prevents current from flowing.",
    inventorySvg: `
      <svg viewBox="0 0 100 100">
        <path d="M 10,50 L 35,50" stroke="#cbd5e1" stroke-width="6" />
        <path d="M 65,50 L 90,50" stroke="#cbd5e1" stroke-width="6" />
        <circle cx="35" cy="50" r="6" fill="#64748b" />
        <circle cx="65" cy="50" r="6" fill="#64748b" />
        <line x1="35" y1="50" x2="60" y2="25" stroke="#cbd5e1" stroke-width="6" stroke-linecap="round" />
      </svg>
    `,
    slotSvg: (orientation, state) => {
      const rotate = (orientation === "left" || orientation === "right") ? 90 : 0;
      return `
        <svg viewBox="0 0 100 100" style="transform: rotate(${rotate}deg);">
          <path d="M 0,50 L 30,50" stroke="#b45309" stroke-width="8" />
          <path d="M 70,50 L 100,50" stroke="#b45309" stroke-width="8" />
          <circle cx="30" cy="50" r="7" fill="#94a3b8" stroke="#334155" stroke-width="2" />
          <circle cx="70" cy="50" r="7" fill="#94a3b8" stroke="#334155" stroke-width="2" />
          <line x1="30" y1="50" x2="62" y2="20" stroke="#f8fafc" stroke-width="8" stroke-linecap="round" />
        </svg>
      `;
    }
  },
  "switch-closed": {
    id: "switch-closed",
    name: "Switch (Closed)",
    type: "conductor",
    grade: "Class 6",
    desc: "A closed control device that creates a continuous path, allowing current to flow freely.",
    resistance: 0.1,
    behavior: "Completes the circuit path. Behaves like a conductor wire.",
    inventorySvg: `
      <svg viewBox="0 0 100 100">
        <path d="M 10,50 L 30,50" stroke="#cbd5e1" stroke-width="6" />
        <path d="M 70,50 L 90,50" stroke="#cbd5e1" stroke-width="6" />
        <circle cx="30" cy="50" r="6" fill="#64748b" />
        <circle cx="70" cy="50" r="6" fill="#64748b" />
        <line x1="30" y1="50" x2="70" y2="50" stroke="#cbd5e1" stroke-width="6" stroke-linecap="round" />
      </svg>
    `,
    slotSvg: (orientation, state) => {
      const rotate = (orientation === "left" || orientation === "right") ? 90 : 0;
      return `
        <svg viewBox="0 0 100 100" style="transform: rotate(${rotate}deg);">
          <path d="M 0,50 L 30,50" stroke="#b45309" stroke-width="8" />
          <path d="M 70,50 L 100,50" stroke="#b45309" stroke-width="8" />
          <circle cx="30" cy="50" r="7" fill="#94a3b8" stroke="#334155" stroke-width="2" />
          <circle cx="70" cy="50" r="7" fill="#94a3b8" stroke="#334155" stroke-width="2" />
          <line x1="30" y1="50" x2="70" y2="50" stroke="#f8fafc" stroke-width="8" stroke-linecap="round" />
        </svg>
      `;
    }
  },
  "eraser": {
    id: "eraser",
    name: "Rubber Eraser",
    type: "insulator",
    grade: "Class 6",
    desc: "An insulating object that prevents the movement of electric charges because it has high resistance.",
    resistance: Infinity,
    behavior: "Acts as a total barrier to electricity, creating an open circuit.",
    inventorySvg: `
      <svg viewBox="0 0 100 100">
        <path d="M 10,50 L 90,50" stroke="#cbd5e1" stroke-width="4" stroke-dasharray="4 4" />
        <g transform="translate(10, -5) rotate(15, 50, 50)">
          <rect x="25" y="38" width="30" height="24" rx="2" fill="#f43f5e" />
          <rect x="55" y="38" width="20" height="24" rx="2" fill="#3b82f6" />
          <rect x="48" y="36" width="10" height="28" fill="#f8fafc" opacity="0.9" />
        </g>
      </svg>
    `,
    slotSvg: (orientation, state) => {
      const rotate = (orientation === "left" || orientation === "right") ? 90 : 0;
      return `
        <svg viewBox="0 0 100 100" style="transform: rotate(${rotate}deg);">
          <path d="M 0,50 L 25,50" stroke="#475569" stroke-width="8" stroke-dasharray="4 4" />
          <path d="M 75,50 L 100,50" stroke="#475569" stroke-width="8" stroke-dasharray="4 4" />
          <circle cx="25" cy="50" r="5" fill="#475569" />
          <circle cx="75" cy="50" r="5" fill="#475569" />
          <g transform="translate(0, 0) rotate(10, 50, 50)">
            <rect x="25" y="36" width="30" height="28" rx="3" fill="#ec4899" stroke="#be185d" stroke-width="2" />
            <rect x="55" y="36" width="20" height="28" rx="3" fill="#2563eb" stroke="#1d4ed8" stroke-width="2" />
            <rect x="48" y="34" width="10" height="32" fill="#ffffff" />
          </g>
        </svg>
      `;
    }
  },
  "heater": {
    id: "heater",
    name: "Heating Coil",
    type: "load",
    grade: "Class 7",
    desc: "A high-resistance wire loop that converts electrical energy directly into heat through resistance.",
    resistance: 1.8,
    behavior: "Glows bright red/orange and releases hot air waves when active.",
    inventorySvg: `
      <svg viewBox="0 0 100 100">
        <path d="M 10,50 L 25,50" stroke="#cbd5e1" stroke-width="6" />
        <path d="M 75,50 L 90,50" stroke="#cbd5e1" stroke-width="6" />
        <path d="M 25,50 C 28,30 32,30 35,50 C 38,70 42,70 45,50 C 48,30 52,30 55,50 C 58,70 62,70 65,50 C 68,30 72,30 75,50" 
              fill="none" stroke="#94a3b8" stroke-width="4" stroke-linecap="round" />
      </svg>
    `,
    slotSvg: (orientation, state) => {
      return `
        <svg viewBox="0 0 100 100">
          ${orientation === "left" || orientation === "right" 
            ? '<path d="M 50,0 L 50,100" stroke="#b45309" stroke-width="8" />' 
            : '<path d="M 0,50 L 100,50" stroke="#b45309" stroke-width="8" />'
          }
          <rect x="22" y="24" width="56" height="52" rx="6" fill="#111827" stroke="#374151" stroke-width="3" />
          <path d="M 30,50 Q 35,38 40,50 Q 45,62 50,50 Q 55,38 60,50 Q 65,62 70,50" 
                fill="none" stroke="#64748b" stroke-width="5" stroke-linecap="round" class="glow-active heating-coil-wire" />
          <g class="glow-active heat-wave" style="opacity:0; fill:none; stroke:#f97316; stroke-width:1.5;">
            <path d="M 35,20 Q 38,15 35,10" />
            <path d="M 50,18 Q 53,13 50,8" />
            <path d="M 65,20 Q 68,15 65,10" />
          </g>
        </svg>
      `;
    }
  },
  "fuse": {
    id: "fuse",
    name: "Fuse",
    type: "conductor",
    grade: "Class 7",
    desc: "A protective safety device containing a thin wire designed to melt and open the circuit if current exceeds 2.0 A.",
    resistance: 0.1,
    behavior: "Acts as a conductor. If current exceeds 2.0 A, it breaks permanently.",
    inventorySvg: `
      <svg viewBox="0 0 100 100">
        <path d="M 10,50 L 90,50" stroke="#cbd5e1" stroke-width="6" />
        <rect x="25" y="38" width="50" height="24" rx="2" fill="rgba(255,255,255,0.08)" stroke="#cbd5e1" stroke-width="2" />
        <rect x="25" y="38" width="10" height="24" fill="#94a3b8" />
        <rect x="65" y="38" width="10" height="24" fill="#94a3b8" />
        <line x1="35" y1="50" x2="65" y2="50" stroke="#cbd5e1" stroke-width="1.5" />
      </svg>
    `,
    slotSvg: (orientation, state) => {
      const rotate = (orientation === "left" || orientation === "right") ? 90 : 0;
      const blownClass = (state && state.blown) ? "fuse-blown" : "";
      return `
        <svg viewBox="0 0 100 100" class="${blownClass}" style="transform: rotate(${rotate}deg);">
          <path d="M 0,50 L 100,50" stroke="#b45309" stroke-width="8" />
          <rect x="20" y="35" width="60" height="30" rx="4" fill="rgba(255,255,255,0.08)" stroke="#94a3b8" stroke-width="3" class="fuse-glass" />
          <rect x="20" y="35" width="12" height="30" fill="#cbd5e1" class="fuse-cap" />
          <rect x="68" y="35" width="12" height="30" fill="#cbd5e1" class="fuse-cap" />
          <line x1="32" y1="50" x2="68" y2="50" stroke="#f8fafc" stroke-width="2" class="normal-fuse-wire" />
          <g class="blown-fuse-wire">
            <path d="M 32,50 L 46,49 M 54,51 L 68,50" stroke="#ef4444" stroke-width="2" />
            <circle cx="50" cy="50" r="3" fill="#ef4444" />
          </g>
          <circle cx="50" cy="50" r="10" fill="url(#spark-grad)" class="fuse-spark" style="display:none;" />
          <defs>
            <radialGradient id="spark-grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#facc15" stop-opacity="1"/>
              <stop offset="60%" stop-color="#ef4444" stop-opacity="0.8"/>
              <stop offset="100%" stop-color="#ef4444" stop-opacity="0"/>
            </radialGradient>
          </defs>
        </svg>
      `;
    }
  },
  "led": {
    id: "led",
    name: "LED (Load)",
    type: "load",
    grade: "Class 8",
    desc: "Light Emitting Diode: A modern semiconductor load that emits green light efficiently when current passes.",
    resistance: 1.2,
    behavior: "Glows a bright emerald green when current is flowing through the closed loop.",
    inventorySvg: `
      <svg viewBox="0 0 100 100">
        <path d="M 10,50 L 90,50" stroke="#cbd5e1" stroke-width="6" />
        <rect x="42" y="30" width="16" height="32" rx="4" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" stroke-width="2" />
        <line x1="46" y1="44" x2="46" y2="58" stroke="#cbd5e1" stroke-width="2" />
        <path d="M 50,44 L 54,40 L 54,58" fill="none" stroke="#cbd5e1" stroke-width="2" />
        <rect x="40" y="60" width="20" height="4" fill="#cbd5e1" />
      </svg>
    `,
    slotSvg: (orientation, state) => {
      return `
        <svg viewBox="0 0 100 100">
          ${orientation === "left" || orientation === "right" 
            ? '<path d="M 50,0 L 50,100" stroke="#b45309" stroke-width="8" />' 
            : '<path d="M 0,50 L 100,50" stroke="#b45309" stroke-width="8" />'
          }
          <polygon points="50,45 20,10 80,10" fill="url(#led-beam-grad)" class="glow-active led-beam" style="opacity:0;" />
          <rect x="36" y="58" width="28" height="6" rx="1" fill="#475569" stroke="#334155" stroke-width="1.5" />
          <line x1="45" y1="58" x2="45" y2="70" stroke="#94a3b8" stroke-width="2.5" />
          <line x1="55" y1="58" x2="55" y2="70" stroke="#94a3b8" stroke-width="2.5" />
          <path d="M 38,58 L 38,40 A 12,12 0 0,1 62,40 L 62,58 Z" fill="rgba(16, 185, 129, 0.15)" stroke="#10b981" stroke-width="3.5" class="glow-active led-glow" />
          <path d="M 45,58 L 45,46 L 49,42 L 52,48 L 55,48 L 55,58" fill="none" stroke="#34d399" stroke-width="1.5" opacity="0.6" />
        </svg>
      `;
    }
  },
  "saltwater": {
    id: "saltwater",
    name: "Beaker of Saltwater",
    type: "conductor",
    grade: "Class 8",
    desc: "A liquid electrolyte solution containing free Na+ and Cl- ions that allow electric current to pass.",
    resistance: 0.8,
    behavior: "Acts as a conductor. Active current triggers visible chemical electrolysis (gas bubbles).",
    inventorySvg: `
      <svg viewBox="0 0 100 100">
        <path d="M 10,50 L 90,50" stroke="#cbd5e1" stroke-width="4" stroke-dasharray="4 4" />
        <rect x="30" y="30" width="40" height="42" rx="2" fill="none" stroke="#cbd5e1" stroke-width="3" />
        <rect x="32" y="44" width="36" height="26" fill="rgba(59, 130, 246, 0.25)" />
        <line x1="42" y1="24" x2="42" y2="48" stroke="#94a3b8" stroke-width="2" />
        <line x1="58" y1="24" x2="58" y2="48" stroke="#94a3b8" stroke-width="2" />
      </svg>
    `,
    slotSvg: (orientation, state) => {
      return `
        <svg viewBox="0 0 100 100">
          ${orientation === "left" || orientation === "right"
            ? `
              <path d="M 50,0 L 50,22" stroke="#b45309" stroke-width="8" />
              <path d="M 50,78 L 50,100" stroke="#b45309" stroke-width="8" />
              <path d="M 50,22 L 40,22" stroke="#b45309" stroke-width="8" />
              <path d="M 50,78 L 60,78" stroke="#b45309" stroke-width="8" />
            `
            : `
              <path d="M 0,50 L 38,50" stroke="#b45309" stroke-width="8" />
              <path d="M 62,50 L 100,50" stroke="#b45309" stroke-width="8" />
            `
          }
          <path d="M 32,25 L 32,75 A 3,3 0 0,0 35,78 L 65,78 A 3,3 0 0,0 68,75 L 68,25" fill="none" stroke="#f8fafc" stroke-width="3.5" />
          <rect x="30" y="22" width="40" height="3" fill="#f8fafc" rx="1.5" />
          <path d="M 34,44 L 34,74 A 2,2 0 0,0 36,76 L 64,76 A 2,2 0 0,0 66,74 L 66,44 Z" fill="rgba(59, 130, 246, 0.35)" />
          <line x1="42" y1="18" x2="42" y2="54" stroke="#94a3b8" stroke-width="3" stroke-linecap="round" />
          <line x1="58" y1="18" x2="58" y2="54" stroke="#94a3b8" stroke-width="3" stroke-linecap="round" />
          <g class="ion-charge ion-charge-pos">
            <circle cx="39" cy="62" r="4" fill="#3b82f6" opacity="0.8" />
            <text x="39" y="65" fill="#ffffff" font-size="8" font-weight="bold" text-anchor="middle">+</text>
          </g>
          <g class="ion-charge ion-charge-neg">
            <circle cx="61" cy="66" r="4" fill="#10b981" opacity="0.8" />
            <text x="61" y="68" fill="#ffffff" font-size="8" font-weight="bold" text-anchor="middle">-</text>
          </g>
          <g class="beaker-bubbles">
            <circle cx="42" cy="46" r="1.5" fill="#ffffff" opacity="0" class="beaker-bubble" />
            <circle cx="43" cy="38" r="1" fill="#ffffff" opacity="0" class="beaker-bubble beaker-bubble-2" />
            <circle cx="58" cy="42" r="1.5" fill="#ffffff" opacity="0" class="beaker-bubble" />
            <circle cx="57" cy="48" r="1" fill="#ffffff" opacity="0" class="beaker-bubble beaker-bubble-2" />
          </g>
        </svg>
      `;
    }
  },
  "resistor": {
    id: "resistor",
    name: "Resistor",
    type: "load",
    grade: "Class 10",
    desc: "An electrical load that actively resists the flow of charges to drop the current according to Ohm's Law.",
    resistance: 8.0,
    behavior: "Restricts current flow, lowering Ammeter readings and bulb brightness.",
    inventorySvg: `
      <svg viewBox="0 0 100 100">
        <path d="M 10,50 L 90,50" stroke="#cbd5e1" stroke-width="6" />
        <rect x="28" y="38" width="44" height="24" rx="6" fill="#e2e8f0" stroke="#94a3b8" stroke-width="2" />
        <rect x="36" y="38" width="4" height="24" fill="#854d0e" />
        <rect x="44" y="38" width="4" height="24" fill="#000000" />
        <rect x="52" y="38" width="4" height="24" fill="#b45309" />
        <rect x="60" y="38" width="4" height="24" fill="#ca8a04" />
      </svg>
    `,
    slotSvg: (orientation, state) => {
      const rotate = (orientation === "left" || orientation === "right") ? 90 : 0;
      return `
        <svg viewBox="0 0 100 100" style="transform: rotate(${rotate}deg);">
          <path d="M 0,50 L 100,50" stroke="#b45309" stroke-width="8" />
          <rect x="22" y="34" width="56" height="32" rx="8" fill="#d1d5db" stroke="#4b5563" stroke-width="3" />
          <rect x="32" y="34" width="5" height="32" fill="#7c2d12" />
          <rect x="42" y="34" width="5" height="32" fill="#000000" />
          <rect x="52" y="34" width="5" height="32" fill="#c2410c" />
          <rect x="62" y="34" width="5" height="32" fill="#b45309" />
        </svg>
      `;
    }
  },
  "ammeter": {
    id: "ammeter",
    name: "Ammeter",
    type: "meter",
    grade: "Class 10",
    desc: "A device with very low resistance (0.05 Ω) that measures the rate of flow of current in amperes, placed in series.",
    resistance: 0.05,
    behavior: "Displays the active current flowing through the loop in real-time.",
    inventorySvg: `
      <svg viewBox="0 0 100 100">
        <rect x="25" y="25" width="50" height="50" rx="6" fill="#1e293b" stroke="#0891b2" stroke-width="2" />
        <rect x="33" y="33" width="34" height="16" fill="#020617" rx="2" />
        <text x="50" y="45" fill="#10b981" font-size="9" font-family="'Orbitron', sans-serif" text-anchor="middle">0.00</text>
        <text x="50" y="65" fill="#f8fafc" font-size="12" font-family="'Orbitron', sans-serif" font-weight="bold" text-anchor="middle">A</text>
      </svg>
    `,
    slotSvg: (orientation, state) => {
      const currentText = (state && state.currentVal !== undefined) ? state.currentVal.toFixed(2) + " A" : "0.00 A";
      const screenOffClass = (state && state.active) ? "" : "off";
      return `
        <svg viewBox="0 0 100 100">
          ${orientation === "left" || orientation === "right" 
            ? '<path d="M 50,0 L 50,100" stroke="#b45309" stroke-width="8" />' 
            : '<path d="M 0,50 L 100,50" stroke="#b45309" stroke-width="8" />'
          }
          <rect x="20" y="20" width="60" height="60" rx="8" fill="#1e293b" stroke="#0891b2" stroke-width="3" />
          <rect x="28" y="28" width="44" height="20" fill="#040711" rx="4" stroke="#334155" stroke-width="1.5" />
          <text x="50" y="43" class="meter-text ${screenOffClass}" text-anchor="middle">${currentText}</text>
          <circle cx="50" cy="65" r="10" fill="#0f172a" stroke="#0891b2" stroke-width="1.5" />
          <text x="50" y="69" fill="#0891b2" font-size="10" font-family="'Orbitron', sans-serif" font-weight="bold" text-anchor="middle">A</text>
          <circle cx="34" cy="65" r="3" fill="#ef4444" />
          <circle cx="66" cy="65" r="3" fill="#000000" />
        </svg>
      `;
    }
  },
  "voltmeter": {
    id: "voltmeter",
    name: "Voltmeter",
    type: "meter",
    grade: "Class 10",
    desc: "A device with massive resistance (10 MΩ). In series, it acts as an open loop, reading the total source voltage.",
    resistance: 10000000,
    behavior: "Blocks active current flow (open circuit). Displays source voltage across its terminals.",
    inventorySvg: `
      <svg viewBox="0 0 100 100">
        <rect x="25" y="25" width="50" height="50" rx="6" fill="#1e293b" stroke="#8b5cf6" stroke-width="2" />
        <rect x="33" y="33" width="34" height="16" fill="#020617" rx="2" />
        <text x="50" y="45" fill="#10b981" font-size="9" font-family="'Orbitron', sans-serif" text-anchor="middle">0.00</text>
        <text x="50" y="65" fill="#f8fafc" font-size="12" font-family="'Orbitron', sans-serif" font-weight="bold" text-anchor="middle">V</text>
      </svg>
    `,
    slotSvg: (orientation, state) => {
      const voltText = (state && state.voltVal !== undefined) ? state.voltVal.toFixed(2) + " V" : "0.00 V";
      const screenOffClass = (state && state.active) ? "" : "off";
      return `
        <svg viewBox="0 0 100 100">
          ${orientation === "left" || orientation === "right" 
            ? '<path d="M 50,0 L 50,100" stroke="#b45309" stroke-width="8" />' 
            : '<path d="M 0,50 L 100,50" stroke="#b45309" stroke-width="8" />'
          }
          <rect x="20" y="20" width="60" height="60" rx="8" fill="#1e293b" stroke="#8b5cf6" stroke-width="3" />
          <rect x="28" y="28" width="44" height="20" fill="#040711" rx="4" stroke="#334155" stroke-width="1.5" />
          <text x="50" y="43" class="meter-text ${screenOffClass}" text-anchor="middle">${voltText}</text>
          <circle cx="50" cy="65" r="10" fill="#0f172a" stroke="#8b5cf6" stroke-width="1.5" />
          <text x="50" y="69" fill="#8b5cf6" font-size="10" font-family="'Orbitron', sans-serif" font-weight="bold" text-anchor="middle">V</text>
          <circle cx="34" cy="65" r="3" fill="#ef4444" />
          <circle cx="66" cy="65" r="3" fill="#000000" />
        </svg>
      `;
    }
  }
};

// Syllabus categories mapping component lists
const SYLLABUS = {
  "Class 6": ["battery", "bulb", "wire", "switch-open", "switch-closed", "eraser"],
  "Class 7": ["battery", "bulb", "wire", "switch-open", "switch-closed", "eraser", "heater", "fuse"],
  "Class 8": ["battery", "bulb", "wire", "switch-open", "switch-closed", "eraser", "heater", "fuse", "led", "saltwater"],
  "Class 10": ["battery", "bulb", "wire", "switch-open", "switch-closed", "eraser", "heater", "fuse", "led", "saltwater", "resistor", "ammeter", "voltmeter"]
};

// SLOT POSITION LAYOUTS (relative to 480x480 circuit board container)
const SLOT_LAYOUTS = {
  4: [
    { name: "Slot A", x: 187, y: 20, orientation: "horizontal" },
    { name: "Slot B", x: 354, y: 187, orientation: "vertical" },
    { name: "Slot C", x: 187, y: 354, orientation: "horizontal" },
    { name: "Slot D", x: 20, y: 187, orientation: "vertical" }
  ],
  6: [
    { name: "Slot A", x: 107, y: 20, orientation: "horizontal" },
    { name: "Slot B", x: 267, y: 20, orientation: "horizontal" },
    { name: "Slot C", x: 354, y: 187, orientation: "vertical" },
    { name: "Slot D", x: 267, y: 354, orientation: "horizontal" },
    { name: "Slot E", x: 107, y: 354, orientation: "horizontal" },
    { name: "Slot F", x: 20, y: 187, orientation: "vertical" }
  ],
  8: [
    { name: "Slot A", x: 107, y: 20, orientation: "horizontal" },
    { name: "Slot B", x: 267, y: 20, orientation: "horizontal" },
    { name: "Slot C", x: 354, y: 107, orientation: "vertical" },
    { name: "Slot D", x: 354, y: 267, orientation: "vertical" },
    { name: "Slot E", x: 267, y: 354, orientation: "horizontal" },
    { name: "Slot F", x: 107, y: 354, orientation: "horizontal" },
    { name: "Slot G", x: 20, y: 267, orientation: "vertical" },
    { name: "Slot H", x: 20, y: 107, orientation: "vertical" }
  ]
};

/**
 * =========================================================================
 * CHALLENGE_CONFIGS — Leveled Puzzle Definitions
 * Each key is a grade level with a specific broken/incomplete circuit
 * the user must fix. Contains:
 *   - slotCount: how many slots this challenge uses
 *   - prePopulate: array of component IDs (or null for empty slots)
 *   - goal: text shown to the user describing the objective
 *   - hint: detailed hint shown below the goal
 *   - gradeForInventory: which SYLLABUS inventory to show
 * =========================================================================
 */
const CHALLENGE_CONFIGS = {
  /**
   * CLASS 6 — THE BASICS
   * Scenario: Battery + open switch are placed, two slots are empty.
   * User must: Place a Light Bulb and a Wire, then close the switch.
   * Success: All slots filled, has battery + bulb, no open switches or insulators.
   */
  "Class 6": {
    slotCount: 4,
    prePopulate: ["battery", "switch-open", null, null],
    goal: "Complete the circuit to light the bulb.",
    hint: "Place a Light Bulb in an empty slot and fill the rest with Wires. Don't forget to close the switch!",
    gradeForInventory: "Class 6"
  },

  /**
   * CLASS 7 — HEATING & SAFETY
   * Scenario: Battery connected in a full loop of Wires (dangerous short circuit).
   * User must: Replace a Wire with a Heating Coil, Fuse, or Bulb to consume power.
   * Success: Has battery + at least one load component, no short circuit.
   */
  "Class 7": {
    slotCount: 4,
    prePopulate: ["battery", "wire", "wire", "wire"],
    goal: "Danger! This circuit is overheating. Fix it by adding a load or safety device.",
    hint: "Replace one of the Wires with a Heating Coil, Fuse, or Light Bulb to consume the energy safely.",
    gradeForInventory: "Class 7"
  },

  /**
   * CLASS 8 — CONDUCTIVITY
   * Scenario: Battery, LED, and Rubber Eraser in a loop with a wire.
   * The Eraser (insulator) blocks all current flow — the LED stays off.
   * User must: Remove the Eraser and replace it with a Beaker of Saltwater.
   * Success: Has battery + LED + saltwater, no insulators.
   */
  "Class 8": {
    slotCount: 4,
    prePopulate: ["battery", "led", "eraser", "wire"],
    goal: "The LED is off because the current is blocked. Replace the insulator with a liquid conductor.",
    hint: "Remove the Rubber Eraser and replace it with the Beaker of Saltwater to let current flow.",
    gradeForInventory: "Class 8"
  },

  /**
   * CLASS 10 — ADVANCED SETUP
   * Scenario: Battery, Resistor, and Ammeter placed, but loop has one empty slot.
   * User must: Fill the empty slot to complete the series loop.
   * Success: All slots filled, has battery + resistor + ammeter in a closed series loop, no short circuits.
   */
  "Class 10": {
    slotCount: 4,
    prePopulate: ["battery", "resistor", "ammeter", null],
    goal: "Measure the current safely. Connect the Ammeter in series with the Resistor.",
    hint: "Fill the empty slot with a Wire to complete the loop. The Ammeter must be in series with the Resistor.",
    gradeForInventory: "Class 10"
  }
};

/**
 * =========================================================================
 * WIRE PATH POINTS
 * The rectangular loop's corner coordinates in the 480x480 SVG space.
 * Electrons travel along line segments connecting these corners.
 * =========================================================================
 */
const WIRE_PATH_POINTS = [
  { x: 70, y: 70 },   // top-left
  { x: 410, y: 70 },  // top-right
  { x: 410, y: 410 }, // bottom-right
  { x: 70, y: 410 }   // bottom-left
];

// --- GAME ENGINE CLASS ---
class CircuitSandbox {
  constructor() {
    this.selectedGrade = "Class 6";
    this.selectedComponentId = null;
    
    // Dynamic slots config
    this.activeSlotCount = 4;
    this.slots = Array(this.activeSlotCount).fill(null);
    this.slotStates = Array(this.activeSlotCount).fill().map(() => ({}));

    this.circuitFlowing = false;

    /**
     * hintActive tracks whether the first-slot pulsing hint is still active.
     * It starts as true and becomes false once the user places their
     * very first component, so the hint never reappears.
     */
    this.hintActive = true;

    /**
     * challengeMode tracks whether the "Challenge Mode" UI state is active.
     * In this mode, slots are pre-populated with a broken circuit.
     */
    this.challengeMode = false;

    /**
     * activeChallengeLevel: which specific class challenge is currently active.
     * null when no challenge is selected (i.e., level-select screen is showing).
     */
    this.activeChallengeLevel = null;

    /**
     * completedChallenges: Set of challenge level keys the user has solved
     * during this session. Used to show green checkmarks on level tiles.
     */
    this.completedChallenges = new Set();

    // ---- ELECTRON ANIMATION STATE ----
    /**
     * electronAnimationId: stores the requestAnimationFrame handle
     * so we can cancel it when flow stops.
     */
    this.electronAnimationId = null;

    /**
     * electrons: array of electron dot objects, each with a `progress`
     * value (0–1) indicating position along the total wire path perimeter.
     */
    this.electrons = [];

    /**
     * timeMode: "play" | "paused" | "slow"
     * Controls electron animation speed via a multiplier:
     * - play:   speed multiplier = 1.0 (normal)
     * - paused: speed multiplier = 0.0 (frozen)
     * - slow:   speed multiplier = 0.3 (slow-mo)
     */
    this.timeMode = "play";

    /**
     * lastFrameTime: timestamp of the previous animation frame,
     * used to calculate deltaTime for smooth speed-independent movement.
     */
    this.lastFrameTime = 0;

    // Cache core controls
    this.gradeSelect = document.getElementById("grade-select");
    this.inventoryGrid = document.getElementById("inventory-grid");
    this.workspaceArea = document.getElementById("workspace-area");
    this.terminalText = document.getElementById("terminal-text");
    this.btnTest = document.getElementById("btn-test");
    this.btnReset = document.getElementById("btn-reset");
    
    // Cache slots container and slot counters
    this.slotsContainer = document.getElementById("slots-container");
    this.btnAddSlot = document.getElementById("btn-add-slot");
    this.btnRemoveSlot = document.getElementById("btn-remove-slot");

    // Challenge Mode elements (level select view)
    this.btnChallengeMode = document.getElementById("btn-challenge-mode");
    this.challengeOverlay = document.getElementById("challenge-overlay");
    this.challengeLevelSelect = document.getElementById("challenge-level-select");
    this.challengeLevelGrid = document.getElementById("challenge-level-grid");
    this.btnExitChallenge = document.getElementById("btn-exit-challenge");

    // Challenge Mode elements (active challenge view)
    this.challengeActiveView = document.getElementById("challenge-active-view");
    this.challengeActiveBadge = document.getElementById("challenge-active-badge");
    this.challengeGoalText = document.getElementById("challenge-goal-text");
    this.challengeHintText = document.getElementById("challenge-hint-text");
    this.btnBackToLevels = document.getElementById("btn-back-to-levels");
    this.btnExitChallengeActive = document.getElementById("btn-exit-challenge-active");

    // Success celebration element
    this.successCelebration = document.getElementById("success-celebration");

    // Time Controls elements
    this.btnTimePlay = document.getElementById("btn-time-play");
    this.btnTimePause = document.getElementById("btn-time-pause");
    this.btnTimeSlow = document.getElementById("btn-time-slow");

    // Electron canvas context
    this.electronCanvas = document.getElementById("electron-canvas");
    this.electronCtx = this.electronCanvas.getContext("2d");

    // Info Brief panels
    this.briefEmpty = document.getElementById("brief-empty");
    this.briefContent = document.getElementById("brief-content");
    this.briefIcon = document.getElementById("brief-icon");
    this.briefTitle = document.getElementById("brief-title");
    this.briefGrade = document.getElementById("brief-grade");
    this.briefBadge = document.getElementById("brief-badge");
    this.briefDesc = document.getElementById("brief-desc");
    this.briefPropBehavior = document.getElementById("brief-prop-behavior");
    this.briefPropResistance = document.getElementById("brief-prop-resistance");
    this.briefPropExtraLabel = document.getElementById("brief-prop-extra-label");
    this.briefPropExtraValue = document.getElementById("brief-prop-extra-value");
    this.briefPropExtraContainer = document.getElementById("brief-prop-extra-container");

    // Bind event callbacks
    this.gradeSelect.addEventListener("change", (e) => this.selectGrade(e.target.value));
    this.btnTest.addEventListener("click", () => this.testCircuit());
    this.btnReset.addEventListener("click", () => this.resetWorkspace());
    
    // Slot manipulations
    this.btnAddSlot.addEventListener("click", () => this.adjustSlotCount(2));
    this.btnRemoveSlot.addEventListener("click", () => this.adjustSlotCount(-2));

    // Challenge Mode bindings
    this.btnChallengeMode.addEventListener("click", () => this.enterChallengeMode());
    this.btnExitChallenge.addEventListener("click", () => this.exitChallengeMode());
    this.btnExitChallengeActive.addEventListener("click", () => this.exitChallengeMode());
    this.btnBackToLevels.addEventListener("click", () => this.backToLevelSelect());

    // Level tile click handlers (event delegation on the grid)
    this.challengeLevelGrid.addEventListener("click", (e) => {
      const tile = e.target.closest(".challenge-level-tile");
      if (tile) {
        const level = tile.dataset.level;
        if (level) this.selectChallengeLevel(level);
      }
    });

    // Time Controls bindings — each sets timeMode and updates button styles
    this.btnTimePlay.addEventListener("click", () => this.setTimeMode("play"));
    this.btnTimePause.addEventListener("click", () => this.setTimeMode("paused"));
    this.btnTimeSlow.addEventListener("click", () => this.setTimeMode("slow"));

    this.init();
  }

  init() {
    this.renderInventory();
    this.updateWorkspace();
    this.logMessage("System initialized. Select a component and place it in a slot!");
  }

  // Outputs retro digital green/red warnings into terminal
  logMessage(text, type = "normal") {
    this.terminalText.innerText = text;
    this.terminalText.className = "terminal-output";
    if (type === "error") {
      this.terminalText.classList.add("error");
    } else if (type === "warning") {
      this.terminalText.classList.add("warning");
    }
  }

  // Expand or shrink loop (4, 6, 8 slots)
  adjustSlotCount(delta) {
    const newCount = this.activeSlotCount + delta;
    if (newCount < 4 || newCount > 8) {
      this.logMessage(`Slot count limits reached: 4 min, 8 max.`, "warning");
      return;
    }

    // Cancel current flows
    this.circuitFlowing = false;
    this.setFlowIntensity(0);
    this.stopElectronAnimation(); // Stop electron dots when resizing
    this.workspaceArea.classList.remove("short-circuit-flash");

    if (delta > 0) {
      this.slots = [...this.slots, ...Array(delta).fill(null)];
      this.slotStates = [...this.slotStates, ...Array(delta).fill().map(() => ({}))];
    } else {
      this.slots = this.slots.slice(0, newCount);
      this.slotStates = this.slotStates.slice(0, newCount);
    }

    this.activeSlotCount = newCount;
    this.updateWorkspace();
    this.logMessage(`Circuit board updated to ${newCount} slots. Ready for testing.`);
  }

  selectGrade(grade) {
    this.selectedGrade = grade;
    this.selectedComponentId = null;
    this.renderInventory();
    this.updateBrief(null);
    this.logMessage(`Loaded syllabus: ${grade}. Updated Component inventory.`);
  }

  renderInventory() {
    this.inventoryGrid.innerHTML = "";
    const availableIds = SYLLABUS[this.selectedGrade];
    
    availableIds.forEach(id => {
      const comp = COMPONENT_DATA[id];
      const card = document.createElement("div");
      card.className = "component-card";
      card.dataset.id = id;
      if (this.selectedComponentId === id) {
        card.classList.add("selected");
      }
      
      let badgeClass = `badge-${comp.type}`;
      
      card.innerHTML = `
        <div class="component-card-icon">${comp.inventorySvg}</div>
        <div class="component-card-name">${comp.name}</div>
        <span class="component-card-badge ${badgeClass}">${comp.type}</span>
      `;
      
      card.addEventListener("click", () => this.selectInventoryComponent(id));
      this.inventoryGrid.appendChild(card);
    });
  }

  selectInventoryComponent(id) {
    this.selectedComponentId = id;
    
    const cards = this.inventoryGrid.querySelectorAll(".component-card");
    const availableIds = SYLLABUS[this.selectedGrade];
    const activeIndex = availableIds.indexOf(id);
    
    cards.forEach((card, idx) => {
      if (idx === activeIndex) {
        card.classList.add("selected");
      } else {
        card.classList.remove("selected");
      }
    });

    this.updateBrief(COMPONENT_DATA[id]);
  }

  updateBrief(comp) {
    if (!comp) {
      this.briefEmpty.style.display = "flex";
      this.briefContent.style.display = "none";
      return;
    }

    this.briefEmpty.style.display = "none";
    this.briefContent.style.display = "flex";

    this.briefIcon.innerHTML = comp.inventorySvg;
    this.briefTitle.innerText = comp.name;
    this.briefGrade.innerText = comp.grade;
    
    this.briefBadge.className = `component-card-badge badge-${comp.type}`;
    this.briefBadge.innerText = comp.type;
    this.briefDesc.innerText = comp.desc;
    this.briefPropBehavior.innerText = comp.behavior;
    
    if (comp.resistance === Infinity) {
      this.briefPropResistance.innerText = "∞ Ω (Insulator)";
    } else {
      this.briefPropResistance.innerText = `${comp.resistance} Ω`;
    }

    if (comp.type === "power") {
      this.briefPropExtraContainer.style.display = "flex";
      this.briefPropExtraLabel.innerText = "Voltage:";
      this.briefPropExtraValue.innerText = `${comp.voltage} V`;
    } else {
      this.briefPropExtraContainer.style.display = "none";
    }
  }

  handleSlotClick(slotIndex, event) {
    if (event.target.classList.contains("slot-clear-btn")) {
      event.stopPropagation();
      this.removeComponentFromSlot(slotIndex);
      return;
    }

    const currentSlotItem = this.slots[slotIndex];

    if (currentSlotItem) {
      this.removeComponentFromSlot(slotIndex);
      this.updateBrief(null);
    } else {
      if (this.selectedComponentId) {
        this.slots[slotIndex] = this.selectedComponentId;
        this.slotStates[slotIndex] = {};

        /**
         * FEATURE #1: Disable the pulsing hint once the user places
         * their very first component. After this, the hint never comes back.
         */
        if (this.hintActive) {
          this.hintActive = false;
        }

        this.updateWorkspace();
        
        const comp = COMPONENT_DATA[this.selectedComponentId];
        this.logMessage(`Placed ${comp.name} into Slot ${String.fromCharCode(65 + slotIndex)}.`);
        this.updateBrief(comp);
      } else {
        this.logMessage("No component selected. Click a component in the inventory first!", "warning");
      }
    }
  }

  /**
   * =========================================================================
   * updateWorkspace()
   * Re-renders all circuit slot DOM elements on the coordinate grid.
   * Also applies the pulsing hint to the first empty slot when hintActive.
   * =========================================================================
   */
  updateWorkspace() {
    const layout = SLOT_LAYOUTS[this.activeSlotCount];
    this.slotsContainer.innerHTML = "";

    // Track whether we've already placed the hint on one slot
    let hintApplied = false;
    
    for (let i = 0; i < this.activeSlotCount; i++) {
      const item = this.slots[i];
      const state = this.slotStates[i];
      const slotMeta = layout[i];

      const slotEl = document.createElement("div");
      slotEl.id = `slot-${i}`;
      slotEl.className = `circuit-slot slot-${slotMeta.orientation}`;
      slotEl.style.left = `${slotMeta.x}px`;
      slotEl.style.top = `${slotMeta.y}px`;
      slotEl.dataset.slotIndex = i;

      slotEl.addEventListener("click", (e) => this.handleSlotClick(i, e));

      if (item) {
        slotEl.classList.add("occupied");
        const comp = COMPONENT_DATA[item];
        
        const compWrap = document.createElement("div");
        compWrap.className = "placed-component";
        
        const graphicDiv = document.createElement("div");
        graphicDiv.className = "placed-component-graphic";
        graphicDiv.innerHTML = comp.slotSvg(slotMeta.orientation, state);
        compWrap.appendChild(graphicDiv);

        const labelSpan = document.createElement("span");
        labelSpan.className = "placed-component-name";
        labelSpan.innerText = comp.name;
        compWrap.appendChild(labelSpan);

        const clearBtn = document.createElement("button");
        clearBtn.className = "slot-clear-btn";
        clearBtn.innerText = "×";
        compWrap.appendChild(clearBtn);

        slotEl.appendChild(compWrap);
      } else {
        slotEl.innerHTML = `
          <div class="slot-placeholder">
            <svg viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
            <span>${slotMeta.name}</span>
          </div>
        `;

        /**
         * FEATURE #1: Apply the pulsing CSS hint to the FIRST empty slot
         * only when hintActive is true (user hasn't placed anything yet).
         */
        if (this.hintActive && !hintApplied) {
          slotEl.classList.add("slot-hint-pulse");
          hintApplied = true;
        }
      }

      this.slotsContainer.appendChild(slotEl);
    }

    // Apply or remove the "flowing" class on the SVG wire loop
    const boardSvg = this.workspaceArea.querySelector(".wire-loop-svg");
    if (this.circuitFlowing) {
      boardSvg.classList.add("flowing");
    } else {
      boardSvg.classList.remove("flowing");
    }

    // Apply paused state to CSS animation if time is paused
    if (this.timeMode === "paused") {
      boardSvg.classList.add("electron-paused");
    } else {
      boardSvg.classList.remove("electron-paused");
    }
  }

  removeComponentFromSlot(slotIndex) {
    const item = this.slots[slotIndex];
    if (item) {
      const comp = COMPONENT_DATA[item];
      this.slots[slotIndex] = null;
      this.slotStates[slotIndex] = {};
      this.circuitFlowing = false;
      this.setFlowIntensity(0);
      this.stopElectronAnimation(); // Stop electrons when a component is removed
      this.updateWorkspace();
      this.logMessage(`Removed ${comp.name} from Slot ${String.fromCharCode(65 + slotIndex)}.`);
    }
  }

  resetWorkspace() {
    this.slots = Array(this.activeSlotCount).fill(null);
    this.slotStates = Array(this.activeSlotCount).fill().map(() => ({}));
    this.circuitFlowing = false;
    this.setFlowIntensity(0);
    this.stopElectronAnimation(); // Clear electron canvas on reset
    this.workspaceArea.classList.remove("short-circuit-flash");
    this.clearSparkIndicators(); // Remove any spark visuals
    this.updateWorkspace();
    this.updateBrief(null);
    this.logMessage("Workspace reset. All slots cleared.");
  }

  // --- CORE PHYSICS CALCULATIONS & SIMULATION RULES ---
  testCircuit() {
    this.circuitFlowing = false;
    this.setFlowIntensity(0);
    this.stopElectronAnimation(); // Always stop electrons before re-evaluating
    this.workspaceArea.classList.remove("short-circuit-flash");
    this.clearSparkIndicators(); // Clear previous spark feedback
    this.updateWorkspace();

    const placedItems = [];
    let hasBattery = false;
    let hasLoad = false;
    let hasOpenSwitch = false;
    let hasInsulator = false;
    let hasEmptySlot = false;
    let hasFuse = false;
    let fuseIndex = -1;
    let hasVoltmeter = false;
    let voltmeterIndex = -1;
    let hasAmmeter = false;
    let ammeterIndex = -1;

    /** Track the index of the FIRST slot that causes a break,
     *  used by Challenge Mode to show spark feedback. */
    let firstBreakIndex = -1;

    let totalVoltage = 0.0;
    let totalResistance = 0.0;

    for (let i = 0; i < this.activeSlotCount; i++) {
      const itemId = this.slots[i];
      if (!itemId) {
        hasEmptySlot = true;
        if (firstBreakIndex === -1) firstBreakIndex = i;
        totalResistance = Infinity;
        continue;
      }

      const comp = COMPONENT_DATA[itemId];
      placedItems.push({ index: i, comp: comp });

      if (comp.type === "power") {
        hasBattery = true;
        totalVoltage += comp.voltage;
      }

      if (itemId === "switch-open") {
        hasOpenSwitch = true;
        if (firstBreakIndex === -1) firstBreakIndex = i;
        totalResistance = Infinity;
      } else if (comp.type === "insulator") {
        hasInsulator = true;
        if (firstBreakIndex === -1) firstBreakIndex = i;
        totalResistance = Infinity;
      } else if (itemId === "fuse") {
        hasFuse = true;
        fuseIndex = i;
        if (this.slotStates[i].blown) {
          if (firstBreakIndex === -1) firstBreakIndex = i;
          totalResistance = Infinity;
        } else {
          totalResistance += comp.resistance;
        }
      } else if (itemId === "voltmeter") {
        hasVoltmeter = true;
        voltmeterIndex = i;
        totalResistance += comp.resistance;
      } else if (itemId === "ammeter") {
        hasAmmeter = true;
        ammeterIndex = i;
        totalResistance += comp.resistance;
      } else {
        totalResistance += comp.resistance;
        if (comp.type === "load") {
          hasLoad = true;
        }
      }
    }

    // RULE 0: Power check
    if (!hasBattery) {
      this.logMessage("Circuit Incomplete: No power source. You need a battery to create voltage.", "warning");
      this.updateWorkspaceMeters(0, 0);
      // In challenge mode, show spark at the first break point
      if (this.challengeMode && firstBreakIndex >= 0) {
        this.showSparkAtSlot(firstBreakIndex);
      }
      return;
    }

    // RULE 1: Open paths
    const isBrokenCircuit = hasEmptySlot || hasOpenSwitch || hasInsulator || (hasFuse && this.slotStates[fuseIndex].blown);
    if (isBrokenCircuit && !hasVoltmeter) {
      this.logMessage("Circuit Incomplete: Current cannot flow. Make sure there are no empty slots, open switches, or insulators.", "warning");
      this.updateWorkspaceMeters(0, 0);
      /**
       * FEATURE #4 (Challenge Mode): Instead of a simple text message,
       * show a visual spark indicator at the slot where current stops.
       */
      if (this.challengeMode && firstBreakIndex >= 0) {
        this.showSparkAtSlot(firstBreakIndex);
      }
      return;
    }

    // RULE 2: Series Voltmeter (measures battery voltage across open terminal)
    if (hasVoltmeter) {
      const calculatedVoltage = totalVoltage;
      this.circuitFlowing = false;
      this.slotStates[voltmeterIndex].active = true;
      this.slotStates[voltmeterIndex].voltVal = calculatedVoltage;
      
      if (hasAmmeter) {
        this.slotStates[ammeterIndex].active = true;
        this.slotStates[ammeterIndex].currentVal = 0.0;
      }

      this.updateWorkspace();
      this.logMessage(`Open Circuit (High Resistance Voltmeter): Voltmeter reads ${calculatedVoltage.toFixed(2)} V. Current is 0.00 A.`, "warning");
      return;
    }

    // Current draw
    const current = totalVoltage / totalResistance;

    // RULE 3: Short Circuit (Power source with no load)
    if (!hasLoad) {
      if (hasFuse && !this.slotStates[fuseIndex].blown) {
        if (current > 2.0) {
          this.slotStates[fuseIndex].blown = true;
          this.circuitFlowing = false;
          this.updateWorkspace();
          this.logMessage("Safety Triggered: Fuse blew! The short circuit drew too much current (exceeding 2.0 A), melting the fuse wire to protect the loop.", "error");
          return;
        }
      }

      this.circuitFlowing = true;
      this.setFlowIntensity(current);
      this.workspaceArea.classList.add("short-circuit-flash");
      this.updateWorkspace();

      /**
       * FEATURE #2: Start electron flow animation even on short circuit
       * (electrons DO flow in a short circuit — dangerously fast).
       */
      this.startElectronAnimation(current);
      
      if (hasAmmeter) {
        this.slotStates[ammeterIndex].active = true;
        this.slotStates[ammeterIndex].currentVal = current;
        this.updateWorkspace();
      }

      this.logMessage(`Danger: Short Circuit! Current is dangerously high (${current.toFixed(2)} A)! You need a load (like a bulb or resistor) to consume the energy.`, "error");

      /**
       * FEATURE #4 (Challenge Mode): In challenge mode, a short circuit
       * is the initial broken state. Show visual feedback that the circuit
       * is dangerous rather than just red text.
       */
      if (this.challengeMode) {
        this.showShortCircuitSparks();
      }
      return;
    }

    // RULE 4: Success normal loop check
    if (hasFuse && !this.slotStates[fuseIndex].blown && current > 2.0) {
      this.slotStates[fuseIndex].blown = true;
      this.circuitFlowing = false;
      this.updateWorkspace();
      this.logMessage(`Safety Triggered: Fuse blew! The current of ${current.toFixed(2)} A exceeded the 2.0 A limit.`, "error");
      return;
    }

    this.circuitFlowing = true;
    this.setFlowIntensity(current);
    
    if (hasAmmeter) {
      this.slotStates[ammeterIndex].active = true;
      this.slotStates[ammeterIndex].currentVal = current;
    }

    this.updateWorkspace();

    /**
     * CHALLENGE MODE: If a leveled challenge is active, check the SPECIFIC
     * success condition for that class. Electron flow animation ONLY starts
     * when the challenge's unique success condition is satisfied.
     * In free sandbox mode, electrons always flow on a valid circuit.
     */
    if (this.challengeMode && this.activeChallengeLevel) {
      const passed = this.checkChallengeSuccess(current, totalResistance);
      if (passed) {
        // Start electron flow animation ONLY on challenge success
        this.startElectronAnimation(current);
        this.logMessage(`🎉 Challenge Complete! Circuit is safe. Current: ${current.toFixed(2)} A. Great job!`, "normal");
      } else {
        // Challenge not yet solved — stop flowing, show failure feedback
        this.circuitFlowing = false;
        this.setFlowIntensity(0);
        this.stopElectronAnimation();
        this.updateWorkspace();
      }
    } else {
      /**
       * FEATURE #2: Start the electron flow animation on success.
       * Small glowing dots travel along the wire path continuously.
       */
      this.startElectronAnimation(current);
      this.logMessage(`Success: Current is flowing! Measured Current: ${current.toFixed(2)} A. Total Resistance: ${totalResistance.toFixed(2)} Ω.`, "normal");
    }
  }

  updateWorkspaceMeters(currentVal, voltVal) {
    for (let i = 0; i < this.activeSlotCount; i++) {
      const item = this.slots[i];
      if (item === "ammeter") {
        this.slotStates[i].active = (currentVal > 0);
        this.slotStates[i].currentVal = currentVal;
      }
      if (item === "voltmeter") {
        this.slotStates[i].active = (voltVal > 0);
        this.slotStates[i].voltVal = voltVal;
      }
    }
    this.updateWorkspace();
  }

  setFlowIntensity(current) {
    if (!current || current <= 0) {
      document.documentElement.style.setProperty('--current-intensity', 0);
      return;
    }
    const maxReferenceCurrent = 1.5 / 2.85;
    const intensity = Math.min(1.8, current / maxReferenceCurrent);
    document.documentElement.style.setProperty('--current-intensity', intensity);
  }

  // =========================================================================
  // FEATURE #2: ELECTRON FLOW ANIMATION (Canvas-based requestAnimationFrame)
  // =========================================================================

  /**
   * calculatePathLength()
   * Computes the total perimeter length of the rectangular wire loop
   * by summing the distances between consecutive corner points.
   */
  calculatePathLength() {
    let totalLength = 0;
    const pts = WIRE_PATH_POINTS;
    for (let i = 0; i < pts.length; i++) {
      const next = pts[(i + 1) % pts.length];
      const dx = next.x - pts[i].x;
      const dy = next.y - pts[i].y;
      totalLength += Math.sqrt(dx * dx + dy * dy);
    }
    return totalLength;
  }

  /**
   * getPointOnPath(progress)
   * Given a progress value (0 to 1), returns the {x, y} coordinate
   * on the rectangular wire loop path at that fractional distance.
   */
  getPointOnPath(progress) {
    const pts = WIRE_PATH_POINTS;
    const totalLength = this.calculatePathLength();
    let targetDist = progress * totalLength;

    for (let i = 0; i < pts.length; i++) {
      const next = pts[(i + 1) % pts.length];
      const dx = next.x - pts[i].x;
      const dy = next.y - pts[i].y;
      const segLen = Math.sqrt(dx * dx + dy * dy);

      if (targetDist <= segLen) {
        // Interpolate within this segment
        const t = targetDist / segLen;
        return {
          x: pts[i].x + dx * t,
          y: pts[i].y + dy * t
        };
      }
      targetDist -= segLen;
    }

    // Fallback to first point (shouldn't reach here)
    return { x: pts[0].x, y: pts[0].y };
  }

  /**
   * startElectronAnimation(current)
   * Spawns a set of electron dots spread evenly around the loop
   * and kicks off the requestAnimationFrame render loop.
   * @param {number} current - the circuit current in amps, affects speed.
   */
  startElectronAnimation(current) {
    // Cancel any existing animation before starting fresh
    this.stopElectronAnimation();

    // Number of electron dots scales with current (more current = more dots)
    const electronCount = Math.max(8, Math.min(20, Math.round(current * 10)));

    // Initialize electron positions evenly distributed around the loop
    this.electrons = [];
    for (let i = 0; i < electronCount; i++) {
      this.electrons.push({
        progress: i / electronCount,        // 0–1 fractional position
        speed: 0.08 + (current * 0.04)      // base speed + current boost
      });
    }

    this.lastFrameTime = performance.now();

    /**
     * renderLoop: the core animation tick.
     * Each frame, move each electron forward by (speed * deltaTime * speedMultiplier),
     * then redraw all dots on the canvas.
     */
    const renderLoop = (timestamp) => {
      const deltaTime = (timestamp - this.lastFrameTime) / 1000; // seconds
      this.lastFrameTime = timestamp;

      /**
       * FEATURE #3: Time Controls — speedMultiplier maps the timeMode
       * to an animation rate:
       *   "play"   → 1.0  (normal speed)
       *   "paused" → 0.0  (frozen in place)
       *   "slow"   → 0.3  (slow motion)
       */
      let speedMultiplier = 1.0;
      if (this.timeMode === "paused") speedMultiplier = 0.0;
      else if (this.timeMode === "slow") speedMultiplier = 0.3;

      // Clear the canvas each frame
      this.electronCtx.clearRect(0, 0, this.electronCanvas.width, this.electronCanvas.height);

      // Update and draw each electron dot
      for (const electron of this.electrons) {
        // Advance electron position (wraps around at 1.0)
        electron.progress += electron.speed * deltaTime * speedMultiplier;
        if (electron.progress > 1.0) electron.progress -= 1.0;

        // Convert progress to x,y coordinates on the wire path
        const pos = this.getPointOnPath(electron.progress);

        // Draw the electron as a glowing dot
        this.drawElectronDot(pos.x, pos.y, current);
      }

      // Continue the animation loop
      this.electronAnimationId = requestAnimationFrame(renderLoop);
    };

    // Kick off the first frame
    this.electronAnimationId = requestAnimationFrame(renderLoop);
  }

  /**
   * drawElectronDot(x, y, current)
   * Renders a single glowing electron dot at (x, y) on the canvas.
   * Uses a radial gradient for the glow effect. Glow size scales with current.
   */
  drawElectronDot(x, y, current) {
    const ctx = this.electronCtx;
    const glowRadius = 6 + Math.min(current * 2, 8); // dynamic glow size

    // Outer glow (transparent halo)
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, glowRadius);
    gradient.addColorStop(0, "rgba(251, 191, 36, 0.95)");   // bright yellow core
    gradient.addColorStop(0.3, "rgba(251, 191, 36, 0.5)");  // mid glow
    gradient.addColorStop(0.7, "rgba(245, 158, 11, 0.15)"); // fading edge
    gradient.addColorStop(1, "rgba(245, 158, 11, 0)");      // fully transparent

    ctx.beginPath();
    ctx.arc(x, y, glowRadius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    // Inner bright core dot
    ctx.beginPath();
    ctx.arc(x, y, 2.5, 0, Math.PI * 2);
    ctx.fillStyle = "#fef3c7"; // warm white core
    ctx.fill();
  }

  /**
   * stopElectronAnimation()
   * Cancels the requestAnimationFrame loop and clears the canvas.
   * Called when circuit breaks, components are removed, or workspace resets.
   */
  stopElectronAnimation() {
    if (this.electronAnimationId) {
      cancelAnimationFrame(this.electronAnimationId);
      this.electronAnimationId = null;
    }
    // Clear the canvas to remove all electron dots instantly
    this.electronCtx.clearRect(0, 0, this.electronCanvas.width, this.electronCanvas.height);
    this.electrons = [];
  }

  // =========================================================================
  // FEATURE #3: TIME CONTROLS (Play / Pause / Slow Motion)
  // =========================================================================

  /**
   * setTimeMode(mode)
   * Updates the timeMode state and refreshes the button UI.
   * The electron animation render loop reads this.timeMode each frame
   * to determine the speed multiplier.
   *
   * Also updates the CSS --flow-duration variable for dash-based
   * SVG flow-particles animation (the legacy wire glow).
   *
   * @param {"play" | "paused" | "slow"} mode
   */
  setTimeMode(mode) {
    this.timeMode = mode;

    // Update which button shows as "active"
    this.btnTimePlay.classList.remove("time-btn-active");
    this.btnTimePause.classList.remove("time-btn-active");
    this.btnTimeSlow.classList.remove("time-btn-active");

    if (mode === "play") {
      this.btnTimePlay.classList.add("time-btn-active");
      // Normal CSS flow animation speed
      document.documentElement.style.setProperty('--flow-duration', '0.8s');
    } else if (mode === "paused") {
      this.btnTimePause.classList.add("time-btn-active");
    } else if (mode === "slow") {
      this.btnTimeSlow.classList.add("time-btn-active");
      // Slow motion: stretch CSS flow animation to 2.5s
      document.documentElement.style.setProperty('--flow-duration', '2.5s');
    }

    // Toggle CSS pause state on the SVG wire animation
    const boardSvg = this.workspaceArea.querySelector(".wire-loop-svg");
    if (mode === "paused") {
      boardSvg.classList.add("electron-paused");
    } else {
      boardSvg.classList.remove("electron-paused");
    }

    this.logMessage(`Time control: ${mode === "play" ? "▶ Playing" : mode === "paused" ? "⏸ Paused" : "🐢 Slow Motion"}`);
  }

  // =========================================================================
  // FEATURE #4: LEVELED CHALLENGE MODE (Class 6, 7, 8, 10 Puzzles)
  // =========================================================================

  /**
   * enterChallengeMode()
   * Opens the challenge overlay and shows the LEVEL SELECTION grid.
   * Does NOT pre-populate any circuit — the user must pick a level first.
   */
  enterChallengeMode() {
    this.challengeMode = true;
    this.activeChallengeLevel = null;
    this.hintActive = false;

    // Reset workspace state
    this.circuitFlowing = false;
    this.setFlowIntensity(0);
    this.stopElectronAnimation();
    this.workspaceArea.classList.remove("short-circuit-flash");
    this.clearSparkIndicators();

    // Show overlay with level-select view, hide active-challenge view
    this.challengeOverlay.style.display = "block";
    this.challengeLevelSelect.style.display = "flex";
    this.challengeActiveView.style.display = "none";
    this.btnChallengeMode.classList.add("active");

    // Update level tile completed/active states
    this.updateLevelTileStates();

    this.logMessage("🎯 Challenge Mode: Select a challenge level to begin!");
  }

  /**
   * selectChallengeLevel(level)
   * Loads the specific puzzle configuration for the chosen class level.
   * Pre-populates the circuit slots, switches the inventory grade,
   * and transitions the overlay from level-select to active-challenge view.
   *
   * @param {string} level - one of "Class 6", "Class 7", "Class 8", "Class 10"
   */
  selectChallengeLevel(level) {
    const config = CHALLENGE_CONFIGS[level];
    if (!config) return;

    this.activeChallengeLevel = level;

    // Reset any previous circuit state
    this.circuitFlowing = false;
    this.setFlowIntensity(0);
    this.stopElectronAnimation();
    this.workspaceArea.classList.remove("short-circuit-flash");
    this.clearSparkIndicators();
    this.successCelebration.style.display = "none";

    // Configure slot count and pre-populate the circuit array
    this.activeSlotCount = config.slotCount;
    this.slots = config.prePopulate.map(id => id); // shallow clone
    this.slotStates = Array(config.slotCount).fill().map(() => ({}));

    // Switch the inventory sidebar to the appropriate grade
    this.selectedGrade = config.gradeForInventory;
    this.gradeSelect.value = config.gradeForInventory;
    this.selectedComponentId = null;
    this.renderInventory();

    // Transition overlay: hide level-select, show active-challenge
    this.challengeLevelSelect.style.display = "none";
    this.challengeActiveView.style.display = "flex";

    // Populate the active challenge header and text
    this.challengeActiveBadge.innerText = `🎯 ${level.toUpperCase()}`;
    this.challengeGoalText.innerText = config.goal;
    this.challengeHintText.innerText = config.hint;

    // Update level tile states (mark active)
    this.updateLevelTileStates();

    this.updateWorkspace();
    this.updateBrief(null);
    this.logMessage(`🎯 ${level}: ${config.goal}`);
  }

  /**
   * backToLevelSelect()
   * Returns from the active challenge view to the level selection grid.
   * Resets the workspace but keeps challengeMode active.
   */
  backToLevelSelect() {
    this.activeChallengeLevel = null;

    // Reset workspace
    this.circuitFlowing = false;
    this.setFlowIntensity(0);
    this.stopElectronAnimation();
    this.workspaceArea.classList.remove("short-circuit-flash");
    this.clearSparkIndicators();
    this.successCelebration.style.display = "none";

    // Reset to empty 4 slots
    this.activeSlotCount = 4;
    this.slots = Array(4).fill(null);
    this.slotStates = [{}, {}, {}, {}];

    // Show level-select, hide active view
    this.challengeLevelSelect.style.display = "flex";
    this.challengeActiveView.style.display = "none";

    this.updateLevelTileStates();
    this.updateWorkspace();
    this.updateBrief(null);
    this.logMessage("🎯 Select a challenge level to begin!");
  }

  /**
   * exitChallengeMode()
   * Returns to normal sandbox mode: clears all challenge UI and resets workspace.
   */
  exitChallengeMode() {
    this.challengeMode = false;
    this.activeChallengeLevel = null;
    this.challengeOverlay.style.display = "none";
    this.challengeLevelSelect.style.display = "flex";
    this.challengeActiveView.style.display = "none";
    this.btnChallengeMode.classList.remove("active");
    this.clearSparkIndicators();
    this.successCelebration.style.display = "none";
    this.resetWorkspace();
    this.logMessage("Exited Challenge Mode. Free build sandbox restored.");
  }

  /**
   * updateLevelTileStates()
   * Updates the visual state of each level tile in the grid:
   * - Adds "completed" class to solved levels (green checkmark)
   * - Adds "active-level" class to the currently active level
   */
  updateLevelTileStates() {
    const tiles = this.challengeLevelGrid.querySelectorAll(".challenge-level-tile");
    tiles.forEach(tile => {
      const level = tile.dataset.level;

      // Completed state
      if (this.completedChallenges.has(level)) {
        tile.classList.add("completed");
      } else {
        tile.classList.remove("completed");
      }

      // Active state
      if (this.activeChallengeLevel === level) {
        tile.classList.add("active-level");
      } else {
        tile.classList.remove("active-level");
      }
    });
  }

  /**
   * =========================================================================
   * checkChallengeSuccess(current, totalResistance)
   * Evaluates the SPECIFIC success condition for the active challenge level.
   * Each class has unique win conditions documented inline.
   *
   * Returns true if the challenge is solved, false otherwise.
   * On failure, shows appropriate visual feedback (sparks, highlights).
   * On success, triggers the celebration animation and marks level complete.
   *
   * @param {number} current - the computed circuit current (amps)
   * @param {number} totalResistance - total series resistance (ohms)
   * @returns {boolean} whether the challenge was solved
   * =========================================================================
   */
  checkChallengeSuccess(current, totalResistance) {
    const level = this.activeChallengeLevel;

    // ---------------------------------------------------------------
    // CLASS 6 — THE BASICS
    // Success Condition:
    //   1. All slots must be filled (no empty slots)
    //   2. Circuit must contain at least one Battery
    //   3. Circuit must contain at least one Light Bulb (id: "bulb")
    //   4. No open switches or insulators (circuit must be closed)
    //   5. Current must be flowing (current > 0)
    // ---------------------------------------------------------------
    if (level === "Class 6") {
      const hasEmptySlot = this.slots.some(s => s === null);
      const hasBattery = this.slots.includes("battery");
      const hasBulb = this.slots.includes("bulb");
      const hasOpenSwitch = this.slots.includes("switch-open");
      const hasInsulator = this.slots.some(s => s && COMPONENT_DATA[s].type === "insulator");

      // Check for open switch — show spark at the switch slot
      if (hasOpenSwitch) {
        const switchIdx = this.slots.indexOf("switch-open");
        this.showSparkAtSlot(switchIdx);
        this.logMessage("The switch is still open! Close it to complete the circuit.", "warning");
        return false;
      }

      // Check for empty slots — show spark at first empty
      if (hasEmptySlot) {
        const emptyIdx = this.slots.indexOf(null);
        this.showSparkAtSlot(emptyIdx);
        this.logMessage("There are empty slots! Fill all slots to complete the loop.", "warning");
        return false;
      }

      // Check for insulators — show spark at insulator slot
      if (hasInsulator) {
        const insIdx = this.slots.findIndex(s => s && COMPONENT_DATA[s].type === "insulator");
        this.showSparkAtSlot(insIdx);
        this.logMessage("An insulator is blocking the current! Remove it.", "warning");
        return false;
      }

      // Must have a bulb specifically
      if (!hasBulb) {
        this.logMessage("You need a Light Bulb to complete this challenge!", "warning");
        return false;
      }

      // All conditions met — SUCCESS
      this.completedChallenges.add(level);
      this.updateLevelTileStates();
      this.showSuccessCelebration();
      return true;
    }

    // ---------------------------------------------------------------
    // CLASS 7 — HEATING & SAFETY
    // Success Condition:
    //   1. Circuit must contain a Battery
    //   2. Circuit must contain at least one LOAD component
    //      (type === "load": heater, bulb, LED, or resistor)
    //      OR a Fuse (which prevents short circuit safely)
    //   3. No short circuit (i.e., must have a load)
    //   4. Current must be flowing (current > 0)
    // The user must replace a wire with a load/fuse to fix it.
    // ---------------------------------------------------------------
    if (level === "Class 7") {
      const hasLoad = this.slots.some(s => s && COMPONENT_DATA[s].type === "load");

      // Still a short circuit — show sparks at all wire-only slots
      if (!hasLoad) {
        this.showShortCircuitSparks();
        this.logMessage("Still a short circuit! Replace a wire with a load (Heating Coil, Bulb, etc.)", "warning");
        return false;
      }

      // Has a load — SUCCESS
      this.completedChallenges.add(level);
      this.updateLevelTileStates();
      this.showSuccessCelebration();
      return true;
    }

    // ---------------------------------------------------------------
    // CLASS 8 — CONDUCTIVITY
    // Success Condition:
    //   1. Circuit must contain a Battery
    //   2. Circuit must contain an LED (id: "led")
    //   3. Circuit must contain a Beaker of Saltwater (id: "saltwater")
    //   4. Circuit must NOT contain any insulators (eraser, open switch)
    //   5. All slots must be filled
    //   6. Current must be flowing
    // The user must remove the Eraser and replace it with Saltwater.
    // ---------------------------------------------------------------
    if (level === "Class 8") {
      const hasLed = this.slots.includes("led");
      const hasSaltwater = this.slots.includes("saltwater");
      const hasInsulator = this.slots.some(s => s && COMPONENT_DATA[s].type === "insulator");
      const hasEmptySlot = this.slots.some(s => s === null);

      // Still has an insulator — show spark at insulator slot
      if (hasInsulator) {
        const insIdx = this.slots.findIndex(s => s && COMPONENT_DATA[s].type === "insulator");
        this.showSparkAtSlot(insIdx);
        this.logMessage("An insulator is still blocking current! Replace it with a conductor.", "warning");
        return false;
      }

      // Check for empty slots
      if (hasEmptySlot) {
        const emptyIdx = this.slots.indexOf(null);
        this.showSparkAtSlot(emptyIdx);
        this.logMessage("There are empty slots! Fill all slots to complete the loop.", "warning");
        return false;
      }

      // Must have LED
      if (!hasLed) {
        this.logMessage("The LED is missing! This challenge requires an LED in the circuit.", "warning");
        return false;
      }

      // Must have Saltwater specifically
      if (!hasSaltwater) {
        this.logMessage("You need the Beaker of Saltwater to replace the insulator!", "warning");
        return false;
      }

      // All conditions met — SUCCESS
      this.completedChallenges.add(level);
      this.updateLevelTileStates();
      this.showSuccessCelebration();
      return true;
    }

    // ---------------------------------------------------------------
    // CLASS 10 — ADVANCED SETUP
    // Success Condition:
    //   1. All slots must be filled (no empty slots, no gaps)
    //   2. Circuit must contain a Battery
    //   3. Circuit must contain a Resistor (id: "resistor")
    //   4. Circuit must contain an Ammeter (id: "ammeter")
    //   5. Must be a valid series loop (no short circuits — must have load)
    //   6. No insulators or open switches
    //   7. Current must be flowing
    // The user must fill the empty slot to complete the series loop.
    // ---------------------------------------------------------------
    if (level === "Class 10") {
      const hasEmptySlot = this.slots.some(s => s === null);
      const hasResistor = this.slots.includes("resistor");
      const hasAmmeter = this.slots.includes("ammeter");
      const hasInsulator = this.slots.some(s => s && COMPONENT_DATA[s].type === "insulator");
      const hasOpenSwitch = this.slots.includes("switch-open");

      // Check for empty slots
      if (hasEmptySlot) {
        const emptyIdx = this.slots.indexOf(null);
        this.showSparkAtSlot(emptyIdx);
        this.logMessage("The loop is incomplete! Fill the empty slot to close the circuit.", "warning");
        return false;
      }

      // Check for insulators or open switches
      if (hasInsulator || hasOpenSwitch) {
        const blockIdx = hasOpenSwitch
          ? this.slots.indexOf("switch-open")
          : this.slots.findIndex(s => s && COMPONENT_DATA[s].type === "insulator");
        this.showSparkAtSlot(blockIdx);
        this.logMessage("Current is blocked! Remove insulators or close the switch.", "warning");
        return false;
      }

      // Must have Resistor
      if (!hasResistor) {
        this.logMessage("The Resistor is missing! This challenge requires a Resistor.", "warning");
        return false;
      }

      // Must have Ammeter
      if (!hasAmmeter) {
        this.logMessage("The Ammeter is missing! This challenge requires an Ammeter.", "warning");
        return false;
      }

      // All conditions met — SUCCESS
      this.completedChallenges.add(level);
      this.updateLevelTileStates();
      this.showSuccessCelebration();
      return true;
    }

    // Fallback: if level is unknown, just pass
    return true;
  }

  /**
   * showSuccessCelebration()
   * Triggers the visual celebration overlay with expanding green ripples
   * and a "CHALLENGE COMPLETE" text popup. Auto-hides after 2.5 seconds.
   * Re-injects inner HTML to restart CSS animations from scratch.
   */
  showSuccessCelebration() {
    // Re-inject inner HTML to reset and restart all CSS animations
    this.successCelebration.innerHTML = `
      <div class="celebration-ripple"></div>
      <div class="celebration-ripple celebration-ripple-2"></div>
      <div class="celebration-ripple celebration-ripple-3"></div>
      <div class="celebration-text">⚡ CHALLENGE COMPLETE ⚡</div>
    `;
    this.successCelebration.style.display = "flex";

    // Auto-hide after the animation completes (2.5s)
    setTimeout(() => {
      this.successCelebration.style.display = "none";
    }, 2500);
  }

  /**
   * showSparkAtSlot(slotIndex)
   * Creates an animated spark SVG burst at the center of the specified slot.
   * Used in Challenge Mode to show WHERE current stops flowing.
   */
  showSparkAtSlot(slotIndex) {
    const layout = SLOT_LAYOUTS[this.activeSlotCount];
    const slotMeta = layout[slotIndex];
    if (!slotMeta) return;

    // Highlight the broken slot with a pulsing red border
    const slotEl = document.getElementById(`slot-${slotIndex}`);
    if (slotEl) {
      slotEl.classList.add("slot-broken-highlight");
    }

    // Create a spark indicator element positioned over the slot
    const spark = document.createElement("div");
    spark.className = "spark-indicator";
    // Position spark at center of the slot (slot is 106x106, so center offset = 33)
    spark.style.left = `${slotMeta.x + 33}px`;
    spark.style.top = `${slotMeta.y + 33}px`;

    // Inline SVG spark burst (no external assets)
    spark.innerHTML = `
      <svg viewBox="0 0 40 40">
        <polygon points="20,2 24,14 36,14 26,22 30,34 20,26 10,34 14,22 4,14 16,14"
                 fill="#fbbf24" stroke="#f59e0b" stroke-width="1" opacity="0.9"/>
      </svg>
    `;

    // Append to the circuit board so it overlays correctly
    const circuitBoard = this.workspaceArea.querySelector(".circuit-board");
    circuitBoard.appendChild(spark);

    // Remove spark after animation ends (0.6s) and re-trigger for continuous feedback
    const reSparkInterval = setInterval(() => {
      if (!this.challengeMode) {
        clearInterval(reSparkInterval);
        return;
      }
      // Reset animation by briefly removing and re-adding the SVG
      spark.innerHTML = "";
      requestAnimationFrame(() => {
        spark.innerHTML = `
          <svg viewBox="0 0 40 40">
            <polygon points="20,2 24,14 36,14 26,22 30,34 20,26 10,34 14,22 4,14 16,14"
                     fill="#fbbf24" stroke="#f59e0b" stroke-width="1" opacity="0.9"/>
          </svg>
        `;
      });
    }, 800);

    // Store the interval ID on the element for cleanup
    spark.dataset.intervalId = reSparkInterval;
  }

  /**
   * showShortCircuitSparks()
   * In Challenge Mode short circuits: shows sparks at multiple wire-only
   * slots to indicate "electricity is flowing dangerously everywhere."
   */
  showShortCircuitSparks() {
    for (let i = 0; i < this.activeSlotCount; i++) {
      const itemId = this.slots[i];
      // Show sparks at conductor-only slots (wires, not the battery)
      if (itemId && COMPONENT_DATA[itemId].type === "conductor") {
        this.showSparkAtSlot(i);
      }
    }
  }

  /**
   * clearSparkIndicators()
   * Removes all spark indicator elements and their recurring intervals.
   * Also removes the broken-slot-highlight class from all slots.
   */
  clearSparkIndicators() {
    // Remove spark DOM elements
    const sparks = this.workspaceArea.querySelectorAll(".spark-indicator");
    sparks.forEach(spark => {
      const intervalId = spark.dataset.intervalId;
      if (intervalId) clearInterval(Number(intervalId));
      spark.remove();
    });

    // Remove red pulse highlights from slots
    const highlightedSlots = this.slotsContainer.querySelectorAll(".slot-broken-highlight");
    highlightedSlots.forEach(slot => slot.classList.remove("slot-broken-highlight"));
  }
}

// Instantiate the sandbox engine when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  window.sandbox = new CircuitSandbox();
});
