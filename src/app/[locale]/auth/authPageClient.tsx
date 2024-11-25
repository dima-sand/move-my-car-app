'use client';
import { useEffect } from 'react';
import { Loader } from '@/ui/components/common';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { RoutePaths } from '@/constants/routes';
import { fetchUserInfo } from '@/redux/user/actions';
import { navigateTo } from '@/redux/core/actions';


const AuthPageClient = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch, isLoggedIn])

  return (
    <Loader size='large' />
  );
};

export default AuthPageClient;