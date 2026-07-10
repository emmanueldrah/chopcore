import React from 'react';
import { Button } from '../components/ui/Button';

export const MaintenanceMode = () => {
  return (
    <div className="min-h-screen bg-harmattanSand flex items-center justify-center p-6 text-center">
      <div className="woven-bg" />
      <div className="z-10 space-y-6">
        <h1 className="text-4xl font-display font-bold text-deepPalm">We'll be right back</h1>
        <p className="text-xl text-charcoalInk max-w-md">
          Ferako is currently undergoing planned maintenance to serve the Ho community better.
        </p>
        <Button onClick={() => window.location.reload()}>
          Check again
        </Button>
      </div>
    </div>
  );
};
