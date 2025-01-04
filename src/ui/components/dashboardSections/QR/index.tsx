import { IconButton } from "@mui/material";
import { GridSection } from "../../common";
import QrCode2Icon from '@mui/icons-material/QrCode2';
import DownloadIcon from '@mui/icons-material/Download';
import qrcode from "qrcode-generator";

interface IQRDashboardSectionProps {
  callUserUrl: string;
}

export default function QRDashboardSection(props: IQRDashboardSectionProps) {

  const {
    callUserUrl,
  } = props;

  const handleDownload = () => {
    const tag = qrcode(5, 'L');
    tag.addData(callUserUrl);
    tag.make();
    const dataUrl = tag.createDataURL(10);
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'image.jpg';
    link.click();
    return dataUrl;
  };

  return (
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
        onClick={handleDownload}>
        <DownloadIcon fontSize="large" />
      </IconButton>
    </GridSection>
  );
}