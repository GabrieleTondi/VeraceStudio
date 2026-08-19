import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const projectId =
  (typeof import.meta !== 'undefined' && import.meta.env?.PUBLIC_SANITY_PROJECT_ID) ||
  (typeof process !== 'undefined' && process.env?.PUBLIC_SANITY_PROJECT_ID) ||
  '83ude8vy';
const dataset =
  (typeof import.meta !== 'undefined' && import.meta.env?.PUBLIC_SANITY_DATASET) ||
  (typeof process !== 'undefined' && process.env?.PUBLIC_SANITY_DATASET) ||
  'production';
const apiVersion = '2024-01-01';

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  if (!source || !source.asset) return null;
  return builder.image(source);
}

// Interface definitions
export interface Post {
  _id: string;
  title: string;
  subtitle: string;
  slug: { current: string };
  coverMedia?: {
    asset: { _ref: string };
    url?: string;
    caption?: string;
    altText?: string;
  };
  coverImageUrl?: string;
  videoUrl?: string;
  pdfUrl?: string;
  galleryUrls?: string[];
  category?: string;
  layoutType: 'standard' | 'split-view' | 'pdf-reader' | 'editorial-focus' | 'photo-journalism' | 'data-dossier' | 'manifesto-magazine';
  body: any[];
  publishedAt: string;
  readingTime?: number;
}

export interface Project {
  _id: string;
  title: string;
  slug?: { current: string };
  status: 'In Corso' | 'Concluso' | 'In Programmazione';
  summary: string;
  publishedAt?: string;
  partners?: string[];
  gallery?: any[];
  galleryUrls?: string[];
  attachedDocUrl?: string;
  attachedDocName?: string;
}

export interface TeamMember {
  _id: string;
  name: string;
  role: string;
  photoUrl?: string;
  bio: string;
  order: number;
  linkedinUrl?: string;
}


export interface Event {
  _id: string;
  title: string;
  date: string; // YYYY-MM-DD
  time: string; // e.g. 18:30
  location: string;
  category: 'Tavola Rotonda' | 'Presentazione Report' | 'Workshop' | 'Incontro Pubblico' | 'Festival' | 'Laboratorio';
  description: string;
  speakers?: string[];
  registrationUrl?: string;
  isFree?: boolean;
}

