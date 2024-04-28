import { useProfileStore } from '@/entities/user/model';
import { handlerError } from '@/shared/lib/handle-error';
import { Spin } from 'antd';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export const RequireAuth = () => {
    const navigate = useNavigate();
    const { authMe, token } = useProfileStore();
    const [isLoading, setIsLoading] = useState(true);

    const handleGetMyProfile = async () => {
        try {
            await authMe();
        } catch (error) {
            handlerError(error);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        token && handleGetMyProfile();
    }, [token]);

    if (!isLoading && !token) {
        navigate('/404');
        return <></>;
    }

    if (isLoading) {
        return <Spin size="large" />;
    }

    return <Outlet />;
};
