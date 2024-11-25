import { RestService } from "@/api";
import { Loader } from "@/ui/components/common";

export default async function LoadingSuspense() {

  // const res = await fetch('/api/checkCookie');

  

  return <Loader isfullscreen />
}