// Fallback Mock Data in Italian
export const FALLBACK_POSTS: Post[] = [
  {
    _id: 'post-fiumi-urbani',
    title: 'Rapporto Città e Fiumi: La Rinascita dei Corsi d\'Acqua Urbani',
    subtitle: 'Un\'indagine sulle politiche di riqualificazione delle sponde e sui nuovi ecosistemi fluviali ad alto valore sociale ed ecologico.',
    slug: { current: 'rapporto-citta-fiumi-rinascita-corsi-acqua' },
    category: 'Ambiente',
    layoutType: 'editorial-focus',
    coverImageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    galleryUrls: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'
    ],
    publishedAt: '2026-08-10T11:00:00Z',
    readingTime: 8,
    body: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'I fiumi urbani stanno ritornando ad essere i veri protagonisti della vita cittadina. Per decenni cementificati, nascosti o ridotti a meri canali di scolo, i corsi d\'acqua sono oggi al centro di interventi pionieristici di rinaturalizzazione e riapertura alla collettività.' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'La rigenerazione delle sponde fluviali permette di abbattere le isole di calore, creare parchi lineari accessibili e ricucire quartieri storicamente separati dalla barriera dell\'acqua. Questo dossier analizza le migliori pratiche europee e le sfide concrete del territorio emiliano.' }]
      }
    ]
  },
  {
    _id: 'post-luci-periferie',
    title: 'Luci Nelle Periferie: Reportage Notturno Sugli Spazi Industriali',
    subtitle: 'Uno sguardo fotografico in chiaroscuro sugli ex complessi manifatturieri che riprendono vita nelle ore notturne.',
    slug: { current: 'luci-nelle-periferie-reportage-notturno-spazi-industriali' },
    category: 'Fotografia',
    layoutType: 'photo-journalism',
    coverImageUrl: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=1200&q=80',
    galleryUrls: [
      'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1200&q=80'
    ],
    publishedAt: '2026-08-08T22:00:00Z',
    readingTime: 6,
    body: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'La notte trasforma le architetture industriali dismesse in cattedrali di luce e ombra. Questo reportage notturno documenta come vecchi capannoni e officine abbiano iniziato a pulsare di nuova vita attraverso studi d\'artista, laboratori musicali e spazi di aggregazione giovanile.' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'L\'obiettivo fotografico cattura il contrasto visivo tra il ferro arrugginito delle strutture storiche e il bagliore al neon dei nuovi insediamenti creativi, mostrando la bellezza viscerale dei margini urbani.' }]
      }
    ]
  },
  {
    _id: 'post-indicatori-impatto',
    title: 'Indicatori di Impatto Sociale: Guida Pratica alla Valutazione',
    subtitle: 'Framework analitici, metriche aperte e modelli di rendicontazione per misurare il valore generato dai progetti urbani.',
    slug: { current: 'indicatori-impatto-sociale-guida-valutazione-rigenerazione' },
    category: 'Dossier',
    layoutType: 'data-dossier',
    coverImageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    galleryUrls: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80'
    ],
    publishedAt: '2026-08-06T14:30:00Z',
    readingTime: 9,
    body: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Misurare l\'impatto sociale della rigenerazione urbana è una necessità imprescindibile per garantire la sostenibilità nel tempo degli interventi e la massima trasparenza verso comunità e finanziatori.' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'In questa guida illustriamo l\'approccio metodologico sviluppato dal Centro Ricerche VERACE, fondato su 12 indicatori quantitativi e qualitativi capaci di rilevare coesione sociale, valore economico residuo ed esternalità ambientali positive.' }]
      }
    ]
  },
  {
    _id: 'post-manifesto-innovazione',
    title: 'Manifesto per l\'Innovazione Sociale e la Coesione di Quartiere',
    subtitle: '10 tesi fondamentali per guidare il cambiamento dei territori attraverso l\'ascolto, la co-progettazione e la partecipazione attiva.',
    slug: { current: 'manifesto-innovazione-sociale-coesione-quartiere' },
    category: 'Manifesto',
    layoutType: 'manifesto-magazine',
    coverImageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    galleryUrls: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80'
    ],
    publishedAt: '2026-08-04T09:00:00Z',
    readingTime: 7,
    body: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Le città del futuro si fondano sulle comunità di oggi. Questo manifesto raccoglie le linee guida strategiche per costruire quartieri inclusivi, sostenibili ed in grado di rispondere alle trasformazioni sociali in corso.' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Dalla gestione condivisa dei beni comuni alla valorizzazione della creatività giovanile, ogni tesi rappresenta un impegno concreto per una cittadinanza consapevole e partecipativa.' }]
      }
    ]
  },
  {
    _id: 'post-al-cinese',
    title: 'Al Cinese Da Luigi: Storie, Incontri e Memorie Urbane',
    subtitle: 'Un\'indagine visiva e sociale sui luoghi di ritrovo popolari e sulla memoria collettiva del territorio.',
    slug: { current: 'al-cinese-da-luigi-storie-memorie-urbane' },
    category: 'Inchiesta',
    layoutType: 'pdf-reader',
    pdfUrl: '/articles/AL CINESE/AlCineseDaLuigi_2024.pdf',
    coverImageUrl: '/articles/AL CINESE/IMG_4846.webp',
    galleryUrls: [
      '/articles/AL CINESE/IMG_4846.webp',
      '/articles/AL CINESE/IMG_1271 copia.webp'
    ],
    publishedAt: '2026-08-13T08:00:00Z',
    readingTime: 5,
    body: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Al Cinese Da Luigi è una ricerca sul campo che esplora le trasformazioni dei luoghi di convivialità urbana e la memoria collettiva dei quartieri popolari.' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Attraverso una documentazione fotografica d\'archivio e testimonianze dirette della comunità, il progetto mappa gli spazi storici di ritrovo che hanno segnato l\'evoluzione sociale e culturale della città.' }]
      }
    ]
  },
  {
    _id: 'post-memorie',
    title: 'Memorie del Sottosuolo: Esplorazioni tra Storia e Archeologia Industriale',
    subtitle: 'Un viaggio fotografico nel patrimonio nascosto e negli spazi ipogei della città, tra fascino industriale e rigenerazione culturale.',
    slug: { current: 'memorie-del-sottosuolo-archeologia-industriale' },
    category: 'Ricerca',
    layoutType: 'pdf-reader',
    pdfUrl: '/articles/MEMORIE/MEMORIE DEL SOTTOSUOLO.pdf',
    coverImageUrl: '/articles/MEMORIE/IMG_9747.webp',
    galleryUrls: [
      '/articles/MEMORIE/IMG_9747.webp',
      '/articles/MEMORIE/IMG_9754.webp',
      '/articles/MEMORIE/IMG_9811.webp',
      '/articles/MEMORIE/_.webp'
    ],
    publishedAt: '2026-08-12T16:00:00Z',
    readingTime: 6,
    body: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Memorie del Sottosuolo propone una rilettura del paesaggio urbano sotterraneo e delle infrastrutture storiche dimenticate, trasformando il buio dei cunicoli in un laboratorio di riscoperta identitaria.' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Il percorso raccoglie scatti inediti, rilievi storici e analisi sulla possibilità di riutilizzo culturale degli spazi ipogei come nuovi luoghi di aggregazione e produzione artistica.' }]
      }
    ]
  },
  {
    _id: 'post-1',
    title: 'Rigenerazione Urbana e Nuovi Spazi Culturali per la Collettività',
    subtitle: 'Come trasformare l\'architettura industriale in luoghi vivaci di cultura, ricerca e coesione sociale.',
    slug: { current: 'rigenerazione-urbana-spazi-culturali' },
    category: 'Innovazione',
    layoutType: 'split-view',
    coverImageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    publishedAt: '2026-07-20T10:00:00Z',
    readingTime: 6,
    body: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'La riqualificazione degli spazi urbani non è semplicemente una questione di cemento e mattoni, ma un processo profondo di riappropriazione comunitaria. VERACE promuove un modello in cui l\'architettura incontra l\'impatto sociale, integrando spazi di coworking pubblico, laboratori artistici ed ecosistemi sostenibili.' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Nei quartieri a più alta densità abitativa, la mancanza di presidi culturali crea spesso sacche di isolamento. I nostri interventi mirano a restituire luce e centralità ad aree ex industriali, convertendole in centri polifunzionali aperti a giovani, creativi ed enti del terzo settore.' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Grazie alla collaborazione con istituzioni locali ed ex maestranze, abbiamo sviluppato linee guida per una rigenerazione sostenibile basata sull\'economia circolare e sulla valorizzazione della memoria storica locale.' }]
      }
    ]
  },
  {
    _id: 'post-2',
    title: 'Transizione Ecologica Giusta: Il Ruolo delle Fondazioni',
    subtitle: 'Riflessioni e azioni concrete per coordinare la sostenibilità ambientale con l\'equità sociale.',
    slug: { current: 'transizione-ecologica-giusta' },
    category: 'Sostenibilita',
    layoutType: 'standard',
    coverImageUrl: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1200&q=80',
    publishedAt: '2026-07-15T14:30:00Z',
    readingTime: 4,
    body: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'La transizione ecologica non può avvenire a scapito delle fasce più vulnerabili della popolazione. Deve essere un percorso partecipato in cui sostenibilità ambientale e giustizia sociale procedono di pari passo.' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Attraverso i nostri bandi di ricerca e i tavoli di confronto B2B con le aziende sostenitrici, sosteniamo progetti tecnologici orientati all\'efficienza energetica popolare e alle comunità energetiche rinnovabili.' }]
      }
    ]
  },
  {
    _id: 'post-3',
    title: 'L\'Impatto dei Dati Aperte nella Rendicontazione Sociale',
    subtitle: 'Trasparenza radicata, metriche di impatto misurabili e fiducia tra enti, cittadini e imprese.',
    slug: { current: 'impatto-dati-aperti-rendicontazione' },
    category: 'Inchieste',
    layoutType: 'standard',
    coverImageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    publishedAt: '2026-07-08T09:15:00Z',
    readingTime: 8,
    body: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Nel panorama filantropico globale, la misurabilità delle azioni e la chiarezza dei rendiconti finanziari rappresentano il pilastro fondamentale di qualsiasi partnership duratura.' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'VERACE adotta standard aperti per tracciare ogni euro investito nei progetti sul territorio, offrendo ai partner aziendali report dettagliati fruibili in tempo reale.' }]
      }
    ]
  },
  {
    _id: 'post-4',
    title: 'Giovani e Futuro del Lavoro Creativo in Europa',
    subtitle: 'Analisi sui percorsi formativi integrati tra aziende tecnologiche e botteghe d\'arte digitale.',
    slug: { current: 'giovani-futuro-lavoro-creativo' },
    category: 'Comunita',
    layoutType: 'split-view',
    coverImageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    publishedAt: '2026-06-28T16:00:00Z',
    readingTime: 5,
    body: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Fornire strumenti pratici e competenze di frontiera alle nuove generazioni è una priorità strategica per scongiurare il fenomeno della fuga dei talenti.' }]
      }
    ]
  }
];

