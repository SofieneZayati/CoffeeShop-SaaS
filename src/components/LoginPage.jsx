import { useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  ChefHat,
  Coffee,
  Eye,
  EyeOff,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  Store,
  UserRound,
  UsersRound,
} from "lucide-react";
import { DEMO_ACCOUNTS } from "../data/auth";
import { BrandMark } from "./ui";

const roleIcons = {
  owner: ShieldCheck,
  manager: UsersRound,
  barista: ChefHat,
  floor: Store,
  customer: UserRound,
};

export default function LoginPage({ onLogin }) {
  const [selectedId, setSelectedId] = useState("owner");
  const selected = useMemo(() => DEMO_ACCOUNTS.find((account) => account.id === selectedId) || DEMO_ACCOUNTS[0], [selectedId]);
  const [email, setEmail] = useState(DEMO_ACCOUNTS[0].email);
  const [password, setPassword] = useState(DEMO_ACCOUNTS[0].password);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function chooseAccount(account) {
    setSelectedId(account.id);
    setEmail(account.email);
    setPassword(account.password);
    setError("");
  }

  function submit(event) {
    event.preventDefault();
    setLoading(true);
    window.setTimeout(() => {
      const success = onLogin(email, password);
      if (!success) setError("That email and password do not match a demo account.");
      setLoading(false);
    }, 320);
  }

  const SelectedIcon = roleIcons[selected.role];

  return (
    <main className="login-page">
      <a className="skip-link" href="#login-form">Skip to sign in</a>
      <section className="login-story">
        <div className="login-brand"><BrandMark /><span>One café. Every moment in sync.</span></div>
        <div className="login-story-copy">
          <span className="login-kicker"><Sparkles size={14} /> GREEN COFFEE OS</span>
          <h1>The calm behind<br />a <em>busy café.</em></h1>
          <p>Orders, tables, regulars, and every little detail—shaped around the people doing the work.</p>
          <div className="login-proof"><span><Check size={14} />Role-focused workspaces</span><span><Check size={14} />Live service overview</span><span><Check size={14} />Customer ordering & rewards</span></div>
        </div>
        <div className="login-photo-stack" aria-hidden="true">
          <figure className="login-photo main"><img src="/menu/pistachio-cloud.webp" alt="" /></figure>
          <figure className="login-photo second"><img src="/menu/tiramisu-jar.webp" alt="" /></figure>
          <figure className="login-photo third"><img src="/menu/iced-caramel-latte.webp" alt="" /></figure>
          <span className="login-photo-note"><Coffee size={15} /><b>6</b> original menu photos</span>
        </div>
        <footer><span>Green Coffee Games • La Marsa</span><span>Demo workspace • 2026</span></footer>
      </section>

      <section className="login-panel" id="login-form">
        <div className="login-form-wrap">
          <div className="login-mobile-brand"><BrandMark /><small>Shop operating system</small></div>
          <header>
            <span className={`selected-role-icon ${selected.color}`}><SelectedIcon size={22} /></span>
            <div><span>Welcome to your workspace</span><h2>Sign in as {selected.roleLabel.toLowerCase()}.</h2><p>Choose a demo actor or enter one of the account credentials.</p></div>
          </header>

          <div className="account-chooser" aria-label="Choose a demo account">
            {DEMO_ACCOUNTS.map((account) => {
              const Icon = roleIcons[account.role];
              return (
                <button
                  key={account.id}
                  type="button"
                  className={selectedId === account.id ? "active" : ""}
                  aria-pressed={selectedId === account.id}
                  onClick={() => chooseAccount(account)}
                >
                  <span className={`account-role-icon ${account.color}`}><Icon size={17} /></span>
                  <span><strong>{account.firstName}</strong><small>{account.roleLabel}</small></span>
                  {selectedId === account.id && <Check size={15} />}
                </button>
              );
            })}
          </div>

          <div className="selected-account-note">
            <span className={`account-role-icon ${selected.color}`}><SelectedIcon size={17} /></span>
            <span><strong>{selected.name}</strong><small>{selected.description}</small></span>
          </div>

          <form onSubmit={submit} noValidate>
            <label><span>Email address</span><div className="login-input"><UserRound size={17} /><input type="email" autoComplete="username" required value={email} onChange={(event) => setEmail(event.target.value)} /></div></label>
            <label><span>Password</span><div className="login-input"><LockKeyhole size={17} /><input type={showPassword ? "text" : "password"} autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} /><button type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></div></label>
            {error && <div className="login-error" role="alert">{error}</div>}
            <button className="login-submit" type="submit" disabled={loading}><span>{loading ? "Opening workspace…" : `Continue as ${selected.firstName}`}</span><ArrowRight size={18} /></button>
          </form>

          <div className="demo-security-note"><LockKeyhole size={15} /><span><strong>Demo authentication</strong><small>These bundled accounts are for preview only. Production access requires server-side authentication and authorization.</small></span></div>
        </div>
      </section>
    </main>
  );
}
