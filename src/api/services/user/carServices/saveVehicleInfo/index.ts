import { RestService } from "@/api";
import { ICar } from "@/models/state/state/user/car";



const saveCarInfoService = (data: ICar) => {
  const res = RestService.fetch<any>(
    '/user/car/saveCarInfo', {
      method: 'POST',
      data,
    }
  );
  return res;
};

export default saveCarInfoService;
