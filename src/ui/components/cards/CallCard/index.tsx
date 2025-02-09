import { useState } from "react";
import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { LocaleLang } from "@/models/locales";
import { ICarCall } from "@/models/state/state/user/car";


interface ICallCardProps {
  call: ICarCall;
  langContent: {
    dateTime: string;
    text: string;
    language: string;
  };
  getLangText: (lang: LocaleLang) => string;
  onToggleIsRead: (callId: string) => void;
  onDeleteCarCall: (callId: string) => void;
}


const CallCard = (props: ICallCardProps) => {
  const {
    call,
    langContent,
    getLangText,
    onToggleIsRead,
    onDeleteCarCall,
  } = props;

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLLIElement | HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleToggleIsRead = () => {
    onToggleIsRead(call.id);
    handleClose();
  }

  const hangleDelete = () => {
    onDeleteCarCall(call.id);
    handleClose();
  }

  return (
    <Box
      key={call.timeStamp}
      my={1} mx={1}
      position='relative'
    >
      <Typography>
        {`${langContent.dateTime}: ${new Date(call.timeStamp).toLocaleString()}`}
      </Typography>
      <Typography>
        {`${langContent.text}: ${call.message}`}
      </Typography>
      <Typography>
        {`${langContent.language}: ${call.lang ? getLangText(call.lang) : ' - '}`}
      </Typography>
      <IconButton
        sx={{
          position: 'absolute', right: 10, top: 0,
        }}
        size="small"
        id="basic-button"
        aria-controls={isMenuOpen ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={isMenuOpen ? 'true' : undefined}
        onClick={(event) => handleClick(event)}
      >
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem sx={{ color: 'black' }} onClick={handleToggleIsRead}>Mark as read</MenuItem>
        <MenuItem sx={{ color: 'black' }} onClick={hangleDelete}>Delete</MenuItem>
      </Menu>
      {!call.isRead &&
        <Typography sx={{ color: 'red', position: 'absolute', right: 10, bottom: 0 }}>
          New
        </Typography>
      }
    </Box>
  );
};

export default CallCard;