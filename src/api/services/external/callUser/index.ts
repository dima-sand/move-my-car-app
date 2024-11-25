import { RestService } from '../../..';

interface ICallUserData {
  message: string;
  userName: string;
  carId: string;
}

const callUserService = (data: ICallUserData) => {
  const res = RestService.fetch(
    '/external/callUser',{
      method: 'POST',
      data,
    }
  );
  return res;
};

export default callUserService;
