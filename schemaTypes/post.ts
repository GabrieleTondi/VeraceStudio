export default {
  name: 'post',
  title: 'Articolo Magazine',
  type: 'document',
  fields: [
    // 1. INFORMAZIONI GENERALI & TESTATA
    {
      name: 'title',
      title: 'Titolo Articolo',
      type: 'string',
      description: 'Es. "AL CINESE DA LUIGI" o "MEMORIE DAL SOTTOSUOLO"',
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
          { title: 'Sostenibilità & Ecologia', value: 'Sostenibilita' },
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
      title: 'Copertina Articolo (Foto)',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'caption',
          type: 'string',
          title: 'Didascalia Copertina (Opzionale)',
        },
        {
          name: 'altText',
          type: 'string',
          title: 'Testo Alternativo Alt (Opzionale)',
        },
      ],
    },
    {
      name: 'videoUrl',
      title: 'Link Video Embed (Opzionale - YouTube / Vimeo)',
      type: 'url',
      description: 'Se inserito, verrà visualizzato un player video incorporato all\'inizio dell\'articolo.',
    },

    // 2. SEZIONE INTERVISTATI & PROTAGONISTI
    {
      name: 'interviewees',
      title: 'Sezione Intervistati / Protagonisti dell\'Inchiesta',
      type: 'array',
      description: 'Inserisci una o più persone intervistate o protagoniste dell\'articolo.',
      of: [
        {
          type: 'object',
          title: 'Intervistato / Protagonista',
          fields: [
            {
              name: 'name',
              title: 'Nome e Cognome / Nome d\'Arte',
              type: 'string',
              description: 'Es. "Rita e Luigi Yea" o "Cristian"',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'roleOrContext',
              title: 'Ruolo / Età / Dettaglio nel Quartiere',
              type: 'string',
              description: 'Es. "Storici proprietari dell’Hang Zhou in Viale 4 Novembre" o "22 anni, abitante del quartiere da 9 anni"',
            },
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'roleOrContext',
            },
            prepare({ title, subtitle }: any) {
              return {
                title: title || 'Intervistato',
                subtitle: subtitle || 'Nessun dettaglio specificato',
              };
            },
          },
        },
      ],
    },

    // 3. CORPO DELL'ARTICOLO (TESTO FORMATTATO, FOTO INTERMEDIE, APPROFONDIMENTI, LINEE)
    {
      name: 'body',
      title: 'Corpo dell\'Articolo (Testo, Foto Intermedie, Approfondimenti & Citazioni)',
      type: 'array',
      description:
        'Componi l\'articolo alternando paragrafi formattati, foto con didascalia opzionale, box d\'approfondimento, citazioni d\'impatto e linee geometriche.',
      of: [
        // A) BLOCCO DI TESTO FORMATTATO
        {
          type: 'block',
          title: 'Blocco di Testo',
          styles: [
            { title: 'Paragrafo Normale', value: 'normal' },
            { title: 'Titolo Sezione (H2 - es. "Vite", "Il Menù")', value: 'h2' },
            { title: 'Sottotitolo (H3)', value: 'h3' },
            { title: 'Paragrafo Introduttivo / Lead', value: 'lead' },
            { title: 'Citazione nel Testo (Blockquote)', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Grassetto', value: 'strong' },
              { title: 'Corsivo', value: 'em' },
              { title: 'Sottolineato', value: 'underline' },
              { title: 'Barrato', value: 'strike-through' },
              { title: 'Capolettera Rossa (Drop Cap)', value: 'dropCap' },
              { title: 'Rosso VERACE (#B53D33)', value: 'colorRed' },
              { title: 'Nero Profondo (#1A1A1A)', value: 'colorDark' },
              { title: 'Verde Smeraldo (#1B4332)', value: 'colorGreen' },
              { title: 'Grigio Antracite (#55504E)', value: 'colorGray' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link Ipertestuale',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (Rule: any) =>
                      Rule.uri({
                        scheme: ['http', 'https', 'mailto', 'tel'],
                      }),
                  },
                ],
              },
              {
                name: 'customColor',
                type: 'object',
                title: 'Colore Personalizzato',
                fields: [
                  {
                    name: 'color',
                    title: 'Colore',
                    type: 'string',
                    options: {
                      list: [
                        { title: 'Rosso VERACE (#B53D33)', value: '#B53D33' },
                        { title: 'Nero Carbone (#1A1A1A)', value: '#1A1A1A' },
                        { title: 'Verde Bosco (#1B4332)', value: '#1B4332' },
                        { title: 'Grigio Fumo (#55504E)', value: '#55504E' },
                        { title: 'Bordeaux Scuro (#781D1D)', value: '#781D1D' },
                        { title: 'Blu Istituzionale (#1E3A8A)', value: '#1E3A8A' },
                      ],
                    },
                    initialValue: '#B53D33',
                  },
                ],
              },
            ],
          },
        },

        // B) FOTOGRAFIA INTERMEDIA
        {
          type: 'object',
          name: 'articleImage',
          title: 'Fotografia nel Testo',
          fields: [
            {
              name: 'image',
              title: 'Immagine',
              type: 'image',
              options: { hotspot: true },
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'caption',
              title: 'Didascalia (Opzionale)',
              type: 'string',
              description: 'Breve descrizione visualizzata sotto la foto (es. "Rita e Luigi Yea al bancone").',
            },
            {
              name: 'alt',
              title: 'Testo Alternativo Alt (Opzionale)',
              type: 'string',
            },
          ],
          preview: {
            select: {
              caption: 'caption',
              alt: 'alt',
              media: 'image',
            },
            prepare({ caption, alt, media }: any) {
              return {
                title: 'Fotografia nel Testo',
                subtitle: caption || alt || 'Senza didascalia',
                media,
              };
            },
          },
        },

        // C) RIQUADRO D'APPROFONDIMENTO (Scheda / Approfondimento)
        {
          type: 'object',
          name: 'approfondimento',
          title: 'Riquadro d\'Approfondimento',
          fields: [
            {
              name: 'title',
              title: 'Titolo dell\'Approfondimento',
              type: 'string',
              description: 'Es. "Origini", "Banca Interna", "La cucina cinese", "Vocabolario", "Il Mondo dei BoxRest"',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'text',
              title: 'Testo dell\'Approfondimento',
              type: 'text',
              rows: 5,
              validation: (Rule: any) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'title',
              text: 'text',
            },
            prepare({ title, text }: any) {
              return {
                title: `APPROFONDIMENTO • ${title || 'Senza titolo'}`,
                subtitle: text ? text.slice(0, 60) + '...' : '',
              };
            },
          },
        },

        // D) CITAZIONE D'IMPATTO (PULL QUOTE)
        {
          type: 'object',
          name: 'pullQuote',
          title: 'Citazione in Risalto (Quote)',
          fields: [
            {
              name: 'quote',
              title: 'Frase o Citazione d\'Impatto',
              type: 'text',
              rows: 3,
              description: 'Es. "“CON IL CANTIERE È FINITA UNA ZONA”"',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'author',
              title: 'Autore Citazione (Opzionale)',
              type: 'string',
              description: 'Es. "Rita Yea"',
            },
          ],
          preview: {
            select: {
              quote: 'quote',
              author: 'author',
            },
            prepare({ quote, author }: any) {
              return {
                title: `«${quote ? quote.slice(0, 50) + '...' : ''}»`,
                subtitle: author ? `Autore: ${author}` : 'Citazione in risalto',
              };
            },
          },
        },

        // E) LINEA O ELEMENTO GEOMETRICO
        {
          type: 'object',
          name: 'editorialDivider',
          title: 'Linea / Elemento Geometrico Separatore',
          fields: [
            {
              name: 'style',
              title: 'Tipo di Separatore Geometrico',
              type: 'string',
              options: {
                list: [
                  { title: 'Linea Rossa VERACE', value: 'redLine' },
                  { title: 'Linea Sottile Elegante', value: 'thinLine' },
                  { title: 'Puntini Geometrici Editoriali (•••)', value: 'dots' },
                  { title: 'Spazio Bianco di Respiro', value: 'space' },
                ],
              },
              initialValue: 'redLine',
            },
          ],
          preview: {
            select: {
              style: 'style',
            },
            prepare({ style }: any) {
              return {
                title: `Separatore: ${style || 'redLine'}`,
              };
            },
          },
        },
      ],
    },

    // 4. SEZIONE AUTORI & CREDITI REPORTAGE
    {
      name: 'authorInfo',
      title: 'Sezione Autori & Crediti Reportage',
      type: 'object',
      description: 'Crediti redazionali, autore dell\'inchiesta e fotografo che compariranno nel box finale.',
      fields: [
        {
          name: 'name',
          title: 'Autore / Ricercatore / Redazione',
          type: 'string',
          description: 'Es. "Taima Sallami" o "Redazione VERACE"',
          initialValue: 'Redazione VERACE',
        },
        {
          name: 'roleOrContext',
          title: 'Ruolo / Età / Contesto Autore (Opzionale)',
          type: 'string',
          description: 'Es. "22 anni, abitante del quartiere da 9 anni" o "Curatore editoriale"',
        },
        {
          name: 'photography',
          title: 'Crediti Fotografici (Opzionale)',
          type: 'string',
          description: 'Es. "Simone Todaro (Luglio 2024)" o "Archivio Fotografico VERACE"',
        },
        {
          name: 'credits',
          title: 'Dettagli Ricerca & Note Archivio (Opzionale)',
          type: 'string',
          description: 'Es. "Intervista e ricerca a cura di Taima Sallami per Archivio VERACE Magazine"',
        },
      ],
    },

    // 5. GALLERIA FOTOGRAFICA IN FONDO ALL'ARTICOLO
    {
      name: 'gallery',
      title: 'Galleria Fotografica Finale (Carousel & Lightbox a Schermo Intero)',
      type: 'array',
      description: 'Carica le foto che comporranno la galleria fotografica a scorrimento in fondo all\'articolo.',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'caption', type: 'string', title: 'Didascalia (Opzionale)' },
            { name: 'altText', type: 'string', title: 'Testo Alternativo Alt (Opzionale)' },
          ],
        },
      ],
    },

    // 6. METADATI DI PUBBLICAZIONE
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
