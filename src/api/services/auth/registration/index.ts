import { RestService } from '../../..';

export interface IRegisterPayload {
  userName: string;
  password: string;
  carNumber: string;
  carName: string;
}

const registrationService = (data: IRegisterPayload) =>
  RestService.fetch('/auth/registration',{
    method: 'POST',
    data,
  });

export default registrationService;
