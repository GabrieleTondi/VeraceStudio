import React, { useState } from 'react';
import type { DocumentActionComponent, DocumentActionProps } from 'sanity';

export const SendCampaignAction: DocumentActionComponent = (props: DocumentActionProps) => {
  const { id, type, draft, published } = props;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [testEmail, setTestEmail] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const doc = draft || published;

  if (type !== 'newsletterCampaign') {
    return null;
  }

  const subject = doc?.subject as string;
  const status = doc?.status as string;

  const handleSendTest = async () => {
    if (!testEmail || !testEmail.includes('@')) {
      setFeedback({ type: 'error', text: 'Inserisci un indirizzo email di test valido.' });
      return;
    }

    setIsSending(true);
    setFeedback(null);

    try {
      const res = await fetch('/api/newsletter/send-campaign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          campaignId: id,
          testEmail: testEmail.trim(),
        }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setFeedback({
          type: 'success',
          text: `Email di test inviata con successo a ${testEmail}!`,
        });
      } else {
        setFeedback({
          type: 'error',
          text: data.error || 'Errore durante l\'invio dell\'email di test.',
        });
      }
    } catch (err: any) {
      setFeedback({
        type: 'error',
        text: 'Errore di connessione con il server: ' + (err.message || err),
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleBroadcast = async () => {
    const confirmSend = window.confirm(
      `CONFERMA INVIO BROADCAST\n\nStai per inviare la newsletter "${subject || 'Senza oggetto'}" a TUTTI gli iscritti attivi.\n\nVuoi procedere?`
    );

    if (!confirmSend) return;

    setIsSending(true);
    setFeedback(null);

    try {
      const res = await fetch('/api/newsletter/send-campaign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          campaignId: id,
        }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setFeedback({
          type: 'success',
          text: `BROADCAST COMPLETATO: Inviate ${data.sentCount} email su ${data.totalSubscribers} iscritti.`,
        });
      } else {
        setFeedback({
          type: 'error',
          text: data.error || 'Errore durante l\'invio del broadcast.',
        });
      }
    } catch (err: any) {
      setFeedback({
        type: 'error',
        text: 'Errore durante la trasmissione: ' + (err.message || err),
      });
    } finally {
      setIsSending(false);
    }
  };

  return {
    label: isSending ? 'Invio in corso...' : 'Invia Newsletter',
    title: 'Invia questa campagna a un indirizzo di test o a tutti gli iscritti',
    tone: 'primary',
    disabled: !subject,
    onHandle: () => {
      setDialogOpen(true);
    },
    dialog: dialogOpen && {
      type: 'dialog',
      onClose: () => {
        setDialogOpen(false);
        setFeedback(null);
      },
      header: 'Centro Invio Newsletter VERACE',
      content: React.createElement(
        'div',
        { style: { padding: '16px', fontFamily: 'sans-serif', maxWidth: '520px' } },
        React.createElement(
          'div',
          { style: { marginBottom: '16px', borderBottom: '1px solid #eee', paddingBottom: '12px' } },
          React.createElement(
            'div',
            { style: { fontSize: '12px', fontWeight: 'bold', color: '#B53D33', textTransform: 'uppercase' } },
            'Dettagli Campagna'
          ),
          React.createElement(
            'div',
            { style: { fontSize: '15px', fontWeight: 'bold', margin: '4px 0', color: '#111' } },
            subject || '(Nessun oggetto specificato)'
          ),
          React.createElement(
            'div',
            { style: { fontSize: '12px', color: '#666' } },
            'Stato attuale: ',
            React.createElement(
              'strong',
              null,
              status === 'sent' ? 'Già inviata' : status === 'ready' ? 'Pronta' : 'Bozza'
            )
          )
        ),
        feedback &&
          React.createElement(
            'div',
            {
              style: {
                padding: '12px',
                marginBottom: '16px',
                borderRadius: '4px',
                fontSize: '13px',
                backgroundColor: feedback.type === 'success' ? '#e6f4ea' : '#fce8e6',
                color: feedback.type === 'success' ? '#137333' : '#c5221f',
                fontWeight: '500',
              },
            },
            feedback.text
          ),
        React.createElement(
          'div',
          {
            style: {
              background: '#f8f9fa',
              padding: '14px',
              borderRadius: '6px',
              marginBottom: '16px',
              border: '1px solid #e9ecef',
            },
          },
          React.createElement(
            'div',
            { style: { fontSize: '13px', fontWeight: 'bold', marginBottom: '6px', color: '#212529' } },
            "1. Invia un'Email di Prova (Test)"
          ),
          React.createElement(
            'div',
            { style: { fontSize: '12px', color: '#6c757d', marginBottom: '10px' } },
            "Invia un'anteprima fedele a un singolo indirizzo per verificare layout, colori e allegati."
          ),
          React.createElement(
            'div',
            { style: { display: 'flex', gap: '8px' } },
            React.createElement('input', {
              type: 'email',
              placeholder: 'es. redazione@verace-re.eu',
              value: testEmail,
              onChange: (e: any) => setTestEmail(e.target.value),
              style: {
                flex: 1,
                padding: '8px 12px',
                borderRadius: '4px',
                border: '1px solid #ced4da',
                fontSize: '13px',
              },
            }),
            React.createElement(
              'button',
              {
                type: 'button',
                onClick: handleSendTest,
                disabled: isSending || !testEmail,
                style: {
                  backgroundColor: '#495057',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '8px 14px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  cursor: isSending || !testEmail ? 'not-allowed' : 'pointer',
                },
              },
              'Invia Test'
            )
          )
        ),
        React.createElement(
          'div',
          {
            style: {
              background: '#fff5f5',
              padding: '14px',
              borderRadius: '6px',
              border: '1px solid #ffc9c9',
            },
          },
          React.createElement(
            'div',
            { style: { fontSize: '13px', fontWeight: 'bold', marginBottom: '6px', color: '#c92a2a' } },
            '2. Invio Broadcast a TUTTI gli Iscritti'
          ),
          React.createElement(
            'div',
            { style: { fontSize: '12px', color: '#495057', marginBottom: '12px', lineHeight: '1.4' } },
            'La newsletter verrà inviata in automatico a tutti gli utenti attivi nel database Sanity con link di disiscrizione univoco e allegati PDF inclusi.'
          ),
          React.createElement(
            'button',
            {
              type: 'button',
              onClick: handleBroadcast,
              disabled: isSending,
              style: {
                width: '100%',
                backgroundColor: '#B53D33',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                padding: '12px',
                fontSize: '13px',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                cursor: isSending ? 'not-allowed' : 'pointer',
              },
            },
            isSending ? 'Elaborazione broadcast in corso...' : 'Invia a Tutti gli Iscritti Ora'
          )
        )
      ),
    },
  };
};
