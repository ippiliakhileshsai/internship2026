/* ═══════════════════════════════════════════════════════
   USES PAGE — Interactive JavaScript
   Popup modal with visual simulations, quiz game, carousel
   ═══════════════════════════════════════════════════════ */

// ──── CARD DATA (each card's popup content + simulation) ────
const cardData = {
    'house-wiring': {
        title: '🏠 House Wiring',
        image: 'images/house-wiring.png',
        tags: [
            { type: 'conductor', label: 'Copper Wire' },
            { type: 'insulator', label: 'PVC Plastic Cover' }
        ],
        details: [
            { tag: 'conductor', text: '<strong>Copper wire</strong> — carries current from the main switch to every room. Copper has many free electrons that move easily.' },
            { tag: 'insulator', text: '<strong>PVC plastic</strong> — covers the wire to prevent electric shock. Plastic does not allow electrons to pass through.' }
        ],
        fact: 'Copper is used because it has many free electrons that move easily, making it one of the best conductors after silver.',
        sim: 'wire-cross-section',
        simple: 'Copper wires inside carry electricity to your lights and fans, while the outer plastic cover keeps you safe from electric shocks.',
        analogy: 'Like water flowing inside a hose, electricity flows inside the copper wire while the plastic cover is like the rubber hose keeping the water inside!'
    },
    'phone-charger': {
        title: '🔌 Phone Charger Cable',
        image: 'images/phone-charger.png',
        tags: [
            { type: 'conductor', label: 'Copper Strands' },
            { type: 'insulator', label: 'Rubber Coating' }
        ],
        details: [
            { tag: 'conductor', text: '<strong>Copper strands</strong> — thin wires inside carry current to charge your phone battery.' },
            { tag: 'insulator', text: '<strong>Rubber & plastic</strong> — the outer layer you touch is an insulator that keeps current safely inside.' }
        ],
        fact: 'If the charger cable is damaged and the copper is exposed, you might get an electric shock. Always use cables in good condition!',
        sim: 'charger-flow',
        simple: 'The charger wire has copper inside to carry energy to your phone\'s battery, and a rubber sleeve outside so you can hold it safely.',
        analogy: 'The copper strands are like an open gate letting energy rush to your phone, while the rubber sleeve is like a thick stone wall blocking it from touching your hand.'
    },
    'power-lines': {
        title: '⚡ Power Transmission Lines',
        image: 'images/power-lines.png',
        tags: [
            { type: 'conductor', label: 'Aluminum Cable' },
            { type: 'insulator', label: 'Porcelain Discs' }
        ],
        details: [
            { tag: 'conductor', text: '<strong>Aluminum</strong> — lighter and cheaper than copper, used for long-distance power lines across the country.' },
            { tag: 'insulator', text: '<strong>Porcelain discs</strong> — hold the cables to the pole without letting current escape to the ground.' }
        ],
        fact: 'Aluminum is preferred over copper for overhead lines because it is three times lighter. This reduces the weight on poles and towers!',
        sim: 'power-tower',
        simple: 'Thick aluminum cables carry electricity across long distances. They are hung on poles using porcelain discs so the power doesn\'t escape into the ground.',
        analogy: 'The aluminum cables are highway roads for electricity. The porcelain discs are like isolated bridges that stop electricity from running down the metal towers.'
    },
    'safety-gloves': {
        title: '🧤 Rubber Safety Gloves',
        image: 'images/safety-gloves.png',
        tags: [
            { type: 'insulator', label: 'Rubber' },
            { type: 'insulator', label: 'Rubber-soled Shoes' }
        ],
        details: [
            { tag: 'insulator', text: '<strong>Rubber gloves</strong> — does not have free electrons, so current cannot pass through it to the body.' },
            { tag: 'insulator', text: '<strong>Rubber-soled shoes</strong> — electricians also wear rubber-soled shoes for extra safety from ground current.' }
        ],
        fact: 'This is why we should never touch electric switches or appliances with wet hands — water is a conductor!',
        sim: 'rubber-block',
        simple: 'Electricians wear thick rubber gloves because rubber completely blocks electric current, acting as a shield for their hands.',
        analogy: 'Think of rubber gloves as a bulletproof vest, but for electricity! It completely stops the flow of current from reaching your skin.'
    },
    'switch-board': {
        title: '🎛️ Switch Boards',
        image: 'images/switch-board.png',
        tags: [
            { type: 'conductor', label: 'Metal Contacts' },
            { type: 'insulator', label: 'Plastic Body' }
        ],
        details: [
            { tag: 'conductor', text: '<strong>Metal contacts (brass/copper)</strong> — complete or break the circuit when you flip the switch.' },
            { tag: 'insulator', text: '<strong>Plastic/Bakelite body</strong> — the outer cover prevents shock when you touch the switch.' }
        ],
        fact: 'Bakelite is a special type of plastic used in old switch boards. Modern ones use ABS plastic which is heat-resistant.',
        sim: 'switch-toggle',
        simple: 'Inside, metal parts touch to turn lights ON, or separate to turn them OFF. The plastic cover outside keeps you safe when you flip the switch.',
        analogy: 'Flipping the switch is like opening or closing a drawbridge. ON connects the metal bridge so electricity can cross. OFF pulls it apart.'
    },
    'kitchen': {
        title: '🍳 Kitchen Utensils',
        image: 'images/kitchen-items.png',
        tags: [
            { type: 'conductor', label: 'Steel / Aluminum' },
            { type: 'insulator', label: 'Wooden Handle' }
        ],
        details: [
            { tag: 'conductor', text: '<strong>Steel/Aluminum pans</strong> — metals conduct heat from the stove to cook food evenly.' },
            { tag: 'insulator', text: '<strong>Wooden/Plastic handles</strong> — insulators of heat, so you can hold hot pans safely.' }
        ],
        fact: 'Good conductors of electricity are usually good conductors of heat too! That is why metals feel cold to touch — they conduct heat away from your hand.',
        sim: 'pan-heat',
        simple: 'Metal pans conduct heat to cook food quickly. Wooden or plastic handles are heat insulators, keeping them cool so you don\'t burn your hands.',
        analogy: 'The metal pan is a fast slide for heat to reach the food. The wooden handle is a barricade that stops the heat from reaching your hand.'
    },
    'electric-iron': {
        title: '🔥 Electric Iron',
        image: 'images/electric-iron.png',
        tags: [
            { type: 'conductor', label: 'Nichrome Wire' },
            { type: 'insulator', label: 'Plastic Handle' }
        ],
        details: [
            { tag: 'conductor', text: '<strong>Nichrome wire (heating element)</strong> — a special alloy that resists current and produces heat.' },
            { tag: 'insulator', text: '<strong>Plastic/Wood handle</strong> — you can safely hold the iron while the base is very hot.' }
        ],
        fact: 'Nichrome is used in electric heaters, toasters, and irons because it has high resistance and does not oxidize (burn) easily at high temperatures.',
        sim: 'iron-heat',
        simple: 'Inside the iron, a special metal wire heats up when electricity flows. The plastic handle stays cool so you can hold it safely.',
        analogy: 'The heating wire is like a crowded hallway where electricity has to squeeze through, generating heat. The handle is a plastic shield blocking that heat.'
    },
    'lightning': {
        title: '🌩️ Lightning Conductor',
        image: 'images/lightning-conductor.png',
        tags: [
            { type: 'conductor', label: 'Copper Strip' },
            { type: 'conductor', label: 'Metal Rod' }
        ],
        details: [
            { tag: 'conductor', text: '<strong>Copper strip</strong> — runs from the metal rod on the roof all the way into the ground (earth).' },
            { tag: 'conductor', text: '<strong>Metal rod (pointed tip)</strong> — attracts the lightning charge and provides an easy path to the earth.' }
        ],
        fact: 'Lightning is a giant electric discharge! The conductor gives it a safe path to the earth instead of damaging the building. This is called "earthing."',
        sim: 'lightning-strike',
        simple: 'A tall copper rod on the roof catches lightning and sends it safely into the ground through a copper strip, protecting the building.',
        analogy: 'It\'s a special emergency slide that lightning takes directly to the ground, bypassing the building completely.'
    },
    'fuse': {
        title: '🔧 Fuse Wire',
        image: 'images/fuse-wire.png',
        tags: [
            { type: 'conductor', label: 'Tin-Lead Alloy' },
            { type: 'insulator', label: 'Ceramic Holder' }
        ],
        details: [
            { tag: 'conductor', text: '<strong>Tin-lead alloy wire</strong> — conducts electricity but has a low melting point so it melts on overload.' },
            { tag: 'insulator', text: '<strong>Ceramic/Glass holder</strong> — holds the fuse wire safely inside without conducting.' }
        ],
        fact: 'When excess current flows (overloading), the fuse wire heats up and melts, breaking the circuit. This protects your appliances from damage!',
        sim: 'fuse-melt',
        simple: 'A thin, special wire melts and breaks the connection if too much electricity flows, protecting your home appliances from burning.',
        analogy: 'The fuse is like a weak bridge designed to break if too many heavy trucks (too much current) try to cross, saving the town (appliances) on the other side.'
    },
    'pole-insulator': {
        title: '🏗️ Porcelain Disc Insulators',
        image: 'images/electric-pole.png',
        tags: [
            { type: 'insulator', label: 'Porcelain/Glass Discs' },
            { type: 'conductor', label: 'Aluminum Cable' }
        ],
        details: [
            { tag: 'insulator', text: '<strong>Porcelain/Glass discs</strong> — stacked on the pole arm to prevent current flow into the pole or ground.' },
            { tag: 'conductor', text: '<strong>Aluminum cable</strong> — the live wire held by the insulator discs carries high-voltage electricity.' }
        ],
        fact: 'If the porcelain insulator cracks or gets wet in heavy rain, current can leak through — this is why electricity boards replace damaged insulators regularly.',
        sim: 'disc-insulator',
        simple: 'These heavy clay discs hold electrical cables on poles. They act as strong barriers so high voltage power doesn\'t leak into the pole.',
        analogy: 'The discs are like thick blockades that stand between the high-power wire and the pole, ensuring electricity stays only on its wire path.'
    }
};

