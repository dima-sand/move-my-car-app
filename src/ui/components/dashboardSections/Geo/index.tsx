import { Box, Button, SxProps, Typography } from "@mui/material"
import { useTranslations } from "next-intl";
import MyLocationIcon from '@mui/icons-material/MyLocation';
import DeleteIcon from '@mui/icons-material/Delete';

import { ISaveCarLocationPayload } from "@/api/services/user/carServices/saveCarLocation";
import { ICar, ICarLocation } from "@/models/state/state/user/car";
import { GridSection } from "../../common"

interface IGeoSectionProps {
  selectedCar: ICar;
  carLocation: ICarLocation | null;
}

interface IGeoSectionDispatchProps {
  saveCarLocation: (payload: ISaveCarLocationPayload | null) => void;
}

const MAPS_URL = process.env.NEXT_PUBLIC_MAPS_URL;


const geoPaperSX: SxProps = {
  width: '100%',
  py: 1,
  px: 2,
  borderRadius: 3,
  fontSize: '.8rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  backgroundColor: '#FFFFFF70',
  color: 'black'
};

const GeoDashboardSection = (props: IGeoSectionProps & IGeoSectionDispatchProps) => {

  const {
    carLocation,
    selectedCar,
    // actions
    saveCarLocation,
  } = props;

  const t = useTranslations('DashboardPage.geoSection');

  const langContent = {
    title: t('title'),
    saveCarPosition: t('saveCarPosition'),
    deleteSavedPosition: t('deleteSavedPosition'),
    buildRoute: t('buildRoute'),
  }


  const handleOnSavePosition = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      saveCarLocation({
        carId: selectedCar.id,
        carLocation: {
          lat: latitude,
          lng: longitude,
        }
      });
    })
  }

  const handleOnDeleteCarLocation = () => {
    saveCarLocation({
      carId: selectedCar.id,
      carLocation: null,
    });
  }
  return (
    <GridSection
      size={{ xs: 6 }}
      paperSxProp={{
        justifyContent: 'start',
      }}
    >
      <Typography sx={{ textAlign: 'center' }}>{langContent.title}</Typography>
      <Box
        sx={{
          display: 'flex', flexDirection: 'column', justifyContent: 'space-around',
          alignItems: 'center', height: '100%',
        }}
      >
        {
          carLocation ? (
            <Button
              sx={geoPaperSX}
              onClick={handleOnDeleteCarLocation}
            >
              <DeleteIcon />
              <Box sx={{ display: 'flex', flexDirection: 'column', }}>
                <Typography variant="body2">{langContent.deleteSavedPosition}</Typography>
              </Box>
            </Button>
          ) :
            <Button
              variant="contained"
              sx={geoPaperSX}
              onClick={handleOnSavePosition}
            >
              <MyLocationIcon fontSize="medium" />
              <Typography variant="body2">{langContent.saveCarPosition}</Typography>
            </Button>
        }
        {
          carLocation &&
          <Button
            variant="contained"
            sx={geoPaperSX}
            component="a"
            target="_blank"
            href={`${MAPS_URL}/${carLocation?.lat},${carLocation?.lng}`}
          >
            {langContent.buildRoute}
          </Button>
        }
      </Box>
    </GridSection>
  )
}

export default GeoDashboardSection;
