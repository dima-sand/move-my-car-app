import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  // Validate that the incoming `locale` parameter is valid
  const locale = await requestLocale;
  if (!routing.locales.includes(locale as any)) notFound();

  return {
    // messages: (await import(`../../messages/${locale}.json`)).default,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