// ──── SVG SIMULATION GENERATORS ────
function generateSimulation(simType) {
    const sims = {
        'wire-cross-section': `
            <svg viewBox="0 0 420 220" xmlns="http://www.w3.org/2000/svg">
                <text x="210" y="18" text-anchor="middle" fill="#0d2744" font-size="13" font-weight="800">Cross-Section of an Electrical Wire</text>
                <!-- Outer plastic -->
                <ellipse cx="210" cy="125" rx="140" ry="80" fill="#3b82f6" opacity="0.2" stroke="#3b82f6" stroke-width="2"/>
                <text x="370" y="100" fill="#0d3f9d" font-size="10" font-weight="700">PVC Plastic</text>
                <text x="370" y="114" fill="#0d3f9d" font-size="9">(Insulator)</text>
                <!-- Inner copper -->
                <ellipse cx="210" cy="125" rx="70" ry="40" fill="#f59f00" opacity="0.35" stroke="#c86b2b" stroke-width="2.5"/>
                <text x="210" y="120" text-anchor="middle" fill="#8c5a14" font-size="11" font-weight="800">Copper Core</text>
                <text x="210" y="135" text-anchor="middle" fill="#8c5a14" font-size="9">(Conductor)</text>
                <!-- Electrons flowing -->
                <circle r="5" fill="#5ee7ff"><animate attributeName="cx" values="160;260;160" dur="2s" repeatCount="indefinite"/><animate attributeName="cy" values="125;115;125" dur="2s" repeatCount="indefinite"/></circle>
                <circle r="4" fill="#00d4ff"><animate attributeName="cx" values="260;160;260" dur="2.3s" repeatCount="indefinite"/><animate attributeName="cy" values="130;120;130" dur="2.3s" repeatCount="indefinite"/></circle>
                <circle r="4" fill="#88f0ff"><animate attributeName="cx" values="190;230;190" dur="1.5s" repeatCount="indefinite"/><animate attributeName="cy" values="118;132;118" dur="1.5s" repeatCount="indefinite"/></circle>
                <!-- Labels -->
                <line x1="280" y1="125" x2="355" y2="100" stroke="#3b82f6" stroke-width="1" stroke-dasharray="3,3"/>
                <text x="210" y="200" text-anchor="middle" fill="#5b6d84" font-size="10">⚡ Electrons flow freely through the copper core</text>
                <text x="210" y="215" text-anchor="middle" fill="#5b6d84" font-size="10">🛡️ Plastic shell blocks current from escaping</text>
            </svg>`,

        'charger-flow': `
            <svg viewBox="0 0 420 220" xmlns="http://www.w3.org/2000/svg">
                <text x="210" y="18" text-anchor="middle" fill="#0d2744" font-size="13" font-weight="800">How a Charger Cable Works</text>
                <!-- Plug -->
                <rect x="20" y="80" width="60" height="60" rx="8" fill="#23364d"/>
                <rect x="30" y="95" width="8" height="30" rx="2" fill="#c86b2b"/>
                <rect x="50" y="95" width="8" height="30" rx="2" fill="#c86b2b"/>
                <text x="50" y="160" text-anchor="middle" fill="#5b6d84" font-size="9" font-weight="700">Wall Plug</text>
                <!-- Cable -->
                <rect x="80" y="100" width="210" height="20" rx="10" fill="#64748b"/>
                <rect x="90" y="105" width="190" height="10" rx="5" fill="#c86b2b" opacity="0.6"/>
                <text x="185" y="90" text-anchor="middle" fill="#8c5a14" font-size="9" font-weight="700">Copper inside (Conductor)</text>
                <text x="185" y="135" text-anchor="middle" fill="#475569" font-size="9" font-weight="700">Rubber outside (Insulator)</text>
                <!-- Phone -->
                <rect x="295" y="65" width="100" height="90" rx="14" fill="#1e293b" stroke="#475569" stroke-width="2"/>
                <rect x="305" y="75" width="80" height="60" rx="6" fill="#0ea5e9" opacity="0.3"/>
                <text x="345" y="110" text-anchor="middle" fill="#fff" font-size="11" font-weight="800">🔋 78%</text>
                <text x="345" y="170" text-anchor="middle" fill="#5b6d84" font-size="9" font-weight="700">Phone</text>
                <!-- Electrons -->
                <circle r="5" fill="#5ee7ff" filter="url(#glow)"><animate attributeName="cx" values="90;280;90" dur="2s" repeatCount="indefinite"/><animate attributeName="cy" values="110;110;110" dur="2s" repeatCount="indefinite"/></circle>
                <circle r="4" fill="#00d4ff"><animate attributeName="cx" values="280;90;280" dur="2.5s" repeatCount="indefinite"/><animate attributeName="cy" values="110;110;110" dur="2.5s" repeatCount="indefinite"/></circle>
                <!-- Arrow -->
                <text x="210" y="200" text-anchor="middle" fill="#19a76f" font-size="11" font-weight="700">⚡ Current flows → Copper → Phone Battery</text>
            </svg>`,

        'power-tower': `
            <svg viewBox="0 0 420 220" xmlns="http://www.w3.org/2000/svg">
                <text x="210" y="18" text-anchor="middle" fill="#0d2744" font-size="13" font-weight="800">Power Transmission System</text>
                <!-- Tower 1 -->
                <line x1="80" y1="200" x2="80" y2="50" stroke="#475569" stroke-width="4"/>
                <line x1="60" y1="200" x2="100" y2="200" stroke="#475569" stroke-width="4"/>
                <line x1="60" y1="60" x2="100" y2="60" stroke="#475569" stroke-width="3"/>
                <!-- Tower 2 -->
                <line x1="340" y1="200" x2="340" y2="50" stroke="#475569" stroke-width="4"/>
                <line x1="320" y1="200" x2="360" y2="200" stroke="#475569" stroke-width="4"/>
                <line x1="320" y1="60" x2="360" y2="60" stroke="#475569" stroke-width="3"/>
                <!-- Wires -->
                <path d="M 100 60 Q 210 45 320 60" stroke="#c86b2b" stroke-width="3" fill="none"/>
                <path d="M 100 80 Q 210 65 320 80" stroke="#c86b2b" stroke-width="3" fill="none"/>
                <!-- Insulators -->
                <circle cx="100" cy="60" r="8" fill="#eef4ff" stroke="#3b82f6" stroke-width="2"/>
                <circle cx="320" cy="60" r="8" fill="#eef4ff" stroke="#3b82f6" stroke-width="2"/>
                <circle cx="100" cy="80" r="8" fill="#eef4ff" stroke="#3b82f6" stroke-width="2"/>
                <circle cx="320" cy="80" r="8" fill="#eef4ff" stroke="#3b82f6" stroke-width="2"/>
                <!-- Electrons on wire -->
                <circle r="5" fill="#5ee7ff"><animateMotion dur="3s" repeatCount="indefinite" path="M 100 60 Q 210 45 320 60"/></circle>
                <circle r="4" fill="#00d4ff"><animateMotion dur="3s" repeatCount="indefinite" begin="1s" path="M 100 80 Q 210 65 320 80"/></circle>
                <!-- Labels -->
                <rect x="145" y="100" width="130" height="22" rx="6" fill="#fff8e8" stroke="#c86b2b" stroke-width="1"/>
                <text x="210" y="115" text-anchor="middle" fill="#8c5a14" font-size="9" font-weight="800">⚡ Aluminum Cable</text>
                <rect x="30" y="35" width="90" height="18" rx="6" fill="#eef4ff" stroke="#3b82f6" stroke-width="1"/>
                <text x="75" y="48" text-anchor="middle" fill="#0d3f9d" font-size="8" font-weight="700">🛡️ Porcelain Disc</text>
                <text x="210" y="195" text-anchor="middle" fill="#5b6d84" font-size="10">Electricity travels 100s of km through aluminum wires</text>
                <text x="210" y="210" text-anchor="middle" fill="#5b6d84" font-size="10">Porcelain discs stop current from leaking into poles</text>
            </svg>`,

        'rubber-block': `
            <svg viewBox="0 0 420 220" xmlns="http://www.w3.org/2000/svg">
                <text x="210" y="18" text-anchor="middle" fill="#0d2744" font-size="13" font-weight="800">How Rubber Gloves Protect You</text>
                <!-- Live wire -->
                <rect x="20" y="90" width="120" height="12" rx="6" fill="#c86b2b"/>
                <text x="80" y="85" text-anchor="middle" fill="#8c5a14" font-size="9" font-weight="700">⚡ Live Wire</text>
                <!-- Electrons coming -->
                <circle r="5" fill="#5ee7ff"><animate attributeName="cx" values="30;130;130" dur="2s" repeatCount="indefinite"/><animate attributeName="cy" values="96;96;96" dur="2s" repeatCount="indefinite"/></circle>
                <circle r="4" fill="#ea4d5c"><animate attributeName="cx" values="50;130;130" dur="2.2s" repeatCount="indefinite"/><animate attributeName="cy" values="96;96;96" dur="2.2s" repeatCount="indefinite"/></circle>
                <!-- Rubber glove -->
                <rect x="140" y="55" width="70" height="110" rx="20" fill="#3b82f6" opacity="0.25" stroke="#3b82f6" stroke-width="2.5"/>
                <text x="175" y="105" text-anchor="middle" fill="#0d3f9d" font-size="9" font-weight="800">RUBBER</text>
                <text x="175" y="118" text-anchor="middle" fill="#0d3f9d" font-size="8">🛡️ Blocks</text>
                <!-- X marks -->
                <text x="175" y="145" text-anchor="middle" fill="#ea4d5c" font-size="18" font-weight="900">✕</text>
                <!-- Hand -->
                <ellipse cx="280" cy="110" rx="50" ry="45" fill="#fde68a" opacity="0.4" stroke="#f59f00" stroke-width="1.5"/>
                <text x="280" y="108" text-anchor="middle" font-size="28">🤚</text>
                <text x="280" y="165" text-anchor="middle" fill="#19a76f" font-size="10" font-weight="700">✅ Hand is SAFE!</text>
                <!-- Summary -->
                <text x="210" y="200" text-anchor="middle" fill="#5b6d84" font-size="10">Rubber has NO free electrons → Current CANNOT pass through</text>
                <text x="210" y="215" text-anchor="middle" fill="#ea4d5c" font-size="10" font-weight="700">Without gloves = Electric shock danger! ⚠️</text>
            </svg>`,

        'switch-toggle': `
            <svg viewBox="0 0 420 220" xmlns="http://www.w3.org/2000/svg">
                <text x="210" y="18" text-anchor="middle" fill="#0d2744" font-size="13" font-weight="800">How a Switch Board Works</text>
                <!-- Switch body (insulator) -->
                <rect x="130" y="40" width="160" height="140" rx="18" fill="#eef4ff" stroke="#3b82f6" stroke-width="2"/>
                <text x="210" y="188" text-anchor="middle" fill="#0d3f9d" font-size="9" font-weight="700">Plastic Body (Insulator) 🛡️</text>
                <!-- Metal contacts -->
                <rect x="160" y="70" width="30" height="50" rx="4" fill="#c86b2b" stroke="#8c5a14" stroke-width="1.5"/>
                <text x="175" y="65" text-anchor="middle" fill="#8c5a14" font-size="8" font-weight="700">Contact A</text>
                <rect x="230" y="70" width="30" height="50" rx="4" fill="#c86b2b" stroke="#8c5a14" stroke-width="1.5"/>
                <text x="245" y="65" text-anchor="middle" fill="#8c5a14" font-size="8" font-weight="700">Contact B</text>
                <!-- Switch lever -->
                <rect x="175" y="88" width="70" height="14" rx="7" fill="#f59f00" stroke="#c86b2b" stroke-width="1.5">
                    <animate attributeName="x" values="175;175;175" dur="3s" repeatCount="indefinite"/>
                </rect>
                <text x="210" y="100" text-anchor="middle" fill="#fff" font-size="7" font-weight="900">ON</text>
                <!-- Wire in -->
                <rect x="40" y="88" width="90" height="8" rx="4" fill="#c86b2b"/>
                <!-- Wire out -->
                <rect x="290" y="88" width="90" height="8" rx="4" fill="#c86b2b"/>
                <!-- Electron flow -->
                <circle r="5" fill="#5ee7ff"><animate attributeName="cx" values="50;370;50" dur="2.5s" repeatCount="indefinite"/><animate attributeName="cy" values="92;92;92" dur="2.5s" repeatCount="indefinite"/></circle>
                <circle r="4" fill="#00d4ff"><animate attributeName="cx" values="370;50;370" dur="3s" repeatCount="indefinite"/><animate attributeName="cy" values="92;92;92" dur="3s" repeatCount="indefinite"/></circle>
                <!-- Bulb -->
                <circle cx="400" cy="92" r="15" fill="#ffbf1f" opacity="0.4"><animate attributeName="opacity" values="0.3;0.8;0.3" dur="1.5s" repeatCount="indefinite"/></circle>
                <text x="400" y="97" text-anchor="middle" font-size="14">💡</text>
                <!-- Labels -->
                <text x="80" y="82" text-anchor="middle" fill="#8c5a14" font-size="8" font-weight="700">Wire In</text>
                <text x="340" y="82" text-anchor="middle" fill="#8c5a14" font-size="8" font-weight="700">Wire Out</text>
                <text x="210" y="210" text-anchor="middle" fill="#5b6d84" font-size="10">When ON: metal contacts touch → circuit complete → bulb glows!</text>
            </svg>`,

        'pan-heat': `
            <svg viewBox="0 0 420 220" xmlns="http://www.w3.org/2000/svg">
                <text x="210" y="18" text-anchor="middle" fill="#0d2744" font-size="13" font-weight="800">Heat Conduction in Kitchen Utensils</text>
                <!-- Stove -->
                <rect x="60" y="170" width="180" height="30" rx="6" fill="#ea4d5c" opacity="0.3" stroke="#ea4d5c" stroke-width="1.5"/>
                <text x="150" y="190" text-anchor="middle" fill="#ea4d5c" font-size="10" font-weight="700">🔥 Stove (Heat Source)</text>
                <!-- Pan body -->
                <path d="M 80 170 L 80 120 Q 80 100 100 100 L 200 100 Q 220 100 220 120 L 220 170" fill="#94a3b8" stroke="#475569" stroke-width="2"/>
                <text x="150" y="145" text-anchor="middle" fill="#1e293b" font-size="10" font-weight="800">Steel Pan</text>
                <text x="150" y="160" text-anchor="middle" fill="#475569" font-size="8">(Conductor of Heat)</text>
                <!-- Heat waves in pan -->
                <circle r="4" fill="#ea4d5c" opacity="0.6"><animate attributeName="cy" values="165;110;165" dur="2s" repeatCount="indefinite"/><animate attributeName="cx" values="120;140;120" dur="2s" repeatCount="indefinite"/></circle>
                <circle r="3" fill="#f59f00" opacity="0.5"><animate attributeName="cy" values="165;115;165" dur="2.3s" repeatCount="indefinite"/><animate attributeName="cx" values="170;150;170" dur="2.3s" repeatCount="indefinite"/></circle>
                <!-- Handle -->
                <rect x="220" y="95" width="100" height="18" rx="9" fill="#92400e" stroke="#78350f" stroke-width="1.5"/>
                <text x="270" y="108" text-anchor="middle" fill="#fff" font-size="8" font-weight="800">Wooden Handle</text>
                <!-- Hand on handle -->
                <text x="340" y="110" font-size="22">🤚</text>
                <text x="350" y="140" text-anchor="middle" fill="#19a76f" font-size="9" font-weight="700">Cool to touch!</text>
                <!-- Heat blocked -->
                <line x1="220" y1="85" x2="220" y2="125" stroke="#ea4d5c" stroke-width="2" stroke-dasharray="4,3"/>
                <text x="225" y="80" fill="#ea4d5c" font-size="12" font-weight="900">✕</text>
                <text x="210" y="215" text-anchor="middle" fill="#5b6d84" font-size="10">Steel conducts heat to cook food 🍳 | Wood blocks heat to protect your hand 🤚</text>
            </svg>`,

        'iron-heat': `
            <svg viewBox="0 0 420 220" xmlns="http://www.w3.org/2000/svg">
                <text x="210" y="18" text-anchor="middle" fill="#0d2744" font-size="13" font-weight="800">Inside an Electric Iron</text>
                <!-- Iron body -->
                <path d="M 80 80 L 320 80 L 350 150 L 50 150 Z" fill="#94a3b8" stroke="#475569" stroke-width="2"/>
                <!-- Nichrome coil -->
                <path d="M 100 120 Q 120 100 140 120 Q 160 140 180 120 Q 200 100 220 120 Q 240 140 260 120 Q 280 100 300 120" stroke="#ea4d5c" stroke-width="3" fill="none">
                </path>
                <text x="200" y="115" text-anchor="middle" fill="#fff" font-size="9" font-weight="800">Nichrome Coil (Conductor)</text>
                <!-- Heat glow -->
                <circle r="4" fill="#f59f00" opacity="0.5"><animate attributeName="cx" values="120;280;120" dur="2s" repeatCount="indefinite"/><animate attributeName="cy" values="130;130;130" dur="2s" repeatCount="indefinite"/></circle>
                <circle r="3" fill="#ea4d5c" opacity="0.4"><animate attributeName="cx" values="280;120;280" dur="2.5s" repeatCount="indefinite"/><animate attributeName="cy" values="135;125;135" dur="2.5s" repeatCount="indefinite"/></circle>
                <!-- Heat rising -->
                <text x="120" y="160" fill="#ea4d5c" font-size="10" opacity="0.7">🔥</text>
                <text x="200" y="165" fill="#ea4d5c" font-size="10" opacity="0.7">🔥</text>
                <text x="280" y="160" fill="#ea4d5c" font-size="10" opacity="0.7">🔥</text>
                <!-- Handle -->
                <rect x="150" y="55" width="120" height="28" rx="10" fill="#92400e" stroke="#78350f" stroke-width="1.5"/>
                <text x="210" y="74" text-anchor="middle" fill="#fff" font-size="9" font-weight="800">Plastic Handle (Insulator)</text>
                <!-- Power cord -->
                <rect x="320" y="60" width="80" height="8" rx="4" fill="#64748b"/>
                <text x="360" y="55" text-anchor="middle" fill="#5b6d84" font-size="8" font-weight="700">Power Cable</text>
                <text x="210" y="195" text-anchor="middle" fill="#5b6d84" font-size="10">Current → Nichrome wire → Heats up (high resistance) → Presses clothes</text>
                <text x="210" y="212" text-anchor="middle" fill="#19a76f" font-size="10" font-weight="700">Handle stays cool because plastic is an insulator! ✅</text>
            </svg>`,

        'lightning-strike': `
            <svg viewBox="0 0 420 220" xmlns="http://www.w3.org/2000/svg">
                <text x="210" y="15" text-anchor="middle" fill="#0d2744" font-size="13" font-weight="800">How a Lightning Conductor Works</text>
                <!-- Cloud -->
                <ellipse cx="210" cy="38" rx="80" ry="20" fill="#64748b" opacity="0.3"/>
                <text x="210" y="42" text-anchor="middle" fill="#475569" font-size="9" font-weight="700">⛈️ Storm Cloud</text>
                <!-- Building -->
                <rect x="150" y="85" width="120" height="115" rx="4" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5"/>
                <rect x="165" y="100" width="25" height="25" rx="3" fill="#bfdbfe"/>
                <rect x="225" y="100" width="25" height="25" rx="3" fill="#bfdbfe"/>
                <rect x="165" y="140" width="25" height="25" rx="3" fill="#bfdbfe"/>
                <rect x="225" y="140" width="25" height="25" rx="3" fill="#bfdbfe"/>
                <text x="210" y="190" text-anchor="middle" fill="#475569" font-size="9" font-weight="700">Building</text>
                <!-- Metal rod -->
                <line x1="210" y1="85" x2="210" y2="55" stroke="#c86b2b" stroke-width="4"/>
                <circle cx="210" cy="55" r="4" fill="#f59f00"/>
                <text x="250" y="65" fill="#8c5a14" font-size="8" font-weight="700">Metal Rod ↑</text>
                <!-- Copper strip down -->
                <line x1="270" y1="85" x2="270" y2="200" stroke="#c86b2b" stroke-width="3" stroke-dasharray="6,3"/>
                <text x="310" y="145" fill="#8c5a14" font-size="8" font-weight="700">Copper Strip</text>
                <!-- Earth -->
                <rect x="250" y="195" width="40" height="15" rx="3" fill="#92400e"/>
                <text x="270" y="215" text-anchor="middle" fill="#78350f" font-size="8" font-weight="700">Earth (Ground)</text>
                <!-- Lightning bolt -->
                <polygon points="210,38 205,60 215,60" fill="#ffbf1f">
                    <animate attributeName="opacity" values="0;1;1;0" dur="3s" repeatCount="indefinite"/>
                </polygon>
                <!-- Current flow -->
                <circle r="5" fill="#ffbf1f">
                    <animate attributeName="cx" values="210;270;270" dur="2s" repeatCount="indefinite"/>
                    <animate attributeName="cy" values="58;85;200" dur="2s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0;1;1;0" dur="2s" repeatCount="indefinite"/>
                </circle>
            </svg>`,

        'fuse-melt': `
            <svg viewBox="0 0 420 220" xmlns="http://www.w3.org/2000/svg">
                <text x="210" y="18" text-anchor="middle" fill="#0d2744" font-size="13" font-weight="800">How a Fuse Wire Protects Appliances</text>
                <!-- Normal state -->
                <text x="130" y="55" text-anchor="middle" fill="#19a76f" font-size="11" font-weight="800">Normal Current ✅</text>
                <rect x="40" y="70" width="60" height="30" rx="6" fill="#fff8e8" stroke="#c86b2b" stroke-width="1.5"/>
                <text x="70" y="90" text-anchor="middle" fill="#8c5a14" font-size="8" font-weight="700">Source</text>
                <line x1="100" y1="85" x2="140" y2="85" stroke="#c86b2b" stroke-width="3"/>
                <!-- Fuse holder -->
                <rect x="140" y="70" width="60" height="30" rx="10" fill="#e2e8f0" stroke="#94a3b8" stroke-width="2"/>
                <line x1="150" y1="85" x2="190" y2="85" stroke="#f59f00" stroke-width="2"/>
                <text x="170" y="67" text-anchor="middle" fill="#5b6d84" font-size="8" font-weight="700">Fuse Wire</text>
                <line x1="200" y1="85" x2="240" y2="85" stroke="#c86b2b" stroke-width="3"/>
                <text x="260" y="90" text-anchor="middle" font-size="16">💡</text>
                <!-- Electron -->
                <circle r="4" fill="#5ee7ff"><animate attributeName="cx" values="50;250;50" dur="2s" repeatCount="indefinite"/><animate attributeName="cy" values="85;85;85" dur="2s" repeatCount="indefinite"/></circle>

                <!-- Overload state -->
                <text x="130" y="145" text-anchor="middle" fill="#ea4d5c" font-size="11" font-weight="800">Excess Current ⚠️</text>
                <rect x="40" y="155" width="60" height="30" rx="6" fill="#fff1f2" stroke="#ea4d5c" stroke-width="1.5"/>
                <text x="70" y="175" text-anchor="middle" fill="#ea4d5c" font-size="8" font-weight="700">Overload!</text>
                <line x1="100" y1="170" x2="140" y2="170" stroke="#c86b2b" stroke-width="3"/>
                <rect x="140" y="155" width="60" height="30" rx="10" fill="#fff1f2" stroke="#ea4d5c" stroke-width="2"/>
                <!-- Broken wire -->
                <line x1="150" y1="170" x2="162" y2="170" stroke="#ea4d5c" stroke-width="2"/>
                <line x1="178" y1="170" x2="190" y2="170" stroke="#ea4d5c" stroke-width="2"/>
                <text x="170" y="173" text-anchor="middle" fill="#ea4d5c" font-size="10" font-weight="900">✕</text>
                <text x="170" y="152" text-anchor="middle" fill="#ea4d5c" font-size="8" font-weight="700">MELTED!</text>
                <text x="170" y="200" text-anchor="middle" fill="#ea4d5c" font-size="8">Wire melts → breaks circuit</text>
                <line x1="200" y1="170" x2="240" y2="170" stroke="#94a3b8" stroke-width="3" stroke-dasharray="4,4"/>
                <text x="260" y="175" text-anchor="middle" font-size="14" opacity="0.4">💡</text>
                <text x="290" y="175" fill="#5b6d84" font-size="9">OFF</text>
                <text x="210" y="218" text-anchor="middle" fill="#19a76f" font-size="10" font-weight="700">Fuse protects your appliances by breaking the circuit! 🛡️</text>
            </svg>`,

        'disc-insulator': `
            <svg viewBox="0 0 420 220" xmlns="http://www.w3.org/2000/svg">
                <text x="210" y="18" text-anchor="middle" fill="#0d2744" font-size="13" font-weight="800">Porcelain Disc Insulators on Electric Poles</text>
                <!-- Pole -->
                <rect x="195" y="50" width="30" height="160" rx="3" fill="#92400e" stroke="#78350f" stroke-width="1.5"/>
                <text x="210" y="215" text-anchor="middle" fill="#78350f" font-size="9" font-weight="700">Wooden / Concrete Pole</text>
                <!-- Pole arm -->
                <rect x="100" y="65" width="100" height="10" rx="3" fill="#475569"/>
                <rect x="220" y="65" width="100" height="10" rx="3" fill="#475569"/>
                <!-- Insulator discs (left) -->
                <ellipse cx="100" cy="80" rx="18" ry="8" fill="#eef4ff" stroke="#3b82f6" stroke-width="2"/>
                <ellipse cx="100" cy="92" rx="18" ry="8" fill="#eef4ff" stroke="#3b82f6" stroke-width="2"/>
                <ellipse cx="100" cy="104" rx="18" ry="8" fill="#eef4ff" stroke="#3b82f6" stroke-width="2"/>
                <!-- Insulator discs (right) -->
                <ellipse cx="320" cy="80" rx="18" ry="8" fill="#eef4ff" stroke="#3b82f6" stroke-width="2"/>
                <ellipse cx="320" cy="92" rx="18" ry="8" fill="#eef4ff" stroke="#3b82f6" stroke-width="2"/>
                <ellipse cx="320" cy="104" rx="18" ry="8" fill="#eef4ff" stroke="#3b82f6" stroke-width="2"/>
                <!-- Wire -->
                <line x1="30" y1="112" x2="100" y2="112" stroke="#c86b2b" stroke-width="4"/>
                <line x1="320" y1="112" x2="390" y2="112" stroke="#c86b2b" stroke-width="4"/>
                <!-- Electrons on wire -->
                <circle r="5" fill="#5ee7ff"><animate attributeName="cx" values="30;100;100" dur="1.5s" repeatCount="indefinite"/><animate attributeName="cy" values="112;112;112" dur="1.5s" repeatCount="indefinite"/></circle>
                <circle r="5" fill="#5ee7ff"><animate attributeName="cx" values="320;390;390" dur="1.5s" repeatCount="indefinite"/><animate attributeName="cy" values="112;112;112" dur="1.5s" repeatCount="indefinite"/></circle>
                <!-- Block arrows -->
                <text x="100" y="130" text-anchor="middle" fill="#ea4d5c" font-size="12" font-weight="900">✕</text>
                <text x="320" y="130" text-anchor="middle" fill="#ea4d5c" font-size="12" font-weight="900">✕</text>
                <!-- Labels -->
                <rect x="30" y="140" width="85" height="18" rx="6" fill="#eef4ff" stroke="#3b82f6" stroke-width="1"/>
                <text x="72" y="153" text-anchor="middle" fill="#0d3f9d" font-size="8" font-weight="700">🛡️ Porcelain Discs</text>
                <rect x="55" y="160" width="60" height="14" rx="4" fill="#fff8e8" stroke="#c86b2b" stroke-width="1"/>
                <text x="85" y="171" text-anchor="middle" fill="#8c5a14" font-size="7" font-weight="700">⚡ Aluminum Wire</text>
                <text x="210" y="195" text-anchor="middle" fill="#5b6d84" font-size="10">Current stays in the wire → Porcelain blocks it from entering the pole</text>
            </svg>`
    };

    return sims[simType] || '<svg viewBox="0 0 420 220"><text x="210" y="110" text-anchor="middle" fill="#5b6d84">Simulation</text></svg>';
}

