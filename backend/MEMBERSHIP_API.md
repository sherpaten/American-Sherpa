# RipTides Membership API

All routes are mounted under `/api/members`. Admin and Staff endpoints require:

`Authorization: Bearer <access-token>`

## Plans and registration

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| GET | `/plans` | Public | Return the two proposed monthly plans |
| POST | `/register` | Public | Register a member in pending-payment state |

Registration body:

```json
{
  "fullName": "Example Member",
  "email": "member@example.com",
  "phone": "555-0100",
  "planId": "discount_monthly"
}
```

Supported plan IDs:

- `discount_monthly` — proposed USD 20 per month.
- `daily_dish_monthly` — proposed USD 500 per month.

Both prices are marked tentative until the restaurant confirms them. The discount percentage, eligible menu items, and daily-dish service rules are intentionally unset.

## Admin and Staff operations

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| GET | `/` | Admin, Staff | Search and paginate members |
| GET | `/verify/:membershipId` | Admin, Staff | Verify a membership for service |
| GET | `/:memberId` | Admin, Staff | View member details and payment history |
| POST | `/:memberId/payments` | Admin, Staff | Record a payment; Staff can record cash only |
| POST | `/:memberId/payments/:paymentId/confirm` | Admin | Confirm that funds were actually received |
| POST | `/:memberId/activate` | Admin | Activate a pending or expired membership using a confirmed payment |
| POST | `/:memberId/renew` | Admin | Extend an active membership by one calendar month using a confirmed payment |
| POST | `/:memberId/cancel` | Admin | Record a cancellation request with at least one calendar month of notice |

Payment recording body:

```json
{
  "method": "cash"
}
```

Activation and renewal body:

```json
{
  "paymentId": "the-payment-id-returned-by-payment-recording"
}
```

Staff can record cash payments but cannot confirm payments, activate memberships, renew memberships, or cancel memberships. An Admin must confirm a payment before applying it to an activation or renewal.

## Subscription and payment behavior

- New registrations start as `pending_payment`; they are not active.
- A payment is first recorded as `pending_confirmation`.
- Only an Admin can mark a payment as `confirmed`.
- Only an Admin can apply a confirmed, unused payment to activate or renew a membership.
- Billing periods use calendar months, including month-end date clamping.
- Expired and completed cancellation states are synchronized when the Admin/Staff member list or verification endpoint is requested.

## Not yet enabled

- Automatic card charging/recurring billing is disabled until a payment provider and merchant account are selected and integrated.
- Cash-payment reminders are not yet scheduled.
- The $20 discount percentage and eligible menu items need restaurant confirmation.
- The $500 plan's eligible dishes, dine-in/takeout rules, and exclusions need restaurant confirmation.
- Toast POS automatic discount application is subject to Toast approval and technical confirmation.
- Customer self-service cancellation and a customer membership portal are not yet implemented.
