const DEFAULT_CONTACT_EMAIL = 'riptides@americansherpatours.com';

function getEmailConfig() {
  const provider = (process.env.MEMBERSHIP_EMAIL_PROVIDER || 'resend').trim().toLowerCase();
  const from = process.env.MEMBERSHIP_EMAIL_FROM;
  const replyTo = process.env.MEMBERSHIP_CONTACT_EMAIL || DEFAULT_CONTACT_EMAIL;

  if (!['resend', 'brevo'].includes(provider)) {
    throw new Error('Membership email provider must be either "resend" or "brevo".');
  }

  return {
    provider,
    from,
    replyTo,
    apiKey: provider === 'brevo' ? process.env.BREVO_API_KEY : process.env.RESEND_API_KEY,
  };
}

async function sendMembershipEmail({ to, subject, html, text }) {
  const config = getEmailConfig();

  if (!config.apiKey) {
    const keyName = config.provider === 'brevo' ? 'BREVO_API_KEY' : 'RESEND_API_KEY';
    throw new Error(`Email is not configured: ${keyName} is missing.`);
  }

  if (!config.from) {
    throw new Error('Email is not configured: MEMBERSHIP_EMAIL_FROM is missing.');
  }

  if (!to || !subject || (!html && !text)) {
    throw new Error('Recipient, subject and email content are required.');
  }

  let endpoint;
  let headers;
  let payload;

  if (config.provider === 'brevo') {
    endpoint = 'https://api.brevo.com/v3/smtp/email';
    headers = {
      'api-key': config.apiKey,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
    payload = {
      sender: {
        name: process.env.MEMBERSHIP_EMAIL_FROM_NAME || 'RipTides Cocktails & Grill',
        email: config.from,
      },
      to: (Array.isArray(to) ? to : [to]).map((email) => (
        typeof email === 'string' ? { email } : email
      )),
      replyTo: { email: config.replyTo },
      subject,
      ...(html ? { htmlContent: html } : {}),
      ...(text ? { textContent: text } : {}),
    };
  } else {
    endpoint = 'https://api.resend.com/emails';
    headers = {
      Authorization: `Bearer ${config.apiKey}`,
      'Content-Type': 'application/json',
    };
    payload = {
      from: config.from,
      to: Array.isArray(to) ? to : [to],
      reply_to: config.replyTo,
      subject,
      ...(html ? { html } : {}),
      ...(text ? { text } : {}),
    };
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = result.message || result.error || `Email provider returned HTTP ${response.status}.`;
    throw new Error(`Membership email delivery failed (${config.provider}): ${message}`);
  }

  return {
    id: result.messageId || result.id,
    provider: config.provider,
    from: config.from,
    replyTo: config.replyTo,
  };
}

module.exports = {
  DEFAULT_CONTACT_EMAIL,
  getEmailConfig,
  sendMembershipEmail,
};
