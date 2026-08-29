import nodemailer from 'nodemailer';
export { renderers } from '../../renderers.mjs';

const DEFAULT_SENDER = process.env.SMTP_FROM || "VERACE Magazine <info@verace-re.eu>";
const BASE_URL = process.env.PUBLIC_SITE_URL || "https://fondazioneverace.eu";
function generateNewsletterWelcomeEmail(recipientEmail, siteUrl = BASE_URL) {
  const magazineUrl = `${siteUrl.replace(/\/$/, "")}/magazine`;
  `${siteUrl.replace(/\/$/, "")}/logos/Verace_Logo_Verde.png`;
  const html = `
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Benvgnû in VERACE | Conferma iscrizione alla newsletter</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #F4F1EA;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #2B2625;
      -webkit-font-smoothing: antialiased;
      line-height: 1.6;
    }
    .wrapper {
      width: 100%;
      table-layout: fixed;
      background-color: #F4F1EA;
      padding-top: 40px;
      padding-bottom: 40px;
    }
    .main-table {
      background-color: #FFFCF9;
      margin: 0 auto;
      width: 100%;
      max-width: 600px;
      border-collapse: collapse;
      border: 1px solid #E6E0D8;
    }
    .header-cell {
      padding: 36px 40px 28px 40px;
      border-bottom: 2px solid #B53D33;
      background-color: #1A1A1A;
      text-align: left;
    }
    .content-cell {
      padding: 40px;
    }
    .hero-title {
      font-family: 'Arial Black', Impact, -apple-system, BlinkMacSystemFont, sans-serif;
      font-size: 26px;
      line-height: 1.15;
      text-transform: uppercase;
      color: #1A1A1A;
      margin: 0 0 20px 0;
      letter-spacing: -0.5px;
    }
    .dialect-badge {
      display: inline-block;
      font-family: 'Courier New', Courier, monospace;
      font-size: 11px;
      font-weight: bold;
      color: #B53D33;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      margin-bottom: 12px;
    }
    .paragraph {
      font-size: 15px;
      line-height: 1.65;
      color: #373232;
      margin: 0 0 20px 0;
    }
    .quote-box {
      background-color: #F9F5EF;
      border-left: 3px solid #B53D33;
      padding: 16px 20px;
      margin: 28px 0;
      font-style: italic;
      font-size: 14px;
      color: #4A4240;
    }
    .btn-container {
      text-align: left;
      margin: 32px 0 36px 0;
    }
    .btn-cta {
      display: inline-block;
      background-color: #B53D33;
      color: #FFFFFF !important;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 13px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      padding: 14px 28px;
      text-decoration: none;
      border-radius: 0px;
    }
    .footer-cell {
      padding: 30px 40px;
      background-color: #1A1A1A;
      color: #9E968F;
      font-size: 12px;
      line-height: 1.6;
      border-top: 1px solid #333333;
    }
    .footer-cell a {
      color: #B53D33;
      text-decoration: none;
    }
    @media only screen and (max-width: 600px) {
      .header-cell, .content-cell, .footer-cell {
        padding: 24px !important;
      }
      .hero-title {
        font-size: 22px !important;
      }
      .btn-cta {
        display: block !important;
        text-align: center !important;
      }
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <table class="main-table" align="center" cellpadding="0" cellspacing="0">
      
      <!-- HEADER -->
      <tr>
        <td class="header-cell">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td>
                <span style="font-family: 'Arial Black', Impact, sans-serif; font-size: 26px; font-weight: 900; color: #FFFFFF; letter-spacing: 2px; text-transform: uppercase;">VERACE</span>
                <span style="display: block; font-family: 'Courier New', monospace; font-size: 10px; color: #B53D33; text-transform: uppercase; letter-spacing: 1px; margin-top: 2px;">Media, Cultura e Rigenerazione Urbana</span>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- BODY CONTENT -->
      <tr>
        <td class="content-cell">
          <div class="dialect-badge">• ISCRIZIONE CONFERMATA</div>
          <h1 class="hero-title">Benvenuta/o nella comunità editoriale di VERACE</h1>

          <p class="paragraph">
            Gentile Lettorice o Lettore,
          </p>

          <p class="paragraph">
            TI ringraziamo <strong>vivamente</strong> per essersi iscritta/o alla nostra newsletter, per aver scelto di seguire da vicino il lavoro di ricerca, documentazione e inchiesta sul campo portato avanti dalla redazione di <strong>VERACE</strong> e da <strong>Bruma ETS</strong>.
          </p>

          <p class="paragraph">
            Con questa iscrizione riceverai periodicamente approfondimenti inediti dedicati alle memorie e alle trasformazioni urbane del territorio di Reggio Emilia e della provincia emiliana: reportage fotografici, articoli sul sottosuolo culturale reggiano e aggiornamenti sui nostri progetti di rigenerazione e co-progettazione per la comunità.
          </p>

          <div class="quote-box">
            «Un magazine urbano ha il compito di raccontare ciò che non sta solamente in superficie, andando oltre la facciata per rivelare i mondi nascosti che vivono a pochi passi da noi.»
          </div>

          <p class="paragraph">
            Ti invitiamo fin da ora a sfogliare gli ultimi articoli e reportage pubblicati sul nostro Magazine digitale:
          </p>

          <!-- CTA BUTTON -->
          <div class="btn-container">
            <a href="${magazineUrl}" target="_blank" class="btn-cta">
              ESPLORA IL MAGAZINE →
            </a>
          </div>

          <p class="paragraph" style="margin-bottom: 8px;">
            Per qualsiasi proposta editoriale, suggerimento o richiesta di chiarimento, può rispondere direttamente a questa email.
          </p>

          <p class="paragraph" style="margin-top: 24px; font-size: 14px; color: #55504E;">
            Cordialmente,<br>
            <strong>La Redazione di VERACE</strong><br>
            <em>«A s'arvdér prest tra le pagine del Magazine.»</em>
          </p>
        </td>
      </tr>

      <!-- FOOTER -->
      <tr>
        <td class="footer-cell">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td>
                <p style="margin: 0 0 6px 0; font-weight: bold; color: #FFFFFF;">Bruma ETS – VERACE Studio</p>
                <p style="margin: 0 0 10px 0;">Via Carlo Marx 53, Roncocesi, Reggio Emilia (RE)</p>
                <p style="margin: 0 0 10px 0;">Email: <a href="mailto:info@verace-re.eu">info@verace-re.eu</a> | Sito web: <a href="${siteUrl}">${siteUrl.replace(/^https?:\/\//, "")}</a></p>
                <p style="margin: 0; font-size: 11px; color: #6E6761;">Riceve questa comunicazione perché ha richiesto l'iscrizione alla newsletter tramite il modulo ufficiale sul nostro sito web.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>

    </table>
  </div>
</body>
</html>
  `.trim();
  const text = `
BENVGNÛ IN VERACE | CONFERMA ISCRIZIONE NEWSLETTER
==================================================

Gentile Lettore,

La ringraziamo vivamente per essersi iscritto/a alla nostra newsletter. A t'ringrasiom cun tòt al cōr per aver scelto di seguire da vicino il lavoro di ricerca, documentazione e inchiesta sul campo portato avanti dalla redazione di VERACE e da Bruma ETS.

Con questa iscrizione riceverà periodicamente approfondimenti inediti dedicati alle memorie e alle trasformazioni urbane del territorio di Reggio Emilia e della provincia emiliana: reportage fotografici, inchieste nel sottosuolo sociale e culturale, e aggiornamenti sui nostri progetti di rigenerazione comunitaria.

Per iniziare subito a leggere i nostri ultimi articoli e reportage, La invitiamo a visitare il nostro Magazine:
${magazineUrl}

«A s'arvdér prest tra le pagine del Magazine.»

Cordialmente,
La Redazione di VERACE
Bruma ETS – Via Carlo Marx 53, Roncocesi, Reggio Emilia (RE)
Email: info@verace-re.eu
Sito: ${siteUrl}
  `.trim();
  return {
    subject: "Conferma iscrizione alla newsletter | VERACE Magazine",
    html,
    text,
    from: DEFAULT_SENDER,
    to: recipientEmail
  };
}
async function sendNewsletterWelcomeEmail(recipientEmail, baseUrl) {
  const emailData = generateNewsletterWelcomeEmail(recipientEmail, baseUrl);
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = parseInt(process.env.SMTP_PORT || "587", 10);
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  if (smtpHost && smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass
        }
      });
      const info = await transporter.sendMail({
        from: emailData.from,
        to: emailData.to,
        subject: emailData.subject,
        text: emailData.text,
        html: emailData.html
      });
      console.info(`[MAILER] Email inviata con successo a ${recipientEmail}. MessageId: ${info.messageId}`);
      return {
        success: true,
        messageId: info.messageId
      };
    } catch (err) {
      console.error("[MAILER ERROR] Errore durante l'invio SMTP:", err);
      return {
        success: false,
        error: err.message || "Errore durante l'invio email via SMTP."
      };
    }
  }
  console.info(`[MAILER SIMULATION] Nessun server SMTP specificato. Invio simulato per ${recipientEmail} da ${DEFAULT_SENDER}`);
  console.info(`[MAILER SIMULATION] Oggetto: "${emailData.subject}"`);
  return {
    success: true,
    simulated: true,
    messageId: `simulated-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
  };
}

const prerender = false;
const GET = async () => {
  return new Response(
    JSON.stringify({
      status: "ok",
      service: "VERACE Newsletter Automated Mailer",
      sender: "info@verace-re.eu"
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
};
const POST = async ({ request, site }) => {
  try {
    let email = "";
    const contentType = request.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      const body = await request.json();
      email = body?.email;
    } else if (contentType.includes("application/x-www-form-urlencoded") || contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      email = formData.get("email")?.toString() || "";
    } else {
      const text = await request.text();
      try {
        const parsed = JSON.parse(text);
        email = parsed?.email || "";
      } catch {
        email = text;
      }
    }
    email = (email || "").trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Inserisci un indirizzo email valido."
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const siteUrl = site ? site.origin : "https://fondazioneverace.eu";
    const sendResult = await sendNewsletterWelcomeEmail(email, siteUrl);
    if (!sendResult.success) {
      return new Response(
        JSON.stringify({
          success: false,
          error: sendResult.error || "Impossibile inviare l'email di conferma. Riprova più tardi."
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
    return new Response(
      JSON.stringify({
        success: true,
        message: "Iscrizione completata con successo! Ti abbiamo inviato una mail di benvenuto da info@verace-re.eu.",
        simulated: sendResult.simulated
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Newsletter API Error:", err);
    return new Response(
      JSON.stringify({
        success: false,
        error: "Si è verificato un errore interno durante l'elaborazione della richiesta."
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
