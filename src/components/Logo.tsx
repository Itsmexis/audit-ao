interface LogoProps {
  className?: string;
  variant?: 'default' | 'light';
}

export default function Logo({ className = 'h-7 w-auto', variant = 'default' }: LogoProps) {
  const textColor = variant === 'light' ? '#FFFFFF' : '#0B0F1A';
  const accentColor = variant === 'light' ? '#93C5FD' : '#1E3A8A';

  return (
    <svg
      viewBox="0 0 160 32"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Deadline.ao"
    >
      <g>
        <rect x="2" y="6" width="20" height="20" rx="5" fill={accentColor} />
        <path
          d="M7 16h10M12 11v10"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <text
        x="30"
        y="22"
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="17"
        fontWeight="700"
        fill={textColor}
        letterSpacing="-0.5"
      >
        Deadline
      </text>
      <text
        x="111"
        y="22"
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="17"
        fontWeight="500"
        fill={accentColor}
        letterSpacing="-0.3"
      >
        .ao
      </text>
    </svg>
  );
}
