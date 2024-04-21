import {Route, createRoutesFromElements} from 'react-router-dom';
import {CommonWrapper} from './CommonWrapper/CommonWrapper';
import {MainPage, ProfilePage} from '@/pages';

export const routes = createRoutesFromElements(
    <Route element={<CommonWrapper />}>
        <Route path='/' element={<MainPage.Main />} />
        <Route path='/profile' element={<ProfilePage.Profile />} />
    </Route>
);
