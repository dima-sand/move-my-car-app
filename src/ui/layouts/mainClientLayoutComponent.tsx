'use client';
import { onMessage } from "firebase/messaging";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Loader } from "@/ui/components/common"
import { SignInModal } from "@/ui/components/modals";
import { messaging } from "../../../firebase";
import { useEffect } from "react";
import { Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { RoutePaths } from "@/constants/routes";
import { userActions } from "@/redux/user";
import { checkLogin } from "@/redux/user/actions";


export const ClientLayoutComponent = () => {
  const isLoading = useAppSelector((state) => state.core.loading);
  const logInChecked = useAppSelector((state) => state.user.logInChecked);
  const dispatch = useAppDispatch();

  const router = useRouter();


  useEffect(() => {
    if(!logInChecked) {
      dispatch(checkLogin());
    }
  },[logInChecked]);

  useEffect(() => {
    messages();
  }, []);

  const messages = async () => {
    const fcmMessaging = await messaging();
    if (fcmMessaging) {
      onMessage(fcmMessaging, (payload) => {
        console.log({ payload });
      });

    }
  }
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