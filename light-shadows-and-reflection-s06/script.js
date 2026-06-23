/* ==========================================
   LIGHT, SHADOWS & REFLECTION LAB
   PART 1 - CORE ENGINE
========================================== */

const canvas =
document.getElementById("physicsCanvas");

const ctx =
canvas.getContext("2d");

const tabs =
document.querySelectorAll(".tab");

const explanation =
document.getElementById(
    "bottomExplanation"
);

const dataList =
document.getElementById(
    "dataList"
);

/* ==========================================
   APPLICATION STATE
========================================== */

const app = {

    activeTab: "light",

    animationTime: 0,

    light: {

        x: 150,
        y: 120,

        intensity: 1,

        type: "sun"
    },

    shadow: {

        objectX: 0,
        objectY: 0,

        objectSize: 60
    },

    reflection: {

        angle: 45,

        mirrorType: "plane"
    },

    rainbow: {

        sunAngle: 35
    }
};

/* ==========================================
   CANVAS SIZE
========================================== */

let DPR =
window.devicePixelRatio || 1;

function resizeCanvas(){

    const rect =
    canvas.getBoundingClientRect();

    canvas.width =
    rect.width * DPR;

    canvas.height =
    rect.height * DPR;

    ctx.setTransform(
        DPR,
        0,
        0,
        DPR,
        0,
        0
    );

    initializePositions();
}

window.addEventListener(
    "resize",
    resizeCanvas
);

/* ==========================================
   HELPERS
========================================== */

function W(){

    return canvas.width / DPR;
}

function H(){

    return canvas.height / DPR;
}

function clamp(
    value,
    min,
    max
){

    return Math.max(
        min,
        Math.min(max,value)
    );
}

/* ==========================================
   INITIAL POSITIONS
========================================== */

function initializePositions(){

    app.shadow.objectX =
        W() * 0.5;

    app.shadow.objectY =
        H() * 0.60;

    app.light.x =
        W() * 0.18;

    app.light.y =
        H() * 0.20;
}

/* ==========================================
   TAB SWITCHING
========================================== */

tabs.forEach(tab=>{

    tab.addEventListener(
        "click",
        ()=>{

            tabs.forEach(t=>
                t.classList.remove(
                    "active"
                )
            );

            tab.classList.add(
                "active"
            );

            app.activeTab =
                tab.dataset.tab;

            updateInfoPanel();
        }
    );
});

/* ==========================================
   DRAGGABLE LIGHT
========================================== */

let dragging = false;

canvas.addEventListener(
    "pointerdown",
    e=>{

        const rect =
        canvas.getBoundingClientRect();

        app.light.x =
            e.clientX - rect.left;

        app.light.y =
            e.clientY - rect.top;

        dragging = true;
    }
);

window.addEventListener(
    "pointermove",
    e=>{

        if(!dragging) return;

        const rect =
        canvas.getBoundingClientRect();

        app.light.x =
        clamp(
            e.clientX - rect.left,
            20,
            W()-20
        );

        app.light.y =
        clamp(
            e.clientY - rect.top,
            20,
            H()-20
        );
    }
);

window.addEventListener(
    "pointerup",
    ()=>{
        dragging = false;
    }
);

/* ==========================================
   BACKGROUND
========================================== */

function drawBackground(){

    const gradient =
    ctx.createLinearGradient(
        0,
        0,
        0,
        H()
    );

    gradient.addColorStop(
        0,
        "#e8f4ff"
    );

    gradient.addColorStop(
        1,
        "#cfe8ff"
    );

    ctx.fillStyle =
        gradient;

    ctx.fillRect(
        0,
        0,
        W(),
        H()
    );
}

/* ==========================================
   GRID
========================================== */

function drawGrid(){

    ctx.strokeStyle =
        "rgba(0,0,0,.04)";

    ctx.lineWidth = 1;

    const gap = 40;

    for(
        let x=0;
        x<W();
        x+=gap
    ){

        ctx.beginPath();

        ctx.moveTo(x,0);

        ctx.lineTo(
            x,
            H()
        );

        ctx.stroke();
    }

    for(
        let y=0;
        y<H();
        y+=gap
    ){

        ctx.beginPath();

        ctx.moveTo(0,y);

        ctx.lineTo(
            W(),
            y
        );

        ctx.stroke();
    }
}

/* ==========================================
   INFO PANEL
========================================== */

