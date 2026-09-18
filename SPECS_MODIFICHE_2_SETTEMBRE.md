# Specifiche Tecniche e Funzionali — Aggiornamento 2 Settembre 2026
**Progetto:** VERACE Studio (`fondazioneverace.eu`)  
**Data Documento:** 10 Settembre 2026  
**Riferimento Input:** Aggiornamenti modifiche del 2 Settembre 2026 (con revisione e consolidamento delle note del 29 Agosto 2026)

---

## 1. Visione Estetica & Direzione Artistica `[COMPLETATA - 10 SETTEMBRE 2026]`

L'obiettivo primario di questa iterazione è trasformare l'identità visiva del sito da quella di un classico "ente no-profit/istituzionale" a quella di un **brand contemporaneo, minimale, fresco ed editoriale**.

### Riferimenti di Stile e Benchmark
1. **[Cesura.it](https://www.cesura.it/)**: Pulizia della composizione, ritmo fotografico rigoroso, tipografia essenziale, assenza di sovrastrutture grafiche.
2. **[Patagonia Activism](https://eu.patagonia.com/it/it/activism/)**: Respiro visivo, ampie spaziature, blocchi informativi puliti con icone minimali, estetica audace e moderna.
3. **[TwoJeys](https://twojeys.com/)**: Composizione ultra-pulita, contrasto netto bianco/nero, micro-dettagli curati, senso di esclusività e modernità.

### Principi Guida del Nuovo Design
* **Spazio e Respiro:** ✅ **Applicato** — Incrementate le spaziature verticali, padding e margini tra i moduli per garantire respiro editoriale ed eliminare ogni sensazione di affollamento.
* **Tagli Netti e Geometrie Chiare:** ✅ **Applicato** — Rimossa qualsiasi dissolvenza/sbavatura sfumata sul fondo delle foto (eliminato `#hero-bottom-scroll-fade`), contorni fotografici rigorosamente geometrici e netti.
* **Tipografia e Contrasti Puri:** ✅ **Applicato** — Sostituzione di tutti i toni grigio scuro con nero puro `#000000`, testi degli articoli giustificati, divieto di scritte con doppi colori o artifici burocratici.
* **Palette Ridotta al Minimo:** ✅ **Applicato** — Sistema cromatico essenziale a 3 colori: nuovo bianco caldo `#FFFEF3`, nero puro `#000000`, e rosso iconico `#B53D33` per hover e accenti.

---

## 2. Design System & Impostazioni Globali `[COMPLETATA - 10 SETTEMBRE 2026]`

| Parametro | Valore Precedente | Nuovo Valore (2 Settembre) | Stato | Note di Applicazione |
| :--- | :--- | :--- | :--- | :--- |
| **Colore Sfondo Principale** | `#FFFCF9` | **`#FFFEF3`** | ✅ **FATTO** | Aggiornato `:root` `--bg-main`, Tailwind config e tutte le classi di sfondo neutro. |
| **Colore Testo Scuro / Headings** | `#373232` (Grigio Scuro) | **`#000000`** (Nero Assoluto) | ✅ **FATTO** | Applicato a titoli, paragrafi, didascalie, metadati scuri e template email. |
| **Colore Accento / Brand** | `#B53D33` | **`#B53D33`** | ✅ **FATTO** | Invariato. Utilizzato per hover, bottoni primari, accenti. |
| **Bordi / Cornici** | Bordi grigi / cornici bianche | **Rimossi** | ✅ **FATTO** | Nessuna cornice bianca su sfondo neutro, card pulite su `#FFFEF3` e ombre minimali. |
| **Parentesi Quadre** | `[ ... ]` nei titoli/label | **Rimosse** | ✅ **FATTO** | Rimosse parentesi quadre residue in tutto il sito. |

---

## 3. Specifiche di Dettaglio per Sezione

### 3.1 Header & Navigazione Principale [COMPLETATA - 10 SETTEMBRE 2026] ✅
* **Dimensioni Logo:** Ridotto a dimensione discreta e raffinata in alto a sinistra (`h-[36px] sm:h-[42px] md:h-[46px]`).
* **Sfondo:** Uniformato al nuovo bianco `#FFFEF3`.
* **Link di Navigazione:** Tipografia monospazio/meta pulita in nero puro (`#000000`), con freccia direzionale animata e hover rosso (`#B53D33`).

---

### 3.2 Home Page — Schermata Hero (Apertura) [COMPLETATA - 10 SETTEMBRE 2026] ✅
* **Formato Riquadro Immagine:**
  * ✅ La foto tocca ora **entrambi i bordi laterali dello schermo da lato a lato (`w-full`)** con un'altezza calibrata per il viewport desktop (`h-[44vh] sm:h-[48vh] md:h-[52vh] lg:h-[56vh] max-h-[560px]`).
  * ✅ **Respiro verticale:** Spazio calibrato in alto (distacco dalla navbar) e in basso prima della fine del desktop visualizzato (`pb-8 sm:pb-12 md:pb-16`), consentendo la visione d'insieme senza scroll forzato.
  * ✅ **Taglio Netto:** Nessun bordo sfumato o gradiente di dissolvenza (`#hero-bottom-scroll-fade`), perimetro geometrico secco e pulito.
* **Elementi Sotto la Foto:**
  * ✅ **Scritta Descrittiva:** Dicitura *`"Media cultura e rigenerazione per il territorio"`* in nero puro `#000000` centrata.
  * ✅ **Due Bottoni Centrati:**
    1. Primario: `"scopri i progetti"` (Link a `/progetti`, stile solido nero)
    2. Secondario: `"esplora il nostro magazine"` (Link a `/magazine`, stile outline nero)
* **Controlli da Rimuovere / Mantenere:**
  * ✅ **Rimossi:** Barra del volume, puntini di paginazione (dots), scritte/metadati sparsi in alto.
  * ✅ **Mantenute:** Solo le frecce direzionali essenziali (Prev / Next) discrete in basso a destra dello slider.

---

### 3.3 Home Page — Sezione Progetti [COMPLETATA - 10 SETTEMBRE 2026] ✅
* **Titolo Sezione:**
  * ✅ Intestazione semplificata unicamente in **`PROGETTI`** in grande (`text-4xl md:text-5xl lg:text-6xl font-black font-display text-zero-black`).
  * ✅ Rimossi sovratitolo (*"PROGETTI SUL TERRITORIO"*), sottotitolo (*"INIZIATIVE ATTIVE..."*) e dicitura *"IN EVIDENZA"*.
* **Griglia & Layout Card Progetto:**
  * ✅ **Griglia a 2 Colonne:** Layout su **colonna da 2** (`grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-20`) per dare massimo respiro e maestosità fotografica.
  * ✅ **Riquadri Fotografici Ampi:** Formato fotografico proporzionato e generoso (`aspect-[4/3] sm:aspect-[16/10]`), con taglio netto geometrico e transizione monocromatica/colore fluida all'hover.
  * ✅ **Dettagli sotto la foto:** Titolo sobrio ed elegante sotto l'immagine (`text-xl sm:text-2xl`), seguito dal summary essenziale.
  * ✅ **Rimossi:** Badge "PARTNER", etichette di stato (pill) ingombranti e pulsanti ridondanti sulla card.
* **Bottone Call To Action:**
  * ✅ Bottone di rimando alla pagina completa (`"VEDI TUTTI I PROGETTI →"`) allineato al centro sotto la griglia.

---

### 3.4 Home Page — Sezione Magazine (Anteprima) [COMPLETATA - 10 SETTEMBRE 2026] ✅
* **Titolo & Sottotitolo:**
  * ✅ Eliminato il sovratitolo *"PUBBLICAZIONI"*.
  * ✅ Sostituito il sottotitolo *"DALLA REDAZIONE"* con:  
    *`"storie, racconti, reportage"`* (in minuscolo/mono pulito in nero puro `#000000`).
* **Cards Articoli:**
  * ✅ Griglia fotografica pulita (`aspect-[16/10]`), background seamless integrato con `#FFFEF3`, transizione monocromatico/colore all'hover, titolo essenziale e data di pubblicazione.

---

### 3.5 Pagina Magazine & Articoli
#### A) Pagina Indice Magazine (`/magazine`)
* **Header / Apertura:**
  * Titolo **`MAGAZINE`** allineato a sinistra, in linea perfetta con la griglia e con il logo.
  * Testo introduttivo descrittivo con font lineare, semplice e **non in grassetto**, formattato con ritorni a capo fluidi:
    > *"Verace raccoglie storie del territorio di Reggio Emilia e dintorni, per conoscere ed esplorare i mondi nascosti che vivono a pochi passi da noi."*
  * ❌ Rimuovere vecchie diciture come *"Inchieste e reportage"* o *"redazione indipendente aggiornato mensilmente"*.

#### B) Scheda Singolo Articolo (`/magazine/articolo/[slug]`)
* **Struttura del Contenuto:**
  * Impostazione a ritmo alternato classico ed editoriale: **[Testo] — [Foto] — [Testo] — [Foto]**.
  * **Allineamento:** Testo dei paragrafi **giustificato** per una resa da pubblicazione cartacea d'autore.
  * **Larghezza Immagini & Sottotitoli:** Le fotografie inserite nel corpo e i relativi sottotitoli/didascalie devono avere la **stessa larghezza del testo**.
  * ❌ **Rimuovere:** Indicatore dei minuti di lettura.
  * ✅ **Galleria:** Mantenere la galleria fotografica a fondo pagina.
  * ✅ **Download PDF:** Mantenere il bottone di download del PDF a fondo articolo.

---

### 3.6 Pagina Progetti & Scheda Singolo Progetto [COMPLETATA - 10 SETTEMBRE 2026] ✅
#### A) Pagina Indice Progetti (`/progetti`)
* **Header Editoriale a Tutta Larghezza:** ✅ Titolo **`PROGETTI`** monumentale, testo descrittivo arioso e i due bottoni di azione in apertura (`"PROPONI UN PROGETTO"` e `"SCARICA IL DOSSIER PROGETTI"`).
* **Sticky Action Docker:** ✅ Barra sticky ancorata sotto l'header allo scroll (`sticky top-[68px] md:top-[78px] z-40 bg-zero-bg/95 backdrop-blur-md`), con titolo compatto/conteggio (`PROGETTI / X ATTIVI`) e bottoni di azione (su smartphone compattata con solo il pulsante primario per preservare spazio).
* **Matrice Progetti a 2 Colonne:** ✅ Griglia su colonna da 2 (`grid-cols-1 md:grid-cols-2`) con riquadri fotografici ampi (`aspect-[4/3] sm:aspect-[16/10]`), transizione hover fluida b/n-colore e titoli eleganti.
* **Archivio Progetti Conclusi:** ✅ Sezione dedicata su matrice a 2 colonne con metadati di stato.

#### B) Scheda Singolo Progetto (`/progetti/progetto/[slug]`)
* **Intestazione e Sintesi:**
  * ✅ Rimossa la dicitura/label *"SCHEDA TECNICA"* e *"SINTESI ESECUTIVA DEL PROGETTO"*.
  * ✅ Il testo descrittivo inizia direttamente senza titoletti burocratici intermedi.
  * ✅ Eliminate linee di demarcazione superflue e box di contorno.
* **Sezione Partner:**
  * ✅ Rimossa la label/badge *"PARTNER"* stampata a fianco a ogni nome (mostrati unicamente i nomi puliti dei partner sostenitori).
  * ✅ Rimosso qualsiasi conteggio numerico degli enti.
* **Galleria Progetto:**
  * ✅ Galleria fotografica interattiva lightbox mantenuta senza diciture di conteggio scatti.

---

### 3.7 Pagina Partnership (`/partnership`) [COMPLETATA - 10 SETTEMBRE 2026] ✅
* **Header / Apertura:**
  * ✅ Titolo **`PARTNERSHIP`** a sinistra, testo esplicativo a destra con bottone co-progettazione:
    > *"Verace ha sviluppato un modello di collaborazione tra imprese e terzo settore, che si basa sull’analisi dei bisogni del territorio e la creazione di progetti ad alto impatto sociale con imprese, fondazioni e enti no-profit."*
* **Sezione "Come Collaborare con VERACE" (Nuovo Modello Ispirato a Patagonia Activism):**
  * ✅ Testo introduttivo completo e integrato.
  * ✅ **Schema a 4 Fasi:**
    1. *analizziamo i bisogni del territorio*
    2. *costruiamo partnership virtuose*
    3. *progettiamo l’intervento*
    4. *misuriamo l’impatto con strumenti in linea con gli standard europei della sostenibilità*
  * ✅ **Grafica:** Tessere minimali con numerazione pulita e bordo d'accento rosso senza sottotesti prolissi.
* **Bottone Scarica Dossier:** ✅ Inserito con quadratino rosso distintivo brand (`w-2.5 h-2.5 bg-zero-red`).
* **Nuova Sezione Partner "Con Chi Abbiamo Lavorato":**
  * ✅ Aggiunta fascia orizzontale con i partner territoriali a scorrimento continuo continuo (marquee fluida).
* **Form & FAQ:**
  * ✅ Sportello di co-progettazione integrato su sfondo neutro senza boxature pesanti.
  * ✅ FAQ con tipografia pulita, moderna e lineare (`font-sans`), senza font Populista.

---

### 3.8 Pagina Contatti (`/contatti`)
* **Titolo Pagina:** ✅ **`CONTATTACI`** (rimosso *"contatta la redazione"*).
* **Etichetta Recapiti:**
  * ✅ Posizionata la parola **`RECAPITI`** allineata a sinistra.
* **Blocco Informazioni Sede:**
  * ✅ Rimossi i prefissi numerici `01 /`, `02 /`, `03 /`.
  * ✅ Layout pulito:
    * **INDIRIZZO:** `VIA CARLO MARX 53, RONCOCESI - 42124 REGGIO EMILIA (RE), ITALIA`
    * **POSTA ELETTRONICA:** `INFO@FONDAZIONEVERACE.EU` / `FONDAZIONEVERACE@PEC.IT (PEC)`
    * **SOCIAL MEDIA:** `→ INSTAGRAM: @__verace__`
* **Form:** ✅ Sfondo integrato con il nuovo colore neutro, pulizia dei campi di input e pulsante d'invio ad alto contrasto.

---

### 3.9 Pagina Team & Chi Siamo (`/team`)
* **Sezione "Chi Siamo" — Testo Ufficiale Aggiornato:** ✅
  > *"Verace è una piattaforma indipendente fondata nel 2025 da un team under 30 composto da urbanisti, architetti e fotografi con l’obiettivo di contribuire ad attivare il territorio di Reggio Emilia attraverso progetti culturali, media e di rigenerazione urbana. Lavoriamo con team multidisciplinari collaborando con imprese, fondazioni e enti no-profit."*
* **Sezione Team:** ✅ Griglia delle foto dei membri con nomi, ruoli e bio minimali in layout frameless ed elegante.
* **Sezione Trasparenza:** ✅ Mantenuto il blocco obbligatorio per legge con il tasto:
  * `"scarica il bilancio 2025"` (con link al file di bilancio/dossier).

---

### 3.10 Footer Globale
* **Dati Societari & Fiscali Ufficiali:** ✅
  ```text
  Bruma ETS
  Via Carlo Marx 53, Roncocesi, Reggio Emilia
  CF: 91201950358 P.IVA: 03112030352
  ```
* **Dicitura sotto il Logo:** ✅  
  *`"media, cultura e rigenerazione urbana per il territorio"`*
* **Accesso Riservato:** ✅ Sostituito con la dicitura semplice **`login`**.
* **Newsletter:** ✅ Testo bottone confermato su **`iscriviti alla newsletter`**.

---

## 4. Riepilogo File Interessati dalle Modifiche

| File / Componente | Modifiche Previste |
| :--- | :--- |
| `src/styles/global.css` | Aggiornamento variabili `--bg-main: #FFFEF3`, `--text-main: #000000`, classi di utilità. |
| `src/components/Header.astro` | Ridimensionamento logo, allineamento e pulizia spaziature. |
| `src/components/Hero.astro` | Riquadro stretto e lungo con taglio netto, rimozione dissolvenza scroll, rimozione volume e dots, solo frecce, testo e due bottoni sotto. |
| `src/pages/index.astro` | Rimozione sovratitoli ("PROGETTI SUL TERRITORIO", "PUBBLICAZIONI"), sottotitolo magazine "storie, racconti, reportage", card quadrate e bottone centrato. |
| `src/components/ProjectCard.astro` | Proporzione quadrata per Home, rimozione badge PARTNER e status superflui. |
| `src/pages/magazine/index.astro` | Titolo allineato a sinistra, testo introduttivo semplificato. |
| `src/layouts/ArticleLayout.astro` | Testo giustificato, immagini larghe quanto il testo, rimozione tempo di lettura. |
| `src/pages/progetti.astro` | Font-size tasto "PROPONI UN PROGETTO" uniformato al dossier. |
| `src/pages/progetti/progetto/[slug].astro` | Rimozione "SINTESI ESECUTIVA", eliminazione badge "PARTNER" accanto ai nomi, rimozione diciture conteggio scatti. |
| `src/pages/partnership.astro` | 4 step minimal stile Patagonia con icone, bottone dossier con quadrato colorato, marquee loghi partner "Con chi abbiamo lavorato". |
| `src/pages/contatti.astro` | "RECAPITI" a sinistra, rimozione numerazione `01/02/03`. |
| `src/pages/team.astro` | Aggiornamento testo "Chi Siamo", conferma sezione trasparenza. |
| `src/components/Footer.astro` | Dati legali Bruma ETS, dicitura "login", iscrizione newsletter. |
