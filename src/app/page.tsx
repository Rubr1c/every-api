'use client';

import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [userId, setUserId] = useState<number>();

  async function login() {
    const res = await axios.post('/api/auth/login', {
      id: userId,
    });

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
