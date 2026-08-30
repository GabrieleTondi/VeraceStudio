import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '83ude8vy',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'skMtQJwkpdw6XXaMfXq4dudkzSOpSHnfx9mdvkksnUoaS4kWQ2zzlOPZNbhcJgj4iboOa252479emrkcffb1GQkCUhLZPMN3goZ5bD4pg8UhqcGTYb1UXV5XN6srDkWJjrl8OHq0RzakU9x4C7On98pvP2TQV9CtaQMyLrSMGeobOaMuOFZu',
  useCdn: false,
});

async function main() {
  console.log('Creazione Iscritto di Test in Sanity...');
  const res = await client.create({
    _type: 'newsletterSubscriber',
    email: 'redazione@verace-re.eu',
    name: 'Redazione VERACE Studio',
    status: 'active',
    source: 'Inizializzazione Sistema',
    subscribedAt: new Date().toISOString(),
  });
  console.log('✓ Iscritto creato:', res._id, res.email);
}

main().catch(console.error);
