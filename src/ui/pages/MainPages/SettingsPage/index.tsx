import { Box, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";


const SettingsPage = () => {

  // const { t, i18n } = useTranslation();

  // const langs: { [key: string]: string } = t('selectLangList', { returnObjects: true }) // Object.keys(i18n.options.resources ?? {});

  // const handleChangeLanguage = (event: SelectChangeEvent<string>) => {
  //   i18n.changeLanguage(event.target.value);
  // }
  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100%">
      <Typography
        variant="h5"
        component="span"
        >Settings Page</Typography>
      {/* <Select
        labelId="simple-select-lang"
        id="simple-select"
        value={'ssss'}
        label="Age"
        // onChange={}
      > */}
        {/* {Object.entries(langs).map(([lang, text]) => (
          <MenuItem
            key={lang}
            value={lang}
           >{text}</MenuItem>
        ))} */}
        {/* <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem> */}
      {/* </Select> */}
    </Box>
  )
}

export default SettingsPage;
