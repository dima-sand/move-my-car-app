/* eslint-disable @typescript-eslint/no-empty-object-type */
// import { LanguageResource } from '@/models/locales';
import en from './messages/en.json';

type Messages = typeof en;
 
declare global {
  interface IntlMessages extends Messages {}
}
