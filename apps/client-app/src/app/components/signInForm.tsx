'use client';

import { useState } from 'react';

export default function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('https://api/signin', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    console.log(response.json);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Phone number, username, or email"
        required
        className="px-2 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-sm focus:outline-none focus:border-gray-400"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        className="px-2 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-sm focus:outline-none focus:border-gray-400"
      />
      {error && <p className="text-red-500 text-xs">{error}</p>}
      <button
        type="submit"
        disabled={!email || !password}
        className={`py-1 text-sm font-medium text-white rounded ${
          email && password ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-300 cursor-not-allowed'
        }`}
      >
        Log In
      </button>
    </form>
  );
}
