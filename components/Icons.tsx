
import React from 'react';

interface IconProps {
  className?: string;
}

export const BrainIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125H14.25c.621 0 1.125.504 1.125 1.125V21M3.75 18h16.5M4.5 12.75h15M5.25 9h13.5M6 5.25h12M7.5 18v-4.5m9 4.5v-4.5m-6.75-4.5V3.75c0-1.105.895-2 2-2h3.5c1.105 0 2 .895 2 2v1.5M12 12.75V21m0-8.25H4.5m7.5 0H19.5" />
  </svg>
);

export const DnaIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5L12 21m0 0l8.25-7.5M12 21V3M3.75 9.75L12 3m0 0l8.25 6.75m-16.5 0a4.5 4.5 0 016.237-4.22L12 5.25l2.013-1.72a4.5 4.5 0 016.237 4.22M3.75 9.75h16.5" />
  </svg>
);

export const UserGroupIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.243-3.72a9.094 9.094 0 013.741-.479 3 3 0 01-4.682-2.72M13.502 18.477a4.5 4.5 0 01-6.523 0L6.75 17.25m6.751 1.227a4.5 4.5 0 00-6.523 0L6.75 17.25M3.375 19.5h17.25m-17.25 0a3.375 3.375 0 003.375-3.375M10.5 15a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm0 0V7.5m0 7.5A2.25 2.25 0 0012.75 18v2.25m0-12.75c0-.621-.504-1.125-1.125-1.125H11.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125h.375m-3.75 0c.621 0 1.125.504 1.125 1.125v6.75c0 .621-.504 1.125-1.125 1.125H6.375c-.621 0-1.125-.504-1.125-1.125V11.25c0-.621.504-1.125 1.125-1.125h.375m10.125-1.5c.621 0 1.125.504 1.125 1.125v6.75c0 .621-.504 1.125-1.125 1.125h-.375c-.621 0-1.125-.504-1.125-1.125V11.25c0-.621.504-1.125 1.125-1.125h.375z" />
  </svg>
);

export const ClipboardDocCheckIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 0 1 9 9v.375M10.125 2.25A3.375 3.375 0 0 1 13.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 0 1 3.375 3.375M9 15l2.25 2.25L15 12" />
    </svg>
);

export const ChartBarIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
  </svg>
);

export const LightBulbIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.355a7.5 7.5 0 01-4.5 0m4.5 0v.75A2.25 2.25 0 0113.5 21h-3a2.25 2.25 0 01-2.25-2.25v-.75M12 18c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6zm0-3.75h.008v.015H12v-.015zm0 0V9.75m0 5.25v2.25" />
  </svg>
);

export const DocumentTextIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);

export const HeartPulseIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12zM6.75 12H9m1.5 0H12m0 0v2.25m0-2.25H15m-3 0V9.75M12 15v2.25" />
  </svg>
);
