import { RestService } from "@/api";



const toggleCarCallIsReadService = (data:{carId:string, callId: string}) => {
  const res = RestService.fetch(
    '/user/car/toggleCarCallIsRead',{
      method: 'POST',
      data,
    }
  );
  return res;
}

export default toggleCarCallIsReadService;