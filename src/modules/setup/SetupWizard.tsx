import React from 'react';
import { useSetupWizard } from './useSetupWizard';
import { BusinessInfoStep } from './BusinessInfoStep';
import { BusinessTypeStep } from './BusinessTypeStep';
import { AdminAccountStep } from './AdminAccountStep';
import { DoneStep } from './DoneStep';

export const SetupWizard: React.FC = () => {
  const { step, nextStep, prevStep } = useSetupWizard();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-primary">Setup ChopCore</h1>
            <span className="text-gray-500">Step {step} of 4</span>
          </div>
          <div className="w-full bg-gray-200 h-2 rounded-full">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        {step === 1 && <BusinessInfoStep onNext={nextStep} />}
        {step === 2 && <BusinessTypeStep onNext={nextStep} onPrev={prevStep} />}
        {step === 3 && <AdminAccountStep onNext={nextStep} onPrev={prevStep} />}
        {step === 4 && <DoneStep />}
      </div>
    </div>
  );
};