function updateInfoPanel(){

    if(!dataList) return;

    switch(
        app.activeTab
    ){

        case "light":

            dataList.innerHTML = `
            <div class="data-item">
                <h3>Source</h3>
                <p>Sun</p>
            </div>

            <div class="data-item">
                <h3>Intensity</h3>
                <p>100%</p>
            </div>
            `;

            explanation.textContent =
            "Light travels in straight lines from a source. Drag the light source around the canvas.";

            break;

        case "shadows":

            dataList.innerHTML = `
            <div class="data-item">
                <h3>Shadow Type</h3>
                <p>Dynamic</p>
            </div>
            `;

            explanation.textContent =
            "A shadow forms when an opaque object blocks light.";

            break;

        case "reflection":

            dataList.innerHTML = `
            <div class="data-item">
                <h3>Law</h3>
                <p>θi = θr</p>
            </div>
            `;

            explanation.textContent =
            "The angle of incidence equals the angle of reflection.";

            break;

        case "rainbow":

            dataList.innerHTML = `
            <div class="data-item">
                <h3>Colors</h3>
                <p>VIBGYOR</p>
            </div>
            `;

            explanation.textContent =
            "Rainbows form due to refraction, dispersion and internal reflection.";

            break;
    }
}

/* ==========================================
   MAIN LOOP
========================================== */

function render(){

    app.animationTime += 0.01;

    drawBackground();

    drawGrid();

    if(
        app.activeTab ===
        "light"
    ){
        drawLight();
    }

    else if(
        app.activeTab ===
        "shadows"
    ){
        drawShadows();
    }

    else if(
        app.activeTab ===
        "reflection"
    ){
        drawReflection();
    }

    else if(
        app.activeTab ===
        "rainbow"
    ){
        drawRainbow();
    }

    requestAnimationFrame(
        render
    );
}

/* ==========================================
   START
========================================== */

resizeCanvas();

updateInfoPanel();

render();
/* ==========================================
   PART 2 - LIGHT SIMULATION
========================================== */

function drawLight(){

    drawLightBackground();

    drawLightTitle();

    drawLightSource();

    drawLightRays();

    drawLightInfo();
}

/* ==========================================
   LIGHT SKY
========================================== */

function drawLightBackground(){

    const sky =
    ctx.createLinearGradient(
        0,
        0,
        0,
        H()
    );

    sky.addColorStop(
        0,
        "#87ceeb"
    );

    sky.addColorStop(
        1,
        "#dff4ff"
    );

    ctx.fillStyle = sky;

    ctx.fillRect(
        0,
        0,
        W(),
        H()
    );

    ctx.fillStyle =
        "#8fd694";

    ctx.fillRect(
        0,
        H()*0.85,
        W(),
        H()*0.15
    );
}

/* ==========================================
   TITLE
========================================== */

function drawLightTitle(){

    ctx.fillStyle =
        "#1e293b";

    ctx.font =
        "bold 30px Arial";

    ctx.fillText(
        "LIGHT",
        30,
        50
    );
}

/* ==========================================
   SOURCE
========================================== */

function drawLightSource(){

    const pulse =
        1 +
        Math.sin(
            app.animationTime * 3
        ) * 0.05;

    const glow =
    ctx.createRadialGradient(
        app.light.x,
        app.light.y,
        0,
        app.light.x,
        app.light.y,
        90 * pulse
    );

    glow.addColorStop(
        0,
        "rgba(255,255,180,.95)"
    );

    glow.addColorStop(
        1,
        "rgba(255,255,180,0)"
    );

    ctx.fillStyle = glow;

    ctx.beginPath();

    ctx.arc(
        app.light.x,
        app.light.y,
        90 * pulse,
        0,
        Math.PI * 2
    );

    ctx.fill();

    ctx.fillStyle =
        "#ffd54f";

    ctx.beginPath();

    ctx.arc(
        app.light.x,
        app.light.y,
        20,
        0,
        Math.PI * 2
    );

    ctx.fill();

    ctx.strokeStyle =
        "#ffb300";

    ctx.lineWidth = 2;

    ctx.stroke();

    ctx.fillStyle =
        "#1e293b";

    ctx.font =
        "bold 14px Arial";

    ctx.fillText(
        "Drag Me",
        app.light.x + 25,
        app.light.y
    );
}

/* ==========================================
   LIGHT RAYS
========================================== */

