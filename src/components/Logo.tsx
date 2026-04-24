interface LogoProps {
  className?: string;
  variant?: 'default' | 'light';
}

export default function Logo({ className = 'h-7 w-auto', variant = 'default' }: LogoProps) {
  const textColor = variant === 'light' ? '#FFFFFF' : '#0B0F1A';
  const accentColor = variant === 'light' ? '#FFFFFF' : '#191812';

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <img
        src="/deadline-logo.png"
        alt="Deadline.ao"
        className="h-full w-auto"
        style={{ filter: variant === 'light' ? 'invert(1)' : undefined }}
      />
      <svg
        viewBox="0 0 130 32"
        className="h-full w-auto"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Deadline.ao"
      >
        <text
          x="0"
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
          x="81"
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
    </div>
  );
}
