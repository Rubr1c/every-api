'use client';

import { useState } from 'react';
import { api } from '@/global/api/api';
import { useUser } from '@/lib/hooks/useUser';

export default function Home() {
  const user = useUser();

  if (!user) {
    return null;
  }

  return (
    <div>
      <h1 className='text-black'>{user.username}</h1>
    </div>
  );
}
