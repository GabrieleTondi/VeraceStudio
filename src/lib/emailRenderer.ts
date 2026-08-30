import { urlFor } from './sanity';

export interface EmailRenderOptions {
  campaign: {
    _id?: string;
    title: string;
    subject: string;
    preheader?: string;
    headerBadge?: string;
    senderName?: string;
    senderEmail?: string;
    content: any[];
    attachments?: Array<{
      title: string;
      file?: any;
      description?: string;
      sendAsDirectAttachment?: boolean;
    }>;
  };
  recipientEmail?: string;
  siteUrl?: string;
}

export interface RenderedEmail {
  subject: string;
  html: string;
  text: string;
  from: string;
  preheader?: string;
}

/**
 * Renderizza i blocchi di testo e le annotazioni di Sanity Portable Text
 */
function renderSpan(span: any, marksDef: any[] = []): string {
  if (!span) return '';
  let text = span.text || '';

  // Escape HTML di base
  text = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  if (!span.marks || span.marks.length === 0) {
    return text;
  }

  for (const mark of span.marks) {
    // Standard Decorators
    if (mark === 'strong') {
      text = `<strong style="font-weight: 700; color: #1A1A1A;">${text}</strong>`;
    } else if (mark === 'em') {
      text = `<em>${text}</em>`;
    } else if (mark === 'underline') {
      text = `<span style="text-decoration: underline;">${text}</span>`;
    } else if (mark === 'strike-through') {
      text = `<span style="text-decoration: line-through;">${text}</span>`;
    } else if (mark === 'code') {
      text = `<code style="font-family: 'Courier New', monospace; background-color: #ECE7DE; padding: 2px 6px; font-size: 13px; color: #B53D33;">${text}</code>`;
    } else if (mark === 'colorRed') {
      text = `<span style="color: #B53D33; font-weight: 700;">${text}</span>`;
    } else if (mark === 'colorDark') {
      text = `<span style="color: #1A1A1A; font-weight: 700;">${text}</span>`;
    } else if (mark === 'colorGreen') {
      text = `<span style="color: #1B4332; font-weight: 700;">${text}</span>`;
    } else if (mark === 'colorGray') {
      text = `<span style="color: #55504E;">${text}</span>`;
    } else if (mark === 'colorHighlight') {
      text = `<span style="background-color: #FEF08A; padding: 2px 4px; color: #1A1A1A;">${text}</span>`;
    } else {
      // Annotations (Links, customColor, etc.)
      const def = marksDef.find((m) => m._key === mark);
      if (def) {
        if (def._type === 'link' || def.href) {
          const href = def.href || '#';
          const target = def.blank !== false ? ' target="_blank" rel="noopener noreferrer"' : '';
          text = `<a href="${href}"${target} style="color: #B53D33; text-decoration: underline; font-weight: 600;">${text}</a>`;
        } else if (def._type === 'customColor' || def.color) {
          const col = def.color || '#B53D33';
          text = `<span style="color: ${col}; font-weight: 600;">${text}</span>`;
        }
      }
    }
  }

  return text;
}

/**
 * Converte i blocchi Portable Text di Sanity in HTML per email e testo puro
 */
