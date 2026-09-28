export default {
  name: 'heroSlider',
  title: 'Slider Home & Animazione',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Nome Configurazione',
      type: 'string',
      initialValue: 'Slider Principale Home Page',
      description: 'Identificativo della configurazione dello slider per la redazione.',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'headline',
      title: 'Titolo / Frase Centrale (Post-Intro)',
      type: 'string',
      initialValue: 'media cultura e rigenerazione per il territorio',
      description: 'La frase che compare al centro della Hero dopo l\'animazione del logo.',
    },
    {
      name: 'primaryButtonText',
      title: 'Testo Primo Bottone (Rosso)',
      type: 'string',
      initialValue: 'scopri i progetti',
    },
    {
      name: 'primaryButtonLink',
      title: 'Link Primo Bottone',
      type: 'string',
      initialValue: '/progetti',
    },
    {
      name: 'secondaryButtonText',
      title: 'Testo Secondo Bottone (Trasparente)',
      type: 'string',
      initialValue: 'esplora il nostro magazine',
    },
    {
      name: 'secondaryButtonLink',
      title: 'Link Secondo Bottone',
      type: 'string',
      initialValue: '/magazine',
    },
    {
      name: 'slides',
      title: 'Fotografie Slider & Animazione Intro',
      type: 'array',
      description:
        'Trascina per ordinare le foto. NOTA: La PRIMA foto in elenco sarà la prima dello slider regolare e l\'ultima su cui si concluderà la sequenza di scatti dell\'animazione iniziale.',
      validation: (Rule: any) =>
        Rule.required()
          .min(1)
          .error('Inserisci almeno una fotografia per lo slider.'),
      of: [
        {
          type: 'object',
          title: 'Fotografia Slide',
          fields: [
            {
              name: 'image',
              title: 'File Immagine',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'title',
              title: 'Titolo / Progetto Associato (Opzionale)',
              type: 'string',
              description: 'Es. "Scuola di Territorio" o "La Bela - Filiera Lana"',
            },
            {
              name: 'category',
              title: 'Categoria / Didascalia (Opzionale)',
              type: 'string',
              description: 'Es. "Educazione & Territorio" o "Rigenerazione Urbana"',
            },
            {
              name: 'alt',
              title: 'Testo Alternativo Alt (SEO & Accessibilità)',
              type: 'string',
              description: 'Breve descrizione dell\'immagine per i motori di ricerca e screen reader.',
            },
          ],
          preview: {
            select: {
              title: 'title',
              category: 'category',
              alt: 'alt',
              media: 'image',
            },
            prepare({ title, category, alt, media }: any) {
              return {
                title: title || alt || 'Fotografia Slide',
                subtitle: category || 'Nessuna categoria specificata',
                media,
              };
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      slides: 'slides',
    },
    prepare({ title, slides }: any) {
      const count = Array.isArray(slides) ? slides.length : 0;
      return {
        title: title || 'Slider Home Page',
        subtitle: `${count} ${count === 1 ? 'foto caricata' : 'foto caricate'}`,
      };
    },
  },
};
