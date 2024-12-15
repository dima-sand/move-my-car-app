import { CookieNames } from "@/constants/common";
import AuthPageClient from "./authPageClient";
import { cookies } from 'next/headers'
import { navigateToServerAction } from "@/app/actions";
import { RoutePaths } from "@/constants/routes";
import { RedirectType } from "next/navigation";


export default async function AuthPage() {
  const cookieStore = await cookies();
  if (cookieStore.has(CookieNames.access_token)) {
    return <AuthPageClient />
  } else {
    await navigateToServerAction(RoutePaths.InitialPage, RedirectType.replace);
  }
};
