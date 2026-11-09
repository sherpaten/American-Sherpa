# RipTides membership email setup

The backend uses the Resend email API. It does not need the mailbox password for
`riptides@americansherpatours.com`.

## Render environment variables

Add these variables to the American-Sherpa backend service:

| Variable | Value |
|---|---|
| `RESEND_API_KEY` | API key created in the RipTides Resend account |
| `MEMBERSHIP_EMAIL_FROM` | A sender identity verified in Resend, e.g. `RipTides Membership <membership@YOUR-VERIFIED-DOMAIN>` |
| `MEMBERSHIP_CONTACT_EMAIL` | `riptides@americansherpatours.com` |

The sender address must belong to a domain verified in Resend. The temporary
owner email is configured as the reply-to/contact address; it does not need to
be used as the sending mailbox and its password must never be added to Render.

## Configure Resend

1. Create or sign in to the RipTides Resend account.
2. Add the business sending domain in Resend.
3. Publish the DNS records Resend provides at the domain's DNS host.
4. Wait for Resend to show the domain as verified.
5. Create an API key with permission to send emails.
6. Add the three environment variables above in Render and save the changes.

Never commit the API key or put it in frontend/Vite environment variables.
Keep it only in the backend Render environment.

## Current implementation boundary

`backend/src/services/membershipEmail.js` is the shared server-side delivery
adapter. It sends through Resend and always uses the configurable contact
address as `reply_to`.

This adapter alone does not schedule reminders or expose customer cancellation.
Those workflows must call this service after their authorization, scheduling,
and audit-record logic is implemented. Do not treat email delivery as active
until the backend has the Resend variables and the sending domain is verified.
