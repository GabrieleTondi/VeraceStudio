export default {
  name: 'newsletterSubscriber',
  title: 'Iscritto Newsletter',
  type: 'document',
  fields: [
    {
      name: 'email',
      title: 'Indirizzo Email',
      type: 'string',
      validation: (Rule: any) =>
        Rule.required()
          .email()
          .error('Inserisci un indirizzo email valido.'),
    },
    {
      name: 'name',
      title: 'Nome Completo (Opzionale)',
      type: 'string',
    },
    {
      name: 'status',
      title: 'Stato Iscrizione',
      type: 'string',
      options: {
        list: [
          { title: '✓ Attivo (Riceve le newsletter)', value: 'active' },
          { title: '✕ Disiscritto', value: 'unsubscribed' },
        ],
        layout: 'radio',
      },
      initialValue: 'active',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'source',
      title: 'Fonte Iscrizione',
      type: 'string',
      initialValue: 'Sito Web (Footer)',
      description: 'Es. Modulo Footer, Pagina Contatti, Importazione Manuale',
    },
    {
      name: 'subscribedAt',
      title: 'Data e Ora Iscrizione',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'unsubscribedAt',
      title: 'Data Disiscrizione',
      type: 'datetime',
      readOnly: true,
      hidden: ({ document }: any) => document?.status !== 'unsubscribed',
    },
    {
      name: 'notes',
      title: 'Note Interne',
      type: 'text',
      rows: 2,
    },
  ],
  preview: {
    select: {
      email: 'email',
      name: 'name',
      status: 'status',
      date: 'subscribedAt',
    },
    prepare(selection: any) {
      const { email, name, status, date } = selection;
      const formattedDate = date ? new Date(date).toLocaleDateString('it-IT') : '';
      const isUnsubscribed = status === 'unsubscribed';
      return {
        title: email || 'Senza email',
        subtitle: `${isUnsubscribed ? '✕ Disiscritto' : '✓ Attivo'}${name ? ` · ${name}` : ''} (${formattedDate})`,
      };
    },
  },
};
