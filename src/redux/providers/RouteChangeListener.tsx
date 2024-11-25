'use client';
import { useEffect, ReactNode, useState } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { usePathname } from 'next/navigation';
import { routeChange } from '@/redux/core/actions';
import { useRouter } from 'next/router';

// interface RouteChangeProviderProps {
//   children: ReactNode;
// }

// const RouteChangeListener : React.FC = () => {
//   const pathname = usePathname();
//   const [changes, setChanges] = useState(0);

//   useEffect(() => {
//     console.log(`Route changed to: ${pathname}`);
//     setChanges((prev) => prev + 1);
//   }, [pathname]);

//   return <></>;
// }


const RouteChangeListener: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      dispatch(routeChange(url));  // Dispatch action to Redux store
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    // Cleanup
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router, dispatch]);
  
  return <></>;
};
  export default RouteChangeListener ;