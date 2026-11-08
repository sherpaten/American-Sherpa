import { useCallback, useEffect, useMemo, useState } from 'react';
import '../styles/admin.css';

const API_BASE = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000').replace(/\/$/, '');
const TOKEN_KEY = 'riptides_admin_token';

async function apiRequest(path, { token, ...options } = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok || data.success === false) {
    if (response.status === 401) {
      sessionStorage.removeItem(TOKEN_KEY);
    }
    throw new Error(data.message || 'Something went wrong. Please try again.');
  }
  return data;
}

function Icon({ name, size = 18 }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };
  const paths = {
    wave: <><path d="M2 12c2.5-4 5-4 7.5 0s5 4 7.5 0 5-4 7 0" /><path d="M2 18c2.5-4 5-4 7.5 0s5 4 7.5 0 5-4 7 0" /></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="10" cy="7" r="4" /><path d="M20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    logout: <><path d="M10 17l5-5-5-5M15 12H3" /><path d="M12 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6" /></>,
    refresh: <><path d="M20 7v5h-5" /><path d="M4 17v-5h5" /><path d="M5.6 9a7 7 0 0 1 11.6-2L20 12M4 12l2.8 5a7 7 0 0 0 11.6-2" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    close: <path d="m18 6-12 12M6 6l12 12" />,
    plus: <path d="M12 5v14M5 12h14" />,
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-4" /></>,
  };
  return <svg {...common}>{paths[name] || null}</svg>;
}

function StatusPill({ value }) {
  const label = String(value || 'unknown').replaceAll('_', ' ');
  return <span className={`admin-status status-${String(value || '').toLowerCase()}`}>{label}</span>;
}

function formatDate(value) {
  if (!value) return '—';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '—' : date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

function money(amount, currency = 'USD') {
  return new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(Number(amount || 0));
}

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      await onLogin(email, password);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="admin-login-shell">
      <div className="admin-login-card">
        <div className="admin-brand-mark"><Icon name="wave" size={28} /></div>
        <p className="admin-eyebrow">RIPTIDES COCKTAILS & GRILL</p>
        <h1>Welcome back</h1>
        <p className="admin-muted">Sign in to your secure membership workspace.</p>
        <form onSubmit={submit} className="admin-form">
          <label htmlFor="admin-email">Email address</label>
          <input id="admin-email" type="email" autoComplete="username" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@riptides.com" />
          <label htmlFor="admin-password">Password</label>
          <input id="admin-password" type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" />
          {error && <p className="admin-alert" role="alert">{error}</p>}
          <button className="admin-primary-button" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'} <Icon name="arrow" /></button>
        </form>
        <p className="admin-login-foot"><Icon name="shield" size={15} /> Protected staff and administrator access</p>
      </div>
    </main>
  );
}

