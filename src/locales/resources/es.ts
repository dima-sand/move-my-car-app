import { LanguageResource } from '../../models/locales';

export const esResource: LanguageResource = {
  Common: {
    helloWorld: 'Hola, Mundo!',
    selectLangList: {
      en: 'English',
      es: 'Español',
      ru: 'Русский',
    },
    langList: {
      en: 'Inglés',
      es: 'Español',
      ru: 'Ruso',
    },
    bottomNavigationBar: {
      accountPage: 'Cuenta',
      dashboardPage: 'Panel de Control',
      settingsPage: 'Ajustes',
    },
    signInForm: {
      cancelBtn: 'Cancelar',
      carName: 'Nombre del coche',
      carNumber: 'Matricula',
      loginBtn: 'Iniciar Sesion',
      registerTitle: 'Registrarse',
      userName: 'Nombre de usuario',
      password: 'Contraseña',
      newPassword: 'Nueva Contraseña',
      repeatPassword: 'Repetir Contraseña',
      submitBtn: 'Iniciar Sesion',
      loginTitle: 'Iniciar Sesion',
      registerBtn: 'Registrarse',
      registerDescription:
        'Los campos con * son obligatorios. La matricula no es obligatoria',
      changeBtn: 'Cambiar',
    },
  },
  WelcomePage: {
    title: 'Bienvenido a MoveMyCar app!',
    description: '',
    btns: {
      loginBtn: 'Iniciar Sesion',
      registerBtn: 'Registrarse',
    },
  },
  DashboardPage: {
    title: 'Panel de Control',
    vehicleCard: {
      title: 'Coche',
      carName: 'Nombre',
      carNumber: 'Matricula',
    },
    userSection: {
      title: 'Usuario',
      userName: 'Nombre de usuario',
    },
    callsSection: {
      title: 'LLamadas',
      dateTime: 'Fecha y hora',
      language: 'Idioma',
      text: 'Texto',
    },
  },
  AccountPage: {
    title: 'Cuenta',
    logoutBtn: 'Salir',
    changePasswordBtn: 'Cambiar Contraseña',
  },
  CallUserPage: {
    title: 'LLamada',
    sendBtn: 'Enviar',
  }
};

export default esResource;