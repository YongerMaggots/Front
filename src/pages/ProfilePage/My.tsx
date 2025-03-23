import { useProfileStore } from '@/entities/user/model';
import { UserAppointment, UserInfo, UserChildrens } from '@/widgets';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const My = () => {
    const { myProfile, authMe } = useProfileStore();

    const navigate = useNavigate();

    useEffect(() => {
        authMe();
    }, []);

    if (!myProfile) {
        navigate('/404');
        return null;
    }

    return (
        <>
            <UserInfo userData={myProfile} my />
            <UserChildrens userId={myProfile.id} my />
            <UserAppointment userId={myProfile.id} my />
        </>
    );
};
