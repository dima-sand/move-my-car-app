'use client';
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Loader } from "@/ui/components/common"
import { CarInfoModal, SignInModal } from "@/ui/components/modals";
import { useEffect } from "react";
import { ThemeProvider, Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import { CallUserPagePath } from "@/constants/routes";
import { checkLogin } from "@/redux/user/actions";
import theme from "@/ui/theme";


export const ClientLayoutComponent = ({ children }: { children: React.ReactNode }) => {
  const isLoading = useAppSelector((state) => state.core.loading);
  const logInChecked = useAppSelector((state) => state.user.logInChecked);

  const dispatch = useAppDispatch();
  const pathname = usePathname();

  const isCallUserPage = pathname.includes(CallUserPagePath);

  useEffect(() => {
    if (!logInChecked && !isCallUserPage) {
      dispatch(checkLogin());
    }
  }, [logInChecked, pathname]);

  return (
    <ThemeProvider theme={theme}>

      <SignInModal />
      {((isLoading || !logInChecked) && !isCallUserPage) && <Loader isfullscreen />}
      {children}
      <Typography
        sx={{
          position: 'absolute',
          bottom: 55,
          right: 30,
        }}
        variant="h6"
      >
        Pre-alpha version
      </Typography>
      <CarInfoModal />
    </ThemeProvider>
  );
}