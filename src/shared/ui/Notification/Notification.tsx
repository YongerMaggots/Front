import { notification } from 'antd';
import { useEffect } from 'react';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

export const Notification = (
    type: 'success' | 'info' | 'warning' | 'error',
    message: string
) => {
    const [api] = notification.useNotification();
    const openNotificationWithIcon = (type: NotificationType) => {
        api[type]({
            message,
            description: 'tesdt',
        });
    };

    useEffect(() => {
        openNotificationWithIcon(type);
    }, []);
};