function drawLightRays(){

    const rays = 24;

    const length =
        Math.max(
            W(),
            H()
        );

    for(
        let i=0;
        i<rays;
        i++
    ){

        const angle =
            (Math.PI * 2)
            *
            (i / rays);

        const x2 =
            app.light.x +
            Math.cos(angle)
            * length;

        const y2 =
            app.light.y +
            Math.sin(angle)
            * length;

        ctx.beginPath();

        ctx.moveTo(
            app.light.x,
            app.light.y
        );

        ctx.lineTo(
            x2,
            y2
        );

        ctx.strokeStyle =
            "rgba(255,255,150,.35)";

        ctx.lineWidth = 2;

        ctx.stroke();
    }
}

/* ==========================================
   INFO BOX
========================================== */

function drawLightInfo(){

    const boxX =
        W() * 0.60;

    const boxY =
        H() * 0.12;

    const boxW = 260;

    const boxH = 120;

    ctx.fillStyle =
        "rgba(255,255,255,.85)";

    ctx.strokeStyle =
        "rgba(0,0,0,.1)";

    ctx.lineWidth = 1;

    ctx.beginPath();

    ctx.roundRect(
        boxX,
        boxY,
        boxW,
        boxH,
        12
    );

    ctx.fill();

    ctx.stroke();

    ctx.fillStyle =
        "#1e293b";

    ctx.font =
        "bold 16px Arial";

    ctx.fillText(
        "Properties of Light",
        boxX + 15,
        boxY + 28
    );

    ctx.font =
        "14px Arial";

    ctx.fillText(
        "• Travels in straight lines",
        boxX + 15,
        boxY + 55
    );

    ctx.fillText(
        "• Can reflect",
        boxX + 15,
        boxY + 78
    );

    ctx.fillText(
        "• Can refract",
        boxX + 15,
        boxY + 101
    );
}
/* ==========================================
   PART 3 - SHADOW SIMULATION
========================================== */

function drawShadows(){

    drawShadowBackground();

    drawShadowTitle();

    drawSun();

    drawObject();

    drawDynamicShadow();

    drawShadowInfo();
}

/* ==========================================
   BACKGROUND
========================================== */

function drawShadowBackground(){

    const sky =
    ctx.createLinearGradient(
        0,
        0,
        0,
        H()
    );

    sky.addColorStop(
        0,
        "#87ceeb"
    );

    sky.addColorStop(
        1,
        "#dff4ff"
    );

    ctx.fillStyle = sky;

    ctx.fillRect(
        0,
        0,
        W(),
        H()
    );

    ctx.fillStyle =
        "#7cc576";

    ctx.fillRect(
        0,
        H()*0.80,
        W(),
        H()*0.20
    );
}

/* ==========================================
   TITLE
========================================== */

function drawShadowTitle(){

    ctx.fillStyle =
        "#1e293b";

    ctx.font =
        "bold 30px Arial";

    ctx.fillText(
        "SHADOW FORMATION",
        30,
        50
    );
}

/* ==========================================
   SUN
========================================== */

function drawSun(){

    const glow =
    ctx.createRadialGradient(
        app.light.x,
        app.light.y,
        0,
        app.light.x,
        app.light.y,
        80
    );

    glow.addColorStop(
        0,
        "rgba(255,255,180,.9)"
    );

    glow.addColorStop(
        1,
        "rgba(255,255,180,0)"
    );

    ctx.fillStyle =
        glow;

    ctx.beginPath();

    ctx.arc(
        app.light.x,
        app.light.y,
        80,
        0,
        Math.PI*2
    );

    ctx.fill();

    ctx.fillStyle =
        "#ffd54f";

    ctx.beginPath();

    ctx.arc(
        app.light.x,
        app.light.y,
        18,
        0,
        Math.PI*2
    );

    ctx.fill();
}

/* ==========================================
   OBJECT
========================================== */

function drawObject(){

    const x =
        app.shadow.objectX;

    const y =
        app.shadow.objectY;

    const size =
        app.shadow.objectSize;

    ctx.fillStyle =
        "#2563eb";

    ctx.fillRect(
        x - size/2,
        y - size,
        size,
        size
    );

    ctx.strokeStyle =
        "#1e3a8a";

    ctx.lineWidth = 2;

    ctx.strokeRect(
        x - size/2,
        y - size,
        size,
        size
    );
}

/* ==========================================
   SHADOW
========================================== */

