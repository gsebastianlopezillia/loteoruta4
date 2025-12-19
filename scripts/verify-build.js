const fs = require('fs');
const path = require('path');

const buildDir = path.join(__dirname, '..', 'build');
const requiredFiles = [
  'index.html',
  'manifest.json',
  'favicon.svg',
  'robots.txt',
  'sitemap.xml',
  '.nojekyll'
];

console.log('🔍 Verificando archivos del build...\n');

let allOk = true;

requiredFiles.forEach(file => {
  const filePath = path.join(buildDir, file);
  const exists = fs.existsSync(filePath);
  
  if (exists) {
    const stats = fs.statSync(filePath);
    console.log(`✅ ${file} (${(stats.size / 1024).toFixed(2)} KB)`);
  } else {
    console.log(`❌ ${file} - FALTANTE`);
    allOk = false;
  }
});

console.log('\n📁 Contenido del directorio build:');
const buildFiles = fs.readdirSync(buildDir);
buildFiles.forEach(file => {
  const filePath = path.join(buildDir, file);
  const stats = fs.statSync(filePath);
  const isDir = stats.isDirectory();
  const size = isDir ? '[DIR]' : `${(stats.size / 1024).toFixed(2)} KB`;
  console.log(`   ${isDir ? '📁' : '📄'} ${file} ${size}`);
});

if (allOk) {
  console.log('\n✅ Todos los archivos requeridos están presentes!');
  process.exit(0);
} else {
  console.log('\n❌ Faltan algunos archivos requeridos!');
  process.exit(1);
}
