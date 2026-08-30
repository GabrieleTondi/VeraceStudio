import type { APIRoute } from 'astro';
import { unsubscribeNewsletterEmail } from '../../../lib/sanity';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json().catch(() => ({}));
    const email = (body?.email || '').trim().toLowerCase();

    if (!email || !email.includes('@')) {
      return new Response(
        JSON.stringify({ success: false, error: 'Indirizzo email non valido.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const success = await unsubscribeNewsletterEmail(email);

    return new Response(
      JSON.stringify({
        success: true,
        message: success
          ? 'Disiscrizione completata. Non riceverai più le newsletter di VERACE.'
          : 'L\'indirizzo email non risulta attualmente presente nella lista o è già stato rimosso.',
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    console.error('Unsubscribe API Error:', err);
    return new Response(
      JSON.stringify({ success: false, error: 'Errore durante la disiscrizione.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
