const DEFAULT_CONTACT_EMAIL = 'riptides@americansherpatours.com';

function getEmailConfig() {
  return {
    apiKey: process.env.RESEND_API_KEY,
    from: process.env.MEMBERSHIP_EMAIL_FROM,
    replyTo: process.env.MEMBERSHIP_CONTACT_EMAIL || DEFAULT_CONTACT_EMAIL,
  };
}

async function sendMembershipEmail({ to, subject, html, text }) {
  const config = getEmailConfig();

  if (!config.apiKey) {
    throw new Error('Email is not configured: RESEND_API_KEY is missing.');
  }

  if (!config.from) {
    throw new Error('Email is not configured: MEMBERSHIP_EMAIL_FROM is missing.');
  }

  if (!to || !subject || (!html && !text)) {
    throw new Error('Recipient, subject and email content are required.');
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: config.from,
      to: Array.isArray(to) ? to : [to],
      reply_to: config.replyTo,
      subject,
      ...(html ? { html } : {}),
      ...(text ? { text } : {}),
    }),
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = result.message || result.error || `Email provider returned HTTP ${response.status}.`;
    throw new Error(`Membership email delivery failed: ${message}`);
  }

  return {
    id: result.id,
    from: config.from,
    replyTo: config.replyTo,
  };
}

module.exports = {
  DEFAULT_CONTACT_EMAIL,
  getEmailConfig,
  sendMembershipEmail,
};