export function renderPortableTextToEmail(blocks: any[] = []): { html: string; text: string } {
  let htmlResult = '';
  let textResult = '';

  let inList: 'bullet' | 'number' | null = null;

  const closeListIfNeeded = () => {
    if (inList === 'bullet') {
      htmlResult += '</ul>\n';
      inList = null;
    } else if (inList === 'number') {
      htmlResult += '</ol>\n';
      inList = null;
    }
  };

  for (const block of blocks) {
    if (!block) continue;

    // 1. BLOCCO DI TESTO STANDARD (block)
    if (block._type === 'block') {
      const markDefs = block.markDefs || [];
      const renderedSpans = (block.children || []).map((c: any) => renderSpan(c, markDefs)).join('');
      const plainSpans = (block.children || []).map((c: any) => c.text || '').join('');

      // Gestione Liste
      if (block.listItem) {
        if (block.listItem === 'bullet') {
          if (inList !== 'bullet') {
            closeListIfNeeded();
            htmlResult += '<ul style="margin: 0 0 18px 0; padding-left: 24px; color: #373232; font-size: 15px; line-height: 1.65;">\n';
            inList = 'bullet';
          }
          htmlResult += `  <li style="margin-bottom: 6px;">${renderedSpans}</li>\n`;
          textResult += `• ${plainSpans}\n`;
        } else if (block.listItem === 'number') {
          if (inList !== 'number') {
            closeListIfNeeded();
            htmlResult += '<ol style="margin: 0 0 18px 0; padding-left: 24px; color: #373232; font-size: 15px; line-height: 1.65;">\n';
            inList = 'number';
          }
          htmlResult += `  <li style="margin-bottom: 6px;">${renderedSpans}</li>\n`;
          textResult += `1. ${plainSpans}\n`;
        }
        continue;
      }

      closeListIfNeeded();

      const style = block.style || 'normal';

      switch (style) {
        case 'h1':
          htmlResult += `<h1 style="font-family: 'Arial Black', Impact, -apple-system, sans-serif; font-size: 24px; line-height: 1.2; font-weight: 900; color: #1A1A1A; margin: 28px 0 14px 0; text-transform: uppercase; letter-spacing: -0.5px;">${renderedSpans}</h1>\n`;
          textResult += `\n\n=== ${plainSpans.toUpperCase()} ===\n\n`;
          break;
        case 'h2':
          htmlResult += `<h2 style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 20px; line-height: 1.3; font-weight: 800; color: #1A1A1A; margin: 24px 0 12px 0; border-bottom: 1px solid #E6E0D8; padding-bottom: 6px;">${renderedSpans}</h2>\n`;
          textResult += `\n\n-- ${plainSpans} --\n\n`;
          break;
        case 'h3':
          htmlResult += `<h3 style="font-family: 'Courier New', Courier, monospace; font-size: 14px; line-height: 1.4; font-weight: 700; color: #B53D33; margin: 18px 0 8px 0; text-transform: uppercase; letter-spacing: 1px;">${renderedSpans}</h3>\n`;
          textResult += `\n> ${plainSpans}\n\n`;
          break;
        case 'lead':
          htmlResult += `<p style="font-size: 17px; line-height: 1.65; font-weight: 500; color: #1A1A1A; margin: 0 0 20px 0;">${renderedSpans}</p>\n`;
          textResult += `${plainSpans}\n\n`;
          break;
        case 'blockquote':
          htmlResult += `<div style="background-color: #F9F5EF; border-left: 3px solid #B53D33; padding: 16px 20px; margin: 24px 0; font-style: italic; font-size: 14px; color: #4A4240; line-height: 1.6;">«${renderedSpans}»</div>\n`;
          textResult += `\n«${plainSpans}»\n\n`;
          break;
        case 'caption':
          htmlResult += `<p style="font-size: 12px; line-height: 1.5; color: #78716C; margin: 0 0 14px 0; font-family: 'Courier New', monospace;">${renderedSpans}</p>\n`;
          textResult += `(${plainSpans})\n\n`;
          break;
        case 'normal':
        default:
          htmlResult += `<p style="font-size: 15px; line-height: 1.65; color: #373232; margin: 0 0 18px 0;">${renderedSpans}</p>\n`;
          textResult += `${plainSpans}\n\n`;
          break;
      }
    }

    // 2. PULSANTE CALL TO ACTION (emailCta)
    else if (block._type === 'emailCta') {
      closeListIfNeeded();
      const text = block.text || 'ESPLORA';
      const url = block.url || '#';
      const align = block.alignment || 'left';
      const styleVariant = block.style || 'primary';

      let btnBg = '#B53D33';
      let btnColor = '#FFFFFF';
      let btnBorder = '1px solid #B53D33';

      if (styleVariant === 'dark') {
        btnBg = '#1A1A1A';
        btnColor = '#FFFFFF';
        btnBorder = '1px solid #1A1A1A';
      } else if (styleVariant === 'outline') {
        btnBg = '#FFFCF9';
        btnColor = '#B53D33';
        btnBorder = '2px solid #B53D33';
      } else if (styleVariant === 'green') {
        btnBg = '#1B4332';
        btnColor = '#FFFFFF';
        btnBorder = '1px solid #1B4332';
      }

      htmlResult += `
<div style="text-align: ${align}; margin: 28px 0 32px 0;">
  <!--[if mso]>
  <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${url}" style="height:44px;v-text-anchor:middle;width:240px;" arcsize="0%" stroke="f" fillcolor="${btnBg}">
    <w:anchorlock/>
    <center>
  <![endif]-->
  <a href="${url}" target="_blank" rel="noopener noreferrer" style="background-color: ${btnBg}; color: ${btnColor} !important; border: ${btnBorder}; display: inline-block; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; padding: 14px 28px; text-decoration: none; text-align: center;">
    ${text}
  </a>
  <!--[if mso]>
    </center>
  </v:roundrect>
  <![endif]-->
</div>\n`;

      textResult += `\n[ ${text.toUpperCase()} ] -> ${url}\n\n`;
    }

    // 3. BOX CALLOUT (emailCallout)
    else if (block._type === 'emailCallout') {
      closeListIfNeeded();
      const title = block.title || '';
      const text = block.text || '';
      const variant = block.variant || 'accent';

      let boxBg = '#F9F5EF';
      let boxBorder = '3px solid #B53D33';
      let titleColor = '#B53D33';
      let textColor = '#4A4240';

      if (variant === 'dark') {
        boxBg = '#1A1A1A';
        boxBorder = '1px solid #333333';
        titleColor = '#FFFFFF';
        textColor = '#D6D1CA';
      } else if (variant === 'green') {
        boxBg = '#EBF4F0';
        boxBorder = '3px solid #1B4332';
        titleColor = '#1B4332';
        textColor = '#22382E';
      }

      htmlResult += `
<div style="background-color: ${boxBg}; border-left: ${boxBorder}; padding: 20px; margin: 26px 0;">
  ${title ? `<div style="font-family: 'Courier New', monospace; font-size: 11px; font-weight: bold; color: ${titleColor}; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 8px;">${title}</div>` : ''}
  <div style="font-size: 14px; line-height: 1.6; color: ${textColor};">${text.replace(/\n/g, '<br>')}</div>
</div>\n`;

      textResult += `\n----------------------------------------\n${title ? `[ ${title} ]\n` : ''}${text}\n----------------------------------------\n\n`;
    }

    // 4. IMMAGINE EMAIL (emailImage)
    else if (block._type === 'emailImage') {
      closeListIfNeeded();
      const caption = block.caption || '';
      const alt = block.altText || caption || 'Immagine Newsletter';
      const linkUrl = block.linkUrl || '';

      let imageUrl = '';
      if (block.image) {
        const built = urlFor(block.image);
        if (built) {
          imageUrl = built.width(800).quality(85).auto('format').url();
        }
      }

      if (imageUrl) {
        let imgTag = `<img src="${imageUrl}" alt="${alt}" width="520" style="display: block; width: 100%; max-width: 520px; height: auto; border: 0; margin: 0 auto;" />`;
        if (linkUrl) {
          imgTag = `<a href="${linkUrl}" target="_blank" rel="noopener noreferrer">${imgTag}</a>`;
        }

        htmlResult += `
<div style="margin: 28px 0; text-align: center;">
  ${imgTag}
  ${caption ? `<div style="font-family: 'Courier New', monospace; font-size: 11px; color: #78716C; margin-top: 8px; text-align: left; line-height: 1.4;">• ${caption}</div>` : ''}
</div>\n`;

        textResult += `\n[Immagine: ${alt}${caption ? ` - ${caption}` : ''}]\n${linkUrl ? `Link: ${linkUrl}\n` : ''}\n`;
      }
    }

    // 5. SEPARATORE GRAFICO (emailDivider)
    else if (block._type === 'emailDivider') {
      closeListIfNeeded();
      const style = block.style || 'line';

      if (style === 'redLine') {
        htmlResult += '<div style="margin: 30px 0; height: 2px; background-color: #B53D33;"></div>\n';
      } else if (style === 'dots') {
        htmlResult += '<div style="margin: 24px 0; text-align: center; font-size: 16px; letter-spacing: 8px; color: #B53D33;">•••</div>\n';
      } else if (style === 'space') {
        htmlResult += '<div style="margin: 32px 0;"></div>\n';
      } else {
        htmlResult += '<div style="margin: 28px 0; border-top: 1px solid #E6E0D8;"></div>\n';
      }

      textResult += '\n----------------------------------------\n\n';
    }
  }

  closeListIfNeeded();

  return {
    html: htmlResult.trim(),
    text: textResult.trim(),
  };
}

