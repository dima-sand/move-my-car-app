import { HTMLInputTypeAttribute, ReactNode } from 'react';

interface ISignInModalConstants {
  userName: string;
  password: string;
  repeatPassword: string;
  newPassword: string;
  carName: string;
  carNumber: string;
  changeBtn: string;
}

export interface IField {
  label: ReactNode;
  type: HTMLInputTypeAttribute;
  id: string;
  required: boolean;
}

export const getSignInModalConstants = (localeSrc: ISignInModalConstants) => ({
  loginModal: {
    getFields: (): IField[] => ([
      {
        label: localeSrc.userName,
        type: 'text',
        id: 'userName',
        required: true,
      },
      {
        label: localeSrc.password,
        type: 'password',
        id: 'password',
        required: true,
      },
    ]),
  },
  registerModal: {
    getFields: (): IField[] => ([
      {
        label: localeSrc.userName,
        type: 'text',
        id: 'userName',
        required: true,
      },
      {
        label: localeSrc.password,
        type: 'password',
        id: 'password',
        required: true,
      },
      {
        label: localeSrc.repeatPassword,
        type: 'password',
        id: 'passwordRepeat',
        required: true,
      },
      {
        label: localeSrc.carName,
        type: 'text',
        id: 'carName',
        required: true,
      },
      {
        label: localeSrc.carNumber,
        type: 'text',
        id: 'carNumber',
        required: false,
      },
    ]),
  },
  changePasswordModal: {
    getFields: (): IField[] => ([
      {
        label: localeSrc.password,
        type: 'password',
        id: 'oldPassword',
        required: true,
      },
      {
        label: localeSrc.newPassword,
        type: 'password',
        id: 'newPassword',
        required: true,
      },
      {
        label: localeSrc.repeatPassword,
        type: 'password',
        id: 'repeatPassword',
        required: true,
      },
    ]),
    changePasswordBtn: localeSrc.changeBtn,
  },
});
