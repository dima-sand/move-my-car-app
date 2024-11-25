'use client';
import { usePathname, useRouter } from "@/i18n/routing";
import { Locales, SUPPORTED_LOCALES } from "@/models/locales";
import { MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { useTranslations, useLocale } from "next-intl";

export default function SettingsPage() {

  const t = useTranslations('SettingsPage');
  const selectLags = useTranslations('Common.selectLangList')

  const langs = SUPPORTED_LOCALES.map(lang => [lang, selectLags(lang as Locales)]);
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const handleOnChangeLocale = (event: SelectChangeEvent<string>) => {
    router.push(pathname, { locale: event.target.value as Locales });
  }

  return (
    <>
      <Typography
        variant="h4"
        component="span"
      >{t('title')}</Typography>
      <Select
        labelId="simple-select-lang"
        id="simple-select"
        value={locale}
        label="Age"
        onChange={handleOnChangeLocale}
      >
        {langs.map(([lang, text]) => (
          <MenuItem
            key={lang}
            value={lang}
          >{text}</MenuItem>
        ))}
      </Select>
    </>
  );
}
