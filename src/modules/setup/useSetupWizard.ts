import { useState } from 'react';

export const useSetupWizard = () => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    business: {
      name: '',
      logo_url: '',
      address: '',
      phone: '',
      email: '',
      opening_hours: {},
      currency: 'GHS',
      tax_rate: 1500,
    },
    admin: {
      full_name: '',
      username: '',
      password: '',
    },
    mode: '',
  });

  const nextStep = (stepData: any) => {
    setData((prev) => ({ ...prev, ...stepData }));
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  return { step, data, nextStep, prevStep };
};
