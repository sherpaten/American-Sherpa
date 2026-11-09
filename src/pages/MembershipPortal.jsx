import { useEffect, useState } from 'react';

const API_BASE = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000').replace(/\/$/, '');
const TOKEN_KEY = 'riptides_member_token';

async function request(path, { token, ...options } = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.success) throw new Error(data.message || 'Request failed.');
  return data;
}

function date(value) {
  if (!value) return 'Not set';
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? 'Not set' : parsed.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
}
function money(amount, currency = 'USD') {
  return new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(Number(amount || 0));
}

export default function MembershipPortal() {
  const [token, setToken] = useState(() => sessionStorage.getItem(TOKEN_KEY) || '');
  const [member, setMember] = useState(null);
  const [membershipId, setMembershipId] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [reason, setReason] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [recoveryStep, setRecoveryStep] = useState('login');
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [recoveryCode, setRecoveryCode] = useState('');
  const [recoveredMembershipId, setRecoveredMembershipId] = useState('');
  const [recoveryError, setRecoveryError] = useState('');
  const [recoveryNotice, setRecoveryNotice] = useState('');

  async function loadMember(currentToken = token) {
    const data = await request('/api/member-portal/me', { token: currentToken });
    setMember(data.member);
  }

  useEffect(() => {
    if (!token) return;
    let active = true;
    request('/api/member-portal/me', { token }).then((data) => {
      if (active) setMember(data.member);
    }).catch(() => {
      if (active) { sessionStorage.removeItem(TOKEN_KEY); setToken(''); setMember(null); }
    });
    return () => { active = false; };
  }, [token]);

  async function signIn(event) {
    event.preventDefault(); setBusy(true); setError('');
    try {
      const data = await request('/api/member-portal/access', {
        method: 'POST',
        body: JSON.stringify({ membershipId, accessCode }),
      });
      sessionStorage.setItem(TOKEN_KEY, data.token);
      setToken(data.token); setMember(data.member); setAccessCode('');
    } catch (err) { setError(err.message); }
    finally { setBusy(false); }
  }

  async function requestMembershipIdRecovery(event) {
    event.preventDefault();
    setBusy(true); setRecoveryError(''); setRecoveryNotice('');
    try {
      const data = await request('/api/member-portal/recover-id/request', {
        method: 'POST',
        body: JSON.stringify({ email: recoveryEmail }),
      });
      setRecoveryNotice(data.message);
      setRecoveryStep('verify');
    } catch (err) { setRecoveryError(err.message); }
    finally { setBusy(false); }
  }

  async function verifyMembershipIdRecovery(event) {
    event.preventDefault();
    setBusy(true); setRecoveryError('');
    try {
      const data = await request('/api/member-portal/recover-id/verify', {
        method: 'POST',
        body: JSON.stringify({ email: recoveryEmail, code: recoveryCode }),
      });
      setRecoveredMembershipId(data.membershipId);
      setMembershipId(data.membershipId);
      setRecoveryNotice(data.message);
      setRecoveryStep('done');
      setRecoveryCode('');
    } catch (err) { setRecoveryError(err.message); }
    finally { setBusy(false); }
  }

  function resetRecovery() {
    setRecoveryStep('login');
    setRecoveryCode('');
    setRecoveredMembershipId('');
    setRecoveryError('');
    setRecoveryNotice('');
  }

  async function cancelMembership() {
    if (!window.confirm('Request cancellation? Your membership benefits remain active until the effective date. No automatic refund is issued.')) return;
    setBusy(true); setError(''); setNotice('');
    try {
      const data = await request('/api/member-portal/cancel', {
        token, method: 'POST', body: JSON.stringify({ reason }),
      });
      setNotice(data.message);
      await loadMember();
    } catch (err) { setError(err.message); }
    finally { setBusy(false); }
  }

  function signOut() {
    sessionStorage.removeItem(TOKEN_KEY); setToken(''); setMember(null); setNotice('You have signed out.');
  }

  return (
    <div className="min-h-[75vh] bg-[#f7f4ec] px-4 py-12 text-[#06283d] sm:px-6">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-3xl bg-[#06283d] p-7 text-white shadow-xl sm:p-10">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#5ed7e5]">RipTides Cocktails &amp; Grill</p>
          <h1 className="mt-3 text-3xl font-black sm:text-4xl">Membership Portal</h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-white/75">View your membership status, payment information and cancellation date.</p>
        </div>
        {!member ? (
          <div className="mt-6 rounded-3xl bg-white p-6 shadow-lg sm:p-8">
            <h2 className="text-xl font-black">Member sign in</h2>
            <p className="mt-2 text-sm text-slate-600">Use the membership reference and 4-digit numeric access code provided when you registered.</p>
            <form onSubmit={signIn}>
            <label className="mt-6 block text-sm font-bold" htmlFor="member-reference">Membership reference</label>
            <input id="member-reference" required value={membershipId} onChange={(e) => setMembershipId(e.target.value.toUpperCase())} placeholder="RT-2026-XXXXXXXX" className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3" />
            <label className="mt-4 block text-sm font-bold" htmlFor="member-code">Private access code</label>
            <input id="member-code" required type="text" inputMode="numeric" pattern="[0-9]{4}" minLength={4} maxLength={4} autoComplete="one-time-code" value={accessCode} onChange={(e) => setAccessCode(e.target.value.replace(/\D/g, "").slice(0, 4))} placeholder="4-digit code" className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 tracking-widest" />
            {error && <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700" role="alert">{error}</p>}
            <button disabled={busy} className="mt-6 w-full rounded-full bg-[#f4b321] px-6 py-3 font-black text-[#06283d] disabled:opacity-60">{busy ? 'Signing in…' : 'Access my membership'}</button>
            </form>
            <p className="mt-4 text-xs leading-5 text-slate-500">If you have an older membership without an access code, please contact the RipTides team to have one issued securely.</p>
            {recoveryStep === 'login' && <button type="button" onClick={() => { setRecoveryStep('request'); setRecoveryError(''); setRecoveryNotice(''); }} className="mt-4 text-sm font-bold text-[#007d91] underline">Forgot Membership ID?</button>}
            {recoveryStep === 'request' && (
              <form onSubmit={requestMembershipIdRecovery} className="mt-6 border-t border-slate-100 pt-5">
                <h3 className="font-black">Recover your Membership ID</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">Enter the email address registered to your membership. We'll send a one-time verification code if it matches a member record.</p>
                <label className="mt-4 block text-sm font-bold" htmlFor="recovery-email">Registered email address</label>
                <input id="recovery-email" type="email" required maxLength={254} autoComplete="email" value={recoveryEmail} onChange={(e) => setRecoveryEmail(e.target.value)} placeholder="you@example.com" className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3" />
                {recoveryError && <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700" role="alert">{recoveryError}</p>}
                <button disabled={busy} className="mt-4 w-full rounded-full bg-[#06283d] px-6 py-3 font-black text-white disabled:opacity-60">{busy ? 'Sending…' : 'Send verification code'}</button>
                <button type="button" onClick={resetRecovery} className="mt-3 text-sm font-bold text-slate-500 underline">Back to sign in</button>
              </form>
            )}
            {recoveryStep === 'verify' && (
              <form onSubmit={verifyMembershipIdRecovery} className="mt-6 border-t border-slate-100 pt-5">
                <h3 className="font-black">Verify your email</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{recoveryNotice} Check your inbox for a 6-digit code. It expires in 10 minutes.</p>
                <label className="mt-4 block text-sm font-bold" htmlFor="recovery-code">Email verification code</label>
                <input id="recovery-code" required type="text" inputMode="numeric" pattern="[0-9]{6}" minLength={6} maxLength={6} autoComplete="one-time-code" value={recoveryCode} onChange={(e) => setRecoveryCode(e.target.value.replace(/\D/g, '').slice(0, 6))} placeholder="6-digit code" className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 tracking-widest" />
                {recoveryError && <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700" role="alert">{recoveryError}</p>}
                <button disabled={busy} className="mt-4 w-full rounded-full bg-[#f4b321] px-6 py-3 font-black text-[#06283d] disabled:opacity-60">{busy ? 'Verifying…' : 'Verify and show Membership ID'}</button>
                <button type="button" onClick={() => { setRecoveryStep('request'); setRecoveryCode(''); setRecoveryError(''); setRecoveryNotice(''); }} className="mt-3 text-sm font-bold text-slate-500 underline">Use a different email / request a new code</button>
              </form>
            )}
            {recoveryStep === 'done' && (
              <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5" role="status">
                <h3 className="font-black text-emerald-900">Email verified</h3>
                <p className="mt-2 text-sm text-emerald-800">{recoveryNotice}</p>
                <p className="mt-3 text-xs font-bold uppercase tracking-wider text-emerald-800">Your existing Membership ID</p>
                <p className="mt-1 break-all text-xl font-black text-[#06283d]">{recoveredMembershipId}</p>
                <p className="mt-2 text-sm text-emerald-800">Your 4-digit access code has not changed. Use it with this Membership ID to sign in.</p>
                <button type="button" onClick={resetRecovery} className="mt-4 rounded-full bg-[#06283d] px-5 py-2.5 text-sm font-black text-white">Return to sign in</button>
              </div>
            )}
          </div>
        ) : (
          <div className="mt-6 space-y-5">
            <section className="rounded-3xl bg-white p-6 shadow-lg sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div><p className="text-xs font-black uppercase tracking-widest text-[#008fa8]">Member record</p><h2 className="mt-2 text-2xl font-black">{member.fullName}</h2><p className="mt-1 text-sm text-slate-500">{member.membershipId}</p></div>
                <span className="rounded-full bg-[#e6f7f8] px-4 py-2 text-xs font-black uppercase text-[#007d91]">{String(member.subscription?.status || member.status).replaceAll('_', ' ')}</span>
              </div>
              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-4"><span className="text-xs text-slate-500">Membership plan</span><strong className="mt-1 block">{member.plan?.name || '—'}</strong></div>
                <div className="rounded-2xl bg-slate-50 p-4"><span className="text-xs text-slate-500">Monthly price</span><strong className="mt-1 block">{money(member.plan?.monthlyPrice, member.plan?.currency)}</strong></div>
                <div className="rounded-2xl bg-slate-50 p-4"><span className="text-xs text-slate-500">Payment status</span><strong className="mt-1 block capitalize">{String(member.paymentStatus || 'pending').replaceAll('_', ' ')}</strong></div>
                <div className="rounded-2xl bg-slate-50 p-4"><span className="text-xs text-slate-500">Current period ends</span><strong className="mt-1 block">{date(member.subscription?.currentPeriodEnd)}</strong></div>
              </div>
              {member.subscription?.status === 'cancellation_scheduled' && <div className="mt-5 rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-900">Cancellation scheduled for <strong>{date(member.subscription?.cancellationEffectiveAt)}</strong>. Your membership benefits remain available until that date. Future payment reminders are suppressed.</div>}
              {member.subscription?.status === 'active' && <div className="mt-6 border-t border-slate-100 pt-6">
                <h3 className="font-black">Cancel membership</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">You can request cancellation at any time. At least one month's notice is required. Your benefits remain active until the effective date. No automatic refund is issued.</p>
                <label className="mt-4 block text-sm font-bold" htmlFor="cancel-reason">Reason (optional)</label>
                <textarea id="cancel-reason" rows={3} maxLength={500} value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Tell us why you are cancelling (optional)" className="mt-2 w-full rounded-xl border border-slate-300 p-3" />
                <button onClick={cancelMembership} disabled={busy} className="mt-4 rounded-full bg-red-700 px-6 py-3 text-sm font-black text-white disabled:opacity-60">{busy ? 'Submitting…' : 'Request cancellation'}</button>
              </div>}
              {error && <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700" role="alert">{error}</p>}
              {notice && <p className="mt-4 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-800" role="status">{notice}</p>}
              <button onClick={signOut} className="mt-6 text-sm font-bold text-slate-500 underline">Sign out</button>
            </section>
            <section className="rounded-3xl bg-white p-6 shadow-lg sm:p-8">
              <h3 className="text-lg font-black">Payment history</h3>
              {member.payments?.length ? <div className="mt-4 divide-y divide-slate-100">{member.payments.map((payment, index) => <div key={index} className="flex flex-wrap justify-between gap-2 py-3 text-sm"><div><strong>{money(payment.amount, payment.currency)}</strong><p className="mt-1 text-xs text-slate-500">{payment.method} · {payment.purpose} · {date(payment.recordedAt)}</p></div><span className="font-bold capitalize">{String(payment.status).replaceAll('_', ' ')}</span></div>)}</div> : <p className="mt-3 text-sm text-slate-500">No payments recorded yet.</p>}
          </section>
          </div>
        )}
      </div>
    </div>
  );
}
