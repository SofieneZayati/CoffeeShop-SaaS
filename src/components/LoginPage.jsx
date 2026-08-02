import { useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  ChefHat,
  Coffee,
  Eye,
  EyeOff,
  LockKeyhole,
  QrCode,
  ShieldCheck,
  Sparkles,
  UserRound,
  UsersRound,
} from "lucide-react";
import { DEMO_ACCOUNTS } from "../data/auth";
import { BrandMark } from "./ui";
import { StaffLanguageSwitch } from "./AppShell";
import { useStaffLanguage } from "../context/StaffLanguageContext";

const MAPS_URL = "https://maps.app.goo.gl/43Fah1d5SSyX5r2W6";

const roleIcons = {
  owner: ShieldCheck,
  manager: UsersRound,
  barista: ChefHat,
  customer: UserRound,
};

export default function LoginPage({ onLogin, onOpenTableOrdering }) {
  const { locale, t } = useStaffLanguage();
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
      if (!success) setError(t("login.error", { en: "That email and password do not match an account.", fr: "L’adresse e-mail et le mot de passe ne correspondent à aucun compte." }));
      setLoading(false);
    }, 320);
  }

  const SelectedIcon = roleIcons[selected.role];
  const selectedRole = t(`role.${selected.role}`, selected.roleLabel);
  const accountDescription = {
    owner: { en: "Full business, finance, team and platform access", fr: "Accès complet à l’activité, aux finances, à l’équipe et à la plateforme" },
    manager: { en: "Daily operations, growth, reports and experiences", fr: "Opérations quotidiennes, développement, rapports et expériences" },
    barista: { en: "Order preparation and product availability", fr: "Préparation des commandes et disponibilité des produits" },
    customer: { en: "Personal menu, orders, bookings and rewards", fr: "Carte personnelle, commandes, réservations et récompenses" },
  }[selected.role];

  return (
    <main className="login-page">
      <a className="skip-link" href="#login-form">{t("login.skip", { en: "Skip to sign in", fr: "Aller à la connexion" })}</a>
      <section className="login-story">
        <div className="login-brand"><BrandMark /><span>{t("login.brandLine", { en: "One café. Every moment in sync.", fr: "Un café. Chaque moment synchronisé." })}</span></div>
        <div className="login-story-copy">
          <span className="login-kicker"><Sparkles size={14} /> GREEN COFFEE OS</span>
          <h1>{t("login.heroLine1", { en: "The calm behind", fr: "La sérénité derrière" })}<br />{t("login.heroLine2Prefix", { en: "a ", fr: "un " })}<em>{t("login.heroLine2", { en: "busy café.", fr: "café animé." })}</em></h1>
          <p>{t("login.story", { en: "Orders, tables, regulars, and every little detail—shaped around the people doing the work.", fr: "Commandes, tables, habitués et chaque détail—pensés pour les personnes qui font vivre le café." })}</p>
          <div className="login-proof"><span><Check size={14} />{t("login.proof.roles", { en: "Role-focused workspaces", fr: "Espaces adaptés à chaque rôle" })}</span><span><Check size={14} />{t("login.proof.live", { en: "Live service overview", fr: "Vue du service en direct" })}</span><span><Check size={14} />{t("login.proof.customer", { en: "Customer ordering & rewards", fr: "Commandes et récompenses clients" })}</span></div>
        </div>
        <div className="login-photo-stack" aria-hidden="true">
          <figure className="login-photo main"><img src="/menu/pistachio-cloud.webp" alt="" /></figure>
          <figure className="login-photo second"><img src="/menu/tiramisu-jar.webp" alt="" /></figure>
          <figure className="login-photo third"><img src="/menu/iced-caramel-latte.webp" alt="" /></figure>
          <span className="login-photo-note"><Coffee size={15} /><b>53</b> {t("login.menuCount", { en: "menu items available", fr: "articles disponibles" })}</span>
        </div>
        <footer><span><a href={MAPS_URL} target="_blank" rel="noreferrer" style={{ color: "inherit", textDecoration: "none" }} aria-label={t("location.openMaps", { en: "Open Green Coffee Games in Google Maps", fr: "Ouvrir Green Coffee Games dans Google Maps" })}>Green Coffee Games • Mégrine</a></span><span>{t("login.footerWorkspace", { en: "Management workspace • 2026", fr: "Espace de gestion • 2026" })}</span></footer>
      </section>

      <section className="login-panel" id="login-form">
        <div className="login-form-wrap">
          <StaffLanguageSwitch className="login-language-switch" />
          <div className="login-mobile-brand"><BrandMark /><small>{t("login.os", { en: "Coffee shop operating system", fr: "Système de gestion du café" })}</small></div>
          <header>
            <span className={`selected-role-icon ${selected.color}`}><SelectedIcon size={22} /></span>
            <div><span>{t("login.welcome", { en: "Welcome to your workspace", fr: "Bienvenue dans votre espace" })}</span><h2>{t("login.signInAs", { en: "Sign in as {{role}}.", fr: "Connexion en tant que {{role}}." }, { role: selectedRole.toLowerCase() })}</h2><p>{t("login.chooseRole", { en: "Choose a role or enter the account credentials.", fr: "Choisissez un rôle ou saisissez les identifiants du compte." })}</p></div>
          </header>

          <button className="guest-order-entry" type="button" onClick={onOpenTableOrdering}>
            <span><QrCode size={22} /></span>
            <span><strong>{t("login.atTable", { en: "At a café table?", fr: "Installé à une table ?" })}</strong><small>{t("login.tableCopy", { en: "Scan your table QR to open a private ordering session. No account needed.", fr: "Scannez le QR de votre table pour ouvrir une session de commande privée. Aucun compte requis." })}</small></span>
            <ArrowRight size={18} />
          </button>
          <div className="login-divider"><span>{t("login.divider", { en: "or open a staff/customer workspace", fr: "ou ouvrir un espace équipe/client" })}</span></div>

          <div className="account-chooser" aria-label={t("login.accountChooser", { en: "Choose an account", fr: "Choisir un compte" })}>
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
                  <span><strong>{account.firstName}</strong><small>{t(`role.${account.role}`, account.roleLabel)}</small></span>
                  {selectedId === account.id && <Check size={15} />}
                </button>
              );
            })}
          </div>

          <div className="selected-account-note">
            <span className={`account-role-icon ${selected.color}`}><SelectedIcon size={17} /></span>
            <span><strong>{selected.name}</strong><small>{accountDescription?.[locale] || selected.description}</small></span>
          </div>

          <form onSubmit={submit} noValidate>
            <label><span>{t("login.email", { en: "Email address", fr: "Adresse e-mail" })}</span><div className="login-input"><UserRound size={17} /><input type="email" autoComplete="username" required value={email} onChange={(event) => setEmail(event.target.value)} /></div></label>
            <label><span>{t("login.password", { en: "Password", fr: "Mot de passe" })}</span><div className="login-input"><LockKeyhole size={17} /><input type={showPassword ? "text" : "password"} autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} /><button type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? t("login.hidePassword", { en: "Hide password", fr: "Masquer le mot de passe" }) : t("login.showPassword", { en: "Show password", fr: "Afficher le mot de passe" })}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></div></label>
            {error && <div className="login-error" role="alert">{error}</div>}
            <button className="login-submit" type="submit" disabled={loading}><span>{loading ? t("login.opening", { en: "Opening workspace…", fr: "Ouverture de l’espace…" }) : t("login.continue", { en: "Continue as {{name}}", fr: "Continuer avec {{name}}" }, { name: selected.firstName })}</span><ArrowRight size={18} /></button>
          </form>

          <div className="demo-security-note"><LockKeyhole size={15} /><span><strong>{t("login.roleAccess", { en: "Role-based access", fr: "Accès selon le rôle" })}</strong><small>{t("login.roleAccessCopy", { en: "Each account opens only the tools assigned to its role.", fr: "Chaque compte ouvre uniquement les outils attribués à son rôle." })}</small></span></div>
        </div>
      </section>
    </main>
  );
}
