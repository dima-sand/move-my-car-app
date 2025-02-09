import { AppBar, IconButton, Menu, MenuItem, Toolbar } from "@mui/material";
import LanguageIcon from '@mui/icons-material/Language';
import { useState } from "react";
import { useTranslations } from "next-intl";

import { usePathname, useRouter } from "@/i18n/routing";
import { LocaleLang } from "@/models/locales";

const WelcomeHeader = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const t = useTranslations('Common');
  const router = useRouter();

  const pathName = usePathname();

  const langs = {
    'en': t('selectLangList.en'),
    'es': t('selectLangList.es'),
    'ru': t('selectLangList.ru'),
  }; // Object.keys(i18n.options.resources ?? {});

  const handleChangeLanguage = (lang: LocaleLang) => {
    router.replace(pathName, { locale: lang });
    // i18n.changeLanguage(lang);
    handleClose();
  }

  const handleClose = () => {
    setAnchorEl(null);
  }


  return (
    <AppBar
      position="absolute"
      sx={{
        backgroundColor: 'transparent',
        boxShadow: 'none',
        top: 0, right: 0, left: 0,
      }}
    >
      <Toolbar>
        <IconButton
          sx={{
            position: 'absolute', right: 0,
            my: 3, mr: 2
          }}
          onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
            setAnchorEl(event.currentTarget);
          }}
          id="menu-button"
          aria-controls={open ? 'lang-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <LanguageIcon fontSize="large" />
        </IconButton>
        <Menu
          id="lang-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'menu-button',
          }}
          sx={{
            backdropFilter: 'blur(3px)',
            // '& .MuiPaper-root': {
            //   backgroundColor: 'purple',
            // }
          }}
        >
          {Object.entries(langs).map(([lang, text]) =>
            <MenuItem
              key={lang}
              sx={(theme) => ({
                // backgroundColor: 'purple',
                '&:hover': {
                  backgroundColor: theme.palette.primary.main,
                }
              })}
              onClick={() => handleChangeLanguage(lang as LocaleLang)}
            >{text}</MenuItem>
          )
          }
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default WelcomeHeader;