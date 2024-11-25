import { RestService } from '../../..';

const getInfoService = () => {
  const res = RestService.fetch('/user/getInfo');
  return res;
};

export default getInfoService;