function drawDynamicShadow(){

    const objX =
        app.shadow.objectX;

    const objY =
        app.shadow.objectY;

    const size =
        app.shadow.objectSize;

    const groundY =
        H() * 0.80;

    const topLeft = {
        x: objX - size/2,
        y: objY - size
    };

    const topRight = {
        x: objX + size/2,
        y: objY - size
    };

    const leftProjection =
    projectToGround(
        topLeft.x,
        topLeft.y,
        groundY
    );

    const rightProjection =
    projectToGround(
        topRight.x,
        topRight.y,
        groundY
    );

    ctx.beginPath();

    ctx.moveTo(
        topLeft.x,
        objY
    );

    ctx.lineTo(
        topRight.x,
        objY
    );

    ctx.lineTo(
        rightProjection.x,
        groundY
    );

    ctx.lineTo(
        leftProjection.x,
        groundY
    );

    ctx.closePath();

    const shadowGradient =
    ctx.createLinearGradient(
        objX,
        objY,
        objX,
        groundY
    );

    shadowGradient.addColorStop(
        0,
        "rgba(0,0,0,.35)"
    );

    shadowGradient.addColorStop(
        1,
        "rgba(0,0,0,.02)"
    );

    ctx.fillStyle =
        shadowGradient;

    ctx.fill();

    ctx.beginPath();

    ctx.moveTo(
        topLeft.x,
        objY
    );

    ctx.lineTo(
        topRight.x,
        objY
    );

    ctx.lineTo(
        rightProjection.x + 30,
        groundY
    );

    ctx.lineTo(
        leftProjection.x - 30,
        groundY
    );

    ctx.closePath();

    ctx.fillStyle =
        "rgba(0,0,0,.08)";

    ctx.fill();
}

/* ==========================================
   PROJECTION
========================================== */

function projectToGround(
    px,
    py,
    groundY
){

    const dx =
        px - app.light.x;

    const dy =
        py - app.light.y;

    const t =
        (groundY - py) / dy;

    return {

        x: px + dx * t,

        y: groundY
    };
}

/* ==========================================
   INFO BOX
========================================== */

function drawShadowInfo(){

    const boxX =
        W() * 0.63;

    const boxY =
        H() * 0.12;

    const boxW =
        260;

    const boxH =
        140;

    ctx.fillStyle =
        "rgba(255,255,255,.88)";

    ctx.beginPath();

    ctx.roundRect(
        boxX,
        boxY,
        boxW,
        boxH,
        12
    );

    ctx.fill();

    ctx.fillStyle =
        "#1e293b";

    ctx.font =
        "bold 16px Arial";

    ctx.fillText(
        "Shadow Facts",
        boxX + 15,
        boxY + 28
    );

    ctx.font =
        "14px Arial";

    ctx.fillText(
        "• Light travels in straight lines",
        boxX + 15,
        boxY + 58
    );

    ctx.fillText(
        "• Opaque objects block light",
        boxX + 15,
        boxY + 84
    );

    ctx.fillText(
        "• Lower sun = longer shadow",
        boxX + 15,
        boxY + 110
    );

    ctx.fillText(
        "• Higher sun = shorter shadow",
        boxX + 15,
        boxY + 136
    );
}
/* ==========================================
   PART 4 - REFLECTION SIMULATION
========================================== */

function drawReflection(){

    drawReflectionBackground();

    drawReflectionTitle();

    drawMirror();

    drawIncidentRay();

    drawNormalLine();

    drawReflectedRay();

    drawReflectionInfo();
}

/* ==========================================
   BACKGROUND
========================================== */

function drawReflectionBackground(){

    const gradient =
    ctx.createLinearGradient(
        0,
        0,
        0,
        H()
    );

    gradient.addColorStop(
        0,
        "#eef7ff"
    );

    gradient.addColorStop(
        1,
        "#d9ecff"
    );

    ctx.fillStyle =
        gradient;

    ctx.fillRect(
        0,
        0,
        W(),
        H()
    );
}

/* ==========================================
   TITLE
========================================== */

function drawReflectionTitle(){

    ctx.fillStyle =
        "#1e293b";

    ctx.font =
        "bold 30px Arial";

    ctx.fillText(
        "REFLECTION",
        30,
        50
    );
}

/* ==========================================
   MIRROR
========================================== */

function drawMirror(){

    const mirrorY =
        H() * 0.70;

    const startX =
        W() * 0.25;

    const endX =
        W() * 0.75;

    ctx.strokeStyle =
        "#94a3b8";

    ctx.lineWidth = 10;

    ctx.beginPath();

    ctx.moveTo(
        startX,
        mirrorY
    );

    ctx.lineTo(
        endX,
        mirrorY
    );

    ctx.stroke();

    ctx.fillStyle =
        "#475569";

    ctx.font =
        "bold 15px Arial";

    ctx.fillText(
        "Plane Mirror",
        W()*0.45,
        mirrorY + 35
    );
}

