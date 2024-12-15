import type { Metadata } from "next";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

import StoreProvider from "@/redux/providers/StoreProvider";
import "./globals.css";
import { ClientLayoutComponent } from "@/ui/layouts/mainClientLayoutComponent";
import { CarInfoModal } from "@/ui/components/modals";
import { cookies } from "next/headers";
import { CookieNames } from "@/constants/common";
import { RoutePaths } from "@/constants/routes";
import { navigateToServerAction } from "../actions";

export const metadata: Metadata = {
  title: "MoveMyCar app",
  description: "Here will be a description of the app",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  // const cookieStore = await cookies();
  // if (cookieStore.has(CookieNames.access_token)) {
  //   console.log('Redirect to auth page');
    
  //   await navigateToServerAction(RoutePaths.AuthPage);
  //   // return;
  // }

  const messages = await getMessages();
  const { locale } = await params;
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages} >
          <StoreProvider>
            <ClientLayoutComponent />
            <CarInfoModal />
            {children}
          </StoreProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
