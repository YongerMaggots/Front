import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import {routes} from './routes';
import {App} from 'antd';

export const MyApp = () => {
    return (
        <App>
            <RouterProvider router={createBrowserRouter(routes)} />
        </App>
    );
};
