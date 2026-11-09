import { useEffect, useState } from 'react';

const API_BASE = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000').replace(/\/$/, '');

export default function MembershipSignup() {
  const [isOpen, setIsOpen] = useState(false);
  const [plans, setPlans] = useState([]);
  const [selectedPlanId, setSelectedPlanId] = useState('');
  const [plansLoading, setPlansLoading] = useState(true);
  const [form, setForm] = useState({ fullName: '', email: '', phone: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    let active = true;
    async function loadPlans() {
      try {
        const response = await fetch(`${API_BASE}/api/members/plans`);
        const data = await response.json().catch(() => ({}));
        if (!response.ok || !data.success || !Array.isArray(data.plans)) {
          throw new Error(data.message || 'Membership plans are temporarily unavailable.');
        }
        if (active) {
          setPlans(data.plans);
          setSelectedPlanId(data.plans[0]?.id || '');
        }
      } catch (err) {
        if (active) setError(err.message || 'Unable to load membership plans.');
      } finally {
        if (active) setPlansLoading(false);
      }
    }
    loadPlans();
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

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
        throw new Error(data.message || 'Unable to submit your registration.');
      }
      setSuccess(data.member || { membershipId: '' });
      setForm({ fullName: '', email: '', phone: '' });
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => { setError(''); setIsOpen(true); }}
        className="fixed bottom-5 right-5 z-40 inline-flex min-h-14 items-center gap-2 rounded-full bg-[#F4B321] px-6 py-4 text-sm font-black text-[#06283D] shadow-2xl shadow-black/25 transition hover:-translate-y-1 hover:bg-[#FFC94D] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#5ED7E5]"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <span aria-hidden="true" className="text-lg">✦</span>
        Become a Member
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#031522]/80 p-3 backdrop-blur-sm sm:p-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsOpen(false);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="membership-dialog-title"
            className="relative my-auto max-h-[94vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-[#06283D] p-5 text-white shadow-2xl sm:p-8"
          >
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close membership registration"
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-2xl text-white transition hover:bg-white/20"
            >
              ×
            </button>

            <div className="pr-10">
              <span className="inline-flex rounded-full border border-[#5ED7E5]/30 bg-[#0093B2]/20 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#5ED7E5]">
                RipTides Membership
              </span>
              <h2 id="membership-dialog-title" className="mt-4 text-2xl font-black sm:text-3xl">
                Become a RipTides Member
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-white/75">
                Choose a membership and send us your details. Our team will contact you to confirm the plan and payment.
              </p>
            </div>

            {success ? (
              <div className="mt-7 rounded-2xl border border-[#5ED7E5]/30 bg-white/10 p-6 text-center" role="status" aria-live="polite">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#5ED7E5] text-2xl font-black text-[#06283D]">✓</div>
                <h3 className="mt-4 text-2xl font-black">Registration received!</h3>
                <p className="mt-3 text-sm leading-6 text-white/80">
                  Thank you, {success.fullName || 'and welcome to RipTides'}. Our team will contact you about payment. Your membership becomes active only after payment is confirmed.
                </p>
                {success.membershipId && <p className="mt-3 text-sm font-bold text-[#5ED7E5]">Reference: {success.membershipId}</p>}
                {success.accessCode && <div className="mt-4 rounded-xl border border-[#F4B321]/50 bg-[#F4B321]/10 p-4 text-left">
                  <p className="text-xs font-black uppercase tracking-wide text-[#F4B321]">Your 4-digit membership access code</p>
                  <p className="mt-2 break-all text-2xl font-black tracking-[0.16em] text-white">{success.accessCode}</p>
                  <p className="mt-2 text-xs leading-5 text-white/75">Save this 4-digit code now. It is shown only once. Use it with your membership reference to sign in and manage your membership.</p>
                  <button type="button" onClick={() => navigator.clipboard?.writeText(success.accessCode)} className="mt-3 rounded-full border border-white/30 px-4 py-2 text-xs font-bold text-white">Copy access code</button>
                  <a href="/membership-portal" className="ml-3 inline-block text-xs font-bold text-[#5ED7E5] underline">Open member portal</a>
                </div>}
                <button type="button" onClick={() => { setSuccess(null); setIsOpen(false); }} className="mt-6 rounded-full bg-[#F4B321] px-6 py-3 text-sm font-black text-[#06283D] hover:bg-[#FFC94D]">
                  Done
                </button>
              </div>
            ) : (
              <div className="mt-7 grid gap-6 md:grid-cols-[1fr_0.95fr]">
                <div>
                  <h3 className="text-base font-extrabold">Choose your membership</h3>
                  {plansLoading ? (
                    <p className="mt-4 text-sm text-white/70" role="status">Loading membership plans…</p>
                  ) : plans.length ? (
                    <div className="mt-4 grid gap-3">
                      {plans.map((plan) => {
                        const selected = selectedPlanId === plan.id;
                        return (
                          <button
                            key={plan.id}
                            type="button"
                            aria-pressed={selected}
                            onClick={() => setSelectedPlanId(plan.id)}
                            className={`rounded-2xl border p-4 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5ED7E5] ${selected ? 'border-[#5ED7E5] bg-white/15' : 'border-white/15 bg-white/5 hover:border-white/40'}`}
                          >
                            <span className="block font-black">{plan.name}</span>
                            <span className="mt-1 block text-sm leading-5 text-white/70">{plan.description}</span>
                            <span className="mt-3 block text-lg font-black text-[#F4B321]">
                              ${Number(plan.monthlyPrice).toLocaleString('en-US')} <span className="text-xs font-semibold text-white/65">/ month</span>
                            </span>
                            <span className="mt-2 inline-flex rounded-full bg-[#5ED7E5]/15 px-3 py-1 text-xs font-bold text-[#5ED7E5]">
                              {selected ? 'Selected' : 'Select plan'}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="mt-4 text-sm text-white/70">Membership plans are unavailable right now. Please contact RipTides.</p>
                  )}
                  <p className="mt-4 rounded-xl border border-[#F4B321]/30 bg-[#F4B321]/10 p-3 text-xs leading-5 text-white/80">
                    <strong className="text-[#F4B321]">Please note:</strong> Prices are proposed and subject to final approval. This form does not collect payment.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-5 text-[#06283D]">
                  <h3 className="text-lg font-black">Your details</h3>
                  <p className="mt-1 text-xs leading-5 text-slate-600">We’ll contact you to complete your membership.</p>

                  <label className="mt-4 block text-sm font-bold" htmlFor="membership-full-name">Full name</label>
                  <input id="membership-full-name" name="fullName" type="text" autoComplete="name" required maxLength={120} value={form.fullName} onChange={updateField} placeholder="Your full name" className="mt-1.5 min-h-11 w-full rounded-xl border border-slate-300 px-3 py-2 text-base outline-none focus:border-[#0093B2] focus:ring-2 focus:ring-[#0093B2]/20" />

                  <label className="mt-3 block text-sm font-bold" htmlFor="membership-email">Email address</label>
                  <input id="membership-email" name="email" type="email" autoComplete="email" required value={form.email} onChange={updateField} placeholder="you@example.com" className="mt-1.5 min-h-11 w-full rounded-xl border border-slate-300 px-3 py-2 text-base outline-none focus:border-[#0093B2] focus:ring-2 focus:ring-[#0093B2]/20" />

                  <label className="mt-3 block text-sm font-bold" htmlFor="membership-phone">Phone number</label>
                  <input id="membership-phone" name="phone" type="tel" autoComplete="tel" required maxLength={40} value={form.phone} onChange={updateField} placeholder="Your phone number" className="mt-1.5 min-h-11 w-full rounded-xl border border-slate-300 px-3 py-2 text-base outline-none focus:border-[#0093B2] focus:ring-2 focus:ring-[#0093B2]/20" />

                  {error && <p className="mt-3 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-700" role="alert">{error}</p>}

                  <button type="submit" disabled={plansLoading || !plans.length || submitting} className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#F4B321] px-5 py-3 text-sm font-black text-[#06283D] transition hover:bg-[#FFC94D] disabled:cursor-not-allowed disabled:opacity-60">
                    {submitting ? 'Submitting…' : 'Submit Registration'}
                  </button>
                  <p className="mt-3 text-[11px] leading-4 text-slate-500">
                    Your membership is activated only after payment is confirmed. Cancellation requires one month’s advance notice.
                  </p>
                </form>
              </div>
            )}
          </section>
        </div>
      )}
    </>
  );
}
