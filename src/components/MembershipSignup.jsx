import { useEffect, useState } from 'react';

const API_BASE = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000').replace(/\/$/, '');

export default function MembershipSignup() {
  const [plans, setPlans] = useState([]);
  const [selectedPlanId, setSelectedPlanId] = useState('');
  const [plansLoading, setPlansLoading] = useState(true);
  const [form, setForm] = useState({ fullName: '', email: '', phone: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadPlans() {
      try {
        const response = await fetch(`${API_BASE}/api/members/plans`);
        const data = await response.json().catch(() => ({}));

        if (!response.ok || !data.success || !Array.isArray(data.plans)) {
          throw new Error(data.message || 'Membership plans are temporarily unavailable.');
        }

        if (isMounted) {
          setPlans(data.plans);
          setSelectedPlanId(data.plans[0]?.id || '');
        }
      } catch (loadError) {
        if (isMounted) setError(loadError.message || 'Unable to load membership plans.');
      } finally {
        if (isMounted) setPlansLoading(false);
      }
    }

    loadPlans();
    return () => {
      isMounted = false;
    };
  }, []);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setSuccess(null);

    if (!selectedPlanId) {
      setError('Please select a membership plan.');
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(`${API_BASE}/api/members/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          fullName: form.fullName.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          planId: selectedPlanId,
        }),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Unable to submit your membership registration.');
      }

      setSuccess(data.member || { membershipId: '' });
      setForm({ fullName: '', email: '', phone: '' });
    } catch (submitError) {
      setError(submitError.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="membership" className="bg-[#06283D] py-20 text-white sm:py-24">
      <div className="site-container px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-[#5ED7E5]/30 bg-[#0093B2]/20 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#5ED7E5]">
            The RipTides Membership
          </span>
          <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
            Make Every Visit <span className="text-[#5ED7E5]">More Rewarding</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/75">
            Choose the membership that suits you. Submit your details and our team will contact you to confirm the plan and payment.
          </p>
        </div>

        {success ? (
          <div className="mx-auto mt-10 max-w-2xl rounded-3xl border border-[#5ED7E5]/30 bg-white/10 p-7 text-center shadow-xl sm:p-10" role="status" aria-live="polite">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#5ED7E5] text-2xl font-black text-[#06283D]">✓</div>
            <h3 className="mt-5 text-2xl font-black">Registration received</h3>
            <p className="mt-3 text-white/80">
              Thank you, {success.fullName || 'and welcome to RipTides'}. Our team will contact you about payment. Your membership will not become active until payment is confirmed.
            </p>
            {success.membershipId && (
              <p className="mt-4 text-sm font-bold text-[#5ED7E5]">Reference: {success.membershipId}</p>
            )}
            <button
              type="button"
              onClick={() => setSuccess(null)}
              className="mt-7 rounded-full bg-[#F4B321] px-6 py-3 text-sm font-black text-[#06283D] transition hover:bg-[#FFC94D]"
            >
              Register another member
            </button>
          </div>
        ) : (
          <div className="mx-auto mt-10 grid max-w-5xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <h3 className="text-lg font-extrabold">Choose your membership</h3>
              {plansLoading ? (
                <p className="mt-5 text-sm text-white/70" role="status">Loading membership plans…</p>
              ) : plans.length ? (
                <div className="mt-5 grid gap-4">
                  {plans.map((plan) => {
                    const selected = selectedPlanId === plan.id;
                    return (
                      <button
                        key={plan.id}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => setSelectedPlanId(plan.id)}
                        className={`rounded-2xl border p-5 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5ED7E5] ${selected ? 'border-[#5ED7E5] bg-white/15 shadow-lg' : 'border-white/15 bg-white/5 hover:border-white/40'}`}
                      >
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <span className="text-lg font-black">{plan.name}</span>
                            <p className="mt-2 text-sm leading-6 text-white/70">{plan.description}</p>
                          </div>
                          <span className="whitespace-nowrap text-xl font-black text-[#F4B321]">
                            ${Number(plan.monthlyPrice).toLocaleString('en-US')}<span className="text-xs font-semibold text-white/65"> / month</span>
                          </span>
                        </div>
                        <p className="mt-4 text-xs font-bold uppercase tracking-wider text-[#5ED7E5]">
                          {plan.benefitType === 'daily_dish' ? 'One eligible dish per day' : 'Discounted menu pricing'}
                        </p>
                        <span className={`mt-4 inline-flex rounded-full px-3 py-1 text-xs font-bold ${selected ? 'bg-[#5ED7E5] text-[#06283D]' : 'bg-white/10 text-white/70'}`}>
                          {selected ? 'Selected' : 'Select this plan'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <p className="mt-5 text-sm text-white/70">Membership plans are currently unavailable. Please contact RipTides.</p>
              )}
              <p className="mt-5 rounded-xl border border-[#F4B321]/30 bg-[#F4B321]/10 p-4 text-sm leading-6 text-white/80">
                <strong className="text-[#F4B321]">Pricing notice:</strong> These monthly prices are proposed and remain subject to final approval. No payment is collected through this form.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-6 text-[#06283D] shadow-2xl sm:p-8">
              <h3 className="text-xl font-black">Register your interest</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">We’ll use these details to contact you about your membership.</p>

              <label className="mt-6 block text-sm font-bold" htmlFor="membership-full-name">Full name</label>
              <input
                id="membership-full-name"
                name="fullName"
                type="text"
                autoComplete="name"
                required
                maxLength={120}
                value={form.fullName}
                onChange={updateField}
                className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 px-4 py-3 text-base outline-none transition focus:border-[#0093B2] focus:ring-2 focus:ring-[#0093B2]/20"
                placeholder="Your full name"
              />

              <label className="mt-4 block text-sm font-bold" htmlFor="membership-email">Email address</label>
              <input
                id="membership-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={form.email}
                onChange={updateField}
                className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 px-4 py-3 text-base outline-none transition focus:border-[#0093B2] focus:ring-2 focus:ring-[#0093B2]/20"
                placeholder="you@example.com"
              />

              <label className="mt-4 block text-sm font-bold" htmlFor="membership-phone">Phone number</label>
              <input
                id="membership-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                required
                maxLength={40}
                value={form.phone}
                onChange={updateField}
                className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 px-4 py-3 text-base outline-none transition focus:border-[#0093B2] focus:ring-2 focus:ring-[#0093B2]/20"
                placeholder="Your phone number"
              />

              {error && (
                <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-700" role="alert">{error}</p>
              )}

              <button
                type="submit"
                disabled={plansLoading || !plans.length || submitting}
                className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#F4B321] px-6 py-3 text-sm font-black text-[#06283D] transition hover:bg-[#FFC94D] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? 'Submitting…' : 'Submit Membership Registration'}
              </button>
              <p className="mt-4 text-xs leading-5 text-slate-500">
                Memberships are month-to-month. Cancellation requires one month’s advance notice. Membership becomes active only after payment is confirmed. Daily Dish eligibility and service details will be confirmed by our team.
              </p>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
