
/**
 * Atmosphere Explorer - Particle Physics Engine
 * Handles smoke particles, exhaust, wind forces, and AQI calculations.
 */
 
class Particle {
    constructor(x, y, type = 'smoke') {
        this.x = x;
        this.y = y;
        this.type = type;
        
        // Setup initial velocities with small random deviation
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = type === 'smoke' ? -Math.random() * 1.5 - 0.5 : (Math.random() - 0.5) * 0.4;
        
        // Physical styling
        this.size = type === 'smoke' ? Math.random() * 6 + 4 : Math.random() * 3 + 2;
        this.maxLife = type === 'smoke' ? Math.random() * 180 + 120 : Math.random() * 90 + 60;
        this.life = this.maxLife;
        this.alpha = 0.8;
        
        // Soot colors (grayish dark for factory, light-gray/blue for vehicle exhaust)
        if (type === 'smoke') {
            const grayVal = Math.floor(Math.random() * 40) + 40; // dark gray
            this.color = `rgba(${grayVal}, ${grayVal + 5}, ${grayVal + 10}, `;
        } else {
            const blueVal = Math.floor(Math.random() * 30) + 120;
            this.color = `rgba(${blueVal - 20}, ${blueVal - 10}, ${blueVal}, `;
        }
    }
 
    update(windSpeed, windAngleRad, timeScale, isCyclone, cycloneCenter) {
        // 1. Apply Wind Force
        // Wind speed is simulated on a scale. We convert speed and angle into vector forces.
        const windForceX = Math.cos(windAngleRad) * windSpeed * 0.012;
        const windForceY = Math.sin(windAngleRad) * windSpeed * 0.012;
        
        // 2. Apply Cyclone Forces (if cyclone is active)
        let cycloneForceX = 0;
        let cycloneForceY = 0;
        if (isCyclone && cycloneCenter) {
            const dx = this.x - cycloneCenter.x;
            const dy = this.y - cycloneCenter.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist > 10) {
                // Radial suction pull (towards the eye)
                const pullStrength = Math.min(6, 150 / dist);
                const ux = dx / dist;
                const uy = dy / dist;
                cycloneForceX = -ux * pullStrength * 0.2;
                cycloneForceY = -uy * pullStrength * 0.2;
                
                // Tangential spiral circulation (counter-clockwise)
                // Tangential vector is (-uy, ux)
                const spinStrength = Math.min(8, 250 / dist);
                cycloneForceX += -uy * spinStrength * 0.35;
                cycloneForceY += ux * spinStrength * 0.35;
            }
        }
 
        // 3. Fluid Drag Force
        // Drag acts in opposition to the velocity vector to limit terminal velocity.
        const dragCoeff = this.type === 'smoke' ? 0.015 : 0.025;
        const dragForceX = -this.vx * dragCoeff;
        const dragForceY = -this.vy * dragCoeff;
 
        // 4. Update Velocities (Newtonian steps)
        this.vx += (windForceX + dragForceX + cycloneForceX) * timeScale;
        this.vy += (windForceY + dragForceY + cycloneForceY) * timeScale;
 
// Realistic smoke buoyancy
        if (this.type === 'smoke') {
 
          const lift = 0.008;
          const gravity = 0.005;
 
          this.vy -= lift * timeScale;
          this.vy += gravity * timeScale;
}
 
// 5. Update Coordinates
        this.x += this.vx * timeScale;
        this.y += this.vy * timeScale;
        // 6. Life decay
        this.life -= 1 * timeScale;
        this.alpha = Math.max(0, this.life / this.maxLife);
        
        // Expand size as smoke disperses
        this.size += 0.04 * timeScale;
    }
 
    draw(ctx) {
        ctx.save();
        ctx.beginPath();
        const grad = ctx.createRadialGradient(this.x, this.y, 1, this.x, this.y, this.size);
        grad.addColorStop(0, this.color + this.alpha + ')');
        grad.addColorStop(1, this.color + '0)');
        ctx.fillStyle = grad;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}
 
class Vehicle {
    constructor(direction = 1) {
        this.direction = direction; // 1 = Left-to-Right, -1 = Right-to-Left
        this.x = direction === 1 ? -60 : 860;
        this.y = 475;
        this.speed = Math.random() * 2 + 1.5;
        
        // Visual characteristics
        this.color = ['#e74c3c', '#3498db', '#f1c40f', '#9b59b6', '#1abc9c'][Math.floor(Math.random() * 5)];
        this.width = 30;
        this.height = 14;
    }
 
