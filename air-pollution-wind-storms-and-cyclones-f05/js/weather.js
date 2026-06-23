/**
 * Atmosphere Explorer - Weather & Cyclone Dynamics
 * Handles rain vectors, lightning triggers, cyclone spirals, and vector fields.
 */

class RainDrop {
    constructor(canvasWidth) {
        this.x = Math.random() * canvasWidth;
        this.y = -20;
        this.length = Math.random() * 15 + 10;
        this.speed = Math.random() * 10 + 12; // fast fall
        this.vx = 0;
    }

    update(windSpeed, windAngleRad, timeScale) {
        // Wind speed adds horizontal displacement to rain vectors
        this.vx = Math.cos(windAngleRad) * windSpeed * 0.25;
        this.x += this.vx * timeScale;
        this.y += this.speed * timeScale;
    }

    draw(ctx) {
        ctx.strokeStyle = 'rgba(174, 214, 241, 0.45)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.vx, this.y + this.length);
        ctx.stroke();
    }
}

class WeatherEngine {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.rainDrops = [];
        this.lightningActive = false;
        this.lightningTimer = 0;
        this.lightningPath = [];
        
        // Cyclone Configuration
        this.cycloneActive = false;
        this.cycloneCenter = { x: 400, y: 220 }; // default center
        this.cycloneRadius = 160;
        this.cycloneAngle = 0; // rotation angle
        
