'use client';
import { SignInModalMode } from "@/models/state/state/core";
import { coreActions } from "@/redux/core";
import { useAppDispatch } from "@/redux/hooks";
import WelcomeHeader from "@/ui/components/headers/WelcomeHeader";
import { Box, Button, Container, Typography } from "@mui/material";
import { useTranslations } from "next-intl";

export default function Home() {


  const dispatch = useAppDispatch();

  const t = useTranslations('WelcomePage');

  const content = {
    title: t('title'),
    loginBtn: t('btns.loginBtn'),
    registerBtn: t('btns.registerBtn'),
  };

  const handleChangeModalMode = (mode: SignInModalMode) => {
    dispatch(coreActions.setSignInModalMode(mode));
  };

  return (
    <>
      <main>
        <WelcomeHeader />
        <Container
          maxWidth='md'
          sx={{
            py: 3,
            height: "100dvh",
          }}>
          <Box
            sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', }}
          >
            <Typography variant="h4" component='h1'>
              {content.title}
            </Typography>
            <Box
              sx={{ display: 'flex', mt: 3 }}
            >
              <Button onClick={() => handleChangeModalMode(SignInModalMode.Login)} >
                {content.loginBtn}
              </Button>
            </Box>
          </Box>
        </Container>
      </main>
    </>
  );
}
