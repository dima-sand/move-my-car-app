import { Box, Button, Stack, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { userActions } from "../../../../redux/user";
import { coreActions } from "../../../../redux/core";
import { SignInModalMode } from "../../../../models/state/state/core";
import { RoutePaths } from "../../../../constants/routes";


const AccountPage = () => {

  const dispatch = useDispatch();
  // const { t } = useTranslation('accountPage');

  const handleLogout = () => {
    dispatch(userActions.logout());
  };

  const handleChangePassword = () => {
    dispatch(coreActions.setSignInModalMode(SignInModalMode.ChangePassword));
  };

  // const langContent = {
  //   title: t('title'),
  //   changePasswordBtn: t('changePasswordBtn'),
  //   logoutBtn: t('logoutBtn'),
  // };

  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100%">
      <Typography
        variant="h5"
        component="span"
        >title</Typography>
      <Stack width={"100%"} >
        <Button
          sx={{ mt: 2 }}
          variant="contained"
          fullWidth
          onClick={handleChangePassword}
          >Change Pass</Button>
        <Button
          sx={{ mt: 2 }}
          variant="contained"
          fullWidth
          color="error"
          onClick={handleLogout}
          >logout</Button>
      </Stack>
    </Box>
  );
};

export default AccountPage;