'use server';
import { redirect, RedirectType } from 'next/navigation';

import { RoutePaths } from '@/constants/routes';
import { cookies } from 'next/headers';

export async function navigateToServerAction(url: RoutePaths) {
  const locale = (await cookies()).get('NEXT_LOCALE')?.value ?? 'en'
  const newUrl = `/${locale}${url}`;
  redirect(newUrl, RedirectType.push);
};
