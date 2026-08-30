export default {
  name: 'newsletterCampaign',
  title: 'Campagna Email Newsletter',
  type: 'document',
  fields: [
    // 1. INFORMAZIONI GENERALI & TESTATA
    {
      name: 'title',
      title: 'Titolo Interno Campagna (Per la redazione)',
      type: 'string',
      description: 'Es. "Newsletter #04 - Settembre 2026: Memorie e Rigenerazione"',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'subject',
      title: 'Oggetto dell\'Email (Visibile ai destinatari)',
      type: 'string',
      description: 'Es. "VERACE #4 | I nuovi reportage dal sottosuolo e i progetti di quartiere"',
      validation: (Rule: any) => Rule.required().min(5).max(120),
    },
    {
      name: 'preheader',
      title: 'Testo di Anteprima (Preheader / Snippet)',
      type: 'string',
      description: 'La frase visibile nei client di posta (Gmail, Apple Mail, Outlook) subito dopo l\'oggetto.',
    },
    {
      name: 'headerBadge',
      title: 'Etichetta Testata Email (Badge)',
      type: 'string',
      initialValue: 'NEWSLETTER UFFICIALE',
      description: 'Testo piccolo in alto nella testata (es: "EDIZIONE SPECIALE", "MAGAZINE UPDATE", "COMUNICAZIONE ISTITUZIONALE").',
    },
    {
      name: 'senderName',
      title: 'Nome Mittente',
      type: 'string',
      initialValue: 'VERACE Magazine',
    },
    {
      name: 'senderEmail',
      title: 'Indirizzo Email Mittente',
      type: 'string',
      initialValue: 'info@verace-re.eu',
      validation: (Rule: any) => Rule.required().email(),
    },

    // 2. CORPO DELL'EMAIL (RICH PORTABLE TEXT PROFESSIONALE)
    {
      name: 'content',
      title: 'Contenuto dell\'Email (Testo, Stili, Colori & Blocchi)',
      type: 'array',
      of: [
        {
          type: 'block',
          title: 'Blocco di Testo',
          styles: [
            { title: 'Paragrafo Standard (15px)', value: 'normal' },
            { title: 'Paragrafo Introduttivo / Lead (17px)', value: 'lead' },
            { title: 'Titolo Principale (H1 - 24px)', value: 'h1' },
            { title: 'Titolo Sezione (H2 - 20px)', value: 'h2' },
            { title: 'Sottotitolo (H3 - 16px)', value: 'h3' },
            { title: 'Citazione Editoriale (Blockquote)', value: 'blockquote' },
            { title: 'Didascalia / Nota Piccola (12px)', value: 'caption' },
          ],
          lists: [
            { title: 'Elenco Puntato (•)', value: 'bullet' },
            { title: 'Elenco Numerato (1, 2, 3)', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Grassetto', value: 'strong' },
              { title: 'Corsivo', value: 'em' },
              { title: 'Sottolineato', value: 'underline' },
              { title: 'Barrato', value: 'strike-through' },
              { title: 'Codice / Monospace', value: 'code' },
              // Colori di evidenziazione rapidi
              {
                title: 'Rosso VERACE',
                value: 'colorRed',
              },
              {
                title: 'Nero Profondo',
                value: 'colorDark',
              },
              {
                title: 'Verde Smeraldo',
                value: 'colorGreen',
              },
              {
                title: 'Grigio Antracite',
                value: 'colorGray',
              },
              {
                title: 'Evidenziatore Giallo',
                value: 'colorHighlight',
              },
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
                    title: 'URL Destinazione',
                    validation: (Rule: any) =>
                      Rule.uri({
                        scheme: ['http', 'https', 'mailto', 'tel'],
                      }),
                  },
                  {
                    name: 'blank',
                    type: 'boolean',
                    title: 'Apri in nuova scheda',
                    initialValue: true,
                  },
                ],
              },
              {
                name: 'customColor',
                type: 'object',
                title: 'Colore Testo Personalizzato',
                fields: [
                  {
                    name: 'color',
                    title: 'Seleziona Colore',
                    type: 'string',
                    options: {
                      list: [
                        { title: 'Rosso Primario VERACE (#B53D33)', value: '#B53D33' },
                        { title: 'Rosso Scuro / Bordeaux (#781D1D)', value: '#781D1D' },
                        { title: 'Nero Carbone (#1A1A1A)', value: '#1A1A1A' },
                        { title: 'Verde Bosco (#1B4332)', value: '#1B4332' },
                        { title: 'Grigio Fumo (#55504E)', value: '#55504E' },
                        { title: 'Blu Istituzionale (#1E3A8A)', value: '#1E3A8A' },
                        { title: 'Arancio Ruggine (#C2410C)', value: '#C2410C' },
                      ],
                    },
                    initialValue: '#B53D33',
                  },
                ],
              },
            ],
          },
        },

        // BLOCCO: PULSANTE CALL TO ACTION (CTA)
        {
          type: 'object',
          name: 'emailCta',
          title: 'Pulsante Call to Action (CTA)',
          fields: [
            {
              name: 'text',
              title: 'Testo del Pulsante',
              type: 'string',
              description: 'Es. "LEGGI L\'INCHIESTA COMPLETA →" o "SCOPRI IL PROGETTO"',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'url',
              title: 'URL di Destinazione',
              type: 'url',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'style',
              title: 'Stile Grafico Pulsante',
              type: 'string',
              options: {
                list: [
                  { title: 'Rosso VERACE Pieno (Consigliato)', value: 'primary' },
                  { title: 'Nero Profondo', value: 'dark' },
                  { title: 'Outline (Bordo Rosso su Sfondo Chiaro)', value: 'outline' },
                  { title: 'Verde Smeraldo', value: 'green' },
                ],
              },
              initialValue: 'primary',
            },
            {
              name: 'alignment',
              title: 'Allineamento',
              type: 'string',
              options: {
                list: [
                  { title: 'Sinistra', value: 'left' },
                  { title: 'Centro', value: 'center' },
                  { title: 'Destra', value: 'right' },
                ],
                layout: 'radio',
              },
              initialValue: 'left',
            },
          ],
          preview: {
            select: {
              text: 'text',
              url: 'url',
              style: 'style',
            },
            prepare({ text, url, style }: any) {
              return {
                title: `[Pulsante CTA] ${text || 'Senza testo'}`,
                subtitle: `${style || 'primary'} → ${url || '#'}`,
              };
            },
          },
        },

        // BLOCCO: IMMAGINE CON LAYOUT EMAIL
        {
          type: 'object',
          name: 'emailImage',
          title: 'Immagine Email',
          fields: [
            {
              name: 'image',
              title: 'File Immagine',
              type: 'image',
              options: { hotspot: true },
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'caption',
              title: 'Didascalia Immagine (Opzionale)',
              type: 'string',
            },
            {
              name: 'altText',
              title: 'Testo Alternativo (Alt per Accessibilità)',
              type: 'string',
            },
            {
              name: 'linkUrl',
              title: 'Link al Clic sull\'Immagine (Opzionale)',
              type: 'url',
            },
          ],
          preview: {
            select: {
              caption: 'caption',
              media: 'image',
            },
            prepare({ caption, media }: any) {
              return {
                title: '[Immagine Email]',
                subtitle: caption || 'Nessuna didascalia',
                media,
              };
            },
          },
        },

        // BLOCCO: BOX IN EVIDENZA / CALLOUT
        {
          type: 'object',
          name: 'emailCallout',
          title: 'Box in Evidenza / Approfondimento (Callout)',
          fields: [
            {
              name: 'title',
              title: 'Titolo del Box (Opzionale)',
              type: 'string',
              description: 'Es. "NOTA DELLA REDAZIONE" o "PROSSIMO INCONTRO"',
            },
            {
              name: 'text',
              title: 'Testo del Box',
              type: 'text',
              rows: 3,
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'variant',
              title: 'Stile Box',
              type: 'string',
              options: {
                list: [
                  { title: 'Tono su Tono (Bordo Rosso a Sinistra)', value: 'accent' },
                  { title: 'Sfondo Scuro Elegante (Testo Bianco)', value: 'dark' },
                  { title: 'Verde Smeraldo Rigenerazione', value: 'green' },
                ],
              },
              initialValue: 'accent',
            },
          ],
          preview: {
            select: {
              title: 'title',
              text: 'text',
              variant: 'variant',
            },
            prepare({ title, text, variant }: any) {
              return {
                title: `[Box Callout] ${title || 'Approfondimento'}`,
                subtitle: `(${variant}) ${text ? text.slice(0, 50) + '...' : ''}`,
              };
            },
          },
        },

        // BLOCCO: SEPARATORE EDITORIALE
        {
          type: 'object',
          name: 'emailDivider',
          title: 'Separatore Grafico',
          fields: [
            {
              name: 'style',
              title: 'Stile Separatore',
              type: 'string',
              options: {
                list: [
                  { title: 'Linea Sottile Elegante', value: 'line' },
                  { title: 'Linea con Bordo Rosso', value: 'redLine' },
                  { title: 'Puntini Editoriali (•••)', value: 'dots' },
                  { title: 'Spazio Bianco di Respiro', value: 'space' },
                ],
              },
              initialValue: 'line',
            },
          ],
          preview: {
            select: {
              style: 'style',
            },
            prepare({ style }: any) {
              return {
                title: `[Separatore: ${style || 'line'}]`,
              };
            },
          },
        },
      ],
      validation: (Rule: any) => Rule.required(),
    },

    // 3. ALLEGATI (FILE / PDF)
    {
      name: 'attachments',
      title: 'Allegati Email (PDF, Documenti, Rassegna Stampa)',
      type: 'array',
      description: 'Puoi caricare file PDF o documenti che verranno allegati direttamente all\'invio email.',
      of: [
        {
          type: 'object',
          title: 'File Allegato',
          fields: [
            {
              name: 'title',
              title: 'Nome Visualizzato Allegato',
              type: 'string',
              description: 'Es. "Dossier Rigenerazione 2026.pdf" o "Comunicato Stampa VERACE.pdf"',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'file',
              title: 'Carica File (PDF / Documento)',
              type: 'file',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Breve Descrizione Allegato (Opzionale)',
              type: 'string',
            },
          ],
          preview: {
            select: {
              title: 'title',
              description: 'description',
            },
            prepare({ title, description }: any) {
              return {
                title: `📎 ${title || 'Allegato'}`,
                subtitle: description || 'File allegato',
              };
            },
          },
        },
      ],
    },

    // 4. STATO DELL'INVIO & REPORTISTICA
    {
      name: 'status',
      title: 'Stato Campagna',
      type: 'string',
      options: {
        list: [
          { title: '📝 Bozza (In lavorazione)', value: 'draft' },
          { title: '🚀 Pronta per l\'Invio', value: 'ready' },
          { title: '✓ Inviata con Successo', value: 'sent' },
        ],
        layout: 'radio',
      },
      initialValue: 'draft',
    },
    {
      name: 'sentAt',
      title: 'Data e Ora Effettivo Invio',
      type: 'datetime',
      readOnly: true,
      hidden: ({ document }: any) => document?.status !== 'sent',
    },
    {
      name: 'recipientsCount',
      title: 'Totale Destinatari Raggiunti',
      type: 'number',
      readOnly: true,
      hidden: ({ document }: any) => document?.status !== 'sent',
    },
    {
      name: 'sendLogs',
      title: 'Registro e Report di Invio',
      type: 'text',
      rows: 4,
      readOnly: true,
      hidden: ({ document }: any) => !document?.sendLogs,
    },
  ],
  preview: {
    select: {
      title: 'title',
      subject: 'subject',
      status: 'status',
      sentAt: 'sentAt',
      recipients: 'recipientsCount',
    },
    prepare({ title, subject, status, sentAt, recipients }: any) {
      let statusBadge = '📝 Bozza';
      if (status === 'ready') statusBadge = '🚀 Pronta';
      if (status === 'sent') {
        const dateStr = sentAt ? new Date(sentAt).toLocaleDateString('it-IT') : '';
        statusBadge = `✓ Inviata (${recipients || 0} iscritti - ${dateStr})`;
      }
      return {
        title: title || 'Campagna senza titolo',
        subtitle: `[${statusBadge}] Oggetto: "${subject || 'Nessun oggetto'}"`,
      };
    },
  },
};