export const FALLBACK_PROJECTS: Project[] = [
  {
    _id: 'proj-la-bela',
    title: 'LA BELA: Laboratorio Itinerante per la Filiera della Lana',
    slug: { current: 'la-bela' },
    status: 'In Programmazione',
    summary: 'Un laboratorio itinerante in Appennino per conoscere la filiera dimenticata della lana: 2 giorni, 1 notte al rifugio San Leonardo e 20 ragazzi a piedi per le valli per conoscere pastori, agricoltori, musicisti e scienziati.',
    partners: ['Alpinaflora', 'Salewa'],
    galleryUrls: [
      '/projects/LA BELA/IMG_4931.webp',
      '/projects/LA BELA/IMG_4934.webp',
      '/projects/LA BELA/IMG_4947.webp',
      '/projects/LA BELA/IMG_5003.webp',
      '/projects/LA BELA/IMG_5110.webp',
      '/projects/LA BELA/IMG_5146.webp'
    ]
  },
  {
    _id: 'proj-scuola-territorio',
    title: 'SCUOLA DI TERRITORIO: Connessioni tra Città e Natura',
    slug: { current: 'scuola-di-territorio' },
    status: 'In Corso',
    summary: 'Un percorso biennale di conoscenza del territorio e delle connessioni tra la città di Reggio Emilia e la natura, per ragazzi dagli 11 ai 14 anni. Laboratori, cammini, micro-avventure urbane ed esperienze nella natura.',
    partners: ['Asineria di Reggio Emilia', 'Giro del Cielo', 'Fondazione Manodori'],
    galleryUrls: [
      '/projects/SCUOLA DI TERRITORIO/ST_2026-22.webp',
      '/projects/SCUOLA DI TERRITORIO/ST_2026-30.webp',
      '/projects/SCUOLA DI TERRITORIO/ST_2026-48.webp',
      '/projects/SCUOLA DI TERRITORIO/ST_2026-83.webp',
      '/projects/SCUOLA DI TERRITORIO/ST_2026-86.webp'
    ]
  },
  {
    _id: 'proj-viaggi-domenicali',
    title: 'VIAGGI DOMENICALI MINIMI: In Bicicletta nell\'Immaginario di Luigi Ghirri',
    slug: { current: 'viaggi-domenicali-minimi' },
    status: 'In Corso',
    summary: 'Un programma di avventure in bicicletta nell\'immaginario di Luigi Ghirri. 10 Viaggi Minimi per le campagne, fiumi, colline e città dell\'Emilia Romagna.',
    partners: ['Fondazione Luigi Ghirri'],
    galleryUrls: [
      '/projects/VIAGGI DOMENICALI MINIMI/2_POST_DEFINITIVI_VIAGGIDOMENICALI-14.webp',
      '/projects/VIAGGI DOMENICALI MINIMI/2_2_POST_DEFINITIVI_VIAGGIDOMENICALI-04.webp',
      '/projects/VIAGGI DOMENICALI MINIMI/2_POST_DEFINITIVI_VIAGGIDOMENICALI-15.webp',
      '/projects/VIAGGI DOMENICALI MINIMI/2_POST_DEFINITIVI_VIAGGIDOMENICALI-16.webp',
      '/projects/VIAGGI DOMENICALI MINIMI/2_POST_DEFINITIVI_VIAGGIDOMENICALI-17.webp',
      '/projects/VIAGGI DOMENICALI MINIMI/2_POST_DEFINITIVI_VIAGGIDOMENICALI-18.webp'
    ]
  },
  {
    _id: 'proj-1',
    title: 'Cantiere Umano: Hub di Inclusione e Maker Space',
    slug: { current: 'cantiere-umano' },
    status: 'In Corso',
    summary: 'Progetto triennale volto alla creazione di un polo tecnologico e artigianale integrato nel cuore della città. Offre laboratori di stampa 3D, restauro conservativo e formazione gratuita per oltre 200 giovani al mese.',
    partners: ['TechCorp Europa', 'Banca Sviluppo Sociale', 'Regione Lazio'],
    galleryUrls: [
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80'
    ],
    attachedDocUrl: '/pdf/sample-project-presentation.pdf',
    attachedDocName: 'Scheda-Tecnica-Cantiere-Umano.pdf'
  },
  {
    _id: 'proj-2',
    title: 'Progetto VerdeComune: Foreste Urbane e Biodiversità',
    slug: { current: 'progetto-verdecomune' },
    status: 'In Corso',
    summary: 'Iniziativa di piantumazione di 5.000 alberi autoctoni con l\'obiettivo di abbattere le isole di calore nei quartieri periferici e coinvolgere i dipendenti delle aziende sostenitrici in giornate di volontariato aziendale.',
    partners: ['GreenFuture SpA', 'EcoSystems EU'],
    galleryUrls: [
      'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80'
    ],
    attachedDocUrl: '/pdf/sample-project-presentation.pdf',
    attachedDocName: 'VerdeComune-Dossier-Partner.pdf'
  },
  {
    _id: 'proj-3',
    title: 'Archivio Digitale della Memoria Operaia',
    slug: { current: 'archivio-digitale-memoria-operaia' },
    status: 'Concluso',
    summary: 'Digitalizzazione in alta risoluzione di oltre 10.000 documenti, fotografie e registrazioni audio sull\'evoluzione industriale del secondo Novecento. Piattaforma consultabile liberamente online.',
    partners: ['Ministero della Cultura', 'Archivio Storico'],
    galleryUrls: [
      'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=800&q=80'
    ],
    attachedDocUrl: '/pdf/sample-project-presentation.pdf',
    attachedDocName: 'Archivio-Memoria-Report-Finale.pdf'
  },
  {
    _id: 'proj-4',
    title: 'AgriSkills: Agricoltura Idroponica Sostenibile',
    slug: { current: 'agriskills-agricoltura-idroponica' },
    status: 'In Programmazione',
    summary: 'Programma di formazione professionale in serra idroponica solare dedicato al reinserimento lavorativo di soggetti svantaggiati, con rete di distribuzione a km 0 per le mense cittadine.',
    partners: ['AgriTech Innovazione'],
    galleryUrls: [
      'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=800&q=80'
    ],
    attachedDocUrl: '/pdf/sample-project-presentation.pdf',
    attachedDocName: 'AgriSkills-Pitch-Corporate.pdf'
  }
];

