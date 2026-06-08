import React from 'react';
import { useSetupWizard } from './useSetupWizard';
import { BusinessInfoStep } from './BusinessInfoStep';
import { BusinessTypeStep } from './BusinessTypeStep';
import { AdminAccountStep } from './AdminAccountStep';
import { DoneStep } from './DoneStep';

export const SetupWizard: React.FC = () => {
  const { step, nextStep, prevStep, data } = useSetupWizard();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-10 border border-gray-100">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-extrabold text-primary mb-2">ChopCore Setup</h1>
          <p className="text-gray-500">Configure your restaurant management system in minutes</p>
        </div>

        <div className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-bold uppercase tracking-wider text-gray-400">Step {step} of 4</span>
            <span className="text-sm font-bold text-primary">
              {step === 1 && 'Business Profile'}
              {step === 2 && 'Business Type'}
              {step === 3 && 'Administrative Account'}
              {step === 4 && 'Complete'}
            </span>
          </div>
          <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-primary h-full transition-all duration-700 ease-in-out"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        <div className="transition-opacity duration-500">
          {step === 1 && <BusinessInfoStep onNext={nextStep} initialData={data.business} />}
          {step === 2 && <BusinessTypeStep onNext={nextStep} onPrev={prevStep} initialMode={data.mode} />}
          {step === 3 && <AdminAccountStep onNext={nextStep} onPrev={prevStep} initialData={data.admin} fullData={data} />}
          {step === 4 && <DoneStep />}
        </div>
      </div>
    </div>
  );
};
