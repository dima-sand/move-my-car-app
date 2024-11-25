import { RestService } from "@/api";

const deleteCarCallService = (data: {
  carId: string;
  callId: string;
}) => {
  const res = RestService.fetch<any>(
    '/user/car/deleteCarCall',{
      method: 'POST',
      data,
    }
  );
  return res;
};

export default deleteCarCallService;