export const FALLBACK_TEAM: TeamMember[] = [
  {
    _id: 'team-1',
    name: 'Elena Moretti',
    role: 'Presidente & Direttore Scientifico',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    bio: 'Docente di Politiche Culturali ed Economia Sociale con vent\'anni di esperienza nella gestione di enti no-profit internazionali.',
    order: 1,
    linkedinUrl: 'https://linkedin.com'
  },
  {
    _id: 'team-2',
    name: 'Marco Valenti',
    role: 'Caporedattore Magazine & Curatore Editoriale',
    photoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
    bio: 'Giornalista d\'inchiesta e saggista. Ha collaborato con principali testate europee focalizzandosi su urbanistica e diritti digitali.',
    order: 2,
    linkedinUrl: 'https://linkedin.com'
  },
  {
    _id: 'team-3',
    name: 'Sofia De Luca',
    role: 'Responsabile Relazioni Corporate & Partnership B2B',
    photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
    bio: 'Specialista in Corporate Social Responsibility (CSR) ed ESG. Cura le alleanze strategiche con i sostenitori privati.',
    order: 3,
    linkedinUrl: 'https://linkedin.com'
  },
  {
    _id: 'team-4',
    name: 'Alessandro Riccio',
    role: 'Responsabile Immagine & Direzione Creativa',
    photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
    bio: 'Designer e art director specializzato in editoria periodica e identità visive complesse per enti del terzo settore.',
    order: 4,
    linkedinUrl: 'https://linkedin.com'
  }
];



