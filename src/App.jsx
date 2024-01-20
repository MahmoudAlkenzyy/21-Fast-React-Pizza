import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './ui/Home';
import Menu, { Loader as menuLodaer } from './features/menu/Menu';
import Order, { loader as orderLoader } from './features/order/Order';

import CreateOrder, {
    action as creareOrderAction,
} from './features/order/CreateOrder';
import Cart from './features/cart/Cart';
import AppLayout from './ui/AppLayout';
import Error from './ui/Error';

function App() {
    const router = createBrowserRouter([
        {
            element: <AppLayout />,
            errorElement: <Error />,
            children: [
                { path: '/', element: <Home /> },
                {
                    path: 'menu',
                    loader: menuLodaer,
                    element: <Menu />,
                    errorElement: <Error />,
                },
                {
                    path: 'order/new',
                    element: <CreateOrder />,
                    action: creareOrderAction,
                },
                {
                    path: 'order/:orderId',
                    loader: orderLoader,
                    element: <Order />,
                    errorElement: <Error />,
                },
                { path: 'cart', element: <Cart /> },
            ],
        },
    ]);

    return <RouterProvider router={router} />;

    // return <div>Hello vite</div>;
}

export default App;
