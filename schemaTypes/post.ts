export default {
  name: 'post',
  title: 'Articolo Magazine',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titolo Articolo',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'subtitle',
      title: 'Sottotitolo / Sommario / Hook sentence',
      type: 'text',
      rows: 3,
      description: 'Sottotitolo descrittivo o frase gancio dell\'inchiesta.',
    },
    {
      name: 'author',
      title: 'Autore / Intervistatore / Protagonisti',
      type: 'string',
      description: 'Es: Taima Sallami (22 anni, Abitante del quartiere da 9 anni) o Redazione VERACE',
    },
    {
      name: 'credits',
      title: 'Crediti & Fotografie',
      type: 'string',
      description: 'Es: Fotografie di Simone Todaro realizzate nel Luglio 2024',
    },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Categoria / Tematica',
      type: 'string',
      options: {
        list: [
          { title: 'Inchieste & Cultura', value: 'Inchieste' },
          { title: 'Innovazione Sociale', value: 'Innovazione' },
          { title: 'Sostenibilità', value: 'Sostenibilita' },
          { title: 'Città & Comunità', value: 'Comunita' },
          { title: 'Reportage Fotografico', value: 'Reportage' },
          { title: 'Ambiente & Territorio', value: 'Ambiente' },
          { title: 'Fotografia & Sguardi', value: 'Fotografia' },
          { title: 'Dossier Dati & Indicatori', value: 'Dossier' },
          { title: 'Manifesto Editoriale', value: 'Manifesto' },
          { title: 'Ricerca & Sviluppo', value: 'Ricerca' },
        ],
      },
      initialValue: 'Inchieste',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'coverMedia',
      title: 'Copertina (Foto/Video)',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'caption',
          type: 'string',
          title: 'Didascalia Immagine',
        },
        {
          name: 'altText',
          type: 'string',
          title: 'Testo Alternativo (Alt Text per Accessibilità)',
        },
      ],
    },
    {
      name: 'pullquotes',
      title: 'Frasi da mettere in risalto (Pull quotes / Citazioni in evidenza)',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Inserisci una o più frasi chiave o citazioni d\'impatto da evidenziare graficamente nell\'articolo.',
    },
    {
      name: 'sideNotes',
      title: 'Piccole didascalie, descrizioni o riquadretti nel tempo (Approfondimenti)',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Riquadro di Approfondimento / Nota a Margine',
          fields: [
            {
              name: 'title',
              title: 'Titolo Riquadro (es: Origini, Vocabolario, Banca Interna)',
              type: 'string',
            },
            {
              name: 'text',
              title: 'Testo della nota / Didascalia di approfondimento',
              type: 'text',
              rows: 4,
              validation: (Rule: any) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'text',
            },
          },
        },
      ],
    },
    {
      name: 'gallery',
      title: 'Galleria Immagini (Reportage Fotografico)',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'caption', type: 'string', title: 'Didascalia' },
            { name: 'altText', type: 'string', title: 'Alt Text' },
          ],
        },
      ],
    },
    {
      name: 'body',
      title: 'Corpo del Testo & Paragrafi',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Paragrafo Normale', value: 'normal' },
            { title: 'Titolo Sezione (H2)', value: 'h2' },
            { title: 'Sottotitolo Sezione (H3)', value: 'h3' },
            { title: 'Citazione Blockquote', value: 'blockquote' },
          ],
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'caption', type: 'string', title: 'Didascalia' },
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      title: 'Data Pubblicazione',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'readingTime',
      title: 'Tempo di lettura stimato (minuti)',
      type: 'number',
      initialValue: 6,
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'coverMedia',
    },
  },
};
