import {Route, createRoutesFromElements} from 'react-router-dom';
import {CommonWrapper} from './CommonWrapper/CommonWrapper';
import {AuthPage} from '@/pages';

export const routes = createRoutesFromElements(
    <Route element={<CommonWrapper />}>
        <Route path='/' />
        <Route path='/login' element={<AuthPage.Login />} />
        <Route path='/register' element={<AuthPage.Register />} />
    </Route>
);
