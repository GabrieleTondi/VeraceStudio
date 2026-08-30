import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.PUBLIC_SANITY_PROJECT_ID || '83ude8vy',
  dataset: process.env.PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_AUTH_TOKEN || 'skMtQJwkpdw6XXaMfXq4dudkzSOpSHnfx9mdvkksnUoaS4kWQ2zzlOPZNbhcJgj4iboOa252479emrkcffb1GQkCUhLZPMN3goZ5bD4pg8UhqcGTYb1UXV5XN6srDkWJjrl8OHq0RzakU9x4C7On98pvP2TQV9CtaQMyLrSMGeobOaMuOFZu',
  useCdn: false,
});

async function main() {
  console.log('Verifica / Inizializzazione Slider Home su Sanity...');

  const existing = await client.fetch(`*[_type == "heroSlider"][0]`);
  if (existing) {
    console.log('Documento heroSlider già esistente in Sanity:', existing._id);
    return;
  }

  const doc = {
    _type: 'heroSlider',
    title: 'Slider Principale Home Page',
    headline: 'Media cultura e rigenerazione per il territorio',
    primaryButtonText: 'scopri i progetti',
    primaryButtonLink: '/progetti',
    secondaryButtonText: 'esplora il nostro magazine',
    secondaryButtonLink: '/magazine',
    slides: [
      {
        _key: 'slide_1',
        title: 'Scuola di Territorio',
        category: 'Educazione & Territorio',
        alt: 'Scuola di Territorio a Reggio Emilia',
      },
      {
        _key: 'slide_2',
        title: 'Spazi & Architetture',
        category: 'Rigenerazione Urbana',
        alt: 'Spazi di rigenerazione urbana e comunità',
      },
      {
        _key: 'slide_3',
        title: 'La Bela - Filiera Lana',
        category: 'Appennino Reggiano',
        alt: "Progetto La Bela sull'Appennino Reggiano",
      },
      {
        _key: 'slide_4',
        title: 'Innovazione & Territorio',
        category: 'Cultura Contemporanea',
        alt: 'Cultura visiva ed innovazione territoriale',
      },
      {
        _key: 'slide_5',
        title: 'Viaggi Domenicali Minimi',
        category: 'Paesaggio Emiliano',
        alt: 'Viaggi Domenicali Minimi nel paesaggio di Luigi Ghirri',
      },
    ],
  };

  const created = await client.create(doc);
  console.log('✓ Documento heroSlider inizializzato con successo:', created._id);
}

main().catch(console.error);
