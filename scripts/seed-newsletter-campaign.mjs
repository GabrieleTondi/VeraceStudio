import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.PUBLIC_SANITY_PROJECT_ID || '83ude8vy',
  dataset: process.env.PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_AUTH_TOKEN || 'skMtQJwkpdw6XXaMfXq4dudkzSOpSHnfx9mdvkksnUoaS4kWQ2zzlOPZNbhcJgj4iboOa252479emrkcffb1GQkCUhLZPMN3goZ5bD4pg8UhqcGTYb1UXV5XN6srDkWJjrl8OHq0RzakU9x4C7On98pvP2TQV9CtaQMyLrSMGeobOaMuOFZu',
  useCdn: false,
});

async function main() {
  console.log('Verifica / Creazione Campagna Newsletter Esempio su Sanity...');

  const existing = await client.fetch(`*[_type == "newsletterCampaign"][0]`);
  if (existing) {
    console.log('Campagna già presente in Sanity:', existing.title);
    return;
  }

  const demoCampaign = {
    _type: 'newsletterCampaign',
    title: 'Newsletter #01 (Template Esempio Redazione)',
    subject: 'VERACE Magazine | Reportage, Memorie Urbane e Nuovi Spazi a Reggio Emilia',
    preheader: 'Leggi in anteprima il nuovo dossier editoriale e scopri gli eventi di comunità in programma.',
    headerBadge: 'EDIZIONE SPECIALE',
    senderName: 'VERACE Magazine',
    senderEmail: 'info@verace-re.eu',
    status: 'draft',
    content: [
      {
        _key: 'b1',
        _type: 'block',
        style: 'h1',
        children: [{ _key: 's1', _type: 'span', text: 'Benvenute e Benvenuti in VERACE' }],
      },
      {
        _key: 'b2',
        _type: 'block',
        style: 'lead',
        children: [
          { _key: 's2_1', _type: 'span', text: 'Questo è un ' },
          { _key: 's2_2', _type: 'span', text: 'template professionale di esempio', marks: ['strong', 'colorRed'] },
          { _key: 's2_3', _type: 'span', text: ' per la redazione di VERACE Studio e Bruma ETS.' },
        ],
      },
      {
        _key: 'b3',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 's3_1',
            _type: 'span',
            text: 'Con questo editor puoi personalizzare ogni dettaglio della comunicazione:',
          },
        ],
      },
      {
        _key: 'b4',
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        children: [
          { _key: 's4_1', _type: 'span', text: 'Stili di testo differenziati: Titoli H1, H2, H3, Lead e Paragrafi Standard' },
        ],
      },
      {
        _key: 'b5',
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        children: [
          { _key: 's5_1', _type: 'span', text: 'Colori personalizzati: ' },
          { _key: 's5_2', _type: 'span', text: 'Rosso VERACE (#B53D33)', marks: ['colorRed', 'strong'] },
          { _key: 's5_3', _type: 'span', text: ', ' },
          { _key: 's5_4', _type: 'span', text: 'Verde Smeraldo', marks: ['colorGreen', 'strong'] },
          { _key: 's5_5', _type: 'span', text: ', Nero profondo e Grigio' },
        ],
      },
      {
        _key: 'b6',
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        children: [
          { _key: 's6_1', _type: 'span', text: 'Formattazioni avanzate: ' },
          { _key: 's6_2', _type: 'span', text: 'Grassetto', marks: ['strong'] },
          { _key: 's6_3', _type: 'span', text: ', ' },
          { _key: 's6_4', _type: 'span', text: 'Corsivo', marks: ['em'] },
          { _key: 's6_5', _type: 'span', text: ', ' },
          { _key: 's6_6', _type: 'span', text: 'Sottolineato', marks: ['underline'] },
          { _key: 's6_7', _type: 'span', text: ' e ' },
          { _key: 's6_8', _type: 'span', text: 'Codice monospace', marks: ['code'] },
        ],
      },
      {
        _key: 'b7',
        _type: 'block',
        style: 'blockquote',
        children: [
          {
            _key: 's7_1',
            _type: 'span',
            text: '«Un magazine urbano ha il compito di raccontare ciò che vive sotto la superficie, dando voce alle memorie e alle trasformazioni della nostra comunità.»',
          },
        ],
      },
      {
        _key: 'b8',
        _type: 'emailCallout',
        title: 'NOTA EDITORIALE IN EVIDENZA',
        text: 'Puoi inserire box di approfondimento con bordi colorati tono su tono o sfondi scuri eleganti per annunci speciali o riassunti esecutivi.',
        variant: 'accent',
      },
      {
        _key: 'b9',
        _type: 'emailCta',
        text: 'ESPLORA GLI ULTIMI ARTICOLI →',
        url: 'https://fondazioneverace.eu/magazine',
        style: 'primary',
        alignment: 'left',
      },
    ],
  };

  const created = await client.create(demoCampaign);
  console.log('✓ Campagna di esempio creata con successo in Sanity:', created._id);
}

main().catch(console.error);
