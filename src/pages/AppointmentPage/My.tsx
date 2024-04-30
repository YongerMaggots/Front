import { useProfileStore } from '@/entities/user/model';
import { RoleEnum } from '@/entities/user/model/user.modal';
import { DoctorAppointment, UserAppointment } from '@/widgets';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const My = () => {
    const { myProfile } = useProfileStore();
    const navigate = useNavigate();

    useEffect(() => {
        !myProfile && navigate('/404');
    }, [myProfile]);

    if (!myProfile) {
        return <></>;
    }

    if (myProfile.role === RoleEnum.doctor) {
        return <DoctorAppointment />;
    }

    return <UserAppointment userId={myProfile.id} my />;
};
