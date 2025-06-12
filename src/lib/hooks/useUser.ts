'use client';

import { api } from '@/global/api/api';
import { UserDTO } from '@/types/user';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export function useUser(): UserDTO | undefined {
  const router = useRouter();
  const { data, isError } = useQuery({
    queryKey: ['user'],
    queryFn: api.user.get,
  });

  if (isError) {
    router.push('/login');
  }

  return data;
}
