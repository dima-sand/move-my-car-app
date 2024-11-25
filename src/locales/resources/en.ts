import { LanguageResource } from '../../models/locales';

const enResource: LanguageResource = {
  Common: {
    helloWorld: 'Hello World!',
    selectLangList: {
      en: 'English',
      es: 'Español',
      ru: 'Русский',
    },
    langList: {
      en: 'English',
      es: 'Spanish',
      ru: 'Russian',
    },
    bottomNavigationBar: {
      accountPage: 'Account',
      dashboardPage: 'Dashboard',
      settingsPage: 'Settings',
    },
    signInForm: {
      loginTitle: 'Login',
      registerTitle: 'Register',
      password: 'Password',
      newPassword: 'New Password',
      repeatPassword: 'Repeat Password',
      cancelBtn: 'Cancel',
      userName: 'Username',
      submitBtn: 'Submit',
      registerBtn: 'Register',
      carName: 'Name',
      carNumber: 'Number',
      loginBtn: 'Log In',
      registerDescription: 'Fields with * are required. Car number is optional',
      changeBtn: 'Change',
    },
  },
  WelcomePage: {
    title: 'Welcome to MoveMyCar app!',
    description: '',
    btns: {
      loginBtn: 'Log In',
      registerBtn: 'Register',
    },
  },
  DashboardPage: {
    title: 'Dashboard',
    vehicleCard: {
      title: 'Car',
      carName: 'Car name',
      carNumber: 'Car number',
    },
    userSection: {
      title: 'User',
      userName: 'User name',
    },
    callsSection: {
      title: 'Calls',
      dateTime: 'Date',
      language: 'Language',
      text: 'Text',
    },
  },
  AccountPage: {
    title: 'Account',
    changePasswordBtn: 'Change Password',
    logoutBtn: 'Log Out',
  },
  CallUserPage: {
    title: 'Call User',
    sendBtn: 'Send',
  }
};

export default enResource;