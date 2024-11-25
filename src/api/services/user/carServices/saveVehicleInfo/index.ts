import { RestService } from "@/api";
import { ICar } from "@/models/state/state/user/car";



const saveVehicleInfoService = (data: ICar) => {
  const res = RestService.fetch<any>(
    '/user/car/saveVehicleInfo', {
      method: 'POST',
      data,
    }
  );
  return res;
};

export default saveVehicleInfoService;