function MemberDetails({ member, token, user, onClose, onChanged }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const isAdmin = user.role === 'admin';
  const payments = member.payments || [];

  async function perform(path, body, successMessage) {
    setBusy(true);
    setError('');
    setNotice('');
    try {
      await apiRequest(path, { token, method: 'POST', body: JSON.stringify(body || {}) });
      setNotice(successMessage);
      await onChanged();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  const canAcceptPayment = !['cancelled', 'cancellation_scheduled'].includes(member.subscription?.status);
  return (
    <div className="admin-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="admin-member-modal" role="dialog" aria-modal="true" aria-labelledby="member-dialog-title">
        <div className="admin-modal-head">
          <div><p className="admin-eyebrow">MEMBER RECORD</p><h2 id="member-dialog-title">{member.fullName}</h2><span className="admin-muted">{member.membershipId}</span></div>
          <button className="admin-icon-button" onClick={onClose} aria-label="Close member details"><Icon name="close" /></button>
        </div>
        {error && <p className="admin-alert">{error}</p>}
        {notice && <p className="admin-success">{notice}</p>}
        <div className="admin-detail-grid">
          <div><span>Email</span><strong>{member.email}</strong></div>
          <div><span>Phone</span><strong>{member.phone || '—'}</strong></div>
          <div><span>Plan</span><strong>{member.plan?.name || '—'}</strong></div>
          <div><span>Monthly price</span><strong>{money(member.plan?.monthlyPrice, member.plan?.currency)}</strong></div>
          <div><span>Member status</span><StatusPill value={member.status} /></div>
          <div><span>Payment status</span><StatusPill value={member.paymentStatus} /></div>
          <div><span>Joined</span><strong>{formatDate(member.createdAt)}</strong></div>
          <div><span>Membership ends</span><strong>{formatDate(member.subscription?.currentPeriodEnd || member.expiryDate)}</strong></div>
        </div>
        <div className="admin-section-title"><div><h3>Payment history</h3><p className="admin-muted">Record and confirm payments before activation or renewal.</p></div></div>
        {payments.length ? (
          <div className="admin-payment-list">
            {payments.map((payment) => (
              <div className="admin-payment-row" key={payment._id}>
                <div><strong>{money(payment.amount, payment.currency)}</strong><span>{payment.method} · {payment.purpose} · {formatDate(payment.recordedAt)}</span></div>
                <div className="admin-payment-actions"><StatusPill value={payment.status} />
                  {isAdmin && payment.status === 'pending_confirmation' && <button className="admin-small-button" disabled={busy} onClick={() => perform(`/api/members/${member._id}/payments/${payment._id}/confirm`, {}, 'Payment confirmed.')}>Confirm</button>}
                  {isAdmin && payment.status === 'confirmed' && !payment.appliedAt && member.subscription?.status !== 'active' && <button className="admin-small-button" disabled={busy} onClick={() => perform(`/api/members/${member._id}/activate`, { paymentId: payment._id }, 'Membership activated.')}>Activate</button>}
                  {isAdmin && payment.status === 'confirmed' && !payment.appliedAt && member.subscription?.status === 'active' && !member.subscription?.cancellationRequestedAt && <button className="admin-small-button" disabled={busy} onClick={() => perform(`/api/members/${member._id}/renew`, { paymentId: payment._id }, 'Membership renewed.')}>Apply renewal</button>}
                </div>
              </div>
            ))}
          </div>
        ) : <p className="admin-empty-inline">No payments have been recorded yet.</p>}
        <div className="admin-modal-actions">
          {canAcceptPayment && <button className="admin-secondary-button" disabled={busy} onClick={() => perform(`/api/members/${member._id}/payments`, { method: 'cash' }, 'Cash payment recorded and awaiting Admin confirmation.')}>Record cash payment</button>}
          {isAdmin && canAcceptPayment && <button className="admin-secondary-button" disabled={busy} onClick={() => perform(`/api/members/${member._id}/payments`, { method: 'online' }, 'Online payment recorded and awaiting Admin confirmation.')}>Record online payment</button>}
          {isAdmin && member.subscription?.status === 'active' && !member.subscription?.cancellationRequestedAt && <button className="admin-danger-button" disabled={busy} onClick={() => { if (window.confirm('Schedule cancellation for this membership?')) perform(`/api/members/${member._id}/cancel`, {}, 'Cancellation has been scheduled.'); }}>Schedule cancellation</button>}
        </div>
        {busy && <p className="admin-muted admin-busy-note">Saving changes…</p>}
        <p className="admin-permission-note">{isAdmin ? 'Administrator access: payment confirmation, activation, renewal and cancellation.' : 'Staff access: view member records and record cash payments. An administrator must confirm payments.'}</p>
      </section>
    </div>
  );
}

function StaffDialog({ token, onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    setError('');
    setSuccess('');
    try {
      await apiRequest('/api/auth/staff', { token, method: 'POST', body: JSON.stringify({ name, email, password }) });
      setSuccess('Staff account created successfully.');
      setName(''); setEmail(''); setPassword('');
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="admin-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="admin-staff-modal" role="dialog" aria-modal="true" aria-labelledby="staff-dialog-title">
        <div className="admin-modal-head"><div><p className="admin-eyebrow">TEAM ACCESS</p><h2 id="staff-dialog-title">Add a staff account</h2></div><button className="admin-icon-button" onClick={onClose} aria-label="Close"><Icon name="close" /></button></div>
        <form className="admin-form" onSubmit={submit}>
          <label htmlFor="staff-name">Full name</label><input id="staff-name" required maxLength={100} value={name} onChange={(event) => setName(event.target.value)} />
          <label htmlFor="staff-email">Email address</label><input id="staff-email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} />
          <label htmlFor="staff-password">Temporary password</label><input id="staff-password" type="password" required minLength={12} autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} />
          <p className="admin-muted">Use at least 12 characters. Share the temporary password securely.</p>
          {error && <p className="admin-alert">{error}</p>}{success && <p className="admin-success">{success}</p>}
          <button className="admin-primary-button" disabled={busy}>{busy ? 'Creating…' : 'Create staff account'} <Icon name="arrow" /></button>
        </form>
      </section>
    </div>
  );
}

function Dashboard({ token, user, onLogout }) {
  const [members, setMembers] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [selectedMember, setSelectedMember] = useState(null);
  const [showStaff, setShowStaff] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const loadMembers = useCallback(async (page = 1, quiet = false) => {
    if (quiet) setRefreshing(true); else setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams({ page: String(page), limit: '100' });
      if (search) params.set('search', search);
      if (status) params.set('status', status);
      const data = await apiRequest(`/api/members?${params.toString()}`, { token });
      setMembers(data.members || []);
      setPagination(data.pagination || { page: 1, pages: 1, total: 0 });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [token, search, status]);

  useEffect(() => { loadMembers(1); }, [loadMembers]);

  const summary = useMemo(() => ({
    active: members.filter((item) => item.status === 'active').length,
    pending: members.filter((item) => item.status === 'pending').length,
    expired: members.filter((item) => item.status === 'expired').length,
    cancelled: members.filter((item) => item.status === 'cancelled').length,
  }), [members]);

  async function openMember(item) {
    setError('');
    try {
      const data = await apiRequest(`/api/members/${item._id}`, { token });
      setSelectedMember(data.member);
    } catch (err) { setError(err.message); }
  }

  async function refreshSelected() {
    await loadMembers(pagination.page, true);
    if (selectedMember?._id) {
      const data = await apiRequest(`/api/members/${selectedMember._id}`, { token });
      setSelectedMember(data.member);
    }
  }

  function applySearch(event) {
    event.preventDefault();
    setSearch(searchInput.trim());
  }

  return (
    <div className="admin-app">
      <aside className="admin-sidebar">
        <a className="admin-sidebar-brand" href="/admin"><span className="admin-brand-mark"><Icon name="wave" size={25} /></span><span>RIPTIDES<small>MEMBERSHIP ADMIN</small></span></a>
        <div className="admin-side-label">WORKSPACE</div>
        <div className="admin-side-link active"><Icon name="users" /> Memberships</div>
        <div className="admin-sidebar-bottom"><div className="admin-user-avatar">{(user.name || 'R').slice(0, 1).toUpperCase()}</div><div className="admin-user-meta"><strong>{user.name}</strong><span>{user.role}</span></div><button className="admin-icon-button admin-logout" onClick={onLogout} title="Sign out" aria-label="Sign out"><Icon name="logout" /></button></div>
      </aside>
      <main className="admin-main">
        <header className="admin-topbar"><div><span className="admin-breadcrumb">Workspace /</span><strong>Memberships</strong></div><div className="admin-top-actions"><span className="admin-role-tag"><Icon name="shield" size={14} /> {user.role}</span><button className="admin-secondary-button admin-refresh" onClick={() => loadMembers(pagination.page, true)} disabled={refreshing}><Icon name="refresh" size={16} /> {refreshing ? 'Refreshing' : 'Refresh'}</button></div></header>
        <div className="admin-content">
          <div className="admin-page-heading"><div><p className="admin-eyebrow">OVERVIEW</p><h1>Memberships</h1><p className="admin-muted">Manage member records, payments and access status.</p></div>{user.role === 'admin' && <button className="admin-primary-button admin-add-staff" onClick={() => setShowStaff(true)}><Icon name="plus" /> Add staff</button>}</div>
          <div className="admin-stats-grid">
            <article className="admin-stat-card"><span>Total members</span><strong>{pagination.total}</strong><small>All matching records</small></article>
            <article className="admin-stat-card"><span>Active on this page</span><strong>{summary.active}</strong><small>Current page</small></article>
            <article className="admin-stat-card"><span>Pending on this page</span><strong>{summary.pending}</strong><small>Awaiting payment or review</small></article>
            <article className="admin-stat-card"><span>Expired / cancelled</span><strong>{summary.expired + summary.cancelled}</strong><small>Current page</small></article>
          </div>
          <section className="admin-table-card">
            <div className="admin-table-heading"><div><h2>Member directory</h2><p className="admin-muted">{pagination.total} records found</p></div><form className="admin-search-form" onSubmit={applySearch}><div className="admin-search-box"><Icon name="search" size={17} /><input aria-label="Search members" placeholder="Search name, email or ID" value={searchInput} onChange={(event) => setSearchInput(event.target.value)} /></div><select aria-label="Filter by status" value={status} onChange={(event) => setStatus(event.target.value)}><option value="">All statuses</option><option value="active">Active</option><option value="pending">Pending</option><option value="expired">Expired</option><option value="cancelled">Cancelled</option><option value="suspended">Suspended</option></select><button className="admin-secondary-button" type="submit">Search</button></form></div>
            {error && <p className="admin-alert admin-table-alert">{error}</p>}
            {loading ? <div className="admin-loading">Loading member records…</div> : members.length ? (
              <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Member</th><th>Membership ID</th><th>Plan</th><th>Status</th><th>Payment</th><th>Joined</th><th /></tr></thead><tbody>
                {members.map((member) => <tr key={member._id}><td><strong>{member.fullName}</strong><span>{member.email}</span></td><td className="admin-id-cell">{member.membershipId}</td><td>{member.plan?.name || '—'}</td><td><StatusPill value={member.status} /></td><td><StatusPill value={member.paymentStatus} /></td><td>{formatDate(member.createdAt)}</td><td><button className="admin-view-button" onClick={() => openMember(member)}>View <Icon name="arrow" size={15} /></button></td></tr>)}
              </tbody></table></div>
            ) : <div className="admin-empty"><Icon name="users" size={30} /><strong>No members found</strong><span>Try changing your search or status filter.</span></div>}
            <div className="admin-pagination"><span>Page {pagination.page || 1} of {Math.max(pagination.pages || 1, 1)}</span><div><button className="admin-secondary-button" disabled={loading || pagination.page <= 1} onClick={() => loadMembers(pagination.page - 1)}>Previous</button><button className="admin-secondary-button" disabled={loading || pagination.page >= pagination.pages} onClick={() => loadMembers(pagination.page + 1)}>Next</button></div></div>
          </section>
          <p className="admin-footer-note"><Icon name="shield" size={14} /> Member data is protected by role-based API access. Payment actions are recorded against the signed-in account.</p>
        </div>
      </main>
      {selectedMember && <MemberDetails member={selectedMember} token={token} user={user} onClose={() => setSelectedMember(null)} onChanged={refreshSelected} />}
      {showStaff && <StaffDialog token={token} onClose={() => setShowStaff(false)} />}
    </div>
  );
}

export default function Admin() {
  const [token, setToken] = useState(() => sessionStorage.getItem(TOKEN_KEY) || '');
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(Boolean(token));

  useEffect(() => {
    let cancelled = false;
    if (!token) { setChecking(false); return undefined; }
    apiRequest('/api/auth/me', { token })
      .then((data) => { if (!cancelled) setUser(data.user); })
      .catch(() => { if (!cancelled) { sessionStorage.removeItem(TOKEN_KEY); setToken(''); setUser(null); } })
      .finally(() => { if (!cancelled) setChecking(false); });
    return () => { cancelled = true; };
  }, [token]);

  async function login(email, password) {
    const data = await apiRequest('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
    sessionStorage.setItem(TOKEN_KEY, data.token);
    setToken(data.token);
    setUser(data.user);
  }

  function logout() {
    sessionStorage.removeItem(TOKEN_KEY);
    setToken('');
    setUser(null);
  }

  if (checking) return <div className="admin-login-shell"><p className="admin-muted">Verifying your secure session…</p></div>;
  if (!token || !user) return <Login onLogin={login} />;
  return <Dashboard token={token} user={user} onLogout={logout} />;
}
