import { TextField, TextFieldProps } from "@mui/material";



const WhiteInput = (props: TextFieldProps) => {

  return (
    <TextField
      variant="standard"
      fullWidth
      color="secondary"
      margin="dense"
      sx={theme => ({
        color: theme.palette.secondary.main,
        input: {
          color: theme.palette.secondary.main,

        },
      })}
      {...props}
    />
  );
}

export default WhiteInput;