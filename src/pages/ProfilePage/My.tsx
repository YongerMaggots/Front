import { useProfileStore } from '@/entities/user/model';
import { UserAppointment, UserInfo, UserPets } from '@/widgets';
import { Divider } from 'antd';
import { useNavigate } from 'react-router-dom';

export const My = () => {
    const { myProfile } = useProfileStore();

    const navigate = useNavigate();

    if (!myProfile) {
        navigate('/404');
        return null;
    }

    return (
        <>
            <UserInfo userData={myProfile} my />
            <Divider />
            <UserPets userId={myProfile.id} my />
            <Divider />
            <UserAppointment userId={myProfile.id} my />
        </>
    );
};
