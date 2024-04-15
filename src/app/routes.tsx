import {Route, createRoutesFromElements} from 'react-router-dom';
import {CommonWrapper} from './CommonWrapper/CommonWrapper';

export const routes = createRoutesFromElements(
    <Route element={<CommonWrapper />}>
        <Route path='/'></Route>
    </Route>
);