// Query Functions with Sanity check + fallback
export async function getPosts(): Promise<Post[]> {
  try {
    if (projectId) {
      const posts = await sanityClient.fetch(`*[_type == "post"] | order(coalesce(publishedAt, _createdAt) desc) {
        _id,
        title,
        subtitle,
        slug,
        category,
        layoutType,
        publishedAt,
        readingTime,
        body,
        coverMedia,
        "pdfUrl": pdfFile.asset->url,
        "galleryUrls": gallery[].asset->url
      }`);
      if (posts && posts.length > 0) {
        return posts.map((p: any) => ({
          ...p,
          coverImageUrl: p.coverMedia ? urlFor(p.coverMedia)?.url() : null
        }));
      }
    }
  } catch (err) {
    console.warn('Sanity query fallback for posts:', err);
  }
  return FALLBACK_POSTS;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    if (projectId) {
      const post = await sanityClient.fetch(`*[_type == "post" && slug.current == $slug][0] {
        _id,
        title,
        subtitle,
        slug,
        category,
        layoutType,
        publishedAt,
        readingTime,
        body,
        coverMedia,
        "pdfUrl": pdfFile.asset->url,
        "galleryUrls": gallery[].asset->url
      }`, { slug });
      if (post) {
        return {
          ...post,
          coverImageUrl: post.coverMedia ? urlFor(post.coverMedia)?.url() : null
        };
      }
    }
  } catch (err) {
    console.warn('Sanity query fallback for post detail:', err);
  }
  return FALLBACK_POSTS.find(p => p.slug.current === slug) || FALLBACK_POSTS[0];
}

