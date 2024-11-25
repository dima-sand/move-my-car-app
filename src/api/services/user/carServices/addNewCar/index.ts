import { RestService } from "@/api";
import { ICar } from "@/models/state/state/user/car";

const addNewCarService = (data: ICar) => {
  const res = RestService.fetch<any>(
    '/user/car/addNewCar',{
      method: 'POST',
      data,
    }
  );
  return res;
};

export default addNewCarService;
