'use client';
import { useEffect, useState } from "react";
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField, Typography } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslations } from "next-intl";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { SignInModalErrorType, SignInModalMode } from "../../../models/state/state/core";
import { IField, getSignInModalConstants } from "../../../constants/components/signInModal";
import { fetchChangePassword, fetchLogin, fetchRegistration } from "../../../redux/user/actions";
import { coreActions } from "../../../redux/core";
import { WhiteInput } from "../common";


// type SignInModalErrorType = 'password' | 'repeatPassword' | 'userName' | 'carName' | 'carNumber';

const SignInModal = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const dispatch = useAppDispatch();
  const handleChangeModalMode = (mode: SignInModalMode) => {
    dispatch(coreActions.setSignInModalMode(mode));
  };
  const { mode, errorType } = useAppSelector((state) => state.core.signInModalState);

  const t = useTranslations('Common.signInForm');

  useEffect(() => {
    if (mode === SignInModalMode.Closed) {
      setPasswordVisible(false);
    }
  }, [mode])

  const langContent = {
    registerTitle: t('registerTitle'),
    password: t('password'),
    loginTitle: t('loginTitle'),
    registerDescription: t('registerDescription'),
    loginBtn: t('loginBtn'),
    registerBtn: t('registerBtn'),
    cancelBtn: t('cancelBtn'),
  };

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());

    if (mode === SignInModalMode.Register) {

      const { userName, password, carName, carNumber } = formJson;
      dispatch(fetchRegistration({ userName, password, carName, carNumber }));
    } else if (mode === SignInModalMode.Login) {
      const { userName, password } = formJson;
      dispatch(fetchLogin({ userName, password }));
    } else if (mode === SignInModalMode.ChangePassword) {
      const { oldPassword, newPassword, repeatPassword } = formJson;

      if (repeatPassword !== newPassword) {
        dispatch(coreActions.setSignInModalErrorType(SignInModalErrorType.WrongRepeatPassword))
        // setErrorMsg('Пароли не совпадают');
        return;
      }
      dispatch(fetchChangePassword({ oldPassword, newPassword }));
    }
  };

  const signInMocalConstants = getSignInModalConstants({
    userName: t('userName'),
    password: t('password'),
    repeatPassword: t('repeatPassword'),
    newPassword: t('newPassword'),
    carName: t('carName'),
    carNumber: t('carNumber'),
    changeBtn: t('changeBtn'),
  });

  const fields = {
    [SignInModalMode.Register]: signInMocalConstants.registerModal.getFields(),
    [SignInModalMode.Login]: signInMocalConstants.loginModal.getFields(),
    [SignInModalMode.ChangePassword]: signInMocalConstants.changePasswordModal.getFields(),
    [SignInModalMode.Closed]: [] as IField[],
  }
  return (
    <>
      <Dialog
        open={mode !== SignInModalMode.Closed}
        onClose={() => handleChangeModalMode(SignInModalMode.Closed)}
        PaperProps={{
          component: 'form',
          onSubmit: handleOnSubmit,
        }}
      >
        <DialogTitle color="secondary">{mode === SignInModalMode.Register ? langContent.registerTitle : langContent.loginTitle}</DialogTitle>
        {errorType !== null && <Alert severity="error" >{errorType} </Alert>}
        <IconButton
          aria-label="close"
          onClick={() => handleChangeModalMode(SignInModalMode.Closed)}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.secondary.main,
          })}
          color="secondary"
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          {mode === SignInModalMode.Register &&
            <DialogContentText>{langContent.registerDescription}</DialogContentText>
          }
          {
            fields[mode]?.map(({ id, label, type, required }) => (
              <WhiteInput
                key={id}
                autoFocus={id === 'userName'}
                required={required}
                id={id}
                name={id}
                label={label}
                type={
                  type === 'password'
                    ? passwordVisible ? 'text' : 'password'
                    : type
                }
                // color="primary"
                slotProps={{
                  input: {
                    renderSuffix(state) {
                      if (type === 'password' && state.filled) {
                        return (
                          <IconButton
                            sx={{
                              color: 'secondary.main',
                            }}
                            onClick={() => setPasswordVisible(prev => !prev)}
                          >
                            {passwordVisible
                              ? <VisibilityOffIcon />
                              : <VisibilityIcon />}
                          </IconButton>
                        );
                      } else return <></>;
                    },
                  }
                }}
              />
            ))
          }
        </DialogContent>
        <DialogActions
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
          }}
          disableSpacing
        >
          {mode === SignInModalMode.Register &&
            <Button
              // sx={{ flex: 1 }}
              fullWidth
              onClick={() => handleChangeModalMode(SignInModalMode.Login)}
            >
              {langContent.loginBtn}
            </Button>}
          {mode === SignInModalMode.Login &&
            <Button
              // sx={{ flex: 1 }}
              fullWidth
              onClick={() => handleChangeModalMode(SignInModalMode.Register)}
              variant="text"
              color="secondary"
            >
              {langContent.registerBtn}
            </Button>}
          <Button
            fullWidth
            // color="success"
            type="submit">
            {mode === SignInModalMode.ChangePassword
              ? signInMocalConstants.changePasswordModal.changePasswordBtn
              : mode === SignInModalMode.Register ? langContent.registerBtn : langContent.loginBtn}
          </Button>
        </DialogActions>
      </Dialog >
    </>
  );
};
{/* <Button
  fullWidth
  color="error"
  onClick={() => handleChangeModalMode(SignInModalMode.Closed)}>
  {langContent.cancelBtn}
</Button> */}

export default SignInModal;