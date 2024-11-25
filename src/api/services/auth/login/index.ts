import { RestService } from '../../..';

export interface ILoginData {
  userName: string;
  password: string;
}

const loginService = (data: ILoginData) =>
  RestService.fetch('/auth/login', {
    method: 'POST',
    data,
  });

export default loginService;
