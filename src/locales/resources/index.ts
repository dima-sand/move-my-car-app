import { LanguageResource, LocaleLang } from '../../models/locales';
import enResource from './en';
import esResource from './es';
import ruResource from './ru';

const myResources: {
  [key in LocaleLang]: LanguageResource;
} = {
  en: enResource,
  es: esResource,
  ru: ruResource,
};

export default myResources;