        // Vector grid spacing
        this.vectorSpacing = 50;
    }

    update(windSpeed, windAngleRad, temp, humidity, timeScale, isStormActive, isCycloneActive) {
        this.cycloneActive = isCycloneActive;
        
        // 1. Process Storm Mode (Rain & Lightning)
        if (isStormActive) {
            // Spawn rain relative to humidity/speed
            const spawnCount = Math.round((humidity / 25) * timeScale);
            for (let i = 0; i < spawnCount; i++) {
                this.rainDrops.push(new RainDrop(this.canvas.width));
            }

            // Update raindrops
            for (let i = this.rainDrops.length - 1; i >= 0; i--) {
                const drop = this.rainDrops[i];
                drop.update(windSpeed, windAngleRad, timeScale);
                
                // Delete if ground hits
                if (drop.y > 450 || drop.x < 0 || drop.x > this.canvas.width) {
                    this.rainDrops.splice(i, 1);
                }
            }

            // Lightning discharge chance (scales with humidity and temp)
            if (!this.lightningActive && Math.random() < 0.003 * timeScale * (humidity / 50)) {
                this.triggerLightning();
            }

            if (this.lightningActive) {
                this.lightningTimer -= 1 * timeScale;
                if (this.lightningTimer <= 0) {
                    this.lightningActive = false;
                    document.getElementById('sky-rect').style.fill = 'url(#sky-day)';
                }
            }
        } else {
            this.rainDrops = [];
            this.lightningActive = false;
        }

        // 2. Process Cyclone rotation
        if (this.cycloneActive) {
            this.cycloneAngle += (0.05 + windSpeed * 0.001) * timeScale;
        }
    }

    draw(showVectors, showPressure, showAQIActive, windSpeed, windAngleRad) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // 1. Draw Temperature gradient background layer
        if (showPressure) {
            this.drawPressureZones();
        }

        // 2. Draw Vector Arrows
        if (showVectors) {
            this.drawVectorField(windSpeed, windAngleRad);
        }

        // 3. Draw active storm rain
        this.rainDrops.forEach(drop => drop.draw(this.ctx));

        // 4. Draw lightning bolt if active
        if (this.lightningActive) {
            this.drawLightningBolt();
        }

        // 5. Draw Cyclone spirals
        if (this.cycloneActive) {
            this.drawCycloneVortex();
        }
    }

    triggerLightning() {
        this.lightningActive = true;
        this.lightningTimer = Math.random() * 10 + 10; // flash frame duration
        
        // Generate a jagged lightning path
        let lx = Math.random() * (this.canvas.width - 200) + 100;
        let ly = 0;
        this.lightningPath = [{ x: lx, y: ly }];
        
        while (ly < 380) {
            lx += (Math.random() - 0.5) * 35;
            ly += Math.random() * 40 + 20;
            this.lightningPath.push({ x: lx, y: ly });
        }

        // Flash Sky visually
        const skyRect = document.getElementById('sky-rect');
        if (skyRect) {
            skyRect.style.fill = 'rgba(235, 245, 251, 0.95)';
        }
    }

    drawLightningBolt() {
        this.ctx.save();
        this.ctx.strokeStyle = '#fff';
        this.ctx.shadowColor = '#85c1e9';
        this.ctx.shadowBlur = 20;
        this.ctx.lineWidth = 3;
        
        this.ctx.beginPath();
        this.ctx.moveTo(this.lightningPath[0].x, this.lightningPath[0].y);
        for (let i = 1; i < this.lightningPath.length; i++) {
            this.ctx.lineTo(this.lightningPath[i].x, this.lightningPath[i].y);
        }
        this.ctx.stroke();
        
        // Secondary thinner branch
        this.ctx.lineWidth = 1.5;
        this.ctx.beginPath();
        const splitIdx = Math.floor(this.lightningPath.length / 2);
        this.ctx.moveTo(this.lightningPath[splitIdx].x, this.lightningPath[splitIdx].y);
        let bx = this.lightningPath[splitIdx].x;
        let by = this.lightningPath[splitIdx].y;
        for (let i = 0; i < 4; i++) {
            bx += (Math.random() - 0.3) * 25;
            by += Math.random() * 30 + 15;
            this.ctx.lineTo(bx, by);
        }
        this.ctx.stroke();
        this.ctx.restore();
    }

    drawCycloneVortex() {
        this.ctx.save();
        this.ctx.translate(this.cycloneCenter.x, this.cycloneCenter.y);
        this.ctx.rotate(-this.cycloneAngle);

        const spirals = 4;
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = 'rgba(218, 247, 255, 0.2)';
        this.ctx.shadowColor = '#e0b0ff';
        this.ctx.shadowBlur = 10;

        for (let s = 0; s < spirals; s++) {
            const startAngle = (s * Math.PI * 2) / spirals;
            this.ctx.beginPath();
            
            for (let theta = 0; theta < Math.PI * 6; theta += 0.1) {
                const r = (theta * this.cycloneRadius) / (Math.PI * 6);
                const a = theta + startAngle;
                const sx = Math.cos(a) * r;
                const sy = Math.sin(a) * r;
                if (theta === 0) {
                    this.ctx.moveTo(sx, sy);
                } else {
                    this.ctx.lineTo(sx, sy);
                }
            }
            this.ctx.stroke();
        }
        this.ctx.restore();
    }

    drawPressureZones() {
        // Draw low and high pressure overlay color fields
        const grad = this.ctx.createRadialGradient(
            this.cycloneCenter.x, this.cycloneCenter.y, 10,
            this.cycloneCenter.x, this.cycloneCenter.y, this.cycloneRadius * 1.5
        );
        
        if (this.cycloneActive) {
            // Cyclone center is extreme low pressure (Cold Blue)
            grad.addColorStop(0, 'rgba(52, 152, 219, 0.35)');
            grad.addColorStop(0.5, 'rgba(155, 89, 182, 0.15)');
            grad.addColorStop(1, 'rgba(0,0,0,0)');
        } else {
            // Calm air high pressure areas (Warm Red near industrial center/factory)
            grad.addColorStop(0, 'rgba(231, 76, 60, 0.2)');
            grad.addColorStop(1, 'rgba(0,0,0,0)');
        }
        
        this.ctx.save();
        this.ctx.fillStyle = grad;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw text badges for science layers
        this.ctx.font = '700 10px Space Grotesk';
        this.ctx.fillStyle = this.cycloneActive ? '#5dade2' : '#f1948a';
        this.ctx.fillText(
            this.cycloneActive ? 'LOW PRESSURE ZONE (L)' : 'WARM ATMOSPHERE ZONE (H)', 
            this.cycloneActive ? this.cycloneCenter.x - 65 : 80, 
            this.cycloneActive ? this.cycloneCenter.y - 100 : 80
        );
        this.ctx.restore();
    }

    drawVectorField(windSpeed, windAngleRad) {
        this.ctx.save();
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
        this.ctx.lineWidth = 1;

        const timeSeed = Date.now() * 0.003; // for smooth moving arrows animation

        for (let x = this.vectorSpacing / 2; x < this.canvas.width; x += this.vectorSpacing) {
            for (let y = this.vectorSpacing / 2; y < this.canvas.height; y += this.vectorSpacing) {
                // Determine direction vector
                let theta = windAngleRad;
                let len = Math.min(18, windSpeed * 0.3 + 4);

                if (this.cycloneActive) {
                    const dx = x - this.cycloneCenter.x;
                    const dy = y - this.cycloneCenter.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist > 10) {
                        // Cyclone vector points spiral inwards
                        const radialAngle = Math.atan2(dy, dx);
                        // Suction inward (radialAngle + PI) mixed with tangential spin (radialAngle + PI/2)
                        theta = radialAngle + Math.PI + Math.PI / 2.5; 
                        
                        // Vector strength is stronger closer to the eye wall
                        len = Math.max(5, Math.min(22, 280 / dist));
                    }
                }

                // Calculate pulse opacity offset to represent flowing air currents
                const phase = (x * 0.01 + y * 0.01 + timeSeed) % 1;
                this.ctx.strokeStyle = `rgba(255, 255, 255, ${0.05 + (1 - phase) * 0.16})`;
                this.ctx.fillStyle = `rgba(255, 255, 255, ${0.05 + (1 - phase) * 0.22})`;

                // Draw vector arrow
                this.ctx.beginPath();
                const arrowX = x + Math.cos(theta) * (len * phase);
                const arrowY = y + Math.sin(theta) * (len * phase);
                
                this.ctx.moveTo(arrowX, arrowY);
                this.ctx.lineTo(arrowX - Math.cos(theta) * len, arrowY - Math.sin(theta) * len);
                this.ctx.stroke();

                // Draw arrow tip
                this.ctx.beginPath();
                this.ctx.arc(arrowX, arrowY, 1.5, 0, Math.PI * 2);
                this.ctx.fill();
            }
        }
        this.ctx.restore();
    }

    setCycloneCenter(x, y) {
        // Keeps cyclone center within reasonable bounds of the canvas screen
        this.cycloneCenter.x = Math.max(100, Math.min(this.canvas.width - 100, x));
        this.cycloneCenter.y = Math.max(80, Math.min(this.canvas.height - 120, y));
    }
}

window.WeatherEngine = WeatherEngine;
