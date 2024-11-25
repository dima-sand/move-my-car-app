'use client';
import { RoutePaths } from "@/constants/routes";
import { usePathname, useRouter } from "@/i18n/routing";
import { useAppSelector } from "@/redux/hooks";
import { CarInfoModal } from "@/ui/components/modals";
import BottomNavigationBar from "@/ui/components/navigationBar";
import { Box, Container } from "@mui/material";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  
  const router = useRouter();
  const pathname = usePathname();
  const tBottomNavigationBar = useTranslations('Common.bottomNavigationBar');

  useEffect(() => {
    if(!isLoggedIn) {
      router.replace(RoutePaths.AuthPage);
    }
  },[isLoggedIn, router])

  
  const langContent = {
    accountPage: tBottomNavigationBar('accountPage'),
    dashboardPage: tBottomNavigationBar('dashboardPage'),
    settingsPage: tBottomNavigationBar('settingsPage'),
  }

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100dvh', }}>
      <Container
        maxWidth='md'
        sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'center', py:3 }}
        >
        {
          userInfo &&
          <>
            {children}
          </>
        }
      </Container>
      <BottomNavigationBar
        langContent={langContent}
        pathname={pathname}
        onRouteChange={router.push}
        />
      <CarInfoModal/>
    </Box>
  );
}