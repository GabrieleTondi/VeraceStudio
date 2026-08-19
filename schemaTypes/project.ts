export default {
  name: 'project',
  title: 'Progetto Fondazione (Corporate B2B)',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Nome Progetto',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'status',
      title: 'Stato Progetto',
      type: 'string',
      options: {
        list: [
          { title: 'In Corso', value: 'In Corso' },
          { title: 'Concluso', value: 'Concluso' },
          { title: 'In Programmazione', value: 'In Programmazione' },
        ],
        layout: 'radio',
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'summary',
      title: 'Sintesi per Aziende Partner',
      type: 'text',
      description: 'Breve descrizione degli obiettivi, dell\'impatto sociale e delle opportunità di partnership B2B.',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'partners',
      title: 'Aziende & Partner Coinvolti',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'gallery',
      title: 'Galleria Immagini',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [{ name: 'caption', type: 'string', title: 'Didascalia' }]
        }
      ],
    },
    {
      name: 'attachedDoc',
      title: 'Documento PDF Presentazione',
      type: 'file',
      options: {
        accept: '.pdf',
      },
      description: 'Documentazione o scheda tecnica scaricabile per le aziende partner.',
    },
    {
      name: 'publishedAt',
      title: 'Data Pubblicazione',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule: any) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'status',
      media: 'gallery.0',
    },
  },
};