// ──── POPUP MODAL LOGIC ────
const overlay = document.getElementById('simOverlay');
const modal = overlay.querySelector('.sim-modal');
const closeBtn = document.getElementById('simClose');

function openCardPopup(cardId) {
    const data = cardData[cardId];
    if (!data) return;

    // Set image
    const img = document.getElementById('simImage');
    img.src = data.image;
    img.alt = data.title;

    // Set title
    document.getElementById('simTitle').textContent = data.title;

    // Set analogy
    const analogyEl = document.getElementById('simAnalogy');
    if (analogyEl) {
        analogyEl.innerHTML = data.analogy ? `<div class="analogy-badge">💡 Analogy</div> <span class="analogy-text">${data.analogy}</span>` : '';
    }

    // Set tags
    const tagsEl = document.getElementById('simTags');
    tagsEl.innerHTML = data.tags.map(t =>
        `<span class="sim-tag ${t.type}"><span>${t.type === 'conductor' ? '⚡' : '🛡️'}</span> ${t.label}</span>`
    ).join('');

    // Set simple explanation
    const simpleEl = document.getElementById('simSimple');
    if (simpleEl) {
        simpleEl.textContent = data.simple || '';
    }

    // Set details
    const detailsEl = document.getElementById('simDetails');
    detailsEl.innerHTML = data.details.map(d =>
        `<div class="sim-detail-row">
            <span class="detail-tag ${d.tag}-tag">${d.tag === 'conductor' ? 'Conductor' : 'Insulator'}</span>
            <span class="detail-text">${d.text}</span>
        </div>`
    ).join('');

    // Set fact
    document.getElementById('simFact').innerHTML =
        `<span class="fact-icon">💡</span><span class="fact-text">${data.fact}</span>`;

    // Set simulation SVG
    document.getElementById('simCanvas').innerHTML = generateSimulation(data.sim);

    // Show modal
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Card click handlers
document.querySelectorAll('.visual-use-card').forEach(card => {
    card.addEventListener('click', () => {
        openCardPopup(card.dataset.cardId);
    });
    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openCardPopup(card.dataset.cardId);
        }
    });
});

