'use client';
import { Button, Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";

import { useAppDispatch } from "@/redux/hooks";
import { SignInModalMode } from "@/models/state/state/core";
import { coreActions } from "@/redux/core";
import { fetchLogout } from "@/redux/user/actions";


export default function AccountPage() {

  const dispatch = useAppDispatch();
  const t = useTranslations('AccountPage');

  const handleLogout = () => {
    dispatch(fetchLogout());
  };

  const handleChangePassword = () => {
    dispatch(coreActions.setSignInModalMode(SignInModalMode.ChangePassword));
  };

  const langContent = {
    title: t('title'),
    changePasswordBtn: t('changePasswordBtn'),
    logoutBtn: t('logoutBtn'),
  };

  return (
    <>
      <Typography
        variant="h4"
        component="h1"
      >
        {langContent.title}

      </Typography>
      <Stack width={"100%"} >
        <Button
          sx={{ mt: 2 }}
          variant="contained"
          fullWidth
          onClick={handleChangePassword}
        >{langContent.changePasswordBtn}</Button>
        <Button
          sx={{ mt: 2 }}
          variant="contained"
          fullWidth
          color="error"
          onClick={handleLogout}
        >{langContent.logoutBtn}</Button>
      </Stack>
    </>
  );
};