const { getDatabase } = require('../config/database');
const { sendMembershipEmail } = require('./membershipEmail');

let running = false;

async function sendUpcomingPaymentReminders() {
  if (running) return;
  running = true;
  try {
    const now = new Date();
    const windowStart = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    const windowEnd = new Date(windowStart.getTime() + 6 * 60 * 60 * 1000);
    const members = getDatabase().collection('members');
    const dueMembers = await members.find({
      'subscription.status': 'active',
      'subscription.reminderSuppressedAt': null,
      'subscription.nextBillingDate': { $gte: windowStart, $lt: windowEnd },
    }).toArray();

    for (const member of dueMembers) {
      const dueDate = new Date(member.subscription.nextBillingDate);
      const reminderKey = dueDate.toISOString().slice(0, 10);
      if (member.subscription.lastPaymentReminderFor === reminderKey) continue;

      await sendMembershipEmail({
        to: member.email,
        subject: 'Your RipTides membership payment is due in one week',
        text: `Hello ${member.fullName},\n\nThis is a reminder that your next monthly RipTides membership payment of ${member.plan.currency || 'USD'} ${member.plan.monthlyPrice} is due on ${dueDate.toLocaleDateString()}. Please contact ${process.env.MEMBERSHIP_CONTACT_EMAIL || 'riptides@americansherpatours.com'} to arrange payment. This is a reminder only; no automatic payment will be charged.\n\nIf you have already paid, please disregard this message.\n\nRipTides Cocktails & Grill`,
      });

      await members.updateOne(
        { _id: member._id, 'subscription.status': 'active', 'subscription.lastPaymentReminderFor': { $ne: reminderKey } },
        { $set: { 'subscription.lastPaymentReminderFor': reminderKey, 'subscription.lastPaymentReminderSentAt': new Date() } }
      );
      console.info('Membership payment reminder sent:', member.membershipId, reminderKey);
    }
  } catch (error) {
    if (/RESEND_API_KEY|MEMBERSHIP_EMAIL_FROM|not configured/i.test(error.message)) {
      console.info('Membership payment reminders are waiting for email provider configuration.');
    } else {
      console.error('Membership reminder job failed:', error);
    }
  } finally {
    running = false;
  }
}

function startMembershipReminderScheduler() {
  // Run shortly after startup, then every six hours. A stored date key prevents duplicate reminders.
  setTimeout(sendUpcomingPaymentReminders, 30 * 1000);
  setInterval(sendUpcomingPaymentReminders, 6 * 60 * 60 * 1000);
}

module.exports = { sendUpcomingPaymentReminders, startMembershipReminderScheduler };
