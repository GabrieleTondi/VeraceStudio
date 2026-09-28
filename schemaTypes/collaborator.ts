export default {
  name: 'collaborator',
  title: 'Collaboratore',
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
      description: 'Es. Fotografo Documentarista, Mediatrice Culturale, Web Developer, Architetto del Paesaggio...',
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
      title: 'Breve Descrizione / Bio',
      type: 'text',
      description: 'Breve nota sulle attività o sui progetti svolti in collaborazione con VERACE.',
    },
    {
      name: 'order',
      title: 'Ordine di Visualizzazione',
      type: 'number',
      description: 'Numero per ordinare la visualizzazione nel sito (1 per primo, 2 per secondo, ecc.)',
      initialValue: 10,
    },
    {
      name: 'linkedinUrl',
      title: 'Link Profilo o Portfolio / Sito Web',
      type: 'url',
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'photo',
    },
  },
};
