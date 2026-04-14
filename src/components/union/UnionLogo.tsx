import { cn } from '@/lib/utils';

interface UnionLogoProps {
  className?: string;
  /** Show the "UNION" wordmark underneath the monogram */
  withWordmark?: boolean;
  /** Inherit color from currentColor — defaults true */
  mono?: boolean;
}

/**
 * Union brand mark — an SVG approximation of the monochrome
 * "U | 1990 SINCE" crest with an optional "UNION" wordmark beneath.
 * Uses currentColor so it inherits text color from the parent.
 */
export function UnionLogo({ className, withWordmark = true, mono = true }: UnionLogoProps) {
  const color = mono ? 'currentColor' : '#000';

  return (
    <svg
      viewBox="0 0 480 520"
      className={cn('block', className)}
      role="img"
      aria-label="UNION since 1990"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outlined U */}
      <path
        d="M70 70 L70 240 C70 310, 130 340, 175 340 C220 340, 280 310, 280 240 L280 70"
        fill="none"
        stroke={color}
        strokeWidth="14"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />

      {/* Vertical divider */}
      <line x1="315" y1="50" x2="315" y2="340" stroke={color} strokeWidth="5" />

      {/* 19 / 90 stacked — bold condensed numerals */}
      <text
        x="340"
        y="140"
        fontFamily="'Arial Black', 'Helvetica Neue', sans-serif"
        fontWeight="900"
        fontSize="110"
        fill={color}
        letterSpacing="-4"
      >
        19
      </text>
      <text
        x="340"
        y="260"
        fontFamily="'Arial Black', 'Helvetica Neue', sans-serif"
        fontWeight="900"
        fontSize="110"
        fill={color}
        letterSpacing="-4"
      >
        90
      </text>

      {/* SINCE caption */}
      <text
        x="395"
        y="310"
        fontFamily="'Arial Black', 'Helvetica Neue', sans-serif"
        fontWeight="900"
        fontSize="30"
        fill={color}
        letterSpacing="6"
      >
        SINCE
      </text>

      {/* UNION wordmark */}
      {withWordmark && (
        <text
          x="240"
          y="480"
          textAnchor="middle"
          fontFamily="'Arial Black', 'Helvetica Neue', sans-serif"
          fontWeight="900"
          fontSize="130"
          fill={color}
          letterSpacing="-2"
        >
          UNION
        </text>
      )}
    </svg>
  );
}

/**
 * Compact horizontal variant for headers — monogram on the left,
 * small "UNION" text beside it, rendered in currentColor.
 */
export function UnionLogoHorizontal({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 88"
      className={cn('block', className)}
      role="img"
      aria-label="UNION since 1990"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outlined U */}
      <path
        d="M14 16 L14 50 C14 66, 26 72, 36 72 C46 72, 58 66, 58 50 L58 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="square"
      />
      {/* Divider */}
      <line x1="68" y1="10" x2="68" y2="72" stroke="currentColor" strokeWidth="1.5" />
      {/* 1990 */}
      <text
        x="76"
        y="36"
        fontFamily="'Arial Black', sans-serif"
        fontWeight="900"
        fontSize="24"
        fill="currentColor"
        letterSpacing="-1"
      >
        19
      </text>
      <text
        x="76"
        y="60"
        fontFamily="'Arial Black', sans-serif"
        fontWeight="900"
        fontSize="24"
        fill="currentColor"
        letterSpacing="-1"
      >
        90
      </text>
      {/* SINCE */}
      <text
        x="106"
        y="72"
        fontFamily="'Arial Black', sans-serif"
        fontWeight="900"
        fontSize="9"
        fill="currentColor"
        letterSpacing="2"
      >
        SINCE
      </text>
      {/* UNION */}
      <text
        x="155"
        y="56"
        fontFamily="'Arial Black', sans-serif"
        fontWeight="900"
        fontSize="40"
        fill="currentColor"
        letterSpacing="-1"
      >
        UNION
      </text>
    </svg>
  );
}
