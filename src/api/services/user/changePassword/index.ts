import { RestService } from '../../..';

export interface IChangePasswordData {
  oldPassword: string;
  newPassword: string;
}
const changePasswordService = (data: IChangePasswordData) =>
  RestService.fetch('/user/changePassword',{
    method:'POST',
    data,
  });

export default changePasswordService;
