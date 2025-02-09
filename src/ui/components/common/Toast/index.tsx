import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertProps } from '@mui/material/Alert';

interface IToastProps {
  text: string;
  type?: AlertProps["severity"]
}

interface IToastDispatchProps {
  onCloseToast: () => void;
}

export default function Toast(props: IToastProps & IToastDispatchProps) {
  const {
    text,
    type,
    onCloseToast,
  } = props;

  const open = text.trim().length > 0

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onCloseToast}
      sx={(theme) => ({
        position: 'absolute',
        bottom: theme.spacing(9),
      })}
    >
      <Alert
        severity={type ?? "info"}
        onClose={onCloseToast}
        sx={{ width: '100%' }}
      >{text}</Alert>
    </Snackbar>
  );
}
