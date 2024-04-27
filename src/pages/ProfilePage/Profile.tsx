import { UserModel, useProfileStore } from '@/entities/user/model';
import { handlerError } from '@/shared/lib/handle-error';
import { UserAppointment, UserInfo, UserPets } from '@/widgets';
import { Divider, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const Profile = () => {
    const { getUserProfile } = useProfileStore();
    const [myProfile, setMyProfile] = useState<UserModel.IUserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const { userId } = useParams();

    const navigate = useNavigate();

    const handleGetUserProfile = async () => {
        if (!userId) {
            return navigate('/404');
        }

        setIsLoading(true);
        try {
            const data = await getUserProfile(+userId);
            setMyProfile(data);
        } catch (error) {
            handlerError(error);
            navigate('/404');
        }
        setIsLoading(false);
    };

    useEffect(() => {
        handleGetUserProfile();
    }, []);

    if (isLoading) {
        return <Spin />;
    }

    if (!myProfile || !userId) {
        return null;
    }

    return (
        <>
            <UserInfo userData={myProfile} getUser={handleGetUserProfile} />
            <Divider />
            <UserPets userId={+userId} />
            <Divider />
            <UserAppointment userId={+userId} />
        </>
    );
};