/* ==========================================
   INCIDENT RAY
========================================== */

function drawIncidentRay(){

    const mirrorY =
        H() * 0.70;

    const hitX =
        W() * 0.50;

    const hitY =
        mirrorY;

    app.reflection.hitX =
        hitX;

    app.reflection.hitY =
        hitY;

    ctx.strokeStyle =
        "#f59e0b";

    ctx.lineWidth = 3;

    ctx.beginPath();

    ctx.moveTo(
        app.light.x,
        app.light.y
    );

    ctx.lineTo(
        hitX,
        hitY
    );

    ctx.stroke();

    ctx.fillStyle =
        "#f59e0b";

    ctx.font =
        "14px Arial";

    ctx.fillText(
        "Incident Ray",
        app.light.x + 20,
        app.light.y - 10
    );
}

/* ==========================================
   NORMAL
========================================== */

function drawNormalLine(){

    const hitX =
        app.reflection.hitX;

    const hitY =
        app.reflection.hitY;

    ctx.strokeStyle =
        "#22c55e";

    ctx.lineWidth = 2;

    ctx.setLineDash(
        [8,8]
    );

    ctx.beginPath();

    ctx.moveTo(
        hitX,
        hitY - 140
    );

    ctx.lineTo(
        hitX,
        hitY + 140
    );

    ctx.stroke();

    ctx.setLineDash([]);

    ctx.fillStyle =
        "#22c55e";

    ctx.fillText(
        "Normal",
        hitX + 10,
        hitY - 100
    );
}

/* ==========================================
   REFLECTED RAY
========================================== */
function drawReflectedRay(){

    const hitX =
        app.reflection.hitX;

    const hitY =
        app.reflection.hitY;

    const dx =
        hitX - app.light.x;

    const dy =
        hitY - app.light.y;

    const len =
        Math.sqrt(
            dx * dx +
            dy * dy
        );

    const ux = dx / len;
    const uy = dy / len;

    const nx = 0;
    const ny = -1;

    const dot =
        ux * nx +
        uy * ny;

    const rx =
        ux -
        2 * dot * nx;

    const ry =
        uy -
        2 * dot * ny;

    const rayLength =
        300;

    const endX =
        hitX +
        rx * rayLength;

    const endY =
        hitY +
        ry * rayLength;

    ctx.strokeStyle =
        "#38bdf8";

    ctx.lineWidth = 3;

    ctx.beginPath();

    ctx.moveTo(
        hitX,
        hitY
    );

    ctx.lineTo(
        endX,
        endY
    );

    ctx.stroke();

    // Dynamic label position

    const midX =
        (hitX + endX) / 2;

    const midY =
        (hitY + endY) / 2;

    const dxLabel =
        endX - hitX;

    const dyLabel =
        endY - hitY;

    const lenLabel =
        Math.sqrt(
            dxLabel * dxLabel +
            dyLabel * dyLabel
        );

    const offsetX =
        (-dyLabel / lenLabel) * 20;

    const offsetY =
        (dxLabel / lenLabel) * 20;

    ctx.fillStyle =
        "#38bdf8";

    ctx.font =
        "14px Arial";

    ctx.fillText(
        "Reflected Ray",
        midX + offsetX,
        midY + offsetY
    );
}
/* ==========================================
   ANGLE VISUALIZATION
========================================== */
function drawAngleArc(){

    const hitX = app.reflection.hitX;
    const hitY = app.reflection.hitY;

    const incidentAngle =
        Math.atan2(
            app.light.y - hitY,
            app.light.x - hitX
        );

    ctx.strokeStyle = "#f59e0b";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.arc(
        hitX,
        hitY,
        35,
        -Math.PI/2,
        incidentAngle,
        true
    );
    ctx.stroke();

    const reflectedAngle =
        Math.PI - incidentAngle;

    ctx.strokeStyle = "#38bdf8";

    ctx.beginPath();
    ctx.arc(
        hitX,
        hitY,
        50,
        -Math.PI/2,
        reflectedAngle,
        false
    );
    ctx.stroke();
}

/* ==========================================
   INFO BOX
========================================== */

