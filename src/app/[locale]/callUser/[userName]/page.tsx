import getInfoExternalService from "@/api/services/external/getInfoExt";
import CallUserForm from "./callUserForm";

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

  const { data } = await getInfoExternalService({
    userName,
    carId,
  });

  if (data?.success) {
    const { userName, carNumber, carName } = data.data!;
    return (
      <CallUserForm userName={userName} carName={carName} carNumber={carNumber} />
    )
  } else {
    return (
      <div>User Not Found</div>
    )
  }
}
