'use client';

import { useState } from 'react';
import { api } from '@/global/api/api';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [userId, setUserId] = useState<number>();

  async function login() {
    if (!userId) return;
    try {
      await api.auth.login(userId);
      router.push('/');
    } catch (error: unknown) {
      console.log(error);
    }
  }

  return (
    <>
      <input type="text" onChange={(e) => setUserId(+e.target.value)} />
      <button onClick={login}>login</button>
    </>
  );
}