function drawReflectionInfo(){

    drawAngleArc();

    const boxX =
        W()*0.65;

    const boxY =
        H()*0.12;

    const boxW = 260;
    const boxH = 150;

    ctx.fillStyle =
        "rgba(255,255,255,.88)";

    ctx.beginPath();

    ctx.roundRect(
        boxX,
        boxY,
        boxW,
        boxH,
        12
    );

    ctx.fill();

    ctx.fillStyle =
        "#1e293b";

    ctx.font =
        "bold 16px Arial";

    ctx.fillText(
        "Law of Reflection",
        boxX + 15,
        boxY + 30
    );

    ctx.font =
        "14px Arial";

    ctx.fillText(
        "θi = θr",
        boxX + 15,
        boxY + 60
    );

    ctx.fillText(
        "• Incident angle equals",
        boxX + 15,
        boxY + 90
    );

    ctx.fillText(
        "  reflected angle",
        boxX + 15,
        boxY + 112
    );

    ctx.fillText(
        "• Measured from normal",
        boxX + 15,
        boxY + 136
    );
}
/* ==========================================
   PART 5 - RAINBOW FORMATION
========================================== */

function drawRainbow(){

    drawRainbowBackground();

    drawRainbowTitle();

    drawRainbowSun();

    drawWaterDroplet();

    drawWhiteLightRay();

    drawDispersionRays();

    drawRainbowArc();

    drawRainbowInfo();
}
/* ==========================================
   BACKGROUND
========================================== */

function drawRainbowBackground(){

    const sky =
    ctx.createLinearGradient(
        0,
        0,
        0,
        H()
    );

    sky.addColorStop(
        0,
        "#87ceeb"
    );

    sky.addColorStop(
        1,
        "#dff4ff"
    );

    ctx.fillStyle = sky;

    ctx.fillRect(
        0,
        0,
        W(),
        H()
    );

    ctx.fillStyle =
        "#7cc576";

    ctx.fillRect(
        0,
        H()*0.85,
        W(),
        H()*0.15
    );
}

/* ==========================================
   TITLE
========================================== */

function drawRainbowTitle(){

    ctx.fillStyle =
        "#1e293b";

    ctx.font =
        "bold 30px Arial";

    ctx.fillText(
        "RAINBOW FORMATION",
        30,
        50
    );
}

/* ==========================================
   SUN
========================================== */

function drawRainbowSun(){

    const sunX =
        W() * 0.15;

    const sunY =
        H() * 0.18;

    app.rainbow.sunX =
        sunX;

    app.rainbow.sunY =
        sunY;

    const glow =
    ctx.createRadialGradient(
        sunX,
        sunY,
        0,
        sunX,
        sunY,
        80
    );

    glow.addColorStop(
        0,
        "rgba(255,255,180,.95)"
    );

    glow.addColorStop(
        1,
        "rgba(255,255,180,0)"
    );

    ctx.fillStyle =
        glow;

    ctx.beginPath();

    ctx.arc(
        sunX,
        sunY,
        80,
        0,
        Math.PI*2
    );

    ctx.fill();

    ctx.fillStyle =
        "#ffd54f";

    ctx.beginPath();

    ctx.arc(
        sunX,
        sunY,
        25,
        0,
        Math.PI*2
    );

    ctx.fill();
}

/* ==========================================
   WATER DROPLET
========================================== */

function drawWaterDroplet(){

    const x =
        W() * 0.45;

    const y =
        H() * 0.42;

    app.rainbow.dropX = x;
    app.rainbow.dropY = y;

    ctx.fillStyle =
        "rgba(100,180,255,.35)";

    ctx.strokeStyle =
        "#60a5fa";

    ctx.lineWidth = 2;

    ctx.beginPath();

    ctx.arc(
        x,
        y,
        40,
        0,
        Math.PI*2
    );

    ctx.fill();

    ctx.stroke();

    ctx.fillStyle =
        "#1e293b";

    ctx.font =
        "14px Arial";

    ctx.fillText(
        "Water Droplet",
        x - 45,
        y + 70
    );
}

/* ==========================================
   WHITE LIGHT
========================================== */

function drawWhiteLightRay(){

    const sx =
        app.rainbow.sunX;

    const sy =
        app.rainbow.sunY;

    const dx =
        app.rainbow.dropX;

    const dy =
        app.rainbow.dropY;

    ctx.strokeStyle =
        "#ffffff";

    ctx.lineWidth = 4;

    ctx.beginPath();

    ctx.moveTo(
        sx,
        sy
    );

    ctx.lineTo(
        dx,
        dy
    );

    ctx.stroke();

    ctx.fillStyle =
        "#111";

    ctx.fillText(
        "White Light",
        (sx+dx)/2 - 30,
        (sy+dy)/2 - 10
    );
}

/* ==========================================
   DISPERSION
========================================== */

