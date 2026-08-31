import fs from 'node:fs';
import path from 'node:path';

const functionsDir = path.resolve('.vercel/output/functions');
if (fs.existsSync(functionsDir)) {
  const entries = fs.readdirSync(functionsDir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory() && entry.name.endsWith('.func')) {
      const vcConfigPath = path.join(functionsDir, entry.name, '.vc-config.json');
      if (fs.existsSync(vcConfigPath)) {
        try {
          const content = JSON.parse(fs.readFileSync(vcConfigPath, 'utf8'));
          if (content.runtime === 'nodejs18.x' || !content.runtime || content.runtime.startsWith('nodejs18')) {
            content.runtime = 'nodejs20.x';
            fs.writeFileSync(vcConfigPath, JSON.stringify(content, null, 2));
            console.log(`[fix-vercel-runtime] Patched runtime in ${entry.name} from nodejs18.x to nodejs20.x`);
          }
        } catch (e) {
          console.error(`[fix-vercel-runtime] Error patching ${entry.name}:`, e);
        }
      }
    }
  }
}
