import { RestService } from '../../..';

interface IGetInfoExtData {
  userName: string;
  carId: string;
}

const getInfoExternalService = (payload: IGetInfoExtData) => {
  const res = RestService.fetch(
    `/external/getInfoExt?userName=${payload.userName}&carId=${payload.carId}`,
    {
      method: 'GET',
      serverCall: true,
    }
  );
  return res;
};

export default getInfoExternalService;
