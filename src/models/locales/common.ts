

export interface ICommonContent {
  helloWorld: string,
  selectLangList: {
    'en' : 'English';
    'es' : 'Español';
    'ru' : 'Русский';
  },
  langList: {
    en: string,
    es: string,
    ru: string
  },
  bottomNavigationBar: {
    accountPage: string;
    dashboardPage: string;
    settingsPage: string;
  },
  signInForm: ISignInFormContent;
}

export interface ISignInFormContent {
  loginTitle: string;
  registerTitle: string;
  userName: string;
  password: string;
  newPassword: string;
  repeatPassword: string;

  submitBtn: string;
  cancelBtn: string;
  changeBtn: string;
  registerBtn: string;
  loginBtn: string;
  carNumber: string;
  carName: string;
  registerDescription: string;
}