    update(timeScale) {
        this.x += this.direction * this.speed * timeScale;
    }
 
    draw(ctx) {
        ctx.fillStyle = this.color;
        // Draw main body
        ctx.fillRect(this.x, this.y - this.height, this.width, this.height - 4);
        // Draw cabin cabin dome
        ctx.fillRect(this.x + 6, this.y - this.height - 4, this.width - 12, 5);
        // Draw tires
        ctx.fillStyle = '#111';
        ctx.beginPath();
        ctx.arc(this.x + 7, this.y, 4, 0, Math.PI * 2);
        ctx.arc(this.x + 23, this.y, 4, 0, Math.PI * 2);
        ctx.fill();
        // Draw head/taillights
        ctx.fillStyle = this.direction === 1 ? '#f1c40f' : '#e74c3c';
        ctx.fillRect(this.direction === 1 ? this.x + this.width - 3 : this.x, this.y - this.height + 2, 3, 3);
    }
}
 
class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.vehicles = [];
        
        // Emitter locations
        this.factoryEmitter = { x: 131, y: 270 };
        this.lastVehicleEmit = 0;
        
        // Grid setup for spatial density monitoring
        this.gridCols = 10;
        this.gridRows = 6;
        this.grid = Array(this.gridCols * this.gridRows).fill(0);
        this.aqi = 0;
 
        // Residential zone (the houses sit roughly at x:355-555, y:380-450 on the
        // 800x500 canvas). With a 10x6 grid (80px x 83.3px cells) that maps to
        // columns 4-6 and rows 4-5. AQI "hotspot" detection is scoped to this
        // zone so the score reflects pollution *near the houses* specifically -
        // matching the mission descriptions ("Protect the Houses", "move
        // pollution away from houses"). Without this, pollution concentrated
        // elsewhere (e.g. pulled into a cyclone eye away from the houses) would
        // still spike the AQI and make the objective impossible to complete.
        this.houseZone = { colStart: 4, colEnd: 6, rowStart: 4, rowEnd: 5 };
    }
 
    addParticle(x, y, type) {
        this.particles.push(new Particle(x, y, type));
    }
 
    update(windSpeed, windAngleRad, timeScale, emitFactory, emitVehicles, isCyclone, cycloneCenter) {
        // 1. Emit Factory smoke
        if (emitFactory && Math.random() < 0.45 * timeScale) {
            // Slight coordinate jitter at emission mouth
            const rx = this.factoryEmitter.x + (Math.random() - 0.5) * 6;
            this.addParticle(rx, this.factoryEmitter.y, 'smoke');
        }
 
        // 2. Manage Vehicles and Emitters
        if (Math.random() < 0.005 * timeScale && this.vehicles.length < 3) {
            const dir = Math.random() < 0.5 ? 1 : -1;
            this.vehicles.push(new Vehicle(dir));
        }
 
        // Update Vehicles & emit exhaust
        for (let i = this.vehicles.length - 1; i >= 0; i--) {
            const car = this.vehicles[i];
            car.update(timeScale);
            
            // Emit exhaust particles from tail pipe
            if (emitVehicles && Math.random() < 0.15 * timeScale) {
                const pipeX = car.direction === 1 ? car.x : car.x + car.width;
                this.addParticle(pipeX, car.y - 2, 'exhaust');
            }
 
            // Remove out-of-screen cars
            if ((car.direction === 1 && car.x > 860) || (car.direction === -1 && car.x < -60)) {
                this.vehicles.splice(i, 1);
            }
        }
 
        // 3. Update all particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.update(windSpeed, windAngleRad, timeScale, isCyclone, cycloneCenter);
 
            // Bounds/Life checks: Delete if offscreen or expired
            const margin = 50;
            if (p.life <= 0 || 
                p.x < -margin || p.x > this.canvas.width + margin ||
                p.y < -margin || p.y > this.canvas.height + margin) {
                this.particles.splice(i, 1);
            }
        }
 
        // 4. Calculate AQI Grid and Overall AQI
        this.calculateSpatialAQI();
    }
 
    draw(showAQIGrid) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
 
        // 1. Draw Heatmap (AQI Grid Layer)
        if (showAQIGrid) {
            this.drawAQIHeatmap();
        }
 
        // 2. Draw vehicles
        this.vehicles.forEach(car => car.draw(this.ctx));
 
        // 3. Draw particles
        this.particles.forEach(p => p.draw(this.ctx));
    }
 
    /**
     * Splits viewport canvas into spatial grids and gauges particle concentration.
     */
    calculateSpatialAQI() {
        this.grid.fill(0);
        const cellW = this.canvas.width / this.gridCols;
        const cellH = this.canvas.height / this.gridRows;
 
        // Count particles in each cell
        this.particles.forEach(p => {
            const c = Math.floor(p.x / cellW);
            const r = Math.floor(p.y / cellH);
            if (c >= 0 && c < this.gridCols && r >= 0 && r < this.gridRows) {
                this.grid[r * this.gridCols + c]++;
            }
        });
 
        // Compute global AQI based on average concentrations in key urban areas
        let totalParticles = this.particles.length;
 
        // Hotspot density is measured ONLY within the residential zone
        // (where the houses are), not the densest cell on the whole canvas.
        // This way moving pollution away from the houses (e.g. into a cyclone
        // eye positioned elsewhere) actually lowers the AQI, as the mission
        // objectives describe.
        const { colStart, colEnd, rowStart, rowEnd } = this.houseZone;
        let hotspotDensity = 0;
        for (let r = rowStart; r <= rowEnd; r++) {
            for (let c = colStart; c <= colEnd; c++) {
                const count = this.grid[r * this.gridCols + c];
                if (count > hotspotDensity) hotspotDensity = count;
            }
        }
 
        this.aqi = Math.min(
          500,
          Math.round(
            totalParticles * 2 +
            hotspotDensity * 10
    )
);
    }
 
    /**
     * Renders a colorful low-opacity overlay grid visualizing AQI hot-zones.
     */
    drawAQIHeatmap() {
        const cellW = this.canvas.width / this.gridCols;
        const cellH = this.canvas.height / this.gridRows;
        
        this.ctx.save();
        for (let r = 0; r < this.gridRows; r++) {
            for (let c = 0; c < this.gridCols; c++) {
                const count = this.grid[r * this.gridCols + c];
                if (count === 0) continue;
 
                // Map count to AQI colors
                let color = 'rgba(46, 204, 113, 0.15)'; // Good
                if (count > 8) color = 'rgba(126, 53, 23, 0.4)'; // Hazardous
                else if (count > 6) color = 'rgba(155, 89, 182, 0.35)'; // Very Unhealthy
                else if (count > 4) color = 'rgba(231, 76, 60, 0.3)'; // Unhealthy
                else if (count > 2) color = 'rgba(230, 126, 34, 0.25)'; // Sensitive
                else if (count > 1) color = 'rgba(241, 196, 15, 0.2)'; // Moderate
                
                this.ctx.fillStyle = color;
                this.ctx.fillRect(c * cellW, r * cellH, cellW - 1, cellH - 1);
                
                // Show particle count number inside grid cell for pedagogical insights
                this.ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
                this.ctx.font = '9px Space Grotesk';
                this.ctx.textAlign = 'center';
                this.ctx.fillText(count, c * cellW + cellW/2, r * cellH + cellH/2 + 3);
            }
        }
        this.ctx.restore();
    }
 
    // Rain drop collision cleaner. Removes particles upon hit.
    checkRainCollisions(rainDrops) {
        let cleanCount = 0;
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            for (let j = 0; j < rainDrops.length; j++) {
                const r = rainDrops[j];
                
                // Bounding box approximation of droplet intersection
                const dx = p.x - r.x;
                const dy = p.y - r.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < p.size + 8) {
                    // Collision! Remove particle, trigger splash, consume raindrop
                    this.particles.splice(i, 1);
                    rainDrops.splice(j, 1);
                    cleanCount++;
                    break;
                }
            }
        }
        return cleanCount;
    }
 
    reset() {
        this.particles = [];
        this.vehicles = [];
        this.aqi = 0;
        this.grid.fill(0);
    }
}
 
// Bind to window context for access by main.js
window.ParticleSystem = ParticleSystem