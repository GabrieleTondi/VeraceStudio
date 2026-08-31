import fs from 'node:fs';
import path from 'node:path';

const vcConfigPath = path.resolve('.vercel/output/functions/_render.func/.vc-config.json');
if (fs.existsSync(vcConfigPath)) {
  const content = JSON.parse(fs.readFileSync(vcConfigPath, 'utf8'));
  if (content.runtime === 'nodejs18.x') {
    content.runtime = 'nodejs20.x';
    fs.writeFileSync(vcConfigPath, JSON.stringify(content, null, 2));
    console.log('[fix-vercel-runtime] Patched runtime from nodejs18.x to nodejs20.x');
  }
}
