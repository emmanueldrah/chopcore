import React, { useState } from 'react';
import axios from 'axios';
import { useBusinessStore } from '../../store/businessStore';

export const AdminAccountStep: React.FC<{ onNext: (data: any) => void; onPrev: () => void; initialData: any; fullData: any }> = ({ onNext, onPrev, initialData, fullData }) => {
  const [admin, setAdmin] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const setIsSetup = useBusinessStore(state => state.setIsSetup);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (admin.password !== admin.confirm_password) return setError("Passwords do not match");

    setLoading(true);
    setError('');

    try {
      const payload = {
        business: fullData.business,
        admin: {
          full_name: admin.full_name,
          username: admin.username,
          password: admin.password
        }
      };
      // Explicitly add mode since it might be in root of data or business depending on impl
      payload.business.mode = fullData.mode;

      await axios.post('http://localhost:8768/api/v1/setup/', payload);
      setIsSetup(true);
      onNext({ admin });
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to complete setup');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <div className="bg-red-50 text-red-500 p-4 rounded-xl text-sm font-medium">{error}</div>}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Super Admin Full Name</label>
          <input
            type="text" required placeholder="e.g. Kwesi Mensah"
            className="w-full border-gray-200 border-2 rounded-xl p-3 focus:border-primary outline-none transition"
            value={admin.full_name} onChange={e => setAdmin({...admin, full_name: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Username</label>
          <input
            type="text" required placeholder="e.g. admin"
            className="w-full border-gray-200 border-2 rounded-xl p-3 focus:border-primary outline-none transition"
            value={admin.username} onChange={e => setAdmin({...admin, username: e.target.value})}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Password</label>
            <input
              type="password" required
              className="w-full border-gray-200 border-2 rounded-xl p-3 focus:border-primary outline-none transition"
              value={admin.password} onChange={e => setAdmin({...admin, password: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Confirm Password</label>
            <input
              type="password" required
              className="w-full border-gray-200 border-2 rounded-xl p-3 focus:border-primary outline-none transition"
              value={admin.confirm_password} onChange={e => setAdmin({...admin, confirm_password: e.target.value})}
            />
          </div>
        </div>
      </div>

      <div className="flex space-x-4 pt-4">
        <button type="button" onClick={onPrev} className="flex-1 px-6 py-3 border border-gray-300 rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition">
          Back
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-[2] bg-primary text-white py-3 rounded-xl font-bold hover:bg-orange-700 shadow-lg shadow-orange-200 transition disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Complete Setup & Launch'}
        </button>
      </div>
    </form>
  );
};
