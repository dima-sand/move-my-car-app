import getInfoExternalService from "@/api/services/external/getInfoExt";
import CallUserForm from "./callUserForm";
import { IResponse } from "@/api";

interface ICallUserPageParams {
  userName: string;
}
interface ICallUserPageProps {
  searchParams: Promise<{
    carId?: string
  }>,
  params: Promise<ICallUserPageParams>
}
export default async function CallUserPage(props: ICallUserPageProps) {
  const { params, searchParams } = props;
  const { userName } = await params;
  const { carId } = await searchParams;

  if (!carId) {
    return (
      <div>Error: No car id provided</div>
    )
  }

  let data: IResponse<any>;

  try {
    data = (await getInfoExternalService({
      userName,
      carId,
    })).data;

  } catch (error) {
    console.log({ error });

    return (
      <div>Internal Server Error</div>
    )
  }


  if (data?.success) {
    const { userName, carNumber, carName, autoMessage } = data.data!;
    return (
      <CallUserForm
        autoMessage={autoMessage}
        userName={userName}
        carName={carName}
        carNumber={carNumber}
      />
    )
  } else {
    return (
      <div>User Not Found</div>
    )
  }
}
