import Headers from './Headers';
import CartOverview from './../features/cart/CartOverview';
import { Outlet, useNavigation } from 'react-router-dom';
import Loader from './Loader';

function AppLayout() {
    const navigation = useNavigation();
    const isLoding = navigation.state === 'loading';
    // console.log(navigation);
    return (
        <>
            {isLoding && <Loader />}
            <Headers />
            <main>
                {/* <h1>Content</h1> */}
                <Outlet />
            </main>
            <CartOverview />
        </>
    );
}

export default AppLayout;
