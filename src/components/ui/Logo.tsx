import React from 'react';

interface LogoProps {
  className?: string;
}

export function Logo({ className = '' }: LogoProps) {
  return (
    <svg
      viewBox="0 0 200 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`h-8 w-auto ${className}`}
    >
      <path
        d="M20 10C31.0457 10 40 18.9543 40 30C40 41.0457 31.0457 50 20 50C8.9543 50 0 41.0457 0 30C0 18.9543 8.9543 10 20 10Z"
        fill="currentColor"
      />
      <path
        d="M60 15H80V20H60V15ZM60 25H80V30H60V25ZM60 35H80V40H60V35Z"
        fill="currentColor"
      />
      <text
        x="90"
        y="35"
        className="text-2xl font-bold"
        fill="currentColor"
      >
        CEO Express
      </text>
    </svg>
  );
}