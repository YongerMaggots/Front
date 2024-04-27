import { useProfileStore } from '@/entities/user/model';
import { Outlet } from 'react-router-dom';

export const RequireAuth = () => {
    const { myProfile } = useProfileStore();
    console.log(myProfile);

    return <Outlet />;
};
