import React, { useState } from 'react';

export const BusinessInfoStep: React.FC<{ onNext: (data: any) => void; initialData: any }> = ({ onNext, initialData }) => {
  const [info, setInfo] = useState(initialData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ business: { ...info, currency: 'GHS', tax_rate: 1500 } });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="col-span-2">
          <label className="block text-sm font-bold text-gray-700 mb-1">Business Name</label>
          <input
            type="text" required placeholder="e.g. Tasty Bites Ghana"
            className="w-full border-gray-200 border-2 rounded-xl p-3 focus:border-primary outline-none transition"
            value={info.name} onChange={e => setInfo({...info, name: e.target.value})}
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-bold text-gray-700 mb-1">Physical Address</label>
          <input
            type="text" placeholder="e.g. 123 Oxford Street, Osu, Accra"
            className="w-full border-gray-200 border-2 rounded-xl p-3 focus:border-primary outline-none transition"
            value={info.address} onChange={e => setInfo({...info, address: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Phone Number</label>
          <input
            type="text" placeholder="+233..."
            className="w-full border-gray-200 border-2 rounded-xl p-3 focus:border-primary outline-none transition"
            value={info.phone} onChange={e => setInfo({...info, phone: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
          <input
            type="email" placeholder="hello@business.com"
            className="w-full border-gray-200 border-2 rounded-xl p-3 focus:border-primary outline-none transition"
            value={info.email} onChange={e => setInfo({...info, email: e.target.value})}
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-orange-700 shadow-lg shadow-orange-200 transition"
      >
        Next Step: Select Business Type
      </button>
    </form>
  );
};
