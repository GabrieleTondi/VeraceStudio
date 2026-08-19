const fs = require('fs');
const path = require('path');
const https = require('https');
const PDFDocument = require('pdfkit');
const sharp = require('sharp');

function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(destPath)) return resolve(destPath);
    const file = fs.createWriteStream(destPath);
    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        return downloadImage(response.headers.location, destPath).then(resolve).catch(reject);
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve(destPath));
      });
    }).on('error', (err) => {
      fs.unlink(destPath, () => {});
      reject(err);
    });
  });
}

async function main() {
  const publicDir = path.join(process.cwd(), 'public');
  const tempDir = path.join(process.cwd(), 'scratch', 'temp_images');
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  // Convert WEBP or Remote URL to local JPEG for PDFKit
  async function prepareImage(imagePath, defaultRemoteUrl, filenameKey) {
    const localJpgPath = path.join(tempDir, `${filenameKey}.jpg`);
    if (fs.existsSync(localJpgPath)) return localJpgPath;

    if (imagePath && imagePath.startsWith('/')) {
      const fullPath = path.join(publicDir, imagePath);
      if (fs.existsSync(fullPath)) {
        await sharp(fullPath).jpeg({ quality: 90 }).toFile(localJpgPath);
        return localJpgPath;
      }
    }

    if (defaultRemoteUrl) {
      const tempDownload = path.join(tempDir, `${filenameKey}_raw.jpg`);
      await downloadImage(defaultRemoteUrl, tempDownload);
      await sharp(tempDownload).jpeg({ quality: 90 }).toFile(localJpgPath);
      return localJpgPath;
    }

    return null;
  }

  const projects = [
    {
      key: 'la-bela',
      title: 'LA BELA: Laboratorio Itinerante per la Filiera della Lana',
      status: 'IN PROGRAMMAZIONE',
      category: 'FILIERA TERRITORIALE & APPENNINO',
      summary: 'Un laboratorio itinerante in Appennino per conoscere la filiera dimenticata della lana: 2 giorni, 1 notte al rifugio San Leonardo e 20 ragazzi a piedi per le valli per conoscere pastori, agricoltori, musicisti e scienziati.',
      description: 'Il progetto affronta il recupero della lana locale, considerata oggi rifiuto speciale, trasformandola in risorsa pedagogica, culturale ed economica. Attraverso cammini guidati e workshop di tessitura, i partecipanti riscoprono la biodiversità e la memoria produttiva dell\'Appennino.',
      partners: ['Alpinaflora', 'Salewa'],
      imagePath: '/projects/LA BELA/IMG_4931.webp'
    },
    {
      key: 'scuola-territorio',
      title: 'SCUOLA DI TERRITORIO: Connessioni tra Città e Natura',
      status: 'IN CORSO',
      category: 'EDUCAZIONE VISIVA & COMUNITÀ',
      summary: 'Un percorso biennale di conoscenza del territorio e delle connessioni tra la città di Reggio Emilia e la natura, per ragazzi dagli 11 ai 14 anni. Laboratori, cammini, micro-avventure urbane ed esperienze nella natura.',
      description: 'Iniziativa educativa ad alto impatto sociale volta a superare il deficit di natura nei giovani urbani. Attraverso esplorazioni sul campo, l\'osservazione della biodiversità locale e l\'uso del taccuino di campo, la Scuola di Territorio forma cittadini consapevoli e custodi del paesaggio.',
      partners: ['Asineria di Reggio Emilia', 'Giro del Cielo', 'Fondazione Manodori'],
      imagePath: '/projects/SCUOLA DI TERRITORIO/ST_2026-22.webp'
    },
    {
      key: 'viaggi-domenicali',
      title: 'VIAGGI DOMENICALI MINIMI: In Bicicletta nell\'Immaginario di Luigi Ghirri',
      status: 'IN CORSO',
      category: 'FOTOGRAFIA & PAESAGGIO',
      summary: 'Un programma di avventure in bicicletta nell\'immaginario di Luigi Ghirri. 10 Viaggi Minimi per le campagne, fiumi, colline e città dell\'Emilia Romagna.',
      description: 'Ispirato alle note ed alle vedute del grande fotografo emiliano, il progetto propone itinerari su due ruote volti a rallentare lo sguardo e rileggere i luoghi quotidiani. Ogni tappa si conclude con incontri pubblici, mostre all\'aperto e letture di testi d\'archivio.',
      partners: ['Fondazione Luigi Ghirri'],
      imagePath: '/projects/VIAGGI DOMENICALI MINIMI/2_POST_DEFINITIVI_VIAGGIDOMENICALI-14.webp'
    },
    {
      key: 'cantiere-umano',
      title: 'Cantiere Umano: Hub di Inclusione e Maker Space',
      status: 'IN CORSO',
      category: 'INNOVAZIONE SOCIALE & TECNOLOGIA',
      summary: 'Progetto triennale volto alla creazione di un polo tecnologico e artigianale integrato nel cuore della città. Offre laboratori di stampa 3D, restauro conservativo e formazione gratuita per oltre 200 giovani al mese.',
      description: 'Un incubatore di competenze aperto alla cittadinanza in cui le tecnologie digitali si fondono con l\'artigianato tradizionale. Un punto di riferimento per il reinserimento lavorativo ed il contrasto alla povertà educativa.',
      partners: ['TechCorp Europa', 'Banca Sviluppo Sociale', 'Regione Lazio'],
      remoteUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80'
    },
    {
      key: 'verde-comune',
      title: 'Progetto VerdeComune: Foreste Urbane e Biodiversità',
      status: 'IN CORSO',
      category: 'SOSTENIBILITÀ & RIGENERAZIONE',
      summary: 'Iniziativa di piantumazione di 5.000 alberi autoctoni con l\'obiettivo di abbattere le isole di calore nei quartieri periferici e coinvolgere i dipendenti delle aziende sostenitrici in giornate di volontariato aziendale.',
      description: 'L\'intervento combina la riforestazione urbana con percorsi di volontariato d\'impresa (ESG), creando micro-oasi climatiche e migliorando la qualità dell\'aria nelle aree residenziali ad alta densità.',
      partners: ['GreenFuture SpA', 'EcoSystems EU'],
      remoteUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80'
    },
    {
      key: 'memoria-operaia',
      title: 'Archivio Digitale della Memoria Operaia',
      status: 'CONCLUSO',
      category: 'ARCHIVIO STORICO & RICERCA',
      summary: 'Digitalizzazione in alta risoluzione di oltre 10.000 documenti, fotografie e registrazioni audio sull\'evoluzione industriale del secondo Novecento. Piattaforma consultabile liberamente online.',
      description: 'Un importante lavoro di tutela del patrimonio storico industriale che ha permesso di salvaguardare testimonianze visive e orali del lavoro manifatturiero, rendendole accessibili a ricercatori e scuole.',
      partners: ['Ministero della Cultura', 'Archivio Storico'],
      remoteUrl: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=800&q=80'
    },
    {
      key: 'agriskills',
      title: 'AgriSkills: Agricoltura Idroponica Sostenibile',
      status: 'IN PROGRAMMAZIONE',
      category: 'AGRO-INNOVAZIONE & FORMAZIONE',
      summary: 'Programma di formazione professionale in serra idroponica solare dedicato al reinserimento lavorativo di soggetti svantaggiati, con rete di distribuzione a km 0 per le mense cittadine.',
      description: 'Attraverso tecnologie idroponiche a basso impatto idrico, il progetto unisce la formazione agricola sostenibile all\'inclusione sociale, fornendo prodotti freschi a filiera cortissima.',
      partners: ['AgriTech Innovazione'],
      remoteUrl: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=800&q=80'
    }
  ];

  const outputPath = path.join(publicDir, 'pdf', 'sample-project-presentation.pdf');
  const doc = new PDFDocument({
    size: 'A4',
    margin: 0,
    autoFirstPage: true
  });

  const stream = fs.createWriteStream(outputPath);
  doc.pipe(stream);

  // Palette colori VERACE (Verde #02271D)
  const COLOR_BLACK = '#111111';
  const COLOR_VERDE = '#02271D';
  const COLOR_PAPER = '#FBF9F5';
  const COLOR_MUTED = '#555555';

  // ----------------------------------------------------
  // COVER PAGE (PAGE 1)
  // ----------------------------------------------------
  doc.rect(0, 0, doc.page.width, doc.page.height).fill(COLOR_PAPER);

  // Big Header Bar
  doc.rect(35, 35, doc.page.width - 70, 160).fill(COLOR_VERDE);

  doc.fillColor('#FFFFFF')
     .fontSize(11)
     .font('Helvetica-Bold')
     .text('[ FONDAZIONE VERACE ]', 55, 55);

  doc.fontSize(26)
     .font('Helvetica-Bold')
     .text('DOSSIER PROGETTI & INIZIATIVE', 55, 82, { width: doc.page.width - 110 });

  doc.fontSize(13)
     .font('Helvetica')
     .text('Rendicontazione delle attività di rigenerazione urbana, innovazione sociale e cultura', 55, 145, { width: doc.page.width - 110 });

  // Cover Info Box
  doc.fillColor(COLOR_BLACK)
     .fontSize(12)
     .font('Helvetica-Bold')
     .text('SOMMARIO ESECUTIVO DELLE ATTIVITÀ', 35, 225);

  doc.moveTo(35, 242).lineTo(doc.page.width - 35, 242).lineWidth(1.5).stroke(COLOR_BLACK);

  doc.fontSize(10)
     .font('Helvetica')
     .text('Il presente documento raccoglie le schede descrittive ed il materiale fotografico in alta risoluzione relativi ai progetti promossi da Fondazione VERACE.', 35, 255, { width: doc.page.width - 70, height: 35 });

  doc.text('Ogni scheda illustra gli obiettivi strategici, gli enti sostenitori coinvolti, i risultati conseguiti ed il piano d\'azione per la tutela e lo sviluppo dei territori interessati.', 35, 295, { width: doc.page.width - 70, height: 35 });

  // Brutalist Grid of Overview Metrics
  const gridY = 350;
  const colW = (doc.page.width - 80) / 2;
  doc.rect(35, gridY, colW, 95).fillAndStroke('#FFFFFF', COLOR_BLACK);
  doc.rect(45 + colW, gridY, colW, 95).fillAndStroke('#FFFFFF', COLOR_BLACK);

  doc.fillColor(COLOR_VERDE).fontSize(18).font('Helvetica-Bold').text('7 INIZIATIVE', 50, gridY + 18);
  doc.fillColor(COLOR_BLACK).fontSize(9.5).font('Helvetica').text('Progetti attivi, in programmazione e conclusi sul territorio nazionale.', 50, gridY + 45, { width: colW - 30, height: 40 });

  doc.fillColor(COLOR_VERDE).fontSize(18).font('Helvetica-Bold').text('16 PARTNER', 60 + colW, gridY + 18);
  doc.fillColor(COLOR_BLACK).fontSize(9.5).font('Helvetica').text('Istituzioni pubbliche, enti del terzo settore e sostenitori corporate.', 60 + colW, gridY + 45, { width: colW - 30, height: 40 });

  // Footer Cover
  doc.fillColor(COLOR_MUTED).fontSize(9).font('Helvetica').text('Sede Centrale: Via della Spiga 24, Roma | info@fondazioneverace.eu', 35, doc.page.height - 45);

  // ----------------------------------------------------
  // EXACTLY 1 PAGE PER PROJECT (PAGES 2..8)
  // ----------------------------------------------------
  for (let i = 0; i < projects.length; i++) {
    const p = projects[i];
    doc.addPage();
    doc.rect(0, 0, doc.page.width, doc.page.height).fill(COLOR_PAPER);

    // Page Top Header
    doc.fillColor(COLOR_VERDE).fontSize(9).font('Helvetica-Bold').text(`SCHEDA PROGETTO #0${i + 1}`, 35, 30);
    doc.fillColor(COLOR_MUTED).fontSize(9).font('Helvetica').text(p.category, doc.page.width - 260, 30, { align: 'right', width: 225 });
    doc.moveTo(35, 44).lineTo(doc.page.width - 35, 44).lineWidth(1).stroke(COLOR_BLACK);

    // Title & Status
    doc.fillColor(COLOR_BLACK).fontSize(14).font('Helvetica-Bold').text(p.title, 35, 55, { width: doc.page.width - 170, height: 35 });
    
    // Status Badge
    doc.rect(doc.page.width - 135, 55, 100, 20).fill(COLOR_VERDE);
    doc.fillColor('#FFFFFF').fontSize(7.5).font('Helvetica-Bold').text(p.status, doc.page.width - 130, 61, { width: 90, align: 'center' });

    // High Quality Main Cover Photo for each project
    let currentY = 100;
    const imgJpg = await prepareImage(p.imagePath, p.remoteUrl, p.key);
    if (imgJpg) {
      try {
        const imgH = 210;
        doc.image(imgJpg, 35, currentY, { width: doc.page.width - 70, height: imgH, fit: [doc.page.width - 70, imgH], align: 'center', valign: 'center' });
        doc.rect(35, currentY, doc.page.width - 70, imgH).lineWidth(1).stroke(COLOR_BLACK);
        currentY += imgH + 20;
      } catch (err) {
        console.error('Error embedding image:', err);
        currentY += 10;
      }
    }

    // Summary Box
    doc.fillColor(COLOR_BLACK).fontSize(11).font('Helvetica-Bold').text('SINTESI ESECUTIVA', 35, currentY);
    currentY += 15;
    doc.moveTo(35, currentY).lineTo(doc.page.width - 35, currentY).lineWidth(1).stroke(COLOR_BLACK);
    currentY += 10;

    doc.fillColor(COLOR_BLACK).fontSize(9.5).font('Helvetica').text(p.summary, 35, currentY, { width: doc.page.width - 70, height: 45 });
    currentY += 50;

    // Detailed Description
    doc.fillColor(COLOR_BLACK).fontSize(11).font('Helvetica-Bold').text('OBIETTIVI E SVILUPPO STRATEGICO', 35, currentY);
    currentY += 15;
    doc.moveTo(35, currentY).lineTo(doc.page.width - 35, currentY).lineWidth(1).stroke(COLOR_BLACK);
    currentY += 10;

    doc.fillColor(COLOR_BLACK).fontSize(9).font('Helvetica').text(p.description, 35, currentY, { width: doc.page.width - 70, height: 50 });
    currentY += 55;

    // Partners Section
    doc.fillColor(COLOR_VERDE).fontSize(9.5).font('Helvetica-Bold').text('ENTI E PARTNER COINVOLTI:', 35, currentY);
    currentY += 15;

    let partnerX = 35;
    p.partners.forEach(partner => {
      const pWidth = doc.widthOfString(partner) + 18;
      if (partnerX + pWidth > doc.page.width - 35) {
        partnerX = 35;
        currentY += 22;
      }
      doc.rect(partnerX, currentY, pWidth, 18).fillAndStroke('#FFFFFF', COLOR_BLACK);
      doc.fillColor(COLOR_BLACK).fontSize(8).font('Helvetica-Bold').text(partner, partnerX + 9, currentY + 5);
      partnerX += pWidth + 8;
    });

    // Page Footer
    doc.fillColor(COLOR_MUTED).fontSize(8).font('Helvetica').text('FONDAZIONE VERACE — DOSSIER PROGETTI UFFICIALE', 35, doc.page.height - 30);
    doc.text(`PAGINA ${i + 2} DI ${projects.length + 1}`, doc.page.width - 135, doc.page.height - 30, { align: 'right', width: 100 });
  }

  doc.end();
  console.log('PDF Dossier generated cleanly at:', outputPath);
}

main().catch(console.error);
