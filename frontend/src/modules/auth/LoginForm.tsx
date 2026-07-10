import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '../../lib/supabase';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';

export const LoginForm = () => {
  const { t } = useTranslation();
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithOtp({
      phone: phone,
    });

    if (error) {
      setError(error.message);
    } else {
      setStep('otp');
    }
    setIsLoading(false);
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const { error } = await supabase.auth.verifyOtp({
      phone,
      token: otp,
      type: 'sms',
    });

    if (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  return (
    <Card variant="warm" className="p-6 max-w-md w-full space-y-6">
      <h2 className="text-2xl font-semibold text-deepPalm">
        {step === 'phone' ? t('auth.login') : t('auth.verifyOtp')}
      </h2>

      <form onSubmit={step === 'phone' ? handleSendOtp : handleVerifyOtp} className="space-y-4">
        {step === 'phone' ? (
          <Input
            placeholder={t('auth.phoneNumber')}
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            error={error}
          />
        ) : (
          <Input
            placeholder="6-digit code"
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            error={error}
          />
        )}

        <Button className="w-full" isLoading={isLoading} type="submit">
          {step === 'phone' ? t('auth.sendOtp') : t('auth.verifyOtp')}
        </Button>

        {step === 'otp' && (
          <button
            type="button"
            onClick={() => setStep('phone')}
            className="text-sm text-marketClay hover:underline w-full text-center"
          >
            Change phone number
          </button>
        )}
      </form>
    </Card>
  );
};
