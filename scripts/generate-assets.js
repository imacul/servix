const sharp = require('sharp');
const path = require('path');

const outDir = path.join(__dirname, '..', 'assets');
const primary = '#1E4D7B';
const accent = '#25B9A5';

const svgLogo = (size, withBg, bgColor = primary) => {
  const c = size / 2;
  const r = size * 0.24;
  const ring = size * 0.04;
  const needleTop = c - r * 1.1;
  const needleLeft = c - r * 0.55;
  const needleRight = c + r * 0.55;
  const needleBottom = c + r * 0.8;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${primary}" />
      <stop offset="100%" stop-color="${accent}" />
    </linearGradient>
  </defs>
  ${withBg ? `<rect width="${size}" height="${size}" rx="${size * 0.22}" fill="${bgColor}"/>` : ''}
  <circle cx="${c}" cy="${c}" r="${r}" fill="none" stroke="rgba(255,255,255,0.9)" stroke-width="${ring}" />
  <circle cx="${c}" cy="${c}" r="${r * 0.55}" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="${ring * 0.6}" />
  <path d="M ${c} ${needleTop} L ${needleLeft} ${needleBottom} L ${needleRight} ${needleBottom} Z" fill="#FFFFFF" />
  <circle cx="${c}" cy="${c}" r="${ring}" fill="#FFFFFF" />
</svg>`;
};

async function run() {
  const iconSvg = svgLogo(1024, true, primary);
  const adaptiveSvg = svgLogo(1024, false);
  const splashCanvas = 2000;
  const splashLogo = 640;

  const splashBg = `<svg width="${splashCanvas}" height="${splashCanvas}" viewBox="0 0 ${splashCanvas} ${splashCanvas}" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="${primary}" />
  </svg>`;

  const splashLogoSvg = svgLogo(splashLogo, false);

  const splashBase = sharp(Buffer.from(splashBg)).png();
  const splashMark = await sharp(Buffer.from(splashLogoSvg)).png().toBuffer();

  await sharp(Buffer.from(iconSvg)).png().toFile(path.join(outDir, 'icon.png'));
  await sharp(Buffer.from(adaptiveSvg)).png().toFile(path.join(outDir, 'adaptive-icon.png'));
  await splashBase
    .composite([{ input: splashMark, gravity: 'center' }])
    .toFile(path.join(outDir, 'splash-icon.png'));
  await sharp(Buffer.from(svgLogo(48, true, primary))).png().toFile(path.join(outDir, 'favicon.png'));

  console.log('Assets generated');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
