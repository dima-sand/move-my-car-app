import { LanguageResource } from '../../models/locales';

export const ruResource: LanguageResource = {
  Common: {
    helloWorld: 'Привет, мир!',
    selectLangList: {
      en: 'English',
      es: 'Español',
      ru: 'Русский',
    },
    langList: {
      en: 'Английский',
      es: 'Испанский',
      ru: 'Русский',
    },
    bottomNavigationBar: {
      accountPage: 'Аккаунт',
      dashboardPage: 'Дэшборд',
      settingsPage: 'Настройки',
    },
    signInForm: {
      loginTitle: 'Войти',
      userName: 'Имя пользователя',
      password: 'Пароль',
      newPassword: 'Новый пароль',
      repeatPassword: 'Повторите пароль',
      cancelBtn: 'Отмена',
      submitBtn: 'Войти',
      registerBtn: 'Зарегистрироваться',
      carName: 'Название машины',
      carNumber: 'Номер машины',
      loginBtn: 'Войти',
      registerTitle: 'Зарегистрироваться',
      registerDescription:
        'Поля со звездочкой обязательны для заполнения \n Номер машины не обязательно для заполнения',
      changeBtn: 'Поменять',
    },
  },
  WelcomePage: {
    title: 'Добро пожаловать!',
    description: '',
    btns: {
      loginBtn: 'Войти',
      registerBtn: 'Зарегистрироваться',
    },
  },
  DashboardPage: {
    title: 'Дэшборд',
    vehicleCard: {
      title: 'Авто',
      carName: 'Название',
      carNumber: 'Номер',
    },
    userSection: {
      title: 'Пользователь',
      userName: 'Имя',
    },
    callsSection: {
      title: 'История вызовов',
      dateTime: 'Время',
      language: 'Язык',
      text: 'Текст',
    },
  },
  AccountPage: {
    title: 'Аккаунт',
    changePasswordBtn: 'Изменить пароль',
    logoutBtn: 'Выйти',
  },
  CallUserPage: {
    title: 'Вызвать',
    sendBtn: 'Отправить',
  }
};

export default ruResource;