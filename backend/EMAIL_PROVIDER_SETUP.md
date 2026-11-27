# Membership email provider setup

The membership backend supports Resend and Brevo through the same `sendMembershipEmail` service. The default remains Resend so deploying this change does not silently switch the live sender.

## Brevo

Add these environment variables to the backend service (Render):

- `MEMBERSHIP_EMAIL_PROVIDER=brevo`
- `BREVO_API_KEY` — create a transactional API key in Brevo; never commit it or share it in chat.
- `MEMBERSHIP_EMAIL_FROM` — a sender address registered and verified in Brevo.
- `MEMBERSHIP_EMAIL_FROM_NAME=RipTides Cocktails & Grill` (optional)
- `MEMBERSHIP_CONTACT_EMAIL=riptides@americansherpatours.com` (optional reply-to)

In Brevo, add the sender under Settings → Senders, Domains, IPs → Senders and complete the verification code sent to that mailbox. Enable transactional email in the Brevo account if prompted.

**Important deliverability limitation:** verifying the sender mailbox is not the same as authenticating the sending domain. Brevo's guidance says Gmail, Yahoo, and Microsoft require domain authentication; without it, Brevo may rewrite the From address or messages may be rejected or sent to spam. Therefore, do not enable customer-facing Membership ID recovery until real delivery and sender identity have been checked in both Gmail and Outlook. A successful API response alone is not proof of inbox delivery.

## Resend fallback

To switch back without code changes, set:

- `MEMBERSHIP_EMAIL_PROVIDER=resend`
- `RESEND_API_KEY`
- `MEMBERSHIP_EMAIL_FROM` to a sender accepted by Resend

The provider is selected explicitly. There is no silent cross-provider fallback, which avoids sending member recovery codes from an unexpected sender.

## Safe rollout checklist

1. Configure the Brevo sender and API key in Render environment variables; do not put secrets in GitHub.
2. Deploy this branch to a staging environment first, if available.
3. Send real test messages to controlled Gmail and Outlook inboxes and inspect the actual From address, spam placement, and Brevo transactional logs.
4. Only after both inbox tests pass, enable the recovery feature for members.
5. Keep the Resend key and configuration until Brevo has passed production verification.
