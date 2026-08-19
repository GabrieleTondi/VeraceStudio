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
      title: 'Ruolo in VERACE',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
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
      title: 'Breve Biografia',
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
      title: 'Link Profilo LinkedIn',
      type: 'url',
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'photo',
    },
  },
};