// Close handlers
closeBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) closeModal();
});

// ──── SPOT THE CONDUCTOR/INSULATOR GAME ────
const spotItems = [
    { emoji: '🥄', name: 'Steel Spoon', type: 'conductor', hint: 'Steel is a metal. Does it let electricity pass?', explanation: 'Steel is a metal and has free electrons. It is a good conductor of electricity!' },
    { emoji: '📏', name: 'Wooden Ruler', type: 'insulator', hint: 'Wood comes from trees. Can electricity flow through it?', explanation: 'Wood does not have free electrons. It is an insulator that blocks electricity.' },
    { emoji: '🪙', name: 'Coin (Metal)', type: 'conductor', hint: 'Coins are made of metals like copper and nickel.', explanation: 'Coins are made of metals like copper, nickel, and zinc — all are good conductors!' },
    { emoji: '🧤', name: 'Rubber Glove', type: 'insulator', hint: 'Electricians wear rubber gloves for a reason!', explanation: 'Rubber is one of the best insulators. That is why electricians use rubber gloves for protection.' },
    { emoji: '🔑', name: 'Iron Key', type: 'conductor', hint: 'Keys are made of iron or brass.', explanation: 'Iron is a metal with free electrons. Keys made of iron or brass conduct electricity well.' },
    { emoji: '📕', name: 'Notebook (Paper)', type: 'insulator', hint: 'Paper is made from wood pulp.', explanation: 'Paper comes from wood. Like wood, it does not have free electrons, so it is an insulator.' },
    { emoji: '💧', name: 'Tap Water', type: 'conductor', hint: 'Tap water has dissolved minerals and salts.', explanation: 'Tap water contains dissolved salts that create ions. These ions help electricity flow — making it a conductor!' },
    { emoji: '🪵', name: 'Dry Wood', type: 'insulator', hint: 'Is wood a metal or non-metal?', explanation: 'Dry wood is a non-metal and an insulator. However, wet wood can conduct electricity because water with salts is a conductor!' },
    { emoji: '✏️', name: 'Graphite (Pencil Lead)', type: 'conductor', hint: 'Graphite is a special form of carbon...', explanation: 'Graphite is the only non-metal that conducts electricity! The carbon atoms are arranged in layers with free electrons between them.' },
    { emoji: '🫙', name: 'Glass Jar', type: 'insulator', hint: 'Glass is used on electric poles as insulators.', explanation: 'Glass does not allow electricity to pass through it. That is why glass disc insulators are used on electric poles!' }
];

