import Headers from './Headers';
import CartOverview from './../features/cart/CartOverview';
import { Outlet, useNavigation } from 'react-router-dom';
import Loader from './Loader';

function AppLayout() {
  const navigation = useNavigation();
  const isLoding = navigation.state === 'loading';
  // console.log(navigation);
  return (
    <div className="grid h-screen grid-rows-[auto,1fr,auto]">
      {/* {isLoding && <Loader />} */}
      {true && <Loader />}
      <Headers />
      <div className="overflow-x-auto">
        <main className="mx-auto max-w-3xl">
          {/* <h1>Content</h1> */}
          <Outlet />
        </main>
      </div>
      <CartOverview />
    </div>
  );
}

export default AppLayout;