/**
 * Genera l'intera email professionale (HTML compatibile con tutti i client + PlainText)
 */
export function generateCampaignEmailHtml(options: EmailRenderOptions): RenderedEmail {
  const { campaign, recipientEmail = '', siteUrl = 'https://fondazioneverace.eu' } = options;

  const preheader = campaign.preheader || '';
  const headerBadge = campaign.headerBadge || 'NEWSLETTER UFFICIALE';
  const senderName = campaign.senderName || 'VERACE Magazine';
  const senderEmail = campaign.senderEmail || 'info@verace-re.eu';
  const cleanSiteUrl = siteUrl.replace(/\/$/, '');
  const unsubscribeUrl = `${cleanSiteUrl}/unsubscribe?email=${encodeURIComponent(recipientEmail)}`;
  const magazineUrl = `${cleanSiteUrl}/magazine`;

  // Renderizza il corpo Portable Text
  const bodyContent = renderPortableTextToEmail(campaign.content || []);

  // Se ci sono allegati, genera un blocco descrittivo elegante
  let attachmentsHtml = '';
  let attachmentsText = '';

  if (campaign.attachments && campaign.attachments.length > 0) {
    attachmentsHtml = `
      <div style="margin-top: 36px; padding: 20px; background-color: #F9F5EF; border: 1px solid #E6E0D8; border-radius: 0px;">
        <div style="font-family: 'Courier New', monospace; font-size: 11px; font-weight: bold; color: #B53D33; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 12px;">
          📎 DOCUMENTI E ALLEGATI DISPONIBILI (${campaign.attachments.length})
        </div>
        <ul style="margin: 0; padding-left: 18px; font-size: 13px; color: #373232; line-height: 1.6;">
          ${campaign.attachments
            .map(
              (att) =>
                `<li style="margin-bottom: 6px;"><strong>${att.title}</strong>${att.description ? ` &ndash; <em>${att.description}</em>` : ''}</li>`
            )
            .join('')}
        </ul>
      </div>
    `;

    attachmentsText = `\n\nALLEGATI DISPONIBILI:\n` +
      campaign.attachments.map((att) => `- ${att.title}${att.description ? ` (${att.description})` : ''}`).join('\n');
  }

  const html = `
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${campaign.subject}</title>
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
      padding: 32px 40px 24px 40px;
      border-bottom: 2px solid #B53D33;
      background-color: #1A1A1A;
      text-align: left;
    }
    .content-cell {
      padding: 40px;
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
    }
  </style>
</head>
<body>
  ${preheader ? `<div style="display: none; max-height: 0px; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">${preheader} &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;</div>` : ''}

  <div class="wrapper">
    <table class="main-table" align="center" cellpadding="0" cellspacing="0">
      
      <!-- HEADER -->
      <tr>
        <td class="header-cell">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td>
                <span style="font-family: 'Arial Black', Impact, sans-serif; font-size: 26px; font-weight: 900; color: #FFFFFF; letter-spacing: 2px; text-transform: uppercase;">VERACE</span>
                <span style="display: block; font-family: 'Courier New', monospace; font-size: 10px; color: #B53D33; text-transform: uppercase; letter-spacing: 1.5px; margin-top: 3px;">Media, Cultura e Rigenerazione Urbana</span>
              </td>
              <td align="right" valign="top">
                <span style="display: inline-block; font-family: 'Courier New', monospace; font-size: 9px; font-weight: bold; background-color: #333333; color: #FFFFFF; padding: 4px 8px; text-transform: uppercase; letter-spacing: 1px;">
                  ${headerBadge}
                </span>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- BODY CONTENT -->
      <tr>
        <td class="content-cell">
          ${bodyContent.html}
          ${attachmentsHtml}
        </td>
      </tr>

      <!-- FOOTER -->
      <tr>
        <td class="footer-cell">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td>
                <p style="margin: 0 0 6px 0; font-weight: bold; color: #FFFFFF;">Bruma ETS &ndash; VERACE Studio</p>
                <p style="margin: 0 0 8px 0;">Via Carlo Marx 53, Roncocesi, Reggio Emilia (RE)</p>
                <p style="margin: 0 0 12px 0;">Email: <a href="mailto:info@verace-re.eu">info@verace-re.eu</a> | Sito web: <a href="${cleanSiteUrl}">${cleanSiteUrl.replace(/^https?:\/\//, '')}</a></p>
                <p style="margin: 0 0 8px 0; font-size: 11px; color: #6E6761; line-height: 1.5;">Ricevi questa comunicazione editoriale perché sei iscritto/a alla newsletter ufficiale di VERACE Studio.</p>
                <p style="margin: 0; font-size: 11px; color: #8C827A;">
                  Non desideri più ricevere queste email? <a href="${unsubscribeUrl}" style="color: #D14D41; text-decoration: underline;">Disiscriviti dalla newsletter</a>
                </p>
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
VERACE | ${headerBadge}
==================================================
${campaign.subject}
==================================================

${bodyContent.text}
${attachmentsText}

--------------------------------------------------
Bruma ETS – VERACE Studio
Via Carlo Marx 53, Roncocesi, Reggio Emilia (RE)
Email: info@verace-re.eu
Sito web: ${cleanSiteUrl}

Per disiscriverti dalla newsletter:
${unsubscribeUrl}
  `.trim();

  return {
    subject: campaign.subject,
    html,
    text,
    from: `${senderName} <${senderEmail}>`,
    preheader,
  };
}
