export default {
  name: 'event',
  title: 'Evento & Incontro Calendario',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titolo Evento',
      type: 'string',
      description: 'Esempio: Tavola Rotonda: Rigenerazione Urbana e Coesione Sociale',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'date',
      title: 'Data dell\'Evento',
      type: 'date',
      description: 'Formato YYYY-MM-DD (es. 2026-08-25)',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'time',
      title: 'Orario Inizio',
      type: 'string',
      description: 'Formato HH:MM (es. 18:30)',
      initialValue: '18:00',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Tipologia / Categoria Evento',
      type: 'string',
      options: {
        list: [
          { title: 'Tavola Rotonda', value: 'Tavola Rotonda' },
          { title: 'Presentazione Report', value: 'Presentazione Report' },
          { title: 'Workshop', value: 'Workshop' },
          { title: 'Incontro Pubblico', value: 'Incontro Pubblico' },
          { title: 'Festival', value: 'Festival' },
          { title: 'Laboratorio', value: 'Laboratorio' },
        ],
      },
      initialValue: 'Incontro Pubblico',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'location',
      title: 'Luogo / Sede',
      type: 'string',
      description: 'Esempio: Sede Fondazione VERACE - Via della Spiga 24, Roma (o In Streaming)',
      initialValue: 'Sede Fondazione VERACE - Via della Spiga 24, Roma',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Descrizione Evento',
      type: 'text',
      rows: 4,
      description: 'Sintesi dei temi trattati, finalità dell\'incontro e dettagli per il pubblico.',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'speakers',
      title: 'Ospiti & Relatori',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Aggiungi i nomi degli ospiti, relatori, moderatori o artisti coinvolti.',
    },
    {
      name: 'isFree',
      title: 'Ingresso Gratuito',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'registrationUrl',
      title: 'Link Registrazione Esterno (Opzionale)',
      type: 'url',
      description: 'Se vuoto, rimanda alla pagina Contatti del sito.',
    },
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      time: 'time',
      category: 'category',
    },
    prepare(selection: any) {
      const { title, date, time, category } = selection;
      return {
        title: title,
        subtitle: `${date || 'Data da definire'} ore ${time || ''} [${category || 'Evento'}]`,
      };
    },
  },
};
