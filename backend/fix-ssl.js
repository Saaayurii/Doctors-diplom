const fs = require('fs');
const path = require('path');

function fixSSLInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace SSL configuration with ssl: false
  const sslPattern = /ssl:\s*{\s*rejectUnauthorized:\s*(true|false),?\s*}/g;
  content = content.replace(sslPattern, 'ssl: false');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Fixed: ${filePath}`);
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      walkDir(filePath);
    } else if (file.endsWith('.js')) {
      fixSSLInFile(filePath);
    }
  });
}

const databaseDir = path.join(__dirname, 'Database');
walkDir(databaseDir);
console.log('\nSSL configuration fixed in all Database files!');
