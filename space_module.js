// space_module.js - Moduł kosmiczny (planety, gwiazdy, orbity)

export function initSpaceModule() {
  const canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 600;
  canvas.style.border = '2px solid #00ffff';
  canvas.style.borderRadius = '10px';
  canvas.style.backgroundColor = '#000011';
  
  const ctx = canvas.getContext('2d');
  
  // Dane planet
  const planets = [
    { name: 'Mars', x: 150, y: 300, radius: 40, color: '#cd5c5c', speed: 0.02 },
    { name: 'Earth', x: 300, y: 300, radius: 45, color: '#4169e1', speed: 0.01 },
    { name: 'Jupiter', x: 500, y: 300, radius: 60, color: '#daa520', speed: 0.005 }
  ];
  
  let angle = 0;
  
  function drawSpace() {
    // Czyść canvas
    ctx.fillStyle = '#000011';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Gwiazdy w tle
    ctx.fillStyle = '#ffffff';
    for (let i = 0; i < 100; i++) {
      const x = (i * 137.5) % canvas.width;
      const y = (i * 219.3) % canvas.height;
      ctx.fillRect(x, y, 2, 2);
    }
    
    // Słońce
    const sunX = canvas.width / 2;
    const sunY = canvas.height / 2;
    const sunGradient = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, 50);
    sunGradient.addColorStop(0, '#ffff00');
    sunGradient.addColorStop(0.5, '#ffa500');
    sunGradient.addColorStop(1, '#ff4500');
    
    ctx.fillStyle = sunGradient;
    ctx.beginPath();
    ctx.arc(sunX, sunY, 50, 0, Math.PI * 2);
    ctx.fill();
    
    // Planety na orbitach
    planets.forEach(planet => {
      const orbitRadius = Math.abs(planet.x - sunX);
      const planetAngle = angle * planet.speed;
      const px = sunX + Math.cos(planetAngle) * orbitRadius;
      const py = sunY + Math.sin(planetAngle) * orbitRadius;
      
      // Orbita
      ctx.strokeStyle = '#333333';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(sunX, sunY, orbitRadius, 0, Math.PI * 2);
      ctx.stroke();
      
      // Planeta
      ctx.fillStyle = planet.color;
      ctx.beginPath();
      ctx.arc(px, py, planet.radius, 0, Math.PI * 2);
      ctx.fill();
      
      // Nazwa planety
      ctx.fillStyle = '#00ffff';
      ctx.font = '12px monospace';
      ctx.fillText(planet.name, px - 20, py - planet.radius - 10);
    });
    
    // Etykieta
    ctx.fillStyle = '#00ffff';
    ctx.font = '20px monospace';
    ctx.fillText('SPACE MODULE ACTIVE', 20, 40);
    ctx.fillText('Solar System Simulation', 20, 70);
  }
  
  // Animacja
  function animate() {
    angle += 0.01;
    drawSpace();
    requestAnimationFrame(animate);
  }
  animate();
  
  return canvas;
}

export function getSpaceData() {
  return {
    name: 'Space Module',
    type: 'Solar System',
    planets: ['Mars', 'Earth', 'Jupiter'],
    status: 'ACTIVE'
  };
}
