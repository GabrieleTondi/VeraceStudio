import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Read .env if present
const envPath = path.join(rootDir, '.env');
let token = process.env.SANITY_AUTH_TOKEN || process.env.SANITY_API_TOKEN;
let projectId = process.env.PUBLIC_SANITY_PROJECT_ID || '83ude8vy';
let dataset = process.env.PUBLIC_SANITY_DATASET || 'production';

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [k, ...v] = trimmed.split('=');
      const val = v.join('=').trim().replace(/^["']|["']$/g, '');
      if (k.trim() === 'SANITY_AUTH_TOKEN' || k.trim() === 'SANITY_API_TOKEN') token = val;
      if (k.trim() === 'PUBLIC_SANITY_PROJECT_ID') projectId = val;
      if (k.trim() === 'PUBLIC_SANITY_DATASET') dataset = val;
    }
  }
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
});

function generateKey() {
  return Math.random().toString(36).substring(2, 12);
}

function fixKeysInObject(obj) {
  if (!obj || typeof obj !== 'object') return obj;

  if (Array.isArray(obj)) {
    return obj.map(item => {
      if (item && typeof item === 'object') {
        if (!item._key) {
          item._key = generateKey();
        }
        return fixKeysInObject(item);
      }
      return item;
    });
  }

  const newObj = {};
  for (const [k, v] of Object.entries(obj)) {
    newObj[k] = fixKeysInObject(v);
  }
  return newObj;
}

async function fixKeys() {
  console.log(`\n🔧 Riparazione e aggiunta _key agli array in Sanity [${projectId}:${dataset}]...\n`);

  const docs = await client.fetch(`*[_type in ["project", "post", "event", "teamMember", "financialReport"]]`);
  console.log(`Trovati ${docs.length} documenti da verificare.\n`);

  const tx = client.transaction();
  let updatedCount = 0;

  for (const doc of docs) {
    const original = JSON.stringify(doc);
    const fixed = fixKeysInObject(doc);
    if (JSON.stringify(fixed) !== original) {
      tx.createOrReplace(fixed);
      updatedCount++;
      console.log(`   ✓ Aggiunte chiavi uniche a [${doc._type}]: "${doc.title || doc.name || doc._id}"`);
    }
  }

  if (updatedCount > 0) {
    console.log(`\nSalvataggio di ${updatedCount} documenti aggiornati su Sanity...`);
    await tx.commit();
    console.log('🎉 Tutte le chiavi (_key) sono state generate e salvate con successo!\n');
  } else {
    console.log('Tutti i documenti avevano già le chiavi valide.');
  }
}

fixKeys().catch(err => {
  console.error('Errore:', err);
  process.exit(1);
});