function drawDispersionRays(){

    const colors = [

        "#ff0000", // red
        "#ff7f00", // orange
        "#ffff00", // yellow
        "#00ff00", // green
        "#0000ff", // blue
        "#4b0082", // indigo
        "#8f00ff"  // violet
    ];

    const startX =
        app.rainbow.dropX;

    const startY =
        app.rainbow.dropY;

    const baseAngle =
        -0.3;

    colors.forEach(
        (color,index)=>{

            const angle =
                baseAngle +
                index * 0.12;

            const endX =
                startX +
                Math.cos(angle)
                * 250;

            const endY =
                startY +
                Math.sin(angle)
                * 250;

            ctx.strokeStyle =
                color;

            ctx.lineWidth = 3;

            ctx.beginPath();

            ctx.moveTo(
                startX,
                startY
            );

            ctx.lineTo(
                endX,
                endY
            );

            ctx.stroke();
        }
    );
}

/* ==========================================
   RAINBOW ARC
========================================== */

function drawRainbowArc(){

    const colors = [

        "#ff0000",
        "#ff7f00",
        "#ffff00",
        "#00ff00",
        "#0000ff",
        "#4b0082",
        "#8f00ff"
    ];

    const centerX =
        W() * 0.72;

    const centerY =
        H() * 0.82;

    const radius =
        Math.min(
            W(),
            H()
        ) * 0.22;

    colors.forEach(
        (color,index)=>{

            ctx.strokeStyle =
                color;

            ctx.lineWidth = 8;

            ctx.beginPath();

            ctx.arc(
                centerX,
                centerY,
                radius -
                index * 8,
                Math.PI,
                Math.PI * 2
            );

            ctx.stroke();
        }
    );
}

/* ==========================================
   INFO BOX
========================================== */

function drawRainbowInfo(){

    const boxX =
        W() * 0.62;

    const boxY =
        H() * 0.12;

    const boxW = 280;
    const boxH = 170;

    ctx.fillStyle =
        "rgba(255,255,255,.88)";

    ctx.beginPath();

    ctx.roundRect(
        boxX,
        boxY,
        boxW,
        boxH,
        12
    );

    ctx.fill();

    ctx.fillStyle =
        "#1e293b";

    ctx.font =
        "bold 16px Arial";

    ctx.fillText(
        "Rainbow Formation",
        boxX + 15,
        boxY + 30
    );

    ctx.font =
        "14px Arial";

    ctx.fillText(
        "1. Refraction",
        boxX + 15,
        boxY + 60
    );

    ctx.fillText(
        "2. Dispersion",
        boxX + 15,
        boxY + 85
    );

    ctx.fillText(
        "3. Internal Reflection",
        boxX + 15,
        boxY + 110
    );

    ctx.fillText(
        "4. Refraction Again",
        boxX + 15,
        boxY + 135
    );

    ctx.fillText(
        "Result: VIBGYOR",
        boxX + 15,
        boxY + 160
    );
}

/* ==========================================
   PART 6 - PHYSICS PANEL + LEARNING SYSTEM
========================================== */

/* ==========================================
   LIGHT SOURCE TYPES
========================================== */

const LIGHT_TYPES = {

    sun: {
        name: "Sun",
        color: "#ffd54f",
        rays: 24
    },

    bulb: {
        name: "Bulb",
        color: "#fff59d",
        rays: 16
    },

    flashlight: {
        name: "Flashlight",
        color: "#fff9c4",
        rays: 12
    },

    laser: {
        name: "Laser",
        color: "#ff1744",
        rays: 1
    }
};

/* ==========================================
   ENHANCED LIGHT DRAWING
========================================== */

const originalDrawLightRays =
drawLightRays;

drawLightRays = function(){

    const source =
    LIGHT_TYPES[
        app.light.type
    ] || LIGHT_TYPES.sun;

    const length =
        Math.max(
            W(),
            H()
        );

    if(
        app.light.type ===
        "laser"
    ){

        ctx.strokeStyle =
            "#ff1744";

        ctx.lineWidth = 4;

        ctx.beginPath();

        ctx.moveTo(
            app.light.x,
            app.light.y
        );

        ctx.lineTo(
            W() * 0.95,
            app.light.y
        );

        ctx.stroke();

        return;
    }

    const rays =
        source.rays;

    for(
        let i=0;
        i<rays;
        i++
    ){

        let angle;

        if(
            app.light.type ===
            "flashlight"
        ){

            angle =
            (-0.5 + i/rays)
            * 0.9;

        }else{

            angle =
            (Math.PI*2)
            *
            (i/rays);
        }

        const x2 =
            app.light.x +
            Math.cos(angle)
            * length;

        const y2 =
            app.light.y +
            Math.sin(angle)
            * length;

        ctx.beginPath();

        ctx.moveTo(
            app.light.x,
            app.light.y
        );

        ctx.lineTo(
            x2,
            y2
        );

        ctx.strokeStyle =
            "rgba(255,255,150,.35)";

        ctx.lineWidth = 2;

        ctx.stroke();
    }
};

