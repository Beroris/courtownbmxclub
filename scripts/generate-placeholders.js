const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

// Ensure the images directory exists
const imagesDir = path.join(__dirname, '../public/images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Generate logo placeholder
const logoCanvas = createCanvas(200, 200);
const logoCtx = logoCanvas.getContext('2d');

// Purple background
logoCtx.fillStyle = '#6b21a8';
logoCtx.fillRect(0, 0, 200, 200);

// White text
logoCtx.fillStyle = '#ffffff';
logoCtx.font = 'bold 32px Arial';
logoCtx.textAlign = 'center';
logoCtx.textBaseline = 'middle';
logoCtx.fillText('BMX', 100, 100);

const logoBuffer = logoCanvas.toBuffer('image/png');
fs.writeFileSync(path.join(imagesDir, 'logo.png'), logoBuffer);

// Generate hero image placeholder
const heroCanvas = createCanvas(1920, 1080);
const heroCtx = heroCanvas.getContext('2d');

// Dark background
heroCtx.fillStyle = '#1f2937';
heroCtx.fillRect(0, 0, 1920, 1080);

// Add some shapes to simulate a track
heroCtx.fillStyle = '#4b5563';
heroCtx.beginPath();
heroCtx.moveTo(0, 800);
heroCtx.quadraticCurveTo(480, 600, 960, 700);
heroCtx.quadraticCurveTo(1440, 800, 1920, 600);
heroCtx.lineTo(1920, 1080);
heroCtx.lineTo(0, 1080);
heroCtx.closePath();
heroCtx.fill();

const heroBuffer = heroCanvas.toBuffer('image/jpeg');
fs.writeFileSync(path.join(imagesDir, 'hero-image.jpg'), heroBuffer);

console.log('Placeholder images generated successfully!');
