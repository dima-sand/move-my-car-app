import { IAccountPageContent } from "./accountPage";
import { ICallUserPageContent } from "./callUserPage";
import { ICommonContent } from "./common";
import { IDashboardPageContent } from "./dashboardPage";
import { IWelcomePageContent } from "./welcomePage";

export enum LocaleLang {
  En = 'en',
  Es = 'es',
  Ru = 'ru',
};

export type Locales = 'en' | 'es' | 'ru';

export const SUPPORTED_LOCALES = ['en', 'es', 'ru'];

export type LanguageResource = {
  AccountPage: IAccountPageContent;
  CallUserPage: ICallUserPageContent;
  Common: ICommonContent;
  DashboardPage: IDashboardPageContent;
  WelcomePage: IWelcomePageContent;
}