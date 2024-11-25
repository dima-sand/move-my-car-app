import { Box, Typography } from "@mui/material";




export default function CallUserLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100dvh',
      p: 2,
      position: 'relative',
    }}>
      {children}
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
    </Box>
  );
}