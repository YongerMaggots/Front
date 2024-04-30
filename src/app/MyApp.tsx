import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { routes } from './routes';
import { App } from 'antd';
import { Toaster } from 'react-hot-toast';

export const MyApp = () => {
    return (
        <App>
            <RouterProvider router={createBrowserRouter(routes)} />
            <Toaster position="top-center" reverseOrder={false} />
        </App>
    );
};
