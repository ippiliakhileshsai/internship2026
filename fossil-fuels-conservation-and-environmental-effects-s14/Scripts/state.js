window.State = {
  co2: 280,           
  earthHealth: 100,   
  temp: 15,           
  seaRise: 0,         
  iceCover: 100,      
  biodiversity: 'High',
  coal: false,
  car: false,
  solar: false,
  wind: false,
  climatePaused: false,
  climateSpeed: 1,
  co2Rate: 20,
  forestCover: 80,
  challengeScore: 0,
  currentQuestion: 0,
  starsEarned: 0,
  thermoDragged: false,
};

window.MathUtils = {
  lerp(a, b, t) { 
    return a + (b - a) * t; 
  },
  clamp(v, lo, hi) { 
    return Math.max(lo, Math.min(hi, v)); 
  }
};