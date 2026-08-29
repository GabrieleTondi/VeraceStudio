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
export interface SideNote {
  title?: string;
  text: string;
}

export type ArticleBlock =
  | { type: 'text'; content: string; heading?: string }
  | { type: 'image'; url: string; caption?: string; alt?: string }
  | { type: 'didascalia'; title?: string; text: string }
  | { type: 'quote'; quote: string };

export interface AuthorInfo {
  name: string;
  roleOrContext?: string;
  photography?: string;
  credits?: string;
}

export interface Post {
  _id: string;
  title: string;
  subtitle?: string;
  slug: { current: string };
  author?: string;
  credits?: string;
  authorInfo?: AuthorInfo;
  pullquotes?: string[];
  sideNotes?: SideNote[];
  contentBlocks?: ArticleBlock[];
  coverMedia?: {
    asset: { _ref: string };
    url?: string;
    caption?: string;
    altText?: string;
  };
  coverImageUrl?: string;
  videoUrl?: string;
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
    title: 'AL CINESE DA LUIGI',
    subtitle: 'Storia e ricordi della prima famiglia cinese reggiana, ancora oggi nel quartiere, dopo 20 anni di ristorazione. Un\'intervista a Rita e a suo padre Luigi, storico proprietario dell’Hang Zhou di Viale 4 Novembre.',
    author: 'Taima Sallami (22 anni, abitante del quartiere da 9 anni)',
    credits: 'Intervista e ricerca a cura di Taima Sallami - Archivio VERACE Magazine',
    slug: { current: 'al-cinese-da-luigi-storie-memorie-urbane' },
    category: 'Inchieste',
    layoutType: 'standard',
    coverImageUrl: '/articles/AL CINESE/IMG_4846.webp',
    galleryUrls: [
      '/articles/AL CINESE/IMG_4846.webp',
      '/articles/AL CINESE/IMG_1271 copia.webp'
    ],
    publishedAt: '2026-08-13T08:00:00Z',
    readingTime: 8,
    authorInfo: {
      name: 'Taima Sallami',
      roleOrContext: '22 anni, abitante del quartiere da 9 anni',
      credits: 'Intervista a Rita e Luigi Yea per Archivio VERACE Magazine'
    },
    contentBlocks: [
      {
        type: 'text',
        heading: 'Vite',
        content: 'La famiglia Yea arriva a Reggio Emilia negli anni \'70: in Viale 4 Novembre trovano spazio per creare il primo ristorante cinese della città; dal bancone osservano un quartiere in mutamento. Intrecci e osservazione dagli occhi attenti di Rita e Luigi. Negli anni ‘70 la Cina era ancora un paese chiuso, difficile da lasciare, in cui luoghi ancora estremamente rurali crescevano generazioni e generazioni di uomini e donne duri, “ruspanti” come dice Rita. Come Luigi, che in quegli anni lascia San Kou, nelle montagne del riso dello Zhejiang, per trasferirsi a Hong Kong, dove i viaggi erano permessi ed era più semplice emigrare; da lì un volo solo andata per l’Italia, direzione Bologna, dove un prozio si era trasferito negli anni ‘50, dopo la guerra.'
      },
      {
        type: 'image',
        url: '/articles/AL CINESE/IMG_4846.webp',
        caption: 'Rita e Luigi Yea, custodi della memoria dell\'Hang Zhou in Viale 4 Novembre.',
        alt: 'Rita e Luigi Yea al bancone'
      },
      {
        type: 'text',
        content: 'Da Bologna inizia la storia emiliana della famiglia Yea: Luigi viene raggiunto da sua moglie e, dopo un primo periodo da artigiani delle borse per il mercato rionale, hanno imparato la lingua, hanno sensibilità per la cultura italiana e avviano una ricerca, per varie città d’Italia, di un luogo dove aprire un ristorante. La passione per la cucina era un sentimento naturale, sua moglie, grande cuoca, aveva competenze e passione per sostenere un progetto di vita che già a partire dalle montagne dello Zhejiang vedeva come obiettivo finale un luogo per “fare da mangiare”.'
      },
      {
        type: 'didascalia',
        title: 'Origini',
        text: 'Il villaggio di San Kou, nelle remote montagne dello Zhejiang, è una località rurale il cui territorio è dominato dalle risaie. Negli anni ‘90, quando per la prima volta Rita ha visitato la regione su forte volere del padre, il villaggio era ancora fortemente isolato. Per raggiungerlo era necessario atterrare nel capoluogo Hang Zhou e da lì avvicinarsi con mezzi o macchina alla zona montuosa, per poi inerpicarsi sulle colline su strade sterrate e raggiungere l’area abitata. Il villaggio aveva case prevalentemente in legno, senza bagno, si parlava esclusivamente dialetto locale e si viveva di riso, allevamento e rare interazioni con la città moderna. Oggi il villaggio è leggermente evoluto, ma ancora legato ad una vita rurale.'
      },
      {
        type: 'text',
        heading: 'Al cinese da Luigi',
        content: 'Nel 1984, in Viale 4 Novembre, laterale di Via Turri a Reggio Emilia apre Hang Zhou, il primo ristorante cinese della città, probabilmente il primo ristorante non italiano in assoluto; presto soprannominato “il cinese da Luigi”. All’arrivo della famiglia Yea a Reggio, Rita, la figlia minore, è ancora una bambina, e suo padre è l’unica persona cinese dell’intera città, probabilmente una delle pochissime persone immigrate. Si stabiliscono in zona stazione per opportunità imprenditoriale: la stazione garantisce flusso, e la curiosità della città verso una cultura nuova e sconosciuta porta Luigi ad affermarsi come ristorante di moda in città, con una ricca clientela esclusivamente italiana.'
      },
      {
        type: 'didascalia',
        title: 'Banca Interna',
        text: 'La leggenda metropolitana delle valigette di contanti tipiche dei business man cinesi ha un fondo di verità. È tradizione infatti nella cultura cinese sviluppare un’attività una volta trasferiti in un altro paese. Al momento di procedere, il parente più prossimo in quel paese che, idealmente, ha già la sua attività avviata, emette un prestito alla famiglia che sta sviluppando un nuovo impiego. Questo prestito, privo di interessi, è spesso unito a ingenti donazioni in contanti derivanti dai regali matrimoniali dei parenti. Le “buste rosse”, tipicamente utilizzate per regalare denaro durante le nozze, e il prestito familiare mettono la base di partenza per lo sviluppo della nuova attività.'
      },
      {
        type: 'text',
        heading: 'Il menù',
        content: 'Da Luigi si mangia esclusivamente cinese tradizionale, con alcune modifiche... Il menù dell’Hang Zhou mostra una traccia dei mutamenti del quartiere di Via Turri negli anni. In un primo momento infatti la proposta si concentra su una cucina molto tradizionale, con gusti forti, interiora, lingua d’anatra, sapori che non incontrano il palato da “lesso e cappelletti” dei clienti reggiani. Dagli anni \'80 agli anni \'90 il menù si trasforma sempre più in una versione italiana della cucina cinese. Quando l’immigrazione cinese aumenta però, i business cinesi si fortificano, ci sono soldi per uscire la sera, e la richiesta di cucina tradizionale torna. Luigi, da sensibile osservatore delle dinamiche ai suoi tavoli, reintroduce un menù cinese iper tradizionale. Un aneddoto culinario, che mostra i sintomi di come si muove la città, la sua popolazione.'
      },
      {
        type: 'didascalia',
        title: 'La cucina cinese',
        text: 'Nei primi anni l’Hang Zhou ha incontrato qualche difficoltà nel far comprendere la composizione dei pasti cinesi. La cucina cinese infatti non si compone delle classiche portate all’italiana: primo, secondo, dolce, contorni. Ma si basa su un unico piatto centrale, il riso bianco, al quale si abbinano tutti gli altri piatti considerati contorni. I piatti vengono portati in contemporanea e la tradizione vuole che venga tutto mischiato e mangiato in combinazione a scelta personale.'
      },
      {
        type: 'text',
        heading: 'Il Boom, il cantiere, il declino',
        content: 'Nel 1990 la città, come tante altre, assiste al Boom immigratorio. Prima dal sud Italia poi dall’estero, il quartiere stazione vede radicalmente cambiare la sua popolazione, diventando gradualmente un quartiere multietnico. La clientela si diversifica, l’offerta commerciale anche, la popolazione cinese, ormai consolidata, amplia l’interesse su diversi settori ristorativi acquistando bar, tabaccherie e mischiando la cultura cinese con quella giapponese nella creazione del fenomeno del sushi, tuttora spesso di proprietà cinese. A pochi anni dal fenomeno del boom immigratorio, la sempre maggiore intensità del flusso nella stazione spinge l’amministrazione comunale alla costruzione del parcheggio sotterraneo di Piazzale Marconi. Inaugurato nel 2003, agli occhi di Rita segna il punto di svolta nel declino della zona di via Turri.'
      },
      {
        type: 'quote',
        quote: '“CON IL CANTIERE È FINITA UNA ZONA”'
      },
      {
        type: 'text',
        content: 'Il grande parcheggio sotterraneo infatti, a causa di diversi problemi durante i lavori, impiega quasi 3 anni per essere compiuto. In un momento già molto delicato, di mutamento e caratterizzato dall’emergere dei primi fenomeni di degrado, un grande cantiere nel centro dello spazio del quartiere rompe completamente l’equilibrio instabile che ancora resisteva. Anni di cantiere interrompono completamente il flusso di persone su Viale 4 Novembre, le botteghe dei portici su Piazza Marconi chiudono, si smembra l’ultima generazione di commercianti locali che avevano una relazione sana con il resto della città. Anche Luigi sente l’influenza di questo grande cantiere: la clientela cambia, gli amici ristoratori si spostano altrove. Da luogo alla moda, multietnico, frequentato, l\'Hang Zhou di Luigi diventa ritrovo di una popolazione ai margini della città, che la famiglia Yea accoglie ugualmente. “Era diventato una sorta di centro sociale” dice Rita, che ricorda la mamma far credito a chi non poteva pagare, segnando su foglietti di carta, spesso stracciati senza debiti saldati.'
      },
      {
        type: 'image',
        url: '/articles/AL CINESE/IMG_1271 copia.webp',
        caption: 'Scorcio prospettico di Viale 4 Novembre e dei portici della zona stazione.',
        alt: 'Viale 4 Novembre e portici della Stazione'
      },
      {
        type: 'text',
        content: 'L’animo ruspante delle montagne di Luigi lo fa restare agganciato a un quartiere che non è più quello di prima; al finire del cantiere ci si trova intorno un quartiere cambiato, spezzati i legami e gli equilibri, per un’opera pubblica che di certo non aveva l’intento di smembrare un comparto di città, ma che forse ha peccato di superficialità, toccando un micro-clima ora distrutto. Pochi anni dopo Luigi vende il ristorante, che è ora un Kebab pakistano. Ma resta nel quartiere, per orgoglio, comprando casa ai suoi due figli che ancora oggi vivono lì. Rita racconta: “Ho proposto tante volte ai miei genitori di spostarsi ma mi rispondono sempre che loro in un quartiere di stranieri stanno meglio, il palazzo è abitato da soli cinesi, mia mamma si incontra tutte le mattine con le vicine, fanno spesa nel vicino alimentari cinese e cucinano tutto il giorno le ricette tradizionali; c’è una sorta di sfida. Mio padre ha l’orto, ogni mattina alle 6 è nel campo a lavorare. Fermarsi significa ammalarsi per la loro cultura, e le signore hanno bisogno di verdure fresche.”'
      },
      {
        type: 'didascalia',
        title: 'Vocabolario',
        text: 'Resdora o ‘Sdora è un termine dialettale emiliano: si usa per descrivere le signore esperte della cucina tradizionale, che lavorano, spesso in piccoli gruppi, per preparare cappelletti, tortelli e altri classici piatti emiliani. Il paragone con le signore cinesi sorge spontaneo, immaginando una scena molto simile, di cucina in compagnia.'
      },
      {
        type: 'text',
        content: 'Le resdore del mondo si accomunano per competitività e impegno; e i signori da orto anche; sostituendo il lesso con l’anatra effettivamente la scena che ci si immagina fa comprendere come in un contesto come questo c’è chi trova la sua dimensione, chi ci si affeziona e chi probabilmente ignora una serie di diseconomie che agli occhi di molti sono insuperabili, ma che per gli Yea non sono altro che elementi laterali, ai bordi del loro percorso giornaliero casa - orto - fornelli. Una volta all’anno circa in Cina ci tornano insieme, qualche mese di solito, per poi tornare indietro. Ad Hang Zhou, capoluogo della regione al quale era dedicato il nome del ristorante, hanno una casa, amici, parenti, ma ormai la vita si è costruita altrove e si torna sempre indietro. Negli anni Luigi ha lavorato anche per la sua terra d’origine. Come spesso accade nella cultura cinese si mandano fondi al villaggio. Luigi ha per anni gestito questo invio di denaro, per costruire un ponte ad esempio, con i soldi dei ristoratori cinesi in Italia, e collegare due frazioni montuose prima isolate. Il legame con la propria terra non sfuma ma muta, e la vita a Reggio Emilia è ormai routine consolidata.'
      },
      {
        type: 'text',
        heading: 'La mediazione',
        content: 'Rita è la figlia di Luigi e negli anni ha preso un’altra strada rispetto ai genitori. Non ha proseguito il ristorante di famiglia e tanto meno è rimasta nel settore. Dagli anni \'90 circa, da ragazzina, ha gradualmente preso il posto del padre in un altro ruolo che la famiglia aveva assunto nel corso del tempo: la mediatrice culturale. Inizialmente in modo informale, il padre aiutava i cinesi appena arrivati con le carte, era conosciuto in tutti gli uffici e spesso la questura stessa lo contattava per avere una mano con la lingua, ruolo che gradualmente ha passato alla figlia.'
      },
      {
        type: 'text',
        content: '“La macchina della polizia sotto casa per portarmi a tradurre ai processi è un trauma adolescenziale” ricorda Rita, ridendo. Man mano il ruolo si è formalizzato rendendola una figura chiave dell’associazione Mondo Insieme, che si occupa da sempre di progetti di educazione e integrazione. Casa per casa dai ragazzini appena arrivati in Italia, negli asili, al Parco delle Paulonie in Via Turri. Rita eredita il ruolo civico dal padre e ne prosegue il lavoro. In un quartiere cambiato, ma ancora ospitale per certi versi, con la speranza che quel clima di amicizia e integrazione ritorni e che la via possa tornare come quella che vedeva Luigi, seduto sulla sua Vespa, con la sigaretta in mano e il suo famoso cane, sdraiato accanto alla gomma anteriore.'
      }
    ],
    body: []
  },
  {
    _id: 'post-memorie',
    title: 'MEMORIE DAL SOTTOSUOLO',
    subtitle: 'Un magazine urbano ha il compito anche di raccontare ciò che non sta solamente in superficie, di cercare di andare oltre la facciata, di trovare scorci. Il reportage “Memorie dal Sottosuolo” cerca di seguire una storia, sentita per caso per la strada, e di portare alla luce una realtà celata, che mostra un’altra faccia di quello che sembra una zona monocolore, e che invece nasconde habitat paralleli: nei garage sotterranei della via, da 20 anni un mondo di band locali anima la notte. Impermeabili a ciò che accade in superficie. Un reportage per raccontare un sottosuolo sudato, attivo e rumoroso.',
    author: 'Reportage VERACE | Fotografie di Simone Todaro',
    credits: 'Fotografie di Simone Todaro realizzate nel Luglio 2024',
    slug: { current: 'memorie-del-sottosuolo-archeologia-industriale' },
    category: 'Reportage',
    layoutType: 'standard',
    coverImageUrl: '/articles/MEMORIE/IMG_9747.webp',
    galleryUrls: [
      '/articles/MEMORIE/IMG_9747.webp',
      '/articles/MEMORIE/IMG_9754.webp',
      '/articles/MEMORIE/IMG_9811.webp',
      '/articles/MEMORIE/_.webp'
    ],
    publishedAt: '2026-08-12T16:00:00Z',
    readingTime: 6,
    authorInfo: {
      name: 'Redazione VERACE',
      photography: 'Simone Todaro (Luglio 2024)',
      credits: 'Inchiesta sul campo e documentazione fotografica a Reggio Emilia'
    },
    contentBlocks: [
      {
        type: 'didascalia',
        title: 'Il Mondo dei BoxRest',
        text: '«Un complesso di decine di garage sotterranei da 20 anni vengono legalmente affittati e trasformati in sale prove e studi di registrazione; creando un ambiente impermeabile al disagio della superficie, con una comunità di musicisti unita e organizzata che ora sogna di istituirsi legalmente, per organizzare, gestire e proteggere un sano mondo underground. Il mondo dei BoxRest...»'
      },
      {
        type: 'text',
        heading: 'Il sottosuolo di Via Turri',
        content: 'BoxRest è il nome del gruppo WhatsApp nel quale sono stato aggiunto da Cristian, il punto di riferimento della comunità di musicisti che popola il sottosuolo in zona Via Turri, e nostro fixer. È stato lui il primo a raccontarmi questa storia, e ad invitarmi ad andare a vedere. Il racconto di garage sotterranei trasformati in sale prove è una storia nascosta, molte persone ne hanno sentito parlare, a volte, ma nessuno realmente conosce. Inizialmente, da fuori, si pensa ad un luogo aggressivo, da band punk o rapper di zona, ma una volta scesi al piano dei Box, la situazione è ben diversa da come ci si aspetta.'
      },
      {
        type: 'image',
        url: '/articles/MEMORIE/IMG_9747.webp',
        caption: 'La corsia sotterranea dei garage trasformati in sale prove musicali.',
        alt: 'Corsia dei garage sotterranei BoxRest'
      },
      {
        type: 'text',
        content: 'Dagli anni \'90 sono stati progressivamente affittati decine e decine di garage: inizialmente solo qualche band della zona, poi la voce si è sparsa e man mano una fitta rete di contatti si è stabilita. “Chi è nel giro ci trova, ci si passa la parola, se qualche garage è sfitto lo veniamo a sapere e qualche nuovo musicista arriva”. I garage sono allestiti in mille modi: i più professionali hanno doppie porte con pareti insonorizzate, box interni al garage, impianti di aerazione, luci, controsoffitti e attrezzature da studio di registrazione. Altri più spartani, con la porta in ferro e un frigo per le birre circondato da cavi e poster dei concerti degli anni \'90.'
      },
      {
        type: 'quote',
        quote: '«Nel complesso ci sono più di 20 sale prove allestite, alcune artigianali, altri sono veri studi di registrazione»'
      },
      {
        type: 'image',
        url: '/articles/MEMORIE/IMG_9754.webp',
        caption: 'Interno di uno studio attrezzato tra amplificatori e pannelli acustici.',
        alt: 'Interno sala prove BoxRest'
      },
      {
        type: 'text',
        content: 'L’appuntamento è alle 10, fuori dal grande cancello automatico che porta alla rampa di accesso ai garage. Un grande ambiente sotterraneo, come nei classici condomini, nel quale si intravedono portoni aperti, dai quali proviene musica. Questa sera, segnalano, è particolarmente tranquilla: il caldo ha fatto restare a casa tanti musicisti che altrimenti starebbero affollando gli spazi centrali tra i garage. È una sorta di comunità auto-organizzata: l’obiettivo di Cristian e dei giovani dei box è quello di creare un’associazione, per essere riconosciuti, per avere una voce quando, come è già successo svariate volte, il quartiere tenta di fermare questo movimento, per problemi di rumore a volte, di stigma generale altre.'
      },
      {
        type: 'text',
        content: 'Pur essendo sotto ad una delle vie considerata tra le più complesse della città, il micro-clima formatosi ha generato una socialità completamente diversa. Ci raccontano che già agli inizi questa separazione era evidente: al piano strada esisteva una birreria, “La Cicala”, che diversi raccontano come un locale di frontiera, frequentato da gente di ogni tipo fino a tarda notte... pochi metri al di sotto della stessa le prime band abitavano il sottosuolo, la fauna del piano superiore spesso scendeva ad ascoltare, e i musicisti salivano per fare rifornimento birra.'
      },
      {
        type: 'quote',
        quote: '«Dagli anni 90 si suona, da quando la birreria Cicala attirava gente di ogni tipo: in superficie si beveva e sotto si suonava. Due mondi a contatto ma mai uniti...»'
      },
      {
        type: 'image',
        url: '/articles/MEMORIE/IMG_9811.webp',
        caption: 'Batteria e strumentazione musicale durante una sessione notturna.',
        alt: 'Batteria e sessione musicale'
      },
      {
        type: 'text',
        content: 'La vocazione del quartiere era già evidente, ma i garage sono sempre stati in grado di mantenere una certa impermeabilità rispetto a ciò che accadeva in superficie. I contatti tra il quartiere e il sottosuolo sono sempre stati in mutamento: un tempo il cancello non c’era, ma con il passare degli anni si è percepita una sensazione di insicurezza che ha portato a volersi separare anche fisicamente da ciò che succede sopra. Ci raccontano di un episodio: un gruppo numeroso di ragazzi una sera si è scaraventato contro il cancello, forzandolo con delle spranghe, per poi entrare nel complesso e minacciare i presenti con delle grosse mazze di ferro... i presenti si erano rinchiusi dentro i propri garage e avevano chiamato la polizia. Un’aggressione improvvisa che rende l\'idea del contatto tra mondo di sopra e mondo di sotto, e fa riflettere su come sia effettivamente possibile che queste due realtà siano potute rimanere separate nel tempo.'
      },
      {
        type: 'didascalia',
        title: 'Continuità Generazionale',
        text: 'La sensazione di familiarità che si prova ricorda i racconti di una volta, la città scomparsa qui ha lasciato un’eredità, un ambiente di continuità generazionale...'
      },
      {
        type: 'text',
        content: 'Come quello dei musicisti storici che ci invitano dentro una delle sale prove: è loro dagli anni \'90, ora sono adulti, con belle carriere, e si ritrovano la sera per suonare insieme e bere delle birre... In questa situazione sudata e claustrofobica suonano classici rock; invitano alla batteria il nostro amico Diego, per suonare un pezzo dei Ramones. Ogni 2 canzoni, pausa ossigeno: si apre il garage, si respira aria e poi di nuovo dentro. Restiamo, divertiti, seduti sul pavimento dello studio, a parlare di quel che c’era un tempo, della Apple che aveva gli uffici nel palazzo sopra, delle piscine all’ultimo piano dei palazzi di Via Turri...'
      },
      {
        type: 'image',
        url: '/articles/MEMORIE/_.webp',
        caption: 'Scorcio dei corridoi sotterranei e delle porte delle sale prove.',
        alt: 'Corridoi sotterranei'
      },
      {
        type: 'didascalia',
        title: 'Tutela e Riservatezza',
        text: 'Il confronto con gli usufruitori degli spazi del box rest ha portato alla consapevolezza che luoghi underground come questi devono essere raccontati ma protetti. Molti dei frequentatori hanno espresso desiderio di raccontare questo luogo mentre altri ci hanno invitato ad essere cauti. La popolarità eccessiva di un luogo come questo, per alcuni minerebbe la sua purezza underground... Per questo motivo la precisa localizzazione del BoxRest è stata omessa, su indicazione dei presenti.'
      }
    ],
    body: []
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
        author,
        credits,
        pullquotes,
        sideNotes,
        publishedAt,
        readingTime,
        body,
        coverMedia,
        "galleryUrls": gallery[].asset->url
      }`);
      if (posts && posts.length > 0) {
        return posts.map((p: any) => {
          const fallback = FALLBACK_POSTS.find(fb => fb.slug?.current === p.slug?.current || fb._id === p._id);
          const coverImageUrl = p.coverMedia ? urlFor(p.coverMedia)?.url() : fallback?.coverImageUrl;
          return {
            ...fallback,
            ...p,
            title: fallback?.contentBlocks ? fallback.title : p.title,
            subtitle: fallback?.contentBlocks ? fallback.subtitle : p.subtitle,
            contentBlocks: fallback?.contentBlocks || p.contentBlocks,
            authorInfo: fallback?.authorInfo || p.authorInfo,
            coverImageUrl: coverImageUrl || fallback?.coverImageUrl,
            galleryUrls: (p.galleryUrls && p.galleryUrls.length > 0) ? p.galleryUrls : fallback?.galleryUrls
          };
        });
      }
    }
  } catch (err) {
    console.warn('Sanity query fallback for posts:', err);
  }
  return FALLBACK_POSTS;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const fallback = FALLBACK_POSTS.find(p => p.slug.current === slug) || FALLBACK_POSTS[0];
  try {
    if (projectId) {
      const post = await sanityClient.fetch(`*[_type == "post" && slug.current == $slug][0] {
        _id,
        title,
        subtitle,
        slug,
        category,
        layoutType,
        author,
        credits,
        pullquotes,
        sideNotes,
        publishedAt,
        readingTime,
        body,
        coverMedia,
        "galleryUrls": gallery[].asset->url
      }`, { slug });
      if (post) {
        const coverImageUrl = post.coverMedia ? urlFor(post.coverMedia)?.url() : fallback?.coverImageUrl;
        return {
          ...fallback,
          ...post,
          title: fallback?.contentBlocks ? fallback.title : post.title,
          subtitle: fallback?.contentBlocks ? fallback.subtitle : post.subtitle,
          contentBlocks: fallback?.contentBlocks || post.contentBlocks,
          authorInfo: fallback?.authorInfo || post.authorInfo,
          coverImageUrl: coverImageUrl || fallback?.coverImageUrl,
          galleryUrls: (post.galleryUrls && post.galleryUrls.length > 0) ? post.galleryUrls : fallback?.galleryUrls
        };
      }
    }
  } catch (err) {
    console.warn('Sanity query fallback for post detail:', err);
  }
  return fallback;
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

