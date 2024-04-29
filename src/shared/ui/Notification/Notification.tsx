import { App } from 'antd';
import { useEffect } from 'react';

export const Notification = (
    type: 'success' | 'info' | 'warning' | 'error',
    messageText: string
) => {
    const { message } = App.useApp();

    useEffect(() => {
        message[type](messageText);
        console.log(type, messageText);
    }, [message]);
    return <></>;
};
