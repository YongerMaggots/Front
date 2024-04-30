import { UserModel, useProfileStore } from '@/entities/user/model';
import { handlerError } from '@/shared/lib/handle-error';
import { UserAppointment, UserInfo, UserPets } from '@/widgets';
import { Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const Profile = () => {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const { getUserProfile } = useProfileStore();
    const [userProfile, setUserProfile] = useState<UserModel.IUserProfile | null>(null);

    const { userId } = useParams();

    const handleGetUserProfile = async () => {
        if (!userId) {
            return navigate('/404');
        }

        setIsLoading(true);
        try {
            const data = await getUserProfile(+userId);
            setUserProfile(data);
            setIsLoading(false);
        } catch (error) {
            handlerError(error);
            navigate('/404');
        }
    };

    useEffect(() => {
        handleGetUserProfile();
    }, []);

    if (isLoading) {
        return <Spin />;
    }

    if (!userProfile || !userId) {
        return null;
    }

    return (
        <>
            <UserInfo userData={userProfile} getUser={handleGetUserProfile} />
            <UserPets userId={+userId} />
            <UserAppointment userId={+userId} />
        </>
    );
};
