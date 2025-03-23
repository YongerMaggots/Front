import { Route, createRoutesFromElements } from 'react-router-dom';
import { CommonWrapper } from './CommonWrapper/CommonWrapper';
import {
    AppointmentPage,
    MainPage,
    NotFoundPage,
    ChildPage,
    ProfilePage,
    RequireAuth,
} from '@/pages';

export const routes = createRoutesFromElements(
    <Route element={<CommonWrapper />}>
        <Route path="/" element={<MainPage.Main />} />
        <Route element={<RequireAuth />}>
            <Route path="profile">
                <Route path="my">
                    <Route index element={<ProfilePage.My />} />
                    <Route path="edit" element={<ProfilePage.Edit />} />
                </Route>
                <Route path=":userId" element={<ProfilePage.Profile />} />
            </Route>
            <Route path="child">
                <Route path="new" element={<ChildPage.New />} />
            </Route>
            <Route path="appointment">
                <Route path="new" element={<AppointmentPage.New />} />
                <Route path="my" element={<AppointmentPage.My />} />
            </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
    </Route>
);
