import { Box, IconButton, Paper, PaperOwnProps, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import EditIcon from '@mui/icons-material/Edit';

interface IVehicleCardProps extends PaperOwnProps {
  isSelected: boolean;
  carName: string;
  carNumber: string;
  isMinimized: boolean;
  onChangeVehicleInfo: () => void;
}

const VehicleCard = (props: IVehicleCardProps) => {
  const {
    isSelected,
    carName,
    carNumber,
    isMinimized,
    // actions
    onChangeVehicleInfo,
  } = props;

  const t = useTranslations('DashboardPage.vehicleCard');



  const content = {
    title: t('title'),
    carName: t('carName'),
    carNumber: t('carNumber'),
  };

  return (
    <Paper
      sx={(theme) => ({
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
        p: 1, mr: 1, height: '100%', width: isMinimized ? '30vw' : '40vw',
        borderRadius: 3, border: isSelected ? '2px solid white' : 'none',
        backgroundColor: theme.palette.primary.main,
        position: 'relative',
      })}>
      {isMinimized ?
        <Typography sx={{ ml: 0.5 }} >
          {
            carName.trim().length === 0
              ? ' - '
              : carName
          }
        </Typography>
        : <>
          <Typography
            sx={{ textAlign: 'center' }}
          >{content.title}</Typography>
          <Box display='flex' flexWrap='wrap'>

            <Typography>{`${content.carName}:`}</Typography>
            <Typography sx={{ ml: 0.5 }} >
              {
                carName.trim().length === 0
                  ? ' - '
                  : carName
              }
            </Typography>
          </Box>
          <Box display='flex' flexWrap='wrap'>

            <Typography>{`${content.carNumber}: `}</Typography>
            <Typography
              sx={{ ml: 0.5 }}>
              {
                carNumber.trim().length === 0
                  ? ' - '
                  : carNumber
              }
            </Typography>
          </Box>
          {
            !isMinimized && (
              <IconButton
                sx={{ position: 'absolute', top: 0, right: 0 }}
                onClick={onChangeVehicleInfo}>
                <EditIcon />
              </IconButton>
            )
          }
        </>
      }

    </Paper>
  );
};

export default VehicleCard;