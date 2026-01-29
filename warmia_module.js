// warmia_module.js - Moduł terenu Warmii i Mazur

export function initWarmiaModule() {
  const canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 600;
  canvas.style.border = '2px solid #00ffff';
  canvas.style.borderRadius = '10px';
  
  const ctx = canvas.getContext('2d');
  
  // Rysowanie heightmapy Warmii
  function drawHeightmap() {
    // Gradient tła (teren)
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#1a4d2e');
    gradient.addColorStop(0.5, '#2d6a4f');
    gradient.addColorStop(1, '#52b788');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Symulacja wzgórz (prostokąty z gradientem)
    for (let i = 0; i < 10; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const width = 50 + Math.random() * 100;
      const height = 30 + Math.random() * 60;
      
      const hillGradient = ctx.createRadialGradient(x, y, 0, x, y, width);
      hillGradient.addColorStop(0, '#74c69d');
      hillGradient.addColorStop(1, '#2d6a4f');
      
      ctx.fillStyle = hillGradient;
      ctx.fillRect(x - width/2, y - height/2, width, height);
    }
    
    // Dodanie etykiety
    ctx.fillStyle = '#00ffff';
    ctx.font = '20px monospace';
    ctx.fillText('WARMIA MODULE ACTIVE', 20, 40);
    ctx.fillText('Terrain: Olsztyn Region', 20, 70);
  }
  
  drawHeightmap();
  
  // Animacja (opcjonalna)
  let frame = 0;
  function animate() {
    frame++;
    if (frame % 60 === 0) {
      drawHeightmap();
    }
    requestAnimationFrame(animate);
  }
  animate();
  
  return canvas;
}

export function getWarmiaData() {
  return {
    name: 'Warmia i Mazury',
    location: 'Olsztyn, Poland',
    coordinates: { lat: 53.77, lon: 20.48 },
    terrain: 'heightmap-based',
    status: 'ACTIVE'
  };
}
