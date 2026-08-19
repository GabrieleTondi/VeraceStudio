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
      title: 'Sottotitolo / Sommario',
      type: 'string',
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
      name: 'layoutType',
      title: 'Layout Visualizzazione Articolo',
      type: 'string',
      description: 'Scegli la modalità di impaginazione del post',
      options: {
        list: [
          { title: 'Layout Standard - Testo continuo con media in evidenza', value: 'standard' },
          { title: 'Layout Split-view - Colonna testo affiancata a blocchi multimediali', value: 'split-view' },
          { title: 'Layout PDF Reader - Sfoglia dossier/pubblicazione PDF originale', value: 'pdf-reader' },
          { title: 'Layout Focus Editoriale - Titoli bold, quote e formattazione d\'impatto', value: 'editorial-focus' },
          { title: 'Layout Fotogiornalismo - Griglie e lightbox fotografici', value: 'photo-journalism' },
          { title: 'Layout Data Dossier - Tabelle, indicatori e schede analitiche', value: 'data-dossier' },
          { title: 'Layout Manifesto - Tesi numerate e manifesto programmatico', value: 'manifesto-magazine' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'standard',
    },
    {
      name: 'pdfFile',
      title: 'File PDF (per layout PDF Reader)',
      type: 'file',
      options: {
        accept: '.pdf',
      },
      description: 'Carica il file PDF sfogliabile nell\'articolo.',
    },
    {
      name: 'gallery',
      title: 'Galleria Immagini (per reportage / fotogiornalismo)',
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
      title: 'Contenuto Testo & Paragrafi',
      type: 'array',
      of: [
        { type: 'block' },
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
      initialValue: 5,
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