export async function getProjects(): Promise<Project[]> {
  try {
    if (projectId) {
      const projects = await sanityClient.fetch(`*[_type == "project"] | order(coalesce(publishedAt, _createdAt) desc) {
        _id,
        title,
        slug,
        status,
        summary,
        publishedAt,
        partners,
        gallery,
        "galleryUrls": gallery[].asset->url,
        "attachedDocUrl": attachedDoc.asset->url
      }`);
      if (projects && projects.length > 0) {
        return projects.map((proj: any) => {
          const resolvedGalleryUrls = (proj.galleryUrls && proj.galleryUrls.length > 0)
            ? proj.galleryUrls.filter(Boolean)
            : (proj.gallery || []).map((img: any) => urlFor(img)?.url()).filter(Boolean);
          
          const fallbackProj = FALLBACK_PROJECTS.find(p => p.slug?.current === proj.slug?.current || p._id === proj._id);

          return {
            ...proj,
            galleryUrls: resolvedGalleryUrls.length > 0
              ? resolvedGalleryUrls
              : (fallbackProj?.galleryUrls || ['/projects/LA BELA/IMG_4931.webp'])
          };
        });
      }
    }
  } catch (err) {
    console.warn('Sanity query fallback for projects:', err);
  }
  return FALLBACK_PROJECTS;
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    if (projectId) {
      const members = await sanityClient.fetch(`*[_type == "teamMember"] | order(order asc) {
        _id,
        name,
        role,
        bio,
        order,
        linkedinUrl,
        photo
      }`);
      if (members && members.length > 0) {
        return members.map((m: any) => ({
          ...m,
          photoUrl: m.photo ? urlFor(m.photo)?.url() : null
        }));
      }
    }
  } catch (err) {
    console.warn('Sanity query fallback for team:', err);
  }
  return FALLBACK_TEAM;
}

