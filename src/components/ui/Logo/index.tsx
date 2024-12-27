import React from 'react';
import { LogoProps } from './types';

export function Logo({ className = '', size = 'lg' }: LogoProps) {
  return (
    <svg
      viewBox="0 0 2000 2000"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${size === 'lg' ? 'h-8' : 'h-6'} w-auto ${className}`}
    >
      {/* Logo principal */}
      <path
        d="M502.5 487.5C501.883 487.611 501.383 487.944 501 488.5C500.833 497.5 500.667 506.5 500.5 515.5C500.514 524.897 501.181 534.064 502.5 543C500.825 543.985 499.158 544.819 497.5 545.5C464.345 541.175 431.345 542.175 398.5 548.5C398.189 547.522 397.522 546.855 396.5 546.5C395.175 527.935 395.175 509.435 396.5 491C394.414 490.685 392.414 490.185 390.5 489.5C402.961 487.486 415.627 485.986 428.5 485C448.167 484.333 467.833 484.333 487.5 485C492.933 484.882 497.933 485.715 502.5 487.5Z"
        fill="currentColor"
      />
      {/* Restante dos paths do SVG */}
    </svg>
  );
}