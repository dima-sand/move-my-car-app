'use client';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchUserInfo } from '@/redux/user/actions';

export default function AuthPageClient() {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [isLoggedIn])
  return null;
};
