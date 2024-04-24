import { useProfileStore } from '@/entities/user/model';
import { handlerError } from '@/shared/lib/handle-error';
import { UserInfo, UserPets } from '@/widgets';
import { Divider, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const Profile = () => {
    const { getUserProfile, userProfile, resetUserProfile } = useProfileStore();

    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const { profileId } = useParams();

    const getUser = async () => {
        setIsLoading(true);
        if (!profileId) return;

        getUserProfile(+profileId).catch((error) => {
            handlerError(error);
            resetUserProfile();
            navigate('/404');
        });
        setIsLoading(false);
    };

    useEffect(() => {
        getUser();

        return resetUserProfile();
    }, []);

    if (isLoading) return <Spin />;

    return (
        <>
            <UserInfo userData={userProfile} my />
            <Divider />
            <UserPets userData={userProfile} my />
            <Divider />
        </>
    );
};
