'use client';

import { useTranslations } from "next-intl";
import { Box, Grid2 as Grid, IconButton, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { GridSection } from "@/ui/components/common";
// import { saveCarLocation, toggleCarCallIsRead } from "@/redux/user/actions";
import VehicleCard from "@/ui/components/cards/VehicleCard";
import { useState } from "react";
import CallCard from "@/ui/components/cards/CallCard";
import { deleteCarCall, saveCarLocation, toggleCarCallIsRead } from "@/redux/user/actions";
import GeoDashboardSection from "@/ui/components/dashboardSections/Geo";
import { changeVehicleInfoModalMode } from "@/redux/core/actions";
import QrCode2Icon from '@mui/icons-material/QrCode2';
import DownloadIcon from '@mui/icons-material/Download';
import { coreActions } from "@/redux/core";



export default function DashboardPage() {
  const userInfo = useAppSelector((state) => state.user.userInfo!);
  const selectedCarIndex = useAppSelector((state) => state.user.selectedCarIndex);

  const [isVehicleListMinimized, setIsVehicleListMinimized] = useState(true);

  const handleOnMinimizeVehicleList = () => setIsVehicleListMinimized(prev => !prev);

  const selectedCar = userInfo.cars[selectedCarIndex];

  const { carLocation } = userInfo.cars[selectedCarIndex];

  const dispatch = useAppDispatch();

  const t = useTranslations('DashboardPage');
  const getLangText = useTranslations('Common.langList');

  const content = {
    title: t('title'),
    userSection: {
      title: t('userSection.title'),
      userName: t('userSection.userName'),
    },
    carSection: {
      title: t('carSection.title'),
    },
    callsSection: {
      title: t('callsSection.title'),
      dateTime: t('callsSection.dateTime'),
      language: t('callsSection.language'),
      text: t('callsSection.text'),
    },
    geoSection: {
      title: t('geoSection.title'),
      saveCarPosition: t('geoSection.saveCarPosition'),
      buildRoute: t('geoSection.buildRoute'),
    },
  };




  const handleToggleIsRead = (callId: string) => {
    dispatch(toggleCarCallIsRead({
      callId,
      carId: selectedCar.id
    }))
  };

  const handleDeleteCarCall = (callId: string) => {
    dispatch(deleteCarCall({
      callId,
      carId: selectedCar.id
    }))
  };

  const handleOnChangeVehicleInfo = (index: number | null) =>
    dispatch(changeVehicleInfoModalMode(index));

  const handleOnSavePosition = (args: any) => dispatch(saveCarLocation(args));


  const handleOpenQRGeneratorModal = () => {
    dispatch(coreActions.setQrGeneratorModalState(true));
  }

  return (
    <>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
        }}
      >
        {userInfo.cars.map(({ index, carName, carNumber }) => (
          <VehicleCard
            key={index}
            isSelected={index === selectedCarIndex}
            carName={carName}
            carNumber={carNumber}
            isMinimized={isVehicleListMinimized}
            onChangeVehicleInfo={() => handleOnChangeVehicleInfo(index)}
          />
        ))}

      </Box>
      <IconButton
        onClick={handleOnMinimizeVehicleList}
        size="large"
      >
        {isVehicleListMinimized ? <ExpandMoreIcon /> : <ExpandLessIcon />}
      </IconButton>
      <Grid
        sx={{ mt: 1 }}
        container
        spacing={1.5}
      >
        <GeoDashboardSection
          carLocation={carLocation}
          saveCarLocation={handleOnSavePosition}
          selectedCar={selectedCar}
        />

        <GridSection size={{ xs: 6 }}>
          <QrCode2Icon
            sx={{
              fontSize: 'auto', textAlign: 'center',
              width: '80%', height: 'auto',
              p: 0, m: 0,
            }}
          />
          <IconButton
            sx={{ p: 0 }}
            color="info"
            onClick={handleOpenQRGeneratorModal}>
            <DownloadIcon fontSize="large" />
          </IconButton>
        </GridSection>

        <GridSection size={{ xs: 12 }}>
          <Typography
            sx={{ textAlign: 'center' }}>
            {content.callsSection.title}
          </Typography>
          <Box display='flex' flexDirection='column' sx={{ width: '100%' }} >

            {
              selectedCar.carCalls.map((call) =>
                <CallCard
                  key={call.id}
                  call={call}
                  langContent={content.callsSection}
                  getLangText={getLangText}
                  onToggleIsRead={handleToggleIsRead}
                  onDeleteCarCall={handleDeleteCarCall}
                />
              )
            }
          </Box>
        </GridSection>
      </Grid>
    </>
  );
}
