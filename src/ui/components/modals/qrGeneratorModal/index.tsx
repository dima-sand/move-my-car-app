import { robotoFont } from "@/app/[locale]/fonts/encodedGeistVF";
import { pdfGeneratorConstants } from "@/constants/pdfGenerator";
import { coreActions } from "@/redux/core";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getSelectedCarSelector } from "@/redux/user/selectors";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, Grid2, IconButton, Checkbox, FormControlLabel, FormGroup, TextField } from "@mui/material";
import jsPDF from "jspdf";
import qrcode from "qrcode-generator";
import { GridSection } from "../../common";
import DownloadIcon from '@mui/icons-material/Download';
import { useTranslations, useLocale } from "next-intl";
import { LocaleLang } from "@/models/locales";
import { Fragment, useState } from "react";



const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

const QRGeneratorModal = () => {

  const dispatch = useAppDispatch();

  const userInfo = useAppSelector((state) => state.user.userInfo!);
  const isOpen = useAppSelector(state => state.core.qrGeneratorModalState);
  const selectedCar = useAppSelector(getSelectedCarSelector);

  const tLangList = useTranslations('Common.langList');

  const t = useTranslations('DashboardPage.qrModal');

  const locale = useLocale() as LocaleLang;


  const langTextSource = Object.fromEntries(
    Object.entries(pdfGeneratorConstants.mainText).sort(([keyA], [keyB]) => {
      if (keyA === locale) return -1;
      if (keyB === locale) return 1;
      return 0;
    })
  );

  const callUserUrl = `${APP_URL}/callUser/${userInfo.userName}?carId=${selectedCar.id}`;

  const [pdfLangs, setPdfLangs] = useState(
    Object.keys(langTextSource).reduce((acc, key) => {
      acc[key] = '';
      return acc;
    }, {} as Record<string, string>));

  const generateQRCode = (text: string) => {
    const tag = qrcode(5, "L");
    tag.addData(text);
    tag.make();
    return tag.createDataURL(10);
  };
  const handleDownloadQRImage = () => {
    const dataUrl = generateQRCode(callUserUrl);
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'image.png';
    link.click();
    return dataUrl;
  };

  const handleGeneratePDF = () => {
    const doc = new jsPDF();

    doc.addFileToVFS("Roboto.ttf", robotoFont);
    doc.addFont("Roboto.ttf", "Roboto", "normal");
    doc.setFont("Roboto");

    const qrCodeDataURL = generateQRCode(callUserUrl);

    const pageWidth = doc.internal.pageSize.getWidth();
    const imageWidth = pageWidth * 0.8;
    const imageHeight = imageWidth;
    const x = (pageWidth - imageWidth) / 2;
    const y = 20;
    doc.addImage(qrCodeDataURL, "PNG", x, y, imageWidth, imageHeight);

    doc.setFontSize(20);

    const textForPdf = Object.keys(pdfLangs).reduce((acc, key) => {
      if (pdfLangs[key] && pdfLangs[key] !== '') {
        acc[key] = pdfLangs[key];
      }
      return acc;
    }, {} as Record<string, string>);

    Object.values(textForPdf).forEach((text, index) => {
      doc.text(
        text,
        pageWidth / 2,
        y + imageHeight + (15 * (index + 1)),
        {
          align: "center",
          maxWidth: pageWidth - 20,
        }
      );
    });

    doc.save("QRcode.pdf");
  };

  const handleOnClose = () => {
    dispatch(coreActions.setQrGeneratorModalState(false));
  };

  const handleOnChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setPdfLangs(prev => ({
      ...prev,
      [name]: checked ? langTextSource[name] : '',
    }))
  };

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (value.length < 55) {
      setPdfLangs(prev => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const langContent = {
    title: t("title"),
    downloadImage: t("downloadImage"),
    generatePDFwithText: t("generatePDFwithText"),
    cancelBtn: t("cancelBtn"),
    generatePDF: t("generatePDF"),
  }

  return (
    <Dialog
      fullScreen
      open={isOpen}
      onClose={handleOnClose}
    >
      <DialogTitle>{langContent.title}</DialogTitle>
      <DialogContent>
        <Grid2 container rowSpacing={1.5} >
          <GridSection size={{ xs: 12 }}>

            <Typography color="secondary">{langContent.downloadImage}</Typography>
            <IconButton
              // sx={{ p: 0 }}
              color="info"
              onClick={handleDownloadQRImage}>
              <DownloadIcon color="secondary" fontSize="large" />
            </IconButton>
          </GridSection>
          <GridSection size={{ xs: 12 }}>

            <Typography color="secondary">{langContent.generatePDFwithText}</Typography>
            <FormGroup sx={{ width: '90%', my: 2, }}>
              {
                Object.entries(pdfLangs).map(([lang, text]) => {
                  const isSelected = Object.entries(pdfLangs).some(([l, t]) => l === lang && t.trim() !== '');
                  return (
                    <Fragment key={lang}>
                      <FormControlLabel
                        name={lang}
                        color="secondary"
                        control={<Checkbox
                          checked={isSelected}
                          onChange={handleOnChangeCheckbox}
                        />}
                        label={<Typography color="secondary">{tLangList(lang as LocaleLang)}</Typography>}
                      />
                      {
                        isSelected &&
                        <TextField
                          id="outlined-multiline-flexible"
                          // label="Multiline"
                          multiline
                          color="secondary"
                          maxRows={3}
                          value={text}
                          name={lang}
                          onChange={handleChangeText}
                          sx={theme => ({
                            '& .MuiInputBase-input': {
                              color: theme.palette.secondary.main,
                            }
                          })}
                        />
                      }
                    </Fragment>
                  );
                })
              }
            </FormGroup>
            <Button onClick={handleGeneratePDF}>{langContent.generatePDF}</Button>
          </GridSection>
        </Grid2>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={handleOnClose}>{langContent.cancelBtn}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default QRGeneratorModal;