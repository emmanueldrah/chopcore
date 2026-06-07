import React, { useState } from 'react';

export const BusinessInfoStep: React.FC<{ onNext: (data: any) => void }> = ({ onNext }) => {
  const [info, setInfo] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ business: { ...info, currency: 'GHS', tax_rate: 1500 } });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Step 1 — Business Info</h2>
      <div>
        <label className="block text-sm font-medium text-gray-700">Business Name</label>
        <input
          type="text" required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          value={info.name} onChange={e => setInfo({...info, name: e.target.value})}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Address</label>
        <input
          type="text"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          value={info.address} onChange={e => setInfo({...info, address: e.target.value})}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={info.phone} onChange={e => setInfo({...info, phone: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={info.email} onChange={e => setInfo({...info, email: e.target.value})}
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-primary text-white py-2 rounded-md hover:bg-orange-700 transition"
      >
        Next
      </button>
    </form>
  );
};
