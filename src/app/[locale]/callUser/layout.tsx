import { Box } from "@mui/material";

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
    </Box>
  );
}