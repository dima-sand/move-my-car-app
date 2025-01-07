'use client';

import callUserService from "@/api/services/external/callUser";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useAppDispatch } from "@/redux/hooks";
import { coreActions } from "@/redux/core";

interface ICallUserFormProps {
  userName: string;
  carNumber: string;
  carName: string;
  autoMessage: string;
}

export default function CallUserForm(props: ICallUserFormProps) {
  const { userName, carNumber, carName, autoMessage } = props;
  const [text, setText] = useState('');
  const [callResult, setCallResult] = useState<'success' | 'error'>();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(coreActions.hideLoader());
  }, []);

  const carId = useSearchParams().get('carId');

  const t = useTranslations('CallUserPage');

  const langContent = {
    title: t('title'),
    message: t('message'),
    sendBtn: t('sendBtn'),
    notFound: t('notFound'),
    error: t('error'),
    success: t('success'),
    carNumber: t('carNumber'),
    carName: t('carName'),
    autoMessage: t('autoMessage'),
  }

  if (!carId) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          mt: 2,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: 'red',
          }}
        >
          {langContent.notFound}
        </Typography>
      </Box>
    );
  }

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { data } = await callUserService({
        carId,
        message: text,
        userName: userName,
      });
      if (data?.success) {
        setCallResult('success');
      } else {
        setCallResult('error');
      }
    } catch (error) {
      console.log({ error });
      setCallResult('error');
    }
  };

  if (callResult === 'success' || callResult === 'error') {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          mt: 2,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: callResult === 'error' ? 'red' : 'green',
          }}
        >
          {t(callResult === 'error' ? 'error' : 'success')}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height: '100%', position: 'relative',
      }}
    >
      {carName && <Typography variant="h6">{langContent.carName}: {carName}</Typography>}
      {carNumber && <Typography variant="h6">{langContent.carNumber}: {carNumber}</Typography>}
      {autoMessage && <Typography variant="h6">{langContent.autoMessage}: {autoMessage}</Typography>}
      <Box
        component='form'
        noValidate
        autoComplete="off"
        onSubmit={handleOnSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          mt: 2,
        }}
      >
        <TextField
          id="outlined-multiline-static"
          label={langContent.message}
          multiline
          rows={4}
          value={text}
          // defaultValue="Default Value"
          onChange={(e) => setText(e.target.value)}
          sx={{
            minWidth: '300px',
          }}
        />
        <Button type="submit">{langContent.sendBtn}</Button>
      </Box>
    </Box>
  );
};
