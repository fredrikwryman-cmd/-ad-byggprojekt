export default function Logo({ className = '', iconColor = 'currentColor', textColor = 'currentColor' }) {
  return (
    <svg
      viewBox="0 0 280 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="AD Byggprojekt AB"
    >
      {/* Building icon */}
      <g fill={iconColor}>
        <rect x="2" y="18" width="14" height="28" rx="1" />
        <rect x="18" y="8" width="16" height="38" rx="1" />
        <rect x="36" y="14" width="12" height="32" rx="1" />
        <path d="M2 18L9 10L16 18H2Z" />
        {/* Windows */}
        <rect x="5" y="22" width="3" height="3" rx="0.5" fillOpacity="0.3" />
        <rect x="10" y="22" width="3" height="3" rx="0.5" fillOpacity="0.3" />
        <rect x="5" y="28" width="3" height="3" rx="0.5" fillOpacity="0.3" />
        <rect x="10" y="28" width="3" height="3" rx="0.5" fillOpacity="0.3" />
        <rect x="5" y="34" width="3" height="3" rx="0.5" fillOpacity="0.3" />
        <rect x="10" y="34" width="3" height="3" rx="0.5" fillOpacity="0.3" />
        <rect x="22" y="13" width="3" height="4" rx="0.5" fillOpacity="0.3" />
        <rect x="27" y="13" width="3" height="4" rx="0.5" fillOpacity="0.3" />
        <rect x="22" y="20" width="3" height="4" rx="0.5" fillOpacity="0.3" />
        <rect x="27" y="20" width="3" height="4" rx="0.5" fillOpacity="0.3" />
        <rect x="22" y="27" width="3" height="4" rx="0.5" fillOpacity="0.3" />
        <rect x="27" y="27" width="3" height="4" rx="0.5" fillOpacity="0.3" />
        <rect x="22" y="34" width="3" height="4" rx="0.5" fillOpacity="0.3" />
        <rect x="27" y="34" width="3" height="4" rx="0.5" fillOpacity="0.3" />
        <rect x="39" y="18" width="3" height="3" rx="0.5" fillOpacity="0.3" />
        <rect x="44" y="18" width="3" height="3" rx="0.5" fillOpacity="0.3" />
        <rect x="39" y="24" width="3" height="3" rx="0.5" fillOpacity="0.3" />
        <rect x="44" y="24" width="3" height="3" rx="0.5" fillOpacity="0.3" />
        <rect x="39" y="30" width="3" height="3" rx="0.5" fillOpacity="0.3" />
        <rect x="44" y="30" width="3" height="3" rx="0.5" fillOpacity="0.3" />
        <rect x="39" y="36" width="3" height="3" rx="0.5" fillOpacity="0.3" />
        <rect x="44" y="36" width="3" height="3" rx="0.5" fillOpacity="0.3" />
      </g>
      {/* Text */}
      <text
        x="58"
        y="32"
        fill={textColor}
        fontFamily="Inter, system-ui, -apple-system, sans-serif"
        fontSize="22"
        fontWeight="800"
        letterSpacing="-0.02em"
      >
        AD BYGGPROJEKT
      </text>
      <text
        x="262"
        y="32"
        fill={textColor}
        fontFamily="Inter, system-ui, -apple-system, sans-serif"
        fontSize="12"
        fontWeight="600"
        opacity="0.7"
      >
        AB
      </text>
    </svg>
  );
}