/* ==========================================
   PHYSICS PANEL
========================================== */

function updatePhysicsData(){

    if(!dataList)
        return;

    switch(
        app.activeTab
    ){

        case "light":

            dataList.innerHTML = `

            <div class="data-item">
                <h3>Source</h3>
                <p>${LIGHT_TYPES[app.light.type].name}</p>
            </div>

            <div class="data-item">
                <h3>Intensity</h3>
                <p>${Math.round(app.light.intensity*100)}%</p>
            </div>

            <div class="data-item">
                <h3>Rays</h3>
                <p>${LIGHT_TYPES[app.light.type].rays}</p>
            </div>

            <div class="data-item">
                <h3>Property</h3>
                <p>Straight Line Travel</p>
            </div>

            `;
            break;

        case "shadows":

            const shadowLength =
                Math.abs(
                    app.shadow.objectX -
                    app.light.x
                );

            dataList.innerHTML = `

            <div class="data-item">
                <h3>Shadow Length</h3>
                <p>${Math.round(shadowLength)} px</p>
            </div>

            <div class="data-item">
                <h3>Object Size</h3>
                <p>${app.shadow.objectSize}px</p>
            </div>

            <div class="data-item">
                <h3>Light Height</h3>
                <p>${Math.round(app.light.y)} px</p>
            </div>

            `;
            break;

        case "reflection":

            dataList.innerHTML = `

            <div class="data-item">
                <h3>Law</h3>
                <p>θi = θr</p>
            </div>

            <div class="data-item">
                <h3>Mirror</h3>
                <p>Plane Mirror</p>
            </div>

            <div class="data-item">
                <h3>Reflection</h3>
                <p>Specular</p>
            </div>

            `;
            break;

        case "rainbow":

            dataList.innerHTML = `

            <div class="data-item">
                <h3>Colors</h3>
                <p>7</p>
            </div>

            <div class="data-item">
                <h3>Process</h3>
                <p>Dispersion</p>
            </div>

            <div class="data-item">
                <h3>Medium</h3>
                <p>Water Droplet</p>
            </div>

            `;
            break;
    }
}

/* ==========================================
   DYNAMIC EXPLANATIONS
========================================== */

function updateExplanation(){

    if(!explanation)
        return;

    switch(
        app.activeTab
    ){

        case "light":

            explanation.innerHTML = `
            Light is emitted from the
            <strong>${LIGHT_TYPES[app.light.type].name}</strong>.
            The rays travel in straight lines,
            demonstrating rectilinear propagation
            of light.
            `;
            break;

        case "shadows":

            explanation.innerHTML = `
            The object blocks incoming light rays.
            The dark region behind the object is
            called a shadow. Moving the light source
            changes the size and direction of the shadow.
            `;
            break;

        case "reflection":

            explanation.innerHTML = `
            When light strikes a smooth surface,
            it reflects. According to the law of
            reflection, the angle of incidence
            equals the angle of reflection.
            `;
            break;

        case "rainbow":

            explanation.innerHTML = `
            Sunlight enters a water droplet and
            undergoes refraction, dispersion,
            internal reflection, and refraction
            again. This separates white light
            into VIBGYOR colors.
            `;
            break;
    }
}

/* ==========================================
   UPDATE LOOP
========================================== */

const oldUpdateInfoPanel =
updateInfoPanel;

updateInfoPanel = function(){

    updatePhysicsData();

    updateExplanation();
};

/* ==========================================
   DEFAULT SOURCE
========================================== */

app.light.type = "sun";

/* ==========================================
   REFRESH INFO EVERY FRAME
========================================== */

const oldRender =
render;

render = function(){

    app.animationTime += 0.01;

    drawBackground();

    drawGrid();

    switch(
        app.activeTab
    ){

        case "light":
            drawLight();
            break;

        case "shadows":
            drawShadows();
            break;

        case "reflection":
            drawReflection();
            break;

        case "rainbow":
            drawRainbow();
            break;
    }

    updatePhysicsData();

    requestAnimationFrame(
        render
    );
};

/* ==========================================
   RESTART LOOP
========================================== */

cancelAnimationFrame(0);

render();

