import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-center py-6 border-t border-slate-700">
      <p className="text-sm text-slate-400">
        &copy; {new Date().getFullYear()} Neonatal Epilepsy Risk Insights. For demonstration purposes only.
      </p>
      <p className="text-xs text-slate-500 mt-1">
        Developed by Alan Cyril Sunny.
      </p>
    </footer>
  );
};