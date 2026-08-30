import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';
import {
  getNewsletterCampaignById,
  getActiveNewsletterSubscribers,
  updateNewsletterCampaignStatus,
} from '../../../lib/sanity';
import { generateCampaignEmailHtml } from '../../../lib/emailRenderer';

export const prerender = false;

// GET: info & status endpoint
export const GET: APIRoute = async () => {
  return new Response(
    JSON.stringify({
      service: 'VERACE Campaign Broadcast & Test Dispatcher',
      status: 'ready',
    }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
};

// POST: Trigger invio campagna (Test o Broadcast a tutti gli iscritti)
export const POST: APIRoute = async ({ request, site }) => {
  try {
    const body = await request.json().catch(() => ({}));
    const { campaignId, testEmail, action } = body;

    if (!campaignId) {
      return new Response(
        JSON.stringify({ success: false, error: 'ID campagna mancante (campaignId obbligatorio).' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 1. Recupera la campagna da Sanity
    const campaign = await getNewsletterCampaignById(campaignId);
    if (!campaign) {
      return new Response(
        JSON.stringify({ success: false, error: `Campagna non trovata su Sanity con ID: ${campaignId}` }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const siteUrl = site ? site.origin : 'https://fondazioneverace.eu';

    // 2. Configura il transporter SMTP Nodemailer
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const isLiveSmtp = Boolean(smtpHost && smtpUser && smtpPass);

    let transporter: nodemailer.Transporter | null = null;
    if (isLiveSmtp) {
      transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });
    }

    // 3. Scarica in memoria gli allegati da Sanity (se presenti)
    const emailAttachments: Array<{
      filename: string;
      content: Buffer;
      contentType?: string;
    }> = [];

    if (campaign.attachments && Array.isArray(campaign.attachments)) {
      for (const att of campaign.attachments) {
        if (att.fileUrl) {
          try {
            const res = await fetch(att.fileUrl);
            if (res.ok) {
              const arrayBuffer = await res.arrayBuffer();
              const buffer = Buffer.from(arrayBuffer);
              const filename = att.fileName || att.title || 'allegato.pdf';
              emailAttachments.push({
                filename,
                content: buffer,
                contentType: att.mimeType || 'application/pdf',
              });
            }
          } catch (fetchErr) {
            console.error(`Errore nel download dell'allegato "${att.title}":`, fetchErr);
          }
        }
      }
    }

    // =========================================================================
    // MODALITÀ A: INVIO DI PROVA (TEST EMAIL)
    // =========================================================================
    if (testEmail) {
      const cleanTestEmail = testEmail.trim().toLowerCase();
      const rendered = generateCampaignEmailHtml({
        campaign,
        recipientEmail: cleanTestEmail,
        siteUrl,
      });

      // Aggiungi un badge di test nell'oggetto
      const testSubject = `[TEST] ${rendered.subject}`;

      if (isLiveSmtp && transporter) {
        try {
          const info = await transporter.sendMail({
            from: rendered.from,
            to: cleanTestEmail,
            subject: testSubject,
            text: rendered.text,
            html: rendered.html,
            attachments: emailAttachments,
          });

          return new Response(
            JSON.stringify({
              success: true,
              mode: 'test',
              recipient: cleanTestEmail,
              messageId: info.messageId,
              message: `Email di test inviata con successo a ${cleanTestEmail}`,
              attachmentsIncluded: emailAttachments.length,
            }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
          );
        } catch (err: any) {
          console.error('[CAMPAIGN TEST SEND ERROR]:', err);
          return new Response(
            JSON.stringify({
              success: false,
              mode: 'test',
              error: err?.message || 'Errore durante l\'invio SMTP del test.',
            }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
          );
        }
      } else {
        // Modalità simulata
        console.info(`[CAMPAIGN SIMULATED TEST] Invio simulato di test a ${cleanTestEmail}`);
        console.info(`Oggetto: "${testSubject}" | Allegati: ${emailAttachments.length}`);

        return new Response(
          JSON.stringify({
            success: true,
            mode: 'test',
            simulated: true,
            recipient: cleanTestEmail,
            message: `[Simulazione] Email di test elaborata correttamente per ${cleanTestEmail}`,
            attachmentsIncluded: emailAttachments.length,
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }

    // =========================================================================
    // MODALITÀ B: BROADCAST MASSIVO A TUTTI GLI ISCRITTI ATTIVI
    // =========================================================================
    const subscribers = await getActiveNewsletterSubscribers();

    if (!subscribers || subscribers.length === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Nessun iscritto attivo trovato nel database Sanity. Impossibile avviare il broadcast.',
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    let successCount = 0;
    let failureCount = 0;
    const errorsList: string[] = [];

    const startTime = new Date();

    for (const sub of subscribers) {
      const recipientEmail = sub.email.trim().toLowerCase();
      const rendered = generateCampaignEmailHtml({
        campaign,
        recipientEmail,
        siteUrl,
      });

      if (isLiveSmtp && transporter) {
        try {
          await transporter.sendMail({
            from: rendered.from,
            to: recipientEmail,
            subject: rendered.subject,
            text: rendered.text,
            html: rendered.html,
            attachments: emailAttachments,
          });
          successCount++;
        } catch (err: any) {
          failureCount++;
          errorsList.push(`${recipientEmail}: ${err?.message || 'Errore sconosciuto'}`);
        }
      } else {
        // Modalità simulata
        successCount++;
      }
    }

    const endTime = new Date();
    const durationSeconds = ((endTime.getTime() - startTime.getTime()) / 1000).toFixed(1);

    const logSummary = `
Invio completato il ${endTime.toLocaleString('it-IT')} in ${durationSeconds}s.
Totale destinatari tentati: ${subscribers.length}
Consegnate con successo: ${successCount}
Errori: ${failureCount}
${isLiveSmtp ? 'Modalità: Live SMTP' : 'Modalità: Simulazione locale (Nessun SMTP configurato)'}
${errorsList.length > 0 ? `\nDettaglio errori:\n${errorsList.slice(0, 10).join('\n')}` : ''}
    `.trim();

    // Aggiorna lo stato della campagna su Sanity
    await updateNewsletterCampaignStatus(campaignId, {
      status: 'sent',
      sentAt: endTime.toISOString(),
      recipientsCount: successCount,
      sendLogs: logSummary,
    });

    return new Response(
      JSON.stringify({
        success: true,
        mode: 'broadcast',
        totalSubscribers: subscribers.length,
        sentCount: successCount,
        failedCount: failureCount,
        simulated: !isLiveSmtp,
        logSummary,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    console.error('[CAMPAIGN BROADCAST API ERROR]:', err);
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Errore interno del server durante l\'invio della campagna: ' + (err?.message || err),
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
