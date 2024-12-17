import type { Metadata } from "next";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

import StoreProvider from "@/redux/providers/StoreProvider";
import "./globals.css";
import { ClientLayoutComponent } from "@/ui/layouts/mainClientLayoutComponent";
import { CarInfoModal } from "@/ui/components/modals";

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
