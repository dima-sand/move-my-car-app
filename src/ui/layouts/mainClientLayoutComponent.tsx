'use client';
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Loader } from "@/ui/components/common"
import { SignInModal } from "@/ui/components/modals";
import { useEffect } from "react";
import { Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import { RoutePaths } from "@/constants/routes";
import { checkLogin } from "@/redux/user/actions";


export const ClientLayoutComponent = () => {
  const isLoading = useAppSelector((state) => state.core.loading);
  const logInChecked = useAppSelector((state) => state.user.logInChecked);

  const dispatch = useAppDispatch();
  const pathname = usePathname();

  useEffect(() => {
    const isCallUserPage = pathname.includes(RoutePaths.CallUserPage);
    if (!logInChecked && !isCallUserPage) {
      dispatch(checkLogin());
    }
  }, [logInChecked, pathname]);

  return (
    <>
      <SignInModal />
      {(isLoading || !logInChecked) && <Loader isfullscreen />}
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
    </>
  );
}