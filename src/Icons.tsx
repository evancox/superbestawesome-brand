import type { SVGProps } from 'react';

/** Shared line-icon style: 24px grid, 1.7 stroke, round ends. Product-specific icons use it too. */
export const iconProps = (props: SVGProps<SVGSVGElement>) => ({
  width: 22,
  height: 22,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  ...props,
});

export const SearchIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...iconProps(p)}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m20 20-4.2-4.2" />
  </svg>
);
export const BackIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...iconProps(p)}>
    <path d="M15 5l-7 7 7 7" />
  </svg>
);
export const ForwardIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...iconProps(p)}>
    <path d="M9 5l7 7-7 7" />
  </svg>
);
export const MoonIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...iconProps(p)}>
    <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
  </svg>
);
export const SunIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...iconProps(p)}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2.5v2m0 15v2M4.6 4.6l1.4 1.4m12 12 1.4 1.4M2.5 12h2m15 0h2M4.6 19.4 6 18M18 6l1.4-1.4" />
  </svg>
);
export const UserIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...iconProps(p)}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21a8 8 0 0 1 16 0" />
  </svg>
);
export const HomeIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...iconProps(p)}>
    <path d="M4 11.5 12 5l8 6.5V19a1.5 1.5 0 0 1-1.5 1.5h-4v-5h-5v5h-4A1.5 1.5 0 0 1 4 19z" />
  </svg>
);
export const PencilIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...iconProps(p)}>
    <path d="M15.2 5.2l3.6 3.6M4.5 19.5l1-4.4L16 4.6a1.6 1.6 0 0 1 2.3 0l1.1 1.1a1.6 1.6 0 0 1 0 2.3L8.9 18.5z" />
  </svg>
);
export const AppsIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...iconProps(p)}>
    <circle cx="6.5" cy="6.5" r="2" />
    <circle cx="17.5" cy="6.5" r="2" />
    <circle cx="6.5" cy="17.5" r="2" />
    <circle cx="17.5" cy="17.5" r="2" />
  </svg>
);
