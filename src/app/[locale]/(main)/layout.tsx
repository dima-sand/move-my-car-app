'use client';
import { RoutePaths } from "@/constants/routes";
import { usePathname, useRouter } from "@/i18n/routing";
import { navigateTo } from "@/redux/core/actions";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { CarInfoModal } from "@/ui/components/modals";
import BottomNavigationBar from "@/ui/components/navigationBar";
import { Box, Container } from "@mui/material";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { messaging } from "../../../../firebase";
import { onMessage } from "firebase/messaging";
import { fetchUserInfo } from "@/redux/user/actions";
import Toast from "@/ui/components/common/Toast";
import { coreActions } from "@/redux/core";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const tBottomNavigationBar = useTranslations('Common.bottomNavigationBar');

  const { isLoggedIn, userInfo } = useAppSelector((state) => state.user);
  const { infoMessage } = useAppSelector((state) => state.core);

  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(navigateTo(RoutePaths.AuthPage));
    }
  }, [dispatch, isLoggedIn, router])

  useEffect(() => {
    messages();
  }, []);

  const messages = async () => {
    const fcmMessaging = await messaging();
    if (fcmMessaging) {
      onMessage(fcmMessaging, (payload) => {
        console.log({ payload });
        dispatch(fetchUserInfo());
        dispatch(coreActions.setInfoMessage(payload.notification?.title));
      });

    }
  };

  const handleCloseToast = () => {
    dispatch(coreActions.setInfoMessage(''));
  };

  const langContent = {
    accountPage: tBottomNavigationBar('accountPage'),
    dashboardPage: tBottomNavigationBar('dashboardPage'),
    settingsPage: tBottomNavigationBar('settingsPage'),
  }

  if (!isLoggedIn) {
    return <></>;
  }

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100dvh',
    }}>
      <Container
        maxWidth='md'
        sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'center', py: 3 }}
      >
        {userInfo ? children : null}
      </Container>
      <BottomNavigationBar
        langContent={langContent}
        pathname={pathname}
        onRouteChange={router.push}
      />
      <CarInfoModal />
      <Toast
        text={infoMessage}
        onCloseToast={handleCloseToast}
      />
    </Box>
  );
}