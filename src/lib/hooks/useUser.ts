'use client';

import { api } from '@/global/api/api';
import { UserDTO } from '@/types/user';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function useUser(): UserDTO | undefined {
  const router = useRouter();
  const { data, isError } = useQuery({
    queryKey: ['user'],
    queryFn: api.user.get,
  });

  useEffect(() => {
    if (isError) router.push('/login');
  }, [isError, router]);

  return data;
}
