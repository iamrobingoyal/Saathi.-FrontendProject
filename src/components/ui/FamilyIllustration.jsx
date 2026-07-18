export function FamilyIllustration({ className = '' }) {
  return (
    <svg
      viewBox="0 0 480 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-labelledby="family-illu-title"
    >
      <title id="family-illu-title">Village family using a phone with Saathi</title>
      <rect x="40" y="280" width="400" height="100" rx="20" fill="var(--saathi-border)" opacity="0.5" />
      <ellipse cx="240" cy="300" rx="160" ry="28" fill="var(--saathi-primary)" opacity="0.08" />

      {/* Ground path */}
      <path
        d="M60 320c40-20 80-10 120-8s90-20 140-10 80 10 100 20"
        stroke="var(--saathi-secondary)"
        strokeWidth="2"
        opacity="0.35"
      />

      {/* Adult left */}
      <circle cx="150" cy="170" r="28" fill="var(--saathi-secondary)" />
      <rect x="128" y="200" width="44" height="70" rx="18" fill="var(--saathi-primary)" />
      <rect x="118" y="210" width="16" height="40" rx="8" fill="var(--saathi-secondary)" />
      <rect x="166" y="210" width="16" height="40" rx="8" fill="var(--saathi-secondary)" />

      {/* Child */}
      <circle cx="220" cy="200" r="22" fill="var(--saathi-accent)" />
      <rect x="204" y="224" width="32" height="50" rx="14" fill="var(--saathi-primary)" opacity="0.85" />

      {/* Adult right */}
      <circle cx="290" cy="165" r="30" fill="var(--saathi-primary)" />
      <rect x="266" y="198" width="48" height="72" rx="20" fill="var(--saathi-secondary)" />

      {/* Phone */}
      <rect x="248" y="230" width="36" height="58" rx="8" fill="var(--saathi-card)" stroke="var(--saathi-ink)" strokeWidth="2" />
      <rect x="254" y="238" width="24" height="36" rx="3" fill="var(--saathi-primary)" opacity="0.15" />
      <circle cx="266" cy="280" r="3" fill="var(--saathi-muted)" />

      {/* Soft sun */}
      <circle cx="380" cy="90" r="36" fill="var(--saathi-accent)" opacity="0.45" />
      <circle cx="380" cy="90" r="22" fill="var(--saathi-accent)" opacity="0.7" />

      {/* Soft leaves */}
      <path d="M80 120c20-40 50-30 40 10-30 5-50 10-40-10z" fill="var(--saathi-primary)" opacity="0.2" />
      <path d="M100 140c25-35 55-20 35 15-28 0-48 5-35-15z" fill="var(--saathi-secondary)" opacity="0.25" />
    </svg>
  )
}
