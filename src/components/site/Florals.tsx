// Decorative SVG florals — soft, hand-drawn feel
export function FloralCorner({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg viewBox="0 0 200 200" className={className} style={flip ? { transform: "scaleX(-1)" } : undefined} aria-hidden>
      <g fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
        <path d="M10 190 Q 40 150, 60 120 T 110 60 T 180 20" />
        <path d="M40 170 Q 55 155, 50 135" />
        <path d="M70 130 Q 85 115, 80 95" />
        <path d="M110 80 Q 125 65, 120 45" />
      </g>
      <g fill="currentColor" opacity="0.55">
        <circle cx="60" cy="120" r="6" />
        <circle cx="56" cy="116" r="3" fill="#fff" />
        <circle cx="110" cy="60" r="7" />
        <circle cx="106" cy="56" r="3" fill="#fff" />
        <circle cx="160" cy="35" r="5" />
        <circle cx="40" cy="170" r="4" />
        <circle cx="85" cy="95" r="4" />
      </g>
      <g fill="currentColor" opacity="0.35">
        <ellipse cx="48" cy="138" rx="6" ry="3" transform="rotate(-35 48 138)" />
        <ellipse cx="78" cy="98" rx="6" ry="3" transform="rotate(-35 78 98)" />
        <ellipse cx="120" cy="48" rx="6" ry="3" transform="rotate(-35 120 48)" />
      </g>
    </svg>
  );
}

export function FloralDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden>
      <span className="h-px w-16 bg-gold/40" />
      <svg viewBox="0 0 60 24" className="h-6 w-14 text-gold">
        <g fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
          <path d="M5 12 Q 18 4, 30 12 T 55 12" />
        </g>
        <g fill="currentColor">
          <circle cx="30" cy="12" r="3" />
          <circle cx="30" cy="12" r="1.3" fill="#fff" />
          <circle cx="18" cy="8" r="1.6" opacity="0.7" />
          <circle cx="42" cy="16" r="1.6" opacity="0.7" />
        </g>
      </svg>
      <span className="h-px w-16 bg-gold/40" />
    </div>
  );
}

export function FloralSprig({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 120" className={className} aria-hidden>
      <g fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round">
        <path d="M40 115 Q 38 80, 45 50 T 50 10" />
        <path d="M42 95 Q 28 92, 22 80" />
        <path d="M44 75 Q 60 72, 66 58" />
        <path d="M46 55 Q 30 52, 24 40" />
        <path d="M48 35 Q 62 32, 66 20" />
      </g>
      <g fill="currentColor" opacity="0.7">
        <ellipse cx="22" cy="80" rx="6" ry="2.5" transform="rotate(-25 22 80)" />
        <ellipse cx="66" cy="58" rx="6" ry="2.5" transform="rotate(25 66 58)" />
        <ellipse cx="24" cy="40" rx="6" ry="2.5" transform="rotate(-25 24 40)" />
        <ellipse cx="66" cy="20" rx="6" ry="2.5" transform="rotate(25 66 20)" />
      </g>
    </svg>
  );
}