let currentSpotIndex = 0;
let spotScore = 0;
let spotAnswered = false;
let spotMisses = 0;
let currentStreak = 0;
let bestStreak = 0;
let spotStartTime = Date.now();

function initSpotGame() {
    currentSpotIndex = 0;
    spotScore = 0;
    spotAnswered = false;
    spotMisses = 0;
    currentStreak = 0;
    bestStreak = 0;
    spotStartTime = Date.now();
    for (let i = spotItems.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [spotItems[i], spotItems[j]] = [spotItems[j], spotItems[i]];
    }
    showSpotItem();
    updateSpotProgress();
    updateSpotStats();
    document.getElementById('spotCard').style.display = 'block';
    document.getElementById('spotResult').style.display = 'none';
}

function showSpotItem() {
    const item = spotItems[currentSpotIndex];
    document.getElementById('spotEmoji').textContent = item.emoji;
    document.getElementById('spotName').textContent = item.name;
    document.getElementById('spotHint').textContent = item.hint;
    document.getElementById('spotFeedback').innerHTML = '';
    document.getElementById('spotFeedback').className = 'spot-feedback';
    document.getElementById('btnConductor').disabled = false;
    document.getElementById('btnInsulator').disabled = false;
    const nextBtn = document.getElementById('spotNextBtn');
    if (nextBtn) nextBtn.hidden = true;
    const miniCircuit = document.getElementById('spotMiniCircuit');
    if (miniCircuit) miniCircuit.className = 'spot-mini-circuit';
    const testGap = document.getElementById('spotTestGap');
    if (testGap) testGap.textContent = item.emoji;
    spotAnswered = false;
    const emojiEl = document.getElementById('spotEmoji');
    emojiEl.style.animation = 'none';
    emojiEl.offsetHeight;
    emojiEl.style.animation = '';
}

