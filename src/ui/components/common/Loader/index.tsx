import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { SxProps } from '@mui/material';
import { Theme } from '@mui/system';

interface ILoaderProps {
  size?: 'small' | 'medium' | 'large';
  isfullscreen?: boolean;
}

export default function Loader(props: ILoaderProps & CircularProgressProps) {
  const {
    isfullscreen,
    size,
    ...restProps
  } = props;

  const calculatedSize = (function(){
    switch (size) {
      case 'small':
        return 40;
      case 'medium':
        return 70;
      case 'large':
        return 100;
      default:
        return 70;
    }
  })();


  const fullScreenProps: SxProps<Theme> = {
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    height: '100dvh', width: '100vw', position: 'absolute', top: 0, left: 0,
    zIndex: 9999, backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(2px)'
  };
  return (
    <Box
      sx={isfullscreen ? fullScreenProps : undefined}
      >
      <CircularProgress
        {...restProps}
        size={calculatedSize}
        color='secondary'
        />
    </Box>
  );
}
