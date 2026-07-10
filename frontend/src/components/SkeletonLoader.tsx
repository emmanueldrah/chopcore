import React from 'react';

export const SkeletonLoader = ({ className }: { className?: string }) => {
  return (
    <div className={`bg-white rounded-warm overflow-hidden relative ${className}`}>
      <div className="woven-bg opacity-5" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-harmattanSand/50 to-transparent animate-shimmer" />
    </div>
  );
};