function updateSpotProgress() {
    const pct = (currentSpotIndex / spotItems.length) * 100;
    document.getElementById('spotFill').style.width = pct + '%';
    document.getElementById('spotScoreText').textContent = `${currentSpotIndex} / ${spotItems.length}`;
}

function updateSpotStats() {
    const streakEl = document.getElementById('spotStreak');
    const missesEl = document.getElementById('spotMisses');
    const levelEl = document.getElementById('spotLevel');
    if (streakEl) streakEl.textContent = currentStreak;
    if (missesEl) missesEl.textContent = spotMisses;
    if (levelEl) {
        if (spotScore >= 8) levelEl.textContent = 'Master';
        else if (spotScore >= 5) levelEl.textContent = 'Explorer';
        else if (currentSpotIndex > 0) levelEl.textContent = 'Builder';
        else levelEl.textContent = 'Start';
    }
}

function spotAnswer(answer) {
    if (spotAnswered) return;
    spotAnswered = true;
    const item = spotItems[currentSpotIndex];
    const isCorrect = answer === item.type;
    const feedback = document.getElementById('spotFeedback');
    document.getElementById('btnConductor').disabled = true;
    document.getElementById('btnInsulator').disabled = true;
    const miniCircuit = document.getElementById('spotMiniCircuit');
    if (miniCircuit) {
        miniCircuit.className = `spot-mini-circuit ${item.type === 'conductor' ? 'flowing' : 'blocked'}`;
    }
    if (isCorrect) {
        spotScore++;
        currentStreak++;
        bestStreak = Math.max(bestStreak, currentStreak);
        feedback.className = 'spot-feedback correct-feedback';
        feedback.innerHTML = `✅ <strong>Correct!</strong> ${item.explanation}`;
    } else {
        spotMisses++;
        currentStreak = 0;
        feedback.className = 'spot-feedback wrong-feedback';
        const correctType = item.type.charAt(0).toUpperCase() + item.type.slice(1);
        feedback.innerHTML = `❌ <strong>Not quite!</strong> ${item.name} is a <strong>${correctType}</strong>. ${item.explanation}`;
    }
    updateSpotStats();
    const nextBtn = document.getElementById('spotNextBtn');
    if (nextBtn) {
        nextBtn.hidden = false;
        nextBtn.textContent = currentSpotIndex + 1 < spotItems.length ? 'Next item' : 'See result analysis';
    }
}