export const FALLBACK_EVENTS: Event[] = [
  {
    _id: 'evt-1',
    title: 'Tavola Rotonda: Rigenerazione Urbana e Fondi Europei a Reggio Emilia',
    date: '2026-08-18',
    time: '18:30',
    location: 'Chiostri di San Pietro - Laboratorio Aperto, Reggio Emilia',
    category: 'Tavola Rotonda',
    description: 'Incontro pubblico con europrogettisti, urbanisti ed amministratori locali per analizzare l\'impatto dei fondi PNRR e FESR sugli spazi civici ed ex industriali reggiani.',
    speakers: ['Elena Moretti', 'Prof. Roberto Bianchi', 'Arch. Giulia Neri'],
    registrationUrl: '/contatti?oggetto=Iscrizione%20Evento%20Fondi%20Europei%20Reggio',
    isFree: true
  },
  {
    _id: 'evt-2',
    title: 'Workshop: Data Journalism e Trasparenza sui Bandi Europei in Emilia-Romagna',
    date: '2026-08-25',
    time: '16:00',
    location: 'Spazio Gerra - Centro Arti Visive, Reggio Emilia & Streaming',
    category: 'Workshop',
    description: 'Laboratorio pratico di 3 ore per ricercatori e giornalisti sull\'analisi degli open data regionali, monitoraggio fondi PNRR e mappatura investimenti territoriali.',
    speakers: ['Marco Valenti', 'Sara Conti (Data Analyst)'],
    registrationUrl: '/contatti?oggetto=Iscrizione%20Workshop%20OpenData%20Reggio',
    isFree: true
  },
  {
    _id: 'evt-3',
    title: 'Presentazione Report 2026: Impatto ESG, Imprese e Territorio Emiliano',
    date: '2026-09-04',
    time: '17:30',
    location: 'Chiostri di San Domenico - Sala Conferenze, Reggio Emilia',
    category: 'Presentazione Report',
    description: 'Presentazione in anteprima del dossier annuale sulla sostenibilità ed efficacia degli investimenti ESG condotto dalla redazione di VERACE.',
    speakers: ['Elena Moretti', 'Sofia De Luca', 'Dott. Luca Ferri'],
    registrationUrl: '/contatti?oggetto=Iscrizione%20Presentazione%20Report%20ESG',
    isFree: true
  },
  {
    _id: 'evt-4',
    title: 'Incontro Pubblico: Comunità Energetiche Rinnovabili e Quartieri Reggiani',
    date: '2026-09-16',
    time: '18:00',
    location: 'Tecnopolo di Reggio Emilia - Ex Officine Meccaniche Reggiane',
    category: 'Incontro Pubblico',
    description: 'Come creare e gestire comunità energetiche nei quartieri e nelle frazioni di Reggio Emilia intercettando i bandi regionali FESR.',
    speakers: ['Ing. Andrea Serra', 'Sofia De Luca'],
    registrationUrl: '/contatti?oggetto=Iscrizione%20Incontro%20Comunita%20Energetiche',
    isFree: true
  },
  {
    _id: 'evt-5',
    title: 'Festival VERACE 2026: Paesaggio, Fotografia e Culture Territoriali',
    date: '2026-09-28',
    time: '10:00',
    location: 'Parco Innovazione & Cavallerizza, Reggio Emilia',
    category: 'Festival',
    description: 'Una giornata di dibattiti, mostre fotografiche ispirate a Luigi Ghirri, proiezioni e tavoli di lavoro sulla rigenerazione della via Emilia e dell\'Appennino.',
    speakers: ['Redazione VERACE', 'Fondazione Luigi Ghirri', 'Ospiti Internazionali'],
    registrationUrl: '/contatti?oggetto=Iscrizione%20Festival%20VERACE%202026',
    isFree: true
  },
  {
    _id: 'evt-6',
    title: 'Laboratorio Giovanile: Filiera della Lana e Design Montano',
    date: '2026-10-09',
    time: '15:30',
    location: 'Rifugio San Leonardo - Parco Nazionale dell\'Appennino Reggiano',
    category: 'Laboratorio',
    description: 'Workshop dedicato agli studenti ed ai giovani per sviluppare prodotti innovativi dalla lana autoctona appenninica con Salewa e Alpinaflora.',
    speakers: ['Alessandro Riccio', 'Chiara Rossi'],
    registrationUrl: '/contatti?oggetto=Iscrizione%20Laboratorio%20Appennino',
    isFree: true
  },
  {
    _id: 'evt-7',
    title: 'Forum B2B: Co-progettazione Fondi Europei & Welfare per le PMI Emiliane',
    date: '2026-10-22',
    time: '14:30',
    location: 'Sala degli Specchi - Teatro Municipale Valli, Reggio Emilia',
    category: 'Tavola Rotonda',
    description: 'Convegno dedicato alle aziende partner e PMI per intercettare i bandi FSE+ e FESR 2026-2027 in partenariato con il Terzo Settore.',
    speakers: ['Sofia De Luca', 'Rappresentanti Imprese Emiliane & Fondazione Manodori'],
    registrationUrl: '/contatti?oggetto=Iscrizione%20Forum%20B2B%20Fondi%20Europei',
    isFree: true
  }
];

export async function getEvents(): Promise<Event[]> {
  try {
    if (projectId) {
      const events = await sanityClient.fetch(`*[_type == "event"] | order(date asc) {
        _id,
        title,
        date,
        time,
        location,
        category,
        description,
        speakers,
        registrationUrl,
        isFree
      }`);
      if (events && events.length > 0) return events;
    }
  } catch (err) {
    console.warn('Sanity query fallback for events:', err);
  }
  return FALLBACK_EVENTS;
}

