import { AxiosError } from 'axios';
import { Notification } from '@/shared/ui';

export const handlerError = (error: unknown) => {
    try {
        if (error instanceof AxiosError) {
            if (error.response) {
                if (Array.isArray(error.response.data.message)) {
                    return error.response.data.message.map((message: string) =>
                        Notification('error', message)
                    );
                } else {
                    return Notification('error', error.response.data.message);
                }
            }
        } else {
            return Notification('error', 'Произошла ошибка');
        }
    } catch (error) {
        console.error(error);
    }
};