function nextSpotItem() {
    if (!spotAnswered) return;
    currentSpotIndex++;
    updateSpotProgress();
    if (currentSpotIndex < spotItems.length) showSpotItem();
    else showSpotResult();
}

function showSpotResult() {
    document.getElementById('spotCard').style.display = 'none';
    const result = document.getElementById('spotResult');
    result.style.display = 'block';
    document.getElementById('spotFill').style.width = '100%';
    document.getElementById('spotScoreText').textContent = `${spotScore} / ${spotItems.length}`;
    const pct = (spotScore / spotItems.length) * 100;
    let icon, title, text;
    if (pct >= 90) { icon = '🏆'; title = "Outstanding! You're a Science Star! ⭐"; text = `You got ${spotScore} out of ${spotItems.length} correct! You truly understand conductors and insulators.`; }
    else if (pct >= 70) { icon = '🎉'; title = 'Great Job!'; text = `You got ${spotScore} out of ${spotItems.length} correct! Keep practising to become a science champion!`; }
    else if (pct >= 50) { icon = '👍'; title = 'Good Effort!'; text = `You got ${spotScore} out of ${spotItems.length} correct. Read through the cards above and try again!`; }
    else { icon = '📚'; title = 'Keep Learning!'; text = `You got ${spotScore} out of ${spotItems.length} correct. Go through the examples on this page and give it another try!`; }
    document.getElementById('spotResultIcon').textContent = icon;
    document.getElementById('spotResultTitle').textContent = title;
    document.getElementById('spotResultText').textContent = text;
    const secondsSpent = Math.max(1, Math.round((Date.now() - spotStartTime) / 1000));
    const badges = [];
    if (pct >= 80) badges.push('Sharp Sorter');
    if (bestStreak >= 4) badges.push('Streak Builder');
    if (spotMisses <= 2) badges.push('Careful Observer');
    if (badges.length === 0) badges.push('Practice Mode');
    const badgeRack = document.getElementById('spotBadgeRack');
    if (badgeRack) badgeRack.innerHTML = badges.map(badge => `<span>${badge}</span>`).join('');
    const spotResult = {
        score: spotScore,
        total: spotItems.length,
        percent: Math.round(pct),
        misses: spotMisses,
        bestStreak,
        secondsSpent,
        completedAt: new Date().toISOString()
    };
    localStorage.setItem('conductoverseSpotResult', JSON.stringify(spotResult));
    
    // Save to user-specific key if logged in
    const userSession = JSON.parse(localStorage.getItem("conductoverseCurrentUser") || "null");
    if (userSession && userSession.username) {
        localStorage.setItem(`conductoverseSpotResult_${userSession.username}`, JSON.stringify(spotResult));
    }
}

