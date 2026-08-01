import { Check, ChevronRight, LoaderCircle } from "lucide-react";

export function BrandMark({ compact = false }) {
  return (
    <div className={`brand-lockup${compact ? " compact" : ""}`}>
      <span className="brand-mark">
        <img src="/logo.jpg" alt={compact ? "Green Coffee Games" : ""} />
      </span>
      {!compact && (
        <span className="brand-words">
          <strong>Green Coffee Games</strong>
          <small>Interactive shop OS demo</small>
        </span>
      )}
    </div>
  );
}

export function PageHeader({ eyebrow, title, description, actions, children }) {
  return (
    <header className="page-header">
      <div>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      {actions && <div className="page-actions">{actions}</div>}
      {children}
    </header>
  );
}

export function Button({ children, icon: Icon, variant = "primary", size = "normal", className = "", loading = false, ...props }) {
  return (
    <button className={`button ${variant} ${size} ${className}`.trim()} {...props}>
      {loading ? <LoaderCircle size={16} className="spin" /> : Icon ? <Icon size={16} /> : null}
      <span>{children}</span>
    </button>
  );
}

export function IconButton({ label, children, className = "", ...props }) {
  return (
    <button className={`icon-button ${className}`.trim()} aria-label={label} title={label} {...props}>
      {children}
    </button>
  );
}

export function Badge({ children, tone = "neutral", dot = false }) {
  return <span className={`badge ${tone}`}>{dot && <i />} {children}</span>;
}

export function Avatar({ initials, size = "md", tone = 0, online = false }) {
  return (
    <span className={`avatar ${size} tone-${tone % 5}`}>
      {initials}
      {online && <i className="online-dot" />}
    </span>
  );
}

export function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      className={`toggle${checked ? " active" : ""}`}
      onClick={() => onChange(!checked)}
    >
      <span />
    </button>
  );
}

export function Progress({ value, tone = "green", label }) {
  return (
    <div className="progress-wrap" aria-label={label}>
      <div className={`progress-track ${tone}`}>
        <span style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
      </div>
    </div>
  );
}

export function MetricDelta({ children, down = false }) {
  return <span className={`metric-delta${down ? " down" : ""}`}>{children}</span>;
}

export function SectionTitle({ title, subtitle, action, onAction }) {
  return (
    <div className="section-title">
      <div>
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {action && (
        <button className="text-action" onClick={onAction}>
          {action} <ChevronRight size={14} />
        </button>
      )}
    </div>
  );
}

export function Segmented({ options, value, onChange, label }) {
  return (
    <div className="segmented" role="group" aria-label={label}>
      {options.map((option) => (
        <button key={option.value} className={value === option.value ? "active" : ""} onClick={() => onChange(option.value)}>
          {option.label}
          {option.count !== undefined && <span>{option.count}</span>}
        </button>
      ))}
    </div>
  );
}

export function CheckLine({ children }) {
  return <li className="check-line"><Check size={14} /> <span>{children}</span></li>;
}

export function Card({ children, className = "", ...props }) {
  return <section className={`card ${className}`.trim()} {...props}>{children}</section>;
}
