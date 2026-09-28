export default {
  name: 'teamMember',
  title: 'Membro del Team',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nome e Cognome',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'role',
      title: 'Ruolo / Ambito di Collaborazione',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Tipologia / Sezione',
      type: 'string',
      options: {
        list: [
          { title: 'Core Team', value: 'team' },
          { title: 'Collaboratore', value: 'collaboratore' },
        ],
        layout: 'radio',
      },
      initialValue: 'team',
    },
    {
      name: 'photo',
      title: 'Foto Profilo',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'bio',
      title: 'Breve Biografia o Descrizione',
      type: 'text',
    },
    {
      name: 'order',
      title: 'Ordine di Visualizzazione',
      type: 'number',
      description: 'Numero per definire l\'ordine di comparsa nel sito (1 per primo, 2 per secondo, ecc.)',
      initialValue: 10,
    },
    {
      name: 'linkedinUrl',
      title: 'Link Profilo o Portfolio',
      type: 'url',
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      category: 'category',
      media: 'photo',
    },
    prepare({ title, subtitle, category, media }: any) {
      const typeLabel = category === 'collaboratore' ? 'Collaboratore' : 'Team';
      return {
        title,
        subtitle: subtitle ? `[${typeLabel}] ${subtitle}` : typeLabel,
        media,
      };
    },
  },
};
