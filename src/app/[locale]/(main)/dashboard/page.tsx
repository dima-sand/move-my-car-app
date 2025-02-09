'use client';

import { useTranslations } from "next-intl";
import { Box, Container, Divider, Grid2 as Grid, IconButton, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { GridSection } from "@/ui/components/common";
import VehicleCard from "@/ui/components/cards/VehicleCard";
import React, { useState } from "react";
import CallCard from "@/ui/components/cards/CallCard";
import { deleteCarCall, saveCarLocation, toggleCarCallIsRead } from "@/redux/user/actions";
import GeoDashboardSection from "@/ui/components/dashboardSections/Geo";
import { changeVehicleInfoModalMode } from "@/redux/core/actions";
import QrCode2Icon from '@mui/icons-material/QrCode2';
import DownloadIcon from '@mui/icons-material/Download';
import { coreActions } from "@/redux/core";
import theme from "@/ui/theme";



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
      <Container
        maxWidth="md"
        sx={{
          width: '100%',
          display: 'flex',
          // flexDirection: 'column',
          // justifyContent: 'start', alignItems: 'center',
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

      </Container>
      <IconButton
        onClick={handleOnMinimizeVehicleList}
        size="large"
      >
        {isVehicleListMinimized ? <ExpandMoreIcon /> : <ExpandLessIcon />}
      </IconButton>
      <Container
        maxWidth="md"
        sx={{
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          background: 'linear-gradient(#2976D1, #000D1A)',
          width: '100%',
          height: '100%',
          py: 1,
          // pb: "56px",
        }}
      >
        <Grid
          container
          spacing={1.5}
          sx={{ mt: 1 }}
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
                width: '60%', height: 'auto',
                p: 0, m: 0,
              }}
            />
            <IconButton
              // sx={{ p: 0 }}
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
                selectedCar.carCalls.map((call, index) =>
                  <React.Fragment key={call.id}>
                    <CallCard
                      key={call.id}
                      call={call}
                      langContent={content.callsSection}
                      getLangText={getLangText}
                      onToggleIsRead={handleToggleIsRead}
                      onDeleteCarCall={handleDeleteCarCall}
                    />
                    {
                      index !== selectedCar.carCalls.length - 1 &&
                      <Divider
                        sx={{ backgroundColor: "#FFFFFF" }}
                        variant="middle"
                      />
                    }
                  </React.Fragment>
                )
              }

            </Box>
          </GridSection>
        </Grid>
      </Container>
    </>
  );
}
