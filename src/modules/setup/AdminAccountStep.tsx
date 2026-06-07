import React, { useState } from 'react';

export const AdminAccountStep: React.FC<{ onNext: (data: any) => void; onPrev: () => void }> = ({ onNext, onPrev }) => {
  const [admin, setAdmin] = useState({
    full_name: '',
    username: '',
    password: '',
    confirm_password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (admin.password !== admin.confirm_password) return alert("Passwords do not match");
    onNext({ admin: { full_name: admin.full_name, username: admin.username, password: admin.password } });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Step 3 — Admin Account</h2>
      <div>
        <label className="block text-sm font-medium text-gray-700">Full Name</label>
        <input
          type="text" required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          value={admin.full_name} onChange={e => setAdmin({...admin, full_name: e.target.value})}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Username</label>
        <input
          type="text" required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          value={admin.username} onChange={e => setAdmin({...admin, username: e.target.value})}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password" required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={admin.password} onChange={e => setAdmin({...admin, password: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input
            type="password" required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={admin.confirm_password} onChange={e => setAdmin({...admin, confirm_password: e.target.value})}
          />
        </div>
      </div>
      <div className="space-y-2">
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-md hover:bg-orange-700 transition"
        >
          Finalize Setup
        </button>
        <button
          type="button"
          onClick={onPrev}
          className="w-full text-gray-500 py-2 hover:underline"
        >
          Back
        </button>
      </div>
    </form>
  );
};
