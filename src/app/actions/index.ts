'use server';
import { redirect, RedirectType } from 'next/navigation';

import { RoutePaths } from '@/constants/routes';
import { cookies } from 'next/headers';

export async function navigateToServerAction(
  url: RoutePaths,
  redirectType: RedirectType = RedirectType.push
): Promise<void> {
  const newUrl = `/${
    (await cookies()).get('NEXT_LOCALE')?.value ?? 'en'
  }${url}`;
  await redirect(newUrl, redirectType);
}
