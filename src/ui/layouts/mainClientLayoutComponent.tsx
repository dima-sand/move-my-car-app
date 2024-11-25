'use client';
import { onMessage } from "firebase/messaging";

import { useAppSelector } from "@/redux/hooks";
import { Loader } from "@/ui/components/common"
import { SignInModal } from "@/ui/components/modals";
import { messaging } from "../../../firebase";
import { useEffect } from "react";
import { Typography } from "@mui/material";


export const ClientLayoutComponent = () => {
  const isLoading = useAppSelector((state) => state.core.loading);

  useEffect(() => {
    messages();
  }, [])
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
      {isLoading && <Loader isfullscreen />}
      <Typography
        sx={{
          position: 'absolute',
          bottom: 30,
          right: 30,
        }}
        variant="h6"
      >
        Pre-alpha version
      </Typography>
    </>
  );
}