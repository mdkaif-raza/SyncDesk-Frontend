const fs = require('fs');
const path = require('path');

const SOURCE_ICON = path.join(__dirname, '..', 'src', 'assets', 'icons', 'appicon.jpg');
const RES_DIR = path.join(__dirname, '..', 'android', 'app', 'src', 'main', 'res');

const MIPMAP_FOLDERS = [
  'mipmap-mdpi',
  'mipmap-hdpi',
  'mipmap-xhdpi',
  'mipmap-xxhdpi',
  'mipmap-xxxhdpi',
];

function setAppIcon() {
  if (!fs.existsSync(SOURCE_ICON)) {
    console.error(`\n❌ Source icon not found at: ${SOURCE_ICON}`);
    console.log('Please ensure your icon is placed at: src/assets/icons/appicon.jpg\n');
    return;
  }

  console.log(`\n🚀 Setting app icon from: ${SOURCE_ICON}...`);

  MIPMAP_FOLDERS.forEach((folder) => {
    const targetDir = path.join(RES_DIR, folder);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    // Set square icon
    const squarePath = path.join(targetDir, 'ic_launcher.png');
    fs.copyFileSync(SOURCE_ICON, squarePath);

    // Set round icon
    const roundPath = path.join(targetDir, 'ic_launcher_round.png');
    fs.copyFileSync(SOURCE_ICON, roundPath);

    console.log(`  ✓ Updated ${folder} (ic_launcher.png & ic_launcher_round.png)`);
  });

  console.log('\n🎉 App icon successfully set for all Android resolutions!');
  console.log('Now run: npm run android (or npx react-native run-android)\n');
}

setAppIcon();

