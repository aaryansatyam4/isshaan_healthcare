const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function optimizeImages() {
  const publicDir = path.join(__dirname, '..', 'public');
  
  // List of large images to optimize
  const imagesToOptimize = [
    { name: 'med.jpg', quality: 60 },
    { name: 'companyoverview.jpg', quality: 70 },
    { name: 'plant.jpg', quality: 70 },
    { name: 'form.jpg', quality: 70 },
  ];
  
  for (const img of imagesToOptimize) {
    const inputPath = path.join(publicDir, img.name);
    const outputPath = path.join(publicDir, `optimized-${img.name}`);
    
    try {
      await sharp(inputPath)
        .jpeg({ quality: img.quality, progressive: true })
        .resize(1920, null, { 
          withoutEnlargement: true,
          fit: 'inside'
        })
        .toFile(outputPath);
        
      const originalStats = await fs.stat(inputPath);
      const optimizedStats = await fs.stat(outputPath);
      
      const reduction = ((1 - optimizedStats.size / originalStats.size) * 100).toFixed(1);
      console.log(`${img.name}: ${(originalStats.size / 1024 / 1024).toFixed(1)}MB → ${(optimizedStats.size / 1024 / 1024).toFixed(1)}MB (${reduction}% reduction)`);
    } catch (error) {
      console.error(`Error optimizing ${img.name}:`, error.message);
    }
  }
}

optimizeImages().catch(console.error);