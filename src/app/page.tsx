'use client';

import { useState } from 'react';
import { api } from '@/global/api/api';

export default function Home() {
  const [userId, setUserId] = useState<number>();

  async function login() {
    if (!userId) return;
    const res = api.user.get(userId);

    console.log(res);
  }

  return (
    <main
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <h1>Welcome to Every API Next.js App</h1>
      <input type="text" onChange={(e) => setUserId(+e.target.value)} />
      <button onClick={login}>login</button>
    </main>
  );
}
