import { RestService } from "@/api";

export interface ISaveCarLocationPayload {
  carId: string;
  carLocation: {
    lat: number;
    lng: number;
  } | null;
}

type ISaveCarLocationResponse = ISaveCarLocationPayload;

const saveCarLocationService = (location: ISaveCarLocationPayload) => {
  const res = RestService.fetch<ISaveCarLocationResponse>(
    '/user/car/saveCarLocation',{
      method: 'POST',
      data: location,
    }
  );
  return res;
};

export default saveCarLocationService;
