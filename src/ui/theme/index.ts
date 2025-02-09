import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976D2',
    },
    secondary: {
      main: '#000D1A',
    },
    error: {
      main: '#ff0000',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#000000',
    },
    background: {
      default: '#000D1A',
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained',
      },
      styleOverrides: {
        root: {
          borderRadius: '10px',
          fontWeight: '600',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#FFFFFF',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
          fontSize: '12px',
        },
      },
    },
    MuiAlert: {
      defaultProps: {
        variant: 'filled',
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          color: 'rgba(255, 255, 255, 0.7)',
        },
      },
    },
    MuiDialog: {
      styleOverrides:{
        paper: {
          borderRadius: '20px'
        }
      }
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          overflowX: 'scroll',
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          gap: '10px',
          padding: '8px 10px',
        },
      },
    },
    MuiMenuList: {
      styleOverrides: {
        root: {
          backgroundColor: 'primary',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: '#000000',
        },
      }
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          color: '#FFFFFF',
        },
      },
    },
  },
});

export default theme;
