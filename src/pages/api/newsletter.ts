import type { APIRoute } from 'astro';
import { sendNewsletterWelcomeEmail } from '../../lib/mailer';
import { addOrUpdateNewsletterSubscriber } from '../../lib/sanity';

export const prerender = false;

export const GET: APIRoute = async () => {
  return new Response(
    JSON.stringify({
      status: 'ok',
      service: 'VERACE Newsletter Automated Mailer & Sanity Sync',
      sender: 'info@verace-re.eu'
    }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
};

export const POST: APIRoute = async ({ request, site }) => {
  try {
    let email = '';
    let name = '';

    const contentType = request.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const body = await request.json();
      email = body?.email;
      name = body?.name || '';
    } else if (contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      email = formData.get('email')?.toString() || '';
      name = formData.get('name')?.toString() || '';
    } else {
      const text = await request.text();
      try {
        const parsed = JSON.parse(text);
        email = parsed?.email || '';
        name = parsed?.name || '';
      } catch {
        email = text;
      }
    }

    email = (email || '').trim().toLowerCase();

    // Validazione email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Inserisci un indirizzo email valido.'
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Salva l'iscritto in Sanity Database
    const sanityResult = await addOrUpdateNewsletterSubscriber(email, name, 'Sito Web (Footer)');
    if (!sanityResult.success) {
      console.warn('[NEWSLETTER API] Attenzione: salvataggio Sanity non riuscito, procedo comunque con invio email:', sanityResult.error);
    }

    const siteUrl = site ? site.origin : 'https://fondazioneverace.eu';

    // Invio della mail di conferma automatica tramite info@verace-re.eu
    const sendResult = await sendNewsletterWelcomeEmail(email, siteUrl);

    if (!sendResult.success) {
      return new Response(
        JSON.stringify({
          success: false,
          error: sendResult.error || 'Impossibile inviare l\'email di conferma. Riprova più tardi.'
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Iscrizione completata con successo! Ti abbiamo inviato una mail di benvenuto da info@verace-re.eu.',
        simulated: sendResult.simulated
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    console.error('Newsletter API Error:', err);
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Si è verificato un errore interno durante l\'elaborazione della richiesta.'
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
