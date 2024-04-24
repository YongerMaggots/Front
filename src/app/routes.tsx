import { Route, createRoutesFromElements } from 'react-router-dom';
import { CommonWrapper } from './CommonWrapper/CommonWrapper';
import { MainPage, ProfilePage } from '@/pages';

export const routes = createRoutesFromElements(
    <Route element={<CommonWrapper />}>
        <Route path="/" element={<MainPage.Main />} />
        <Route path="profile">
            <Route path="my">
                <Route index element={<ProfilePage.My />} />
                <Route path="edit" element={<ProfilePage.Edit />} />
            </Route>
            <Route path=":profileId" element={<ProfilePage.Profile />} />
        </Route>
    </Route>
);
