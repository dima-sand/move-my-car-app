'use client';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";

import { useTranslations } from "next-intl";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { VehicleInfoModalMode } from "@/models/state/state/core";
import { getVehicleInfoToEditSelector } from "@/redux/user/selectors";
import { coreActions } from "@/redux/core";
import { ChangeEvent } from "react";
import { saveVehicleInfo } from "@/redux/user/actions";
import { WhiteInput } from "../common";



const VehicleInfoModal = () => {

  const { mode } = useAppSelector((state) => state.core.vehicleInfoModalState);
  const dispatch = useAppDispatch();

  const t = useTranslations('Common.vehicleInfoModal');


  // const { cars } = useAppSelector(getUserInfoSelector);
  const fields = useAppSelector(getVehicleInfoToEditSelector);

  const fieldNames: { [key: string]: string } = {
    carName: t('vehicleName'),
    carNumber: t('vehicleNumber'),
    autoMessage: t('autoMessage'),
    isVisibleCarName: t('isVisibleCarName'),
    isVisibleCarNumber: t('isVisibleCarNumber'),
  };

  const langContent = {
    title: t('title'),
    saveBtn: t('saveBtn'),
    cancelBtn: t('cancelBtn'),
  };

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(saveVehicleInfo());
  };

  const handleOnChangeVehicleInfo = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const updatedField = {
      [event.target.name]: event.target.value,
    }
    dispatch(coreActions.updateVehicleInfoField(updatedField));
  }

  const handleOnClose = () => {
    dispatch(coreActions.closeVehicleInfoModal());
  };

  // const fields: IEditVehicle = index === null ? defaultEditVehicleInfo : cars[index!];

  return (
    <>
      <Dialog
        open={mode !== VehicleInfoModalMode.Closed}
        onClose={handleOnClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleOnSubmit,
        }}
      >
        <DialogTitle>
          <Typography color="secondary">
            {langContent.title}
          </Typography>
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText>Content</DialogContentText> */}
          {
            Object.entries(fields)
              .map(([key, value]) => {
                if (typeof value === 'string') {
                  return (
                    <WhiteInput
                      key={key}
                      name={key}
                      label={fieldNames[key]}
                      type='text'
                      value={value}
                      onChange={handleOnChangeVehicleInfo}
                    />
                  );
                } else {
                  return null;
                }
              })
          }
        </DialogContent>
        <DialogActions>
          <Button type="submit">{langContent.saveBtn}</Button>
          <Button color="error" variant='outlined' onClick={handleOnClose}>{langContent.cancelBtn}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default VehicleInfoModal;
