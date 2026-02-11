const fs = require('fs');
const path = require('path');

// Copy frontend assets
const frontendSrcPath = './frontend/src/assets/food-del-assets/assets/frontend_assets';
const frontendPublicPath = './frontend/public/assets';

// Copy admin assets
const adminSrcPath = './Admin/src/assets/admin_assets';
const adminPublicPath = './Admin/public/assets';

function copyAssets(srcDir, destDir) {
    if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
    }
    
    const files = fs.readdirSync(srcDir);
    files.forEach(file => {
        if (file !== 'assets.js') { // Skip the assets.js file
            const srcFile = path.join(srcDir, file);
            const destFile = path.join(destDir, file);
            fs.copyFileSync(srcFile, destFile);
            console.log(`Copied: ${file}`);
        }
    });
}

console.log('Copying frontend assets...');
copyAssets(frontendSrcPath, frontendPublicPath);

console.log('\nCopying admin assets...');
copyAssets(adminSrcPath, adminPublicPath);

console.log('\n✅ All assets copied successfully!');
