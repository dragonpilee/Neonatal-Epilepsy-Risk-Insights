
import React from 'react';

interface InfoCardProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  titleClassName?: string;
}

export const InfoCard: React.FC<InfoCardProps> = ({ title, children, icon, titleClassName }) => {
  return (
    <div className="bg-slate-800/70 backdrop-blur-sm shadow-xl rounded-xl border border-slate-700 overflow-hidden">
      <div className={`px-6 py-4 border-b border-slate-700 flex items-center ${titleClassName ? '' : 'bg-slate-700/50'}`}>
        {icon}
        <h3 className={`text-lg font-semibold ${titleClassName || 'text-sky-300'}`}>{title}</h3>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};
