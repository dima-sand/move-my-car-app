'use client';

import callUserService from "@/api/services/external/callUser";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

interface ICallUserFormProps {
  userName: string;
  carNumber: string;
  carName: string;
}

export default function CallUserForm(props: ICallUserFormProps) {
  const { userName, carNumber, carName } = props;
  const [text, setText] = useState('');
  const [callResult, setCallResult] = useState<'success' | 'error'>();

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
      {/* {userName && <Typography variant="h6">User name: {userName}</Typography>} */}
      {carName && <Typography variant="h6">{t('carName')}: {carName}</Typography>}
      {carNumber && <Typography variant="h6">{t('carNumber')}: {carNumber}</Typography>}
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