function resetSpotGame() { initSpotGame(); }
initSpotGame();

// ──── FACTS CAROUSEL ────
let currentFact = 0;
const factSlides = document.querySelectorAll('.fact-slide');
const totalFacts = factSlides.length;

const dotsContainer = document.getElementById('factDots');
for (let i = 0; i < totalFacts; i++) {
    const dot = document.createElement('button');
    dot.className = `fact-dot ${i === 0 ? 'active' : ''}`;
    dot.setAttribute('aria-label', `Go to fact ${i + 1}`);
    dot.style.minHeight = '10px';
    dot.onclick = () => goToFact(i);
    dotsContainer.appendChild(dot);
}

function changeFact(direction) {
    const oldIndex = currentFact;
    currentFact = (currentFact + direction + totalFacts) % totalFacts;
    factSlides[oldIndex].classList.remove('active');
    factSlides[oldIndex].classList.add(direction > 0 ? 'exit-left' : '');
    setTimeout(() => { factSlides[oldIndex].classList.remove('exit-left'); }, 500);
    factSlides[currentFact].classList.add('active');
    updateDots();
}

function goToFact(index) {
    if (index === currentFact) return;
    const direction = index > currentFact ? 1 : -1;
    factSlides[currentFact].classList.remove('active');
    factSlides[currentFact].classList.add(direction > 0 ? 'exit-left' : '');
    setTimeout(() => { document.querySelectorAll('.fact-slide.exit-left').forEach(s => s.classList.remove('exit-left')); }, 500);
    currentFact = index;
    factSlides[currentFact].classList.add('active');
    updateDots();
}

function updateDots() {
    document.querySelectorAll('.fact-dot').forEach((dot, i) => { dot.classList.toggle('active', i === currentFact); });
}

let factAutoTimer = setInterval(() => changeFact(1), 6000);
document.getElementById('factsCarousel').addEventListener('mouseenter', () => { clearInterval(factAutoTimer); });
document.getElementById('factsCarousel').addEventListener('mouseleave', () => { factAutoTimer = setInterval(() => changeFact(1), 6000); });

// ──── SCROLL-TRIGGERED ANIMATIONS ────
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.style.animationPlayState = 'running';
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.visual-use-card, .safety-card').forEach(el => {
    el.style.animationPlayState = 'paused';
    scrollObserver.observe(el);
});
