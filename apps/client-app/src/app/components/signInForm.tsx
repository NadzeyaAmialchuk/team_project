'use client';

import { useState } from 'react';

export default function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error] = useState('');


  const handleSubmit = async () => {
    const response = await fetch('https://api/signin', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    console.log(response.json)
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
        required
      />
      {error && <p className="error">{error}</p>}
      <button type="submit">Sign-in</button>
    </form>
  );
}
