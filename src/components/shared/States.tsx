import React from 'react';

export const LoadingSkeleton: React.FC<{ count?: number }> = ({ count = 3 }) => {
  return (
    <div className="space-y-4 w-full">
      {Array(count).fill(0).map((_, i) => (
        <div key={i} className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex animate-pulse space-x-6">
          <div className="w-24 h-24 bg-slate-100 rounded-3xl"></div>
          <div className="flex-1 space-y-3 py-1">
            <div className="h-4 bg-slate-100 rounded w-3/4"></div>
            <div className="h-4 bg-slate-100 rounded w-1/2"></div>
            <div className="h-10 bg-slate-100 rounded-xl w-full mt-4"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const EmptyState: React.FC<{ icon: React.ReactNode; title: string; message: string }> = ({ icon, title, message }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
      <div className="w-24 h-24 bg-slate-50 text-slate-200 rounded-full flex items-center justify-center mb-2">
        {icon}
      </div>
      <h3 className="text-xl font-black text-slate-800 tracking-tight">{title}</h3>
      <p className="text-slate-400 font-medium max-w-xs leading-relaxed">{message}</p>
    </div>
  );
};
